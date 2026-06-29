import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LogOut, MapPin, Package, Heart, User as UserIcon, Settings } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/akun/")({
  head: () => ({
    meta: [{ title: "Akun Saya — The Locker Room" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: roles } = useQuery({
    queryKey: ["my-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role");
      if (error) throw error;
      return data?.map((r) => r.role) ?? [];
    },
  });

  const isAdmin = roles?.includes("admin") || roles?.includes("staff");

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Berhasil keluar");
    navigate({ to: "/auth", replace: true });
  }

  const menu = [
    { label: "Profil", href: "/akun", icon: UserIcon },
    { label: "Pesanan Saya", href: "/akun/orders", icon: Package },
    { label: "Alamat", href: "/akun/addresses", icon: MapPin },
    { label: "Wishlist", href: "/akun/wishlist", icon: Heart },
    { label: "Pengaturan", href: "/akun/settings", icon: Settings },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-bone">
        <div className="container-x py-10 lg:py-16">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pitch">
              Akun Saya
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink lg:text-4xl">
              Halo, {profile?.full_name ?? email ?? "pelanggan"}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink/70">
              Kelola pesanan, alamat pengiriman, dan wishlist jersey original Anda di satu tempat.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-2xl border border-border bg-white p-4">
              <nav className="space-y-1">
                {menu.map((m) => (
                  <Link
                    key={m.href}
                    to={m.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-bone hover:text-ink"
                  >
                    <m.icon className="h-4 w-4" />
                    {m.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="mt-4 flex items-center gap-3 rounded-lg bg-pitch px-3 py-2.5 text-sm font-semibold text-white hover:bg-pitch-deep"
                  >
                    Buka Admin Panel
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-bone hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </nav>
            </aside>

            <section className="grid gap-4 sm:grid-cols-2">
              <Card title="Pesanan aktif" value="0" hint="Belum ada pesanan" />
              <Card title="Wishlist" value="0" hint="Mulai simpan favorit Anda" />
              <Card title="Riwayat belanja" value="0" hint="Pesanan selesai" />
              <Card title="Voucher tersedia" value="0" hint="Lihat penawaran" />

              <div className="sm:col-span-2 rounded-2xl border border-border bg-white p-8 text-center">
                <h2 className="font-display text-xl font-bold text-ink">Belum ada aktivitas</h2>
                <p className="mt-2 text-sm text-ink/70">
                  Telusuri koleksi terbaru dan jersey vintage langka kami.
                </p>
                <Button asChild className="mt-5 rounded-full bg-ink text-white hover:bg-pitch">
                  <Link to="/">Belanja sekarang</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Card({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">{title}</p>
      <p className="mt-3 font-display text-3xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink/60">{hint}</p>
    </div>
  );
}
