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
 assert.match(app,/title:'تأكيد إزاحة التقويم'/);
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
 assert.match(app,/period==='month1'\?\['self'\]:\['fourth','third','second','first'\]/);
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
