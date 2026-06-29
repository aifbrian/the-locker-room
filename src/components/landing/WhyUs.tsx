import { BadgeCheck, ShieldCheck, Truck, Lock } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: BadgeCheck,
    title: "100% Jersey Original",
    desc: "Seluruh produk dijamin asli dengan proses kurasi yang ketat dari sumber resmi.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Keaslian",
    desc: "Jika produk terbukti tidak original, uang kamu kembali sesuai kebijakan kami.",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Produk dikemas dengan aman dan dikirim ke seluruh Indonesia setiap hari.",
  },
  {
    icon: Lock,
    title: "Belanja Aman",
    desc: "Pembayaran terenkripsi dan proses checkout yang sederhana, cepat, dan tanpa drama.",
  },
];

export function WhyUs() {
  return (
    <section className="section-y bg-ink text-white">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitch-mist">
                06 — Kenapa Kami
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
                Tempat para kolektor jersey original berkumpul.
              </h2>
            </div>
            <p className="text-white/60 lg:col-span-4 lg:col-start-9">
              Dibangun oleh pecinta sepak bola, untuk pecinta sepak bola. Komitmen kami sederhana —
              keaslian, kualitas, dan pelayanan terbaik.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="group h-full bg-ink p-7 transition-colors hover:bg-pitch-deep">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-pitch-mist/10 text-pitch-mist transition-colors group-hover:bg-white/10 group-hover:text-white">
                  <it.icon size={20} />
                </span>
                <p className="mt-8 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-mist/70">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
