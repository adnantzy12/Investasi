# 🤖 CWPay WhatsApp Bot

Bot WhatsApp otomatis untuk platform investasi CWPay dengan fitur QR Code authentication.

## 📋 Fitur

- ✅ QR Code Authentication untuk WhatsApp Web
- ✅ Auto-reply pesan WhatsApp
- ✅ Menu interaktif untuk user
- ✅ Integrasi dengan sistem CWPay
- ✅ Dashboard admin untuk kelola bot
- ✅ Real-time status monitoring
- ✅ Session persistence (tetap login setelah restart)

## 🚀 Cara Install

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Server

```bash
npm start
```

Atau untuk development dengan auto-reload:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📱 Cara Menghubungkan Bot WhatsApp

### Langkah 1: Buka Halaman Admin Bot

1. Buka browser dan akses: `http://localhost:3000/bot-admin.html`
2. Tunggu QR Code muncul di layar

### Langkah 2: Scan QR Code

1. Buka WhatsApp di ponsel Anda
2. Tap **Menu (⋮)** atau **Settings** 
3. Pilih **Linked Devices** (Perangkat Tertaut)
4. Tap **Link a Device** (Tautkan Perangkat)
5. Scan QR Code yang muncul di halaman admin

### Langkah 3: Bot Siap Digunakan!

Setelah scan berhasil, bot akan otomatis terhubung dan siap menerima pesan.

## 💬 Command Bot WhatsApp

User dapat mengirim pesan ke nomor WhatsApp yang terhubung dengan bot:

| Command | Deskripsi |
|---------|-----------|
| `/start` atau `/menu` | Tampilkan menu utama |
| `/daftar` | Panduan pendaftaran akun |
| `/plan` | Lihat paket investasi |
| `/saldo` | Cek saldo (coming soon) |
| `/topup` | Panduan top up saldo |
| `/withdraw` | Panduan penarikan dana |
| `/referral` | Info kode referral |
| `/help` | Bantuan dan kontak CS |

## 📂 Struktur File

```
cwpay-whatsapp-bot/
├── server.js              # Backend server & WhatsApp bot
├── bot-admin.html         # Dashboard admin untuk scan QR
├── package.json           # Dependencies
├── database.json          # Database lokal (auto-generated)
├── whatsapp-session/      # Session WhatsApp (auto-generated)
├── index.html             # Landing page
├── login.html             # Halaman login
├── register.html          # Halaman registrasi
├── dashboard.html         # Dashboard user
└── ... (file HTML lainnya)
```

## 🔧 Konfigurasi

### Port Server

Default port: `3000`

Untuk mengubah port, set environment variable:

```bash
PORT=8080 npm start
```

### JWT Secret

Default JWT secret ada di `server.js`. Untuk production, ubah dengan secret yang lebih aman:

```javascript
const JWT_SECRET = 'your_super_secret_key_here';
```

### Database

Saat ini menggunakan file JSON lokal (`database.json`). Untuk production, disarankan menggunakan database seperti:
- MongoDB
- PostgreSQL
- MySQL

## 🛠️ Troubleshooting

### QR Code tidak muncul

1. Pastikan server berjalan dengan benar
2. Cek console untuk error messages
3. Pastikan port 3000 tidak digunakan aplikasi lain
4. Restart server: `npm start`

### Bot terputus terus-menerus

1. Pastikan koneksi internet stabil
2. Jangan logout WhatsApp Web dari ponsel
3. Cek folder `whatsapp-session/` tidak terhapus
4. Restart bot dari halaman admin

### Error saat install dependencies

Jika ada error saat `npm install`, coba:

```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Puppeteer error di Linux

Jika ada error Puppeteer di Linux, install dependencies:

```bash
# Ubuntu/Debian
sudo apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
  libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
  libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
  libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 \
  libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
  fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## 🔐 Keamanan

⚠️ **PENTING untuk Production:**

1. Ubah `JWT_SECRET` dengan key yang aman
2. Gunakan HTTPS untuk semua endpoint
3. Implementasi rate limiting
4. Gunakan database yang proper (bukan JSON file)
5. Enkripsi data sensitif
6. Implementasi proper authentication & authorization
7. Backup session WhatsApp secara berkala

## 📞 Support

Butuh bantuan? Hubungi:
- 📱 WhatsApp: +62 838-9833-1732
- 📧 Email: support@cwpay.com

## 📄 License

© 2025 CWPay Ltd. All rights reserved.

---

**Dibuat dengan ❤️ untuk CWPay**
