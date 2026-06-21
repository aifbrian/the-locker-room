import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import premier from "@/assets/cat-premier.jpg";
import vintage from "@/assets/cat-vintage.jpg";
import club from "@/assets/cat-club.jpg";
import national from "@/assets/cat-national.jpg";

const CATS = [
  { title: "Premier League", count: "120+ Item", img: premier, span: "lg:col-span-7 lg:row-span-2", tall: true },
  { title: "La Liga", count: "85+ Item", img: club, span: "lg:col-span-5" },
  { title: "Serie A", count: "70+ Item", img: national, span: "lg:col-span-3" },
  { title: "Bundesliga", count: "62+ Item", img: premier, span: "lg:col-span-2" },
  { title: "Champions League", count: "Edisi Spesial", img: club, span: "lg:col-span-4 lg:row-span-2", tall: true },
  { title: "Tim Nasional", count: "48+ Item", img: national, span: "lg:col-span-4" },
  { title: "Vintage", count: "Koleksi Langka", img: vintage, span: "lg:col-span-4" },
  { title: "Retro", count: "Klasik 80s–00s", img: vintage, span: "lg:col-span-4" },
];

export function Categories() {
  return (
    <section className="section-y" id="shop">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="eyebrow">01 — Kategori</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
                Pilih liga,
                <br />
                pilih klub favoritmu.
              </h2>
            </div>
            <p className="text-ink/70 md:col-span-4 md:col-start-9 md:text-right">
              Setiap kategori dikurasi langsung untuk memastikan keaslian, kualitas, dan kelangkaan jersey yang kamu cari.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {CATS.map((c, i) => (
            <Reveal key={c.title + i} delay={i * 40} className={c.span ?? ""}>
              <a
                href="#"
                className={`group relative block overflow-hidden rounded-2xl bg-ink ${c.tall ? "aspect-[3/4] lg:h-full" : "aspect-[4/5]"}`}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-0 bg-pitch/0 transition-colors duration-500 group-hover:bg-pitch/25" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 lg:p-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">{c.count}</p>
                    <h3 className="mt-1 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl lg:text-2xl">
                      {c.title}
                    </h3>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
