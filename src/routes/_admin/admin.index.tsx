import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tags,
  Users,
  ImageIcon,
  Ticket,
  Star,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Pesanan", href: "/admin/orders", icon: ShoppingBag },
  { label: "Master Data", href: "/admin/master", icon: Tags },
  { label: "Pelanggan", href: "/admin/customers", icon: Users },
  { label: "Banner", href: "/admin/banners", icon: ImageIcon },
  { label: "Voucher", href: "/admin/vouchers", icon: Ticket },
  { label: "Review", href: "/admin/reviews", icon: Star },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/_admin/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — The Locker Room" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [orders, products, customers] = await Promise.all([
        supabase.from("orders").select("id,total,status", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);
      const revenue =
        orders.data
          ?.filter((o) => ["paid", "processing", "packing", "shipping", "delivered", "completed"].includes(o.status))
          .reduce((sum, o) => sum + Number(o.total), 0) ?? 0;
      const pending = orders.data?.filter((o) => o.status === "pending_payment" || o.status === "waiting_verification").length ?? 0;
      return {
        totalOrders: orders.count ?? 0,
        totalProducts: products.count ?? 0,
        totalCustomers: customers.count ?? 0,
        revenue,
        pending,
      };
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Berhasil keluar");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-bone">
      <div className="flex">
        <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-white p-4 lg:block">
          <Link to="/admin" className="mb-8 flex items-center gap-2 px-2 pt-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
              <span className="font-display text-base font-extrabold">TLR</span>
            </span>
            <span className="font-display text-sm font-extrabold tracking-tight text-ink">
              ADMIN PANEL
            </span>
          </Link>
          <nav className="space-y-0.5">
            {NAV.map((n) => (
              <Link
                key={n.href}
                to={n.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/75 transition-colors hover:bg-bone hover:text-ink"
                activeProps={{ className: "bg-pitch-mist text-pitch-deep" }}
                activeOptions={{ exact: n.href === "/admin" }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
            <button
              onClick={signOut}
              className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-bone hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pitch">
              Dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink lg:text-4xl">
              Ringkasan toko
            </h1>
            <p className="mt-2 text-sm text-ink/70">
              Pantau penjualan, pesanan masuk, dan inventaris jersey Anda.
            </p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Pendapatan" value={formatIDR(stats?.revenue ?? 0)} tone="primary" />
            <StatCard label="Total Pesanan" value={String(stats?.totalOrders ?? 0)} />
            <StatCard label="Perlu Verifikasi" value={String(stats?.pending ?? 0)} tone="warn" />
            <StatCard label="Total Produk" value={String(stats?.totalProducts ?? 0)} />
            <StatCard label="Pelanggan" value={String(stats?.totalCustomers ?? 0)} />
          </section>

          <section className="mt-10 rounded-2xl border border-border bg-white p-8">
            <h2 className="font-display text-xl font-bold text-ink">Mulai dari sini</h2>
            <p className="mt-2 text-sm text-ink/70">
              Berikutnya: tambahkan produk pertama, atur banner promo, dan kelola pesanan masuk.
              Modul-modul ini akan dibangun pada fase berikutnya.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/admin/products"
                className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-pitch"
              >
                Kelola Produk
              </Link>
              <Link
                to="/admin/orders"
                className="inline-flex h-10 items-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink hover:bg-bone"
              >
                Lihat Pesanan
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "primary" | "warn";
}) {
  const accent =
    tone === "primary"
      ? "border-pitch/30 bg-pitch text-white"
      : tone === "warn"
        ? "border-gold/30 bg-gold/10 text-ink"
        : "border-border bg-white text-ink";
  return (
    <div className={`rounded-2xl border p-6 ${accent}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${tone === "primary" ? "text-white/80" : "text-ink/60"}`}>
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}
