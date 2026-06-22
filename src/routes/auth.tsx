import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";

const signInSchema = z.object({
  email: z.string().trim().email("Email tidak valid").max(255),
  password: z.string().min(6, "Minimal 6 karakter").max(100),
});

const signUpSchema = signInSchema.extend({
  full_name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
});

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk / Daftar — The Locker Room" },
      { name: "description", content: "Masuk atau buat akun The Locker Room untuk belanja jersey original." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/akun", replace: true });
    });
  }, [navigate]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(mode === "signin" ? (signInSchema as never) : signUpSchema),
    defaultValues: { email: "", password: "", full_name: "" },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: values.full_name },
          },
        });
        if (error) throw error;
        toast.success("Akun berhasil dibuat. Anda otomatis masuk.");
        navigate({ to: "/akun", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        toast.success("Berhasil masuk.");
        navigate({ to: "/akun", replace: true });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) {
      toast.error("Gagal masuk dengan Google");
      setLoading(false);
      return;
    }
    if (res.redirected) return;
    navigate({ to: "/akun", replace: true });
  }

  return (
    <div className="min-h-screen bg-bone">
      <div className="container-x grid min-h-screen items-center py-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
              <span className="font-display text-base font-extrabold">TLR</span>
            </span>
            <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">
              THE LOCKER ROOM
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
            {mode === "signin" ? "Masuk ke akun Anda" : "Buat akun baru"}
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            {mode === "signin"
              ? "Lanjutkan belanja jersey original dengan riwayat pesanan dan wishlist Anda."
              : "Daftar sekarang untuk checkout lebih cepat dan menyimpan wishlist."}
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            {mode === "signup" && (
              <div>
                <Label htmlFor="full_name">Nama lengkap</Label>
                <Input id="full_name" {...form.register("full_name")} className="mt-1.5 h-11" />
                {form.formState.errors.full_name && (
                  <p className="mt-1 text-xs text-destructive">{form.formState.errors.full_name.message}</p>
                )}
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register("email")} className="mt-1.5 h-11" />
              {form.formState.errors.email && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                {...form.register("password")}
                className="mt-1.5 h-11"
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="h-11 w-full rounded-full bg-ink text-white hover:bg-pitch">
              {loading ? "Memproses..." : mode === "signin" ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-ink/50">
            <span className="h-px flex-1 bg-border" /> atau <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={signInWithGoogle}
            className="h-11 w-full rounded-full"
          >
            Lanjutkan dengan Google
          </Button>

          <p className="mt-8 text-center text-sm text-ink/70">
            {mode === "signin" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-pitch underline-offset-4 hover:underline"
            >
              {mode === "signin" ? "Daftar di sini" : "Masuk"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
