
# The Locker Room — Full E-Commerce Web Application

Skala PRD ini sangat besar. Saya akan kerjakan di Lovable (TanStack Start + Lovable Cloud / Postgres + Auth + Storage + Server Functions), bukan Next.js/Laravel/MySQL — fitur, alur, dan tampilannya tetap sama. Eksekusi dipecah ke 6 fase agar tiap iterasi tetap stabil dan dapat di-review. Landing page yang sudah ada dipakai sebagai homepage.

## Fase 0 — Pondasi (1 iterasi)
- Enable Lovable Cloud (Auth + DB + Storage + Server Functions).
- Aktifkan koneksi RajaOngkir/Biteship (saya akan minta API key lewat add_secret pada saat dibutuhkan).
- Buat bucket storage: `product-images`, `payment-proofs` (private), `banners`, `blog`.
- Layout app: `_authenticated/` untuk area customer login, `_admin/` (role-gated) untuk admin, header/footer global, toaster, react-query.
- Role system: `app_role` enum (`admin`, `staff`, `customer`), tabel `user_roles`, fungsi `has_role()`, RLS via security definer.

## Fase 1 — Database & Auth
Skema utama (semua dengan RLS + GRANT eksplisit, soft delete, timestamps, audit log):
`profiles, addresses, leagues, clubs, countries, brands, seasons, players, categories, products, product_variants (size/stock/SKU), product_images, product_videos, wishlists, carts, cart_items, vouchers, voucher_redemptions, orders, order_items, order_status_history, payments (bukti transfer), shipments (kurir, resi, tracking events), reviews, banners, blog_posts, blog_categories, store_settings, bank_accounts, couriers, courier_services, audit_logs, notifications`.
Status order enum sesuai PRD (Pending Payment → Returned). Order number auto: `TLR-YYYYMMDD-XXXXXX` via DB trigger.

## Fase 2 — Customer: Catalog & Product
- `/shop` grid + pagination + sort (terbaru, terlaris, harga, A-Z) + filter (liga, klub, negara, musim, brand, ukuran, player, harga, vintage, limited, availability), search realtime (debounced server fn).
- `/product/$slug`: gallery + zoom + video, varian ukuran, size guide, deskripsi, material, patch/sponsor, related, review, FAQ, wishlist, share, Add to Cart, Buy Now, JSON-LD Product.
- Wishlist (auth) + cart (auth & guest via localStorage merge saat login).

## Fase 3 — Customer: Checkout, Payment, Tracking
- Cart page (CRUD qty, voucher, estimasi ongkir, ringkasan).
- Checkout 1-page: data penerima, alamat (provinsi/kota/kecamatan dari API ongkir), kurir+layanan (ongkir realtime via server fn → RajaOngkir/Biteship), metode bank, ringkasan, T&C.
- Submit → buat order (status Pending Payment) → halaman instruksi pembayaran: rekening, jumlah, countdown, upload bukti transfer (validasi tipe+ukuran, simpan ke storage private), status menjadi Waiting Verification.
- `/tracking/$orderNumber` + `/akun/orders/$id`: timeline status visual, resi, kurir, ETA, riwayat.
- Email notifikasi via Lovable AI Gateway / Resend connector (order dibuat, bukti diterima, pembayaran diverifikasi, dikirim + resi, selesai).

## Fase 4 — Customer: My Account
Dashboard, profil, alamat (CRUD), wishlist, daftar pesanan + invoice (PDF render via react-pdf di server fn), tracking, riwayat, pengaturan, ubah password, logout.

## Fase 5 — Admin Panel (`/_admin`, gated `has_role('admin')`)
- Dashboard: KPI cards, grafik penjualan, top produk, recent orders, low stock.
- Produk: CRUD lengkap + varian + multi-foto/video, SKU auto, featured/bestseller/vintage/limited/sale, draft/publish, import CSV, bulk action.
- Master data: kategori, liga, klub, negara, brand, season, player, kurir, rekening bank.
- Pesanan: list/filter/search, detail, lihat & zoom bukti transfer, approve/reject pembayaran (alasan), catatan admin, generate invoice, input resi+kurir, update status (packing/ship/deliver/cancel/refund/return) → trigger email + status_history.
- Inventory: stock, mutasi, history, low-stock alert, adjustment.
- Customer: list, riwayat belanja, alamat, suspend.
- Banner, Voucher (% / nominal, min belanja, kuota, masa berlaku), Review moderation, Blog CMS (rich text, SEO, draft/publish).
- Reports: penjualan/produk/customer/revenue, filter tanggal, export CSV/Excel/PDF.
- Settings toko: profil, logo, kontak, alamat, rekening, kurir, email, SEO, sosmed, footer.

## Fase 6 — Polish
SEO (sitemap.xml dinamis, robots, OG per route, schema.org Product/BreadcrumbList/Organization), performance (image WebP/AVIF via vite-imagetools, lazy load, code split, preload LCP), accessibility (WCAG AA, focus ring, ARIA, kontras), UX states (skeleton, empty, error, konfirmasi delete, success animation), security audit (RLS review, rate limit di server fn sensitif, validasi Zod, secure upload), responsive QA.

## Detail teknis penting
- **Stack**: TanStack Start + React 19 + TS + Tailwind v4 + shadcn + TanStack Query + React Hook Form + Zod. Server logic via `createServerFn` (RLS as user) + `requireSupabaseAuth`; admin actions cek `has_role` lalu pakai `supabaseAdmin` di dalam handler.
- **Ongkir**: server fn `calculate_shipping` panggil RajaOngkir/Biteship dengan API key dari secret; cache provinsi/kota/kecamatan di tabel `regions`.
- **Pembayaran manual**: tabel `payments` (order_id, bank, jumlah, proof_url, status, verified_by, verified_at, reject_reason). Bucket `payment-proofs` private — admin akses lewat signed URL.
- **Order number**: sequence harian via trigger PL/pgSQL.
- **Audit log**: trigger insert ke `audit_logs` untuk tabel kritikal (orders, payments, products, user_roles).
- **Email**: Resend connector (akan diminta saat fase 3); template Indonesia.
- **Identitas visual**: melanjutkan Swiss design + token warna pitch green/gold yang sudah ada di `src/styles.css`.

## Yang saya butuhkan dari Anda (di fase terkait, bukan sekarang)
1. Konfirmasi enable Lovable Cloud saat fase 0 dimulai.
2. API key RajaOngkir atau Biteship (fase 3).
3. Resend API key + verified sender domain (fase 3) — atau pakai default Lovable email.
4. Daftar rekening bank toko + info toko (alamat, kontak, sosmed) untuk seed `store_settings` & `bank_accounts`.

## Cara saya akan jalankan
Setelah plan disetujui, saya kerjakan fase 0 + 1 di iterasi pertama (Cloud + skema DB + role + layout admin/customer). Anda review, lalu saya lanjut fase 2 dst. Tiap fase = 1–2 pesan agar saya bisa verifikasi build & RLS sebelum lanjut. Jangan minta semua fase dalam satu pesan — risiko build break dan susah di-review tinggi.

Setuju mulai dari Fase 0 + 1?
