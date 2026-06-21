export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      <a
        href="#shop"
        className="flex h-12 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-lg shadow-ink/20"
      >
        Belanja Sekarang
      </a>
    </div>
  );
}
