import { Reveal } from "./Reveal";

export function Newsletter() {
  return (
    <section className="section-y bg-pitch-deep text-white">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitch-mist">09 — Newsletter</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[60px]">
                Jangan sampai
                <br /> kehabisan jersey impianmu.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-white/70">
                Dapatkan informasi koleksi terbaru, promo eksklusif, dan rilisan
                jersey langka — langsung ke email kamu.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex flex-col gap-2 rounded-full bg-white p-1.5 sm:flex-row"
              >
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-pitch"
                >
                  Berlangganan
                </button>
              </form>
              <p className="mt-3 text-xs text-white/50">
                Dengan berlangganan, kamu menyetujui kebijakan privasi kami.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
