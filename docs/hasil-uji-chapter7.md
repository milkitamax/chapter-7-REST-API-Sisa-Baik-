# Hasil Pengujian SisaBaik Chapter 7

## Lingkungan Pengujian
- Runtime: Node.js
- Backend: Express.js
- Database: PostgreSQL
- Jenis pengujian: Pengujian endpoint REST API

## Hasil Pengujian Sebelumnya

Pengujian otomatis API sebelumnya telah dijalankan dan seluruh skenario yang dilaporkan berstatus PASS.

Skenario mencakup:
- Pemeriksaan status API.
- Validasi parameter pencarian dan paginasi.
- Penanganan ID yang tidak valid atau tidak ditemukan.
- Pembuatan, pembaruan, dan penghapusan penawaran.
- Pencarian dan filter penawaran.
- Penanganan pesanan dan konflik stok.
- Pemeriksaan dampak transaksi terhadap data.

## Catatan
Hasil ini merujuk pada pengujian sebelumnya. Jalankan kembali pengujian akhir setelah seluruh file proyek selesai diperbarui untuk memastikan hasilnya tetap sesuai.

## Pengujian Konkurensi

- Script: scripts/uji-konkurensi.js
- Penawaran uji: ID 17
- Dua request pesanan dikirim secara bersamaan.
- Hasil aktual: PASS
- Status HTTP: satu 201 Created dan satu 409 Conflict.
- Stok akhir: 0.
- Kesimpulan: stok satu tidak berhasil dipesan dua kali.
