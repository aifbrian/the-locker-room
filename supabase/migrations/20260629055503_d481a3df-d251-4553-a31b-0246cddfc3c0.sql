
-- 1) bank_accounts: restrict to authenticated
DROP POLICY IF EXISTS "banks public read" ON public.bank_accounts;
DROP POLICY IF EXISTS "bank_accounts authenticated read" ON public.bank_accounts;
CREATE POLICY "bank_accounts authenticated read"
  ON public.bank_accounts FOR SELECT
  TO authenticated
  USING (active = true);
REVOKE SELECT ON public.bank_accounts FROM anon;

-- 2) user_roles: explicit deny INSERT/UPDATE/DELETE for non-service roles (defense in depth)
DROP POLICY IF EXISTS "user_roles no self insert" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles no self update" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles no self delete" ON public.user_roles;
CREATE POLICY "user_roles no self insert"
  ON public.user_roles FOR INSERT
  TO authenticated, anon
  WITH CHECK (false);
CREATE POLICY "user_roles no self update"
  ON public.user_roles FOR UPDATE
  TO authenticated, anon
  USING (false) WITH CHECK (false);
CREATE POLICY "user_roles no self delete"
  ON public.user_roles FOR DELETE
  TO authenticated, anon
  USING (false);

-- 3) vouchers + lookup_voucher: revoke from authenticated; only service_role can execute
REVOKE EXECUTE ON FUNCTION public.lookup_voucher(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lookup_voucher(text) TO service_role;
