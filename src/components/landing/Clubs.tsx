import { Reveal } from "./Reveal";

const CLUBS = [
  ["MUN", "Manchester United"],
  ["LIV", "Liverpool"],
  ["CHE", "Chelsea"],
  ["ARS", "Arsenal"],
  ["BAR", "Barcelona"],
  ["RMA", "Real Madrid"],
  ["JUV", "Juventus"],
  ["INT", "Inter Milan"],
  ["MIL", "AC Milan"],
  ["BAY", "Bayern Munich"],
  ["PSG", "PSG"],
  ["AJX", "Ajax"],
  ["BVB", "Dortmund"],
  ["TOT", "Tottenham"],
];

export function Clubs() {
  return (
    <section className="section-y border-y border-border bg-white">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">04 — Shop by Club</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Klub legendaris dunia.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink/60">
              Jersey resmi dari klub favorit, lengkap dari era klasik hingga musim terbaru.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7">
          {CLUBS.map((c, i) => (
            <Reveal key={c[1]} delay={i * 30}>
              <a href="#" className="group flex flex-col items-center gap-3">
                <span className="grid h-20 w-20 place-items-center rounded-full border border-border bg-bone/60 font-display text-sm font-extrabold tracking-wider text-ink/80 transition-all group-hover:-translate-y-1 group-hover:border-pitch group-hover:bg-pitch-mist group-hover:text-pitch-deep sm:h-24 sm:w-24 sm:text-base">
                  {c[0]}
                </span>
                <span className="text-center text-[11px] font-medium text-ink/60 group-hover:text-ink">
                  {c[1]}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
