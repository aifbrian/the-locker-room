const BRANDS = ["NIKE", "ADIDAS", "PUMA", "NEW BALANCE", "MIZUNO", "UMBRO", "KAPPA", "HUMMEL"];

export function BrandStrip() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-border bg-bone/60 py-8">
      <div className="container-x flex items-center gap-8">
        <p className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50 md:block">
          Brand Resmi
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-14">
            {items.map((b, i) => (
              <span
                key={i}
                className="font-display text-xl font-extrabold tracking-[0.1em] text-ink/40 transition-colors hover:text-ink"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
