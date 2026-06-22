
-- Pin search_path on helpers
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.generate_order_number() SET search_path = public;
ALTER FUNCTION public.log_order_status_change() SET search_path = public;

-- Lock down SECURITY DEFINER functions (only internal trigger/policy use)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_order_status_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- has_role must remain callable by RLS as authenticated
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Fix audit_logs insert policy (was true)
DROP POLICY IF EXISTS "audit insert any" ON public.audit_logs;
CREATE POLICY "audit insert own" ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
