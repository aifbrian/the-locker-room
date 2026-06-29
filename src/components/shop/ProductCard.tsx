import { Link } from "@tanstack/react-router";
import { formatIDR, type ProductListItem } from "@/lib/catalog";

export function ProductCard({ product }: { product: ProductListItem }) {
  const onSale = product.sale_price != null && product.sale_price < product.base_price;
  const price = onSale ? product.sale_price! : product.base_price;
  const discount = onSale
    ? Math.round(((product.base_price - product.sale_price!) / product.base_price) * 100)
    : 0;

  return (
    <Link
      to="/produk/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
        {product.primary_image ? (
          <img
            src={product.primary_image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-ink/30">No image</div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.is_vintage && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Vintage
            </span>
          )}
          {product.is_limited && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
              Limited
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-pitch px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink/50">
          {product.brand_name && <span>{product.brand_name}</span>}
          {product.brand_name && product.league_name && <span>·</span>}
          {product.league_name && <span>{product.league_name}</span>}
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-ink group-hover:text-pitch">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-ink">{formatIDR(price)}</span>
          {onSale && (
            <span className="text-xs text-ink/40 line-through">{formatIDR(product.base_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
