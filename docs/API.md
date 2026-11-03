# Dokumentasi REST API SisaBaik

## 1. Deskripsi

SisaBaik merupakan aplikasi untuk membantu penyedia menawarkan makanan berlebih yang masih layak dikonsumsi. Backend menggunakan REST API dengan Node.js, Express.js, dan PostgreSQL.

Proyek ini menggunakan data fiktif untuk praktikum lokal dan belum ditujukan sebagai layanan transaksi publik.

## 2. Teknologi dan Persiapan

Teknologi:
- Node.js
- Express.js
- PostgreSQL
- JavaScript

Persiapan:
1. Pastikan Node.js dan PostgreSQL sudah terpasang.
2. Siapkan konfigurasi database pada `.env` berdasarkan `.env.example`.
3. Instal dependensi menggunakan `npm install`.
4. Jalankan server menggunakan `npm run dev`.

Jangan membagikan file `.env` karena berisi konfigurasi lokal.

## 3. Base URL dan Format Response

Base URL:

`http://localhost:3000`

Response berhasil menggunakan format:

```json
{
  "success": true,
  "data": {}
}
```

Response gagal menggunakan format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Pesan kesalahan."
  }
}
```

Response koleksi dilengkapi metadata:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "jumlah": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

`meta.jumlah` menunjukkan jumlah seluruh data yang sesuai dengan filter, bukan hanya jumlah data pada halaman saat ini.

## 4. Endpoint Health Check

### GET `/api/health`

Memeriksa status API dan koneksi database.

Response berhasil:
- `200 OK`

## 5. Endpoint Penawaran

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/penawaran` | Mengambil daftar penawaran |
| GET | `/api/penawaran/:id` | Mengambil detail penawaran |
| POST | `/api/penawaran` | Membuat penawaran |
| PUT | `/api/penawaran/:id` | Mengubah seluruh atribut penawaran yang dapat diedit |
| DELETE | `/api/penawaran/:id` | Menghapus penawaran jika tidak memiliki riwayat pesanan |

### 5.1 GET Daftar Penawaran

`GET /api/penawaran`

Mendukung pencarian, filter, dan paginasi.

Parameter yang tersedia:
- `q`: mencari berdasarkan kata kunci.
- `kategori`: memfilter kategori.
- `status`: memfilter status penawaran.
- `tersedia`: memfilter ketersediaan.
- `page`: menentukan halaman.
- `limit`: menentukan jumlah data per halaman.

Contoh:

`GET /api/penawaran?q=nasi&tersedia=true&page=1&limit=10`

Parameter dapat digabungkan sesuai kebutuhan.

### 5.2 POST Penawaran

`POST /api/penawaran`

Digunakan untuk membuat penawaran baru. Data dikirim dalam format JSON sesuai field yang diwajibkan API.

Response berhasil:
- `201 Created`
- Menyertakan data penawaran dan header `Location`.

### 5.3 PUT Penawaran

`PUT /api/penawaran/:id`

Digunakan untuk mengganti seluruh atribut penawaran yang dapat diedit.

Field yang digunakan:
- `penyediaId`
- `nama`
- `kategori`
- `hargaNormal`
- `hargaPenawaran`
- `stok`
- `satuan`
- `status`
- `berakhirPada`

Semua field yang diwajibkan harus dikirim. ID dan waktu pembuatan tidak dikirim oleh client. Penyedia pemilik penawaran tidak dapat diganti.

### 5.4 DELETE Penawaran

`DELETE /api/penawaran/:id`

Penawaran dapat dihapus jika tidak memiliki riwayat pesanan.

Penawaran yang sudah digunakan dalam transaksi akan ditolak dengan `409 Conflict` agar riwayat transaksi tetap terjaga.

Response berhasil:
- `204 No Content`
- Tidak memiliki response body.

## 6. Endpoint Pesanan

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/pesanan` | Mengambil daftar pesanan |
| GET | `/api/pesanan/:id` | Mengambil detail pesanan |
| POST | `/api/pesanan` | Membuat pesanan |

### 6.1 GET Daftar Pesanan

`GET /api/pesanan`

Mengambil koleksi ringkasan pesanan dengan metadata paginasi.

### 6.2 GET Detail Pesanan

`GET /api/pesanan/:id`

Mengambil informasi header pesanan dan detail item pesanan.

### 6.3 POST Pesanan

`POST /api/pesanan`

Membuat pesanan baru menggunakan data JSON.

Field pesanan:
- `emailPembeli`: email pembeli.
- `penawaranId`: ID penawaran yang dipesan.
- `kuantitas`: jumlah makanan yang dipesan.

Contoh:

```json
{
  "emailPembeli": "pembeli@example.com",
  "penawaranId": "17",
  "kuantitas": 1
}
```

ID penawaran dikirim sebagai string. Contoh ID tersebut hanya ilustrasi.

Ketentuan pemesanan:
- Stok harus mencukupi.
- Pesanan harus berasal dari satu penyedia.
- Harga disimpan sebagai snapshot saat transaksi.
- Perubahan harga penawaran setelah transaksi tidak mengubah harga pesanan sebelumnya.
- Proses pesanan menggunakan transaksi database.
- Jika proses gagal, transaksi dibatalkan agar tidak terjadi perubahan data sebagian.

Response berhasil:
- `201 Created`
- Menyertakan data pesanan dan header `Location`.

## 7. Kode Status HTTP

| Status | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Resource berhasil dibuat |
| 204 | Berhasil tanpa response body |
| 400 | Input atau parameter tidak valid |
| 404 | Resource tidak ditemukan |
| 409 | Terjadi konflik aturan bisnis |
| 413 | Ukuran request terlalu besar |
| 415 | Format Content-Type tidak didukung |
| 500 | Terjadi kesalahan server |

## 8. Validasi dan Keamanan

API menerapkan beberapa perlindungan:
- Validasi path parameter dan query parameter.
- Validasi format JSON dan tipe data.
- Validasi nilai harga, stok, status, dan waktu.
- Query PostgreSQL menggunakan parameter.
- Transaksi database menggunakan mekanisme rollback ketika proses gagal.
- Penanganan kesalahan menggunakan format response yang konsisten.
- File `.env` tidak boleh diunggah ke repositori publik.

API ini belum dilengkapi autentikasi dan otorisasi sehingga hanya digunakan untuk praktikum lokal.

## 9. Pengujian API

Jalankan server:

```bash
npm run dev
```

Jalankan pengujian otomatis:

```bash
npm run api:test
```

Pengujian dapat membuat, mengubah, atau menghapus data. Gunakan database pengembangan dan periksa dampaknya setelah pengujian.

Pengujian konkurensi:

```bash
node scripts/uji-konkurensi.js
```

Pengujian konkurensi digunakan untuk memastikan dua pesanan yang masuk secara bersamaan tidak dapat mengambil stok yang sama melebihi jumlah tersedia.

Hasil aktual pengujian dicatat dalam:

`docs/hasil-uji-chapter7.md`

## 10. Struktur Alur API

Alur request secara umum:

1. Router menerima request berdasarkan method dan URL.
2. Controller membaca input dan menjalankan validasi.
3. Repository menjalankan query ke PostgreSQL.
4. Service mengatur aturan bisnis dan transaksi pesanan.
5. API mengirim response kepada client.