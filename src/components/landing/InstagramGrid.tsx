import { Instagram } from "lucide-react";
import { Reveal } from "./Reveal";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import v from "@/assets/vintage-feature.jpg";
import c from "@/assets/cat-club.jpg";

const IMGS = [p1, p2, p3, v, p4, c];

export function InstagramGrid() {
  return (
    <section className="section-y border-t border-border bg-bone/40">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">08 — Komunitas</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                @thelockerroom.id
              </h2>
              <p className="mt-3 max-w-md text-sm text-ink/60">
                Tag kami di Instagram dengan #LockerRoomCollector untuk masuk ke galeri kami.
              </p>
            </div>
            <a href="#" className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink">
              <Instagram size={16} /> Ikuti kami
            </a>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {IMGS.map((src, i) => (
            <Reveal key={i} delay={i * 40}>
              <a href="#" className="group relative block aspect-square overflow-hidden rounded-xl bg-ink">
                <img src={src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                  <Instagram size={20} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
