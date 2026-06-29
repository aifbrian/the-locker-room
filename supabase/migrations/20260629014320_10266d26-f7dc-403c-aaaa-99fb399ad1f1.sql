
DROP POLICY IF EXISTS "vouchers public read active" ON public.vouchers;

CREATE OR REPLACE FUNCTION public.lookup_voucher(p_code text)
RETURNS TABLE (
  id uuid, code text, description text, type text, value numeric,
  min_purchase numeric, max_discount numeric, quota integer, used_count integer,
  valid_from timestamptz, valid_until timestamptz, active boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT v.id, v.code, v.description, v.type::text, v.value,
         v.min_purchase, v.max_discount, v.quota, v.used_count,
         v.valid_from, v.valid_until, v.active
  FROM public.vouchers v
  WHERE v.active = true
    AND upper(v.code) = upper(p_code)
    AND (v.valid_from IS NULL OR v.valid_from <= now())
    AND (v.valid_until IS NULL OR v.valid_until >= now())
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.lookup_voucher(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.lookup_voucher(text) TO authenticated;

REVOKE SELECT (origin_city_code) ON public.store_settings FROM anon, authenticated;

DROP POLICY IF EXISTS "audit insert own" ON public.audit_logs;
REVOKE INSERT ON public.audit_logs FROM anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_order_status_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
