import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, ShieldCheck, Truck, RotateCcw, Share2 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatIDR, getProductBySlug, listRelatedProducts } from "@/lib/catalog";

export const Route = createFileRoute("/produk/$slug")({
  loader: async ({ params }) => {
    const product = await getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — The Locker Room` : "Produk — The Locker Room";
    const desc = p?.short_description ?? p?.description ?? "Jersey original terkurasi.";
    const url = `https://lockerroom-albert.lovable.app/produk/${params.slug}`;
    const img = (p?.images as Array<{ url: string; is_primary: boolean }> | undefined)?.find(
      (i) => i.is_primary,
    )?.url;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(img ? [{ property: "og:image", content: img }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <>
      <Navbar />
      <main className="container-x py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold text-ink">Produk tidak ditemukan</h1>
        <p className="mt-3 text-ink/60">Mungkin produk telah dihapus atau slug tidak valid.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-pitch"
        >
          Kembali ke Shop
        </Link>
      </main>
      <Footer />
    </>
  ),
  errorComponent: ({ error }) => (
    <>
      <Navbar />
      <main className="container-x py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">Terjadi kesalahan</h1>
        <p className="mt-3 text-sm text-ink/60">{error.message}</p>
      </main>
      <Footer />
    </>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const images = (product.images ?? []).sort(
    (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order,
  ) as Array<{ id: string; url: string; alt: string | null; is_primary: boolean }>;
  const variants = (product.variants ?? []) as Array<{
    id: string;
    size: string;
    stock: number;
    additional_price: number;
  }>;
  const sortedVariants = [...variants].sort((a, b) => {
    const order = ["S", "M", "L", "XL", "XXL"];
    return order.indexOf(a.size) - order.indexOf(b.size);
  });

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    sortedVariants.find((v) => v.stock > 0)?.id ?? null,
  );

  const onSale = product.sale_price != null && Number(product.sale_price) < Number(product.base_price);
  const variantObj = sortedVariants.find((v) => v.id === selectedVariant) ?? null;
  const price =
    (onSale ? Number(product.sale_price) : Number(product.base_price)) +
    (variantObj ? Number(variantObj.additional_price) : 0);
  const discount = onSale
    ? Math.round(
        ((Number(product.base_price) - Number(product.sale_price)) / Number(product.base_price)) * 100,
      )
    : 0;

  const related = useQuery({
    queryKey: ["related", product.id, product.club_id],
    queryFn: () => listRelatedProducts(product.id, product.club_id ?? null),
  });

  const heroImg = images[activeImg]?.url;

  function handleAddToCart() {
    if (!selectedVariant) {
      toast.error("Pilih ukuran dulu");
      return;
    }
    // Cart integration arrives in Phase 3
    toast.success("Ditambahkan ke keranjang", {
      description: `${product.name} (${variantObj?.size})`,
    });
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product.name, url }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link disalin");
    }
  }

  return (
    <>
      <Navbar />
      <main className="container-x py-8 lg:py-12">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink/50">
          <Link to="/" className="hover:text-ink">Beranda</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-bone">
              {heroImg ? (
                <img src={heroImg} alt={product.name} className="h-full w-full object-cover" />
              ) : null}
              <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                {product.is_vintage && (
                  <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Vintage
                  </span>
                )}
                {product.is_limited && (
                  <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    Limited
                  </span>
                )}
                {onSale && (
                  <span className="rounded-full bg-pitch px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                      activeImg === i ? "border-ink" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-pitch">
              {(product.brand as { name: string } | null)?.name}
              {(product.league as { name: string } | null)?.name && (
                <>
                  <span className="text-ink/30">·</span>
                  {(product.league as { name: string }).name}
                </>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-ink/50">SKU: {product.sku}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-ink">
                {formatIDR(price)}
              </span>
              {onSale && (
                <span className="text-base text-ink/40 line-through">
                  {formatIDR(Number(product.base_price))}
                </span>
              )}
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink/60">
                  Ukuran
                </h3>
                <button className="text-xs font-semibold text-pitch hover:underline">
                  Panduan Size
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sortedVariants.map((v) => {
                  const oos = v.stock <= 0;
                  const active = selectedVariant === v.id;
                  return (
                    <button
                      key={v.id}
                      disabled={oos}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`relative grid h-12 place-items-center rounded-xl border text-sm font-semibold transition ${
                        active
                          ? "border-ink bg-ink text-white"
                          : oos
                            ? "cursor-not-allowed border-border bg-bone text-ink/30 line-through"
                            : "border-border text-ink hover:border-ink"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
              {variantObj && (
                <p className="mt-2 text-xs text-ink/50">
                  Stok ukuran {variantObj.size}: {variantObj.stock}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="h-12 flex-1 rounded-full bg-ink text-sm font-semibold text-white transition hover:bg-pitch"
              >
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleAddToCart}
                className="h-12 flex-1 rounded-full border-2 border-ink text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
              >
                Beli Sekarang
              </button>
              <button
                aria-label="Wishlist"
                className="grid h-12 w-12 place-items-center rounded-full border border-border text-ink/70 hover:border-ink hover:text-ink"
              >
                <Heart size={18} />
              </button>
              <button
                aria-label="Share"
                onClick={handleShare}
                className="grid h-12 w-12 place-items-center rounded-full border border-border text-ink/70 hover:border-ink hover:text-ink"
              >
                <Share2 size={18} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border p-4">
              <Badge icon={<ShieldCheck size={18} />} label="100% Original" />
              <Badge icon={<Truck size={18} />} label="Pengiriman Aman" />
              <Badge icon={<RotateCcw size={18} />} label="Tukar 7 Hari" />
            </div>

            <section className="mt-10 space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">Deskripsi</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/75">
                  {product.description}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {product.material && <Row label="Material" value={product.material} />}
                {product.sponsor && <Row label="Sponsor" value={product.sponsor} />}
                {product.patch && <Row label="Patch" value={product.patch} />}
                {(product.season as { label: string } | null)?.label && (
                  <Row label="Musim" value={(product.season as { label: string }).label} />
                )}
                {(product.club as { name: string } | null)?.name && (
                  <Row label="Klub" value={(product.club as { name: string }).name} />
                )}
                {(product.country as { name: string } | null)?.name && (
                  <Row label="Negara" value={(product.country as { name: string }).name} />
                )}
                {product.condition && <Row label="Kondisi" value={product.condition} />}
              </dl>
            </section>
          </div>
        </div>

        {related.data && related.data.length > 0 && (
          <section className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-extrabold text-ink lg:text-3xl">
                Produk Terkait
              </h2>
              <Link to="/shop" className="text-sm font-semibold text-pitch hover:underline">
                Lihat semua
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {related.data.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="text-pitch">{icon}</span>
      <span className="text-[11px] font-semibold text-ink/70">{label}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-2">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
