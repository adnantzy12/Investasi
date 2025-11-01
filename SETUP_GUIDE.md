# 📱 Panduan Setup Bot WhatsApp CWPay

Panduan lengkap untuk menghubungkan bot WhatsApp dengan QR Code.

---

## 🎯 Langkah 1: Install & Jalankan Server

### Opsi A: Menggunakan Script (Recommended)

```bash
# Berikan permission execute
chmod +x start.sh

# Jalankan script
./start.sh
```

### Opsi B: Manual

```bash
# Install dependencies
npm install

# Jalankan server
npm start
```

**Output yang diharapkan:**
```
🚀 Server running on http://localhost:3000
📱 Initializing WhatsApp Bot...
```

---

## 🔗 Langkah 2: Buka Halaman Admin Bot

1. Buka browser (Chrome/Firefox/Edge)
2. Akses URL: **http://localhost:3000/bot-admin.html**
3. Tunggu beberapa detik hingga QR Code muncul

**Tampilan yang akan muncul:**
- Status badge: 🟡 Menunggu Scan
- QR Code besar di tengah layar
- Instruksi cara scan

---

## 📲 Langkah 3: Scan QR Code dengan WhatsApp

### Di Android:

1. Buka aplikasi **WhatsApp**
2. Tap icon **titik tiga (⋮)** di pojok kanan atas
3. Pilih **Linked Devices** (Perangkat Tertaut)
4. Tap **Link a Device** (Tautkan Perangkat)
5. Arahkan kamera ke QR Code di layar komputer
6. Tunggu hingga proses selesai

### Di iPhone:

1. Buka aplikasi **WhatsApp**
2. Tap **Settings** di pojok kanan bawah
3. Tap **Linked Devices** (Perangkat Tertaut)
4. Tap **Link a Device** (Tautkan Perangkat)
5. Arahkan kamera ke QR Code di layar komputer
6. Tunggu hingga proses selesai

---

## ✅ Langkah 4: Verifikasi Koneksi

Setelah scan berhasil, Anda akan melihat:

1. **Di halaman admin:**
   - Status badge berubah: 🟢 Terhubung
   - Pesan sukses: "Bot Terhubung!"
   - Icon centang hijau besar ✅

2. **Di WhatsApp ponsel:**
   - Muncul notifikasi "Device linked"
   - Di menu Linked Devices, terlihat device baru

---

## 🧪 Langkah 5: Test Bot

### Test dari WhatsApp Lain:

1. Buka WhatsApp di ponsel lain (atau minta teman)
2. Chat ke nomor WhatsApp yang terhubung dengan bot
3. Kirim pesan: `/start`
4. Bot akan membalas dengan menu

### Contoh Percakapan:

```
User: /start

Bot: 🌟 Selamat datang di CWPay Bot!

Pilih menu berikut:
1️⃣ /daftar - Daftar akun baru
2️⃣ /login - Login ke akun
3️⃣ /plan - Lihat paket investasi
4️⃣ /saldo - Cek saldo
5️⃣ /topup - Top up saldo
6️⃣ /withdraw - Tarik dana
7️⃣ /referral - Kode referral
8️⃣ /help - Bantuan

💼 CWPay - Investasi Digital Terpercaya
```

---

## 🔄 Maintenance

### Restart Bot

Jika bot bermasalah atau perlu restart:

1. Buka halaman admin: http://localhost:3000/bot-admin.html
2. Klik tombol **🔄 Restart Bot**
3. Tunggu QR Code muncul lagi (jika session expired)
4. Scan ulang jika diperlukan

### Cek Status Bot

- **Status Badge:**
  - 🟢 Terhubung = Bot aktif dan siap
  - 🟡 Menunggu Scan = Perlu scan QR
  - ⚫ Terputus = Bot offline

### Session Persistence

Bot menggunakan **LocalAuth** yang menyimpan session di folder `whatsapp-session/`.

**Keuntungan:**
- Tidak perlu scan QR setiap restart server
- Session tetap tersimpan
- Bot langsung terhubung saat server restart

**PENTING:** 
- Jangan hapus folder `whatsapp-session/`
- Backup folder ini secara berkala
- Jangan commit folder ini ke Git (sudah ada di .gitignore)

---

## ⚠️ Troubleshooting

### Problem: QR Code tidak muncul

**Solusi:**
1. Cek console browser (F12) untuk error
2. Pastikan server berjalan di port 3000
3. Restart server: `npm start`
4. Clear browser cache dan refresh

### Problem: Bot terputus terus-menerus

**Solusi:**
1. Pastikan koneksi internet stabil
2. Jangan logout WhatsApp Web dari ponsel
3. Cek folder `whatsapp-session/` tidak corrupt
4. Hapus folder `whatsapp-session/` dan scan ulang

### Problem: Error "Cannot find module"

**Solusi:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Puppeteer error di Linux

**Solusi:**
```bash
# Install dependencies yang diperlukan
sudo apt-get update
sudo apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
  libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
  libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
  libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
  libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
  libxrender1 libxss1 libxtst6 ca-certificates \
  fonts-liberation libappindicator1 libnss3 lsb-release \
  xdg-utils wget
```

### Problem: Port 3000 sudah digunakan

**Solusi:**
```bash
# Gunakan port lain
PORT=8080 npm start

# Atau kill process yang menggunakan port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🔐 Keamanan untuk Production

Sebelum deploy ke production:

1. ✅ Ubah `JWT_SECRET` di server.js
2. ✅ Gunakan database real (MongoDB/PostgreSQL)
3. ✅ Implementasi HTTPS
4. ✅ Set CORS origin yang spesifik
5. ✅ Implementasi rate limiting
6. ✅ Enkripsi data sensitif
7. ✅ Backup session secara berkala
8. ✅ Monitoring & logging
9. ✅ Implementasi authentication untuk admin panel
10. ✅ Gunakan environment variables

---

## 📞 Butuh Bantuan?

- 📱 WhatsApp CS: +62 838-9833-1732
- 📧 Email: support@cwpay.com
- 🌐 Website: https://cwpay.com

---

## 📝 Checklist Setup

Gunakan checklist ini untuk memastikan setup berhasil:

- [ ] Dependencies terinstall (`npm install`)
- [ ] Server berjalan (`npm start`)
- [ ] Halaman admin terbuka (http://localhost:3000/bot-admin.html)
- [ ] QR Code muncul di layar
- [ ] QR Code berhasil di-scan dari WhatsApp
- [ ] Status badge berubah jadi 🟢 Terhubung
- [ ] Test kirim `/start` dari WhatsApp lain
- [ ] Bot membalas dengan menu
- [ ] Session tersimpan (restart server, bot langsung connect)

---

**Selamat! Bot WhatsApp CWPay Anda sudah siap digunakan! 🎉**
