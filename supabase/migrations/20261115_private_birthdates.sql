-- Keep dates of birth out of family-readable student rows.
create table if not exists app_private.signup_birthdates (
  user_id uuid primary key references auth.users(id) on delete cascade,
  birth_date date not null
);
create table if not exists public.student_birthdates (
  student_id uuid primary key references public.students(id) on delete cascade,
  birth_date date not null
);
alter table public.student_birthdates enable row level security;
grant select,insert,update,delete on public.student_birthdates to authenticated;
drop policy if exists student_birthdates_read on public.student_birthdates;
create policy student_birthdates_read on public.student_birthdates for select to authenticated
using (app_private.team() or student_id=app_private.my_student());
drop policy if exists student_birthdates_insert on public.student_birthdates;
create policy student_birthdates_insert on public.student_birthdates for insert to authenticated
with check (app_private.team());
drop policy if exists student_birthdates_update on public.student_birthdates;
create policy student_birthdates_update on public.student_birthdates for update to authenticated
using (app_private.team()) with check (app_private.team());
drop policy if exists student_birthdates_delete on public.student_birthdates;
create policy student_birthdates_delete on public.student_birthdates for delete to authenticated
using (app_private.team());
-- NULL means unknown; legacy false never proved that age was 20+.
alter table public.students alter column under_twenty drop default;
update public.students set under_twenty=null where under_twenty=false;
create or replace function app_private.signup()
returns trigger language plpgsql security definer set search_path='' as $function$
declare v_dob date;
begin
 perform pg_catalog.pg_advisory_xact_lock(291104);
 insert into public.accounts(user_id,email,name,phone,role)
 values(new.id,new.email,
 coalesce(nullif(new.raw_user_meta_data->>'full_name',''),pg_catalog.split_part(new.email,'@',1)),
 new.raw_user_meta_data->>'phone',
 case when not exists(select 1 from public.accounts where role='admin') then 'admin' else 'pending' end);
 if new.raw_user_meta_data ? 'birth_date' then
   v_dob := (new.raw_user_meta_data->>'birth_date')::date;
   if v_dob < date '1900-01-01' or v_dob > current_date then
     raise exception 'تاريخ الميلاد غير صالح';
   end if;
   insert into app_private.signup_birthdates(user_id,birth_date) values (new.id,v_dob)
   on conflict (user_id) do update set birth_date=excluded.birth_date;
 end if;
 return new;
end $function$;
create or replace function app_private.copy_signup_birthdate()
returns trigger language plpgsql security definer set search_path='' as $function$
begin
 if new.student_id is not null and new.student_id is distinct from old.student_id then
   insert into public.student_birthdates(student_id,birth_date)
   select new.student_id,b.birth_date from app_private.signup_birthdates b where b.user_id=new.user_id
   on conflict(student_id) do nothing;
 end if;
 return new;
end $function$;
drop trigger if exists on_account_student_birthdate on public.accounts;
create trigger on_account_student_birthdate
after update of student_id on public.accounts
for each row execute function app_private.copy_signup_birthdate();
create or replace function public.set_my_birth_date(p_birth_date date)
returns void language plpgsql security definer set search_path='' as $function$
declare sid uuid; uid uuid:=auth.uid();
begin
 if uid is null then raise exception 'يجب تسجيل الدخول' using errcode='42501'; end if;
 if p_birth_date is null or p_birth_date < date '1900-01-01' or p_birth_date>current_date then
   raise exception 'تاريخ الميلاد غير صالح';
 end if;
 sid:=public.ensure_my_student_profile();
 insert into public.student_birthdates(student_id,birth_date) values(sid,p_birth_date)
 on conflict(student_id) do update set birth_date=excluded.birth_date;
 insert into app_private.signup_birthdates(user_id,birth_date) values(uid,p_birth_date)
 on conflict(user_id) do update set birth_date=excluded.birth_date;
end $function$;
revoke all on function public.set_my_birth_date(date) from public,anon;
grant execute on function public.set_my_birth_date(date) to authenticated;
-- Work with existing records when DOB is supplied later; the app computes
-- under-20 on the current date and never trusts the old under_twenty flag.
