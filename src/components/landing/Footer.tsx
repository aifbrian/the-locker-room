import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const COLS = [
  { title: "Shop", links: ["New Arrival", "Best Seller", "Sale", "Vintage", "Retro", "Liga", "Klub", "Tim Nasional"] },
  { title: "Bantuan", links: ["FAQ", "Cek Resi", "Kebijakan Retur", "Garansi Keaslian", "Kontak Kami"] },
  { title: "Perusahaan", links: ["Tentang Kami", "Blog", "Karir", "Kebijakan Privasi", "Syarat & Ketentuan"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
                <span className="font-display text-base font-extrabold">TLR</span>
              </span>
              <span className="font-display text-base font-extrabold tracking-tight text-ink">
                THE LOCKER ROOM
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Destinasi jersey sepak bola original di Indonesia. Mulai dari rilisan terbaru
              hingga vintage langka — terkurasi, terjamin, dan terpercaya.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Sosial media"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink/70 transition hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-ink/65 transition-colors hover:text-pitch">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">
              Metode Pembayaran
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["QRIS", "Virtual Account", "Transfer Bank", "E-Wallet", "Kartu Kredit"].map((p) => (
                <span key={p} className="rounded-md border border-border bg-bone/50 px-3 py-1.5 text-xs font-medium text-ink/70">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">
              Kurir Pengiriman
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["JNE", "J&T", "SiCepat", "POS Indonesia", "Ninja Express"].map((p) => (
                <span key={p} className="rounded-md border border-border bg-bone/50 px-3 py-1.5 text-xs font-medium text-ink/70">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-ink/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} The Locker Room. Seluruh hak cipta dilindungi.</p>
          <p>Made in Indonesia · For the love of the game.</p>
        </div>
      </div>
    </footer>
  );
}
