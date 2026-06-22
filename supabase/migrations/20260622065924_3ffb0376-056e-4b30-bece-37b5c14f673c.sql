
-- Public-readable buckets (still bypass anon via signed URL on private storage, but allow read for any role)
CREATE POLICY "public read product-images" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');
CREATE POLICY "public read banners" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'banners');
CREATE POLICY "public read blog" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog');

CREATE POLICY "admin write product-images" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'product-images' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')))
  WITH CHECK (bucket_id = 'product-images' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));
CREATE POLICY "admin write banners" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'banners' AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (bucket_id = 'banners' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write blog" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'blog' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')))
  WITH CHECK (bucket_id = 'blog' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));

-- Payment proofs: per-user folder structure userId/orderId/file.jpg
CREATE POLICY "payment proofs owner read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs'
    AND ((auth.uid())::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff')));
CREATE POLICY "payment proofs owner upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'payment-proofs'
    AND (auth.uid())::text = (storage.foldername(name))[1]);
CREATE POLICY "payment proofs owner update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'payment-proofs'
    AND ((auth.uid())::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(),'admin')))
  WITH CHECK (bucket_id = 'payment-proofs'
    AND ((auth.uid())::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "payment proofs admin delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'payment-proofs' AND public.has_role(auth.uid(),'admin'));
