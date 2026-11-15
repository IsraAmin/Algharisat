import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('../app.js', import.meta.url),'utf8');
const css=readFileSync(new URL('../style.css', import.meta.url),'utf8');
test('signup has distinct international dial code and exactly nine local digits',()=>{
 assert.match(app,/name="phone_code"/);
 assert.match(app,/name="phone_local"/);
 assert.match(app,/\^\[0-9\]\{9\}\$/);
 assert.match(app,/const phone=code\+local/);
 assert.match(app,/full_name:x\.full_name,phone,birth_date:x\.birth_date\}/);
});
test('dark theme can be toggled and persisted',()=>{
 assert.match(app,/localStorage\.setItem\('algharisat-theme'/);
 assert.match(app,/function toggleTheme\(/);
 assert.match(css,/:root\[data-theme="dark"\]/);
 assert.match(css,/\[data-theme="dark"\] \.mobile-nav/);
});
test('brown buttons use white text and follow-up keeps table rows at mobile widths',()=>{
 assert.match(css,/\.btn\.goldbtn[^\n]*color:#fff!important/);
 assert.match(css,/\.followup-edit-table tbody tr[^\n]*display:table-row!important/);
 assert.match(css,/\.followup-table-scroll[^\n]*overflow-x:auto!important/);
 assert.match(css,/\.followup-edit-table \.followup-name-cell[^\n]*position:sticky!important/);
});

test('legacy browser confirmations are replaced by themed accessible dialogs',()=>{
 assert.match(app,/function appConfirm\(/);
 assert.match(app,/role="alertdialog"/);
 assert.match(app,/await confirmFollowupLeave\(\)/);
 assert.match(app,/title:'تأكيد '\+verb\+' التقويم'/);
 assert.match(app,/title:'استعادة كلمة المرور'/);
 assert.doesNotMatch(app,/window\.confirm\(/);
 assert.doesNotMatch(app,/const email=prompt\(/);
});
test('dark palette covers nested operational pages and dialog text',()=>{
 for(const selector of ['.card-aspect','.outcomes-surface','.question-body','.student-file-section>h2','.dashboard-family-metrics>div','.batch-family','.comms-announcement','.followup-name-cell']){
  assert.ok(css.includes(selector), 'dark coverage '+selector);
 }
 assert.match(css,/\[data-theme="dark"\] :is\(/);
 assert.match(css,/\.app-confirm-box\{/);
 assert.match(css,/\.toast\.app-toast\{/);
 assert.match(app,/app-toast-content/);
});

test('dark mode guarantees high contrast for batch scorecard titles and all page text',()=>{
 assert.match(css,/--dark-text-primary:#f2f6fa/);
 assert.match(css,/html\[data-theme="dark"\] \.content :is\(h1,h2,h3,h4,h5,h6,legend,summary\)/);
 for(const selector of ['.batch-summary-title','.batch-summary-metric','.batch-section-heading h2','.outcomes-section-title h2','.outcome-minutes-count','.batch-family-heading h3']){
  assert.ok(css.includes(selector), 'Missing dark contrast rule for '+selector);
 }
 assert.match(css,/\.batch-summary-card \.batch-summary-meter\{background:#496175!important/);
 assert.match(css,/\.batch-legend-value\.level-2/);
});

test('mobile fields do not trigger iOS focus zoom and manual zoom remains available',()=>{
 assert.match(css,/@media \(pointer:coarse\) and \(max-width:900px\)/);
 assert.match(css,/\.followup-edit-table input,\.followup-edit-table select/);
 assert.match(css,/font-size:16px!important/);
 assert.match(css,/touch-action:manipulation/);
 assert.ok(css.includes('button,[role="button"],a,select,input,textarea{'), 'mobile touch controls exist');
});

test('password visibility control works in sign-in and sign-up without changing the submitted value',()=>{
 assert.match(app,/function authPasswordField\(/);
 assert.match(app,/authPasswordField\(\)\+\(state\.authTab==='signup'/);
 assert.match(app,/data-action="togglePassword"/);
 assert.match(app,/input\.type=visible\?'text':'password'/);
 assert.match(app,/aria-pressed/);
 assert.match(css,/\.auth-password-field input\{padding-inline-end:55px\}/);
});

test('family coordinator never sees other family selector and may only edit assigned family',()=>{
 assert.match(app,/const ownFamilyId=\(\)=>state\.profile\?\.family_id\|\|null/);
 assert.match(app,/r\.family_id===ownFamilyId\(\)/);
 assert.match(app,/state\.family=team\(\)\?\(remembered\.family\|\|state\.family\):ownFamilyId\(\)/);
 assert.match(app,/state\.family=team\(\)\?\(state\.family\|\|rows\('families'\)\[0\]\?\.id\|\|null\):ownFamilyId\(\)/);
 assert.match(app,/aria-label="الأسرة المسندة لكِ"/);
 assert.match(app,/if\(!team\(\)\)\{el\.value=ownFamilyId\(\)\|\|''/);
 assert.match(app,/familyId!==ownFamily/);
});

test('signup requires a matching confirmed password, with independently accessible reveal buttons',()=>{
 assert.match(app,/authPasswordField\('password_confirm','تأكيد كلمة المرور'\)/);
 assert.match(app,/if\(x\.password!==x\.password_confirm\)throw Error\('كلمة المرور وتأكيدها غير متطابقتين'\)/);
 assert.match(app,/el\.getAttribute\('aria-controls'\)/);
 assert.match(app,/input\.id==='f_password_confirm'/);
 assert.match(app,/authPasswordField\(key='password',label='كلمة المرور'\)/);
});

test('desktop auth keeps verse panel stationary and scrolls the account form only',()=>{
 assert.match(css,/@media \(min-width:801px\)/);
 assert.match(css,/\.auth\{\s*height:100vh;\s*height:100dvh;\s*min-height:0;\s*overflow:hidden/);
 assert.match(css,/\.auth-panel\{\s*height:100%;\s*min-height:0;\s*overflow-x:hidden;\s*overflow-y:auto/);
 assert.match(css,/@media \(max-width:800px\)\{\s*\.auth\{height:auto;min-height:100svh;overflow:visible\}/);
});

test('dark authentication submit buttons are gold with white labels',()=>{
 assert.match(css,/html\[data-theme="dark"\] \.auth-panel #authForm button\[type="submit"\]\.btn\{/);
 assert.match(css,/background:#97713e!important/);
 assert.match(css,/color:#fff!important/);
 assert.match(css,/html\[data-theme="dark"\] \.auth-panel #authForm button\[type="submit"\]\.btn:hover:not\(:disabled\)/);
});

test('dark account table uses dark alternating row and cell backgrounds',()=>{
 assert.match(css,/html\[data-theme="dark"\] \.content \.table-wrap > table tbody tr:nth-child\(even\) > :is\(td,th\)/);
 assert.match(css,/html\[data-theme="dark"\] \.content \.table-wrap > table tbody tr > :is\(td,th\)/);
 assert.match(css,/background:var\(--dm-surface-muted\)!important/);
 assert.match(css,/color:var\(--dm-text\)!important/);
});
test('communications status labels, icons and destructive controls use dark-safe colors',()=>{
 for(const name of ['.comms-heading-icon','.comms-metric-icon','.comms-resource-symbol','.comms-section-count','.comms-delete','.comms-date','.comms-tag.pinned','.comms-announcement.is-pinned']){
  assert.ok(css.includes(name), 'missing dark contrast rule '+name);
 }
 assert.match(css,/background:#334e65!important/);
 assert.match(css,/color:#f4d29e!important/);
 assert.match(css,/background:#56353c!important/);
});
test('no global forced white text on all spans and table cells',()=>{
 assert.doesNotMatch(css,/html\[data-theme="dark"\] \.content :is\(div,span,p,small,th,td,label,summary,a,button\)/);
});

test('dashboard statistical numbers and follow-up labels are bright in dark mode',()=>{
 for(const selector of ['.stat .value','.dashboard-stats .stat .value','.followup-section-label','.followup-family-selector span','.followup-current-family strong','.dashboard-panel-head h2','.card-goal-main h4','.outcomes-section-title h2']){
  assert.ok(css.includes(selector), 'missing text contrast selector: '+selector);
 }
 assert.match(css,/html\[data-theme="dark"\] \.content :is\(\.stat \.value,\.dashboard-stats \.stat \.value\)/);
 assert.match(css,/color:#f4f7fb!important/);
 assert.match(css,/color:#f4d39b!important/);
});
test('dark headings are scoped without breaking status badge contrast',()=>{
 assert.doesNotMatch(css,/html\[data-theme="dark"\] \.content :is\(div,span,p,small,th,td,label,summary,a,button\)/);
 assert.match(css,/\.followup-week-pill\.active/);
 assert.match(css,/\.mobile-more-link\.is-selected/);
});

test('all native dropdowns share premium light/dark theme and keyboard focus',()=>{
 assert.match(css,/--select-arrow:/);
 assert.match(css,/html select,/);
 assert.match(css,/html \.content select,/);
 assert.match(css,/html \.dialog select,/);
 assert.match(css,/-webkit-appearance:none!important/);
 assert.match(css,/background-image:var\(--select-arrow\)!important/);
 assert.match(css,/html select:focus-visible/);
 assert.match(css,/html\[data-theme="dark"\] select option/);
 assert.match(css,/@media \(pointer:coarse\)/);
 assert.match(css,/font-size:16px!important/);
});

test('native select is preserved while custom option menus are rendered',()=>{
 assert.match(app,/function enhanceChoiceSelect\(select\)/);
 assert.match(app,/select\.dataset\.choiceEnhanced='true'/);
 assert.match(app,/holder\.appendChild\(select\)/);
 assert.match(app,/function openChoicePopover\(select,trigger\)/);
 assert.match(app,/function commitChoice\(select,index\)/);
 assert.match(app,/select\.dispatchEvent\(new Event\('change',\{bubbles:true\}\)\)/);
 assert.match(app,/installChoiceSelects\(\)/);
});
test('option menus show actual branded options in light and dark mode',()=>{
 assert.match(css,/\.ui-choice-popover\{/);
 assert.match(css,/\.ui-choice-option\.is-selected/);
 assert.match(css,/html\[data-theme="dark"\] \.ui-choice-popover\{/);
 assert.match(css,/html\[data-theme="dark"\] \.ui-choice-option\.is-selected/);
 assert.match(css,/\.ui-choice-trigger:focus-visible/);
 assert.match(app,/role','listbox/);
 assert.match(app,/aria-selected/);
});


test('comprehensive reports show all required guide sections and period headers',()=>{
 for(const text of ['تقرير موحّد للأسر','تاريخ الإعداد','من — إلى','ملخص الدفعة','أداء الأسر','بطاقة الغارسة — الجوانب الستة','إنجاز علامات الغارسات','الوثائق والمحاضر','قائمة الختام','ملاحظات المرافقة غير السرية','طريقة الحساب والمصادر']){
  assert.ok(app.includes(text),'missing report section '+text);
 }
 for(const label of ["month1","month2","all"])assert.ok(app.includes("period==='"+label+"'"),'missing period '+label);
 assert.match(app,/function reportPeriodWeeks\(period\)/);
 assert.match(app,/sortedWeeks\(\)\.filter\(w=>w\.kind==='program'/);
 assert.match(app,/periodIds=new Set\(allWeeks\.map\(w=>w\.id\)\)/);
});
test('weekly report statistics exclude empty/unrecorded values',()=>{
 assert.match(app,/function reportAttendance\(records,key\)/);
 assert.ok(app.includes("['present','late','excused','absent']"));
 assert.match(app,/r\[key\]==='present'\|\|r\[key\]==='late'/);
 assert.match(app,/function reportTask\(records,key\)/);
 assert.ok(app.includes("['done','partial','none']"));
 assert.match(app,/reportRatio\(eligible,r=>r\[key\]==='done'\)/);
 assert.match(app,/function reportWird\(records\)/);
 assert.match(app,/r\.wird_days!==null&&r\.wird_days!==undefined/);
 assert.match(app,/items\.length\?reportValue\(items\.filter\(predicate\)\.length\/items\.length\*100,0\)\+'٪':'—'/);
});
test('report cards honor stage rules and milestone guardian exception',()=>{
 assert.match(app,/period==='month1'\?\['self'\]:cardStages\.filter\(/);
 assert.match(app,/cardEntries\.filter\(r=>r\.student_id===studentId&&r\.aspect===aspect/);
 assert.match(app,/code!=='guardian'\|\|studentUnder20\(s\)===true/);
 assert.match(app,/new Set\(familyMinutes\.filter\(m=>m\.family_id===familyId\)\.map\(m=>m\.week_id\)\)/);
});
test('private observations never appear in printable reports',()=>{
 assert.match(app,/leadership\(\)\?rows\('observations'\)\.filter\(o=>o\.secret===false&&o\.kind!=='حدود الستر'/);
 assert.match(app,/esc\(o\.note\|\|''\)/);
});
test('print report is self contained and dark mode uses readable panels',()=>{
 assert.match(css,/\.professional-report-page\{display:grid/);
 assert.match(css,/\.report-sheet\{/);
 assert.match(css,/\.report-table-scroll\{/);
 assert.match(css,/html\[data-theme="dark"\] \.report-sheet\{/);
 assert.match(css,/@page\{size:A4;margin:14mm 12mm\}/);
 assert.match(css,/\.professional-report-page>\.page-head,\.professional-report-page>\.report-toolbar/);
});

test('birthdate is collected during signup and not inferred from manual age flags',()=>{
 assert.match(app,/birthDateField\('',true\)\+phoneSignupField\(\)/);
 assert.match(app,/birth_date:x\.birth_date/);
 assert.match(app,/function validBirthDate\(value\)/);
 assert.match(app,/function studentAge\(studentId\)/);
 assert.match(app,/function studentUnder20\(student\)/);
 assert.doesNotMatch(app,/field\('دون العشرين','under_twenty'/);
});
test('birthdates are saved privately for current and newly enrolled students',()=>{
 assert.match(app,/const staff=\['students','student_birthdates'/);
 assert.match(app,/const student=\['students','student_birthdates'/);
 assert.match(app,/db\.rpc\('set_my_birth_date',\{p_birth_date:x\.birth_date\}\)/);
 assert.match(app,/db\.from\('student_birthdates'\)\.upsert/);
 assert.match(app,/birthDateField\(birthDateOf\(p\.id\)\|\|''/);
});
test('unknown birthdays never make under-twenty requirements disappear silently',()=>{
 assert.match(app,/studentUnder20\(student\)===null\?'غير معروف'/);
 assert.match(app,/code==='guardian'&&studentUnder20\(s\)===null/);
 assert.match(app,/studentUnder20\(student\)!==true/);
 assert.match(app,/code!=='guardian'\|\|studentUnder20\(s\)===true/);
});


test('preparation shows four sections, live counts and actual completion dates',()=>{
 for(const title of ['القرارات','المهام','شروط الانطلاق','قائمة الختام'])assert.ok(app.includes(title));
 assert.match(app,/const preparationSections=/);
 assert.match(app,/const done=list\.filter\(t=>t\.done===true\)\.length,all=list\.length/);
 assert.match(app,/prep-section-count/);
 assert.match(app,/data-task/);
 assert.match(app,/t\.done&&t\.done_at/);
 assert.match(app,/prep-progress/);
});
test('staff can edit tasks with existing completion state preserved, and delete through confirmation',()=>{
 assert.match(app,/case 'newtask':case 'edittask'/);
 assert.match(app,/edittask:'tasks'/);
 assert.match(app,/db\.from\('tasks'\)\.update\(value\)\.eq\('id',id\)/);
 assert.match(app,/action\.startsWith\('deletetask:'\)/);
 assert.match(app,/openDeleteConfirmation\(\{type:'task',id,name:item\.body\}\)/);
 assert.match(app,/pending\.type==='task'/);
 assert.match(app,/db\.from\('tasks'\)\.delete\(\)\.eq\('id',pending\.id\)/);
 assert.match(app,/previous\?\.done_at\|\|new Date\(\)\.toISOString\(\)/);
});
test('founding meeting cannot be scheduled before all launch tasks complete',()=>{
 assert.match(app,/const launchReadiness=/);
 assert.match(app,/all\.length>0&&all\.every\(t=>t\.done===true\)/);
 assert.match(app,/isFoundationMeeting\(x\.kind,x\.title\)/);
 assert.match(app,/if\(!launch\.ready\)throw Error/);
 assert.match(app,/\['لقاء التأسيس','لقاء التأسيس'\]/);
});
test('preparation design is responsive and safe in dark mode',()=>{
 assert.match(css,/\.prep-sections\{display:grid/);
 assert.match(css,/\.prep-readiness\.is-ready/);
 assert.match(css,/\.prep-entry-check input:focus-visible/);
 assert.match(css,/html\[data-theme="dark"\] \.prep-delete/);
 assert.match(css,/@media\(max-width:1100px\)\{\.prep-sections\{grid-template-columns:1fr\}\}/);
});


test('journal lists each program week exactly once in a scrollable table',()=>{
 assert.match(app,/function journal\(\)/);
 assert.match(app,/const weeks=sortedWeeks\(\)\.filter\(w=>w\.kind==='program'\)/);
 assert.match(app,/const byWeek=new Map\(entries\.map\(item=>\[item\.week_id,item\]\)\)/);
 assert.match(app,/journal-table-scroll/);
 assert.match(app,/journal-week-label/);
 assert.match(app,/journal-status/);
 assert.match(app,/data-action="journalView:review"/);
});
test('journal supports team-only create and edit without duplicate weeks',()=>{
 assert.match(app,/case 'newjournal':case 'editjournal'/);
 assert.match(app,/editjournal:'journal'/);
 assert.match(app,/if\(!team\(\)\)throw Error\('سجل التجربة متاح للفريق فقط'\)/);
 assert.match(app,/rows\('journal'\)\.some\(j=>j\.week_id===week\.id\)/);
 assert.match(app,/db\.from\('journal'\)\.update\(/);
 assert.match(app,/db\.from\('journal'\)\.insert\(/);
 assert.match(app,/const content=\{success:String\(x\.success\|\|''\)\.trim\(\),obstacle:String\(x\.obstacle\|\|''\)\.trim\(\),decision:String\(x\.decision\|\|''\)\.trim\(\)\}/);
});
test('council review is sourced from saved journal entries and printable',()=>{
 assert.match(app,/const reviewItems=recorded\.map\(/);
 assert.match(app,/list\('success'\)/);
 assert.match(app,/list\('obstacle'\)/);
 assert.match(app,/list\('decision'\)/);
 assert.match(app,/مجلس التطوير • الأسبوع الفاصل/);
 assert.match(app,/القرارات المتخذة/);
 assert.match(css,/\.journal-review-columns\{display:grid/);
 assert.match(css,/@media print\{/);
 assert.match(css,/html\[data-theme="dark"\] \.journal-table/);
});


test('accounts and permissions page presents separate pending and established tabs',()=>{
 for(const value of ['account-tabs','account-overview','بانتظار الموافقة','الحسابات القائمة','منذ تقديم الطلب','رقم الهاتف','اللقب']){
  assert.ok(app.includes(value)||css.includes(value),'missing account UI: '+value);
 }
 assert.match(app,/state\.accountsTab==='current'\?'current':'pending'/);
 assert.match(app,/data-action="accountsTab:pending"/);
 assert.match(app,/data-action="accountsTab:current"/);
 assert.match(app,/function accountWaitingTime\(value\)/);
 assert.match(app,/function accountMatchCandidates\(a\)/);
});
test('account approvals and rejection use protected single database operation',()=>{
 assert.match(app,/case 'editaccount':case 'reviewaccount'/);
 assert.match(app,/case 'rejectaccount'/);
 assert.match(app,/p_action:account\.role==='pending'\|\|account\.role==='rejected'\?'approve':'update'/);
 assert.match(app,/db\.rpc\('review_account',/);
 assert.match(app,/p_create_student:createStudent/);
 assert.match(app,/p_action:'reject'/);
 assert.match(app,/تأكيد رفض الطلب/);
 assert.match(app,/account\.role==='pending'\|\|account\.role==='rejected'/);
});
test('rejected accounts remain blocked and show their rejection reason',()=>{
 assert.match(app,/\['pending','rejected','disabled'\]\.includes/);
 assert.match(app,/role==='rejected'\?'لم تُقبل نتيجة طلب التسجيل'/);
 assert.match(app,/account\.rejection_reason/);
 assert.match(app,/data-action="accountsTab:pending"/);
});
test('accounts pages retain high-contrast custom light and dark design',()=>{
 assert.match(css,/\.account-overview\{display:grid/);
 assert.match(css,/\.account-tabs button\.is-active/);
 assert.match(css,/html\[data-theme="dark"\] \.account-role-badge\.is-rejected/);
 assert.match(css,/html\[data-theme="dark"\] \.account-reject-button/);
 assert.match(css,/@media\(max-width:690px\)/);
});


test('configuration page contains accessible program settings and all guide sections',()=>{
 for(const phrase of ['معلومات البرنامج','إزاحة التقويم','مراحل التقييم في بطاقة الغارسة','إدارة الأسر','رقم الدورة الجارية','عبارة الترحيب','رقم التواصل البديل'])assert.ok(app.includes(phrase),phrase);
 assert.match(app,/function backupContactNotice\(\)/);
 assert.match(app,/backupContactNotice\(\)/);
 assert.match(app,/public_welcome_message/);
 assert.match(app,/state\.publicWelcome\|\|/);
});
test('calendar rescheduling previews direction and absolute day count before committing',()=>{
 assert.match(app,/amount>0\?'تأخير':'تقديم'/);
 assert.match(app,/Math\.abs\(amount\)/);
 assert.match(app,/new Date\(next\+'T12:00:00Z'\)\.getUTCDay\(\)!==6/);
 assert.match(app,/appConfirm\(\{title:'تأكيد '\+verb\+' التقويم'/);
 assert.match(app,/db\.rpc\('shift_program'/);
});
test('assessment stages are data backed and fully integrated into cards and reports',()=>{
 assert.match(app,/const base=\['settings','assessment_stages'/);
 assert.match(app,/function syncAssessmentStages\(\)/);
 assert.match(app,/cardStages\.splice\(0,cardStages\.length/);
 assert.match(app,/case 'newassessmentstage':case 'editassessmentstage'/);
 assert.match(app,/db\.from\('assessment_stages'\)\.insert\(/);
 assert.match(app,/db\.from\('assessment_stages'\)\.update\(/);
 assert.match(app,/db\.from\('assessment_stages'\)\.delete\(/);
 assert.match(app,/cardStages\.filter\(\(\[code\]\)=>code!=='self'\)\.map/);
 assert.match(app,/if\(rows\('cards'\)\.some\(c=>c\.stage===code\)\)/);
});
test('new setting controls retain readable colors in dark mode',()=>{
 assert.match(css,/\.settings-stage-list\{display:grid/);
 assert.match(css,/\.backup-contact-note\{display:flex/);
 assert.match(css,/html\[data-theme="dark"\] \.settings-section/);
 assert.match(css,/html\[data-theme="dark"\] \.backup-contact-note/);
});

test('mobile auth fits narrow viewport and removes obsolete hero marketing paragraph',()=>{
 assert.doesNotMatch(app,/مساحة تجمع الأسبوع، والأسرة، والمتابعة، والثمرة في مكان واحد/);
 assert.match(css,/html,body,#root\{width:100%;max-width:100%;min-width:0\}/);
 assert.match(css,/@media\(max-width:1024px\)\{/);
 assert.match(css,/\.auth\{display:flex;flex-direction:column;height:auto;min-height:100svh;overflow:visible\}/);
 assert.match(css,/\.auth-panel\{padding:clamp\(20px,5vw,36px\)/);
 assert.match(css,/\.auth-hero \.verse\{font-size:clamp/);
 assert.match(css,/-webkit-text-size-adjust:100%/);
 assert.match(css,/\.auth-panel :is\(input:not\(\[type="checkbox"\]\):not\(\[type="radio"\]\),textarea,select\)/);
 assert.doesNotMatch(css,/user-scalable=no/);
});

test('mobile auth uses one viewport-fitting column even with desktop site layout',()=>{
 assert.match(css,/@media \(max-width:1100px\), \(pointer:coarse\) and \(orientation:portrait\)/);
 assert.match(css,/\.auth\{[\s\S]*?display:flex!important;[\s\S]*?flex-direction:column!important;/);
 assert.match(css,/\.auth>\.auth-panel\{[\s\S]*?inline-size:100%!important;/);
 assert.match(css,/\.auth>\.auth-panel \.tabs button\{[\s\S]*?min-inline-size:0!important;/);
 assert.match(css,/\.auth>\.auth-panel #authForm :is\(input:not\(\[type="checkbox"\]\),textarea,select\)/);
});

test('theme control renders only SVG icon with accessible labels and current theme state',()=>{
 assert.match(app,/function themeControl\(\)/);
 assert.match(app,/class="theme-toggle theme-toggle-icon"/);
 assert.match(app,/aria-label="'\+name\+'"/);
 assert.match(app,/aria-pressed="'\+dark\+'"/);
 assert.doesNotMatch(app,/☀ الوضع الفاتح|☾ الوضع الداكن/);
 assert.match(css,/\.theme-toggle\.theme-toggle-icon\{/);
 assert.match(css,/\.theme-toggle-icon:focus-visible\{/);
});
test('active bottom navigation stays dark with visible white icon and label',()=>{
 assert.match(css,/html\[data-theme="dark"\] \.mobile-nav button\[data-page\]\.active/);
 assert.match(css,/background:#36526a!important/);
 assert.match(css,/color:#fff!important/);
 assert.match(css,/html\[data-theme="dark"\] \.mobile-nav button\.active svg \*/);
 assert.match(css,/border-top:1px solid #445c70!important/);
});


test('system settings show staff actions to admins only',()=>{
 assert.match(app,/const adminOnly=\(\)=>state\.account\?\.role==='admin'/);
 assert.match(app,/function adminActivityPanel\(\)/);
 assert.match(app,/if\(!adminOnly\(\)\)return ''/);
 assert.match(app,/adminActivityPanel\(\)/);
 assert.match(app,/سجل نشاط فريق العمل/);
 assert.match(app,/function loadTeamActivity\(\)/);
 assert.match(app,/db\.from\('team_activity_log'\)/);
 assert.match(app,/\.limit\(250\)/);
});
test('staff audit filters and refresh work with existing custom selects',()=>{
 for(const selection of ['auditActor','auditAction','auditEntity']){
  assert.ok(app.includes("'"+selection+"'"),'missing filter '+selection);
 }
 assert.match(app,/action==='refreshTeamActivity'/);
 assert.match(app,/\['auditActor','auditAction','auditEntity'\]\.includes\(el\.dataset\.select\)/);
 assert.match(app,/auditActionNames=\{INSERT:'إضافة',UPDATE:'تعديل',DELETE:'حذف'\}/);
});
test('dark-mode audit uses accessible action colors and mobile overflow handling',()=>{
 assert.match(css,/\.audit-table-wrap\{width:100%;max-width:100%;overflow-x:auto/);
 assert.match(css,/html\[data-theme="dark"\] \.audit-operation\.operation-delete/);
 assert.match(css,/html\[data-theme="dark"\] \.audit-table/);
 assert.match(css,/@media\(max-width:570px\)/);
});

test('student registry action controls stay on one line with horizontal overflow',()=>{
 assert.match(css,/\.students-row-actions\{[\s\S]*?flex-flow:row nowrap!important/);
 assert.match(css,/\.students-row-actions>\.btn,[\s\S]*?flex:0 0 auto/);
 assert.match(css,/\.students-table td\[data-label="الإجراءات"\]\{[\s\S]*?white-space:nowrap/);
 assert.match(css,/\.students-table-wrap\{[\s\S]*?overflow-x:auto/);
 assert.match(css,/@media\(max-width:650px\)\{[\s\S]*?\.students-row-actions\{max-width:none;width:max-content;flex-wrap:nowrap!important/);
});


test('family hub matches guide with four cycles and five documented rotating duties',()=>{
 assert.match(app,/function families\(\)/);
 assert.match(app,/const familyRotatingTasks=/);
 assert.match(app,/const familyDocuments=/);
 for(const role of ['المنسقة','المسؤولة الفقهية','المسؤولة الفكرية','المسؤولة الاجتماعية','مسؤولة العطاء'])assert.ok(app.includes(role),role);
 for(const label of ['ما المهام الخمس؟','الدورة ','مديرات لقاءات الأسرة','محاضر لقاءات الأسرة','وثائق الأسرة الأربع'])assert.ok(app.includes(label),label);
 assert.match(app,/\[1,2,3,4\]\.map\(n=>/);
 assert.match(app,/data-action="familyCycle:'/);
 assert.match(app,/family-task-explainer/);
});
test('family leader roster renders all eight weeks with current-week indicator',()=>{
 assert.match(app,/const weeks=sortedWeeks\(\)\.filter\(w=>w\.kind==='program'\)\.slice\(0,8\)/);
 assert.match(app,/const leaderRows=weeks\.map/);
 assert.match(app,/weekCurrent\(week\)/);
 assert.match(app,/family-current-week/);
 assert.match(app,/case 'assignleader':/);
 assert.match(app,/db\.from\('rota_leader'\)|save\('rota_leader'/);
});
test('family members can write and edit fully detailed meeting minutes in own family',()=>{
 assert.match(app,/case 'newminute':case 'editminute'/);
 assert.match(app,/field\('مديرة اللقاء','leader_id'/);
 assert.match(app,/field\('عدد الحاضرات','attendance_count'/);
 assert.match(app,/field\('الخلاصة','summary'/);
 assert.match(app,/field\('التكليفات والقرارات','decisions'/);
 assert.match(app,/db\.from\('minutes'\)\.update\(payload\)/);
 assert.match(app,/\.eq\('family_id',familyId\)/);
 assert.match(app,/familyScopeId=\(\)=>team\(\)\?state\.family:ownFamilyId\(\)/);
});
test('family documents show full text and update timestamps without leaking other families',()=>{
 assert.match(app,/familyDocuments\.map/);
 assert.match(app,/family-document-details/);
 assert.match(app,/doc\.updated_at\?date\(doc\.updated_at\)/);
 assert.match(app,/updated_at:new Date\(\)\.toISOString\(\)/);
 assert.match(app,/family_id:familyId/);
 assert.match(app,/family-document-pending/);
});
test('family hub remains responsive and readable in dark mode',()=>{
 assert.match(css,/\.family-role-grid\{display:grid/);
 assert.match(css,/\.family-leader-scroll\{overflow-x:auto/);
 assert.match(css,/html\[data-theme="dark"\] \.family-hub \.family-cycle-btn\.is-active/);
 assert.match(css,/@media\(max-width:600px\)/);
});

test('report PDF uses dedicated readable A4 landscape print rules',()=>{
 assert.match(css,/@page algharisatReport\{/);
 assert.match(css,/size:A4 landscape;/);
 assert.match(css,/\.professional-report-page[\s\S]*?page:algharisatReport/);
 assert.match(css,/\.professional-report-page \.report-cover,[\s\S]*?background:#fff!important/);
 assert.match(css,/\.professional-report-page \.report-cover h2,[\s\S]*?color:#172f42!important/);
 assert.match(css,/\.professional-report-page \.report-meta strong,[\s\S]*?color:#203344!important/);
 assert.match(css,/\.professional-report-page \.report-table thead\{display:table-header-group!important\}/);
 assert.match(css,/\.professional-report-page \.report-table tr\{[\s\S]*?break-inside:avoid!important/);
 assert.match(css,/\.professional-report-page \.report-section-head\{[\s\S]*?break-after:avoid!important/);
 assert.match(css,/\.professional-report-page \.report-table-scroll\{[\s\S]*?overflow:visible!important/);
 assert.match(css,/html\[data-theme="dark"\] \.professional-report-page \.report-method p/);
});

test('report printing fills page before continuing to the next page',()=>{
 assert.doesNotMatch(css,/html \.professional-report-page \.report-section:nth-of-type\(5\)/);
 assert.match(css,/html \.professional-report-page \.report-section\{\s*break-before:auto!important;/);
 assert.match(css,/html \.professional-report-page \.report-table-scroll\{\s*display:contents!important;/);
 assert.match(css,/html \.professional-report-page \.report-table tbody\{\s*break-inside:auto!important;/);
 assert.match(css,/html \.professional-report-page \.report-section-head\{\s*break-inside:avoid!important;/);
 assert.match(css,/html \.professional-report-page \.report-method\{\s*display:block!important;/);
 assert.match(css,/html \.professional-report-page \.report-note\{\s*break-inside:auto!important;/);
 assert.match(css,/\.professional-report-page \.report-table tr\{[\s\S]*?break-inside:avoid!important;/);
});
