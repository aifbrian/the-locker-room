
## Konteks

Landing page, database (30+ tabel + RLS + storage), Auth (email + Google), route shell `_authenticated` dan `_admin` sudah selesai di Phase 0–1. Rencana ini melanjutkan ke fitur produk hingga admin panel, memakai stack Lovable (TanStack Start + Supabase + Tailwind v4 + shadcn), bukan Next.js/Laravel — agar tetap satu codebase yang production-ready.

## Phase 2 — Katalog & Produk (Customer)

- Server functions publik (publishable client + policy `TO anon`) untuk listing & detail produk:
  - `listProducts({ filters, sort, page })` — filter liga, klub, negara, brand, musim, ukuran, player, harga, vintage, limited, availability; sort terbaru/terlaris/harga/A-Z.
  - `getProductBySlug(slug)` + related products.
  - `listFacets()` untuk sidebar filter dinamis.
- Routes:
  - `/shop` — grid + sidebar filter, sort dropdown, pagination, search realtime (debounce), skeleton & empty state.
  - `/produk/$slug` — gallery + zoom, video, varian ukuran, stok, harga & diskon, deskripsi, material, patch/sponsor/player, authenticity, review, FAQ, related, tombol Wishlist / Add to Cart / Buy Now.
  - `/koleksi/$type/$slug` — landing per liga/klub/brand/musim (SEO).
- SEO per route: title, description, OG, canonical, JSON-LD Product.

## Phase 3 — Wishlist, Cart, Checkout, Pembayaran

- Wishlist: server fn auth (`requireSupabaseAuth`) add/remove/move-to-cart, halaman `/akun/wishlist`.
- Cart: server fn CRUD `cart_items`, halaman `/keranjang` (qty, hapus, voucher via `lookup_voucher`, estimasi ongkir, ringkasan).
- Checkout `/checkout`:
  - Form penerima + alamat (Provinsi/Kota/Kecamatan/Kodepos) pakai React Hook Form + Zod.
  - Pilih kurir & layanan via integrasi shipping (Biteship/RajaOngkir) — server route `/api/public/shipping/rates` proxy aman dengan secret `SHIPPING_API_KEY` (akan diminta lewat add_secret).
  - Pilih bank tujuan (dari `bank_accounts`).
  - Submit → server fn `createOrder` (generate `TLR-YYYYMMDD-XXXXXX`, status `pending_payment`, kurangi stok di transaction, simpan snapshot harga).
- `/pesanan/$orderNumber/pembayaran`: instruksi transfer, countdown, upload bukti ke bucket `payment-proofs` (validasi tipe/size), status → `waiting_verification`.
- `/pesanan/$orderNumber`: tracking timeline (dari `order_status_history` + `shipment_events`), nomor resi, kurir, estimasi.

## Phase 4 — Akun Customer

`/akun` dashboard ringkas, sub-route: profil, alamat (CRUD), wishlist, pesanan (list + detail + invoice cetak), ubah password, logout. Semua via server fn auth.

## Phase 5 — Admin Panel (`/_admin`, role admin/staff)

- Layout: sidebar shadcn collapsible, header dengan trigger.
- Dashboard: KPI (penjualan, order, pending, revenue, customer baru, low stock), chart penjualan & top produk, recent orders, low stock list.
- Produk: CRUD produk + varian + gambar (upload `product-images`) + video, SKU otomatis, status (featured/best/vintage/limited/sale/publish/draft), bulk delete, import CSV.
- Master data: kategori, liga, klub, negara, brand, musim, player, ukuran, kurir & layanan.
- Pesanan: list + filter/search, detail, lihat & zoom bukti transfer, approve/reject pembayaran (catatan admin), input resi & kurir, update status (packing/shipping/delivered/cancelled/refund/return), generate invoice PDF, trigger notifikasi.
- Inventory: stok per varian, mutasi/adjustment, history, alert low/out of stock.
- Customer: list, riwayat belanja, alamat, suspend (role).
- Banner, Voucher, Review moderation, Blog CMS (rich text), Reports (export CSV/Excel/PDF, filter tanggal), Settings toko (logo, kontak, alamat, rekening, SEO, sosial).
- Semua mutasi admin via server fn dengan guard `has_role('admin'|'staff')` + audit log ke `audit_logs`.

## Phase 6 — Performa, SEO, Aksesibilitas, Polish

- Lazy load gambar, format WebP/AVIF, skeletons, code splitting per route.
- SEO: sitemap.xml dinamis (route `/api/public/sitemap.xml`), robots.txt, OG image per produk, schema Product/BreadcrumbList/Organization.
- A11y: WCAG AA, fokus terlihat, ARIA, kontras.
- Mobile-first untuk seluruh halaman; sticky header & sticky checkout summary.
- Notifikasi: toast (sonner) + insert ke tabel `notifications`; email transaksional (opsional Resend) untuk status order.
- Rate limit pada server route publik, validasi Zod di setiap input.

## Catatan Teknis

- Tetap di stack Lovable: TanStack Start + Supabase + Tailwind v4 + shadcn. Tidak memakai Next.js/Laravel/MySQL — Postgres + RLS sudah memenuhi requirement keamanan & relasional PRD.
- Pembayaran: manual transfer + upload bukti (sesuai keputusan sebelumnya). QRIS disiapkan sebagai field opsional, belum diintegrasikan.
- Shipping API: butuh secret (`BITESHIP_API_KEY` atau `RAJAONGKIR_API_KEY`) — akan diminta saat masuk Phase 3.
- Setiap phase ditutup dengan smoke test alur kritikal (browse → cart → checkout → upload bukti → admin verify → resi → delivered).

## Pertanyaan sebelum eksekusi

1. Pilih provider shipping: **Biteship** (rekomendasi, modern, banyak kurir) atau **RajaOngkir**?
2. Mulai dari **Phase 2 (Katalog & Produk)** dulu, atau kerjakan Phase 2+3 sekaligus dalam satu batch besar?
