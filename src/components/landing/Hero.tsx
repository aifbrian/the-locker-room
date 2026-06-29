import { ArrowUpRight, ShieldCheck, BadgeCheck, Star } from "lucide-react";
import heroImg from "@/assets/hero-jerseys.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pitch-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid grid-cols-1 items-end gap-10 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Authentic · Original · Premium</span>
            <span className="h-px w-12 bg-ink/20" />
          </div>
          <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[0.95] tracking-tight text-ink sm:text-[64px] lg:text-[88px]">
            Home of
            <br />
            Authentic
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Football</span>
              <span
                className="absolute inset-x-0 bottom-1 -z-0 h-4 bg-pitch-mist sm:h-5 lg:h-7"
                aria-hidden
              />
            </span>{" "}
            Jerseys.
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/70 sm:text-lg">
            Temukan koleksi jersey sepak bola original dari berbagai liga dunia, mulai dari musim
            terbaru hingga jersey vintage langka yang menjadi incaran para kolektor.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#shop"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pitch"
            >
              Belanja Sekarang
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#vintage"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink"
            >
              Jelajahi Koleksi Vintage
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-1 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-sm text-ink/70">
              <span className="font-semibold text-ink">Dipercaya ribuan</span> pecinta jersey
              original di Indonesia
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
            <img
              src={heroImg}
              alt="Koleksi jersey sepak bola original The Locker Room"
              width={1280}
              height={1280}
              className="size-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <Badge icon={<BadgeCheck size={14} />} label="100% Original" />
              <Badge icon={<ShieldCheck size={14} />} label="Garansi Keaslian" />
            </div>
            <div className="absolute bottom-4 right-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-pitch">
                Featured
              </p>
              <p className="mt-1 font-display text-sm font-bold text-ink">Season 24/25</p>
              <p className="text-xs text-ink/60">Home & Away Kits</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-full border border-ink/10 bg-white/70 backdrop-blur md:grid md:place-items-center">
            <div className="text-center">
              <p className="font-display text-lg font-extrabold text-ink">12+</p>
              <p className="text-[10px] uppercase tracking-widest text-ink/60">Liga</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm backdrop-blur">
      <span className="text-pitch">{icon}</span>
      {label}
    </span>
  );
}
