-- Repair: approved gharisas need a linked student record before they can save
-- personal details, weekly reports, self-assessments or questions.
-- This does NOT grant write access to other students or administrative tables.

create or replace function public.ensure_my_student_profile()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
  v_account public.accounts%rowtype;
  v_student uuid;
begin
  if v_user is null then
    raise exception 'يجب تسجيل الدخول أولاً' using errcode='42501';
  end if;

  select * into v_account
  from public.accounts
  where user_id = v_user
  for update;

  if not found or v_account.role <> 'gharisa' then
    raise exception 'لا يمكن إنشاء ملف غارسة لهذا الحساب' using errcode='42501';
  end if;

  if v_account.student_id is not null then
    return v_account.student_id;
  end if;

  insert into public.students(name, phone, email, stage)
  values (
    left(v_account.name,250),
    nullif(left(coalesce(v_account.phone,''),40),''),
    nullif(left(coalesce(v_account.email,''),254),''),
    'active'
  )
  returning id into v_student;

  update public.accounts
  set student_id = v_student
  where user_id = v_user;

  return v_student;
end
$$;

revoke all on function public.ensure_my_student_profile() from public, anon;
grant execute on function public.ensure_my_student_profile() to authenticated;

create or replace function public.update_my_profile(
  p_phone text,
  p_email text,
  p_university text,
  p_college text,
  p_study_level text,
  p_neighborhood text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  sid uuid;
begin
  sid := public.ensure_my_student_profile();

  update public.students
  set
    phone = nullif(left(coalesce(p_phone,''),40),''),
    email = nullif(left(coalesce(p_email,''),254),''),
    university = nullif(left(coalesce(p_university,''),200),''),
    college = nullif(left(coalesce(p_college,''),200),''),
    study_level = nullif(left(coalesce(p_study_level,''),100),''),
    neighborhood = nullif(left(coalesce(p_neighborhood,''),200),'')
  where id = sid;

  if not found then
    raise exception 'تعذر العثور على سجل الغارسة المرتبط بالحساب';
  end if;
end
$$;

revoke all on function public.update_my_profile(text,text,text,text,text,text) from public, anon;
grant execute on function public.update_my_profile(text,text,text,text,text,text) to authenticated;
