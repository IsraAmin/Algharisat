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
 assert.match(app,/full_name:x\.full_name,phone\}/);
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
 assert.match(css,/html\[data-theme="dark"\] \.content :is\(div,span,p,small,th,td,label,summary,a,button\)/);
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
