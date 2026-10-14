# Dokumentasi REST API SisaBaik

## 1. Deskripsi

SisaBaik merupakan aplikasi untuk membantu penyedia menawarkan makanan berlebih yang masih layak dikonsumsi. Backend menggunakan REST API dengan Node.js, Express.js, dan PostgreSQL.

## 2. Persiapan

1. Pastikan Node.js dan PostgreSQL sudah terpasang.
2. Siapkan konfigurasi database pada file `.env` berdasarkan `.env.example`.
3. Instal dependensi dengan perintah `npm install`.
4. Jalankan server dengan perintah `npm run dev`.

Jangan membagikan file `.env` karena berisi konfigurasi lokal.

## 3. Base URL

`http://localhost:3000`

Respons API menggunakan format JSON, kecuali respons yang tidak memiliki isi.

## 4. Health Check

### GET `/api/health`

Digunakan untuk memeriksa status API.

Kode respons:
- `200 OK`: API berjalan dengan baik.

## 5. Endpoint Penawaran

### GET `/api/penawaran`

Mengambil daftar penawaran makanan.

Endpoint ini mendukung pencarian, filter, dan paginasi sesuai implementasi API.

### GET `/api/penawaran/:id`

Mengambil detail penawaran berdasarkan ID.

### POST `/api/penawaran`

Menambahkan penawaran makanan baru. Data dikirim dalam format JSON sesuai field yang diwajibkan API.

### PUT `/api/penawaran/:id`

Memperbarui data penawaran berdasarkan ID.

### DELETE `/api/penawaran/:id`

Menghapus penawaran berdasarkan ID jika memenuhi ketentuan penghapusan.

Kode respons yang dapat digunakan:
- `200 OK`: request berhasil.
- `201 Created`: penawaran berhasil dibuat.
- `204 No Content`: penawaran berhasil dihapus.
- `400 Bad Request`: input atau parameter tidak valid.
- `404 Not Found`: penawaran tidak ditemukan.
- `409 Conflict`: penghapusan atau perubahan bertentangan dengan kondisi data.

## 6. Endpoint Pesanan

### GET `/api/pesanan`

Mengambil daftar pesanan.

### GET `/api/pesanan/:id`

Mengambil detail pesanan berdasarkan ID.

### POST `/api/pesanan`

Membuat pesanan baru. Data pesanan dikirim dalam format JSON sesuai field yang diwajibkan API.

Pembuatan pesanan menggunakan transaksi database untuk membantu menjaga konsistensi data dan stok. Jika proses gagal, transaksi dapat dibatalkan agar perubahan tidak tersimpan sebagian.

Kode respons yang dapat digunakan:
- `200 OK`: request berhasil.
- `201 Created`: pesanan berhasil dibuat.
- `400 Bad Request`: input tidak valid.
- `404 Not Found`: data tidak ditemukan.
- `409 Conflict`: pesanan tidak dapat diproses karena kondisi data, misalnya stok tidak mencukupi.

## 7. Pengujian

Jalankan server menggunakan perintah `npm run dev`.

Untuk menjalankan pengujian otomatis, gunakan perintah `npm run api:test`.

Pengujian dapat membuat, mengubah, atau menghapus data. Gunakan database pengembangan dan periksa dampaknya setelah pengujian.

## 8. Keamanan

- Validasi input diterapkan pada endpoint API.
- Query database menggunakan parameter untuk membantu mencegah SQL injection.
- File `.env` tidak boleh dibagikan atau diunggah ke repositori publik.