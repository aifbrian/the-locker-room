import { ArrowUpRight, Sparkles, Award, ShieldAlert } from "lucide-react";
import { Reveal } from "./Reveal";
import vintage from "@/assets/cat-vintage.jpg";
import club from "@/assets/cat-club.jpg";
import national from "@/assets/cat-national.jpg";

const FEATURED_ITEMS = [
  {
    title: "Manchester United 1998-99 'Treble Winner' Home",
    season: "1998 / 1999",
    price: "Rp 3.850.000",
    condition: "Deadstock (BNIB)",
    rarity: "Ultra Rare",
    desc: "Jersey kandang legendaris dengan kerah ritsleting ikonik. Dilengkapi patch final Champions League Camp Nou 1999.",
    img: vintage,
    icon: Sparkles,
    badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  {
    title: "Arsenal 2003-04 'The Invincibles' Away",
    season: "2003 / 2004",
    price: "Rp 2.950.000",
    condition: "Excellent (9.5/10)",
    rarity: "Very Rare",
    desc: "Edisi jersey tandang emas bersejarah saat Arsenal merengkuh gelar juara Premier League tanpa tersentuh kekalahan.",
    img: club,
    icon: Award,
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    title: "Brazil 2002 'Pentacampeão' World Cup Home",
    season: "2002",
    price: "Rp 3.200.000",
    condition: "Mint Condition (9.8/10)",
    rarity: "Collector's Item",
    desc: "Dikenakan saat Ronaldo Nazario membawa Tim Samba meraih trofi Piala Dunia kelima mereka di Korea-Jepang.",
    img: national,
    icon: ShieldAlert,
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
];

export function CuratorsChoice() {
  return (
    <section className="section-y bg-bone" id="curators-choice">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="eyebrow">01 — Curator's Choice</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
                Koleksi Emas.
                <br />
                Pilihan Kurator Kami.
              </h2>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="text-sm leading-relaxed text-ink/70">
                Tiga mahakarya sepak bola yang dikurasi khusus karena nilai sejarah yang tinggi,
                tingkat kelangkaan yang ekstrem, dan orisinalitas yang terjamin 100%.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pitch underline-offset-4 hover:underline"
              >
                Jelajahi The Vault →
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {FEATURED_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bone">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span
                    className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${item.badgeColor} bg-white`}
                  >
                    {item.rarity}
                  </span>
                </div>

                {/* Content Section */}
                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                    <span>Musim {item.season}</span>
                    <span className="flex items-center gap-1 text-pitch-deep">
                      <item.icon className="h-3 w-3" />
                      {item.condition}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink group-hover:text-pitch transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink/70 flex-1">{item.desc}</p>

                  <div className="mt-6 border-t border-border pt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
                        Estimasi Harga Valuasi
                      </p>
                      <p className="mt-0.5 font-display text-lg font-extrabold text-pitch-deep">
                        {item.price}
                      </p>
                    </div>
                    <button className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-all group-hover:bg-pitch hover:scale-105">
                      <ArrowUpRight size={16} />
                    </button>
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
