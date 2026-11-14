-- One team-only reflection per program week. Existing journal is empty.
alter table public.journal alter column week_id set not null;
create unique index if not exists journal_one_entry_per_week on public.journal(week_id);
-- Only program weeks may be assigned. Enforce beyond the UI.
create or replace function app_private.validate_program_journal_week()
returns trigger language plpgsql security invoker set search_path=''
as $function$
begin
  if not exists (
    select 1 from public.weeks w
    where w.id=new.week_id and w.kind='program'
  ) then
    raise exception 'سجل التجربة مخصص لأسابيع البرنامج فقط';
  end if;
  return new;
end
$function$;
drop trigger if exists validate_program_journal_week on public.journal;
create trigger validate_program_journal_week
before insert or update of week_id on public.journal
for each row execute function app_private.validate_program_journal_week();
