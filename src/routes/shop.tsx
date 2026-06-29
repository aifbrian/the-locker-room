import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { listFacets, listProducts, type ProductSort } from "@/lib/catalog";
import { Search } from "lucide-react";

const shopSearchSchema = z.object({
  q: z.string().optional(),
  league: z.string().optional(),
  club: z.string().optional(),
  brand: z.string().optional(),
  season: z.string().optional(),
  category: z.string().optional(),
  country: z.string().optional(),
  vintage: z.boolean().optional(),
  limited: z.boolean().optional(),
  sale: z.boolean().optional(),
  sort: z
    .enum(["newest", "bestseller", "price-asc", "price-desc", "name-asc", "name-desc"])
    .optional(),
  page: z.number().int().min(1).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: shopSearchSchema,
  head: () => ({
    meta: [
      { title: "Shop Jersey Original — The Locker Room" },
      {
        name: "description",
        content:
          "Jelajahi koleksi jersey original dari liga top dunia, tim nasional, hingga vintage langka. Filter berdasarkan liga, klub, brand, dan musim.",
      },
      { property: "og:title", content: "Shop Jersey Original — The Locker Room" },
      { property: "og:url", content: "https://lockerroom-albert.lovable.app/shop" },
    ],
    links: [{ rel: "canonical", href: "https://lockerroom-albert.lovable.app/shop" }],
  }),
  component: ShopPage,
});

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "newest", label: "Terbaru" },
  { value: "bestseller", label: "Terlaris" },
  { value: "price-asc", label: "Harga Termurah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "name-asc", label: "A → Z" },
  { value: "name-desc", label: "Z → A" },
];

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [searchInput, setSearchInput] = useState(search.q ?? "");

  const filters = useMemo(
    () => ({
      search: search.q,
      league: search.league,
      club: search.club,
      brand: search.brand,
      season: search.season,
      category: search.category,
      country: search.country,
      vintage: search.vintage,
      limited: search.limited,
      sale: search.sale,
    }),
    [search],
  );
  const sort = search.sort ?? "newest";
  const page = search.page ?? 1;

  const facetsQuery = useQuery({
    queryKey: ["facets"],
    queryFn: listFacets,
    staleTime: 5 * 60_000,
  });

  const productsQuery = useQuery({
    queryKey: ["products", filters, sort, page],
    queryFn: () => listProducts({ filters, sort, page, pageSize: 12 }),
  });

  function updateSearch(patch: Record<string, unknown>) {
    navigate({
      search: (prev: Record<string, unknown>) => {
        const next: Record<string, unknown> = { ...prev, ...patch, page: 1 };
        Object.keys(next).forEach((k) => {
          const v = next[k];
          if (v === "" || v === undefined || v === false) {
            delete next[k];
          }
        });
        return next;
      },
    });
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    updateSearch({ q: searchInput.trim() || undefined });
  }

  const total = productsQuery.data?.total ?? 0;
  const items = productsQuery.data?.items ?? [];
  const totalPages = Math.max(1, Math.ceil(total / 12));

  return (
    <>
      <Navbar />
      <main className="container-x py-10 lg:py-16">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Katalog</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
              Shop Jersey
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink/60">
              Koleksi jersey original terkurasi — terjamin keasliannya.
            </p>
          </div>
          <form onSubmit={submitSearch} className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari jersey, klub, player…"
              className="h-11 w-full rounded-full border border-border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-pitch"
            />
          </form>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-2">
            <FilterToggle
              label="Sale"
              checked={!!search.sale}
              onChange={(v) => updateSearch({ sale: v || undefined })}
            />
            <FilterToggle
              label="Vintage"
              checked={!!search.vintage}
              onChange={(v) => updateSearch({ vintage: v || undefined })}
            />
            <FilterToggle
              label="Limited Edition"
              checked={!!search.limited}
              onChange={(v) => updateSearch({ limited: v || undefined })}
            />

            <FacetGroup
              title="Liga"
              value={search.league}
              options={(facetsQuery.data?.leagues ?? []).map((l) => ({ value: l.slug, label: l.name }))}
              onChange={(v) => updateSearch({ league: v })}
            />
            <FacetGroup
              title="Klub"
              value={search.club}
              options={(facetsQuery.data?.clubs ?? []).map((c) => ({ value: c.slug, label: c.name }))}
              onChange={(v) => updateSearch({ club: v })}
            />
            <FacetGroup
              title="Brand"
              value={search.brand}
              options={(facetsQuery.data?.brands ?? []).map((b) => ({ value: b.slug, label: b.name }))}
              onChange={(v) => updateSearch({ brand: v })}
            />
            <FacetGroup
              title="Musim"
              value={search.season}
              options={(facetsQuery.data?.seasons ?? []).map((s) => ({ value: s.label, label: s.label }))}
              onChange={(v) => updateSearch({ season: v })}
            />
            <FacetGroup
              title="Kategori"
              value={search.category}
              options={(facetsQuery.data?.categories ?? []).map((c) => ({ value: c.slug, label: c.name }))}
              onChange={(v) => updateSearch({ category: v })}
            />
            <FacetGroup
              title="Negara"
              value={search.country}
              options={(facetsQuery.data?.countries ?? []).map((c) => ({ value: c.code, label: c.name }))}
              onChange={(v) => updateSearch({ country: v })}
            />
          </aside>

          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink/60">
                {productsQuery.isLoading
                  ? "Memuat…"
                  : `${total} produk ditemukan`}
              </p>
              <select
                value={sort}
                onChange={(e) => navigate({ search: (p) => ({ ...p, sort: e.target.value as ProductSort, page: 1 }) })}
                className="h-10 rounded-full border border-border bg-white px-4 text-sm font-medium text-ink outline-none focus:border-pitch"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    Urutkan: {o.label}
                  </option>
                ))}
              </select>
            </div>

            {productsQuery.isLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-bone" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-16 text-center">
                <h2 className="font-display text-2xl font-bold text-ink">Tidak ada produk</h2>
                <p className="mt-2 text-sm text-ink/60">Coba ubah filter atau kata kunci pencarianmu.</p>
                <button
                  onClick={() => navigate({ search: {} })}
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-pitch"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pg = i + 1;
                  const active = pg === page;
                  return (
                    <Link
                      key={pg}
                      to="/shop"
                      search={(prev) => ({ ...prev, page: pg })}
                      className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold ${
                        active ? "bg-ink text-white" : "text-ink/70 hover:bg-bone"
                      }`}
                    >
                      {pg}
                    </Link>
                  );
                })}
              </nav>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[color:var(--pitch)]"
      />
    </label>
  );
}

function FacetGroup({
  title,
  value,
  options,
  onChange,
}: {
  title: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string | undefined) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">{title}</h3>
      <div className="space-y-1.5">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(active ? undefined : o.value)}
              className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-sm transition ${
                active ? "bg-ink text-white font-semibold" : "text-ink/75 hover:bg-bone"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
