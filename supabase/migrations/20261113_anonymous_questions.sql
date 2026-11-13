
drop policy if exists qu_read on public.questions;
create policy qu_read on public.questions for select to authenticated using(app_private.team() or student_id=app_private.my_student());
create or replace function public.published_questions()
returns table(id uuid,kind text,body text,answer text,status text,published boolean,created_at timestamptz)
language sql stable security definer set search_path='' as $$
select q.id,q.kind,q.body,q.answer,q.status,q.published,q.created_at
from public.questions q where app_private.my_role()='gharisa' and q.published and q.status='answered'
$$;
revoke all on function public.published_questions() from public,anon;
grant execute on function public.published_questions() to authenticated;
