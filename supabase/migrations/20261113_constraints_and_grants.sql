
revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from public;
grant select,insert,update,delete on all tables in schema public to authenticated;
alter table public.accounts add constraint accounts_role_valid check(role in ('pending','disabled','admin','murafiqa','musaida','gharisa'));
alter table public.students add constraint students_stage_valid check(stage in ('candidate','accepted','selected_not','active','paused','withdrawn'));
alter table public.weeks add constraint weeks_kind_valid check(kind in ('prep','program','break','after'));
alter table public.followups add constraint followups_majlis_valid check(majlis is null or majlis in ('present','late','excused','absent'));
alter table public.followups add constraint followups_family_valid check(family_meeting is null or family_meeting in ('present','late','excused','absent'));
alter table public.followups add constraint followups_task_valid check((triple_task is null or triple_task in ('done','partial','none')) and (transferred_lesson is null or transferred_lesson in ('done','partial','none')) and (rotating_task is null or rotating_task in ('done','partial','none')));
alter table public.tasks add constraint tasks_section_valid check(section in ('decision','task','launch','closing'));
alter table public.cards add constraint cards_stage_valid check(stage in ('self','first','second','third','fourth'));
alter table public.questions add constraint questions_status_valid check(status in ('open','sent','answered'));
alter table public.questions add constraint questions_kind_valid check(kind in ('fiqh','fikr','general'));
alter table public.roles_family add constraint roles_family_task_valid check(task in ('munassiqa','fiqhiya','fikriya','ijtimaiya','ataa'));
alter table public.roles_family add constraint roles_family_cycle_valid check(cycle between 1 and 4);
