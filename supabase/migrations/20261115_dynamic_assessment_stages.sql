-- Evaluation stages are data, not a hard-coded CHECK constraint.
create table if not exists public.assessment_stages (
 code text primary key,
 label text not null check (char_length(btrim(label)) between 2 and 70),
 sort_order integer not null unique check (sort_order between 0 and 100),
 is_self boolean not null default false,
 is_system boolean not null default false,
 created_at timestamptz not null default now(),
 constraint stage_code_safe check (code ~ '^[a-z][a-z0-9_]{1,39}$')
);
insert into public.assessment_stages(code,label,sort_order,is_self,is_system) values
 ('self','التقييم الذاتي',0,true,true),
 ('first','التقييم الأول',10,false,true),
 ('second','التقييم الثاني',20,false,true),
 ('third','التقييم الثالث',30,false,true),
 ('fourth','التقييم الرابع',40,false,true)
on conflict(code) do nothing;
alter table public.assessment_stages enable row level security;
grant select on public.assessment_stages to authenticated;
grant insert,update,delete on public.assessment_stages to authenticated;
drop policy if exists assessment_stages_read on public.assessment_stages;
create policy assessment_stages_read on public.assessment_stages for select to authenticated
 using (app_private.team() or app_private.my_role()='gharisa');
drop policy if exists assessment_stages_insert on public.assessment_stages;
create policy assessment_stages_insert on public.assessment_stages for insert to authenticated with check
 (app_private.lead() and is_self=false and is_system=false);
drop policy if exists assessment_stages_update on public.assessment_stages;
create policy assessment_stages_update on public.assessment_stages for update to authenticated
 using (app_private.lead()) with check (app_private.lead());
drop policy if exists assessment_stages_delete on public.assessment_stages;
create policy assessment_stages_delete on public.assessment_stages for delete to authenticated
 using (app_private.lead() and not is_system);
-- Prevent tampering with protected self/system codes and used stages.
create or replace function app_private.guard_assessment_stage()
returns trigger language plpgsql security definer set search_path='' as $$
begin
 if not app_private.lead() then raise exception 'إدارة مراحل التقييم للإدارة والمرافقة فقط' using errcode='42501'; end if;
 if tg_op='UPDATE' then
  if new.code is distinct from old.code or new.is_self is distinct from old.is_self
    or new.is_system is distinct from old.is_system then
   raise exception 'لا يمكن تغيير هوية أو نوع مرحلة التقييم';
  end if;
  if new.sort_order<>old.sort_order and old.is_system then
   raise exception 'ترتيب مراحل التقييم الأساسية ثابت';
  end if;
  return new;
 end if;
 if tg_op='DELETE' then
  if old.is_system then raise exception 'لا يمكن حذف مرحلة تقييم أساسية'; end if;
  return old;
 end if;
 return new;
end $$;
drop trigger if exists assessment_stage_guard on public.assessment_stages;
create trigger assessment_stage_guard before update or delete on public.assessment_stages
 for each row execute function app_private.guard_assessment_stage();
alter table public.cards drop constraint if exists cards_stage_valid;
alter table public.cards add constraint cards_stage_catalog_fk foreign key (stage)
 references public.assessment_stages(code) on update restrict on delete restrict;
-- Only the greeting is intentionally available to a signed-out visitor.
create or replace function public.public_welcome_message()
returns text language sql stable security definer set search_path='' as $$
 select coalesce((select value #>> '{}' from public.settings where key='welcome'),'')
$$;
revoke all on function public.public_welcome_message() from public;
grant execute on function public.public_welcome_message() to anon,authenticated;
