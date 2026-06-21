export function AnnouncementBar() {
  return (
    <div className="bg-pitch-deep text-white">
      <div className="container-x flex items-center justify-center gap-2 py-2.5 text-center text-[12px] font-medium tracking-wide sm:text-[13px]">
        <span aria-hidden>🚚</span>
        <span className="hidden sm:inline">
          Gratis Ongkir ke Seluruh Indonesia untuk Pembelian Tertentu
        </span>
        <span className="sm:hidden">Gratis Ongkir Tertentu</span>
        <span className="mx-2 hidden h-3 w-px bg-white/30 sm:inline-block" />
        <span className="hidden sm:inline">100% Jersey Original</span>
        <span className="mx-2 hidden h-3 w-px bg-white/30 md:inline-block" />
        <span className="hidden md:inline">Garansi Keaslian Produk</span>
      </div>
    </div>
  );
}
