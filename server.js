const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Secret key untuk JWT
const JWT_SECRET = 'cwpay_secret_key_2025';

// Database sederhana (gunakan database real untuk production)
const DB_FILE = path.join(__dirname, 'database.json');

// Inisialisasi database
let db = {
  users: [],
  plans: [],
  transactions: [],
  settings: {
    botConnected: false,
    botNumber: null
  }
};

// Load database
if (fs.existsSync(DB_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.log('Error loading database, using default');
  }
}

// Save database
function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// WhatsApp Client
let client = null;
let qrCodeData = null;
let isClientReady = false;

// Inisialisasi WhatsApp Client
function initWhatsAppClient() {
  client = new Client({
    authStrategy: new LocalAuth({
      dataPath: './whatsapp-session'
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  // Event: QR Code generated
  client.on('qr', async (qr) => {
    console.log('QR Code received');
    qrCodeData = await qrcode.toDataURL(qr);
    io.emit('qr', qrCodeData);
  });

  // Event: Client ready
  client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
    isClientReady = true;
    db.settings.botConnected = true;
    saveDB();
    io.emit('ready', { message: 'Bot WhatsApp terhubung!' });
  });

  // Event: Authentication
  client.on('authenticated', () => {
    console.log('WhatsApp authenticated');
    io.emit('authenticated', { message: 'Autentikasi berhasil!' });
  });

  // Event: Disconnected
  client.on('disconnected', (reason) => {
    console.log('WhatsApp disconnected:', reason);
    isClientReady = false;
    db.settings.botConnected = false;
    saveDB();
    io.emit('disconnected', { message: 'Bot terputus', reason });
  });

  // Event: Message received
  client.on('message', async (msg) => {
    handleIncomingMessage(msg);
  });

  // Initialize client
  client.initialize();
}

// Handle incoming WhatsApp messages
async function handleIncomingMessage(msg) {
  const text = msg.body.toLowerCase().trim();
  const sender = msg.from;

  console.log(`Message from ${sender}: ${text}`);

  // Command: /start atau /menu
  if (text === '/start' || text === '/menu') {
    await msg.reply(
      `🌟 *Selamat datang di CWPay Bot!*\n\n` +
      `Pilih menu berikut:\n` +
      `1️⃣ /daftar - Daftar akun baru\n` +
      `2️⃣ /login - Login ke akun\n` +
      `3️⃣ /plan - Lihat paket investasi\n` +
      `4️⃣ /saldo - Cek saldo\n` +
      `5️⃣ /topup - Top up saldo\n` +
      `6️⃣ /withdraw - Tarik dana\n` +
      `7️⃣ /referral - Kode referral\n` +
      `8️⃣ /help - Bantuan\n\n` +
      `💼 *CWPay - Investasi Digital Terpercaya*`
    );
  }

  // Command: /daftar
  else if (text === '/daftar') {
    await msg.reply(
      `📝 *Pendaftaran Akun CWPay*\n\n` +
      `Untuk mendaftar, silakan kunjungi:\n` +
      `🔗 https://cwpay.com/register.html\n\n` +
      `Atau balas dengan format:\n` +
      `DAFTAR [nama] [email] [password]\n\n` +
      `Contoh:\n` +
      `DAFTAR John Doe john@email.com pass123`
    );
  }

  // Command: /plan
  else if (text === '/plan') {
    await msg.reply(
      `📊 *Paket Investasi CWPay*\n\n` +
      `1️⃣ *Plan Starter*\n` +
      `   💰 Rp 100.000\n` +
      `   📅 30 hari\n` +
      `   💵 Profit: Rp 5.000/hari\n\n` +
      `2️⃣ *Plan Silver*\n` +
      `   💰 Rp 500.000\n` +
      `   📅 30 hari\n` +
      `   💵 Profit: Rp 30.000/hari\n\n` +
      `3️⃣ *Plan Gold*\n` +
      `   💰 Rp 1.000.000\n` +
      `   📅 30 hari\n` +
      `   💵 Profit: Rp 70.000/hari\n\n` +
      `4️⃣ *Plan Platinum*\n` +
      `   💰 Rp 5.000.000\n` +
      `   📅 30 hari\n` +
      `   💵 Profit: Rp 400.000/hari\n\n` +
      `Untuk membeli, login di dashboard!`
    );
  }

  // Command: /help
  else if (text === '/help') {
    await msg.reply(
      `❓ *Bantuan CWPay Bot*\n\n` +
      `Hubungi Customer Service:\n` +
      `📱 WhatsApp: +62 838-9833-1732\n` +
      `📧 Email: support@cwpay.com\n\n` +
      `Jam Operasional: 24/7\n\n` +
      `Ketik /menu untuk kembali ke menu utama.`
    );
  }

  // Default response
  else {
    await msg.reply(
      `Maaf, perintah tidak dikenali. 😊\n` +
      `Ketik /menu untuk melihat daftar perintah.`
    );
  }
}

// ============ API ENDPOINTS ============

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    // Validasi
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Semua field harus diisi' });
    }

    // Cek user sudah ada
    const existingUser = db.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ msg: 'Username atau email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code
    const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      balance: 0,
      referralCode: newReferralCode,
      referredBy: referralCode || null,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB();

    // Generate token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      msg: 'Registrasi berhasil',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        balance: newUser.balance,
        referralCode: newUser.referralCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = db.users.find(u => u.username === username || u.email === username);
    if (!user) {
      return res.status(400).json({ msg: 'Username atau password salah' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Username atau password salah' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      msg: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        referralCode: user.referralCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Bot: Get status
app.get('/api/bot/status', (req, res) => {
  res.json({
    connected: isClientReady,
    qrCode: qrCodeData
  });
});

// Bot: Restart
app.post('/api/bot/restart', (req, res) => {
  if (client) {
    client.destroy();
  }
  initWhatsAppClient();
  res.json({ msg: 'Bot restarting...' });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected to socket');

  // Send current QR if available
  if (qrCodeData && !isClientReady) {
    socket.emit('qr', qrCodeData);
  }

  // Send ready status if already connected
  if (isClientReady) {
    socket.emit('ready', { message: 'Bot sudah terhubung' });
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected from socket');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Initializing WhatsApp Bot...`);
  initWhatsAppClient();
});
