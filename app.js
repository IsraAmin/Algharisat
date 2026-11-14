import { createClient } from '@supabase/supabase-js';
const db=createClient('https://utlcejgzkrvdhojrnxcm.supabase.co','sb_publishable_iOHkDZzbKgUKy7h3HQp1PQ_U0zxCjzE');
const safeUrl=v=>/^https?:\/\//i.test(String(v||''))?String(v):'#';
const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let deferredInstallPrompt=null;
const pwaStorageRead=key=>{try{return localStorage.getItem(key)}catch(e){return null}};
const pwaStorageWrite=(key,value)=>{try{localStorage.setItem(key,value)}catch(e){}};
const installedMode=()=>window.matchMedia?.('(display-mode: standalone)')?.matches||window.navigator.standalone===true;
const installFlag=()=>state.user?'algharisat-installed-'+state.user.id:'';
const dismissedFlag=()=>state.user?'algharisat-install-dismissed-'+state.user.id:'';
const shouldShowInstall=()=>!!state.user&&(window.matchMedia?.('(max-width: 800px)')?.matches||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))&&!installedMode()&&!pwaStorageRead('algharisat-installed')&&!pwaStorageRead(installFlag())&&!pwaStorageRead(dismissedFlag());
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;if(state.user)render()});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;pwaStorageWrite('algharisat-installed','1');if(state.user)pwaStorageWrite(installFlag(),'1');if(state.user)render()});
const state={studentProfileTab:'data',studentReportWeek:null,user:null,account:null,profile:null,page:'dashboard',rows:{},week:null,family:null,editing:null,notice:'',authTab:'signin',publicWelcome:'',period:'all',studentsTab:'all',studentsSearch:'',studentsFamily:''};
const iconPaths={"layout-dashboard":"<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/>","calendar-days":"<path d=\"M8 2v4M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01\"/>","users-round":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\"/>","house":"<path d=\"m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/><path d=\"M9 21v-8h6v8\"/>","clipboard-check":"<rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"4\" rx=\"1\"/><path d=\"m9 14 2 2 4-4\"/>","id-card":"<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><circle cx=\"8\" cy=\"11\" r=\"2\"/><path d=\"M4 17a4 4 0 0 1 8 0M15 10h4M15 14h4\"/>","flag":"<path d=\"M4 22V4m0 1c4-4 8 4 12 0v12c-4 4-8-4-12 0\"/>","message-circle-question":"<path d=\"M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z\"/><path d=\"M10 9a2 2 0 1 1 3 1.7c-.7.4-1 1-1 1.8M12 16h.01\"/>","megaphone":"<path d=\"m3 11 18-5v12L3 13z\"/><path d=\"M11 14.5 13 21H8l-2-7\"/>","list-todo":"<rect x=\"3\" y=\"5\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"m4 8 2 2 3-4M13 8h8M3 17h6M13 17h8\"/>","notebook-pen":"<path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M8 2v20M12 13h4\"/><path d=\"m14 7 5-5 3 3-5 5-4 1z\"/>","chart-column-increasing":"<path d=\"M3 3v18h18M7 16v-4M12 16V9M17 16V5\"/>","heart":"<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z\"/>","shield-check":"<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"m9 12 2 2 4-4\"/>","settings":"<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .3 1.8l-1.9 1.9A1.65 1.65 0 0 0 16 18.4a1.65 1.65 0 0 0-1.1.6V21h-2.7a1.65 1.65 0 0 0-1.1-1.6 1.65 1.65 0 0 0-1.8.3l-1.9-1.9A1.65 1.65 0 0 0 7.6 16a1.65 1.65 0 0 0-.6-1.1H5v-2.7a1.65 1.65 0 0 0 1.6-1.1 1.65 1.65 0 0 0-.3-1.8l1.9-1.9A1.65 1.65 0 0 0 10 7.6a1.65 1.65 0 0 0 1.1-.6V5h2.7a1.65 1.65 0 0 0 1.1 1.6 1.65 1.65 0 0 0 1.8-.3l1.9 1.9A1.65 1.65 0 0 0 18.4 10c.3.3.5.6.6 1.1H21v2.7a1.65 1.65 0 0 0-1.6 1.2z\"/>","sprout":"<path d=\"M12 22v-9\"/><path d=\"M12 13C7 13 4 10 4 5c5 0 8 3 8 8z\"/><path d=\"M12 17c0-6 3-9 9-9 0 6-3 9-9 9z\"/>","user-round":"<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-2a8 8 0 0 1 16 0v2\"/>","check-circle":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12 3 3 5-6\"/>","alert-triangle":"<path d=\"m10.3 3.3-8.5 15A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.7l-8.5-15a2 2 0 0 0-3.4 0z\"/><path d=\"M12 9v4M12 17h.01\"/>","clipboard-list":"<rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"4\" rx=\"1\"/><path d=\"M9 12h6M9 16h6\"/>","check":"<path d=\"m5 12 4 4 10-10\"/>","grid":"<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>","logout":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5M21 12H9\"/>","download":"<path d=\"M12 3v12m-4-4 4 4 4-4\"/><path d=\"M5 17v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3\"/>"};
const icons={"dashboard":"layout-dashboard","weeks":"calendar-days","students":"users-round","families":"house","followups":"clipboard-check","cards":"id-card","milestones":"flag","questions":"message-circle-question","announcements":"megaphone","tasks":"list-todo","journal":"notebook-pen","reports":"chart-column-increasing","survey":"heart","accounts":"shield-check","settings":"settings","myweek":"sprout","myreport":"notebook-pen","myfamily":"house","myfollowup":"clipboard-check","mycard":"id-card","program":"calendar-days","myquestions":"message-circle-question","notices":"megaphone","myaccount":"user-round"};
const iconSvg=(name,cls='ui-icon')=>'<svg class="'+cls+'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[name]||iconPaths.grid)+'</svg>';

const storedTheme=()=>{try{return localStorage.getItem('algharisat-theme')}catch{return null}};
const currentTheme=()=>storedTheme()||(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches?'dark':'light');
function applyTheme(mode){document.documentElement.dataset.theme=mode;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',mode==='dark'?'#111c29':'#183044')}
function toggleTheme(){const next=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('algharisat-theme',next)}catch{}applyTheme(next);render()}
function themeControl(){return '<button type="button" class="theme-toggle" data-action="toggleTheme" aria-label="تبديل الوضع الفاتح والداكن">'+(document.documentElement.dataset.theme==='dark'?'☀ الوضع الفاتح':'☾ الوضع الداكن')+'</button>'}
applyTheme(currentTheme());
window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener?.('change',()=>{if(!storedTheme()){applyTheme(currentTheme());render()}});
const asciiDigits=value=>String(value||'').replace(/[٠-٩]/g,ch=>String(ch.charCodeAt(0)-1632)).replace(/[۰-۹]/g,ch=>String(ch.charCodeAt(0)-1776));
function phoneSignupField(){return '<div class="field"><label for="signupPhoneLocal">رقم الهاتف (واتساب)</label><div class="signup-phone" dir="ltr"><div class="signup-code"><label for="signupPhoneCode">مفتاح الدولة</label><input id="signupPhoneCode" name="phone_code" type="tel" inputmode="tel" autocomplete="tel-country-code" value="+249" placeholder="+249" maxlength="4" required dir="ltr"/></div><div class="signup-local"><label for="signupPhoneLocal">الرقم (٩ أرقام)</label><input id="signupPhoneLocal" name="phone_local" type="tel" inputmode="numeric" pattern="[0-9٠-٩۰-۹]{9}" minlength="9" maxlength="9" placeholder="912345678" autocomplete="tel-national" required dir="ltr"/></div></div><p class="muted small">مفتاح الدولة منفصل، والرقم المحلي يجب أن يتكون من ٩ أرقام.</p></div>'}
const teamNav=[['dashboard','اللوحة'],['weeks','البرنامج والأسابيع'],['students','الغارسات'],['families','الأسر'],['followups','المتابعة الأسبوعية'],['cards','بطاقة الغارسة'],['milestones','المخرجات'],['questions','الأسئلة'],['announcements','الإعلانات والمصادر'],['tasks','التحضير والتشغيل'],['journal','سجل التجربة'],['reports','التقارير'],['survey','صوت الغارسة'],['accounts','الحسابات'],['settings','الإعدادات']];
const studentNav=[['myweek','أسبوعي'],['myreport','تقريري الأسبوعي'],['myfamily','أسرتي'],['myfollowup','متابعة الأسرة'],['mycard','بطاقتي'],['program','البرنامج'],['myquestions','أسئلتي'],['notices','الإعلانات'],['survey','صوت الغارسة'],['myaccount','حسابي']];
const team=()=>['admin','murafiqa','musaida'].includes(state.account?.role);
const leadership=()=>['admin','murafiqa'].includes(state.account?.role);
const ownFamilyId=()=>state.profile?.family_id||null;
const coordinator=()=>!team()&&!!ownFamilyId()&&state.rows.roles_family?.some(r=>r.student_id===state.account?.student_id&&r.family_id===ownFamilyId()&&r.task==='munassiqa'&&r.cycle===Number(setting('current_cycle',1)))===true;
const setting=(key,fallback='')=>state.rows.settings?.find(s=>s.key===key)?.value??fallback;
const rows=t=>state.rows[t]||[];
const birthDateOf=studentId=>rows('student_birthdates').find(row=>row.student_id===studentId)?.birth_date||null;
function validBirthDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||'')))return false;const d=new Date(value+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value&&value>='1900-01-01'&&value<=todayISO()}
function studentAge(studentId){const dob=birthDateOf(studentId);if(!validBirthDate(dob))return null;const [year,month,day]=dob.split('-').map(Number),[cy,cm,cd]=todayISO().split('-').map(Number);return cy-year-(cm<month||(cm===month&&cd<day)?1:0)}
function studentUnder20(student){const age=studentAge(student.id);return age===null?null:age<20}
const birthDateField=(value='',required=false)=>field('تاريخ الميلاد (ميلادي)','birth_date',value,'date',required).replace('type="date"','type="date" min="1900-01-01" max="'+todayISO()+'"');
const option=(v,label,current)=>'<option value="'+esc(v)+'" '+(String(current??'')===String(v)?'selected':'')+'>'+esc(label)+'</option>';
const name=(table,id)=>rows(table).find(x=>x.id===id)?.name||'—';
const weekName=id=>rows('weeks').find(x=>x.id===id)?.title||'—';
const date=v=>v?new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'long',year:'numeric'}).format(new Date(v)):'—';
const currentWeek=()=>rows('weeks').find(w=>w.kind==='program'&&w.starts_on<=new Date().toISOString().slice(0,10)&&w.ends_on>=new Date().toISOString().slice(0,10))||rows('weeks').filter(w=>w.kind==='program').find(w=>w.starts_on>new Date().toISOString().slice(0,10))||rows('weeks').find(w=>w.code==='w8');
const field=(label,key,value='',type='text',required=false,opts=null)=>'<div class="field"><label for="f_'+esc(key)+'">'+esc(label)+'</label>'+(opts?'<select id="f_'+esc(key)+'" name="'+esc(key)+'">'+opts.map(o=>option(o[0],o[1],value)).join('')+'</select>':type==='textarea'?'<textarea id="f_'+esc(key)+'" name="'+esc(key)+'">'+esc(value)+'</textarea>':'<input id="f_'+esc(key)+'" name="'+esc(key)+'" type="'+esc(type)+'" value="'+esc(value)+'" '+(required?'required':'')+'/>')+'</div>';
const btn=(action,text,cls='secondary',extra='')=>'<button class="btn '+cls+'" data-action="'+esc(action)+'" '+extra+'>'+esc(text)+'</button>';
function flash(text,error=false){state.notice=text;state.noticeError=error;render();setTimeout(()=>{if(state.notice===text){state.notice='';const el=$('.toast');if(el)el.remove()}},5000)}
async function read(t){const{data,error}=await db.from(t).select('*').limit(2000);if(error)throw error;state.rows[t]=data||[]}
async function load(){
const base=['settings','assessment_stages','weeks','families','events','announcements','resources','roles_family','rota_leader'];
const staff=['students','student_birthdates','followups','reports_self','cards','milestones','goals','questions','tasks','journal','minutes','docs_family'];
const student=['students','student_birthdates','followups','reports_self','cards','milestones','goals','questions','minutes','docs_family'];
const tables=[...base,...(team()?staff:student),...(leadership()?['accounts','done_survey','responses_survey','observations']:!team()?['done_survey']:[])];
await Promise.all(tables.map(t=>read(t).catch(err=>{console.warn(t,err.message);state.rows[t]=[]})));
if(rows('assessment_stages').length)syncAssessmentStages();
if(!team()&&state.account?.student_id){state.profile=rows('students').find(s=>s.id===state.account.student_id);const result=await db.rpc('family_directory');if(!result.error&&result.data){const own=rows('students');state.rows.students=[...own,...result.data.filter(s=>!own.some(m=>m.id===s.id))]}const pub=await db.rpc('published_questions');if(!pub.error&&pub.data){const mine=rows('questions');state.rows.questions=[...mine,...pub.data.filter(q=>!mine.some(m=>m.id===q.id))]}}
state.week ||= currentWeek()?.id;
state.family=team()?(state.family||rows('families')[0]?.id||null):ownFamilyId();
}
const withTimeout=(promise,ms=15000)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('استغرق الاتصال وقتًا أطول من المتوقع. تحققي من الإنترنت وحاولي مرة أخرى.')),ms))]);
// Page memory is scoped to the signed-in account (not shared across accounts).
const pageMemoryKey=userId=>'algharisat-page-'+userId;
function readCurrentPage(userId){
try{const value=JSON.parse(localStorage.getItem(pageMemoryKey(userId))||'null');return value&&typeof value.page==='string'?value:null}catch(e){return null}
}
function rememberCurrentPage(){
if(!state.user||!state.account||['pending','rejected','disabled'].includes(state.account.role))return;
try{localStorage.setItem(pageMemoryKey(state.user.id),JSON.stringify({
page:state.page,week:state.week,family:state.family,dashboardStudent:state.dashboardStudent,
studentReportWeek:state.studentReportWeek,studentFileReturn:state.studentFileReturn,
studentProfileTab:state.studentProfileTab,studentsTab:state.studentsTab,
studentsSearch:state.studentsSearch,studentsFamily:state.studentsFamily
}))}catch(e){}
}
let bootSequence=0;
async function start(){
const sequence=++bootSequence;
const{data:{session},error:sessionError}=await withTimeout(db.auth.getSession());
if(sessionError)throw sessionError;
if(sequence!==bootSequence)return;
state.user=session?.user||null;
state.account=null;
if(!state.user){render();return}
const{data,error}=await withTimeout(db.from('accounts').select('*').eq('user_id',state.user.id).maybeSingle());
if(sequence!==bootSequence)return;
if(error)throw error;
state.account=data;
if(!data||['pending','rejected','disabled'].includes(data.role)){render();return}
// An approved gharisa must have a student record before reports, cards or profile changes can be saved.
if(data.role==='gharisa'&&!data.student_id){
  const{data:studentId,error:profileError}=await withTimeout(db.rpc('ensure_my_student_profile'));
  if(profileError)throw new Error('تعذر تجهيز ملف الغارسة المرتبط بحسابك: '+profileError.message);
  state.account={...data,student_id:studentId};
}
// Restore the current user's own last page; never force the dashboard on refresh.
const remembered=readCurrentPage(state.user.id);
const allowed=team()?new Set([...teamNav.map(([key])=>key),'dashboardStudent','studentReport','weeks','weekdetail','program']):new Set([...studentNav.map(([key])=>key),'weekdetail','program']);
state.page=remembered&&allowed.has(remembered.page)&&(!['dashboardStudent','studentReport'].includes(remembered.page)||remembered.dashboardStudent)?remembered.page:(team()?'dashboard':'myweek');
if(remembered&&state.page===remembered.page){
state.week=remembered.week||state.week;
state.family=team()?(remembered.family||state.family):ownFamilyId();
state.dashboardStudent=remembered.dashboardStudent||state.dashboardStudent;
state.studentReportWeek=remembered.studentReportWeek||state.studentReportWeek;
state.studentFileReturn=remembered.studentFileReturn||state.studentFileReturn;
state.studentProfileTab=remembered.studentProfileTab||state.studentProfileTab;
state.studentsTab=remembered.studentsTab||state.studentsTab;
state.studentsSearch=remembered.studentsSearch||'';
state.studentsFamily=remembered.studentsFamily||'';
}
render();
try{await withTimeout(load(),20000)}catch(error){console.warn('تعذر تحميل بعض بيانات الحساب',error);flash('تم تسجيل الدخول، لكن تعذّر تحميل بعض البيانات. حاولي تحديث الصفحة.',true)}
if(sequence===bootSequence)render();
}
let loginInProgress=false;
db.auth.onAuthStateChange((event)=>{if(!loginInProgress&&['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)){setTimeout(()=>start().catch(err=>{console.error(err);flash('تعذر تحديث حالة تسجيل الدخول، أعيدي تحميل الصفحة.',true)}),0)}});
function authPasswordField(key='password',label='كلمة المرور'){
 const reveal='<button type="button" class="password-visibility-toggle" data-action="togglePassword" aria-controls="f_'+esc(key)+'" aria-label="إظهار '+esc(label)+'" aria-pressed="false" title="إظهار '+esc(label)+'"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></button>';
 return field(label,key,'','password',true).replace('class="field"','class="field auth-password-field"').replace('</div>',reveal+'</div>');
}
function auth(){
return '<div class="auth"><section class="auth-hero"><div class="brand"><div class="brandmark">'+iconSvg('sprout')+'</div>معهد التأسيس الشرعي | منصة الغارسات</div><h1>الغارسات</h1><p class="verse">﴿كَزَرْعٍ أَخْرَجَ شَطْأَهُ فَآزَرَهُ فَاسْتَغْلَظَ فَاسْتَوَىٰ عَلَىٰ سُوقِهِ﴾</p><p style="margin-top:35px;color:#c8c7c6">مساحة تجمع الأسبوع، والأسرة، والمتابعة، والثمرة في مكان واحد.</p></section><section class="auth-panel"><div class="eyebrow">أهلًا بكِ في منصة الغارسات</div><h2 class="welcome">'+esc(state.publicWelcome||'رحلة تُغرس فيها المعاني وتُرعى ثمارها.')+'</h2><p class="muted">ادخلي إلى حسابك، أو أنشئي حسابًا جديدًا للمراجعة.</p><div class="auth-theme-control">'+themeControl()+'</div><div class="tabs"><button data-action="signin" class="'+(state.authTab==='signin'?'active':'')+'">تسجيل الدخول</button><button data-action="signup" class="'+(state.authTab==='signup'?'active':'')+'">حساب جديد</button></div><form id="authForm">'+(state.authTab==='signup'?field('الاسم كاملًا','full_name','', 'text',true)+birthDateField('',true)+phoneSignupField():'')+field('البريد الإلكتروني','email','','email',true)+authPasswordField()+(state.authTab==='signup'?authPasswordField('password_confirm','تأكيد كلمة المرور'):'')+'<button class="btn" type="submit" style="width:100%;margin-top:15px">'+(state.authTab==='signup'?'إرسال طلب التسجيل':'دخول إلى المنصة')+'</button></form><button class="textbtn" data-action="reset">نسيتِ كلمة المرور؟</button></section></div>';
}
function pending(){return '<div class="auth"><section class="auth-hero"><div class="brand">'+iconSvg('sprout')+' معهد التأسيس الشرعي</div><h1>الغارسات</h1><p class="verse">لكل بذرة أوانها، ولكل غرس رعاية.</p></section><section class="auth-panel"><h2>'+(state.account?.role==='disabled'?'هذا الحساب موقوف':state.account?.role==='rejected'?'لم تُقبل نتيجة طلب التسجيل':'وصل طلبكِ')+'</h2><p class="muted" style="margin:20px 0">'+(state.account?.role==='disabled'?'راجعي إدارة البرنامج إن ظننتِ أن هناك خطأ.':state.account?.role==='rejected'?(state.account?.rejection_reason?'سبب عدم الموافقة: '+esc(state.account.rejection_reason):'لم تتم الموافقة على طلب التسجيل. يمكنكِ التواصل مع الإدارة لمراجعة الحالة.'):'طلب التسجيل في انتظار موافقة إدارة البرنامج. يمكنكِ العودة للتحقق من حالته.')+'</p>'+btn('refresh','تحديث حالة الحساب')+' '+'<button type="button" class="logout-icon pending-logout" data-action="logout" aria-label="تسجيل الخروج" title="تسجيل الخروج"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button>'+installNotice()+themeControl()+'</section></div>'}
function installNotice(){
if(!shouldShowInstall())return '';
return '<section class="install-notice" role="status" aria-label="اقتراح تثبيت الغارسات"><div class="install-notice-mark" aria-hidden="true">✦</div><div class="install-notice-copy"><strong>الغارسات على شاشة تلفونك</strong><p>أضيفي المنصة للشاشة الرئيسية وافتحيها بسهولة مثل التطبيق.</p></div><div class="install-notice-actions"><button type="button" class="btn goldbtn smallbtn" data-action="install">إضافة للشاشة الرئيسية</button><button type="button" class="install-notice-dismiss" data-action="dismissInstall" aria-label="إخفاء اقتراح التثبيت" title="إخفاء">×</button></div></section>';
}
// All permanent deletion flows must pass through this confirmation dialog.
let deletePending=null;

let activeConfirmDialog=null;
function appConfirm({title='تأكيد الإجراء',message='',confirmText='تأكيد',danger=false,input=false,placeholder=''}={}){
 if(activeConfirmDialog)activeConfirmDialog(false);
 return new Promise(resolve=>{
  const previous=document.activeElement;
  const layer=document.createElement('div');layer.className='app-confirm-backdrop';
  layer.innerHTML='<div class="app-confirm-scrim"></div><section class="app-confirm-box" role="alertdialog" aria-modal="true" aria-labelledby="app-confirm-title" aria-describedby="app-confirm-description"><div class="app-confirm-symbol" aria-hidden="true">'+(danger?'!':'✓')+'</div><h2 id="app-confirm-title">'+esc(title)+'</h2><p id="app-confirm-description">'+esc(message)+'</p>'+(input?'<label class="app-confirm-label" for="appConfirmInput">البريد الإلكتروني</label><input id="appConfirmInput" type="email" autocomplete="email" required placeholder="'+esc(placeholder)+'" />':'')+'<div class="app-confirm-actions"><button type="button" class="btn secondary" data-choice="cancel">إلغاء</button><button type="button" class="btn '+(danger?'dangerbtn':'goldbtn')+'" data-choice="confirm">'+esc(confirmText)+'</button></div></section>';
  const finish=value=>{if(!activeConfirmDialog)return;activeConfirmDialog=null;layer.remove();document.removeEventListener('keydown',onKey,true);if(previous?.isConnected)previous.focus();resolve(value)};
  activeConfirmDialog=finish;
  const onKey=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();finish(false)}else if(e.key==='Tab'){const controls=[...layer.querySelectorAll('button,input')];const i=controls.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();controls[controls.length-1].focus()}else if(!e.shiftKey&&i===controls.length-1){e.preventDefault();controls[0].focus()}}else if(e.key==='Enter'&&input&&document.activeElement?.id==='appConfirmInput'){e.preventDefault();layer.querySelector('[data-choice="confirm"]').click()}};
  layer.addEventListener('click',e=>{const choice=e.target.closest('[data-choice]')?.dataset.choice;if(!choice){if(e.target.classList.contains('app-confirm-scrim'))finish(false);return}if(choice==='cancel')return finish(false);if(input){const field=layer.querySelector('#appConfirmInput');if(!field.reportValidity())return;return finish(field.value.trim())}finish(true)});
  document.addEventListener('keydown',onKey,true);document.body.appendChild(layer);(input?layer.querySelector('input'):layer.querySelector('[data-choice="cancel"]')).focus();
 });
}
function closeDeleteConfirmation(){document.querySelector('.delete-confirm-backdrop')?.remove();deletePending=null}
function openDeleteConfirmation(item){
closeDeleteConfirmation();deletePending=item;
const layer=document.createElement('div');layer.className='delete-confirm-backdrop';
layer.innerHTML='<div class="delete-confirm-scrim" data-action="cancelDelete"></div><section class="delete-confirm" role="alertdialog" aria-modal="true" aria-labelledby="delete-confirm-title" aria-describedby="delete-confirm-description"><div class="delete-confirm-icon">'+iconSvg('shield-check')+'</div><h2 id="delete-confirm-title">تأكيد الحذف</h2><p id="delete-confirm-description">'+(item.type==='question'?'هل تريدين حذف هذا السؤال نهائيًا؟':'هل تريدين حذف سجل «'+esc(item.name)+'» نهائيًا؟')+' <strong>لا يمكن التراجع عن الحذف.</strong></p><div class="delete-confirm-actions"><button type="button" class="btn secondary" data-action="cancelDelete">إلغاء</button><button type="button" class="btn delete-accept" data-action="confirmDelete">'+(item.type==='question'?'نعم، احذف السؤال':'نعم، احذف السجل')+'</button></div></section>';
document.body.appendChild(layer);layer.querySelector('[data-action="cancelDelete"]').focus();
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&deletePending)closeDeleteConfirmation()});
function logoutConfirmDialog(){
if(document.querySelector('.logout-confirm-backdrop'))return;
const layer=document.createElement('div');
layer.className='logout-confirm-backdrop';
layer.innerHTML='<section class="logout-confirm" role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title" aria-describedby="logout-dialog-description"><div class="logout-dialog-icon" aria-hidden="true">⎋</div><h2 id="logout-dialog-title">تأكيد تسجيل الخروج</h2><p id="logout-dialog-description">هل تريدين الخروج من حسابك في منصة الغارسات؟</p><div class="logout-dialog-actions"><button type="button" class="btn secondary" data-action="cancelLogout">إلغاء</button><button type="button" class="btn dangerbtn" data-action="confirmLogout">نعم، تسجيل الخروج</button></div></section>';
document.body.appendChild(layer);
layer.querySelector('[data-action="cancelLogout"]').focus();
}
function visibleNavigation(){
const nav=team()?teamNav:studentNav.filter(x=>x[0]!=='myfollowup'||coordinator()).filter(x=>x[0]!=='survey'||setting('survey_open',false)===true);
return nav.filter(x=>x[0]!=='accounts'||leadership()).filter(x=>x[0]!=='survey'||state.account?.role!=='musaida');
}
// Section headings follow the team pages in the official guide.
const teamNavGroups=[
['صفحات المتابعة',['dashboard','weeks','students','families','followups']],
['صفحات قياس الثمرة',['cards','milestones','reports','survey']],
['صفحات التواصل',['questions','announcements']],
['صفحات التشغيل',['tasks','journal']],
['الإدارة والإعدادات',['accounts','settings']]
];
function groupedNavigation(visible){
if(!team())return [['صفحات الغارسة',visible]];
return teamNavGroups.map(([label,ids])=>[label,ids.map(id=>visible.find(([p])=>p===id)).filter(Boolean)]).filter(([,items])=>items.length);
}
function sidebarNavigation(visible){
return groupedNavigation(visible).map(([label,items],index)=>'<section class="sidebar-section" aria-labelledby="sidebar-group-'+index+'"><h2 class="sidebar-section-title" id="sidebar-group-'+index+'">'+esc(label)+'</h2><div class="sidebar-section-links">'+items.map(([p,t])=>'<button type="button" class="nav-item '+(p===state.page?'active':'')+'" data-page="'+esc(p)+'"'+(p===state.page?' aria-current="page"':'')+'><span class="sidebar-nav-icon">'+iconSvg(icons[p])+'</span><span>'+esc(t)+'</span>'+((p==='announcements'||p==='notices')?notificationBadge():'')+'</button>').join('')+'</div></section>').join('');
}
// Unread announcement marker is per signed-in account and scoped to rows visible under RLS.
const announcementReadKey=()=>state.user?'algharisat-announcements-seen-'+state.user.id:'';
const announcementLatest=()=>rows('announcements').reduce((latest,a)=>a.created_at&&a.created_at>latest?a.created_at:latest,'');
const hasUnreadAnnouncements=()=>!!state.user&&rows('announcements').some(a=>a.created_at&&a.created_at>(pwaStorageRead(announcementReadKey())||''));
function markAnnouncementsRead(){if(!state.user)return;const latest=announcementLatest();if(latest&&latest>(pwaStorageRead(announcementReadKey())||''))pwaStorageWrite(announcementReadKey(),latest)}
const notificationBadge=()=>'<span class="announcement-notice-indicator"'+(hasUnreadAnnouncements()?'':' hidden')+' aria-label="يوجد إعلان جديد">1</span>';
function refreshAnnouncementIndicators(){const unread=hasUnreadAnnouncements();document.querySelectorAll('.announcement-notice-indicator').forEach(el=>{el.hidden=!unread})}
function closeMobileMore(){
const overlay=document.querySelector('.mobile-more-overlay');
if(overlay){overlay.remove();document.body.classList.remove('mobile-more-open')}
}
function showMobileMore(){
closeMobileMore();
const visible=visibleNavigation();
const primary=visible.slice(0,4).map(([p])=>p);
const groups=team()?groupedNavigation(visible):[
['التنقل السريع',visible.filter(([p])=>primary.includes(p))],
['بقية الصفحات',visible.filter(([p])=>!primary.includes(p))]
].filter(([,items])=>items.length);
const sections=groups.map(([title,items])=>'<section class="mobile-more-section"><h3>'+esc(title)+'</h3><div class="mobile-more-grid">'+items.map(([page,label])=>
'<button type="button" class="mobile-more-link'+(state.page===page?' is-selected':'')+'" data-page="'+esc(page)+'"'+(state.page===page?' aria-current="page"':'')+'><span class="mobile-more-link-icon">'+iconSvg(icons[page])+'</span><span class="mobile-more-link-title">'+esc(label)+'</span>'+((page==='announcements'||page==='notices')?notificationBadge():'')+(state.page===page?'<span class="mobile-more-current">الحالية</span>':'')+'</button>'
).join('')+'</div></section>').join('');
const overlay=document.createElement('div');
overlay.className='mobile-more-overlay';
overlay.innerHTML='<div class="mobile-more-scrim" data-action="closeMore"></div><section class="mobile-more-sheet" role="dialog" aria-modal="true" aria-labelledby="mobile-more-heading" tabindex="-1"><div class="mobile-more-handle" aria-hidden="true"></div><header class="mobile-more-header"><div><span class="mobile-more-eyebrow">منصة الغارسات</span><h2 id="mobile-more-heading">القائمة الرئيسية</h2><p>اختاري الصفحة التي تريدين الانتقال إليها</p></div><button type="button" class="mobile-more-close" data-action="closeMore" aria-label="إغلاق القائمة">×</button></header><div class="mobile-more-scroll">'+sections+'</div><footer class="mobile-more-footer"><span>'+iconSvg('sprout')+' الغارسات</span><span>معهد التأسيس الشرعي</span></footer></section>';
document.body.appendChild(overlay);
document.body.classList.add('mobile-more-open');
overlay.querySelector('.mobile-more-close').focus();
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.querySelector('.mobile-more-overlay'))closeMobileMore()});
function shell(){
const visible=visibleNavigation();
let main='';
try{main=page()}catch(err){console.error(err);main='<div class="card"><p>تعذر عرض هذه الصفحة. حدّثي البيانات وحاولي مرة أخرى.</p></div>'}
const top=team()?'الفريق':'الغارسة';
return '<div class="app"><aside class="sidebar"><div class="brand"><div class="brandmark">'+iconSvg('sprout')+'</div><span>الغارسات<small style="display:block;font-weight:400;color:#acb5c3">معهد التأسيس الشرعي</small></span></div><div class="side-label">مساحة '+top+'</div><nav class="sidebar-groups" aria-label="صفحات المنصة">'+sidebarNavigation(visible)+'</nav>'+'</aside><main class="main"><header class="topbar"><div class="mobile-brand brand"><div class="brandmark" style="width:32px;height:32px">✦</div>الغارسات</div><div class="muted small user-title">منصة برنامج الغارسات | '+esc(setting('stage_name','المرحلة الأولى'))+'</div><div style="display:flex;align-items:center;gap:12px">'+themeControl()+'<span class="small">'+esc(state.account?.name||'')+' <span class="muted">| '+esc(state.account?.title||top)+'</span></span><button type="button" data-action="logout" class="logout-icon" aria-label="تسجيل الخروج" title="تسجيل الخروج"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button></div></header><div class="content">'+installNotice()+main+'</div></main><nav class="mobile-nav">'+visible.slice(0,4).map(([p,t])=>'<button class="'+(p===state.page?'active':'')+'" data-page="'+p+'"><span style="font-size:20px">'+iconSvg(icons[p])+'</span>'+t+'</button>').join('')+'<button type="button" data-action="more" aria-haspopup="dialog" aria-label="فتح جميع الصفحات"><span class="mobile-icon">'+iconSvg('grid')+notificationBadge()+'</span>المزيد</button></nav></div>';
}
function heading(title,desc,action=''){return '<div class="page-head"><div><div class="eyebrow">مِن الغَرْسِ إلى الثَّمَر</div><h1>'+esc(title)+'</h1><p class="subtitle">'+esc(desc)+'</p></div>'+(action?'<div class="page-actions">'+action+'</div>':'')+'</div>'}
function empty(text){return '<div class="empty"><strong>لا توجد بيانات بعد</strong>'+esc(text)+'</div>'}
function table(headers,body){return '<div class="card table-wrap"><table><thead><tr>'+headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table></div>'}
function selectWeeks(){return '<select id="weekSelect" data-select="week">'+rows('weeks').filter(w=>w.kind==='program').map(w=>option(w.id,'الأسبوع '+esc(w.code.slice(1))+' | '+w.title,state.week)).join('')+'</select>'}
function selectFamilies(){return '<select id="familySelect" data-select="family">'+rows('families').map(f=>option(f.id,f.name,state.family)).join('')+'</select>'}
const todayISO=()=>new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Riyadh'});
const hijriDate=value=>{if(!value)return '—';try{return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(String(value).slice(0,10)+'T12:00:00Z'))}catch(e){return '—'}};
const shortDate=value=>value?new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(String(value).slice(0,10)+'T12:00:00Z')):'—';
const weekCurrent=w=>!!w&&w.starts_on<=todayISO()&&w.ends_on>=todayISO();
const sortedWeeks=()=>[...rows('weeks')].sort((a,b)=>a.sort_order-b.sort_order);
const visibleWeeks=()=>sortedWeeks().filter(w=>team()||w.kind!=='prep');
const fixedRhythm=[
'الورد اليومي: بقدر تتفق عليه الأسرة.',
'المجلس ثم الدرس: ساعة ونصف عن بُعد للجماعة كلها.',
'لقاء الأسرة: بعد المجلس بيومين أو ثلاثة، ساعة ونصف، تديره إحدى الأخوات بالتناوب.',
'المهمة الثلاثية: في نفسي، وفي بيتي، وفي محيطي.',
'المحاسبة: آخر الأسبوع في دفتر لا يُسلَّم لأحد، ولا تُكتب في المنصة.'
];
const eventVisible=e=>team()||!e.family_id||e.family_id===state.profile?.family_id;
const eventDate=e=>e.starts_at?new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit',timeZone:'Asia/Riyadh'}).format(new Date(e.starts_at)):'يُحدَّد لاحقًا';
function eventItems(list){return list.length?list.map(e=>'<div class="event-item"><span class="event-bullet">•</span><div><strong>'+esc(e.title)+'</strong><p class="muted small">'+esc(e.kind||'موعد')+' · '+esc(eventDate(e))+(e.place?' · '+esc(e.place):'')+'</p></div></div>').join(''):empty('لا توجد مواعيد مسجلة لهذه الفترة')}
function weekCard(w){
const current=weekCurrent(w),selected=state.week===w.id;
const phase=w.kind==='prep'?'التحضير':w.kind==='break'?'ما بعدها':'الأسبوع '+esc(w.code?.replace(/^w/,'')||'');
return '<button type="button" class="week-tile '+(current?'is-current ':'')+(selected?'active':'')+'" data-week="'+esc(w.id)+'" aria-label="فتح '+esc(w.title)+'"><div class="week-tile-top"><span class="week-code">'+phase+'</span>'+(current?'<span class="chip ok">الجاري الآن</span>':'')+'</div><h3>'+esc(w.title)+'</h3><p class="small muted">'+esc(shortDate(w.starts_on))+' — '+esc(shortDate(w.ends_on))+'</p>'+(w.reflection?'<p class="week-reflection">'+esc(w.reflection)+'</p>':'')+'<span class="week-open">تفاصيل الأسبوع ←</span></button>';
}

function dashboard(){
const today=todayISO(),allWeeks=sortedWeeks(),programWeeks=allWeeks.filter(w=>w.kind==='program');
const firstProgram=programWeeks[0],inPreparation=!!firstProgram&&today<firstProgram.starts_on;
const prepWeeks=allWeeks.filter(w=>w.kind==='prep');
const prepWeek=prepWeeks.find(weekCurrent)||prepWeeks.find(w=>w.starts_on>today)||prepWeeks.at(-1)||null;
const w=inPreparation?prepWeek:currentWeek();
const people=rows('students').filter(s=>s.stage==='active');
const candidates=rows('students').filter(s=>s.stage==='candidate');
const waiting=leadership()?rows('accounts').filter(a=>a.role==='pending'):[];
const pendingQuestionCount=rows('questions').filter(q=>['open','sent'].includes(q.status)).length;
const follow=rows('followups').filter(f=>f.week_id===w?.id&&people.some(s=>s.id===f.student_id));
const known=follow.filter(f=>!!f.majlis),present=known.filter(f=>['present','late'].includes(f.majlis));
const wirdRecords=follow.filter(f=>f.wird_days!==null&&f.wird_days!==undefined);
const avg=wirdRecords.length?wirdRecords.reduce((total,f)=>total+Number(f.wird_days),0)/wirdRecords.length:null;
const tasks=rows('tasks'),weeklyTasks=tasks.filter(t=>t.section==='task'&&t.week_id===w?.id).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
const launchTasks=tasks.filter(t=>t.section==='launch').sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
const completed=arr=>arr.filter(t=>t.done===true).length;
const fraction=arr=>arr.length?completed(arr)+' / '+arr.length:'—';
const weeksForAlerts=programWeeks.filter(x=>x.starts_on<=today);
const reasons=[];
if(!inPreparation){
for(const student of people){
const relevant=rows('followups').filter(f=>f.student_id===student.id&&weeksForAlerts.some(x=>x.id===f.week_id));
const recent=weeksForAlerts.slice(-2);
const consecutive=recent.length===2?recent.map(week=>relevant.find(f=>f.week_id===week.id)): [];
const issues=[];
if(consecutive.length===2&&consecutive.every(f=>f&&f.majlis==='absent'))issues.push('غياب المجلس أسبوعين متتاليين');
if(consecutive.length===2&&consecutive.every(f=>f&&f.family_meeting==='absent'))issues.push('غياب لقاء الأسرة أسبوعين متتاليين');
const latestRecorded=relevant.sort((a,b)=>weeksForAlerts.findIndex(x=>x.id===b.week_id)-weeksForAlerts.findIndex(x=>x.id===a.week_id))[0];
if(latestRecorded&&latestRecorded.wird_days!==null&&latestRecorded.wird_days!==undefined&&Number(latestRecorded.wird_days)<=2)issues.push('ورد '+Number(latestRecorded.wird_days)+' من ٧ أيام');
if(issues.length)reasons.push({student,issues});
}
}
const activeFamilies=rows('families');
const familyCards=activeFamilies.map(f=>{
const members=people.filter(student=>student.family_id===f.id);
const ids=new Set(members.map(x=>x.id));
const registered=follow.filter(x=>ids.has(x.student_id));
const attendance=registered.filter(x=>!!x.majlis);
const attended=attendance.filter(x=>['present','late'].includes(x.majlis));
const reports=rows('reports_self').filter(r=>r.week_id===w?.id&&ids.has(r.student_id));
const sentCount=new Set(reports.map(r=>r.student_id)).size;
const percent=attendance.length?Math.round(attended.length/attendance.length*100)+'٪':'—';
return '<article class="dashboard-family-card"><div class="dashboard-family-name"><span class="dashboard-family-icon">'+iconSvg('house')+'</span><div><h3>'+esc(f.name)+'</h3><p class="small muted">'+members.length+' غارسات في البرنامج</p></div></div><div class="dashboard-family-metrics"><div><strong>'+registered.length+' / '+members.length+'</strong><span>المتابعة المسجلة</span></div><div><strong>'+percent+'</strong><span>حضور المجلس</span><small>'+attendance.length+' سجل حضور</small></div><div><strong>'+sentCount+' / '+members.length+'</strong><span>التقارير المرسلة</span></div></div><p class="dashboard-family-footnote">الحضور من '+attendance.length+' سجلات معروفة · المتأخرة تُحسب حاضرة</p></article>';
}).join('');
const upcoming=rows('events').filter(e=>e.starts_at&&new Date(e.starts_at).getTime()>=Date.now()&&!Number.isNaN(new Date(e.starts_at).getTime())).sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at)).slice(0,4);
const accountPanel=leadership()?'<section class="card dashboard-queue"><div class="dashboard-panel-head"><h3>حسابات جديدة تنتظر</h3>'+btn('go:accounts','صفحة الحسابات','secondary smallbtn')+'</div>'+(waiting.length?waiting.slice(0,6).map(a=>'<div class="list-row"><span>'+esc(a.name)+'</span><span class="chip warn">بانتظار الموافقة</span></div>').join(''):empty('ما في حسابات جديدة تنتظر الموافقة'))+'</section>':'';
const alertPanel='<section class="card dashboard-alerts"><div class="dashboard-panel-head"><h3>تنبيهات المتابعة</h3><span class="chip '+(reasons.length?'warn':'ok')+'">'+reasons.length+' تنبيهات</span></div>'+
(inPreparation?empty('تبدأ تنبيهات الغياب والورد بعد بدء أسابيع المرحلة الأساسية'):reasons.length?reasons.map(({student,issues})=>
'<div class="dashboard-alert-row"><span class="dashboard-alert-icon">'+iconSvg('clipboard-check')+'</span><div><button type="button" class="dashboard-student-link" data-action="viewstudent:'+esc(student.id)+'">'+esc(student.name)+'</button><p class="muted small">'+esc(name('families',student.family_id))+'</p><p class="dashboard-alert-reasons">'+issues.map(issue=>'<span>'+esc(issue)+'</span>').join('')+'</p></div></div>').join(''):empty('لا توجد تنبيهات متابعة وفق السجلات المتاحة'))+'</section>';
const statEntries=[
['الغارسات في البرنامج',people.length,'المرشحات: '+candidates.length],
...(inPreparation?[
['مهام الأسبوع المنجزة',fraction(weeklyTasks),weeklyTasks.length?'من مهام أسبوع التحضير':'لم تُدخل مهام لهذا الأسبوع'],
['شروط الانطلاق المنجزة',fraction(launchTasks),launchTasks.length?'من شروط الانطلاق':'لم تُدخل شروط الانطلاق']
]:[
['حضور المجلس',known.length?Math.round(present.length/known.length*100)+'٪':'—','سُجّل لـ '+known.length+' من '+people.length],
['متوسط أيام الورد',avg===null?'—':avg.toFixed(1),wirdRecords.length?'من '+wirdRecords.length+' سجلات متابعة':'لا توجد بيانات ورد مسجلة']
]),
['الأسئلة التي تنتظر',pendingQuestionCount,'أسئلة لم تُجب بعد'],
...(leadership()?[['الحسابات التي تنتظر',waiting.length,'بانتظار موافقة الإدارة أو المرافقة']]:[])
];
const summary='<div class="grid stats dashboard-stats">'+statEntries.map(([label,value,note])=>'<div class="card stat"><div class="value">'+esc(value)+'</div><div class="label">'+esc(label)+'</div><p class="small muted dashboard-stat-note">'+esc(note)+'</p></div>').join('')+'</div>';
const launchPanel=inPreparation?'<section class="card dashboard-launch"><div class="dashboard-panel-head"><h3>شروط الانطلاق</h3>'+btn('go:tasks','التحضير والتشغيل','secondary smallbtn')+'</div>'+(launchTasks.length?launchTasks.map(t=>'<div class="list-row"><span>'+esc(t.body)+'</span><span class="chip '+(t.done?'ok':'warn')+'">'+(t.done?'منجز':'غير منجز')+'</span></div>').join(''):empty('أضيفي شروط الانطلاق من صفحة التحضير والتشغيل'))+'<p class="notice dashboard-launch-note">لا يُعقد لقاء التأسيس قبل اكتمال شروط الانطلاق.</p></section>':'';
const familySection='<section class="card dashboard-families"><div class="dashboard-panel-head"><div><h2>الأسر هذا الأسبوع</h2><p class="small muted">'+esc(w?.title||'الأسبوع الحالي')+' · سجلات المتابعة والتقارير الذاتية</p></div>'+btn('go:followups','المتابعة الأسبوعية','secondary smallbtn')+'</div><div class="dashboard-family-grid">'+(familyCards||empty('ما في أسر مسجلة بعد'))+'</div></section>';
const taskSection='<section class="card dashboard-week-tasks"><div class="dashboard-panel-head"><h3>مهام الأسبوع</h3>'+btn('go:tasks','التحضير والتشغيل','secondary smallbtn')+'</div>'+(weeklyTasks.length?weeklyTasks.map(t=>'<div class="dashboard-task-row"><span class="dashboard-task-status '+(t.done?'done':'')+'">'+iconSvg(t.done?'clipboard-check':'list-todo')+'</span><div><strong class="'+(t.done?'dashboard-done':'')+'">'+esc(t.body)+'</strong><p class="small muted">'+esc(t.owner||'غير محدد المسؤول')+(t.due_on?' · '+esc(date(t.due_on)):'')+'</p></div><span class="chip '+(t.done?'ok':'warn')+'">'+(t.done?'منجزة':'قيد الإنجاز')+'</span></div>').join(''):empty('لا توجد مهام مرتبطة بهذا الأسبوع؛ أضيفيها من التحضير والتشغيل'))+'</section>';
const eventSection='<section class="card dashboard-upcoming"><div class="dashboard-panel-head"><h3>المواعيد القادمة</h3>'+btn('go:weeks','البرنامج والأسابيع','secondary smallbtn')+'</div>'+eventItems(upcoming)+'</section>';
return '<div class="dashboard-overview"><div class="dashboard-heading"><div><div class="eyebrow">'+esc(date(new Date()))+' · '+esc(hijriDate(today))+'</div><h1>'+esc(setting('program_name','الغارسات'))+'</h1><p class="muted">'+esc(setting('stage_name','المرحلة الأولى'))+' · لوحة المتابعة اليومية</p></div><span class="dashboard-phase">'+(inPreparation?'مرحلة التحضير':'المرحلة الأساسية')+'</span></div>'+
'<div class="hero-card dashboard-hero"><div class="eyebrow">'+(inPreparation?'أسبوع التحضير الجاري أو القادم':'الأسبوع الجاري أو القادم')+'</div><h2>'+esc(w?.title||'البرنامج يستعد للانطلاق')+'</h2><p>'+esc(w?.reflection||'لا توجد وقفة تدبر مكتوبة لهذا الأسبوع بعد')+'</p><p class="small dashboard-week-dates">'+(w?esc(date(w.starts_on))+' — '+esc(date(w.ends_on)):'')+'</p></div>'+
summary+
(inPreparation?'<div class="dashboard-prep-info">تظهر مؤشرات التحضير حتى بداية أول أسبوع أساسي في '+esc(date(firstProgram.starts_on))+'</div>':'')+
'<div class="dashboard-primary-grid">'+accountPanel+alertPanel+'</div>'+
launchPanel+familySection+
'<div class="dashboard-secondary-grid">'+taskSection+eventSection+'</div></div>';
}
const studentProfileTabs=[['data','١. البيانات'],['weekly','٢. المتابعة الأسبوعية'],['card','٣. البطاقة والخطة'],['milestones','٤. المخرجات'],['observations','٥. الملاحظات واللقاءات']];
function studentReportDetail(){
if(!team())return heading('تقرير الغارسة','هذه الصفحة مخصصة لفريق البرنامج');
const student=rows('students').find(x=>x.id===state.dashboardStudent);
const week=rows('weeks').find(x=>x.id===state.studentReportWeek);
const report=rows('reports_self').find(r=>r.student_id===student?.id&&r.week_id===week?.id);
if(!student||!week)return heading('التقرير الأسبوعي','تعذر العثور على التقرير')+btn('backStudentProfile','العودة إلى الملف');
const answer={done:'أنجزت',partial:'أنجزت بعضه',none:'لم أنجز'};
const props=[['أيام الورد',report?.wird_days===null||report?.wird_days===undefined?'—':report.wird_days+' من ٧'],['في نفسي',answer[report?.task_self]||'—'],['ماذا فعلت في نفسي',report?.note_self],['في بيتي',answer[report?.task_home]||'—'],['ماذا فعلت في بيتي',report?.note_home],['في محيطي',answer[report?.task_community]||'—'],['ماذا فعلت في محيطي',report?.note_community],['الدرس المنقول',report?.transferred_lesson],['إلى من نقلته',report?.transferred_to],['القراءة الفكرية',report?.thought_read?'قرأتها':'لم تقرأها']];
return '<div class="student-profile">'+btn('backStudentProfile','العودة إلى ملف الغارسة','secondary smallbtn')+heading('التقرير الأسبوعي',student.name+' · '+week.title)+(report?'<section class="card"><div class="student-file-details">'+props.map(([k,v])=>'<div><span class="small muted">'+esc(k)+'</span><strong>'+esc(v||'—')+'</strong></div>').join('')+'</div><p class="small muted">آخر تحديث: '+esc(date(report.updated_at))+'</p></section>':empty('لم تُرسل الغارسة تقرير هذا الأسبوع بعد'))+'</div>';
}
function dashboardStudentFile(){
if(!team())return heading('ملف الطالبة','هذه الصفحة مخصصة لفريق البرنامج');
const student=rows('students').find(x=>x.id===state.dashboardStudent);
if(!student)return heading('ملف الطالبة','تعذر العثور على الغارسة')+btn('go:students','العودة إلى سجل الغارسات');
const currentTab=studentProfileTabs.some(([key])=>key===state.studentProfileTab)?state.studentProfileTab:'data';
const linked=rows('accounts').find(a=>a.student_id===student.id);
const taskName={munassiqa:'المنسقة',fiqhiya:'المسؤولة الفقهية',fikriya:'المسؤولة الفكرية',ijtimaiya:'المسؤولة الاجتماعية',ataa:'مسؤولة العطاء'};
const role=rows('roles_family').find(x=>x.student_id===student.id&&x.cycle===Number(setting('current_cycle',1)));
const stageLabel=studentStageNames[student.stage]||student.stage||'—';
const status=key=>({present:'حاضرة',late:'متأخرة',excused:'بعذر',absent:'غائبة'})[key]||'—';
const program=sortedWeeks().filter(w=>w.kind==='program');
const follow=rows('followups').filter(x=>x.student_id===student.id);
const reports=rows('reports_self').filter(x=>x.student_id===student.id);
const goals=rows('goals').filter(x=>x.student_id===student.id);
const evaluations=rows('cards').filter(x=>x.student_id===student.id);
const observations=leadership()?rows('observations').filter(x=>x.student_id===student.id).sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||'')):[];
const detailEntries=[
['الهاتف',student.phone],['البريد',student.email],['الجامعة',student.university],['الكلية',student.college],
['المستوى الدراسي',student.study_level],['الحي',student.neighborhood],
['الحالة الاجتماعية',({single:'عزباء',engaged:'مخطوبة',married:'متزوجة'})[student.marital_status]||student.marital_status],
['تاريخ الميلاد',birthDateOf(student.id)?reportDate(birthDateOf(student.id)):'لم يُسجّل'],['العمر',studentAge(student.id)===null?'غير معروف':studentAge(student.id)+' سنة'],['دون العشرين',studentUnder20(student)===null?'غير معروف':studentUnder20(student)?'نعم':'لا'],['ولي الأمر',student.guardian_name],['هاتف ولي الأمر',student.guardian_phone],
['قادت البرنامج السابق',student.led_before?'نعم':'لا'],['الحساب المربوط',linked?linked.email||linked.name:'غير مربوط']
];
const header='<div class="student-file-top">'+btn('go:'+(state.studentFileReturn==='students'?'students':'dashboard'),'العودة إلى '+(state.studentFileReturn==='students'?'الغارسات':'اللوحة'),'secondary smallbtn')+
'<div class="student-file-header"><div><div class="eyebrow">ملف الطالبة</div><h1>'+esc(student.name)+'</h1><div class="student-file-chips"><span class="chip">'+esc(stageLabel)+'</span><span class="chip">'+esc(name('families',student.family_id))+'</span><span class="chip">'+esc(role?taskName[role.task]||role.task:'لا توجد مهمة دوّارة لهذه الدورة')+'</span></div></div><div class="student-file-actions">'+btn('editstudent:'+student.id,'تعديل البيانات','secondary smallbtn')+(leadership()?btn('deleteStudent:'+student.id,'حذف الغارسة','student-delete-btn smallbtn'):'')+'</div></div></div>';
const tabs='<nav class="student-file-tabs" aria-label="أقسام ملف الطالبة">'+studentProfileTabs.filter(([key])=>key!=='observations'||leadership()).map(([key,label])=>'<button type="button" data-profile-tab="'+key+'" class="'+(currentTab===key?'active':'')+'" aria-current="'+(currentTab===key?'page':'false')+'">'+label+'</button>').join('')+'</nav>';
let content='';
if(currentTab==='data'){
content='<section class="card student-file-section"><h2>١. البيانات</h2><div class="student-file-details">'+detailEntries.map(([label,value])=>'<div><span class="muted small">'+esc(label)+'</span><strong>'+esc(value||'—')+'</strong></div>').join('')+'</div></section>';
}else if(currentTab==='weekly'){
const tr=program.map((week,i)=>{const f=follow.find(x=>x.week_id===week.id),r=reports.find(x=>x.week_id===week.id);
return '<tr><td data-label="الأسبوع"><strong>'+(i+1)+' · '+esc(week.title)+'</strong></td>'+
'<td data-label="المجلس">'+status(f?.majlis)+'</td><td data-label="لقاء الأسرة">'+status(f?.family_meeting)+'</td>'+
'<td data-label="الورد">'+esc(f?.wird_days??'—')+'</td><td data-label="المهمة الثلاثية">'+esc(f?.triple_task||'—')+'</td>'+
'<td data-label="الدرس المنقول">'+esc(f?.transferred_lesson||'—')+'</td><td data-label="المهمة الدوّارة">'+esc(f?.rotating_task||'—')+'</td>'+
'<td data-label="التقرير">'+(r?'<button type="button" class="btn secondary smallbtn" data-action="studentReport:'+esc(week.id)+'">عرض التقرير</button>':'<span class="muted small">لم يُرسل</span>')+'</td></tr>';
}).join('');
content='<section class="card student-file-section"><h2>٢. المتابعة الأسبوعية</h2><p class="muted small">سجل الأسابيع الثمانية من جدول المتابعة، والتقرير الذي أرسلته الغارسة لكل أسبوع.</p><div class="table-wrap student-file-weekly-table"><table><thead><tr>'+['الأسبوع','المجلس','لقاء الأسرة','الورد','المهمة الثلاثية','الدرس المنقول','المهمة الدوّارة','التقرير'].map(k=>'<th>'+k+'</th>').join('')+'</tr></thead><tbody>'+tr+'</tbody></table></div></section>';
}else if(currentTab==='card'){
const stages=[['self','ذاتي'],['first','التقييم الأول'],['second','التقييم الثاني'],['third','التقييم الثالث'],['fourth','التقييم الرابع']];
const cardRows=aspects.map(aspect=>'<tr><td><strong>'+esc(aspect)+'</strong></td>'+stages.map(([stage])=>{const val=evaluations.find(c=>c.aspect===aspect&&c.stage===stage);return '<td>'+esc(val?levels[val.level]||'—':'—')+'</td>'}).join('')+'</tr>').join('');
const mentorNotes=leadership()?observations.filter(o=>o.kind==='ملاحظة'||o.kind==='تعثر').slice(0,3):[];
content='<section class="card student-file-section"><div class="student-file-heading"><h2>٣. البطاقة والخطة</h2>'+btn('card:'+student.id,'تقييم الجوانب','goldbtn smallbtn')+'</div>'+
'<h3>البطاقة: الجوانب الستة والتقييمات</h3><div class="table-wrap"><table><thead><tr><th>الجانب</th>'+stages.map(x=>'<th>'+x[1]+'</th>').join('')+'</tr></thead><tbody>'+cardRows+'</tbody></table></div>'+
'<div class="student-file-mentor"><h3>ملاحظة المرافقة</h3>'+(leadership()?(mentorNotes.length?mentorNotes.map(o=>'<p>'+esc(o.note)+'</p>').join(''):empty('لم تُسجل ملاحظة مرافقة بعد')):'<p class="muted">ملاحظات المرافقة متاحة للإدارة والمرافقة فقط.</p>')+'</div>'+
'<div class="student-file-heading"><h3>الخطة الفردية · '+goals.length+' من ٣ أهداف</h3>'+(goals.length<3?btn('newgoal:'+student.id,'إضافة هدف','secondary smallbtn'):'')+'</div>'+
(goals.length?goals.map(g=>'<div class="student-file-goal"><label><input type="checkbox" data-profile-goal="'+esc(g.id)+'" '+(g.done?'checked':'')+'/><span>'+esc(g.aspect)+'</span></label><p><strong>'+esc(g.goal)+'</strong></p><p class="muted small">مقياس التحقق: '+esc(g.measure||'لم يُسجل')+'</p><span class="chip '+(g.done?'ok':'')+'">'+(g.done?'منجز':'لم ينجز بعد')+'</span></div>').join(''):empty('لم توضع خطة فردية بعد'))+'</section>';
}else if(currentTab==='milestones'){
const marks=rows('milestones').filter(m=>m.student_id===student.id);
content='<section class="card student-file-section"><h2>٤. المخرجات</h2><p class="muted small">علامات الإنجاز الإحدى عشرة، مع تاريخ إنجاز كل مخرج.</p><div class="student-file-milestones">'+milestoneNames.map(([code,label])=>{const mark=marks.find(x=>x.code===code),disabled=code==='guardian'&&studentUnder20(student)!==true;return '<div class="student-file-milestone"><label><input type="checkbox" data-milestone="'+esc(student.id+':'+code)+'" '+(mark?.done?'checked':'')+(disabled?' disabled':'')+'/><span>'+esc(label)+'</span></label><span class="small muted">'+(disabled?(studentUnder20(student)===null?'يحتاج تاريخ الميلاد':'غير مطلوب'):mark?.done?esc(date(mark.done_at)):'لم ينجز')+'</span></div>'}).join('')+'</div></section>';
}else if(currentTab==='observations'&&leadership()){
content='<section class="card student-file-section"><div class="student-file-heading"><div><h2>٥. الملاحظات واللقاءات</h2><p class="small muted">هذا القسم للإدارة والمرافقة فقط. الملاحظات السرية لا تظهر إلا للمرافقة.</p></div>'+btn('newobservation:'+student.id,'إضافة ملاحظة أو لقاء','goldbtn smallbtn')+'</div>'+
(observations.length?observations.map(o=>'<article class="student-file-observation"><div class="student-file-observation-head"><div><strong>'+esc(o.kind)+'</strong>'+(o.secret?'<span class="chip warn">سري</span>':'')+'</div><span class="small muted">'+esc(date(o.created_at))+'</span></div><p class="muted small">'+esc(weekName(o.week_id))+'</p><p class="text-content">'+esc(o.note)+'</p></article>').join(''):empty('لم تُسجل ملاحظات أو لقاءات لهذه الغارسة بعد'))+'</section>';
}
return '<div class="student-profile">'+header+tabs+content+'</div>';
}
function weeks(){
const all=visibleWeeks(),upcoming=rows('events').filter(e=>eventVisible(e)&&(!e.starts_at||new Date(e.starts_at).getTime()>=Date.now())).sort((a,b)=>!a.starts_at?1:!b.starts_at?-1:new Date(a.starts_at)-new Date(b.starts_at)).slice(0,4);
const blocks=[['prep','التحضير','تهيئة الفريق والأسر قبل الانطلاق'],['program','المرحلة','الأسابيع الثمانية للغرس والتعلّم'],['break','ما بعدها','الفاصل وما بعد ختام المرحلة']];
const groups=blocks.filter(([kind])=>team()||kind!=='prep').map(([kind,title,desc])=>{
const weeksIn=all.filter(w=>w.kind===kind);
return weeksIn.length?'<section class="program-group"><div class="program-group-title"><div><h2>'+title+'</h2><p class="muted small">'+desc+'</p></div><span class="chip">'+weeksIn.length+' أسابيع</span></div><div class="week-grid">'+weeksIn.map(weekCard).join('')+'</div></section>':'';
}).join('');
return heading('البرنامج والأسابيع','خريطة المرحلة كاملة من التحضير إلى الختام، والمواعيد والإيقاع الثابت')+
'<div class="program-layout"><div class="program-timeline">'+groups+'</div><aside class="program-aside"><div class="card"><div class="program-aside-title"><h3>المواعيد القادمة</h3>'+(team()?btn('newevent','+ موعد جديد','goldbtn smallbtn'):'')+'</div>'+eventItems(upcoming)+'</div><div class="card"><h3>تفاصيل الأسبوع</h3><p class="muted small">الإيقاع الثابت الذي يتكرر في أسابيع المرحلة</p><ol class="rhythm-list">'+fixedRhythm.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol></div></aside></div>';
}
function weekDetails(){
const list=visibleWeeks(),w=list.find(x=>x.id===state.week)||list.find(weekCurrent)||list[0];
if(!w)return heading('صفحة الأسبوع','لا توجد أسابيع متاحة بعد')+empty('أضيفي أسابيع البرنامج أولًا');
state.week=w.id;
const index=list.findIndex(x=>x.id===w.id),prev=list[index-1],next=list[index+1];
const section=(title,value)=>'<div class="week-content-block"><h3>'+esc(title)+'</h3><p class="text-content">'+esc(value||'لم يُدوّن بعد')+'</p></div>';
const triple=[['في نفسي',w.task_self],['في بيتي',w.task_home],['في محيطي',w.task_community]];
const meetingQuestions=['ماذا فهمت؟','ماذا يعني لي؟','ماذا سأعمل؟'];
const meetings=rows('events').filter(e=>e.week_id===w.id&&eventVisible(e)).sort((a,b)=>(a.starts_at||'9999').localeCompare(b.starts_at||'9999'));
return '<div class="week-details"><div class="week-details-toolbar">'+btn('backweeks','العودة إلى الخريطة','secondary smallbtn')+'<span class="chip '+(weekCurrent(w)?'ok':'')+'">'+esc(w.kind==='prep'?'التحضير':w.kind==='break'?'ما بعدها':'الأسبوع '+w.code.replace('w',''))+(weekCurrent(w)?' · الجاري':'')+'</span></div>'+
'<div class="hero-card week-details-hero"><div class="eyebrow">صفحة الأسبوع</div><h1>'+esc(w.title)+'</h1><p>الميلادي: '+esc(date(w.starts_on))+' — '+esc(date(w.ends_on))+'</p><p>الهجري: '+esc(hijriDate(w.starts_on))+' — '+esc(hijriDate(w.ends_on))+'</p></div>'+
'<section class="card week-detail-section"><h2>وقفة التدبر</h2><p class="text-content">'+esc(w.reflection||'لم تُدوّن الوقفة بعد')+'</p></section>'+
'<section class="card week-detail-section"><h2>منهج الأسبوع</h2><div class="week-content-grid">'+[['الدرس العلمي',w.lesson],['الأربعون',w.hadith],['جزء عمّ',w.tilawa],['رياض الصالحين',w.riyad]].map(x=>section(...x)).join('')+'</div></section>'+
'<section class="card week-detail-section"><h2>المهمة الثلاثية</h2><div class="week-content-grid triple-grid">'+triple.map(x=>section(...x)).join('')+'</div></section>'+
'<section class="card week-detail-section"><h2>مدارسة الأسرة</h2><p class="muted small">الأسئلة الثلاثة الثابتة</p><div class="fixed-questions">'+meetingQuestions.map((q,i)=>'<div><span>'+(i+1)+'</span> '+esc(q)+'</div>').join('')+'</div><h3>أسئلة الأسبوع</h3><p class="text-content">'+esc(w.discussion||'لم تُضف أسئلة هذا الأسبوع بعد')+'</p></section>'+
'<section class="card week-detail-section"><h2>نشاط الأسبوع</h2><p class="text-content">'+esc(w.activity||'لم يُسجَّل نشاط بعد')+'</p></section>'+
(team()?'<section class="card week-detail-section team-only"><div class="eyebrow">خاص بالفريق</div><h2>ما يجري سوى الإيقاع الثابت</h2><p class="text-content">'+esc(w.team_work||'لم يُدوّن بعد')+'</p><div class="separator"></div><h2>ما يكون في اليد في آخره</h2><p class="text-content">'+esc(w.deliverable||'لم يُدوّن بعد')+'</p><div class="separator"></div><h2>مهام الفريق في هذا الأسبوع</h2>'+(()=>{const tasks=rows('tasks').filter(t=>t.week_id===w.id);return tasks.length?tasks.map(t=>'<div class="list-row"><span>'+esc(t.title||t.body||t.text||'مهمة')+'</span><span class="chip">'+(t.done?'منجزة':'قيد التنفيذ')+'</span></div>').join(''):empty('لا توجد مهام فريق مرتبطة بهذا الأسبوع')})()+'</section>':'')+
'<section class="card week-detail-section"><div class="program-aside-title"><h2>مواعيد الأسبوع</h2>'+(team()?btn('newevent','+ موعد جديد','goldbtn smallbtn'):'')+'</div>'+eventItems(meetings)+'</section>'+
'<div class="week-detail-actions">'+(team()?btn('editweek','تعديل الأسبوع','goldbtn')+' '+btn('go:followups','متابعة الأسبوع','secondary'):btn('reportthisweek','سجّلي تقريركِ لهذا الأسبوع','goldbtn'))+'</div>'+
'<div class="week-detail-nav">'+(prev?'<button data-week="'+esc(prev.id)+'" class="btn secondary">→ السابق: '+esc(prev.title)+'</button>':'<span></span>')+(next?'<button data-week="'+esc(next.id)+'" class="btn secondary">التالي: '+esc(next.title)+' ←</button>':'<span></span>')+'</div></div>';
}
const studentStageNames={candidate:'مرشحة',accepted:'مقبولة',selected_not:'لم تُختر',active:'في البرنامج',paused:'متوقفة مؤقتًا',withdrawn:'خرجت'};
const studentStageGroups={batch:['accepted','active','paused'],candidates:['candidate'],inactive:['selected_not','withdrawn']};
const normalizeStudentSearch=value=>String(value??'').toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[٠-٩]/g,ch=>String(ch.charCodeAt(0)-1632)).replace(/[^\p{L}\p{N}]+/gu,' ').trim();
function studentMatchesTab(student,tab){
return tab==='all'||(studentStageGroups[tab]||[]).includes(student.stage);
}
function updateStudentsView(){
const container=document.querySelector('.students-register');
if(!container)return;
const text=normalizeStudentSearch(state.studentsSearch||''),tokens=text?text.split(/\s+/).filter(Boolean):[];
let visible=0;
container.querySelectorAll('[data-student-id]').forEach(element=>{
const stage=element.dataset.stage, family=element.dataset.family;
const match=studentMatchesTab({stage},state.studentsTab||'all')&&(!state.studentsFamily||family===state.studentsFamily)&&tokens.every(t=>(element.dataset.search||'').includes(t));
element.hidden=!match;
if(match)visible++;
});
const count=container.querySelector('[data-students-result-count]');
if(count)count.textContent=visible+' من '+rows('students').length+' سجل';
const noResults=container.querySelector('.students-empty-results');
if(noResults)noResults.hidden=visible!==0;
container.querySelectorAll('[data-students-tab]').forEach(el=>{
const active=el.dataset.studentsTab===(state.studentsTab||'all');
el.classList.toggle('active',active);
el.setAttribute('aria-pressed',String(active));
});
}
function students(){
const all=rows('students');
const linkedAccounts=leadership()?rows('accounts'):[];
const stageLabel=stage=>studentStageNames[stage]||stage||'غير محدد';
const accountFor=id=>linkedAccounts.find(a=>a.student_id===id);
const tabs=[
['all','الكل'],
['batch','الدفعة'],
['candidates','المرشحات'],
['inactive','لم تُختر أو خرجت']
];
const familyChoices=[['','كل الأسر'],...rows('families').map(f=>[f.id,f.name])];
const badge= (text,cls='')=>'<span class="chip '+cls+'">'+esc(text)+'</span>';
const rowsHtml=all.map(student=>{
const account=accountFor(student.id),linked=!!account;
const fam=name('families',student.family_id);
const info=normalizeStudentSearch([student.name,student.phone,student.email,student.university,student.college,student.study_level,student.neighborhood,fam,stageLabel(student.stage),studentStageGroups.batch.includes(student.stage)?'الدفعة':'',student.stage==='candidate'?'مرشحات':'',studentUnder20(student)===true?'دون العشرين اقل من عشرين':'',student.led_before?'قادت السابق':'',account?.email||'',linked?'مربوط مرتبط':'غير مربوط'].join(' '));
const attributes=' data-student-id="'+esc(student.id)+'" data-stage="'+esc(student.stage)+'" data-family="'+esc(student.family_id||'')+'" data-search="'+esc(info)+'"';
return '<tr'+attributes+'>'+
'<td data-label="الاسم"><div class="students-name"><button type="button" class="students-name-link" data-action="viewstudent:'+esc(student.id)+'">'+esc(student.name)+'</button><div class="students-person-flags">'+(studentUnder20(student)===true?badge('دون العشرين','students-soft-tag'):'')+(student.led_before?badge('قادت السابق','students-soft-tag'):'')+'</div></div></td>'+
'<td data-label="الأسرة">'+esc(fam)+'</td>'+
'<td data-label="الجامعة">'+esc(student.university||'—')+'</td>'+
'<td data-label="الهاتف"><span dir="ltr" class="students-phone">'+esc(student.phone||'—')+'</span></td>'+
'<td data-label="الحال">'+badge(stageLabel(student.stage),student.stage==='active'?'ok':student.stage==='candidate'?'warn':'')+'</td>'+
'<td data-label="الحساب">'+(leadership()?linked?'<div class="students-linked">'+iconSvg('shield-check')+'<span>مربوط</span></div><span class="small muted students-account-email">'+esc(account.email||'')+'</span>':'<span class="students-unlinked">غير مربوط</span>':'<span class="muted small">يظهر للقيادة فقط</span>')+'</td>'+
'<td data-label="الإجراءات"><div class="students-row-actions"><button type="button" class="btn secondary smallbtn" data-action="viewstudent:'+esc(student.id)+'">الملف</button>'+btn('editstudent:'+student.id,'تعديل','secondary smallbtn')+(leadership()&&!linked?btn('studentaccounts:'+student.id,'ربط حساب','secondary smallbtn'):'')+'</div></td>'+
'</tr>';
}).join('');
return '<div class="students-register">'+heading('الغارسات','سجل الدفعة والمرشحات، ومن لم تُختر أو خرجت، مع بيانات كل غارسة وحالة ربط حسابها',btn('newstudent','إضافة غارسة','goldbtn')+' '+btn('bulkstudents','إضافة قائمة','secondary'))+
'<div class="students-tab-list" role="group" aria-label="تصنيف الغارسات">'+tabs.map(([key,title])=>'<button type="button" data-students-tab="'+key+'" class="students-tab'+((state.studentsTab||'all')===key?' active':'')+'" aria-pressed="'+String((state.studentsTab||'all')===key)+'"><span>'+esc(title)+'</span><span class="students-tab-count">'+all.filter(x=>studentMatchesTab(x,key)).length+'</span></button>').join('')+'</div>'+
'<div class="students-filterbar"><label class="students-search-box"><span class="students-search-icon">'+iconSvg('grid')+'</span><input type="search" id="studentsSearch" autocomplete="off" placeholder="ابحثي بالاسم أو الهاتف أو الجامعة أو الأسرة أو الحال..." value="'+esc(state.studentsSearch||'')+'" aria-label="البحث في سجلات الغارسات"/></label><label class="students-family-choice"><span>الأسرة</span><select id="studentsFamilyFilter" data-select="studentsFamily">'+familyChoices.map(x=>option(x[0],x[1],state.studentsFamily||'')).join('')+'</select></label><button type="button" class="students-clear" data-action="clearstudents">مسح الفلاتر</button></div>'+
'<div class="students-filter-summary"><span data-students-result-count aria-live="polite">'+all.length+' من '+all.length+' سجل</span><span class="muted small">يمكن البحث بأكثر من كلمة وبأي ترتيب</span></div>'+
'<div class="card table-wrap students-table-wrap"><table class="students-table"><thead><tr>'+['الاسم','الأسرة','الجامعة','الهاتف','الحال','ربط الحساب','الإجراء'].map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+rowsHtml+'</tbody></table><div class="students-empty-results" hidden>'+empty('لا توجد غارسات تطابق البحث أو الفلاتر الحالية')+'</div></div></div>';
}
function families(){
const familyId=team()?state.family:ownFamilyId(),fam=rows('families').find(f=>f.id===familyId),members=rows('students').filter(s=>s.family_id===fam?.id),isTeam=team();
return heading(isTeam?'الأسر':'أسرتي','الأخوات، والمهام الدوارة، ولقاءات الأسرة',isTeam?btn('newfamily','إضافة أسرة','goldbtn')+' '+btn('assignrole','توزيع المهام')+' '+btn('assignleader','مديرات اللقاء'):'')+'<div class="toolbar">'+(isTeam?selectFamilies():'')+'</div>'+(fam?'<div class="grid two"><div class="card"><h3>'+esc(fam.name)+'</h3><p class="muted">موعد اللقاء: '+esc(fam.meeting_day||'لم يحدد')+' '+esc(fam.meeting_time||'')+'</p>'+(fam.meeting_url?'<p><a target="_blank" rel="noopener noreferrer" href="'+esc(safeUrl(fam.meeting_url))+'">رابط اللقاء</a></p>':'')+'<div class="separator"></div>'+members.map(s=>'<div class="list-row"><div><strong>'+esc(s.name)+'</strong><p class="muted">'+esc(rows('roles_family').find(r=>r.student_id===s.id&&r.cycle===Number(setting('current_cycle',1)))?.task||'لم توزع المهمة')+'</p></div>'+(s.phone?'<a class="btn secondary smallbtn" href="https://wa.me/'+encodeURIComponent(s.phone.replace(/[^0-9]/g,''))+'" target="_blank" rel="noopener">واتساب</a>':'')+'</div>').join('')+'</div><div class="card"><h3>وثائق الأسرة</h3>'+[['wird','قدر الورد'],['page_need','صفحة الحاجة'],['initiative','المبادرة'],['charter','الميثاق']].map(([key,t])=>'<div class="list-row"><span>'+t+'</span>'+btn('doc:'+key,rows('docs_family').some(d=>d.kind===key&&d.family_id===fam.id)?'عرض وتعديل':'كتابة','secondary smallbtn')+'</div>').join('')+'<div class="separator"></div><h3>محاضر اللقاءات</h3>'+rows('minutes').filter(m=>m.family_id===fam.id).map(m=>'<div class="list-row">'+date(m.meeting_date)+' | '+esc(m.summary?.slice(0,45))+'</div>').join('')+btn('newminute','إضافة محضر','goldbtn')+'</div></div>':empty('أضيفي أسرة أولًا'));
}
const followAttendanceOptions=[['','لم يُسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']];
const followTaskOptions=[['','لم يُسجل'],['done','أنجزت'],['partial','أنجزت بعضها'],['none','لم تنجز']];
function followupDirty(){return document.querySelector('#followupForm')?.dataset.dirty==='true'}
async function confirmFollowupLeave(){return !followupDirty()||await appConfirm({title:'تغييرات غير محفوظة',message:'هناك تعديلات في المتابعة الأسبوعية لم تُحفظ. هل تريدين مغادرة الصفحة دون حفظها؟',confirmText:'مغادرة دون حفظ',danger:true})}
function markFollowupDirty(){const form=document.querySelector('#followupForm');if(!form)return;form.dataset.dirty='true';const note=form.querySelector('[data-followup-save-state]');if(note){note.textContent='هناك تغييرات لم تُحفظ بعد';note.classList.add('pending')}}
function followups(){
const weeks=sortedWeeks().filter(w=>w.kind==='program').slice(0,8);
const selected=weeks.find(w=>w.id===state.week)||weeks.find(weekCurrent)||weeks[0];
if(selected)state.week=selected.id;
const canEdit=team()||coordinator();
const familyId=team()?state.family:ownFamilyId();
const families=rows('families');
const family=families.find(f=>f.id===familyId);
const members=rows('students').filter(s=>s.family_id===familyId&&s.stage==='active').sort((a,b)=>a.name.localeCompare(b.name,'ar'));
const existing=rows('followups'),studentReports=rows('reports_self');
const attSelect=(studentId,field,value)=>'<select data-followup-field="'+field+'" aria-label="'+(field==='majlis'?'حضور المجلس':'حضور لقاء الأسرة')+' · '+esc(studentId)+'">'+followAttendanceOptions.map(([valueKey,label])=>option(valueKey,label,value||'')).join('')+'</select>';
const taskSelect=(field,value)=>'<select data-followup-field="'+field+'" aria-label="'+esc(({triple_task:'المهمة الثلاثية',transferred_lesson:'الدرس المنقول',rotating_task:'المهمة الدوّارة'})[field])+'">'+followTaskOptions.map(([key,label])=>option(key,label,value||'')).join('')+'</select>';
const weekNav='<div class="followup-week-nav" role="group" aria-label="اختيار أسبوع المتابعة">'+weeks.map((w,i)=>'<button type="button" data-follow-week="'+esc(w.id)+'" class="followup-week-pill'+(w.id===selected?.id?' active':'')+'" aria-pressed="'+(w.id===selected?.id?'true':'false')+'">الأسبوع '+(i+1)+'</button>').join('')+'</div>';
const familyChoice=team()?'<label class="followup-family-selector"><span>الأسرة</span><select data-select="family" aria-label="اختيار الأسرة"><option value="">اختاري الأسرة</option>'+families.map(f=>option(f.id,f.name,familyId)).join('')+'</select></label>':'<div class="followup-current-family" aria-label="الأسرة المسندة لكِ"><span class="muted small">أسرتكِ فقط</span><strong>'+esc(family?.name||'لم تُحدّد أسرتكِ بعد')+'</strong></div>';
if(!canEdit)return heading('المتابعة الأسبوعية','متابعة الحضور والورد والمهام للأسابيع الثمانية')+
'<div class="card followup-access"><h3>المتابعة مخصصة للفريق ومنسقة الأسرة</h3><p class="muted">إذا كنتِ منسقة الأسرة لهذه الدورة، فتأكدي من ربط حسابك بسجلك وتعيينك في المهمة الدوّارة.</p></div>';
const activeCount=members.length,recordCount=members.filter(m=>existing.some(f=>f.student_id===m.id&&f.week_id===selected?.id&&f.majlis)).length;
let lines=members.map(student=>{
const previous=existing.find(f=>f.student_id===student.id&&f.week_id===selected?.id)||{};
const self=studentReports.find(r=>r.student_id===student.id&&r.week_id===selected?.id);
const triple=self?['task_self','task_home','task_community'].filter(key=>self[key]==='done').length:null;
const tripleLabel=self?('المهام الثلاثية: '+triple+' من ٣ منجزة'):'';
const summary=self?'<div class="followup-student-report"><span class="followup-report-dot" aria-hidden="true"></span><span>تقرير الغارسة: الورد '+esc(self.wird_days??'—')+' / ٧ · '+tripleLabel+'</span></div>':'<div class="followup-no-report">لم يصل التقرير الذاتي لهذا الأسبوع</div>';
return '<tr data-followup-student="'+esc(student.id)+'"><th scope="row" class="followup-name-cell"><strong>'+esc(student.name)+'</strong>'+summary+'</th>'+
'<td data-label="المجلس">'+attSelect(student.id,'majlis',previous.majlis)+'</td>'+
'<td data-label="لقاء الأسرة">'+attSelect(student.id,'family_meeting',previous.family_meeting)+'</td>'+
'<td data-label="الورد"><input data-followup-field="wird_days" type="number" inputmode="numeric" min="0" max="7" step="1" value="'+esc(previous.wird_days??'')+'" placeholder="—" aria-label="عدد أيام الورد" /></td>'+
'<td data-label="المهمة الثلاثية">'+taskSelect('triple_task',previous.triple_task)+'</td>'+
'<td data-label="الدرس المنقول">'+taskSelect('transferred_lesson',previous.transferred_lesson)+'</td>'+
'<td data-label="المهمة الدوّارة">'+taskSelect('rotating_task',previous.rotating_task)+'</td>'+
'<td class="followup-note-cell" data-label="ملاحظة"><input data-followup-field="note" type="text" maxlength="220" value="'+esc(previous.note||'')+'" placeholder="ملاحظة قصيرة" aria-label="ملاحظة عن '+esc(student.name)+'" /></td></tr>';
}).join('');
const tableMarkup=members.length?'<div class="followup-table-scroll" role="region" aria-label="جدول المتابعة قابل للتمرير أفقيًا" tabindex="0"><table class="followup-edit-table"><thead><tr><th scope="col">الغارسة والتقرير الذاتي</th><th scope="col">المجلس</th><th scope="col">لقاء الأسرة</th><th scope="col">الورد</th><th scope="col">المهمة الثلاثية</th><th scope="col">الدرس المنقول</th><th scope="col">المهمة الدوّارة</th><th scope="col">ملاحظة</th></tr></thead><tbody>'+lines+'</tbody></table></div>':empty(family?'لا توجد غارسات بحالة «في البرنامج» في هذه الأسرة':'اختاري الأسرة لعرض الغارسات');
return heading('المتابعة الأسبوعية','متابعة الغارسات من الأسرة والأسبوع، مع حفظ جميع الصفوف دفعة واحدة')+
'<section class="followup-dashboard"><div class="followup-settings"><div class="followup-week-group"><span class="followup-section-label">اختيار الأسبوع</span>'+weekNav+'</div>'+familyChoice+'</div>'+
'<div class="followup-overview"><div><span>الأسبوع المختار</span><strong>'+esc(selected?.title||'لا توجد أسابيع للبرنامج')+'</strong></div><div><span>غارسات الأسرة</span><strong>'+activeCount+'</strong></div><div><span>تم تسجيل حضورهن</span><strong>'+recordCount+' / '+activeCount+'</strong></div></div>'+
'<form id="followupForm" data-dirty="false" data-week-id="'+esc(selected?.id||'')+'" data-family-id="'+esc(familyId||'')+'">'+
'<div class="followup-panel"><div class="followup-panel-header"><div><h2>جدول متابعة الأسرة</h2><p class="muted small">كل غارسة في صف واحد. مرري الجدول أفقيًا عند الحاجة، ويبقى اسم الغارسة ظاهرًا.</p></div><button class="btn secondary smallbtn followup-attend-all" type="button" data-follow-all '+(!members.length?'disabled':'')+'>الكل حاضرات</button></div>'+
tableMarkup+
'<div class="followup-panel-footer"><p class="followup-save-state" data-followup-save-state role="status">التغييرات تُحفظ عند الضغط على «حفظ الجدول»</p><div class="followup-panel-actions"><button type="button" class="btn secondary" data-followup-reset '+(!members.length?'disabled':'')+'>تراجع عن التعديلات</button><button class="btn" type="submit" '+(!members.length||!selected?'disabled':'')+'>حفظ الجدول</button></div></div></div></form></section>';
}
async function saveFollowupTable(form){
if(!(team()||coordinator()))throw Error('حفظ المتابعة للفريق ومنسقة الأسرة فقط');
const weekId=form.dataset.weekId,familyId=form.dataset.familyId;
if(!weekId||!sortedWeeks().some(w=>w.id===weekId&&w.kind==='program'))throw Error('اختاري أسبوعًا صحيحًا');
const ownFamily=ownFamilyId();
if(!team()&&(!ownFamily||familyId!==ownFamily))throw Error('يمكنكِ متابعة أسرتك فقط');
const allowed=rows('students').filter(s=>s.family_id===familyId&&s.stage==='active');
const validIds=new Set(allowed.map(x=>x.id));
const entries=[];
for(const row of form.querySelectorAll('[data-followup-student]')){
const studentId=row.dataset.followupStudent;
if(!validIds.has(studentId))throw Error('تغيرت عضوية الأسرة، حدّثي الصفحة وحاولي مجددًا');
const value=key=>row.querySelector('[data-followup-field="'+key+'"]')?.value??'';
const rawWird=value('wird_days').trim();
const wird=rawWird===''?null:Number(rawWird);
if(wird!==null&&(!Number.isInteger(wird)||wird<0||wird>7))throw Error('الورد يجب أن يكون عدد أيام صحيحًا من ٠ إلى ٧ للغارسة '+allowed.find(s=>s.id===studentId)?.name);
const fields={};
for(const key of ['majlis','family_meeting']){
const status=value(key);if(!followAttendanceOptions.some(([k])=>k===status))throw Error('اختاري قيمة صحيحة للحضور');
fields[key]=status||null;
}
for(const key of ['triple_task','transferred_lesson','rotating_task']){
const completion=value(key);if(!followTaskOptions.some(([k])=>k===completion))throw Error('اختاري قيمة صحيحة للمهام');
fields[key]=completion||null;
}
entries.push({student_id:studentId,week_id:weekId,wird_days:wird,...fields,note:value('note').trim().slice(0,220)||null,recorded_by:state.user.id});
}
if(!entries.length)throw Error('لا توجد غارسات لحفظ متابعتهن');
const{error}=await db.from('followups').upsert(entries,{onConflict:'student_id,week_id'});
if(error)throw error;
await read('followups');
render();
flash('حُفظ جدول المتابعة بالكامل بنجاح ('+entries.length+' غارسات)');
}
const aspects=['الفقهي الشرعي','التربوي التزكوي','الفكري','التنظيمي','الاجتماعي','البيت المسلم وصناعة الجيل'];
const levels=['لم تبدأ','في الطريق','متحققة','متميزة'];
const cardStages=[['self','التقييم الذاتي'],['first','التقييم الأول'],['second','التقييم الثاني'],['third','التقييم الثالث'],['fourth','التقييم الرابع']];
function syncAssessmentStages(){
 const stages=rows('assessment_stages').slice().sort((a,b)=>a.sort_order-b.sort_order);
 if(stages.length)cardStages.splice(0,cardStages.length,...stages.map(item=>[item.code,item.label]));
}
async function refreshAssessmentStages(){await read('assessment_stages');syncAssessmentStages()}
// Guide appendix 2: the four levels and their evidence sources.
const cardRubric=[
{aspect:'الفقهي الشرعي',descriptions:['لا تضبط فرائض الوضوء والصلاة، ولم تبدأ الحفظ','تصح طهارتها دون صلاتها أو العكس، أو حفظت دون عشرة أحاديث، أو في تلاوتها أخطاء جلية','تصح طهارتها وصلاتها على المذهب المالكي، وتحفظ عشرة أحاديث من الأربعين، وتتلو جزء عمّ تلاوة صحيحة','ذلك كله، وتعلم غيرها صفة الوضوء والصلاة تعليمًا صحيحًا'],source:'التسميع، وفحص معلمة التلاوة، والتطبيق العملي في اللقاءين الحضوريين'},
{aspect:'التربوي التزكوي',descriptions:['لا ورد ثابت ولا محاسبة','ورد متقطع، أو محاسبة غير منتظمة','ورد يومي ثابت أربعة أسابيع متتالية، ومحاسبة أسبوعية مكتوبة','ذلك، وتعين أخواتها على وردهن، وتحسن إلقاء المجلس الإيماني'],source:'جدول المتابعة للورد؛ والمحاسبة بإفادتها دون اطلاع على دفترها'},
{aspect:'الفكري',descriptions:['لم تقرأ المقرر','قرأت وناقشت، ولم تكتب صفحتها','تشرح دور المرأة المسلمة كما يقدمه الإسلام في صفحة واحدة','ذلك، وتشرحه لزميلة شرحًا واضحًا'],source:'الصفحة المكتوبة؛ ويقاس أنها كتبت وشرحت، لا رأيها'},
{aspect:'التنظيمي',descriptions:['لم تحمل مهمتها','حملتها بنقص أو تأخر','تؤدي مهمتها الدوارة، وتكتب محضر لقاء','ذلك، وأدارت لقاء أسرتها في دورها بقاعدة الثلث'],source:'المحاضر، وملاحظة المرافقة'},
{aspect:'الاجتماعي',descriptions:['غياب متكرر بلا صلة بأخواتها','تحضر ولا تعرف أحوال أخواتها، أو غابت عن لقاء حضوري','تعرف أخواتها في الأسرة وأحوالهن، وتلتزم باللقاء الحضوري','ذلك، وتبادر بالسؤال والتزاور'],source:'الحضور، وملاحظة المرافقة'},
{aspect:'البيت المسلم وصناعة الجيل',descriptions:['لم تكتب صفحة البيت، ولم تختر عادة بر','كتبت الصفحة أو اختارت العادة ولم تثبت','تصف البيت المسلم الذي تريد بناءه، وتلتزم عادة بر ثابتة','ذلك، وتنقل ما تتعلمه إلى أهل بيتها كل أسبوع'],source:'إفادتها عن فعلها وحده، بلا أخبار عن أهلها'}
];
function cards(){
if(!team())return cardsPersonal();
const allStudents=rows('students').filter(s=>s.stage==='active');
const stage=cardStages.some(([key])=>key===state.cardStage)?state.cardStage:'first';
const scoreRows=rows('cards').filter(c=>c.stage===stage);
const getScore=(studentId,aspect)=>scoreRows.find(c=>c.student_id===studentId&&c.aspect===aspect);
const levelCell=(score,studentId)=>score&&Number.isInteger(Number(score.level))&&Number(score.level)>=0&&Number(score.level)<=3?
'<button type="button" class="batch-level level-'+Number(score.level)+'" data-action="'+(stage==='self'?'reviewcard:':'card:')+esc(studentId)+'" title="عرض تقييم الغارسة">'+esc(levels[Number(score.level)])+'</button>':
'<button type="button" class="batch-level unrated" data-action="'+(stage==='self'?'reviewcard:':'card:')+esc(studentId)+'">لم يُقيّم</button>';
const selectedStage=cardStages.find(([key])=>key===stage)?.[1]||'التقييم الأول';
const stagePicker='<section class="batch-stage card"><div><label for="card-stage-select">اختيار التقييم</label><p class="small muted">اختاري المرحلة التي تريدين عرض نتائجها في الدفعة.</p></div><select id="card-stage-select" data-select="cardStage">'+cardStages.map(([key,label])=>option(key,label,stage)).join('')+'</select></section>';
const totals='<section class="batch-section"><div class="batch-section-heading"><div><h2>الجوانب في الدفعة</h2><p class="muted small">عدد من بلغن «متحققة» أو «متميزة» في '+esc(selectedStage)+' من إجمالي '+allStudents.length+' غارسة في البرنامج.</p></div><span class="chip">٦ جوانب</span></div><div class="batch-summary-grid">'+aspects.map(aspect=>{
const achieved=allStudents.filter(student=>{const score=getScore(student.id,aspect);return score&&Number(score.level)>=2}).length;
const assessed=allStudents.filter(student=>!!getScore(student.id,aspect)).length;
const percent=allStudents.length?Math.round(achieved/allStudents.length*100):0;
return '<article class="batch-summary-card"><div class="batch-summary-title">'+esc(aspect)+'</div><div class="batch-summary-metric"><strong>'+achieved+'</strong><span>من '+allStudents.length+'</span></div><div class="batch-summary-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+percent+'" aria-label="'+esc(aspect)+'"><span style="width:'+percent+'%"></span></div><div class="batch-summary-meta"><span>'+percent+'٪ حققن المطلوب</span><span>'+assessed+' تم تقييمهن</span></div></article>';
}).join('')+'</div></section>';
const familyOptions=rows('families');
const grouped=new Map();
for(const student of allStudents){
const family=familyOptions.find(f=>f.id===student.family_id);
const key=family?.id||'unassigned',title=family?.name||'غير موزعات على أسرة';
if(!grouped.has(key))grouped.set(key,{title,members:[]});
grouped.get(key).members.push(student);
}
const families=[...grouped.values()].sort((a,b)=>a.title.localeCompare(b.title,'ar'));
const columnHeads='<th scope="col">الغارسة</th>'+aspects.map(a=>'<th scope="col">'+esc(a)+'</th>').join('');
const familyRows=families.map(group=>'<section class="batch-family"><div class="batch-family-heading"><h3>'+esc(group.title)+'</h3><span class="chip">'+group.members.length+' غارسات</span></div><div class="batch-table-scroll"><table class="batch-table"><thead><tr>'+columnHeads+'</tr></thead><tbody>'+group.members.sort((a,b)=>a.name.localeCompare(b.name,'ar')).map(student=>'<tr><th scope="row"><button type="button" class="batch-student-name" data-action="'+(stage==='self'?'reviewcard:':'card:')+esc(student.id)+'">'+esc(student.name)+'</button></th>'+aspects.map(aspect=>'<td data-label="'+esc(aspect)+'">'+levelCell(getScore(student.id,aspect),student.id)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></section>').join('');
const tableSection='<section class="batch-section"><div class="batch-section-heading"><div><h2>تقييم الغارسات بحسب الأسر</h2><p class="muted small">اضغطي اسم الغارسة أو مستواها لفتح تقييمها وملاحظات الجوانب الستة. التقييم الذاتي للعرض فقط.</p></div><div class="batch-color-legend"><span class="batch-legend-value level-0">لم تبدأ</span><span class="batch-legend-value level-1">في الطريق</span><span class="batch-legend-value level-2">متحققة</span><span class="batch-legend-value level-3">متميزة</span><span class="batch-legend-value unrated">لم يُقيّم</span></div></div>'+(familyRows||empty('لا توجد غارسات بحالة «في البرنامج» لعرض التقييم'))+'</section>';
const rubric='<details class="card batch-rubric"><summary><span>أوصاف المستويات ومصدر الحكم</span><span class="small muted">اضغطي للاطلاع على المعايير المعتمدة</span></summary><div class="batch-rubric-body"><p class="muted small">المستويات أربعة: ٠ لم تبدأ، ١ في الطريق، ٢ متحققة، ٣ متميزة. «متحققة» هي المستوى المطلوب في ختام المرحلة الأولى.</p>'+cardRubric.map(item=>'<section class="batch-rubric-item"><h3>'+esc(item.aspect)+'</h3><div class="batch-rubric-grid">'+item.descriptions.map((description,i)=>'<div><span class="batch-legend-value level-'+i+'">'+i+' · '+esc(levels[i])+'</span><p>'+esc(description)+'</p></div>').join('')+'</div><div class="batch-rubric-source"><strong>مصدر الحكم:</strong> '+esc(item.source)+'</div></section>').join('')+'<p class="muted small">مراحل التقييم حسب الدليل: الذاتي في الأسبوع الثاني تكتبه الغارسة، والأول في الأسبوع الثامن تكتبه المرافقة، وما يضاف للمراحل التالية تكتبه المرافقة ومن تسمى.</p></div></details>';
return '<div class="batch-cards-page">'+heading('بطاقة الغارسة','تقييم جوانب الغارسات الستة، ومؤشرات الدفعة، والمستويات وفق الدليل')+stagePicker+totals+tableSection+rubric+'</div>';
}
function cardsPersonal(){
const mine=!team(),students=mine?[state.profile].filter(Boolean):rows('students').filter(s=>s.stage==='active');
const stage=mine?'self':(cardStages.some(([id])=>id===state.cardStage)?state.cardStage:'first');
const scores=rows('cards'),allGoals=rows('goals'),allMilestones=rows('milestones');
const stagePicker=mine?'':'<div class="card-stage-picker"><label for="card-stage-select">مرحلة التقييم</label><select id="card-stage-select" data-select="cardStage">'+cardStages.map(([key,label])=>option(key,label,stage)).join('')+'</select></div>';
const progressFor=records=>records.length?Math.round(records.reduce((total,r)=>total+Number(r.level||0),0)/(records.length*3)*100):0;
const body=students.map(student=>{
const assessments=scores.filter(c=>c.student_id===student.id);
const current=assessments.filter(c=>c.stage===stage);
const currentCount=current.length;
const goals=allGoals.filter(g=>g.student_id===student.id);
const doneGoals=goals.filter(g=>g.done).length;
const milestones=allMilestones.filter(m=>m.student_id===student.id&&m.done);
const canEvaluate=mine||stage!=='self';
const aspectCards='<div class="card-aspects-grid">'+aspects.map(aspect=>{
const assessment=current.find(c=>c.aspect===aspect);
const assessed=!!assessment&&Number.isInteger(Number(assessment.level))&&Number(assessment.level)>=0&&Number(assessment.level)<=3;
const value=assessed?Number(assessment.level):null;
return '<article class="card-aspect '+(assessed?'is-assessed':'is-unassessed')+'"><div class="card-aspect-top"><span>'+esc(aspect)+'</span><span class="card-aspect-level '+(assessed?'level-'+value:'')+'">'+(assessed?'المستوى '+value:'لم يُقيّم')+'</span></div><strong class="card-aspect-status">'+(assessed?esc(levels[value]):'لم يُقيَّم بعد')+'</strong><div class="card-aspect-meter" role="progressbar" aria-label="'+esc(aspect)+'" aria-valuemin="0" aria-valuemax="3" '+(assessed?'aria-valuenow="'+value+'"':'')+'><span style="width:'+(assessed?(value+1)*25:0)+'%"></span></div>'+(assessment?.note?'<p class="card-aspect-note">'+esc(assessment.note)+'</p>':'')+'</article>';
}).join('')+'</div>';
const goalSection='<section class="card-plan"><div class="card-subhead"><div><h3>الخطة الفردية</h3><p class="muted small">أهداف محددة ومقاييس واضحة للتحقق · ثلاثة أهداف كحد أقصى</p></div>'+(team()&&goals.length<3?btn('newgoal:'+student.id,'إضافة هدف','secondary smallbtn'):'')+'</div>'+
'<div class="card-goals-progress"><span>المنجز: '+doneGoals+' من '+goals.length+'</span><div class="card-goals-meter"><span style="width:'+(goals.length?Math.round(doneGoals/goals.length*100):0)+'%"></span></div></div>'+
(goals.length?'<div class="card-goals-list">'+goals.map((goal,i)=>'<div class="card-goal-item"><div class="card-goal-main"><span class="card-goal-index">'+(i+1)+'</span><div><span class="card-goal-aspect">'+esc(goal.aspect)+'</span><h4>'+esc(goal.goal)+'</h4><p><strong>مقياس التحقق:</strong> '+esc(goal.measure||'غير محدد')+'</p></div></div><div class="card-goal-progress"><span class="chip '+(goal.done?'ok':'')+'">'+(goal.done?'منجز':'قيد التنفيذ')+'</span>'+(team()?'<label class="card-goal-toggle"><input type="checkbox" data-card-goal="'+esc(goal.id)+'" data-card-student="'+esc(student.id)+'" '+(goal.done?'checked':'')+'/> تم الإنجاز</label>':'')+'</div></div>').join('')+'</div>':'<div class="card-plan-empty"><strong>لم تُسجّل خطة فردية بعد</strong><p class="muted small">'+(mine?'تُوضع خطتك الفردية مع المرافقة بعد التقييم، وستظهر أهدافها هنا عند تسجيلها.':'أضيفي أهدافًا عملية لهذه الغارسة مرتبطة بالجوانب الستة، مع مقياس واضح لكل هدف.')+'</p>'+(team()?btn('newgoal:'+student.id,'إعداد الخطة الفردية','goldbtn smallbtn'):'')+'</div>')+'</section>';
const secondary=mine?'<div class="card-other-stages"><h3>تقييمات المرافقة</h3><div class="card-evaluation-tags">'+cardStages.filter(([key])=>key!=='self').map(([key,label])=>{const entries=assessments.filter(c=>c.stage===key);return '<span class="chip '+(entries.length?'ok':'')+'">'+label+': '+(entries.length?entries.length+' من ٦ جوانب':'لم تُسجّل بعد')+'</span>'}).join('')+'</div></div>':'';
const milestoneSummary=mine?'<div class="card-milestone-summary"><strong>المخرجات المنجزة: '+milestones.length+' من ١١</strong><p class="small muted">يمكنكِ متابعة تفاصيل المخرجات من سجل الغارسة.</p></div>':'';
return '<section class="card card-assessment-panel"><div class="card-assessment-header"><div><div class="card-student-eyebrow">'+(mine?'بطاقتي':'بطاقة الغارسة')+'</div><h2>'+esc(student.name)+'</h2><p class="muted small">'+esc(cardStages.find(([key])=>key===stage)?.[1]||'التقييم')+' · '+currentCount+' من ٦ جوانب تم تقييمها</p></div><div class="card-assessment-actions">'+(canEvaluate?btn('card:'+student.id,mine?'تسجيل / تحديث تقييمي الذاتي':'تقييم الغارسة','goldbtn'):'<span class="chip">التقييم الذاتي تكتبه الغارسة فقط</span>')+'</div></div>'+
(currentCount===0?'<div class="card-waiting"><strong>التقييم لم يُسجّل بعد</strong><p>لن يظهر مستوى «لم تبدأ» إلا إذا اختير فعليًا في التقييم.</p></div>':'')+
aspectCards+secondary+goalSection+milestoneSummary+'</section>';
}).join('');
return '<div class="card-assessment-page">'+heading(mine?'بطاقتي':'بطاقة الغارسة',mine?'ستة جوانب، وتقييم ذاتي، وخطة فردية تبنى على موضعك الحالي.':'مستويات الجوانب الستة والتقييمات والخطة الفردية لكل غارسة')+
(mine?'<div class="notice card-guidance">لا تحاكمكِ البطاقة، بل ترسم موضعكِ وتُبنى عليها خطتكِ.</div>':stagePicker)+
(body||empty('لا توجد غارسات في المرحلة الحالية لعرض بطاقاتهن'))+'</div>';
}
const milestoneNames=[['iqrar','إقرار البداية موقعًا'],['letter','رسالة إلى نفسي محفوظة'],['parents','رسالة الأهل مسلمة'],['guardian','تعريف ولي الأمر (دون العشرين)'],['tilawa','الفحص المبدئي للتلاوة'],['individual','اللقاء الفردي'],['plan','الخطة الفردية'],['need5','ورقة الحاجة: خمس مستمعات'],['nabtpage','نبت كما أفهمه'],['hadith10','تسميع الأحاديث العشرة'],['mithaq','ميثاق الغارسة موقعًا']];
const familyMilestoneDocs=[['wird','قدر الورد'],['page_need','صفحة الحاجة'],['initiative','المبادرة'],['charter','الميثاق']];
function milestones(){
if(!team())return heading('المخرجات','هذه الصفحة مخصصة للفريق');
const families=rows('families').sort((a,b)=>(a.sort_order??999)-(b.sort_order??999)||a.name.localeCompare(b.name,'ar'));
const docs=rows('docs_family'),minutes=rows('minutes');
const members=rows('students').filter(s=>s.stage==='active').sort((a,b)=>a.name.localeCompare(b.name,'ar'));
const marks=rows('milestones');
const weekIds=new Set(sortedWeeks().filter(w=>w.kind==='program').slice(0,8).map(w=>w.id));
const docIsDone=(familyId,kind)=>docs.some(d=>d.family_id===familyId&&d.kind===kind&&String(d.body||'').trim());
const familyRows=families.map(f=>{
const written=familyMilestoneDocs.filter(([kind])=>docIsDone(f.id,kind)).length;
const count= new Set(minutes.filter(m=>m.family_id===f.id&&weekIds.has(m.week_id)).map(m=>m.week_id)).size;
return '<tr><th scope="row">'+esc(f.name)+'</th>'+
familyMilestoneDocs.map(([kind,title])=>'<td data-label="'+esc(title)+'"><span class="outcome-doc-status '+(docIsDone(f.id,kind)?'done':'pending')+'">'+(docIsDone(f.id,kind)?'كُتبت':'لم تُكتب')+'</span></td>').join('')+
'<td data-label="المحاضر"><span class="outcome-minutes-count">'+count+' <span>من ٨</span></span></td>'+
'<td data-label="المكتمل"><span class="outcome-family-count">'+written+' من ٤ وثائق</span></td></tr>';
}).join('');
const familiesSection='<section class="outcomes-section"><div class="outcomes-section-title"><div><h2>أولًا: إنجاز الأسر</h2><p class="muted small">الوثائق الأربع، وعدد الأسابيع التي كُتب لها محضر لقاء من الأسابيع الثمانية.</p></div><span class="chip">'+families.length+' أسر</span></div>'+
'<div class="outcomes-surface"><div class="outcomes-scroll"><table class="outcomes-table outcomes-family-table"><thead><tr><th scope="col">الأسرة</th>'+familyMilestoneDocs.map(([,title])=>'<th scope="col">'+esc(title)+'</th>').join('')+'<th scope="col">محاضر اللقاءات</th><th scope="col">الوثائق المكتوبة</th></tr></thead><tbody>'+
(familyRows||'<tr><td colspan="7">'+empty('لم تُضف أسر بعد')+'</td></tr>')+'</tbody></table></div></div></section>';
const eligible=(s,code)=>code!=='guardian'||studentUnder20(s)===true;
const countDone=code=>members.filter(s=>eligible(s,code)&&marks.some(m=>m.student_id===s.id&&m.code===code&&m.done===true)).length;
const countEligible=code=>members.filter(s=>eligible(s,code)).length;
const studentRows=members.map(s=>'<tr><th scope="row" class="outcomes-student-name">'+esc(s.name)+'<span class="outcomes-student-family">'+esc(name('families',s.family_id))+'</span></th>'+
milestoneNames.map(([code,label])=>{
const applicable=eligible(s,code),record=marks.find(m=>m.student_id===s.id&&m.code===code);
return '<td data-label="'+esc(label)+'">'+
(applicable?'<label class="outcome-check" title="'+esc(record?.done&&record?.done_at?'أُنجزت: '+date(record.done_at):'تحديد إنجاز المخرج')+'"><input type="checkbox" data-milestone="'+esc(s.id+':'+code)+'" '+(record?.done?'checked':'')+' aria-label="'+esc(label+' للغارسة '+s.name)+'"/><span class="outcome-check-icon" aria-hidden="true"></span><span class="outcome-check-date">'+(record?.done?(record.done_at?'أُنجزت '+esc(date(record.done_at)):'منجزة'):'لم تُنجز')+'</span></label>':
'<span class="outcome-not-required">'+(code==='guardian'&&studentUnder20(s)===null?'يحتاج تاريخ الميلاد':'غير مطلوب')+'</span>')+'</td>';
}).join('')+'</tr>').join('');
const totalRow='<tr class="outcomes-totals-row"><th scope="row">المُنجز من المستحقات</th>'+milestoneNames.map(([code])=>'<td><strong>'+countDone(code)+'</strong><span> من '+countEligible(code)+'</span></td>').join('')+'</tr>';
const totalsCards='<div class="outcomes-mobile-totals"><h3>إجمالي المنجز لكل مخرج</h3><div class="outcomes-total-grid">'+milestoneNames.map(([code,label])=>'<div><span>'+esc(label)+'</span><strong>'+countDone(code)+' <small>من '+countEligible(code)+'</small></strong></div>').join('')+'</div></div>';
const studentsSection='<section class="outcomes-section"><div class="outcomes-section-title"><div><h2>ثانيًا: مخرجات الغارسات</h2><p class="muted small">إحدى عشرة علامة لكل غارسة. اضغطي علامة الإنجاز لحفظها وتاريخها مباشرةً.</p></div><span class="chip">'+members.length+' غارسات</span></div>'+
'<div class="outcomes-surface"><div class="outcomes-scroll outcomes-students-scroll"><table class="outcomes-table outcomes-students-table"><thead><tr><th scope="col">الغارسة</th>'+milestoneNames.map(([,label])=>'<th scope="col">'+esc(label)+'</th>').join('')+'</tr></thead><tbody>'+
(studentRows||'<tr><td colspan="12">'+empty('لا توجد غارسات في البرنامج')+'</td></tr>')+'</tbody>'+(members.length?'<tfoot>'+totalRow+'</tfoot>':'')+'</table></div>'+ (members.length?totalsCards:'')+'</div>'+
'<p class="outcomes-help"><strong>تنبيه:</strong> «تعريف ولي الأمر» مطلوب لمن عمرها دون العشرين بحسب تاريخ الميلاد؛ إذا لم يُسجّل تاريخ الميلاد تظهر الحالة «يحتاج تاريخ الميلاد» ولا تُفترض الأهلية.</p></section>';
return '<div class="outcomes-page">'+heading('المخرجات','متابعة وثائق الأسر ومحاضرها، وعلامات الإنجاز الإحدى عشرة لكل غارسة')+
familiesSection+studentsSection+'</div>';
}
const questionKinds={fiqh:'فقهي',fikr:'فكري',general:'عام'};
const questionStatuses={open:'جديد',sent:'عند المرجعية',answered:'أُجيب'};
async function refreshQuestions(){
await read('questions');
if(!team()){
const {data,error}=await db.rpc('published_questions');
if(error)throw error;
const owned=rows('questions');
state.rows.questions=[...owned,...(data||[]).filter(q=>!owned.some(own=>own.id===q.id)).map(q=>({...q,anonymous:true}))];
}
}
function questions(){
const staff=team(),all=rows('questions');
const ownId=state.account?.student_id;
const own=staff?[]:all.filter(q=>q.student_id===ownId);
const shared=staff?[]:all.filter(q=>q.published&&q.status==='answered'&&q.student_id!==ownId);
const data=staff?all:state.questionsTab==='public'?shared:own;
const sections=staff?[['open','جديدة'],['sent','عند المرجعية'],['answered','أُجيبت'],['all','الكل']]:[['mine','أسئلتي'],['public','أُجيبت للجميع']];
const active=sections.some(([id])=>id===state.questionsTab)?state.questionsTab:sections[0][0];
const countFor=key=>staff?(key==='all'?all.length:all.filter(q=>q.status===key).length):(key==='mine'?own.length:shared.length);
const shown=staff?(active==='all'?all:all.filter(q=>q.status===active)):(active==='public'?shared:own);
const sorted=[...shown].sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||''));
const intro='<div class="questions-intro"><div class="questions-intro-icon">'+iconSvg('message-circle-question')+'</div><div><h2>'+(staff?'مساحة متابعة الأسئلة':'أسئلتك وإجابات الفريق')+'</h2><p>'+(staff?'تابعي الأسئلة الجديدة والمحالة للمرجعية والمجاب عنها، مع إمكانية النشر دون اسم السائلة.':'أرسلي سؤالك وتابعي الإجابة، أو استفيدي من الأسئلة المنشورة بدون كشف هوية صاحباتها.')+'</p></div>'+(staff?'':btn('newquestion','إرسال سؤال جديد','goldbtn'))+'</div>';
const tabs='<div class="questions-tabs" role="group" aria-label="حالة الأسئلة">'+sections.map(([id,label])=>'<button type="button" data-question-tab="'+id+'" class="'+(active===id?'active':'')+'" aria-pressed="'+(active===id?'true':'false')+'"><span>'+label+'</span><span class="questions-tab-count">'+countFor(id)+'</span></button>').join('')+'</div>';
const cards=sorted.map(q=>{
const student=staff?rows('students').find(s=>s.id===q.student_id):null;
const ownQuestion=!staff&&q.student_id===ownId;
const kind=questionKinds[q.kind]||q.kind||'عام';
const status=questionStatuses[q.status]||'جديد';
const nameLabel=student?.name||'غير مربوط بسجل';
const familyLabel=student?name('families',student.family_id):'—';
const canDelete=staff||(ownQuestion&&q.status!=='answered');
const canRefer=staff&&q.kind==='fiqh'&&q.status==='open';
const canAnswer=staff;
const ownerLine=staff?'<div class="question-owner"><span>'+iconSvg('user-round')+' '+esc(nameLabel)+'</span><span>'+iconSvg('users')+' '+esc(familyLabel)+'</span></div>':(ownQuestion?'<span class="question-own-indicator">سؤالكِ</span>':'<span class="question-anonymous">'+iconSvg('shield-check')+' سؤال منشور دون اسم السائلة</span>');
const actions=canAnswer||canRefer||canDelete?'<div class="question-actions">'+(canAnswer?btn('answer:'+q.id,q.status==='answered'?'مراجعة الإجابة':'كتابة الجواب','goldbtn smallbtn'):'')+(canRefer?btn('referquestion:'+q.id,'أُرسل إلى المرجعية','secondary smallbtn'):'')+(canDelete?btn('deletequestion:'+q.id,'حذف','question-delete smallbtn'):'')+'</div>':'';
return '<article class="question-item"><div class="question-item-head"><div class="question-pills"><span class="question-pill kind-'+esc(q.kind||'general')+'">'+esc(kind)+'</span><span class="question-pill state-'+esc(q.status||'open')+'">'+esc(status)+'</span>'+(q.published&&q.status==='answered'?'<span class="question-pill state-published">منشور للجميع</span>':'')+'</div><time class="question-time">'+esc(date(q.created_at))+'</time></div>'+
'<div class="question-item-meta">'+ownerLine+'</div><div class="question-body">'+esc(q.body)+'</div>'+
(q.answer&&q.status==='answered'?'<div class="question-answer"><div class="question-answer-title">'+iconSvg('check-circle')+' الإجابة'+(q.published?' المنشورة':'')+'</div><p>'+esc(q.answer)+'</p></div>':q.status==='sent'?'<div class="question-reference-hint">بانتظار ورود الجواب المعتمد من المرجعية الفقهية.</div>':'')+
actions+'</article>';
}).join('');
const noData=staff?(active==='open'?'لا توجد أسئلة جديدة':active==='sent'?'لا توجد أسئلة بانتظار المرجعية':active==='answered'?'لا توجد أسئلة مجابة بعد':'لم تُرسل أسئلة بعد'):(active==='public'?'لم تُنشر أسئلة مجابة للجميع بعد':'لم تُرسلي سؤالًا بعد');
return '<div class="questions-page">'+heading(staff?'الأسئلة':'أسئلتي',staff?'متابعة أسئلة الغارسات والإجابات المعتمدة والنشر':'اسألي وتابعي إجاباتكِ دون كشف اسمكِ في المنشورات العامة')+intro+tabs+
'<div class="questions-results-header"><h3>'+(sections.find(([key])=>key===active)?.[1]||'الأسئلة')+'</h3><span class="muted small">'+sorted.length+' سؤال</span></div>'+
'<div class="questions-list">'+(cards||'<div class="questions-empty">'+iconSvg('inbox')+'<strong>'+noData+'</strong><p class="muted small">ستظهر الأسئلة هنا عند توفرها.</p></div>')+'</div>'+
(staff?'<p class="questions-footnote">إحالة السؤال الفقهي تغيّر حالته إلى «عند المرجعية» لتتابعي إرساله خارج المنصة واستلام جوابه المعتمد؛ لا ترسل المنصة رسالة تلقائيًا للمعهد.</p>':'')+'</div>';
}
const resourceTypes={recording:'تسجيل',file:'ملف',link:'رابط'};
// Covers are uploaded image files in a dedicated Supabase Storage bucket, never image URLs entered by users.
const RESOURCE_COVER_BUCKET='resource-covers';
function youtubeThumbnail(sourceUrl){
try{
const u=new URL(sourceUrl),host=u.hostname.toLowerCase().replace(/^www\./,'');
let id='';
if(host==='youtu.be')id=u.pathname.split('/')[1]||'';
else if(['youtube.com','m.youtube.com','youtube-nocookie.com','music.youtube.com'].includes(host)){
id=u.searchParams.get('v')||'';
if(!id){const p=u.pathname.split('/').filter(Boolean);if(['shorts','embed','live','v'].includes(p[0]))id=p[1]||''}
}
return /^[\w-]{11}$/.test(id)?'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg':'';
}catch{return ''}
}
const resourceCoverUrl=path=>path?db.storage.from(RESOURCE_COVER_BUCKET).getPublicUrl(path).data?.publicUrl||'':'';
function resourceImage(resource){
if(resource.cover_mode==='none')return '';
let image='';
if(resource.cover_mode==='upload'&&resource.cover_path)image=resourceCoverUrl(resource.cover_path);
else if(!resource.cover_mode||resource.cover_mode==='auto')image=youtubeThumbnail(resource.url);
return image?'<div class="resource-cover"><img src="'+esc(image)+'" alt="غلاف '+esc(resource.title)+'" loading="lazy" decoding="async" referrerpolicy="no-referrer"/></div>':'';
}
function announcements(){
const staff=team();
const activeTab=state.communicationTab==='resources'?'resources':'announcements';
const announcementsSorted=[...rows('announcements')].sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned)||(b.created_at||'').localeCompare(a.created_at||''));
const resourcesSorted=[...rows('resources')].sort((a,b)=>(Number(a.sort_order)||0)-(Number(b.sort_order)||0)||a.title.localeCompare(b.title,'ar'));
const resourceWeeks=sortedWeeks();
const resourceWeekFilter=state.resourceWeekFilter&&resourceWeeks.some(w=>w.id===state.resourceWeekFilter)?state.resourceWeekFilter:(state.resourceWeekFilter==='general'?'general':'all');
const filteredResources=resourcesSorted.filter(r=>resourceWeekFilter==='all'||(resourceWeekFilter==='general'?!r.week_id:r.week_id===resourceWeekFilter));
const resourceFilter='<div class="comms-resource-filter"><label for="commsResourceWeekFilter">مصادر الأسبوع</label><select id="commsResourceWeekFilter" data-select="resourceWeekFilter" aria-label="تصفية المصادر حسب الأسبوع">'+[['all','كل المصادر'],['general','مصادر عامة'],...resourceWeeks.map(w=>[w.id,w.title])].map(([value,label])=>option(value,label,resourceWeekFilter)).join('')+'</select></div>';
const publicCount=announcementsSorted.filter(a=>!a.family_id).length;
const pinnedCount=announcementsSorted.filter(a=>a.pinned).length;
const managementBtns=staff?btn('newannouncement','إعلان جديد','goldbtn')+' '+btn('newresource','إضافة مصدر'):'';
const info=staff?'<div class="comms-metrics"><div><span class="comms-metric-icon">'+iconSvg('megaphone')+'</span><strong>'+announcementsSorted.length+'</strong><span>إعلانات</span></div><div><span class="comms-metric-icon">'+iconSvg('pin')+'</span><strong>'+pinnedCount+'</strong><span>مثبتة</span></div><div><span class="comms-metric-icon">'+iconSvg('book-open')+'</span><strong>'+resourcesSorted.length+'</strong><span>مصادر</span></div></div>':'';
const commsTabs='<div class="communications-tabs" role="tablist" aria-label="أقسام الإعلانات والمصادر">'+
'<button type="button" role="tab" id="comms-tab-announcements" data-comms-tab="announcements" aria-controls="comms-panel-announcements" aria-selected="'+(activeTab==='announcements')+'" class="communications-tab'+(activeTab==='announcements'?' is-active':'')+'">'+iconSvg('megaphone')+'<span>الإعلانات</span><span class="communications-tab-count">'+announcementsSorted.length+'</span>'+(hasUnreadAnnouncements()?notificationBadge():'')+'</button>'+
'<button type="button" role="tab" id="comms-tab-resources" data-comms-tab="resources" aria-controls="comms-panel-resources" aria-selected="'+(activeTab==='resources')+'" class="communications-tab'+(activeTab==='resources'?' is-active':'')+'">'+iconSvg('book-open')+'<span>المصادر</span><span class="communications-tab-count">'+resourcesSorted.length+'</span></button></div>';
const itemsA=announcementsSorted.map(a=>{
const target=a.family_id?'أسرة '+name('families',a.family_id):'جميع الغارسات';
return '<article class="comms-announcement'+(a.pinned?' is-pinned':'')+'"><div class="comms-announcement-top"><div class="comms-tags">'+(a.pinned?'<span class="comms-tag pinned">'+iconSvg('pin')+' مثبت</span>':'')+'<span class="comms-tag audience">'+iconSvg(a.family_id?'users':'globe')+' '+esc(target)+'</span></div><time class="comms-date">'+esc(date(a.created_at))+'</time></div><h3>'+esc(a.title)+'</h3><p class="comms-description">'+esc(a.body)+'</p>'+
(staff?'<div class="comms-item-actions">'+btn('editannouncement:'+a.id,'تعديل','secondary smallbtn')+' '+btn('deleteannouncement:'+a.id,'حذف','comms-delete smallbtn')+'</div>':'')+'</article>';
}).join('');
const itemsR=filteredResources.map(r=>{
const type=resourceTypes[r.kind]||r.kind||'رابط';
const week=r.week_id?weekName(r.week_id):'مصدر عام';
const link=safeUrl(r.url);
const thumbnail=resourceImage(r);
return '<article class="comms-resource'+(thumbnail?' has-cover':' is-text-only')+'">'+(thumbnail||'<div class="comms-resource-symbol">'+iconSvg(r.kind==='recording'?'video':r.kind==='file'?'file-text':'link')+'</div>')+'<div class="comms-resource-main"><div class="comms-resource-top"><span class="comms-tag resource-type">'+esc(type)+'</span><span class="comms-tag resource-week">'+iconSvg('calendar-days')+' '+esc(week)+'</span></div><h3>'+esc(r.title)+'</h3>'+(r.note?'<p class="comms-resource-note">'+esc(r.note)+'</p>':'')+'<div class="comms-resource-bottom"><a href="'+esc(link)+'" target="_blank" rel="noopener noreferrer" class="comms-open-link">'+iconSvg('external-link')+' فتح المصدر</a>'+(staff?'<span class="comms-order">ترتيب '+Number(r.sort_order||0)+'</span>':'')+'</div></div>'+
(staff?'<div class="comms-resource-actions">'+btn('editresource:'+r.id,'تعديل','secondary smallbtn')+' '+btn('deleteresource:'+r.id,'حذف','comms-delete smallbtn')+'</div>':'')+'</article>';
}).join('');
return '<div class="communications-page">'+heading('الإعلانات والمصادر',staff?'نشر أخبار البرنامج وموادّه التعليمية وإدارتها':'آخر أخبار البرنامج والمصادر التعليمية التي تحتاجين إليها',managementBtns)+info+commsTabs+
'<section class="comms-section" id="comms-panel-announcements" role="tabpanel" aria-labelledby="comms-tab-announcements"'+(activeTab==='announcements'?'':' hidden')+'><div class="comms-section-header"><div class="comms-section-heading"><span class="comms-heading-icon">'+iconSvg('megaphone')+'</span><div><h2>الإعلانات</h2><p>المواعيد والتنبيهات المهمة للدفعة وللأسر</p></div></div><span class="comms-section-count">'+announcementsSorted.length+' إعلان</span></div><div class="comms-announcements">'+(itemsA||'<div class="comms-empty">'+iconSvg('megaphone')+'<strong>لا توجد إعلانات بعد</strong><p>ستظهر هنا إعلانات البرنامج حين تنشرها عضوة الفريق.</p></div>')+'</div></section>'+
'<section class="comms-section" id="comms-panel-resources" role="tabpanel" aria-labelledby="comms-tab-resources"'+(activeTab==='resources'?'':' hidden')+'><div class="comms-section-header"><div class="comms-section-heading"><span class="comms-heading-icon">'+iconSvg('book-open')+'</span><div><h2>المصادر</h2><p>تسجيلات وملفات وروابط مرتبة بحسب أولويتها</p></div></div><span class="comms-section-count">'+filteredResources.length+' من '+resourcesSorted.length+' مصدر</span></div>'+resourceFilter+'<div class="comms-resources">'+(itemsR||'<div class="comms-empty">'+iconSvg('book-open')+'<strong>لا توجد مصادر بعد</strong><p>'+(resourcesSorted.length?'لا توجد مصادر لهذا الأسبوع. اختاري «كل المصادر» لعرضها كلها.':'ستظهر هنا المواد والروابط التي يضيفها الفريق.')+'</p></div>')+'</div></section></div>';
}
const preparationSections=[['decision','القرارات','توثيق قرارات الفريق ومتابعة تنفيذها'],['task','المهام','مهام مسؤولة عنها عضوة الفريق وبموعد محدد'],['launch','شروط الانطلاق','لا يُجدول لقاء التأسيس إلا بعد استكمال جميع الشروط'],['closing','قائمة الختام','توثيق الأعمال النهائية وإغلاق المرحلة']];
const launchReadiness=()=>{const all=rows('tasks').filter(t=>t.section==='launch');return {total:all.length,remaining:all.filter(t=>t.done!==true),ready:all.length>0&&all.every(t=>t.done===true)}};
const isFoundationMeeting=(kind,title)=>kind==='لقاء التأسيس'||/لقاء\s+التأسيس/.test(String(title||''));
function tasks(){
 if(!team())return heading('التحضير والتشغيل','هذه الصفحة مخصصة للفريق');
 const taskList=rows('tasks'),launch=launchReadiness();
 const readiness='<div class="prep-readiness '+(launch.ready?'is-ready':'is-blocked')+'"><div class="prep-readiness-symbol">'+iconSvg(launch.ready?'check-circle':'alert-triangle')+'</div><div><strong>'+(launch.ready?'شروط الانطلاق مكتملة':'لا يمكن جدولة لقاء التأسيس بعد')+'</strong><p>'+(launch.total===0?'لم تُضاف شروط الانطلاق بعد. أضيفي الشروط وحددي إنجازها أولًا.':launch.ready?'تم إنجاز الشروط '+launch.total+' كلها؛ يمكن الآن جدولة لقاء التأسيس.':'المتبقي '+launch.remaining.length+' من '+launch.total+' شروط. أكمليها قبل جدولة لقاء التأسيس.')+'</p></div><span class="prep-readiness-pill">'+(launch.ready?'جاهز للانطلاق':'بانتظار الإنجاز')+'</span></div>';
 const sections=preparationSections.map(([key,title,description],index)=>{
  const list=taskList.filter(t=>t.section===key).sort((a,b)=>(a.sort_order??999)-(b.sort_order??999)||String(a.due_on||'').localeCompare(String(b.due_on||'')));
  const done=list.filter(t=>t.done===true).length,all=list.length;
  return '<section class="card prep-section"><header class="prep-section-head"><div><span class="prep-section-index">0'+(index+1)+'</span><div><h3>'+esc(title)+'</h3><p>'+esc(description)+'</p></div></div><span class="prep-section-count">'+done+' من '+all+' منجز</span></header>'+
  '<div class="prep-progress" role="progressbar" aria-label="نسبة إنجاز '+esc(title)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+(all?Math.round(done/all*100):0)+'"><div style="width:'+(all?Math.round(done/all*100):0)+'%"></div></div>'+
  '<div class="prep-entries">'+(list.length?list.map(t=>'<article class="prep-entry '+(t.done?'is-done':'')+'"><label class="prep-entry-check"><input type="checkbox" data-task="'+esc(t.id)+'" '+(t.done?'checked':'')+' aria-label="تعليم '+esc(t.body)+' كمنجز"/><span class="prep-entry-checkmark">'+iconSvg('check')+'</span></label><div class="prep-entry-body"><strong>'+esc(t.body)+'</strong><div class="prep-entry-meta">'+(t.owner?'<span>'+iconSvg('user-round')+' '+esc(t.owner)+'</span>':'<span>لم تُحدّد المسؤولة</span>')+(t.due_on?'<span>'+iconSvg('calendar-days')+' الموعد: '+esc(date(t.due_on))+'</span>':'')+(t.done&&t.done_at?'<span class="prep-completion-date">'+iconSvg('check-circle')+' أُنجز: '+esc(date(t.done_at))+'</span>':'')+'</div>'+(t.note?'<p class="prep-entry-note">'+esc(t.note)+'</p>':'')+'</div><div class="prep-entry-actions">'+btn('edittask:'+t.id,'تعديل','secondary smallbtn')+btn('deletetask:'+t.id,'حذف','prep-delete smallbtn')+'</div></article>').join(''):'<div class="prep-empty">'+iconSvg('clipboard-list')+'<span>لا توجد بنود في هذا القسم بعد</span></div>')+'</div></section>';
 }).join('');
 const completed=taskList.filter(t=>t.done===true).length;
 return '<div class="preparation-page">'+heading('التحضير والتشغيل','قرارات واضحة ومهام قابلة للمتابعة، من التأسيس إلى الختام',btn('newtask','إضافة بند جديد','goldbtn'))+
 '<div class="prep-summary"><span>إجمالي البنود: <strong>'+taskList.length+'</strong></span><span>المكتمل: <strong>'+completed+'</strong></span><span>المتبقي: <strong>'+(taskList.length-completed)+'</strong></span></div>'+
 readiness+'<div class="prep-sections">'+sections+'</div></div>';
}
/* One reflection per program week, shown with an independent council review. */
function journal(){
 if(!team())return heading('سجل التجربة','هذا السجل مخصص لفريق الغارسات فقط');
 const weeks=sortedWeeks().filter(w=>w.kind==='program');
 const entries=rows('journal');
 const byWeek=new Map(entries.map(item=>[item.week_id,item]));
 const recorded=weeks.filter(w=>byWeek.has(w.id)),remaining=weeks.length-recorded.length;
 const isReview=state.journalView==='review';
 const cells=weeks.map((w,index)=>{
  const item=byWeek.get(w.id),hasEntry=!!item;
  const caption=String(w.title||'الأسبوع '+(index+1));
  const status='<span class="journal-status '+(hasEntry?'is-saved':'is-empty')+'">'+(hasEntry?'تم التدوين':'بانتظار التدوين')+'</span>';
  const summary=v=>'<div class="journal-cell-copy">'+(String(v||'').trim()?esc(v):'<span class="journal-missing">لم يُدوّن</span>')+'</div>';
  return '<tr><th scope="row"><div class="journal-week-label"><strong>الأسبوع '+(index+1)+'</strong><span>'+esc(caption)+'</span>'+status+'</div></th><td>'+summary(item?.success)+'</td><td>'+summary(item?.obstacle)+'</td><td>'+summary(item?.decision)+'</td><td class="journal-actions">'+btn(hasEntry?'editjournal:'+item.id:'newjournal:'+w.id,hasEntry?'تعديل':'تدوين',hasEntry?'secondary':'goldbtn')+'</td></tr>';
 }).join('');
 const reviewItems=recorded.map((w,index)=>({week:w,item:byWeek.get(w.id),number:weeks.indexOf(w)+1}));
 const list=(key)=>{
  const filtered=reviewItems.filter(({item})=>String(item[key]||'').trim());
  if(!filtered.length)return '<div class="journal-empty-review">لا توجد تدوينات لهذا المحور بعد.</div>';
  return filtered.map(({week,item,number})=>'<article class="journal-review-item"><span class="journal-review-week">الأسبوع '+number+'</span><div><strong>'+esc(week.title)+'</strong><p>'+esc(item[key])+'</p></div></article>').join('');
 };
 const review='<section class="journal-review-panel" aria-labelledby="journal-review-title"><header class="journal-review-header"><div><span class="journal-kicker">مجلس التطوير • الأسبوع الفاصل</span><h2 id="journal-review-title">خلاصة تجربة الغارسات</h2><p>تجميع تلقائي من سجل الأسابيع الثمانية، لمناقشة النجاحات والتعثّرات والقرارات. لا تُنشأ قرارات جديدة تلقائيًا.</p></div>'+btn('print','طباعة الخلاصة / حفظ PDF','secondary no-print')+'</header><div class="journal-review-coverage">'+iconSvg('clipboard-check')+' موثّق '+recorded.length+' من '+weeks.length+' أسابيع'+(remaining?' • بانتظار تدوين '+remaining+' أسبوع':' • السجل مكتمل')+'</div><div class="journal-review-columns"><section><h3>'+iconSvg('check-circle')+' ما نجح</h3>'+list('success')+'</section><section><h3>'+iconSvg('alert-triangle')+' ما تعثّر</h3>'+list('obstacle')+'</section><section><h3>'+iconSvg('clipboard-list')+' القرارات المتخذة</h3>'+list('decision')+'</section></div><footer>هذه الخلاصة للاستخدام الداخلي للفريق في مجلس التطوير، ولا تُعرض للغارسات.</footer></section>';
 const table='<section class="journal-weekly-panel"><header><div><h2>سجل الأسابيع</h2><p>صف واحد لكل أسبوع من أسابيع البرنامج. أضيفي التدوين أو عدّليه متى لزم.</p></div></header><div class="journal-table-scroll" role="region" aria-label="جدول سجل التجربة قابل للتمرير أفقيًا" tabindex="0"><table class="journal-table"><thead><tr><th scope="col">الأسبوع</th><th scope="col">ما نجح</th><th scope="col">ما تعثّر</th><th scope="col">القرار المتخذ</th><th scope="col">الإجراء</th></tr></thead><tbody>'+cells+'</tbody></table></div></section>';
 return '<div class="journal-page">'+heading('سجل التجربة','توثيق التجربة أسبوعًا بعد أسبوع، ومادة مجلس التطوير في الأسبوع الفاصل',btn('newjournal','تدوين أسبوع','goldbtn no-print'))+
 '<div class="journal-overview"><div><span>أسابيع البرنامج</span><strong>'+weeks.length+'</strong></div><div><span>أسابيع موثّقة</span><strong>'+recorded.length+'</strong></div><div><span>بانتظار التدوين</span><strong>'+remaining+'</strong></div></div>'+
 '<nav class="journal-view-switch no-print" aria-label="طريقة عرض سجل التجربة"><button type="button" data-action="journalView:weeks" class="'+(!isReview?'is-active':'')+'" aria-pressed="'+(!isReview)+'">جدول الأسابيع</button><button type="button" data-action="journalView:review" class="'+(isReview?'is-active':'')+'" aria-pressed="'+isReview+'">ملخص مجلس التطوير</button></nav>'+
 (isReview?review:table)+'</div>';
}

/* Report calculations follow section 6 of the Algharisat build guide.
   A missing entry is not an absence or a failed task. */
const reportValue=(n,decimals=0)=>Number(n).toLocaleString('ar-SA',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
const reportRatio=(items,predicate)=>items.length?reportValue(items.filter(predicate).length/items.length*100,0)+'٪':'—';
const reportDate=value=>value?new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(String(value).slice(0,10)+'T12:00:00Z')):'—';
function reportPeriodWeeks(period){
 return sortedWeeks().filter(w=>w.kind==='program'&&(period==='all'||(period==='month1'&&Number(w.code.slice(1))<=4)||(period==='month2'&&Number(w.code.slice(1))>=5))).sort((a,b)=>a.sort_order-b.sort_order);
}
function reportAttendance(records,key){
 const eligible=records.filter(r=>['present','late','excused','absent'].includes(r[key]));
 return {recorded:eligible.length,value:reportRatio(eligible,r=>r[key]==='present'||r[key]==='late')};
}
function reportTask(records,key){
 const eligible=records.filter(r=>['done','partial','none'].includes(r[key]));
 return {recorded:eligible.length,value:reportRatio(eligible,r=>r[key]==='done')};
}
function reportWird(records){
 const eligible=records.filter(r=>r.wird_days!==null&&r.wird_days!==undefined&&Number.isFinite(Number(r.wird_days)));
 return {recorded:eligible.length,value:eligible.length?reportValue(eligible.reduce((sum,r)=>sum+Number(r.wird_days),0)/eligible.length,1):'—'};
}
function reportMetric(label,metric,note=''){
 const value=typeof metric==='object'?metric.value:metric;
 const count=typeof metric==='object'?'على أساس '+reportValue(metric.recorded)+' سجل':'';
 return '<div class="report-metric"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong><small>'+esc(note||count)+'</small></div>';
}
function reportTable(headings,records,emptyMessage){
 return '<div class="report-table-scroll"><table class="report-table"><thead><tr>'+headings.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+(records||'<tr><td colspan="'+headings.length+'" class="report-empty">'+esc(emptyMessage||'لا توجد بيانات لهذه المدة')+'</td></tr>')+'</tbody></table></div>';
}
function reports(){
 const period=state.period==='month1'||state.period==='month2'?state.period:'all';
 const allWeeks=reportPeriodWeeks(period),periodIds=new Set(allWeeks.map(w=>w.id));
 const periodName=period==='month1'?'الشهر الأول (الأسابيع ١–٤)':period==='month2'?'الشهر الثاني (الأسابيع ٥–٨)':'المرحلة كلها (الأسابيع ١–٨)';
 const start=allWeeks[0]?.starts_on,end=allWeeks[allWeeks.length-1]?.ends_on;
 const periodText=start&&end?reportDate(start)+' — '+reportDate(end):'لم تُحدّد تواريخ الفترة';
 const families=rows('families').slice().sort((a,b)=>(a.sort_order??999)-(b.sort_order??999)||a.name.localeCompare(b.name,'ar'));
 const members=rows('students').filter(s=>s.stage==='active');
 const activeIds=new Set(members.map(s=>s.id));
 const followups=rows('followups').filter(r=>periodIds.has(r.week_id)&&activeIds.has(r.student_id));
 const familyOf=id=>members.find(s=>s.id===id)?.family_id;
 const familyMinutes=rows('minutes').filter(m=>periodIds.has(m.week_id)&&families.some(f=>f.id===m.family_id));
 const expectedWeeks=allWeeks.length;
 const minutesCount=familyId=>new Set(familyMinutes.filter(m=>m.family_id===familyId).map(m=>m.week_id)).size;
 const monthNumber=period==='month1'?'الأول':period==='month2'?'الثاني':'المرحلة';
 const programName=String(setting('program_name','الغارسات')),stageName=String(setting('stage_name','المرحلة الأولى'));
 const summary=[
  reportMetric('الأسر',reportValue(families.length),'عدد الأسر المسجلة'),
  reportMetric('الغارسات في البرنامج',reportValue(members.length),'سجلات الغارسات النشطة'),
  reportMetric('حضور المجلس',reportAttendance(followups,'majlis')),
  reportMetric('حضور لقاء الأسرة',reportAttendance(followups,'family_meeting')),
  reportMetric('متوسط أيام الورد',reportWird(followups),'من ٧ أيام، للمسجّلات فقط'),
  reportMetric('محاضر الأسر',reportValue(familyMinutes.length?new Set(familyMinutes.map(m=>m.family_id+'|'+m.week_id)).size:0),'من '+reportValue(families.length*expectedWeeks)+' أسبوع-أسرة')
 ].join('');
 const familyRows=families.map(f=>{
  const records=followups.filter(r=>familyOf(r.student_id)===f.id);
  const cells=[
    f.name,
    reportValue(members.filter(s=>s.family_id===f.id).length),
    reportAttendance(records,'majlis').value,
    reportAttendance(records,'family_meeting').value,
    reportWird(records).value,
    reportTask(records,'triple_task').value,
    reportTask(records,'transferred_lesson').value,
    reportTask(records,'rotating_task').value,
    reportValue(minutesCount(f.id))+' / '+reportValue(expectedWeeks)
  ];
  return '<tr>'+cells.map((v,i)=>(i===0?'<th scope="row">':'<td>')+esc(v)+(i===0?'</th>':'</td>')).join('')+'</tr>';
 }).join('');
 const stages=period==='month1'?['self']:cardStages.filter(([code])=>code!=='self').map(([code])=>code).reverse();
 const stageLabel=period==='month1'?'التقييم الذاتي': 'آخر تقييم مسجّل (الأول أو ما بعده)';
 const cardEntries=rows('cards').filter(r=>activeIds.has(r.student_id)&&stages.includes(r.stage));
 const stageRank=key=>stages.indexOf(key);
 const reportAssessment=(studentId,aspect)=>cardEntries.filter(r=>r.student_id===studentId&&r.aspect===aspect&&Number.isInteger(Number(r.level))&&Number(r.level)>=0&&Number(r.level)<=3).sort((a,b)=>stageRank(a.stage)-stageRank(b.stage)||String(b.updated_at||'').localeCompare(String(a.updated_at||'')))[0];
 const cardRows=aspects.map(aspect=>{
  const levelsCount=[0,0,0,0];let assessed=0;
  for(const student of members){const entry=reportAssessment(student.id,aspect);if(entry){levelsCount[Number(entry.level)]++;assessed++}}
  return '<tr><th scope="row">'+esc(aspect)+'</th>'+levelsCount.map((n,i)=>'<td><span class="report-level level-'+i+'">'+reportValue(n)+'</span></td>').join('')+'<td>'+reportValue(assessed)+'</td><td>'+reportValue(members.length-assessed)+'</td></tr>';
 }).join('');
 const milestoneEntries=rows('milestones').filter(r=>activeIds.has(r.student_id));
 const milestoneRows=milestoneNames.map(([code,label])=>{
  const eligible=members.filter(s=>code!=='guardian'||studentUnder20(s)===true);
  const unique=new Set(milestoneEntries.filter(m=>m.code===code&&m.done&&eligible.some(s=>s.id===m.student_id)).map(m=>m.student_id));
  const missingAge=code==='guardian'?members.filter(s=>studentAge(s.id)===null).length:0;return '<tr><th scope="row">'+esc(label)+'</th><td>'+reportValue(unique.size)+'</td><td>'+reportValue(eligible.length)+'</td><td>'+(eligible.length?reportValue(unique.size/eligible.length*100)+'٪':missingAge?'يحتاج تاريخ الميلاد':'غير مطلوب')+'</td></tr>';
 }).join('');
 const familyDocs=rows('docs_family');
 const docsRows=families.map(f=>{
  const ready=familyMilestoneDocs.filter(([kind])=>familyDocs.some(d=>d.family_id===f.id&&d.kind===kind&&String(d.body||'').trim())).length;
  return '<tr><th scope="row">'+esc(f.name)+'</th><td>'+reportValue(ready)+' / ٤</td><td>'+reportValue(minutesCount(f.id))+' / '+reportValue(expectedWeeks)+'</td></tr>';
 }).join('');
 const closing=rows('tasks').filter(t=>t.section==='closing'&&(!t.week_id||periodIds.has(t.week_id)));
 const closingRows=closing.map(t=>'<div class="report-closing-row"><span class="report-state '+(t.done?'is-done':'is-pending')+'">'+(t.done?'مكتمل':'لم يكتمل')+'</span><div><strong>'+esc(t.body)+'</strong>'+(t.owner?'<small>المسؤولة: '+esc(t.owner)+'</small>':'')+(t.result?'<p>'+esc(t.result)+'</p>':'')+'</div></div>').join('');
 const notes=leadership()?rows('observations').filter(o=>o.secret===false&&o.kind!=='حدود الستر'&&activeIds.has(o.student_id)&&(!o.week_id||periodIds.has(o.week_id))):[];
 const noteRows=notes.slice().sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||''))).map(o=>{
  const student=members.find(s=>s.id===o.student_id);
  return '<div class="report-note"><strong>'+esc(student?.name||'غارسة')+'</strong><span class="report-note-kind">'+esc(o.kind||'ملاحظة')+'</span><p>'+esc(o.note||'')+'</p></div>';
 }).join('');
 const noteHint=leadership()?'لا توجد ملاحظات غير سرية لهذه الفترة.':'هذا القسم لا يظهر إلا للإدارة والمرافقة؛ ولا يضم ملاحظات سرية.';
 const footer='<div class="report-method"><h3>طريقة الحساب والمصادر</h3><p>الحضور = (حاضرة + متأخرة) ÷ عدد من سُجّل لهن حضور. إنجاز المهام = «أنجزت» ÷ عدد من سُجّل لهن مستوى إنجاز. متوسط الورد = مجموع الأيام ÷ عدد سجلات الورد. المحاضر = عدد أسابيع الفترة التي يوجد لها محضر، دون تكرار الأسبوع داخل الأسرة. تُستبعد الخانات الفارغة من المقامات، وتظهر علامة (—) عند غياب البيانات.</p><p>التقييم للشهر الأول ذاتي؛ وللشهر الثاني والمرحلة كلها يُستخدم أحدث مستوى تقييم مسجّل لكل غارسة في كل جانب. «تعريف ولي الأمر» يحسب للغارسات دون العشرين وفق تاريخ الميلاد؛ ولا نعتبر عدم وجود تاريخ ميلاد دليلًا على أن الغارسة بلغت العشرين. تُعرض الملاحظات غير السرية وحدها للإدارة والمرافقة.</p></div>';
 return '<div class="professional-report-page">'+heading('التقارير','تقرير موحّد للأسر، والمتابعة، والبطاقات، والمخرجات، وختام المرحلة',btn('print','طباعة التقرير / حفظ PDF','secondary no-print'))+
 '<div class="report-toolbar no-print"><div><label for="reportPeriodSelect">المدة</label><select id="reportPeriodSelect" data-select="period">'+[['all','المرحلة كلها (الأسابيع ١–٨)'],['month1','الشهر الأول (١–٤)'],['month2','الشهر الثاني (٥–٨)']].map(([v,l])=>option(v,l,period)).join('')+'</select></div><span class="muted small">تُعرض النسب من الأسابيع التي حُفظت لها بيانات فقط.</span></div>'+
 '<article class="report-sheet" dir="rtl"><header class="report-cover"><div class="report-brand">منصة الغارسات <span>من الغرس إلى الثمر</span></div><h2>تقرير '+esc(programName)+' — '+esc(stageName)+'</h2><div class="report-meta"><div><span>الفترة</span><strong>'+esc(periodName)+'</strong></div><div><span>من — إلى</span><strong>'+esc(periodText)+'</strong></div><div><span>تاريخ الإعداد</span><strong>'+esc(reportDate(todayISO()))+'</strong></div></div></header>'+
 '<section class="report-section"><div class="report-section-head"><div><span>01 / المؤشرات</span><h3>ملخص الدفعة</h3></div></div><div class="report-metrics">'+summary+'</div></section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>02 / المتابعة</span><h3>أداء الأسر خلال '+esc(monthNumber)+'</h3></div><p>المؤشرات من سجلّات المتابعة الفعلية فقط.</p></div>'+reportTable(['الأسرة','الغارسات','المجلس','لقاء الأسرة','متوسط الورد','الثلاثية','المنقول','الدوّارة','المحاضر'],familyRows,'لم تُضف أسر')+'</section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>03 / التقييم</span><h3>بطاقة الغارسة — الجوانب الستة</h3></div><p>'+esc(stageLabel)+'</p></div>'+reportTable(['الجانب','لم تبدأ','في الطريق','متحققة','متميزة','تم تقييمهن','لم يُقيّمن'],cardRows)+'</section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>04 / المخرجات</span><h3>إنجاز علامات الغارسات</h3></div><p>العدد من الغارسات المؤهلات لكل علامة.</p></div>'+reportTable(['العلامة','أنجزت','المطلوب منهن','النسبة'],milestoneRows)+'</section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>05 / توثيق الأسر</span><h3>الوثائق والمحاضر</h3></div></div>'+reportTable(['الأسرة','الوثائق المكتوبة','المحاضر في الفترة'],docsRows)+'</section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>06 / الختام</span><h3>قائمة الختام</h3></div><p>'+reportValue(closing.filter(t=>t.done).length)+' من '+reportValue(closing.length)+' بنود مكتملة</p></div>'+(closingRows||'<p class="report-empty">لم تُدخل بنود قائمة الختام بعد.</p>')+'</section>'+
 '<section class="report-section"><div class="report-section-head"><div><span>07 / الملاحظات</span><h3>ملاحظات المرافقة غير السرية</h3></div></div>'+(noteRows||'<p class="report-empty">'+noteHint+'</p>')+'</section>'+
 footer+'<footer class="report-footer">الغارسات | تقرير مستخرج من سجلات المنصة في '+esc(reportDate(todayISO()))+'</footer></article></div>';
}

function survey(){
const round=String(setting('survey_round','p1')),isOpen=setting('survey_open',false)===true;
const questions=['ما الذي نفعكِ في هذه المرحلة أكثر من غيره؟','ما الذي أثقل عليكِ؟','هل كان حمل الأسبوع مناسبًا لدراستكِ وبيتكِ؟ وأين زاد؟','كيف وجدتِ أسرتكِ ولقاءها؟','ماذا تقترحين للمرحلة الثانية؟'];
if(leadership()){
 const answers=rows('responses_survey').filter(r=>r.round===round),completed=rows('done_survey').filter(d=>d.round===round).length;
 const total=rows('students').filter(s=>s.stage==='active').length;
 return heading('صوت الغارسة','استبانة بلا اسم ولا أسرة')
 +'<div class="card"><p><strong>حالة الاستبانة: '+(isOpen?'مفتوحة':'مغلقة')+'</strong></p><p>الجولة: '+esc(round)+'</p><h3>أجابت '+completed+' من '+total+'</h3>'
 +btn('togglesurvey',isOpen?'إغلاق الاستبانة':'فتح الاستبانة','goldbtn')
 +'<div class="field" style="margin-top:18px"><label for="surveyRoundInput">رمز الجولة الحالية (مثل p1 أو p2)</label><input id="surveyRoundInput" type="text" value="'+esc(round)+'" '+(isOpen?'disabled':'')+' maxlength="32" pattern="[A-Za-z0-9_-]+"/><p class="muted">لإنشاء جولة جديدة، أغلقي الاستبانة ثم غيّري الرمز واحفظيه. تبقى نتائج الجولات السابقة محفوظة.</p></div>'
 +btn('saveSurveyRound','حفظ رمز الجولة','secondary',isOpen?'disabled':'')+'</div>'
 +questions.map((question,i)=>'<div class="card" style="margin-top:14px"><h3>'+esc((i+1)+'. '+question)+'</h3>'
 +(answers.length?answers.map(r=>'<div class="list-row"><p>'+esc(Array.isArray(r.answers)?r.answers[i]??'—':'—')+'</p></div>').join(''):empty('لا توجد إجابات لهذا السؤال في الجولة الحالية'))+'</div>').join('');
}
if(!isOpen)return '<div class="card"><h2>صوت الغارسة</h2><p>الاستبانة غير مفتوحة الآن.</p></div>';
if(rows('done_survey').some(d=>d.student_id===state.account?.student_id&&d.round===round))return '<div class="notice">جزاكِ الله خيرًا، وصلت إجابتكِ.</div>';
return heading('صوت الغارسة','تُحفظ إجاباتكِ دون اسم ولا أسرة')+'<form id="surveyForm" class="card">'+questions.map((t,i)=>field(t,'q'+i,'','textarea',true)).join('')+'<button type="submit" class="btn">إرسال الإجابات</button></form>';
}

const accountRoleLabels={pending:'بانتظار الموافقة',rejected:'مرفوض',disabled:'موقوف',gharisa:'غارسة',musaida:'مساعدة المرافقة',murafiqa:'المرافقة',admin:'الإدارة'};
const accountRoles=()=>[['gharisa','غارسة'],['musaida','مساعدة المرافقة'],['murafiqa','المرافقة'],...(state.account?.role==='admin'?[['admin','الإدارة']]:[])];
function accountWaitingTime(value){
 if(!value)return 'غير معروف';
 const since=new Date(value).getTime();
 if(!Number.isFinite(since))return 'غير معروف';
 const days=Math.max(0,Math.floor((Date.now()-since)/86400000));
 return days===0?'أقل من يوم':days===1?'يوم واحد':days+' أيام';
}
function accountMatchCandidates(a){
 const norm=v=>String(v||'').trim().toLowerCase();
 return rows('students').filter(s=>
  !rows('accounts').some(row=>row.student_id===s.id&&row.user_id!==a.user_id)&&
  ((a.email&&s.email&&norm(a.email)===norm(s.email))||
   (a.phone&&s.phone&&String(a.phone).replace(/\D/g,'')===String(s.phone).replace(/\D/g,'')))
 );
}
function accounts(){
 if(!leadership())return heading('الحسابات والصلاحيات','هذه الصفحة متاحة للإدارة والمرافقة فقط');
 const all=rows('accounts'),pending=all.filter(a=>a.role==='pending').sort((a,b)=>String(a.created_at||'').localeCompare(String(b.created_at||''))),
 current=all.filter(a=>a.role!=='pending').sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),'ar'));
 const currentTab=state.accountsTab==='current'?'current':'pending';
 const status=a=>'<span class="account-role-badge '+(a.role==='pending'?'is-pending':a.role==='rejected'?'is-rejected':a.role==='disabled'?'is-disabled':'is-active')+'">'+esc(accountRoleLabels[a.role]||a.role)+'</span>';
 const pendingRows=pending.map(a=>{
   const suggested=accountMatchCandidates(a);
   const proposal=suggested.length===1?'<span class="account-suggestion">'+iconSvg('link')+' اقتراح: '+esc(suggested[0].name)+'</span>':suggested.length>1?'<span class="muted small">وجدت عدة سجلات محتملة؛ اختاري يدويًا</span>':'<span class="muted small">لا يوجد سجل مطابق تلقائيًا</span>';
   return '<tr><th scope="row">'+esc(a.name)+'</th><td>'+esc(a.email||'—')+'</td><td dir="ltr">'+esc(a.phone||'—')+'</td><td><div class="account-age"><strong>'+esc(accountWaitingTime(a.created_at))+'</strong><small>'+esc(a.created_at?date(a.created_at):'—')+'</small></div></td><td>'+proposal+'</td><td><div class="account-action-buttons">'+btn('reviewaccount:'+a.user_id,'موافقة وربط','goldbtn smallbtn')+btn('rejectaccount:'+a.user_id,'رفض','account-reject-button smallbtn')+'</div></td></tr>';
 }).join('');
 const currentRows=current.map(a=>'<tr><th scope="row">'+esc(a.name)+'</th><td>'+esc(a.title||'—')+'</td><td>'+esc(a.email||'—')+'</td><td>'+status(a)+'</td><td>'+esc(rows('students').find(st=>st.id===a.student_id)?.name||'—')+'</td><td>'+btn('editaccount:'+a.user_id,a.role==='rejected'?'إعادة المراجعة':'تعديل','secondary smallbtn')+'</td></tr>').join('');
 return '<div class="account-management">'+heading('الحسابات والصلاحيات','مراجعة طلبات التسجيل وضبط الربط والصلاحيات')+
 '<div class="account-overview"><div><span>بانتظار الموافقة</span><strong>'+pending.length+'</strong></div><div><span>الحسابات القائمة</span><strong>'+current.filter(a=>a.role!=='rejected').length+'</strong></div><div><span>الطلبات المرفوضة</span><strong>'+current.filter(a=>a.role==='rejected').length+'</strong></div></div>'+
 (state.studentToLink?'<div class="notice students-link-help">سجل الغارسة المحدد: '+esc(rows('students').find(st=>st.id===state.studentToLink)?.name||'—')+'. اختاري حسابها ثم حددي هذا السجل عند المراجعة.</div>':'')+
 '<nav class="account-tabs" aria-label="أقسام الحسابات"><button type="button" class="'+(currentTab==='pending'?'is-active':'')+'" data-action="accountsTab:pending" aria-pressed="'+(currentTab==='pending')+'">بانتظار الموافقة <span>'+pending.length+'</span></button><button type="button" class="'+(currentTab==='current'?'is-active':'')+'" data-action="accountsTab:current" aria-pressed="'+(currentTab==='current')+'">الحسابات القائمة <span>'+current.length+'</span></button></nav>'+
 (currentTab==='pending'?'<section class="account-table-card"><header><div><h2>طلبات التسجيل الجديدة</h2><p>راجعي بيانات الطلب ثم اختاري الصفة وسجل الغارسة، أو ارفضي الطلب مع ذكر السبب عند الحاجة.</p></div></header><div class="account-table-scroll">'+table(['الاسم','البريد الإلكتروني','رقم الهاتف','منذ تقديم الطلب','السجل المقترح','الإجراءات'],pendingRows||'<tr><td colspan="6" class="account-no-results">لا توجد طلبات بانتظار الموافقة حاليًا.</td></tr>')+'</div></section>':
 '<section class="account-table-card"><header><div><h2>الحسابات القائمة</h2><p>تعديل الأسماء والألقاب والصفات وسجل الغارسة المرتبط، مع بيان الحسابات الموقوفة والمرفوضة.</p></div></header><div class="account-table-scroll">'+table(['الاسم','اللقب','البريد الإلكتروني','الصفة','الغارسة المرتبطة','الإجراء'],currentRows||'<tr><td colspan="6" class="account-no-results">لا توجد حسابات في هذه القائمة.</td></tr>')+'</div></section>')+'</div>';
}

function settings(){
 if(!team())return heading('الإعدادات','هذه الصفحة للفريق فقط');
 const stages=rows('assessment_stages').slice().sort((a,b)=>a.sort_order-b.sort_order);
 const list='<div class="settings-stage-list">'+stages.map(st=>'<div class="settings-stage-row"><div><strong>'+esc(st.label)+'</strong><span>'+(st.is_self?'التقييم الذاتي للغارسة':st.is_system?'مرحلة أساسية':'مرحلة إضافية')+'</span></div><div class="settings-stage-actions">'+(leadership()?btn('editassessmentstage:'+st.code,'تعديل الاسم','secondary smallbtn'):'')+(leadership()&&!st.is_system?btn('deleteassessmentstage:'+st.code,'حذف','settings-delete-stage smallbtn'):'')+'</div></div>').join('')+'</div>';
 const start=rows('weeks').find(w=>w.code==='w1')?.starts_on||'';
 return '<div class="settings-workbench">'+heading('الإعدادات','البرنامج والتقويم والأسر ومراحل التقييم والدورات')+
 '<section class="card settings-section"><header><h2>معلومات البرنامج</h2><p>يظهر الترحيب في تسجيل الدخول ويُعرض رقم التواصل البديل للغارسات عند الحاجة.</p></header><form id="settingsForm"><div class="form-grid">'+field('اسم البرنامج','program_name',setting('program_name','الغارسات'))+field('اسم المرحلة الحالية','stage_name',setting('stage_name','المرحلة الأولى'))+field('رقم الدورة الجارية','current_cycle',setting('current_cycle',1),'number')+field('رقم التواصل البديل','backup_phone',setting('backup_phone',''),'tel')+'<div class="full">'+field('عبارة الترحيب','welcome',setting('welcome',''),'textarea')+'</div></div><div class="settings-section-actions"><button type="submit" class="btn goldbtn">حفظ إعدادات البرنامج</button></div></form></section>'+
 '<section class="card settings-section"><header><h2>إزاحة التقويم</h2><p>تقديم أو تأخير أسابيع التحضير والمرحلة والفاصل وجميع مواعيد الأحداث المسجلة؛ يظهر العدد والاتجاه قبل التأكيد.</p></header><div class="settings-calendar-grid"><div class="settings-calendar-current"><span>بداية الأسبوع الأول الحالية</span><strong>'+esc(start?date(start):'غير محددة')+'</strong></div>'+field('بداية الأسبوع الأول الجديدة','first_start',start,'date')+'</div><p class="settings-shift-warning">يجب أن تبدأ أسابيع البرنامج يوم السبت وألا تتجاوز الإزاحة ٣٦٦ يومًا.</p><div class="settings-section-actions">'+btn('shiftcalendar','مراجعة إزاحة التقويم','secondary')+'</div></section>'+
 '<section class="card settings-section"><header><h2>الأسر</h2><p>إدارة أسمائها ومواعيد لقائها وإضافة أسر جديدة.</p></header><div class="settings-family-summary"><strong>'+rows('families').length+' أسر</strong><span>'+rows('families').map(f=>esc(f.name)+' ('+rows('students').filter(st=>st.family_id===f.id).length+' عضوات)').join(' • ')+'</span></div><div class="settings-section-actions">'+btn('go:families','إدارة الأسر','secondary')+'</div></section>'+
 '<section class="card settings-section"><header><h2>مراحل التقييم في بطاقة الغارسة</h2><p>إضافة مراحل جديدة وتعديل أسمائها دون فقدان أي تقييم سابق. لا يمكن حذف مرحلة أساسية أو مرحلة تحتوي على تقييمات.</p></header>'+list+'<div class="settings-section-actions">'+(leadership()?btn('newassessmentstage','إضافة مرحلة تقييم','goldbtn'):'<span class="muted small">إدارة المراحل للإدارة والمرافقة فقط</span>')+'</div></section></div>';
}
function myweek(){
const w=currentWeek();return '<div class="eyebrow">'+date(new Date())+'</div>'+heading('أسبوعي','أهلاً '+(state.account?.name||'')+' | '+name('families',state.profile?.family_id))+backupContactNotice()+'<div class="hero-card"><div class="eyebrow">'+esc(w?.code||'')+' | '+(w?date(w.starts_on):'')+'</div><h1>'+esc(w?.title||'أهلاً بك في الغارسات')+'</h1><p>'+esc(w?.reflection||'رحلة غرسٍ ورعاية')+'</p></div><div class="grid two"><div class="card"><h3>منهج الأسبوع</h3>'+[['الدرس العلمي',w?.lesson],['الأربعون',w?.hadith],['جزء عم',w?.tilawa],['رياض الصالحين',w?.riyad]].map(([t,v])=>'<div class="list-row"><strong>'+t+'</strong><span class="muted">'+esc(v)+'</span></div>').join('')+'</div><div class="card"><h3>مهمتي الثلاثية</h3>'+[['في نفسي',w?.task_self],['في بيتي',w?.task_home],['في محيطي',w?.task_community]].map(([t,v])=>'<div class="list-row" style="display:block"><strong>'+t+'</strong><p>'+esc(v)+'</p></div>').join('')+btn('go:myreport','سجلي تقريركِ','goldbtn')+'</div></div><div class="card" style="margin-top:15px"><h3>المواعيد والإعلانات</h3>'+rows('events').filter(e=>!e.family_id||e.family_id===state.profile?.family_id).slice(0,4).map(e=>'<p>'+esc(e.title)+' | '+date(e.starts_at)+'</p>').join('')+[...rows('announcements')].sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned)||(b.created_at||'').localeCompare(a.created_at||'')).slice(0,3).map(a=>'<p>'+(a.pinned?'📌 ':'')+esc(a.title)+'</p>').join('')+'</div>';
}
function myreport(){
const w=rows('weeks').find(x=>x.id===state.week)||currentWeek(),report=rows('reports_self').find(x=>x.student_id===state.account?.student_id&&x.week_id===w?.id)||{};
return heading('تقريري الأسبوعي','تراه منسقة الأسرة، وتُبنى عليه المتابعة')+'<div class="toolbar">'+selectWeeks()+'</div><form class="card" id="reportForm">'+field('أيام الورد (من ٠ إلى ٧)','wird_days',report.wird_days??0,'number',true)+[['task_self','في نفسي'],['task_home','في بيتي'],['task_community','في محيطي']].map(([key,label])=>field(label,key,report[key]||'none','text',true,[['done','أنجزت'],['partial','بعضها'],['none','لم أنجز']])+field('ماذا فعلتِ؟','note_'+key.split('_')[1],report['note_'+key.split('_')[1]]||'','textarea')).join('')+field('الدرس المنقول: ماذا نقلتِ؟','transferred_lesson',report.transferred_lesson||'','textarea')+field('إلى من؟ (دون أسماء)','transferred_to',report.transferred_to||'')+'<label class="field"><span>القراءة الفكرية</span><select name="thought_read">'+option('true','قرأتها',report.thought_read?'true':'false')+option('false','لم أقرأها',report.thought_read?'true':'false')+'</select></label><div class="notice">تبقى المحاسبة الشخصية في دفتركِ ولا تُكتب هنا.</div><button type="submit" class="btn">حفظ تقريري</button></form>';
}
function backupContactNotice(){
 const phone=String(setting('backup_phone','')||'').trim();
 const digits=asciiDigits(phone).replace(/[^0-9]/g,'');
 if(!digits||digits.length<7)return '';
 return '<div class="backup-contact-note" role="note"><div class="backup-contact-icon">'+iconSvg('phone')+'</div><div><strong>تعذّر عليكِ التواصل مع المرافقة؟</strong><p>يمكنكِ استخدام الرقم البديل المعتمد من إدارة البرنامج عند الحاجة.</p></div><a href="https://wa.me/'+encodeURIComponent(digits)+'" target="_blank" rel="noopener noreferrer" class="btn secondary smallbtn" dir="ltr">'+esc(phone)+'</a></div>';
}
function myaccount(){
const p=state.profile||{};return heading('حسابي','بيانات التواصل وتغيير كلمة المرور')+backupContactNotice()+'<form class="card" id="profileForm">'+field('بريد التواصل الإلكتروني','email',p.email||state.account?.email||'','email')+field('الهاتف','phone',p.phone||'','tel')+field('الجامعة','university',p.university||'')+field('الكلية','college',p.college||'')+field('المستوى الدراسي','study_level',p.study_level||'')+field('الحي','neighborhood',p.neighborhood||'') +birthDateField(birthDateOf(p.id)||'',false)+'<p class="small muted">يُستخدم تاريخ الميلاد لحساب شرط تعريف ولي الأمر، ولا يظهر لبقية أفراد الأسرة.</p><button type="submit" class="btn">حفظ بياناتي</button></form><div class="card" style="margin-top:15px"><h3>كلمة المرور</h3>'+field('كلمة المرور الجديدة','newpassword','','password')+btn('changepassword','تغيير كلمة المرور')+'</div>';
}
function page(){
switch(state.page){
case 'dashboard':return dashboard();case 'dashboardStudent':return dashboardStudentFile();case 'studentReport':return studentReportDetail();case 'weeks':case 'program':return weeks();case 'weekdetail':return weekDetails();case 'students':return students();case 'families':case 'myfamily':return families();case 'followups':case 'myfollowup':return followups();case 'cards':case 'mycard':return cards();case 'milestones':return milestones();case 'questions':case 'myquestions':return questions();case 'announcements':case 'notices':return announcements();case 'tasks':return tasks();case 'journal':return journal();case 'reports':return reports();case 'survey':return survey();case 'accounts':return accounts();case 'settings':return settings();case 'myweek':return myweek();case 'myreport':return myreport();case 'myaccount':return myaccount();default:return dashboard();}
}
function render(){window.__algharisatReady=true;document.title='الغارسات | معهد التأسيس الشرعي';$('#root').innerHTML=(!state.user?auth():!state.account||['pending','rejected','disabled'].includes(state.account.role)?pending():shell())+(state.notice?'<div class="toast app-toast '+(state.noticeError?'is-error':'is-success')+'" role="'+(state.noticeError?'alert':'status')+'"><span class="app-toast-icon" aria-hidden="true">'+(state.noticeError?'!':'✓')+'</span><div class="app-toast-content"><strong>'+(state.noticeError?'تنبيه':'تم بنجاح')+'</strong><p>'+esc(state.notice)+'</p></div><button type="button" data-action="dismissToast" class="app-toast-dismiss" aria-label="إغلاق الرسالة">×</button></div>':'');if(state.page==='students'&&team())updateStudentsView();if((state.page==='announcements'||state.page==='notices')&&state.communicationTab!=='resources'){markAnnouncementsRead();refreshAnnouncementIndicators()}rememberCurrentPage();}
function dialog(title,body,submit='حفظ'){const old=$('.dialog-backdrop');if(old)old.remove();const e=document.createElement('div');e.className='dialog-backdrop';e.innerHTML='<form id="modalForm" class="dialog"><div class="page-head"><h2>'+esc(title)+'</h2><button type="button" class="btn secondary smallbtn" data-action="close">إغلاق</button></div><div class="form-grid">'+body+'</div><div class="form-actions"><button class="btn" type="submit">'+esc(submit)+'</button></div></form>';document.body.appendChild(e)}
// Refresh the small notification signal without refreshing a user's in-progress form.
setInterval(async()=>{
if(!state.user||!state.account||['pending','rejected','disabled'].includes(state.account.role))return;
try{await read('announcements');if(state.page==='announcements'||state.page==='notices'){if(state.communicationTab!=='resources')markAnnouncementsRead();if(!document.querySelector('.dialog-backdrop'))render()}
else refreshAnnouncementIndicators()}catch(error){console.warn('تعذر تحديث إشعارات الإعلانات',error)}
},90000);
function formData(f){const o={};new FormData(f).forEach((v,k)=>o[k]=v);return o}
async function save(t,obj,conflict){const q=db.from(t).upsert(obj,conflict?{onConflict:conflict}:{});const{error}=await q;if(error)throw error;await read(t);flash('حُفظت التغييرات بنجاح')}
async function modal(action){
const [a,id]=action.split(':');state.editing={a,id};let o={};
if(a.startsWith('edit')){const tab={editstudent:'students',editweek:'weeks',editaccount:'accounts',edittask:'tasks',editjournal:'journal'}[a];o=rows(tab).find(x=>x.id===id||x.user_id===id)||{}}
const stSelect=[['','بلا أسرة'],...rows('families').map(x=>[x.id,x.name])];
switch(a){
case 'newstudent':case 'editstudent':
dialog('بيانات الغارسة',field('الاسم كاملًا','name',o.name||'','text',true)+field('الهاتف','phone',o.phone||'','tel')+field('البريد','email',o.email||'','email')+field('الأسرة','family_id',o.family_id||'','text',false,stSelect)+field('الحال','stage',o.stage||'candidate','text',true,[['candidate','مرشحة'],['accepted','مقبولة'],['selected_not','لم تختر'],['active','في البرنامج'],['paused','متوقفة مؤقتاً'],['withdrawn','خرجت']])+field('الجامعة','university',o.university||'')+field('الكلية','college',o.college||'')+field('المستوى','study_level',o.study_level||'')+field('الحي','neighborhood',o.neighborhood||'')+field('الحالة الاجتماعية','marital_status',o.marital_status||'','text',false,[['','غير محددة'],['single','عزباء'],['engaged','مخطوبة'],['married','متزوجة']])+field('قادت البرنامج السابق','led_before',String(!!o.led_before),'text',false,[['false','لا'],['true','نعم']])+birthDateField(birthDateOf(o.id)||'')+field('اسم ولي الأمر','guardian_name',o.guardian_name||'')+field('هاتف ولي الأمر','guardian_phone',o.guardian_phone||''));break;
case 'newgoal':dialog('هدف في الخطة الفردية',field('الجانب','aspect','الفقهي الشرعي','text',true,aspects.map(t=>[t,t]))+field('الهدف','goal','','textarea',true)+field('مقياس التحقق','measure','','textarea',true));break;
case 'newobservation':if(!leadership())throw Error('الملاحظات واللقاءات مخصصة للإدارة والمرافقة');dialog('ملاحظة المرافقة',field('الأسبوع','week_id',state.week||'','text',false,[['','غير مرتبط بأسبوع'],...sortedWeeks().map(w=>[w.id,w.title])])+field('نوع الملاحظة','kind','ملاحظة','text',true,['ملاحظة','لقاء فردي','حضور لقاء أسرة','لقاء الترشيح','تزكية','تعثر','ترشيح للإشراف',...(state.account.role==='murafiqa'?['حدود الستر']:[])].map(t=>[t,t]))+field('نص الملاحظة','note','','textarea',true)+(state.account.role==='murafiqa'?field('سرية الملاحظة','secret','false','text',true,[['false','غير سرية'],['true','سرية']]):''));break;
case 'newassessmentstage':case 'editassessmentstage':{
 if(!leadership())throw Error('إدارة مراحل التقييم للإدارة والمرافقة فقط');
 const existing=a==='editassessmentstage'?rows('assessment_stages').find(st=>st.code===id):null;
 if(a==='editassessmentstage'&&!existing)throw Error('مرحلة التقييم غير موجودة');
 dialog(existing?'تعديل اسم مرحلة التقييم':'إضافة مرحلة تقييم',field('اسم مرحلة التقييم','label',existing?.label||'','text',true)+'<p class="small muted">سيظهر الاسم في بطاقة الغارسة والتقارير، مع بقاء التقييمات المحفوظة دون تغيير.</p>');
 break;
}
case 'newfamily':dialog('إضافة أسرة',field('اسم الأسرة','name','','text',true)+field('يوم اللقاء','meeting_day')+field('ساعة اللقاء','meeting_time')+field('الرابط','meeting_url','','url'));break;
case 'bulkstudents':dialog('إضافة قائمة',field('الأسماء، اسم في كل سطر (ثم الهاتف والجامعة مفصولة بفاصلة)','bulk','','textarea',true));break;
case 'editweek':o=rows('weeks').find(w=>w.id===state.week)||{};dialog('تعديل جميع بيانات الأسبوع',field('رمز الأسبوع','code',o.code,'text',true)+field('العنوان','title',o.title,'text',true)+field('النوع','kind',o.kind,'text',true,[['prep','التحضير'],['program','المرحلة'],['break','ما بعدها']])+field('الترتيب','sort_order',o.sort_order,'number',true)+field('من','starts_on',o.starts_on,'date',true)+field('إلى','ends_on',o.ends_on,'date',true)+[['reflection','وقفة التدبر'],['lesson','الدرس العلمي'],['hadith','الأربعون'],['tilawa','جزء عمّ'],['riyad','رياض الصالحين'],['task_self','في نفسي'],['task_home','في بيتي'],['task_community','في محيطي'],['discussion','أسئلة مدارسة الأسرة'],['activity','نشاط الأسبوع'],['team_work','ما يجري سوى الإيقاع الثابت / عمل الفريق'],['deliverable','ما يكون في اليد في آخر الأسبوع']].map(([key,title])=>field(title,key,o[key],'textarea')).join(''));break;
case 'followup':o=rows('followups').find(f=>f.student_id===id&&f.week_id===state.week)||{};dialog('متابعة '+name('students',id),field('المجلس','majlis',o.majlis||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('لقاء الأسرة','family_meeting',o.family_meeting||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('أيام الورد','wird_days',o.wird_days??'','number')+['triple_task','transferred_lesson','rotating_task'].map((k,i)=>field(['المهمة الثلاثية','الدرس المنقول','المهمة الدوارة'][i],k,o[k]||'','text',false,[['','لم يسجل'],['done','أنجزت'],['partial','بعضها'],['none','لم تنجز']])).join('')+field('ملاحظة','note',o.note,'textarea'));break;
case 'reviewcard':{
const student=rows('students').find(student=>student.id===id);
const assessment=rows('cards').filter(c=>c.student_id===id&&c.stage==='self');
dialog('التقييم الذاتي · '+(student?.name||'الغارسة'),'<p class="muted small card-modal-hint">هذا التقييم سجلته الغارسة بنفسها، ويمكن للفريق الاطلاع عليه دون تعديله.</p>'+aspects.map(aspect=>{
const score=assessment.find(c=>c.aspect===aspect);
return '<div class="batch-review-row"><strong>'+esc(aspect)+'</strong><span class="batch-legend-value '+(score?'level-'+score.level:'unrated')+'">'+(score?esc(levels[score.level]||'لم يُقيّم'):'لم يُقيّم')+'</span>'+(score?.note?'<p>'+esc(score.note)+'</p>':'')+'</div>';
}).join(''));
document.querySelector('#modalForm button[type="submit"]')?.remove();
break;
}
case 'card':{
o=rows('cards').filter(c=>c.student_id===id);
const stage=team()?(cardStages.some(([key])=>key===state.cardStage)&&state.cardStage!=='self'?state.cardStage:'first'):'self';
dialog('تقييم جوانب الغارسة',field('مرحلة التقييم','stage',stage,'text',true,team()?cardStages.filter(([key])=>key!=='self'):cardStages.filter(([key])=>key==='self'))+
'<p class="muted small card-modal-hint">اختاري مستوى كل جانب عن قصد؛ عدم وجود تقييم لا يعني «لم تبدأ».</p>'+
aspects.map((aspect,i)=>field(aspect,'aspect'+i,o.find(c=>c.aspect===aspect&&c.stage===stage)?.level??'','text',true,[['','اختاري المستوى'],...levels.map((t,n)=>[String(n),t])])+
(team()?field('ملاحظة المرافقة · '+aspect,'note'+i,o.find(c=>c.aspect===aspect&&c.stage===stage)?.note||'','textarea'):'')).join(''));break;
}
case 'newquestion':dialog('سؤال جديد',field('نوع السؤال','kind','general','text',true,[['fiqh','فقهي'],['fikr','فكري'],['general','عام']])+field('نص السؤال','body','','textarea',true));break;
case 'answer':
if(!team())throw Error('الإجابة من صلاحيات الفريق');
o=rows('questions').find(x=>x.id===id)||{};
dialog('الجواب ومتابعة السؤال','<div class="question-modal-intro"><span class="question-pill kind-'+esc(o.kind||'general')+'">'+esc(questionKinds[o.kind]||'عام')+'</span><p>'+esc(o.body||'')+'</p></div>'+field('الجواب المعتمد','answer',o.answer||'','textarea')+field('الحالة','status',o.status||'open','text',true,[['open','جديد'],['sent','عند المرجعية'],['answered','أُجيب']])+field('النشر لجميع الغارسات دون اسم السائلة','published',String(!!o.published),'text',true,[['false','لا، لا يُنشر'],['true','نعم، ينشر بدون اسم']])+'<p class="muted small question-modal-help">لا يُنشر السؤال إلا إذا كانت حالته «أُجيب» وكانت الإجابة مكتوبة. للسؤال الفقهي المحال للمرجعية، سجّلي الجواب المعتمد حين يصل.</p>');break;
case 'newannouncement':case 'editannouncement':{
if(!team())throw Error('إدارة الإعلانات للفريق فقط');
o=a==='editannouncement'?rows('announcements').find(x=>x.id===id):{};
if(!o)throw Error('تعذر العثور على الإعلان');
dialog(a==='editannouncement'?'تعديل الإعلان':'إعلان جديد',
field('عنوان الإعلان','title',o.title||'','text',true)+
field('نص الإعلان','body',o.body||'','textarea',true)+
field('الجمهور','family_id',o.family_id||'','text',false,[['','جميع الغارسات'],...rows('families').map(f=>[f.id,f.name])])+
field('التثبيت في أعلى الإعلانات','pinned',String(!!o.pinned),'text',true,[['false','إعلان عادي'],['true','مثبت في الأعلى']]));break;
}
case 'newresource':case 'editresource':{
if(!team())throw Error('إدارة المصادر للفريق فقط');
o=a==='editresource'?rows('resources').find(x=>x.id===id):{};
if(!o)throw Error('تعذر العثور على المصدر');
dialog(a==='editresource'?'تعديل المصدر':'مصدر جديد',
field('عنوان المصدر','title',o.title||'','text',true)+
field('رابط المصدر','url',o.url||'','url',true)+
field('نوع المصدر','kind',o.kind||'link','text',true,[['recording','تسجيل'],['file','ملف'],['link','رابط']])+
field('الأسبوع المرتبط بالمصدر','week_id',o.week_id||'','text',false,[['','مصدر عام (لا يرتبط بأسبوع)'],...sortedWeeks().map(w=>[w.id,w.title])])+
field('ملاحظة','note',o.note||'','textarea')+
field('الترتيب (الأقل يظهر أولًا)','sort_order',o.sort_order??0,'number')+
'<div class="field resource-cover-field"><label for="resourceCoverMode">عرض صورة الغلاف (اختياري)</label><select name="cover_mode" id="resourceCoverMode">'+
[['auto','تلقائي لفيديو يوتيوب فقط'],['upload','رفع صورة من الجهاز'],['none','بدون غلاف']].map(([val,label])=>option(val,label,o.cover_mode||'auto')).join('')+'</select><p class="muted small">لو اخترتِ صورة، ارفعي ملف PNG أو JPG أو WebP. ما محتاج رابط للصورة.</p></div>'+
'<div id="resourceCoverUpload" class="resource-cover-upload" '+((o.cover_mode||'auto')!=='upload'?'hidden':'')+'><label for="resourceCoverFile">صورة الغلاف (حد أقصى ٣ ميغابايت)</label><input type="file" id="resourceCoverFile" name="cover_file" accept="image/jpeg,image/png,image/webp"/>'+
(o.cover_path?'<img class="resource-cover-preview" src="'+esc(resourceCoverUrl(o.cover_path))+'" alt="الغلاف الحالي" />':'<img class="resource-cover-preview" id="resourceCoverPreview" alt="معاينة الغلاف" hidden />')+
'<p class="muted small">يمكنكِ الاحتفاظ بالغلاف الحالي دون إعادة رفعه عند تعديل المصدر.</p></div>');break;
}
case 'newtask':case 'edittask':{if(!team())throw Error('إدارة التحضير والتشغيل للفريق فقط');const previous=a==='edittask';if(previous&&!o.id)throw Error('تعذر العثور على البند');dialog(previous?'تعديل البند':'إضافة بند جديد',field('القسم','section',o.section||'task','text',true,preparationSections.map(([value,label])=>[value,label]))+field('الأسبوع (للمهام الأسبوعية)','week_id',o.week_id||'','text',false,[['','غير مرتبطة بأسبوع'],...sortedWeeks().map(w=>[w.id,w.title])])+field('نص البند','body',o.body||'','textarea',true)+field('المسؤولة','owner',o.owner||'')+field('موعد الإنجاز','due_on',o.due_on||'','date')+field('ملاحظات التنفيذ','note',o.note||'','textarea')+(previous?'<div class="notice">يمكنكِ تعديل التفاصيل، وستظل حالة الإنجاز وتاريخها محفوظين.</div>':''));break;}
case 'newjournal':case 'editjournal':{
 if(!team())throw Error('سجل التجربة متاح للفريق فقط');
 const weeks=sortedWeeks().filter(w=>w.kind==='program');
 const existing=a==='editjournal';
 if(existing&&!o.id)throw Error('تعذر العثور على التدوين');
 const preferred=existing?o.week_id:(weeks.some(w=>w.id===id)?id:(weeks.some(w=>w.id===state.week)?state.week:weeks[0]?.id));
 dialog(existing?'تعديل تدوين الأسبوع':'تدوين أسبوع',field('الأسبوع','week_id',preferred||'','text',true,weeks.map(w=>[w.id,w.code?.replace('w','الأسبوع ')+' — '+w.title]))+
 field('ما نجح','success',o.success||'','textarea')+
 field('ما تعثّر','obstacle',o.obstacle||'','textarea')+
 field('القرار المتخذ','decision',o.decision||'','textarea')+
 '<p class="muted small">اكتبي ما حدث فعلًا في الأسبوع؛ ستظهر التدوينة في خلاصة مجلس التطوير.</p>');
 break;
}
case 'editaccount':case 'reviewaccount':{
 if(!leadership())throw Error('مراجعة الحسابات للإدارة والمرافقة فقط');
 const target=rows('accounts').find(a=>a.user_id===id);
 if(!target)throw Error('الحساب غير موجود');
 if(target.role==='admin'&&state.account?.role!=='admin')throw Error('تعديل حساب الإدارة متاح للإدارة فقط');
 const review=target.role==='pending'||target.role==='rejected';
 const matches=accountMatchCandidates(target);
 const suggested=state.studentToLink||target.student_id||(matches.length===1?matches[0].id:'');
 const opts=[['','اختاري سجل الغارسة'],...rows('students').filter(st=>!rows('accounts').some(acc=>acc.student_id===st.id&&acc.user_id!==target.user_id)).map(st=>[st.id,st.name])];
 const body='<div class="account-review-intro"><div><strong>'+esc(target.name)+'</strong><span>'+esc(target.email||'')+'</span></div><div><span>رقم الهاتف</span><strong dir="ltr">'+esc(target.phone||'غير مدخل')+'</strong></div><div><span>تاريخ الطلب</span><strong>'+esc(target.created_at?date(target.created_at):'—')+'</strong></div></div>'+
 field('الاسم المعتمد','name',target.name,'text',true)+
 field('الصفة المعتمدة','role',review?'gharisa':target.role,'text',true,[...accountRoles(),...(!review?[['disabled','موقوف']]:[])])+
 field('اللقب (اختياري)','title',target.title||'')+
 '<div class="account-link-fields" id="accountLinkFields"><p class="muted small">إذا كانت الصفة غارسة، اربطيها بسجل موجود أو أنشئي سجلًا جديدًا. لا يُنشأ سجل جديد عند اختيار صفة أخرى.</p>'+
 field('طريقة الربط','link_mode',suggested?'existing':'new','text',true,[['existing','ربط بسجل موجود'],['new','إنشاء سجل غارسة جديد']])+
 '<div id="accountExistingStudent">'+field('سجل الغارسة','student_id',suggested,'text',false,opts)+'</div>'+
 '<div id="accountNewStudent"><p class="muted small">سوف يُنشأ سجل باسم الغارسة وبريدها وهاتفها في حالة «مقبولة»، ويمكن استكمال بيانات الأسرة لاحقًا من صفحة الغارسات.</p></div></div>';
 dialog(review?'مراجعة طلب التسجيل':'تعديل الحساب',body,review?'اعتماد الحساب وحفظ الربط':'حفظ التعديلات');
 const roleSelect=document.querySelector('#f_role');
 const linkMode=document.querySelector('#f_link_mode');
 const apply=()=>{const wrap=document.querySelector('#accountLinkFields');if(!wrap)return;wrap.hidden=roleSelect?.value!=='gharisa';document.querySelector('#accountExistingStudent').hidden=linkMode?.value==='new';document.querySelector('#accountNewStudent').hidden=linkMode?.value!=='new'};
 apply();break;
}
case 'rejectaccount':{
 if(!leadership())throw Error('رفض الحسابات للإدارة والمرافقة فقط');
 const acc=rows('accounts').find(a=>a.user_id===id&&a.role==='pending');
 if(!acc)throw Error('الطلب غير موجود أو تمت مراجعته');
 dialog('رفض طلب التسجيل','<div class="account-rejection-note"><strong>'+esc(acc.name)+'</strong><span>'+esc(acc.email||'')+'</span></div>'+field('سبب عدم الموافقة (اختياري)','rejection_reason','','textarea')+'<p class="muted small">سيبقى الحساب محفوظًا في سجل الطلبات المرفوضة، ولن تتمكن صاحبته من فتح صفحات المنصة إلا إذا أعيد اعتماد حسابها.</p>','متابعة الرفض');
 document.querySelector('#modalForm button[type="submit"]')?.classList.add('dangerbtn');
 break;
}
case 'doc':o=rows('docs_family').find(d=>d.family_id===state.family&&d.kind===id)||{};dialog('وثيقة الأسرة',field('نص الوثيقة','body',o.body,'textarea',true));break;
case 'assignrole':dialog('توزيع مهمة دوارة',field('المهمة','task','munassiqa','text',true,[['munassiqa','المنسقة'],['fiqhiya','المسؤولة الفقهية'],['fikriya','المسؤولة الفكرية'],['ijtimaiya','المسؤولة الاجتماعية'],['ataa','مسؤولة العطاء']])+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name]))+field('الدورة','cycle',setting('current_cycle',1),'number',true));break;
case 'assignleader':dialog('مديرة اللقاء',field('الأسبوع','week_id',state.week,'text',true,rows('weeks').filter(x=>x.kind==='program').map(x=>[x.id,x.title]))+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name])));break;
case 'newevent':dialog('موعد جديد',field('عنوان الموعد','title','','text',true)+field('نوع الموعد','kind','مجلس','text',true,[['مجلس','مجلس'],['لقاء التأسيس','لقاء التأسيس'],['درس','درس'],['لقاء أسرة','لقاء أسرة'],['لقاء حضوري','لقاء حضوري'],['لقاء فردي','لقاء فردي'],['لقاء فريق','لقاء فريق'],['غيره','غيره']])+field('وقت الموعد (اختياري — يُحدّد لاحقًا)','starts_at','','datetime-local')+field('المدة بالدقائق','duration_minutes',90,'number')+field('الأسبوع','week_id',state.week||'','text',false,[['','غير مرتبط بأسبوع'],...sortedWeeks().map(w=>[w.id,w.title])])+field('الأسرة (اختياري)','family_id','','text',false,[['','للجميع'],...rows('families').map(f=>[f.id,f.name])])+field('المكان أو الرابط','place')+field('ملاحظات','notes','','textarea'));break;
case 'newminute':dialog('محضر لقاء',field('تاريخ اللقاء','meeting_date',new Date().toISOString().slice(0,10),'date')+field('الأسبوع','week_id',state.week,'text',false,rows('weeks').filter(w=>w.kind==='program').map(w=>[w.id,w.title]))+field('عدد الحاضرات','attendance_count','','number')+field('الخلاصة','summary','','textarea')+field('التكليف والقرارات','decisions','','textarea'));break;
default:return;
}
}
async function modalSave(f){
const {a,id}=state.editing||{};const x=formData(f),bo=v=>v==='true';
if(['newstudent','editstudent'].includes(a)){const dob=x.birth_date;delete x.birth_date;if(dob&&!validBirthDate(dob))throw Error('تاريخ الميلاد غير صحيح');x.family_id||=null;x.led_before=bo(x.led_before);x.marital_status||=null;const studentId=a==='editstudent'?id:crypto.randomUUID();x.id=studentId;await save('students',x);const query=dob?db.from('student_birthdates').upsert({student_id:studentId,birth_date:dob},{onConflict:'student_id'}):db.from('student_birthdates').delete().eq('student_id',studentId);const {error:dobError}=await query;if(dobError)throw dobError;await read('student_birthdates');render()}
else if(a==='newassessmentstage'||a==='editassessmentstage'){
 if(!leadership())throw Error('إدارة التقييمات للإدارة والمرافقة فقط');
 const label=String(x.label||'').trim();
 if(label.length<2||label.length>70)throw Error('اسم المرحلة يجب أن يكون من حرفين إلى ٧٠ حرفًا');
 if(rows('assessment_stages').some(st=>st.label===label&&st.code!==id))throw Error('يوجد تقييم بالاسم نفسه');
 if(a==='newassessmentstage'){
  const next=Math.max(40,...rows('assessment_stages').map(st=>Number(st.sort_order)||0))+1;
  if(next>100)throw Error('بلغت مراحل التقييم الحد الأقصى');
  const code='stage_'+crypto.randomUUID().replace(/-/g,'').slice(0,16);
  const{data,error}=await db.from('assessment_stages').insert({code,label,sort_order:next,is_self:false,is_system:false}).select('code');
  if(error)throw error;if(!data?.length)throw Error('تعذرت إضافة مرحلة التقييم');
  state.cardStage=code;
 }else{
  const{data,error}=await db.from('assessment_stages').update({label}).eq('code',id).select('code');
  if(error)throw error;if(!data?.length)throw Error('تعذر تغيير الاسم');
 }
 await refreshAssessmentStages();render();flash(a==='newassessmentstage'?'أضيفت مرحلة التقييم':'حُفظ اسم المرحلة');
}
else if(a==='newfamily')await save('families',x);else if(a==='newgoal'){if(rows('goals').filter(g=>g.student_id===id).length>=3)throw Error('الحد الأقصى ثلاثة أهداف للغارسة');await save('goals',{...x,student_id:id,done:false})}
else if(a==='newobservation'){if(!leadership())throw Error('الملاحظات واللقاءات مخصصة للإدارة والمرافقة');await save('observations',{...x,student_id:id,secret:state.account?.role==='murafiqa'&&bo(x.secret),week_id:x.week_id||null,author_id:state.user.id})}

else if(a==='bulkstudents'){const arr=x.bulk.split(/\n+/).map(s=>s.trim()).filter(Boolean).map(line=>{const [name,phone,university]=line.split(',');return{name:name.trim(),phone:phone?.trim(),university:university?.trim(),stage:'candidate'}});const{error}=await db.from('students').insert(arr);if(error)throw error;await read('students');flash('تمت إضافة '+arr.length+' غارسة')}
else if(a==='editweek'){x.sort_order=Number(x.sort_order);if(x.ends_on<x.starts_on)throw Error('تاريخ النهاية لا يمكن أن يسبق البداية');await save('weeks',{...x,id:state.week})}
else if(a==='followup'){for(const k of ['majlis','family_meeting','triple_task','transferred_lesson','rotating_task'])x[k]||=null;x.wird_days=x.wird_days===''?null:Number(x.wird_days);await save('followups',{...x,student_id:id,week_id:state.week,recorded_by:state.user.id},'student_id,week_id')}
else if(a==='card'){
const stage=team()?x.stage:'self';
if(!cardStages.some(([key])=>key===stage)||(team()&&stage==='self'))throw Error('مرحلة التقييم غير مسموحة');
const objects=aspects.map((aspect,i)=>{
const raw=x['aspect'+i];
if(raw===''||raw===undefined||!['0','1','2','3'].includes(String(raw)))throw Error('اختاري مستوى واضحًا لكل جانب، ولا يُعتبر الجانب غير المقيّم «لم تبدأ»');
return {student_id:id,aspect,stage,level:Number(raw),note:team()?(x['note'+i]||null):null,evaluator_id:state.user.id};
});
const{error}=await db.from('cards').upsert(objects,{onConflict:'student_id,aspect,stage'});if(error)throw error;
await read('cards');flash('حُفظ التقييم');
}
else if(a==='newquestion')await save('questions',{...x,student_id:state.account.student_id});
else if(a==='answer'){
if(!team())throw Error('الإجابة من صلاحيات الفريق');
const question=rows('questions').find(q=>q.id===id);
if(!question)throw Error('تعذر العثور على السؤال');
if(!['open','sent','answered'].includes(x.status))throw Error('حالة السؤال غير صحيحة');
if(x.status==='sent'&&question.kind!=='fiqh')throw Error('الإحالة إلى المرجعية الفقهية للأسئلة الفقهية فقط');
if(x.status==='answered'&&!String(x.answer||'').trim())throw Error('اكتبي الجواب قبل تغيير الحالة إلى أُجيب');
if(bo(x.published)&&x.status!=='answered')throw Error('النشر متاح بعد الإجابة فقط');
const changes={answer:String(x.answer||'').trim()||null,status:x.status,published:bo(x.published)&&x.status==='answered',answered_at:x.status==='answered'?(question.answered_at||new Date().toISOString()):null};
const {data:updated,error}=await db.from('questions').update(changes).eq('id',id).select('id');
if(error)throw error;
if(!updated?.length)throw Error('تعذر تحديث السؤال. تحققي من صلاحيات الحساب.');
await refreshQuestions();
flash('حُفظت إجابة السؤال وحالته بنجاح');
}
else if(a==='newannouncement'||a==='editannouncement'){
if(!team())throw Error('إدارة الإعلانات للفريق فقط');
const title=String(x.title||'').trim(),body=String(x.body||'').trim();
if(!title||!body)throw Error('اكتبي عنوان الإعلان ونصّه');
const obj={title,body,family_id:x.family_id||null,pinned:bo(x.pinned)};
if(a==='newannouncement')obj.author_id=state.user.id;
const request=a==='editannouncement'?db.from('announcements').update(obj).eq('id',id).select('id'):db.from('announcements').insert(obj).select('id');
const{data,error}=await request;if(error)throw error;
if(!data?.length)throw Error('لم يتم حفظ الإعلان؛ تحققي من صلاحياتك');
await read('announcements');flash(a==='editannouncement'?'عُدّل الإعلان بنجاح':'نُشر الإعلان بنجاح');
}
else if(a==='newresource'||a==='editresource'){
if(!team())throw Error('إدارة المصادر للفريق فقط');
const title=String(x.title||'').trim(),url=String(x.url||'').trim();
if(!title)throw Error('أدخلي عنوان المصدر');
if(!/^https?:\/\/\S+$/i.test(url))throw Error('الرابط يجب أن يبدأ بـ https:// أو http:// ويكون صالحًا');
if(!Object.hasOwn(resourceTypes,x.kind))throw Error('نوع المصدر غير صحيح');
const order=Number(x.sort_order??0);
if(!Number.isSafeInteger(order)||order<0)throw Error('الترتيب يجب أن يكون عددًا صحيحًا غير سالب');
const oldResource=a==='editresource'?rows('resources').find(r=>r.id===id):null;
if(a==='editresource'&&!oldResource)throw Error('المصدر غير موجود');
const mode=x.cover_mode||'auto';
if(!['auto','upload','none'].includes(mode))throw Error('اختيار عرض الغلاف غير صحيح');
const file=f.querySelector('#resourceCoverFile')?.files?.[0];
if(mode==='upload'&&!file&&!oldResource?.cover_path)throw Error('اختاري صورة الغلاف من جهازك، أو اختاري بدون غلاف');
if(mode==='upload'&&file){
if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('صورة الغلاف يجب أن تكون JPG أو PNG أو WebP');
if(file.size>3*1024*1024)throw Error('حجم صورة الغلاف أكبر من ٣ ميغابايت');
if(!file.size)throw Error('الصورة المختارة فارغة');
}
const obj={title,url,kind:x.kind,week_id:x.week_id||null,note:String(x.note||'').trim()||null,sort_order:order,cover_mode:mode,cover_path:mode==='upload'?(oldResource?.cover_path||null):null};
let uploadedPath='';
try{
if(mode==='upload'&&file){
const suffix=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
uploadedPath=state.user.id+'/'+crypto.randomUUID()+'.'+suffix;
const{error:uploadError}=await db.storage.from(RESOURCE_COVER_BUCKET).upload(uploadedPath,file,{cacheControl:'3600',contentType:file.type,upsert:false});
if(uploadError)throw new Error('تعذر رفع صورة الغلاف: '+uploadError.message);
obj.cover_path=uploadedPath;
}
const request=a==='editresource'?db.from('resources').update(obj).eq('id',id).select('id'):db.from('resources').insert(obj).select('id');
const{data,error}=await request;if(error)throw error;
if(!data?.length)throw Error('لم يتم حفظ المصدر؛ تحققي من صلاحياتك');
}catch(error){
if(uploadedPath)await db.storage.from(RESOURCE_COVER_BUCKET).remove([uploadedPath]).catch(()=>{});
throw error;
}
if(oldResource?.cover_path&&oldResource.cover_path!==obj.cover_path)db.storage.from(RESOURCE_COVER_BUCKET).remove([oldResource.cover_path]).then(({error})=>{if(error)console.warn('تعذر حذف الغلاف القديم',error)});
await read('resources');flash(a==='editresource'?'عُدّل المصدر بنجاح':'أُضيف المصدر بنجاح');
}
else if(a==='newtask'||a==='edittask'){
 if(!team())throw Error('إدارة البنود للفريق فقط');
 const body=String(x.body||'').trim();
 if(!body)throw Error('أدخلي نص البند');
 if(!preparationSections.some(([section])=>section===x.section))throw Error('القسم غير صالح');
 const value={section:x.section,body,owner:x.owner?.trim()||null,due_on:x.due_on||null,note:x.note?.trim()||null,week_id:x.section==='task'?(x.week_id||null):null};
 if(a==='edittask'){
  const {data,error}=await db.from('tasks').update(value).eq('id',id).select('id');if(error)throw error;if(!data?.length)throw Error('لم يُحفظ التعديل؛ تحققي من صلاحياتك');
 }else{const {data,error}=await db.from('tasks').insert(value).select('id');if(error)throw error;if(!data?.length)throw Error('تعذرت إضافة البند')}
 await read('tasks');flash(a==='edittask'?'عُدّل البند بنجاح':'أُضيف البند بنجاح');
}
else if(a==='newjournal'||a==='editjournal'){
 if(!team())throw Error('التدوين والتعديل للفريق فقط');
 const week=rows('weeks').find(w=>w.id===x.week_id&&w.kind==='program');
 if(!week)throw Error('اختاري أسبوعًا من أسابيع البرنامج');
 const content={success:String(x.success||'').trim(),obstacle:String(x.obstacle||'').trim(),decision:String(x.decision||'').trim()};
 if(!Object.values(content).some(Boolean))throw Error('أدخلي ما نجح أو ما تعثّر أو القرار المتخذ على الأقل');
 if(a==='newjournal'&&rows('journal').some(j=>j.week_id===week.id))throw Error('هذا الأسبوع له تدوين بالفعل. استخدمي زر تعديل في الجدول.');
 if(a==='editjournal'){
  const old=rows('journal').find(j=>j.id===id);
  if(!old)throw Error('التدوين المطلوب غير موجود');
  if(rows('journal').some(j=>j.week_id===week.id&&j.id!==id))throw Error('الأسبوع المختار له تدوين بالفعل');
  const {data,error}=await db.from('journal').update({...content,week_id:week.id}).eq('id',id).select('id');
  if(error)throw error;if(!data?.length)throw Error('تعذر تعديل التدوين؛ تحققي من الصلاحيات');
 }else{
  const {data,error}=await db.from('journal').insert({...content,week_id:week.id,author_id:state.user.id}).select('id');
  if(error)throw error;if(!data?.length)throw Error('تعذر حفظ التدوين؛ تحققي من الصلاحيات');
 }
 await read('journal');flash(a==='editjournal'?'تم تحديث تدوين الأسبوع':'تم حفظ تدوين الأسبوع');
}
else if(a==='editaccount'||a==='reviewaccount'){
 if(!leadership())throw Error('إدارة الحسابات للإدارة والمرافقة فقط');
 const account=rows('accounts').find(acc=>acc.user_id===id);
 if(!account)throw Error('الحساب غير موجود');
 const role=String(x.role||''),linkMode=String(x.link_mode||'');
 const createStudent=role==='gharisa'&&linkMode==='new';
 const selectedStudent=role==='gharisa'&&!createStudent?(x.student_id||null):null;
 if(role==='gharisa'&&!createStudent&&!selectedStudent)throw Error('اختاري سجل الغارسة أو أنشئي سجلًا جديدًا');
 const{error}=await db.rpc('review_account',{p_user_id:id,p_action:account.role==='pending'||account.role==='rejected'?'approve':'update',p_name:String(x.name||'').trim(),p_title:x.title||null,p_role:role,p_student_id:selectedStudent,p_create_student:createStudent,p_rejection_reason:null});
 if(error)throw error;
 await Promise.all([read('accounts'),read('students'),read('student_birthdates')]);
 state.studentToLink=null;
 flash(account.role==='pending'||account.role==='rejected'?'تم اعتماد الحساب وربطه بنجاح':'حُفظ تعديل الحساب بنجاح');
}
else if(a==='rejectaccount'){
 if(!leadership())throw Error('رفض الحسابات للإدارة والمرافقة فقط');
 if(!(await appConfirm({title:'تأكيد رفض الطلب',message:'سيظل حساب المتقدمة محفوظًا في الطلبات المرفوضة، ولن تستطيع استخدام المنصة حتى إعادة الموافقة. هل تريدين المتابعة؟',confirmText:'نعم، رفض الطلب',danger:true})))return;
 const{error}=await db.rpc('review_account',{p_user_id:id,p_action:'reject',p_rejection_reason:String(x.rejection_reason||'').trim()||null});
 if(error)throw error;await read('accounts');flash('تم تسجيل رفض الطلب');
}
else if(a==='doc')await save('docs_family',{...x,kind:id,family_id:state.family},'family_id,kind');
else if(a==='assignrole')await save('roles_family',{family_id:state.family,student_id:x.student_id,task:x.task,cycle:Number(x.cycle)},'family_id,task,cycle');
else if(a==='assignleader')await save('rota_leader',{family_id:state.family,week_id:x.week_id,student_id:x.student_id},'family_id,week_id');
else if(a==='newevent'){
 if(isFoundationMeeting(x.kind,x.title)){
  const launch=launchReadiness();
  if(!launch.ready)throw Error(launch.total===0?'أضيفي شروط الانطلاق أولًا قبل جدولة لقاء التأسيس':'لا يمكن جدولة لقاء التأسيس: تبقى '+launch.remaining.length+' من شروط الانطلاق');
 }
 await save('events',{...x,starts_at:x.starts_at||null,duration_minutes:Number(x.duration_minutes||90),week_id:x.week_id||null,family_id:x.family_id||null});
}
else if(a==='newminute')await save('minutes',{...x,family_id:state.family,attendance_count:x.attendance_count?Number(x.attendance_count):null,author_id:state.user.id});
$('.dialog-backdrop')?.remove();state.editing=null;render();
}
document.addEventListener('click',async e=>{
const el=e.target.closest('[data-action],[data-page],[data-week],[data-students-tab],[data-profile-tab],[data-follow-week],[data-follow-all],[data-followup-reset],[data-question-tab],[data-comms-tab]');
if(!el)return;
if(el.dataset.commsTab){if(!['announcements','resources'].includes(el.dataset.commsTab))return;state.communicationTab=el.dataset.commsTab;render();return}
if(el.dataset.questionTab){state.questionsTab=el.dataset.questionTab;render();return}
if(el.dataset.studentsTab){state.studentsTab=el.dataset.studentsTab;updateStudentsView();rememberCurrentPage();return}
if(el.dataset.profileTab){state.studentProfileTab=el.dataset.profileTab;render();return}
if(el.dataset.followWeek){if(el.dataset.followWeek===state.week)return;if(!(await confirmFollowupLeave()))return;state.week=el.dataset.followWeek;render();return}
if(el.hasAttribute('data-follow-all')){const form=document.querySelector('#followupForm');if(!form)return;form.querySelectorAll('[data-followup-field="majlis"],[data-followup-field="family_meeting"]').forEach(select=>{select.value='present'});markFollowupDirty();return}
if(el.hasAttribute('data-followup-reset')){if(!(await confirmFollowupLeave()))return;render();return}
if(el.dataset.page){if(!(await confirmFollowupLeave()))return;state.page=el.dataset.page;closeMobileMore();$('.dialog-backdrop')?.remove();render();window.scrollTo({top:0,behavior:'instant'});return}
if(el.dataset.week){if(!(await confirmFollowupLeave()))return;state.week=el.dataset.week;state.page='weekdetail';render();window.scrollTo(0,0);return}
const action=el.dataset.action;
try{
if(action==='install'){
if(deferredInstallPrompt){
const prompt=deferredInstallPrompt;deferredInstallPrompt=null;
await prompt.prompt();
const choice=await prompt.userChoice;
if(choice?.outcome==='accepted'){pwaStorageWrite('algharisat-installed','1');pwaStorageWrite(installFlag(),'1');render()}
}else{
const layer=document.createElement('div');layer.className='install-help-backdrop';
layer.innerHTML='<section class="install-help" role="dialog" aria-modal="true" aria-labelledby="install-help-title"><h2 id="install-help-title">أضيفي الغارسات إلى شاشة التليفون</h2><p><strong>آيفون:</strong> افتحي الموقع من Safari، ثم مشاركة، ثم «إضافة إلى الشاشة الرئيسية».</p><p><strong>أندرويد:</strong> افتحي الموقع من Chrome، ثم ⋮، ثم «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</p><p class="muted small">بعد الإضافة افتحي الغارسات من الأيقونة الجديدة.</p><div class="install-help-actions"><button type="button" class="btn secondary" data-action="closeInstallHelp">إغلاق</button><button type="button" class="btn goldbtn" data-action="installedManually">تم التثبيت</button></div></section>';document.body.appendChild(layer);layer.querySelector('[data-action="closeInstallHelp"]').focus();
}
}
else if(action==='dismissInstall'){pwaStorageWrite(dismissedFlag(),'1');render()}
else if(action==='closeInstallHelp'){document.querySelector('.install-help-backdrop')?.remove()}
else if(action==='installedManually'){pwaStorageWrite('algharisat-installed','1');pwaStorageWrite(installFlag(),'1');document.querySelector('.install-help-backdrop')?.remove();render()}
else if(action==='cancelLogout'){document.querySelector('.logout-confirm-backdrop')?.remove()}
else if(action==='confirmLogout'){el.disabled=true;try{const{error}=await db.auth.signOut();if(error)throw error;document.querySelector('.logout-confirm-backdrop')?.remove();state.user=null;state.account=null;render()}finally{el.disabled=false}}
else if(action==='dismissToast'){state.notice='';render()}
else if(action==='togglePassword'){
 const input=document.getElementById(el.getAttribute('aria-controls'));if(!input)return;
 const visible=input.type==='password';input.type=visible?'text':'password';
 el.setAttribute('aria-pressed',String(visible));const label=input.id==='f_password_confirm'?'تأكيد كلمة المرور':'كلمة المرور';el.setAttribute('aria-label',(visible?'إخفاء ':'إظهار ')+label);
 el.title=(visible?'إخفاء ':'إظهار ')+label;
 el.classList.toggle('is-visible',visible);
}
else if(action==='toggleTheme'){toggleTheme()}
else if(action==='signin'||action==='signup'){state.authTab=action;render()}
else if(action==='backweeks'){state.page=team()?'weeks':'program';render();window.scrollTo(0,0)}
else if(action==='reportthisweek'){state.page='myreport';render();window.scrollTo(0,0)}
else if(action==='logout'){logoutConfirmDialog()}
else if(action==='refresh')await start();
else if(action==='reset'){const email=await appConfirm({title:'استعادة كلمة المرور',message:'أدخلي بريدكِ الإلكتروني لإرسال رابط إعادة التعيين.',input:true,placeholder:'name@example.com',confirmText:'إرسال الرابط'});if(email){const{error}=await db.auth.resetPasswordForEmail(email,{redirectTo:location.href});if(error)throw error;flash('إن كان البريد مسجلاً، سيصلك رابط إعادة كلمة المرور')}}
else if(action==='close')$('.dialog-backdrop')?.remove();
else if(action==='print')window.print();
 else if(action.startsWith('accountsTab:')){if(!leadership())throw Error('هذا القسم للإدارة والمرافقة فقط');state.accountsTab=action.split(':')[1]==='current'?'current':'pending';render()}
 else if(action.startsWith('journalView:')){if(!team())throw Error('هذه الصفحة للفريق فقط');state.journalView=action.split(':')[1]==='review'?'review':'weeks';render()}
else if(action==='shiftcalendar'){
 if(!leadership())throw Error('إزاحة التقويم للإدارة والمرافقة فقط');
 const next=$('#f_first_start')?.value,current=rows('weeks').find(w=>w.code==='w1')?.starts_on;
 if(!next||!current||!/^\d{4}-\d{2}-\d{2}$/.test(next))throw Error('اختاري تاريخًا صحيحًا');
 const amount=(new Date(next+'T12:00:00Z')-new Date(current+'T12:00:00Z'))/86400000;
 if(!Number.isInteger(amount)||Math.abs(amount)>366)throw Error('الإزاحة غير صالحة أو تتجاوز سنة');
 if(new Date(next+'T12:00:00Z').getUTCDay()!==6)throw Error('يجب أن تبدأ أسابيع البرنامج يوم السبت');
 if(!amount){flash('لا توجد إزاحة؛ التاريخ لم يتغير');return}
 const verb=amount>0?'تأخير':'تقديم',days=Math.abs(amount);
 const summary=verb+' التقويم بمقدار '+days+' يوم.\nمن '+date(current)+' إلى '+date(next)+'.\nسيتغير موعد كل أسبوع وجميع الأحداث المسجلة مع الحفاظ على المحتوى. هل تريدين المتابعة؟';
 if(!(await appConfirm({title:'تأكيد '+verb+' التقويم',message:summary,confirmText:'نعم، '+verb+' '+days+' يوم',danger:true})))return;
 const{data,error}=await db.rpc('shift_program',{p_first_week:next});if(error)throw error;
 await load();flash('نجح '+verb+' التقويم بمقدار '+Math.abs(Number(data))+' يوم');
}
else if(action.startsWith('deleteassessmentstage:')){
 if(!leadership())throw Error('إدارة التقييمات للإدارة والمرافقة فقط');
 const code=action.split(':')[1],stage=rows('assessment_stages').find(st=>st.code===code);
 if(!stage||stage.is_system)throw Error('لا يمكن حذف مرحلة أساسية');
 if(rows('cards').some(c=>c.stage===code))throw Error('لا يمكن حذف مرحلة بها تقييمات محفوظة');
 if(!(await appConfirm({title:'حذف مرحلة التقييم',message:'هل تريدين حذف «'+stage.label+'»؟',confirmText:'حذف المرحلة',danger:true})))return;
 const{data,error}=await db.from('assessment_stages').delete().eq('code',code).select('code');
 if(error)throw error;if(!data?.length)throw Error('تعذر الحذف');
 await refreshAssessmentStages();render();flash('حُذفت مرحلة التقييم');
}
else if(action==='clearstudents'){state.studentsSearch='';state.studentsFamily='';state.studentsTab='all';render();updateStudentsView()}
else if(action.startsWith('rejectaccount:')){if(!leadership())throw Error('رفض الطلبات للإدارة والمرافقة فقط');await modal(action)}
 else if(action.startsWith('studentaccounts:')){if(!leadership())throw Error('ربط الحسابات متاح للإدارة والمرافقة فقط');state.studentToLink=action.split(':')[1];state.page='accounts';render();window.scrollTo(0,0)}
else if(action==='more'){try{await read('announcements');refreshAnnouncementIndicators()}catch(error){console.warn('تعذر تحديث الإعلانات قبل فتح القائمة',error)}showMobileMore()}
else if(action==='closeMore'){closeMobileMore()}
else if(action==='backStudentProfile'){state.page='dashboardStudent';render();window.scrollTo(0,0)}
else if(action.startsWith('studentReport:')){state.studentReportWeek=action.split(':')[1];state.page='studentReport';render();window.scrollTo(0,0)}
else if(action.startsWith('deleteannouncement:')||action.startsWith('deleteresource:')){
if(!team())throw Error('الحذف من صلاحيات الفريق فقط');
const isAnnouncement=action.startsWith('deleteannouncement:');
const id=action.split(':')[1],table=isAnnouncement?'announcements':'resources';
const record=rows(table).find(item=>item.id===id);
if(!record)throw Error('تعذر العثور على العنصر');
openDeleteConfirmation({type:isAnnouncement?'announcement':'resource',id,name:record.title});
}
else if(action.startsWith('deletequestion:')){
const id=action.split(':')[1],q=rows('questions').find(item=>item.id===id);
if(!q)throw Error('تعذر العثور على السؤال');
if(!team()&&!(q.student_id===state.account?.student_id&&q.status!=='answered'))throw Error('يمكنكِ حذف سؤالك قبل الإجابة فقط');
openDeleteConfirmation({type:'question',id,name:'السؤال'});
}
else if(action.startsWith('referquestion:')){
if(!team())throw Error('الإحالة إلى المرجعية للفريق فقط');
const id=action.split(':')[1],q=rows('questions').find(item=>item.id===id);
if(!q||q.kind!=='fiqh'||q.status!=='open')throw Error('يمكن إحالة سؤال فقهي جديد فقط');
const{error}=await db.from('questions').update({status:'sent',published:false}).eq('id',id).eq('kind','fiqh').eq('status','open');
if(error)throw error;
await read('questions');state.questionsTab='sent';render();flash('سُجّلت إحالة السؤال إلى المرجعية. أرسليه خارج المنصة واستلمي الجواب المعتمد.');
}
else if(action.startsWith('deletetask:')){
 if(!team())throw Error('حذف البنود للفريق فقط');
 const id=action.split(':')[1],item=rows('tasks').find(t=>t.id===id);
 if(!item)throw Error('البند غير موجود');
 openDeleteConfirmation({type:'task',id,name:item.body});
}
else if(action.startsWith('deleteStudent:')){if(!leadership())throw Error('حذف السجل للإدارة والمرافقة فقط');const id=action.split(':')[1],student=rows('students').find(x=>x.id===id);if(!student)throw Error('تعذر العثور على السجل');if(rows('accounts').some(a=>a.student_id===id))throw Error('السجل مربوط بحساب. افصلي ربط الحساب من صفحة الحسابات قبل الحذف');openDeleteConfirmation({type:'student',id,name:student.name})}
else if(action==='cancelDelete'){closeDeleteConfirmation()}
else if(action==='confirmDelete'){
const pending=deletePending;if(!pending)return;if(pending.type==='student'&&!leadership())throw Error('حذف السجل للإدارة والمرافقة فقط');
el.disabled=true;
try{
if(pending.type==='task'){
 if(!team())throw Error('حذف البنود للفريق فقط');
 const {data,error}=await db.from('tasks').delete().eq('id',pending.id).select('id');
 if(error)throw error;
 if(!data?.length)throw Error('لم يُحذف البند؛ تحققي من صلاحياتك');
 closeDeleteConfirmation();await read('tasks');render();flash('حُذف البند بنجاح');
 }else if(pending.type==='student'){
const{error}=await db.from('students').delete().eq('id',pending.id);
if(error)throw new Error('تعذر حذف السجل؛ قد تكون له متابعات أو تقارير مرتبطة. '+error.message);
await read('students');closeDeleteConfirmation();state.page='students';render();flash('حُذف سجل الغارسة');
}else if(pending.type==='announcement'||pending.type==='resource'){
if(!team())throw Error('الحذف من صلاحيات الفريق فقط');
const table=pending.type==='announcement'?'announcements':'resources';
const current=rows(table).find(item=>item.id===pending.id);
if(!current)throw Error('العنصر غير موجود');
const{data,error}=await db.from(table).delete().eq('id',pending.id).select('id');
if(error)throw error;
if(!data?.length)throw Error('لم يتم الحذف؛ تحققي من صلاحياتك');
closeDeleteConfirmation();
await read(table);
render();flash(pending.type==='announcement'?'حُذف الإعلان':'حُذف المصدر');
}else if(pending.type==='question'){
const q=rows('questions').find(x=>x.id===pending.id);
if(!q||(!team()&&!(q.student_id===state.account?.student_id&&q.status!=='answered')))throw Error('غير مصرح بحذف هذا السؤال');
const{error}=await db.from('questions').delete().eq('id',pending.id);
if(error)throw error;
closeDeleteConfirmation();await refreshQuestions();render();flash('حُذف السؤال بنجاح');
}
}finally{el.disabled=false}
}
else if(action.startsWith('viewstudent:')){state.studentProfileTab='data';state.studentFileReturn=state.page==='students'?'students':'dashboard';state.dashboardStudent=action.split(':')[1];state.page='dashboardStudent';render();window.scrollTo(0,0)}
else if(action.startsWith('go:')){state.page=action.split(':')[1];render()}
else if(action==='changepassword'){const password=$('#f_newpassword').value;if(password.length<6)throw Error('كلمة المرور يجب أن تتكون من ستة أحرف على الأقل');const{error}=await db.auth.updateUser({password});if(error)throw error;flash('تغيرت كلمة المرور')}
else if(action==='togglesurvey'){if(!leadership())throw Error('غير مصرح');await save('settings',{key:'survey_open',value:!setting('survey_open',false)});render()}
else if(action==='saveSurveyRound'){if(!leadership())throw Error('غير مصرح');if(setting('survey_open',false))throw Error('أغلقي الاستبانة قبل تغيير الجولة');const value=$('#surveyRoundInput')?.value?.trim();if(!/^[A-Za-z0-9_-]{1,32}$/.test(value||''))throw Error('رمز الجولة غير صالح');await save('settings',{key:'survey_round',value});render();flash('حُفظت الجولة الحالية')}
else await modal(action);
}catch(err){flash(err.message||'تعذر تنفيذ الإجراء',true)}
});
document.addEventListener('input',event=>{if(event.target?.id==='resourceCoverFile'){
const file=event.target.files?.[0],preview=document.querySelector('.resource-cover-preview');
if(preview&&file){
if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>3*1024*1024){event.target.value='';flash('الصورة يجب أن تكون JPG أو PNG أو WebP وأقل من ٣ ميغابايت',true);return}
const reader=new FileReader();reader.onload=()=>{if(document.body.contains(preview)){preview.src=reader.result;preview.hidden=false}};reader.readAsDataURL(file)
}
}
if(event.target?.id==='studentsSearch'){state.studentsSearch=event.target.value;updateStudentsView();rememberCurrentPage()}if(event.target?.closest('#followupForm')&&event.target?.matches('[data-followup-field]'))markFollowupDirty()});
document.addEventListener('change',async e=>{
const el=e.target;
try{
if(el.closest('#followupForm')&&el.matches('[data-followup-field]')){markFollowupDirty();return}
if(el.id==='f_role'||el.id==='f_link_mode'){
 const role=document.querySelector('#f_role')?.value,mode=document.querySelector('#f_link_mode')?.value;
 const wrap=document.querySelector('#accountLinkFields');
 if(wrap){wrap.hidden=role!=='gharisa';document.querySelector('#accountExistingStudent').hidden=mode==='new';document.querySelector('#accountNewStudent').hidden=mode!=='new'}
 return;
 }
 if(el.id==='resourceCoverMode'){const field=document.querySelector('#resourceCoverUpload');if(field)field.hidden=el.value!=='upload';return}
if(el.dataset.select==='resourceWeekFilter'){state.resourceWeekFilter=el.value;render();return}
if(el.dataset.select==='studentsFamily'){state.studentsFamily=el.value;updateStudentsView();rememberCurrentPage()}
else if(el.dataset.select==='week'){if(!(await confirmFollowupLeave())){el.value=state.week;return}state.week=el.value;render()}
else if(el.dataset.select==='cardStage'){state.cardStage=el.value;render()}
else if(el.dataset.select==='period'){state.period=el.value;render()}
else if(el.dataset.select==='family'){if(!team()){el.value=ownFamilyId()||'';throw Error('يمكنكِ عرض أسرتكِ فقط')}if(!(await confirmFollowupLeave())){el.value=state.family||'';return}state.family=el.value;render()}
else if(el.dataset.cardGoal){if(!team())throw Error('تعديل إنجاز الأهداف للفريق فقط');const goalId=el.dataset.cardGoal,studentId=el.dataset.cardStudent;const{error}=await db.from('goals').update({done:el.checked}).eq('id',goalId).eq('student_id',studentId);if(error)throw error;await read('goals');render()}
else if(el.dataset.profileGoal){if(!team())throw Error('تعديل الأهداف للفريق فقط');const goalId=el.dataset.profileGoal;const{error}=await db.from('goals').update({done:el.checked}).eq('id',goalId).eq('student_id',state.dashboardStudent);if(error)throw error;await read('goals');render()}
else if(el.dataset.milestone){
if(!team())throw Error('تعديل المخرجات للفريق فقط');
const [student_id,code]=el.dataset.milestone.split(':');
const student=rows('students').find(s=>s.id===student_id);
if(!student||student.stage!=='active'||!milestoneNames.some(([id])=>id===code))throw Error('بيانات الغارسة أو المخرج غير صحيحة');
if(code==='guardian'&&studentUnder20(student)!==true)throw Error(studentUnder20(student)===null?'أدخلي تاريخ الميلاد أولًا لتحديد استحقاق تعريف ولي الأمر':'تعريف ولي الأمر غير مطلوب لهذه الغارسة');
el.disabled=true;
const previously=rows('milestones').find(m=>m.student_id===student_id&&m.code===code);
try{
await save('milestones',{student_id,code,done:el.checked,done_at:el.checked?(previously?.done_at||new Date().toISOString()):null},'student_id,code');
}catch(error){el.checked=!el.checked;throw error}
}
else if(el.dataset.task){
 if(!team())throw Error('تحديث البنود للفريق فقط');
 const previous=rows('tasks').find(t=>t.id===el.dataset.task);
 const {data,error}=await db.from('tasks').update({done:el.checked,done_at:el.checked?(previous?.done_at||new Date().toISOString()):null}).eq('id',el.dataset.task).select('id');
 if(error)throw error;if(!data?.length)throw Error('لم تُحفظ الحالة؛ تحققي من صلاحياتك');
 await read('tasks');render();
}
}catch(err){flash(err.message||'تعذر الحفظ',true)}
});
document.addEventListener('submit',async e=>{
if(!['authForm','modalForm','reportForm','settingsForm','surveyForm','profileForm','followupForm'].includes(e.target.id))return;
e.preventDefault();
const f=e.target,x=formData(f);
const submit=f.querySelector('button[type="submit"]');
if(submit?.disabled)return;
if(submit)submit.disabled=true;
try{
if(f.id==='authForm'){
if(state.authTab==='signup'){if(!validBirthDate(x.birth_date))throw Error('أدخلي تاريخ ميلاد صحيحًا');if((x.password||'').length<6)throw Error('كلمة المرور يجب أن تتكون من ستة أحرف على الأقل');if(x.password!==x.password_confirm)throw Error('كلمة المرور وتأكيدها غير متطابقتين');const code=asciiDigits(x.phone_code).trim(),local=asciiDigits(x.phone_local).trim();if(!/^\+[1-9][0-9]{0,2}$/.test(code))throw Error('مفتاح الدولة يبدأ بعلامة + ويتبعه من رقم إلى ثلاثة أرقام');if(!/^[0-9]{9}$/.test(local))throw Error('رقم الهاتف بعد المفتاح يجب أن يتكون من ٩ أرقام بالضبط');const phone=code+local;const{data,error}=await db.auth.signUp({email:x.email,password:x.password,options:{data:{full_name:x.full_name,phone,birth_date:x.birth_date}}});if(error)throw error;if(data.session){await start();flash('تم إنشاء الحساب وتسجيل الدخول. حسابك بانتظار موافقة الإدارة.')}else{flash('تم إرسال طلب التسجيل، لكن إعداد تأكيد البريد ما زال مفعلًا في Supabase. راجعي الإدارة لإيقافه.')}}
else{
loginInProgress=true;
const status=document.createElement('p');status.setAttribute('role','status');status.style.cssText='margin-top:12px;font-weight:600;color:#172843';status.textContent='جارٍ التحقق من البريد وكلمة المرور…';f.appendChild(status);
try{
const{data,error}=await withTimeout(db.auth.signInWithPassword({email:x.email.trim(),password:x.password}),12000);
if(error)throw Error(error.status===400?'تعذر الدخول، تحققي من البريد وكلمة المرور':error.message||'تعذر تسجيل الدخول');
if(!data?.user||!data.session)throw Error('تعذر إكمال جلسة الدخول، حاولي مرة أخرى.');
status.textContent='تم التحقق من الحساب، جارٍ فتح لوحة الغارسة…';
const{data:account,error:profileError}=await withTimeout(db.from('accounts').select('*').eq('user_id',data.user.id).maybeSingle(),12000);
if(profileError)throw Error('تم تسجيل الدخول، لكن تعذر قراءة الصلاحيات. '+profileError.message);
state.user=data.user;state.account=account;
if(account&&!['pending','rejected','disabled'].includes(account.role)){
state.page=['admin','murafiqa','musaida'].includes(account.role)?'dashboard':'myweek';
render();
load().then(()=>render()).catch(err=>{console.error(err);flash('دخلتِ حسابكِ، لكن بعض البيانات لم تُحمّل. أعيدي تحديث الصفحة.',true)});
}else{render()}
}catch(error){status.textContent='تعذر إكمال الدخول: '+(error.message||'خطأ غير معروف');status.style.color='#a12525';throw error}
finally{loginInProgress=false}
}}
else if(f.id==='modalForm')await modalSave(f);
else if(f.id==='followupForm')await saveFollowupTable(f);
else if(f.id==='reportForm'){if(!state.account?.student_id)throw Error('حسابك غير مربوط بسجل الغارسة؛ أعيدي فتح المنصة بعد تحديث الصفحة');if(!state.week)throw Error('اختاري الأسبوع أولًا');x.wird_days=Number(x.wird_days);x.thought_read=x.thought_read==='true';await save('reports_self',{...x,student_id:state.account.student_id,week_id:state.week},'student_id,week_id')}
else if(f.id==='settingsForm'){
 if(!team())throw Error('الإعدادات للفريق فقط');
 const cycle=Number(x.current_cycle),backup=String(x.backup_phone||'').trim();
 if(!Number.isSafeInteger(cycle)||cycle<1||cycle>1000)throw Error('رقم الدورة يجب أن يكون عددًا صحيحًا موجبًا');
 if(backup&&!/^\+?[0-9٠-٩۰-۹\s-]{7,22}$/.test(backup))throw Error('رقم التواصل البديل غير صالح');
 if(!String(x.program_name||'').trim()||!String(x.stage_name||'').trim())throw Error('اسم البرنامج والمرحلة مطلوبان');
 if(String(x.welcome||'').length>250)throw Error('عبارة الترحيب طويلة جدًا');
 for(const [key,value] of Object.entries(x))await save('settings',{key,value:key==='current_cycle'?cycle:String(value).trim()});
 render();flash('حُفظت إعدادات البرنامج بنجاح');
}
else if(f.id==='surveyForm'){const{error}=await db.rpc('submit_survey',{p_answers:[0,1,2,3,4].map(i=>x['q'+i]),p_round:String(setting('survey_round','p1'))});if(error)throw error;await read('done_survey');render();flash('جزاكِ الله خيرًا. وصلت إجابتكِ')}
else if(f.id==='profileForm'){const{error}=await db.rpc('update_my_profile',{p_phone:x.phone,p_email:x.email,p_university:x.university,p_college:x.college,p_study_level:x.study_level,p_neighborhood:x.neighborhood});if(error)throw error;if(x.birth_date){if(!validBirthDate(x.birth_date))throw Error('تاريخ الميلاد غير صحيح');const {error:birthError}=await db.rpc('set_my_birth_date',{p_birth_date:x.birth_date});if(birthError)throw birthError}const{data:accountInfo,error:accountError}=await db.from('accounts').select('student_id').eq('user_id',state.user.id).single();if(accountError)throw accountError;state.account.student_id=accountInfo.student_id;await load();flash('حُفظت بياناتكِ الشخصية بنجاح')}
}catch(err){console.error(err);const message=String(err?.message||'');const match=message.match(/(?:after|in)\s+(\d+)\s+seconds?/i);const throttled=err?.status===429||/for security purposes|rate limit|too many requests/i.test(message);flash(err?.code==='over_email_send_rate_limit'?'تعذّر إنشاء الحساب: بلغت رسائل تأكيد البريد حدّ الإرسال في Supabase. على الإدارة إيقاف Confirm Email من إعدادات Email؛ لا يكفي الانتظار بضع ثوانٍ.':throttled?'تم رفض الطلب مؤقتًا بسبب كثرة المحاولات. انتظري قليلًا ثم حاولي مرة واحدة.':(/row-level security|permission denied|غير مصرح/i.test(message)?'تعذر الحفظ بسبب صلاحيات الحساب أو عدم ارتباطه بسجل الغارسة. حدّثي الصفحة، وتأكدي من اعتماد الحساب وربطه؛ وإن استمرت المشكلة راجعي الإدارة. ('+esc(err?.code||'')+')':message||'تعذر الحفظ، تحققي من الاتصال'),true)}finally{if(submit)submit.disabled=false}
});

/* Real custom option popovers while retaining native select state for form and
   existing app change handlers. Enhanced once per rendered DOM select. */
let openChoiceMenu=null,choiceSequence=0;
function closeChoiceMenu({restoreFocus=false}={}){
 if(!openChoiceMenu)return;
 const {menu,trigger}=openChoiceMenu;
 openChoiceMenu=null;
 menu.remove();
 trigger.setAttribute('aria-expanded','false');
 trigger.classList.remove('is-open');
 if(restoreFocus&&trigger.isConnected)trigger.focus();
}
function choiceLabel(select){
 const label=select.id?document.querySelector('label[for="'+CSS.escape(select.id)+'"]'):null;
 const wrapperLabel=select.closest('label');
 return select.getAttribute('aria-label')||label?.textContent?.trim()||wrapperLabel?.querySelector('span')?.textContent?.trim()||'اختيار من القائمة';
}
function syncChoiceTrigger(select){
 const trigger=select.closest('.ui-choice')?.querySelector('.ui-choice-trigger');
 if(!trigger)return;
 const text=trigger.querySelector('.ui-choice-value');
 if(text)text.textContent=select.selectedOptions[0]?.textContent?.trim()||'اختاري من القائمة';
 trigger.disabled=select.disabled;
 trigger.classList.toggle('is-placeholder',!select.value);
}
function enhanceChoiceSelect(select){
 if(select.dataset.choiceEnhanced||select.multiple||select.size>1)return;
 select.dataset.choiceEnhanced='true';
 const holder=document.createElement('span');
 holder.className='ui-choice';
 select.before(holder);
 holder.appendChild(select);
 select.classList.add('ui-choice-native');
 select.tabIndex=-1;
 select.setAttribute('aria-hidden','true');
 const trigger=document.createElement('button');
 trigger.type='button';
 trigger.className='ui-choice-trigger';
 trigger.setAttribute('aria-label',choiceLabel(select));
 trigger.setAttribute('aria-haspopup','listbox');
 trigger.setAttribute('aria-expanded','false');
 trigger.innerHTML='<span class="ui-choice-value"></span><svg class="ui-choice-arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
 holder.appendChild(trigger);
 syncChoiceTrigger(select);
 trigger.addEventListener('click',()=>{if(openChoiceMenu?.trigger===trigger){closeChoiceMenu();return}openChoicePopover(select,trigger)});
 trigger.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='ArrowUp'||e.key==='Home'||e.key==='End'||e.key===' '||e.key==='Enter'){
   e.preventDefault();
   const wasClosed=!openChoiceMenu||openChoiceMenu.trigger!==trigger;
   if(wasClosed)openChoicePopover(select,trigger);
   if(!openChoiceMenu)return;
   if(wasClosed&&(e.key===' '||e.key==='Enter'))return;
   const enabled=[...select.options].map((opt,i)=>!opt.disabled&&!opt.hidden?i:-1).filter(i=>i>=0);
   if(!enabled.length)return;
   const current=openChoiceMenu.active;
   let next=current;
   if(e.key==='Home')next=enabled[0];
   else if(e.key==='End')next=enabled[enabled.length-1];
   else if(e.key==='ArrowDown')next=enabled[(enabled.indexOf(current)+1)%enabled.length];
   else if(e.key==='ArrowUp')next=enabled[(enabled.indexOf(current)-1+enabled.length)%enabled.length];
   else if(e.key==='Enter'||e.key===' '){if(openChoiceMenu.active>=0)commitChoice(select,openChoiceMenu.active);return}
   setActiveChoice(next);
  }else if(e.key==='Escape'&&openChoiceMenu?.trigger===trigger){e.preventDefault();closeChoiceMenu({restoreFocus:true})}
 });
}
function setActiveChoice(index){
 if(!openChoiceMenu||index==null)return;
 const {menu,trigger}=openChoiceMenu;openChoiceMenu.active=index;
 for(const option of menu.querySelectorAll('[role="option"]')){
  const active=Number(option.dataset.choiceIndex)===index;
  option.classList.toggle('is-highlighted',active);
  if(active){trigger.setAttribute('aria-activedescendant',option.id);option.scrollIntoView({block:'nearest'})}
 }
}
function commitChoice(select,index){
 const option=select.options[index];
 if(!option||option.disabled||option.hidden)return;
 const changed=select.selectedIndex!==index;
 select.selectedIndex=index;
 syncChoiceTrigger(select);
 closeChoiceMenu({restoreFocus:true});
 if(changed)select.dispatchEvent(new Event('change',{bubbles:true}));
}
function openChoicePopover(select,trigger){
 if(select.disabled)return;
 closeChoiceMenu();
 const menu=document.createElement('div');
 menu.className='ui-choice-popover';
 menu.id='ui-choice-menu-'+(++choiceSequence);
 menu.setAttribute('role','listbox');
 menu.setAttribute('aria-label',choiceLabel(select));
 menu.dir='rtl';
 const selected=select.selectedIndex;
 [...select.options].forEach((opt,i)=>{
  if(opt.hidden)return;
  const entry=document.createElement('button');
  entry.type='button';entry.className='ui-choice-option';
  entry.id=menu.id+'-option-'+i;entry.dataset.choiceIndex=String(i);
  entry.setAttribute('role','option');
  entry.setAttribute('aria-selected',String(i===selected));
  entry.disabled=opt.disabled;
  const title=document.createElement('span');
  title.className='ui-choice-option-text';title.textContent=opt.textContent.trim();
  const check=document.createElement('span');check.className='ui-choice-check';
  check.textContent='✓';check.setAttribute('aria-hidden','true');
  entry.append(title,check);
  if(i===selected)entry.classList.add('is-selected');
  entry.addEventListener('click',()=>commitChoice(select,i));
  entry.addEventListener('pointerenter',()=>{if(openChoiceMenu?.menu===menu)setActiveChoice(i)});
  menu.appendChild(entry);
 });
 if(!menu.children.length)return;
 document.body.appendChild(menu);
 const rect=trigger.getBoundingClientRect();
 const maxWidth=Math.max(210,window.innerWidth-20);
 const width=Math.min(maxWidth,Math.max(rect.width,250));
 const left=Math.max(10,Math.min(rect.right-width,window.innerWidth-width-10));
 const below=window.innerHeight-rect.bottom-12,above=rect.top-12;
 const upward=below<190&&above>below;
 const available=Math.max(120,upward?above:below);
 const height=Math.min(340,available);
 menu.style.width=width+'px';menu.style.maxHeight=height+'px';
 menu.style.left=left+'px';
 menu.style.top=(upward?Math.max(10,rect.top-Math.min(menu.scrollHeight,height)-6):Math.min(window.innerHeight-height-10,rect.bottom+6))+'px';
 trigger.setAttribute('aria-expanded','true');
 trigger.setAttribute('aria-controls',menu.id);
 trigger.classList.add('is-open');
 openChoiceMenu={menu,trigger,select,active:selected};
 setActiveChoice(selected>=0?selected:[...select.options].findIndex(o=>!o.disabled&&!o.hidden));
}
function enhanceChoiceSelects(){
 for(const select of document.querySelectorAll('select:not([data-choice-enhanced])'))enhanceChoiceSelect(select);
 if(openChoiceMenu&&!openChoiceMenu.trigger.isConnected)closeChoiceMenu();
}
function installChoiceSelects(){
 enhanceChoiceSelects();
 const observer=new MutationObserver(records=>{
  if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('select:not([data-choice-enhanced])')||n.querySelector?.('select:not([data-choice-enhanced])')))))enhanceChoiceSelects();
  if(openChoiceMenu&&!openChoiceMenu.trigger.isConnected)closeChoiceMenu();
 });
 observer.observe(document.body,{childList:true,subtree:true});
 document.addEventListener('change',e=>{if(e.target.matches?.('select[data-choice-enhanced]'))syncChoiceTrigger(e.target)},true);
 document.addEventListener('pointerdown',e=>{if(openChoiceMenu&&!openChoiceMenu.menu.contains(e.target)&&!openChoiceMenu.trigger.contains(e.target))closeChoiceMenu()},true);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&openChoiceMenu){e.preventDefault();closeChoiceMenu({restoreFocus:true})}},true);
 window.addEventListener('resize',()=>closeChoiceMenu());
 document.addEventListener('scroll',e=>{if(openChoiceMenu&&!openChoiceMenu.menu.contains(e.target))closeChoiceMenu()},{capture:true,passive:true});
}

render();
installChoiceSelects();
db.rpc('public_welcome_message').then(({data,error})=>{if(!error&&typeof data==='string'){state.publicWelcome=data;if(!state.user)render()}}).catch(e=>console.warn('تعذر قراءة الترحيب',e));
start().catch(err=>{console.error(err);$('#root').innerHTML='<div class="card" style="margin:30px"><h2>تعذر تحميل المنصة</h2><p>تحققي من الاتصال بالإنترنت ثم أعيدي تحميل الصفحة.</p></div>'});
