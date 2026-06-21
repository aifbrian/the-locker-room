import { Star, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const REVIEWS = [
  {
    name: "Rizky Aditya",
    city: "Jakarta",
    text: "Jersey Madrid Home musim ini datang dengan kondisi sempurna. Packaging rapi, tag asli, dan pengiriman lebih cepat dari estimasi. Akan langganan!",
    item: "Real Madrid Home 24/25",
  },
  {
    name: "Bagas Pratama",
    city: "Bandung",
    text: "Akhirnya ketemu Inter Milan 1997 versi original yang udah dicari bertahun-tahun. Detail jahitan dan tag persis seperti foto. Worth every rupiah.",
    item: "Inter Milan Home 1997",
  },
  {
    name: "Sarah Wijaya",
    city: "Surabaya",
    text: "Beli untuk hadiah ulang tahun adik. Boxnya premium banget, kayak beli dari official store. CS-nya juga responsif dan ramah.",
    item: "Liverpool Home 24/25",
  },
];

export function Reviews() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="eyebrow">07 — Customer Review</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[60px]">
                Suara dari ribuan
                <br /> kolektor jersey.
              </h2>
            </div>
            <div className="flex items-center gap-4 md:col-span-5 md:justify-end">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-ink">4.9/5</p>
                <p className="text-xs text-ink/60">dari 2.400+ ulasan</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/80">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-pitch-mist font-display text-sm font-extrabold text-pitch-deep">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-ink">{r.name}</p>
                    <p className="truncate text-xs text-ink/60">{r.city} · {r.item}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-pitch-mist px-2 py-1 text-[10px] font-bold text-pitch-deep">
                    <BadgeCheck size={12} /> Verified
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
