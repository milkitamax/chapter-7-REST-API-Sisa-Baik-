# SisaBaik REST API

## Deskripsi
SisaBaik merupakan proyek aplikasi untuk membantu penyedia menawarkan makanan berlebih yang masih layak dikonsumsi. Proyek ini menggunakan REST API yang terintegrasi dengan PostgreSQL.

## Teknologi
- Node.js
- Express.js
- PostgreSQL
- JavaScript

## Persiapan
1. Pastikan Node.js dan PostgreSQL sudah terpasang.
2. Instal dependensi dengan perintah `npm install`.
3. Atur konfigurasi database pada file `.env` berdasarkan `.env.example`.
4. Jangan membagikan isi file `.env`.

## Menjalankan Server
Jalankan perintah berikut:

```bash
npm run dev
```

Secara default, API dapat diakses melalui `http://localhost:3000`.

## Endpoint API

### Health Check
- `GET /api/health` untuk memeriksa status API.

### Penawaran
- `GET /api/penawaran` untuk melihat daftar penawaran.
- `GET /api/penawaran/:id` untuk melihat detail penawaran.
- `POST /api/penawaran` untuk menambahkan penawaran.
- `PUT /api/penawaran/:id` untuk memperbarui penawaran.
- `DELETE /api/penawaran/:id` untuk menghapus penawaran.

Daftar penawaran mendukung pencarian, filter, dan paginasi.

### Pesanan
- `GET /api/pesanan` untuk melihat daftar pesanan.
- `GET /api/pesanan/:id` untuk melihat detail pesanan.
- `POST /api/pesanan` untuk membuat pesanan.

Pembuatan pesanan menggunakan transaksi database untuk menjaga konsistensi data dan stok.

## Pengujian API
Jalankan pengujian dengan perintah:

```bash
npm run api:test
```

Pengujian dapat mengubah data, jadi gunakan database pengembangan.

## Catatan
- API menggunakan format JSON.
- Validasi input dan penanganan kesalahan diterapkan pada endpoint API.
- File `.env` berisi konfigurasi lokal dan tidak boleh dibagikan ke repositori publik.
