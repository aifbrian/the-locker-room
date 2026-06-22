import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const MENU = [
  "Beranda", "Shop", "Liga", "Klub", "Vintage", "New Arrival", "Sale", "Blog", "Tentang",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur"
          : "bg-white"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <a href="#" className="flex items-center gap-2 shrink-0" aria-label="The Locker Room">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
            <span className="font-display text-base font-extrabold">TLR</span>
          </span>
          <span className="hidden font-display text-[15px] font-extrabold tracking-tight text-ink sm:inline">
            THE LOCKER ROOM
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Utama">
          {MENU.map((m) => (
            <a
              key={m}
              href="#"
              className="text-[13px] font-semibold tracking-wide text-ink/80 transition-colors hover:text-pitch"
            >
              {m}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button aria-label="Cari" className="hidden h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-bone hover:text-ink md:grid">
            <Search size={18} />
          </button>
          <button aria-label="Wishlist" className="hidden h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-bone hover:text-ink md:grid">
            <Heart size={18} />
          </button>
          <button aria-label="Masuk" className="hidden h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-bone hover:text-ink md:grid">
            <User size={18} />
          </button>
          <button aria-label="Keranjang" className="relative grid h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-bone hover:text-ink">
            <ShoppingBag size={18} />
            <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-pitch text-[10px] font-bold text-white">2</span>
          </button>
          <a
            href="#shop"
            className="ml-1 hidden h-10 items-center rounded-full bg-ink px-5 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pitch md:inline-flex"
          >
            Belanja Sekarang
          </a>
          <button
            aria-label="Buka menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {MENU.map((m) => (
              <a key={m} href="#" className="py-2 text-sm font-semibold text-ink">{m}</a>
            ))}
            <a href="#shop" className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white">
              Belanja Sekarang
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
