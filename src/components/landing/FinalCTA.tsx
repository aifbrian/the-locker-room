import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pitch-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative py-24 text-center md:py-32">
        <Reveal>
          <span className="eyebrow">10 — Bergabunglah</span>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[80px]">
            Siap menambah
            <br /> koleksi jersey
            <br /> original anda?
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#shop"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pitch"
            >
              Belanja Sekarang
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#vintage"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/15 px-8 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink"
            >
              Lihat Koleksi Vintage
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
