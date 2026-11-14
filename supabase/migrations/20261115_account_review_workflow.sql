-- Review account requests atomically, protecting privileged roles and student links.
alter table public.accounts add column if not exists reviewed_at timestamptz;
alter table public.accounts add column if not exists reviewed_by uuid references auth.users(id);
alter table public.accounts add column if not exists rejection_reason text;
create unique index if not exists accounts_one_user_per_student
  on public.accounts(student_id) where student_id is not null;
create or replace function app_private.guard_account_changes()
returns trigger language plpgsql security definer set search_path='' as $$
declare actor_role text;
begin
  actor_role:=app_private.my_role();
  if auth.uid() is null or actor_role not in ('admin','murafiqa') then
    raise exception 'ليس لديكِ صلاحية إدارة الحسابات' using errcode='42501';
  end if;
  if (old.role='admin' or new.role='admin') and actor_role<>'admin' then
    raise exception 'تعديل صلاحية الإدارة متاح للإدارة فقط' using errcode='42501';
  end if;
  if new.user_id is distinct from old.user_id or new.email is distinct from old.email
     or new.created_at is distinct from old.created_at then
    raise exception 'لا يجوز تغيير هوية الحساب أو البريد المعتمد من هذه الصفحة' using errcode='42501';
  end if;
  if new.role not in ('pending','rejected','disabled','gharisa','musaida','murafiqa','admin') then
    raise exception 'صفة الحساب غير صالحة';
  end if;
  if new.role='gharisa' and new.student_id is null then
    raise exception 'يلزم ربط حساب الغارسة بسجل غارسة';
  end if;
  if new.role='admin' and old.role='admin' and new.role is distinct from old.role then
    raise exception 'تعديل الحساب الإداري غير صالح';
  end if;
  return new;
end
$$;
drop trigger if exists guard_account_changes on public.accounts;
create trigger guard_account_changes before update on public.accounts
for each row execute function app_private.guard_account_changes();
create or replace function public.review_account(
 p_user_id uuid,
 p_action text,
 p_name text default null,
 p_title text default null,
 p_role text default null,
 p_student_id uuid default null,
 p_create_student boolean default false,
 p_rejection_reason text default null
) returns uuid language plpgsql security definer set search_path='' as $$
declare actor_role text; target public.accounts%rowtype; linked_id uuid; already_linked boolean;
begin
 if auth.uid() is null then raise exception 'يجب تسجيل الدخول' using errcode='42501'; end if;
 actor_role:=app_private.my_role();
 if actor_role not in ('admin','murafiqa') then raise exception 'إدارة الحسابات للإدارة والمرافقة فقط' using errcode='42501'; end if;
 if p_action not in ('approve','reject','update') then raise exception 'الإجراء غير معروف'; end if;
 select * into target from public.accounts where user_id=p_user_id for update;
 if not found then raise exception 'الحساب غير موجود'; end if;
 if (target.role='admin' or p_role='admin') and actor_role<>'admin' then
  raise exception 'الحسابات الإدارية لا يعدّلها إلا المسؤول الإداري' using errcode='42501';
 end if;
 if p_action in ('approve','reject') and target.role not in ('pending','rejected') then
  raise exception 'هذا الطلب تمت مراجعته سابقًا';
 end if;
 if p_action='reject' then
   if target.role='admin' then raise exception 'لا يمكن رفض الحساب الإداري'; end if;
   update public.accounts set role='rejected',student_id=null,
     reviewed_at=now(),reviewed_by=auth.uid(),
     rejection_reason=nullif(left(btrim(coalesce(p_rejection_reason,'')),500),'')
   where user_id=p_user_id;
   return null;
 end if;
 if nullif(btrim(coalesce(p_name,'')),'') is null then raise exception 'أدخلي اسم الحساب'; end if;
 if p_role not in ('gharisa','musaida','murafiqa','admin','disabled') then
   raise exception 'اختاري صفة معتمدة';
 end if;
 if p_action='approve' and p_role='disabled' then raise exception 'لا يمكن الموافقة بصفة موقوف'; end if;
 if p_create_student and (p_student_id is not null or p_role<>'gharisa') then
   raise exception 'إنشاء سجل جديد متاح عند اعتماد حساب غارسة دون اختيار سجل آخر';
 end if;
 if p_role='gharisa' then
   if p_create_student then
     insert into public.students(name,email,phone,stage)
       values(btrim(p_name),target.email,target.phone,'accepted')
       returning id into linked_id;
   else
     linked_id:=p_student_id;
     if linked_id is null then raise exception 'اختاري سجل غارسة أو أنشئي سجلًا جديدًا'; end if;
     perform 1 from public.students where id=linked_id;
     if not found then raise exception 'سجل الغارسة المحدد غير موجود'; end if;
   end if;
 else
   linked_id:=null;
 end if;
 if linked_id is not null and exists(select 1 from public.accounts a where a.student_id=linked_id and a.user_id<>p_user_id) then
    raise exception 'سجل الغارسة مربوط بحساب آخر';
 end if;
 update public.accounts
  set name=btrim(p_name),title=nullif(btrim(coalesce(p_title,'')),''),
      role=p_role,student_id=linked_id,
      reviewed_at=now(),reviewed_by=auth.uid(),rejection_reason=null
  where user_id=p_user_id;
 return linked_id;
end $$;
revoke all on function public.review_account(uuid,text,text,text,text,uuid,boolean,text) from public,anon;
grant execute on function public.review_account(uuid,text,text,text,text,uuid,boolean,text) to authenticated;
