
drop policy if exists st_read on public.students;
create policy st_read on public.students for select to authenticated using(app_private.team() or id=app_private.my_student());
create or replace function public.family_directory() returns table(id uuid,name text,phone text,family_id uuid,stage text)
language sql stable security definer set search_path='' as $$
select s.id,s.name,s.phone,s.family_id,s.stage from public.students s where app_private.my_role()='gharisa'
and s.family_id=app_private.my_family() and s.stage in ('accepted','active','paused')
$$;
revoke all on function public.family_directory() from public,anon;
grant execute on function public.family_directory() to authenticated;
create or replace function public.update_my_profile(p_phone text,p_email text,p_university text,p_college text,p_study_level text,p_neighborhood text) returns void
language plpgsql security definer set search_path='' as $$
declare sid uuid;
begin
sid:=app_private.my_student();
if app_private.my_role()<>'gharisa' or sid is null then raise exception 'غير مصرح'; end if;
update public.students set phone=left(p_phone,40),email=left(p_email,254),university=left(p_university,200),college=left(p_college,200),study_level=left(p_study_level,100),neighborhood=left(p_neighborhood,200) where id=sid;
end $$;
revoke all on function public.update_my_profile(text,text,text,text,text,text) from public,anon;
grant execute on function public.update_my_profile(text,text,text,text,text,text) to authenticated;
