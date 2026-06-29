import { supabase } from "@/integrations/supabase/client";

export type ProductSort =
  | "newest"
  | "bestseller"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface ProductListFilters {
  search?: string;
  league?: string; // slug
  club?: string;
  brand?: string;
  season?: string; // label
  category?: string;
  country?: string; // code
  vintage?: boolean;
  limited?: boolean;
  sale?: boolean;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface ListProductsArgs {
  filters?: ProductListFilters;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  base_price: number;
  sale_price: number | null;
  is_vintage: boolean;
  is_limited: boolean;
  is_sale: boolean;
  is_bestseller: boolean;
  rating_avg: number;
  rating_count: number;
  primary_image: string | null;
  club_name: string | null;
  league_name: string | null;
  brand_name: string | null;
}

export async function listProducts(args: ListProductsArgs = {}) {
  const { filters = {}, sort = "newest", page = 1, pageSize = 12 } = args;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("products")
    .select(
      `id, slug, name, base_price, sale_price, is_vintage, is_limited, is_sale, is_bestseller, rating_avg, rating_count, sold_count, created_at,
       league:leagues(slug,name), club:clubs(slug,name), brand:brands(slug,name), category:categories(slug,name), season:seasons(label), country:countries(code,name),
       images:product_images(url,sort_order,is_primary)`,
      { count: "exact" },
    )
    .eq("status", "published")
    .is("deleted_at", null);

  if (filters.search) q = q.ilike("name", `%${filters.search}%`);
  if (filters.vintage) q = q.eq("is_vintage", true);
  if (filters.limited) q = q.eq("is_limited", true);
  if (filters.sale) q = q.eq("is_sale", true);
  if (typeof filters.minPrice === "number") q = q.gte("base_price", filters.minPrice);
  if (typeof filters.maxPrice === "number") q = q.lte("base_price", filters.maxPrice);

  // Slug-based filters via foreign refs need ids; we resolve on server side via .eq on joined columns is not supported,
  // so we use the `*_id` columns when slug provided by separate lookup. To keep it simple use foreignTable filter syntax:
  if (filters.league) q = q.eq("leagues.slug" as never, filters.league);
  if (filters.club) q = q.eq("clubs.slug" as never, filters.club);
  if (filters.brand) q = q.eq("brands.slug" as never, filters.brand);
  if (filters.category) q = q.eq("categories.slug" as never, filters.category);
  if (filters.season) q = q.eq("seasons.label" as never, filters.season);
  if (filters.country) q = q.eq("countries.code" as never, filters.country);

  switch (sort) {
    case "bestseller":
      q = q.order("sold_count", { ascending: false });
      break;
    case "price-asc":
      q = q.order("base_price", { ascending: true });
      break;
    case "price-desc":
      q = q.order("base_price", { ascending: false });
      break;
    case "name-asc":
      q = q.order("name", { ascending: true });
      break;
    case "name-desc":
      q = q.order("name", { ascending: false });
      break;
    default:
      q = q.order("created_at", { ascending: false });
  }

  const { data, error, count } = await q.range(from, to);
  if (error) throw error;

  const items: ProductListItem[] = (data ?? []).map((p) => {
    const imgs = (p.images ?? []) as Array<{
      url: string;
      sort_order: number;
      is_primary: boolean;
    }>;
    const primary =
      imgs.find((i) => i.is_primary)?.url ??
      [...imgs].sort((a, b) => a.sort_order - b.sort_order)[0]?.url ??
      null;
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      base_price: Number(p.base_price),
      sale_price: p.sale_price !== null ? Number(p.sale_price) : null,
      is_vintage: p.is_vintage,
      is_limited: p.is_limited,
      is_sale: p.is_sale,
      is_bestseller: p.is_bestseller,
      rating_avg: Number(p.rating_avg),
      rating_count: p.rating_count,
      primary_image: primary,
      league_name: (p.league as { name: string } | null)?.name ?? null,
      club_name: (p.club as { name: string } | null)?.name ?? null,
      brand_name: (p.brand as { name: string } | null)?.name ?? null,
    };
  });

  return { items, total: count ?? items.length, page, pageSize };
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
       league:leagues(slug,name), club:clubs(slug,name,logo_url), brand:brands(slug,name),
       category:categories(slug,name), season:seasons(label), country:countries(code,name),
       player:players(name),
       images:product_images(id,url,alt,sort_order,is_primary),
       videos:product_videos(id,url,poster_url),
       variants:product_variants(id,size,sku,stock,additional_price)`,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function listRelatedProducts(productId: string, clubId: string | null, limit = 4) {
  let q = supabase
    .from("products")
    .select(
      `id, slug, name, base_price, sale_price, is_vintage, is_sale, is_bestseller, is_limited, rating_avg, rating_count,
       club:clubs(name), league:leagues(name), brand:brands(name),
       images:product_images(url,sort_order,is_primary)`,
    )
    .eq("status", "published")
    .is("deleted_at", null)
    .neq("id", productId)
    .limit(limit);
  if (clubId) q = q.eq("club_id", clubId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((p) => {
    const imgs = (p.images ?? []) as Array<{
      url: string;
      sort_order: number;
      is_primary: boolean;
    }>;
    const primary =
      imgs.find((i) => i.is_primary)?.url ??
      [...imgs].sort((a, b) => a.sort_order - b.sort_order)[0]?.url ??
      null;
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      base_price: Number(p.base_price),
      sale_price: p.sale_price !== null ? Number(p.sale_price) : null,
      is_vintage: p.is_vintage,
      is_limited: p.is_limited,
      is_sale: p.is_sale,
      is_bestseller: p.is_bestseller,
      rating_avg: Number(p.rating_avg),
      rating_count: p.rating_count,
      primary_image: primary,
      league_name: (p.league as { name: string } | null)?.name ?? null,
      club_name: (p.club as { name: string } | null)?.name ?? null,
      brand_name: (p.brand as { name: string } | null)?.name ?? null,
    } satisfies ProductListItem;
  });
}

export async function listFacets() {
  const [leagues, clubs, brands, seasons, categories, countries] = await Promise.all([
    supabase.from("leagues").select("slug,name").order("name"),
    supabase.from("clubs").select("slug,name").order("name"),
    supabase.from("brands").select("slug,name").order("name"),
    supabase.from("seasons").select("label").order("year_start", { ascending: false }),
    supabase.from("categories").select("slug,name").order("sort_order"),
    supabase.from("countries").select("code,name").order("name"),
  ]);
  return {
    leagues: leagues.data ?? [],
    clubs: clubs.data ?? [],
    brands: brands.data ?? [],
    seasons: seasons.data ?? [],
    categories: categories.data ?? [],
    countries: countries.data ?? [],
  };
}

export function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
