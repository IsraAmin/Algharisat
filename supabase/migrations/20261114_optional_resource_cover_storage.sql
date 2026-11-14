-- Optional resource cover images (uploaded files rather than cover image URLs).
-- Public bucket is appropriate for non-sensitive educational cover artwork only.
-- Never place private learner data in resource-covers.
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS cover_path text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS cover_mode text NOT NULL DEFAULT 'auto';
UPDATE public.resources SET cover_mode = 'auto' WHERE cover_mode IS NULL;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'resources_cover_mode_allowed') THEN
    ALTER TABLE public.resources
      ADD CONSTRAINT resources_cover_mode_allowed
      CHECK (cover_mode IN ('auto', 'upload', 'none'));
  END IF;
END $$;

INSERT INTO storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
VALUES ('resource-covers','resource-covers',TRUE,3145728,
  ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO UPDATE
  SET public=TRUE,file_size_limit=3145728,
      allowed_mime_types=ARRAY['image/jpeg','image/png','image/webp'];

DROP POLICY IF EXISTS "resource_covers_team_insert" ON storage.objects;
DROP POLICY IF EXISTS "resource_covers_team_select" ON storage.objects;
DROP POLICY IF EXISTS "resource_covers_team_delete" ON storage.objects;

CREATE POLICY "resource_covers_team_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id='resource-covers' AND app_private.team());
CREATE POLICY "resource_covers_team_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id='resource-covers' AND app_private.team());
CREATE POLICY "resource_covers_team_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id='resource-covers' AND app_private.team());
