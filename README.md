
🌱 **Aplikasi AgriGo - Sayur Segar untuk Semua** 🥕 
======================================================================

🎯**Tujuan Aplikasi**: 
Aplikasi AgriGo bertujuan untuk mempermudah masyarakat dalam membeli sayur segar secara online. Menyediakan berbagai pilihan sayuran lokal berkualitas tinggi yang dapat diakses kapan saja dan diantar langsung ke pintu rumah.

🌟 **Latar Belakang**
Di tengah kesibukan masyarakat modern, memperoleh sayuran segar yang berkualitas bisa menjadi tantangan. AgriGo hadir untuk memecahkan masalah ini dengan memberikan kemudahan dalam membeli sayuran langsung dari petani lokal. Aplikasi ini memungkinkan pengguna untuk mendapatkan sayuran segar dengan cara yang lebih praktis dan efisien, tanpa harus keluar rumah.

🏙️ **Masalah yang Dihadapi**
Banyak masyarakat yang kesulitan untuk mendapatkan sayuran segar dengan harga yang terjangkau dan berkualitas. Terlebih lagi, keberagaman pasar lokal sering membuat konsumen bingung memilih sayuran yang segar dan sehat. AgriGo hadir untuk mengatasi masalah tersebut dengan menyediakan berbagai pilihan sayuran berkualitas langsung dari petani.

🚀 **Fitur Utama Aplikasi** 
Aplikasi AgriGo dilengkapi dengan berbagai fitur yang dirancang untuk memberikan pengalaman terbaik bagi penggunanya. Berikut adalah fitur-fitur utama:

🔐 1. **Halaman HomeScreen**
-Tampilan awal pada aplikasi, pengguna dapat melihat beberapa contoh warung yang di arahkan langsung ke Google Maps

<img width="202" alt="home" src="https://github.com/user-attachments/assets/8a927e9c-e31f-4ef4-a5f8-435211ff588f" />


🥕 2. **List Warung yang menjual Sayuran Segar**
- Menampilkan list dari berbagai warung yang menjual pilihan sayur segar yang diproduksi secara lokal.
- Setiap warung dilengkapi dengan informasi detail, termasuk rating, ulasan, alamat, titik koordinat, jenis warung, dan gambar.
- Sayuran dipanen langsung dari petani lokal dan dikirim dalam kondisi segar

<img width="201" alt="list data" src="https://github.com/user-attachments/assets/51aa6e5b-82da-463f-84d3-912b90f85b89" />


🌍 3. **Maps titik warung**
- menampilkan persebaran titik warung/toko/grosir yang menjual sayur segar dengan marker merah
- pengguna dapat melihat seberapa jauh warung dari titik lokasi pengguna berada dengan memanfaatkan google maps
- dapat menambah titik secara langsung dengan klik pada peta

<img width="202" alt="map_ada titik" src="https://github.com/user-attachments/assets/a40fd4eb-93b6-4789-a452-60ebcba5e4bb" />


✏️ 4. **Edit data warung**
- Penjual/petani lokal dapat menambahkan warung miliknya berdasarkan template informasi detail seperti nama toko, lokasi koordinat, foto, keterangan, kategori, kontak, jam buka, rating, ulasan, dan lain-lain

<img width="205" alt="edit data" src="https://github.com/user-attachments/assets/a8e29da9-a1a6-46e1-b868-7f962d1b6a2f" />

   
(+)5. **Form Tambah titik warung**
- pengguna dapat menambahkan warung dengan rincian yang jelas agar menjadi informasi yang dapat membantu orang yang akan membeli sayur

<img width="207" alt="Tambah warung" src="https://github.com/user-attachments/assets/a01a0a8e-2691-45f3-b63f-91d8153b6cde" />


⚙️ **Komponen Pembangun Produk:**
1. Frontend (UI/UX):
- React Native: Digunakan untuk membangun aplikasi mobile yang kompatibel di Android dan iOS.
- Fontawesome: Untuk menambahkan icon menarik dan interaktif.
- React Navigation: Untuk pengaturan navigasi antar halaman. Komponen ini meliputi pembuatan Homescreen, ListScreen, EditScreen, dan MapSCreen

2. Backend (Server-side):
- Map libre untuk menampilkan peta pada aplikasi
- json-server: Database untuk menyimpan data produk, pengguna, dan transaksi.

📊 **Sumber Data:**
- Lokasi Warung Sayuran Segar: Diperoleh dari scrawling data di Google Maps.
- Rute ke warung: Menggunakan rute dari Google Maps
- Ulasan Pengguna: Data ulasan dan rating berasal dari feedback pengguna - yang telah membeli produk.
- Basemap aplikasi dengan memanfaatkan Map Libre

