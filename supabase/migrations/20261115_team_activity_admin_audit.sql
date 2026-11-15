-- Admin-only, immutable activity register for staff changes.
-- No row contents, passwords, survey answers, private notes, or birth dates.
create table if not exists public.team_activity_log (
  id bigint generated always as identity primary key,
  actor_id uuid not null,
  actor_name text not null,
  actor_role text not null check (actor_role in ('admin','murafiqa','musaida')),
  action text not null check (action in ('INSERT','UPDATE','DELETE')),
  entity_table text not null,
  record_key text,
  occurred_at timestamptz not null default now()
);
create index if not exists team_activity_log_recent_idx on public.team_activity_log(occurred_at desc, id desc);
create index if not exists team_activity_log_actor_idx on public.team_activity_log(actor_id,occurred_at desc);
alter table public.team_activity_log enable row level security;
revoke all on public.team_activity_log from anon, authenticated;
grant select on public.team_activity_log to authenticated;
drop policy if exists team_activity_admin_read on public.team_activity_log;
create policy team_activity_admin_read on public.team_activity_log for select to authenticated
using (app_private.my_role() = 'admin');
-- Absolutely no authenticated INSERT / UPDATE / DELETE privileges or policies.
-- SECURITY DEFINER trigger writes the log in the same transaction as the change.
create or replace function app_private.record_team_activity()
returns trigger language plpgsql security definer set search_path = '' as $function$
declare
 actor uuid := auth.uid();
 actor_info record;
 entity jsonb;
 key_value text;
begin
 if actor is null then return case when tg_op='DELETE' then old else new end; end if;
 select name,role into actor_info from public.accounts where user_id=actor;
 if actor_info.role not in ('admin','murafiqa','musaida') then
   return case when tg_op='DELETE' then old else new end;
 end if;
 if tg_op='UPDATE' and to_jsonb(new)=to_jsonb(old) then return new; end if;
 entity := case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
 key_value := coalesce(entity->>'id',entity->>'key',entity->>'user_id',
                      entity->>'student_id',entity->>'code');
 insert into public.team_activity_log(actor_id,actor_name,actor_role,action,entity_table,record_key)
 values(actor,coalesce(actor_info.name,'عضوة الفريق'),actor_info.role,tg_op,tg_table_name,left(key_value,128));
 return case when tg_op='DELETE' then old else new end;
end
$function$;
revoke all on function app_private.record_team_activity() from public,anon,authenticated;
-- Keep audit scope explicit. Anonymous survey responses deliberately excluded.
do $install$
declare tab text;
begin
 foreach tab in array array[
  'accounts','announcements','assessment_stages','cards','docs_family',
  'events','families','followups','goals','journal','milestones','minutes',
  'observations','questions','reports_self','resources','roles_family',
  'rota_leader','settings','students','tasks','weeks'
 ] loop
   execute format('drop trigger if exists team_activity_capture on public.%I',tab);
   execute format('create trigger team_activity_capture after insert or update or delete on public.%I for each row execute function app_private.record_team_activity()',tab);
 end loop;
end
$install$;
comment on table public.team_activity_log is
 'Admin-only immutable staff activity metadata. Intentionally excludes confidential row values, anonymous survey data, profile birth dates, and login events.';
