import { Heart, Eye } from "lucide-react";
import { Reveal } from "./Reveal";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const PRODUCTS = [
  {
    img: p1,
    name: "Home Kit — Red Devils",
    season: "2024 / 2025",
    price: "Rp 1.299.000",
    was: "Rp 1.499.000",
    badge: "Best Seller",
  },
  {
    img: p2,
    name: "Away Kit — Los Blancos",
    season: "2024 / 2025",
    price: "Rp 1.249.000",
    was: null,
    badge: "New",
  },
  {
    img: p3,
    name: "Third Kit — Nerazzurri",
    season: "2023 / 2024",
    price: "Rp 999.000",
    was: "Rp 1.349.000",
    badge: "Sale",
  },
  {
    img: p4,
    name: "Home Kit — Die Borussen",
    season: "2024 / 2025",
    price: "Rp 1.199.000",
    was: null,
    badge: "Original",
  },
];

export function BestSellers() {
  return (
    <section className="section-y bg-bone/50">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">02 — Paling Dicari</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Best Sellers.
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-ink underline-offset-4 hover:text-pitch hover:underline"
            >
              Lihat semua produk →
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                  <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      aria-label="Wishlist"
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-md transition hover:bg-pitch hover:text-white"
                    >
                      <Heart size={15} />
                    </button>
                    <button
                      aria-label="Quick view"
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-md transition hover:bg-pitch hover:text-white"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                  <button className="absolute inset-x-3 bottom-3 inline-flex h-11 translate-y-3 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-pitch">
                    Tambah ke Keranjang
                  </button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                      {p.season}
                    </p>
                    <h3 className="mt-1 truncate font-display text-base font-bold text-ink">
                      {p.name}
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-sm font-extrabold text-ink">{p.price}</p>
                    {p.was && <p className="text-xs text-ink/40 line-through">{p.was}</p>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
