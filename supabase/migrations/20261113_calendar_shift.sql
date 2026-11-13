
create or replace function public.shift_program(p_first_week date) returns integer
language plpgsql security definer set search_path='' as $$
declare old_date date;delta integer;
begin
if app_private.my_role() not in ('admin','murafiqa') then raise exception 'غير مصرح';end if;
if extract(dow from p_first_week)<>6 then raise exception 'بداية الأسبوع يجب أن توافق السبت';end if;
select starts_on into old_date from public.weeks where code='w1' for update;
if old_date is null then raise exception 'الأسبوع الأول غير موجود';end if;
delta:=p_first_week-old_date;
if abs(delta)>366 then raise exception 'الإزاحة تتجاوز سنة';end if;
update public.weeks set starts_on=starts_on+delta,ends_on=ends_on+delta;
update public.events set starts_at=starts_at+make_interval(days=>delta) where starts_at is not null;
return delta;
end $$;
revoke all on function public.shift_program(date) from public,anon;
grant execute on function public.shift_program(date) to authenticated;
