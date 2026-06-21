import { Reveal } from "./Reveal";

const TEAMS = [
  "Argentina", "Brazil", "France", "England", "Germany",
  "Spain", "Portugal", "Italy", "Japan", "Indonesia",
];

export function NationalTeams() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">05 — Tim Nasional</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Untuk yang membela
                <br /> warna bangsa.
              </h2>
            </div>
            <a href="#" className="text-sm font-semibold text-ink underline-offset-4 hover:text-pitch hover:underline">
              Lihat semua tim nasional →
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TEAMS.map((t, i) => (
            <Reveal key={t} delay={i * 30}>
              <a
                href="#"
                className="group flex items-center justify-between rounded-xl border border-border bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-pitch hover:bg-pitch-mist/40"
              >
                <span className="font-display text-sm font-bold text-ink">{t}</span>
                <span className="font-display text-lg font-extrabold text-ink/30 transition-colors group-hover:text-pitch">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
