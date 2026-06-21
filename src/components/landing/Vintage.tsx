import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import img from "@/assets/vintage-feature.jpg";

export function Vintage() {
  return (
    <section className="section-y" id="vintage">
      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink lg:aspect-[5/6]">
            <img src={img} alt="Jersey vintage langka digantung di ruang ganti" loading="lazy" className="size-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Koleksi 1994 – 2004</p>
                <p className="font-display text-xl font-extrabold">Heritage Series</p>
              </div>
              <span className="rounded-full bg-gold/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                Langka
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <span className="eyebrow">03 — Vintage</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[60px]">
            Koleksi jersey langka yang memiliki cerita.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Setiap helai jersey vintage di The Locker Room melewati proses kurasi
            ketat. Kondisi, tahun produksi, hingga keaslian label dijamin —
            karena bagi kolektor, detail adalah segalanya.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
            {[
              ["1990s", "Golden Era"],
              ["240+", "Item Vintage"],
              ["100%", "Authenticated"],
              ["Global", "Sourcing"],
            ].map(([k, v]) => (
              <li key={k} className="rounded-xl border border-border bg-bone/50 p-4">
                <p className="font-display text-2xl font-extrabold text-ink">{k}</p>
                <p className="text-xs text-ink/60">{v}</p>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pitch"
          >
            Lihat Koleksi Vintage
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
