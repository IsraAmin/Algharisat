-- Survey privacy and round controls: preserve anonymous answers and separate completion ledger.
insert into public.settings(key,value) values ('survey_round','"p1"'::jsonb) on conflict (key) do nothing;
drop policy if exists settings_write on public.settings;
create policy settings_insert on public.settings for insert to authenticated
  with check (app_private.team() and (key not in ('survey_open','survey_round') or app_private.lead()));
create policy settings_update on public.settings for update to authenticated
  using (app_private.team() and (key not in ('survey_open','survey_round') or app_private.lead()))
  with check (app_private.team() and (key not in ('survey_open','survey_round') or app_private.lead()));
create policy settings_delete on public.settings for delete to authenticated
  using (app_private.team() and (key not in ('survey_open','survey_round') or app_private.lead()));

create or replace function public.submit_survey(p_answers jsonb,p_round text default 'p1')
returns void language plpgsql security definer set search_path='' as $$
declare sid uuid; active_round text;
begin
 sid := app_private.my_student();
 if sid is null or app_private.my_role() <> 'gharisa'
   or not exists (select 1 from public.students where id = sid and stage = 'active')
 then raise exception 'غير مصرح'; end if;
 if not exists (select 1 from public.settings where key = 'survey_open' and value = 'true'::jsonb)
 then raise exception 'الاستبانة مغلقة'; end if;
 select value #>> '{}' into active_round from public.settings where key='survey_round';
 if p_round is distinct from coalesce(active_round,'p1') then raise exception 'جولة الاستبانة غير صحيحة'; end if;
 if jsonb_typeof(p_answers) is distinct from 'array'
    or jsonb_array_length(p_answers) <> 5
    or exists (select 1 from jsonb_array_elements(p_answers) as a(answer)
               where jsonb_typeof(a.answer) <> 'string'
                  or length(btrim(a.answer #>> '{}')) = 0
                  or length(a.answer #>> '{}') > 5000)
 then raise exception 'الإجابات الخمس مطلوبة'; end if;
 insert into public.done_survey(student_id,round) values(sid,p_round);
 insert into public.responses_survey(round,answers) values(p_round,p_answers);
end $$;
revoke all on function public.submit_survey(jsonb,text) from public,anon;
grant execute on function public.submit_survey(jsonb,text) to authenticated;