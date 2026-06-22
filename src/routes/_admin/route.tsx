import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) throw redirect({ to: "/auth" });

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id);

    const allowed = roles?.some((r) => r.role === "admin" || r.role === "staff");
    if (!allowed) throw redirect({ to: "/akun" });

    return { user: userData.user };
  },
  component: () => <Outlet />,
});
