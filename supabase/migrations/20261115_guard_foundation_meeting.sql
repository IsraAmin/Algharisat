-- Enforce founding-meeting prerequisites even for direct Data API writes.
-- A founding event is identified by its explicit kind or the legacy title.
create or replace function app_private.guard_foundation_meeting()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare v_total integer; v_pending integer;
begin
  if new.kind = 'لقاء التأسيس' or coalesce(new.title,'') ~ 'لقاء[[:space:]]+التأسيس' then
    select count(*),count(*) filter(where done is distinct from true)
      into v_total,v_pending
      from public.tasks where section = 'launch';
    if v_total = 0 then
      raise exception 'أضيفي شروط الانطلاق وأكمليها قبل جدولة لقاء التأسيس';
    end if;
    if v_pending > 0 then
      raise exception 'لا يمكن جدولة لقاء التأسيس: هناك % من شروط الانطلاق لم تُنجز',v_pending;
    end if;
  end if;
  return new;
end
$$;
drop trigger if exists guard_foundation_meeting on public.events;
create trigger guard_foundation_meeting
before insert or update of kind,title,starts_at on public.events
for each row execute function app_private.guard_foundation_meeting();
