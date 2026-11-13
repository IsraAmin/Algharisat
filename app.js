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
const state={user:null,account:null,profile:null,page:'dashboard',rows:{},week:null,family:null,editing:null,notice:'',authTab:'signin',period:'all'};
const iconPaths={"layout-dashboard":"<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/>","calendar-days":"<path d=\"M8 2v4M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01\"/>","users-round":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\"/>","house":"<path d=\"m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/><path d=\"M9 21v-8h6v8\"/>","clipboard-check":"<rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"4\" rx=\"1\"/><path d=\"m9 14 2 2 4-4\"/>","id-card":"<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><circle cx=\"8\" cy=\"11\" r=\"2\"/><path d=\"M4 17a4 4 0 0 1 8 0M15 10h4M15 14h4\"/>","flag":"<path d=\"M4 22V4m0 1c4-4 8 4 12 0v12c-4 4-8-4-12 0\"/>","message-circle-question":"<path d=\"M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z\"/><path d=\"M10 9a2 2 0 1 1 3 1.7c-.7.4-1 1-1 1.8M12 16h.01\"/>","megaphone":"<path d=\"m3 11 18-5v12L3 13z\"/><path d=\"M11 14.5 13 21H8l-2-7\"/>","list-todo":"<rect x=\"3\" y=\"5\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"m4 8 2 2 3-4M13 8h8M3 17h6M13 17h8\"/>","notebook-pen":"<path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M8 2v20M12 13h4\"/><path d=\"m14 7 5-5 3 3-5 5-4 1z\"/>","chart-column-increasing":"<path d=\"M3 3v18h18M7 16v-4M12 16V9M17 16V5\"/>","heart":"<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z\"/>","shield-check":"<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"m9 12 2 2 4-4\"/>","settings":"<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .3 1.8l-1.9 1.9A1.65 1.65 0 0 0 16 18.4a1.65 1.65 0 0 0-1.1.6V21h-2.7a1.65 1.65 0 0 0-1.1-1.6 1.65 1.65 0 0 0-1.8.3l-1.9-1.9A1.65 1.65 0 0 0 7.6 16a1.65 1.65 0 0 0-.6-1.1H5v-2.7a1.65 1.65 0 0 0 1.6-1.1 1.65 1.65 0 0 0-.3-1.8l1.9-1.9A1.65 1.65 0 0 0 10 7.6a1.65 1.65 0 0 0 1.1-.6V5h2.7a1.65 1.65 0 0 0 1.1 1.6 1.65 1.65 0 0 0 1.8-.3l1.9 1.9A1.65 1.65 0 0 0 18.4 10c.3.3.5.6.6 1.1H21v2.7a1.65 1.65 0 0 0-1.6 1.2z\"/>","sprout":"<path d=\"M12 22v-9\"/><path d=\"M12 13C7 13 4 10 4 5c5 0 8 3 8 8z\"/><path d=\"M12 17c0-6 3-9 9-9 0 6-3 9-9 9z\"/>","user-round":"<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-2a8 8 0 0 1 16 0v2\"/>","grid":"<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>","logout":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5M21 12H9\"/>","download":"<path d=\"M12 3v12m-4-4 4 4 4-4\"/><path d=\"M5 17v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3\"/>"};
const icons={"dashboard":"layout-dashboard","weeks":"calendar-days","students":"users-round","families":"house","followups":"clipboard-check","cards":"id-card","milestones":"flag","questions":"message-circle-question","announcements":"megaphone","tasks":"list-todo","journal":"notebook-pen","reports":"chart-column-increasing","survey":"heart","accounts":"shield-check","settings":"settings","myweek":"sprout","myreport":"notebook-pen","myfamily":"house","myfollowup":"clipboard-check","mycard":"id-card","program":"calendar-days","myquestions":"message-circle-question","notices":"megaphone","myaccount":"user-round"};
const iconSvg=(name,cls='ui-icon')=>'<svg class="'+cls+'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[name]||iconPaths.grid)+'</svg>';
const teamNav=[['dashboard','اللوحة'],['weeks','البرنامج والأسابيع'],['students','الغارسات'],['families','الأسر'],['followups','المتابعة الأسبوعية'],['cards','بطاقة الغارسة'],['milestones','المخرجات'],['questions','الأسئلة'],['announcements','الإعلانات والمصادر'],['tasks','التحضير والتشغيل'],['journal','سجل التجربة'],['reports','التقارير'],['survey','صوت الغارسة'],['accounts','الحسابات'],['settings','الإعدادات']];
const studentNav=[['myweek','أسبوعي'],['myreport','تقريري الأسبوعي'],['myfamily','أسرتي'],['myfollowup','متابعة الأسرة'],['mycard','بطاقتي'],['program','البرنامج'],['myquestions','أسئلتي'],['notices','الإعلانات'],['survey','صوت الغارسة'],['myaccount','حسابي']];
const team=()=>['admin','murafiqa','musaida'].includes(state.account?.role);
const leadership=()=>['admin','murafiqa'].includes(state.account?.role);
const coordinator=()=>state.rows.roles_family?.some(r=>r.student_id===state.account?.student_id&&r.task==='munassiqa'&&r.cycle===Number(setting('current_cycle',1)));
const setting=(key,fallback='')=>state.rows.settings?.find(s=>s.key===key)?.value??fallback;
const rows=t=>state.rows[t]||[];
const option=(v,label,current)=>'<option value="'+esc(v)+'" '+(String(current??'')===String(v)?'selected':'')+'>'+esc(label)+'</option>';
const name=(table,id)=>rows(table).find(x=>x.id===id)?.name||'—';
const weekName=id=>rows('weeks').find(x=>x.id===id)?.title||'—';
const date=v=>v?new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'long',year:'numeric'}).format(new Date(v)):'—';
const currentWeek=()=>rows('weeks').find(w=>w.kind==='program'&&w.starts_on<=new Date().toISOString().slice(0,10)&&w.ends_on>=new Date().toISOString().slice(0,10))||rows('weeks').filter(w=>w.kind==='program').find(w=>w.starts_on>new Date().toISOString().slice(0,10))||rows('weeks').find(w=>w.code==='w8');
const field=(label,key,value='',type='text',required=false,opts=null)=>'<div class="field"><label for="f_'+esc(key)+'">'+esc(label)+'</label>'+(opts?'<select id="f_'+esc(key)+'" name="'+esc(key)+'">'+opts.map(o=>option(o[0],o[1],value)).join('')+'</select>':type==='textarea'?'<textarea id="f_'+esc(key)+'" name="'+esc(key)+'">'+esc(value)+'</textarea>':'<input id="f_'+esc(key)+'" name="'+esc(key)+'" type="'+esc(type)+'" value="'+esc(value)+'" '+(required?'required':'')+'/>')+'</div>';
const btn=(action,text,cls='secondary',extra='')=>'<button class="btn '+cls+'" data-action="'+esc(action)+'" '+extra+'>'+esc(text)+'</button>';
function flash(text,error=false){state.notice=text;render();setTimeout(()=>{if(state.notice===text){state.notice='';const el=$('.toast');if(el)el.remove()}},5000)}
async function read(t){const{data,error}=await db.from(t).select('*').limit(2000);if(error)throw error;state.rows[t]=data||[]}
async function load(){
const base=['settings','weeks','families','events','announcements','resources','roles_family','rota_leader'];
const staff=['students','followups','reports_self','cards','milestones','goals','questions','tasks','journal','minutes','docs_family'];
const student=['students','followups','reports_self','cards','milestones','goals','questions','minutes','docs_family'];
const tables=[...base,...(team()?staff:student),...(leadership()?['accounts','done_survey','responses_survey']:[])];
await Promise.all(tables.map(t=>read(t).catch(err=>{console.warn(t,err.message);state.rows[t]=[]})));
if(!team()&&state.account?.student_id){state.profile=rows('students').find(s=>s.id===state.account.student_id);const result=await db.rpc('family_directory');if(!result.error&&result.data){const own=rows('students');state.rows.students=[...own,...result.data.filter(s=>!own.some(m=>m.id===s.id))]}const pub=await db.rpc('published_questions');if(!pub.error&&pub.data){const mine=rows('questions');state.rows.questions=[...mine,...pub.data.filter(q=>!mine.some(m=>m.id===q.id))]}}
state.week ||= currentWeek()?.id;
state.family ||= state.profile?.family_id||rows('families')[0]?.id;
}
const withTimeout=(promise,ms=15000)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('استغرق الاتصال وقتًا أطول من المتوقع. تحققي من الإنترنت وحاولي مرة أخرى.')),ms))]);
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
if(!data||['pending','disabled'].includes(data.role)){render();return}
state.page=team()?'dashboard':'myweek';
render();
try{await withTimeout(load(),20000)}catch(error){console.warn('تعذر تحميل بعض بيانات الحساب',error);flash('تم تسجيل الدخول، لكن تعذّر تحميل بعض البيانات. حاولي تحديث الصفحة.',true)}
if(sequence===bootSequence)render();
}
let loginInProgress=false;
db.auth.onAuthStateChange((event)=>{if(!loginInProgress&&['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)){setTimeout(()=>start().catch(err=>{console.error(err);flash('تعذر تحديث حالة تسجيل الدخول، أعيدي تحميل الصفحة.',true)}),0)}});
function auth(){
return '<div class="auth"><section class="auth-hero"><div class="brand"><div class="brandmark">'+iconSvg('sprout')+'</div>معهد التأسيس الشرعي | منصة الغارسات</div><h1>الغارسات</h1><p class="verse">﴿كَزَرْعٍ أَخْرَجَ شَطْأَهُ فَآزَرَهُ فَاسْتَغْلَظَ فَاسْتَوَىٰ عَلَىٰ سُوقِهِ﴾</p><p style="margin-top:35px;color:#c8c7c6">مساحة تجمع الأسبوع، والأسرة، والمتابعة، والثمرة في مكان واحد.</p></section><section class="auth-panel"><div class="eyebrow">أهلًا بكِ في منصة الغارسات</div><h2 class="welcome">رحلة تُغرس فيها المعاني وتُرعى ثمارها.</h2><p class="muted">ادخلي إلى حسابك، أو أنشئي حسابًا جديدًا للمراجعة.</p><div class="tabs"><button data-action="signin" class="'+(state.authTab==='signin'?'active':'')+'">تسجيل الدخول</button><button data-action="signup" class="'+(state.authTab==='signup'?'active':'')+'">حساب جديد</button></div><form id="authForm">'+(state.authTab==='signup'?field('الاسم كاملًا','full_name','', 'text',true)+field('رقم الهاتف (واتساب)','phone','', 'tel',true):'')+field('البريد الإلكتروني','email','','email',true)+field('كلمة المرور','password','','password',true)+'<button class="btn" type="submit" style="width:100%;margin-top:15px">'+(state.authTab==='signup'?'إرسال طلب التسجيل':'دخول إلى المنصة')+'</button></form><button class="textbtn" data-action="reset">نسيتِ كلمة المرور؟</button></section></div>';
}
function pending(){return '<div class="auth"><section class="auth-hero"><div class="brand">'+iconSvg('sprout')+' معهد التأسيس الشرعي</div><h1>الغارسات</h1><p class="verse">لكل بذرة أوانها، ولكل غرس رعاية.</p></section><section class="auth-panel"><h2>'+(state.account?.role==='disabled'?'هذا الحساب موقوف':'وصل طلبكِ')+'</h2><p class="muted" style="margin:20px 0">'+(state.account?.role==='disabled'?'راجعي إدارة البرنامج إن ظننتِ أن هناك خطأ.':'طلب التسجيل في انتظار موافقة إدارة البرنامج. يمكنكِ العودة للتحقق من حالته.')+'</p>'+btn('refresh','تحديث حالة الحساب')+' '+'<button type="button" class="logout-icon pending-logout" data-action="logout" aria-label="تسجيل الخروج" title="تسجيل الخروج"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button>'+installNotice()+'</section></div>'}
function installNotice(){
if(!shouldShowInstall())return '';
return '<section class="install-notice" role="status" aria-label="اقتراح تثبيت الغارسات"><div class="install-notice-mark" aria-hidden="true">✦</div><div class="install-notice-copy"><strong>الغارسات على شاشة تلفونك</strong><p>أضيفي المنصة للشاشة الرئيسية وافتحيها بسهولة مثل التطبيق.</p></div><div class="install-notice-actions"><button type="button" class="btn goldbtn smallbtn" data-action="install">إضافة للشاشة الرئيسية</button><button type="button" class="install-notice-dismiss" data-action="dismissInstall" aria-label="إخفاء اقتراح التثبيت" title="إخفاء">×</button></div></section>';
}
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
function closeMobileMore(){
const overlay=document.querySelector('.mobile-more-overlay');
if(overlay){overlay.remove();document.body.classList.remove('mobile-more-open')}
}
function showMobileMore(){
closeMobileMore();
const visible=visibleNavigation();
const primary=visible.slice(0,4).map(([p])=>p);
const groups=[
['التنقل السريع',visible.filter(([p])=>primary.includes(p))],
['بقية الصفحات',visible.filter(([p])=>!primary.includes(p))]
].filter(([,items])=>items.length);
const sections=groups.map(([title,items])=>'<section class="mobile-more-section"><h3>'+esc(title)+'</h3><div class="mobile-more-grid">'+items.map(([page,label])=>
'<button type="button" class="mobile-more-link'+(state.page===page?' is-selected':'')+'" data-page="'+esc(page)+'"'+(state.page===page?' aria-current="page"':'')+'><span class="mobile-more-link-icon">'+iconSvg(icons[page])+'</span><span class="mobile-more-link-title">'+esc(label)+'</span>'+(state.page===page?'<span class="mobile-more-current">الحالية</span>':'')+'</button>'
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
return '<div class="app"><aside class="sidebar"><div class="brand"><div class="brandmark">'+iconSvg('sprout')+'</div><span>الغارسات<small style="display:block;font-weight:400;color:#acb5c3">معهد التأسيس الشرعي</small></span></div><div class="side-label">مساحة '+top+'</div>'+visible.map(([p,t])=>'<button class="nav-item '+(p===state.page?'active':'')+'" data-page="'+p+'"><span style="width:20px;text-align:center;color:#b79867">'+iconSvg(icons[p])+'</span>'+t+'</button>').join('')+'</aside><main class="main"><header class="topbar"><div class="mobile-brand brand"><div class="brandmark" style="width:32px;height:32px">✦</div>الغارسات</div><div class="muted small user-title">منصة برنامج الغارسات | '+esc(setting('stage_name','المرحلة الأولى'))+'</div><div style="display:flex;align-items:center;gap:12px"><span class="small">'+esc(state.account?.name||'')+' <span class="muted">| '+esc(state.account?.title||top)+'</span></span><button type="button" data-action="logout" class="logout-icon" aria-label="تسجيل الخروج" title="تسجيل الخروج"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></button></div></header><div class="content">'+installNotice()+main+'</div></main><nav class="mobile-nav">'+visible.slice(0,4).map(([p,t])=>'<button class="'+(p===state.page?'active':'')+'" data-page="'+p+'"><span style="font-size:20px">'+iconSvg(icons[p])+'</span>'+t+'</button>').join('')+'<button type="button" data-action="more" aria-haspopup="dialog" aria-label="فتح جميع الصفحات"><span class="mobile-icon">'+iconSvg('grid')+'</span>المزيد</button></nav></div>';
}
function heading(title,desc,action=''){return '<div class="page-head"><div><div class="eyebrow">مِن الغَرْسِ إلى الثَّمَر</div><h1>'+esc(title)+'</h1><p class="subtitle">'+esc(desc)+'</p></div>'+action+'</div>'}
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
function dashboardStudentFile(){
if(!team())return heading('ملف الغارسة','هذه الصفحة متاحة للفريق');
const student=rows('students').find(x=>x.id===state.dashboardStudent);
if(!student)return heading('ملف الغارسة','تعذّر العثور على الغارسة')+btn('go:students','العودة إلى سجل الغارسات');
const program=sortedWeeks().filter(w=>w.kind==='program');
const personalFollow=rows('followups').filter(f=>f.student_id===student.id);
const reports=rows('reports_self').filter(r=>r.student_id===student.id);
const stat=key=>({present:'حاضرة',late:'متأخرة',excused:'بعذر',absent:'غائبة'})[key]||'—';
const linked=rows('accounts').find(a=>a.student_id===student.id);
const details=[['الهاتف',student.phone],['البريد',student.email],['الجامعة',student.university],['الكلية',student.college],['المستوى الدراسي',student.study_level],['الحي',student.neighborhood],['الحالة الاجتماعية',student.marital_status],['دون العشرين',student.under_twenty?'نعم':'لا'],['ولي الأمر',student.guardian_name],['هاتف ولي الأمر',student.guardian_phone],['قادت السابق',student.led_before?'نعم':'لا'],['الحساب المرتبط',linked?.email||'غير مرتبط']];
const goals=rows('goals').filter(g=>g.student_id===student.id);
const milestones=rows('milestones').filter(m=>m.student_id===student.id);
return '<div class="dashboard-student-file">'+btn('go:dashboard','العودة إلى اللوحة','secondary smallbtn')+
heading(student.name,'ملف الغارسة · '+name('families',student.family_id),btn('editstudent:'+student.id,'تعديل البيانات','secondary smallbtn')+' '+btn('newgoal:'+student.id,'إضافة هدف','secondary smallbtn'))+
'<div class="card"><h3>البيانات</h3><div class="dashboard-student-details">'+details.map(([k,v])=>'<div><span class="muted small">'+esc(k)+'</span><strong>'+esc(v||'—')+'</strong></div>').join('')+'</div></div>'+
'<div class="card"><h3>المتابعة الأسبوعية والتقارير</h3><div class="dashboard-student-history">'+program.map(w=>{const f=personalFollow.find(x=>x.week_id===w.id),r=reports.find(x=>x.week_id===w.id);return '<div class="list-row"><div><strong>'+esc(w.title)+'</strong><p class="muted small">المجلس: '+stat(f?.majlis)+' · لقاء الأسرة: '+stat(f?.family_meeting)+' · الورد: '+esc(f?.wird_days??'—')+'</p></div><span class="chip '+(r?'ok':'')+'">'+(r?'وصل التقرير':'لم يُرسل')+'</span></div>'}).join('')+'</div></div>'+
'<div class="card"><h3>البطاقة والخطة الفردية</h3>'+(goals.length?goals.map(g=>'<div class="list-row"><div><strong>'+esc(g.aspect)+'</strong><p>'+esc(g.goal)+'</p><p class="small muted">'+esc(g.measure||'')+'</p></div><span class="chip '+(g.done?'ok':'')+'">'+(g.done?'مكتمل':'جارٍ')+'</span></div>').join(''):empty('لا توجد أهداف مسجلة'))+'</div>'+
'<div class="card"><h3>المخرجات</h3>'+(milestones.length?milestones.map(m=>'<div class="list-row"><span>'+esc(m.code)+'</span><span class="chip '+(m.done?'ok':'')+'">'+(m.done?'منجز':'غير منجز')+'</span></div>').join(''):empty('لا توجد مخرجات مسجلة'))+'</div></div>';
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
function students(){
return heading('الغارسات','سجل المرشحات والدفعة والأسر',btn('newstudent','إضافة غارسة','goldbtn')+' '+btn('bulkstudents','إضافة قائمة'))+table(['الاسم','الحال','الأسرة','الجامعة','الهاتف','الإجراء'],rows('students').map(s=>'<tr><td>'+esc(s.name)+'</td><td><span class="chip">'+esc(({candidate:'مرشحة',accepted:'مقبولة',selected_not:'لم تختر',active:'في البرنامج',paused:'متوقفة مؤقتاً',withdrawn:'خرجت'})[s.stage]||s.stage)+'</span></td><td>'+esc(name('families',s.family_id))+'</td><td>'+esc(s.university)+'</td><td>'+esc(s.phone)+'</td><td>'+btn('editstudent:'+s.id,'تعديل','secondary smallbtn')+' '+btn('newgoal:'+s.id,'خطة','secondary smallbtn')+' '+btn('newobservation:'+s.id,'ملاحظة','secondary smallbtn')+'</td></tr>').join('')||'<tr><td colspan="6">'+empty('ابدئي بإضافة الغارسات إلى السجل')+'</td></tr>');
}
function families(){
const fam=rows('families').find(f=>f.id===state.family),members=rows('students').filter(s=>s.family_id===fam?.id),isTeam=team();
return heading(isTeam?'الأسر':'أسرتي','الأخوات، والمهام الدوارة، ولقاءات الأسرة',isTeam?btn('newfamily','إضافة أسرة','goldbtn')+' '+btn('assignrole','توزيع المهام')+' '+btn('assignleader','مديرات اللقاء'):'')+'<div class="toolbar">'+(isTeam?selectFamilies():'')+'</div>'+(fam?'<div class="grid two"><div class="card"><h3>'+esc(fam.name)+'</h3><p class="muted">موعد اللقاء: '+esc(fam.meeting_day||'لم يحدد')+' '+esc(fam.meeting_time||'')+'</p>'+(fam.meeting_url?'<p><a target="_blank" rel="noopener noreferrer" href="'+esc(safeUrl(fam.meeting_url))+'">رابط اللقاء</a></p>':'')+'<div class="separator"></div>'+members.map(s=>'<div class="list-row"><div><strong>'+esc(s.name)+'</strong><p class="muted">'+esc(rows('roles_family').find(r=>r.student_id===s.id&&r.cycle===Number(setting('current_cycle',1)))?.task||'لم توزع المهمة')+'</p></div>'+(s.phone?'<a class="btn secondary smallbtn" href="https://wa.me/'+encodeURIComponent(s.phone.replace(/[^0-9]/g,''))+'" target="_blank" rel="noopener">واتساب</a>':'')+'</div>').join('')+'</div><div class="card"><h3>وثائق الأسرة</h3>'+[['wird','قدر الورد'],['page_need','صفحة الحاجة'],['initiative','المبادرة'],['charter','الميثاق']].map(([key,t])=>'<div class="list-row"><span>'+t+'</span>'+btn('doc:'+key,rows('docs_family').some(d=>d.kind===key&&d.family_id===fam.id)?'عرض وتعديل':'كتابة','secondary smallbtn')+'</div>').join('')+'<div class="separator"></div><h3>محاضر اللقاءات</h3>'+rows('minutes').filter(m=>m.family_id===fam.id).map(m=>'<div class="list-row">'+date(m.meeting_date)+' | '+esc(m.summary?.slice(0,45))+'</div>').join('')+btn('newminute','إضافة محضر','goldbtn')+'</div></div>':empty('أضيفي أسرة أولًا'));
}
function followups(){
const week=state.week,students=rows('students').filter(s=>s.family_id===state.family&&s.stage==='active'),c=team()||coordinator();
return heading('المتابعة الأسبوعية','حضور المجلس ولقاء الأسرة والورد والمهام')+'<div class="toolbar">'+selectWeeks()+(team()?selectFamilies():'')+'</div>'+(!c?'<div class="notice">هذه الصفحة متاحة لمنسقة الأسرة في الدورة الجارية.</div>':table(['الغارسة','المجلس','لقاء الأسرة','الورد','الثلاثية','المنقول','الدوارة',''],students.map(s=>{const f=rows('followups').find(x=>x.student_id===s.id&&x.week_id===week)||{};return '<tr><td>'+esc(s.name)+'</td><td>'+esc(({present:'حاضرة',late:'متأخرة',excused:'بعذر',absent:'غائبة'})[f.majlis]||'—')+'</td><td>'+esc(({present:'حاضرة',late:'متأخرة',excused:'بعذر',absent:'غائبة'})[f.family_meeting]||'—')+'</td><td>'+esc(f.wird_days??'—')+'</td><td>'+esc(f.triple_task||'—')+'</td><td>'+esc(f.transferred_lesson||'—')+'</td><td>'+esc(f.rotating_task||'—')+'</td><td>'+btn('followup:'+s.id,'تسجيل','secondary smallbtn')+'</td></tr>'}).join('')||'<tr><td colspan="8">'+empty('لا توجد غارسات نشطات في هذه الأسرة')+'</td></tr>'));
}
const aspects=['الفقهي الشرعي','التربوي التزكوي','الفكري','التنظيمي','الاجتماعي','البيت المسلم وصناعة الجيل'];
const levels=['لم تبدأ','في الطريق','متحققة','متميزة'];
function cards(){
const mine=!team(),st=mine?[state.profile].filter(Boolean):rows('students').filter(s=>s.stage==='active');
return heading(mine?'بطاقتي':'بطاقة الغارسة','ستة جوانب وأربعة مستويات: من لم تبدأ إلى متميزة')+(mine?'<div class="notice">لا تحاكمك البطاقة، بل ترسم موضعك وتُبنى عليها خطتكِ.</div>':'')+st.map(s=>'<div class="card" style="margin-bottom:14px"><h3>'+esc(s.name)+'</h3><div class="grid three">'+aspects.map(a=>{const c=rows('cards').find(c=>c.student_id===s.id&&c.aspect===a&&c.stage===(mine?'self':'first'));return '<div><div class="small muted">'+a+'</div><strong>'+esc(levels[c?.level]||'لم تقيم بعد')+'</strong><div class="progress" style="margin-top:7px"><span style="width:'+((Number(c?.level||0)+1)*25)+'%"></span></div>'+'</div>'}).join('')+'</div><div style="margin-top:15px">'+btn('card:'+s.id,mine?'تقييمي الذاتي':'تقييم الغارسة','goldbtn')+'</div></div>').join('')||empty('لا توجد بطاقة لعرضها');
}
const milestoneNames=[['iqrar','إقرار البداية موقعًا'],['letter','رسالة إلى نفسي محفوظة'],['parents','رسالة الأهل مسلمة'],['guardian','تعريف ولي الأمر (دون العشرين)'],['tilawa','الفحص المبدئي للتلاوة'],['individual','اللقاء الفردي'],['plan','الخطة الفردية'],['need5','ورقة الحاجة: خمس مستمعات'],['nabtpage','نبت كما أفهمه'],['hadith10','تسميع الأحاديث العشرة'],['mithaq','ميثاق الغارسة موقعًا']];
function milestones(){
return heading('المخرجات','إحدى عشرة علامة لإنجاز الغارسة')+table(['الغارسة',...milestoneNames.map(x=>x[1])],rows('students').filter(s=>s.stage==='active').map(s=>'<tr><td>'+esc(s.name)+'</td>'+milestoneNames.map(([code])=>'<td><input style="width:18px;min-height:18px" type="checkbox" data-milestone="'+esc(s.id+':'+code)+'" '+(rows('milestones').some(m=>m.student_id===s.id&&m.code===code&&m.done)?'checked':'')+' '+(code==='guardian'&&!s.under_twenty?'disabled':'')+' /></td>').join('')+'</tr>').join('')||'<tr><td colspan="12">'+empty('لا توجد غارسات نشطات')+'</td></tr>');
}
function questions(){
const mine=!team(),data=mine?rows('questions').filter(q=>q.student_id===state.account?.student_id||q.published):rows('questions');
return heading(mine?'أسئلتي':'الأسئلة','الأسئلة الفقهية والفكرية والعامة',mine?btn('newquestion','إرسال سؤال','goldbtn'):'')+data.map(q=>'<div class="card" style="margin-bottom:12px"><div class="chips"><span class="chip">'+esc(q.kind==='fiqh'?'فقهي':q.kind==='fikr'?'فكري':'عام')+'</span><span class="chip '+(q.status==='answered'?'ok':'warn')+'">'+esc(q.status==='answered'?'أجيب':q.status==='sent'?'عند المرجعية':'جديد')+'</span>'+(q.published?'<span class="chip">منشور للجميع</span>':'')+'</div><p class="text-content" style="margin-top:12px">'+esc(q.body)+'</p>'+(q.answer?'<p style="border-right:3px solid #b79867;padding-right:12px;margin-top:12px">'+esc(q.answer)+'</p>':'')+(team()?'<div class="form-actions">'+btn('answer:'+q.id,'إجابة السؤال','goldbtn')+'</div>':'')+'</div>').join('')||empty('لم تُرسل أسئلة بعد');
}
function announcements(){
return heading('الإعلانات والمصادر','المواعيد المهمة والمواد المساعدة',team()?btn('newannouncement','إعلان جديد','goldbtn')+' '+btn('newresource','إضافة مصدر'):'')+'<div class="grid two"><div class="card"><h3>الإعلانات</h3>'+rows('announcements').map(a=>'<div class="list-row"><div><strong>'+esc(a.title)+'</strong><p>'+esc(a.body)+'</p></div><span class="chip">'+(a.pinned?'مثبت':'إعلان')+'</span></div>').join('')||empty('لا توجد إعلانات')+'</div><div class="card"><h3>المصادر</h3>'+rows('resources').map(r=>'<div class="list-row"><div><a href="'+esc(safeUrl(r.url))+'" target="_blank" rel="noopener noreferrer"><strong>'+esc(r.title)+'</strong></a><p class="muted">'+esc(r.kind)+'</p></div></div>').join('')||empty('لا توجد مصادر')+'</div></div>';
}
function tasks(){
return heading('التحضير والتشغيل','القرارات والمهام وشروط الانطلاق وقائمة الختام',btn('newtask','إضافة مهمة','goldbtn'))+['decision','task','launch','closing'].map((key,i)=>'<div class="card" style="margin-bottom:15px"><h3>'+['القرارات','المهام','شروط الانطلاق','قائمة الختام'][i]+'</h3>'+rows('tasks').filter(t=>t.section===key).map(t=>'<div class="list-row"><div><strong>'+esc(t.body)+'</strong><p class="muted">'+esc(t.owner||'')+' '+(t.due_on?'| '+date(t.due_on):'')+'</p></div><input style="width:20px;min-height:20px" type="checkbox" data-task="'+t.id+'" '+(t.done?'checked':'')+'/></div>').join('')+(!rows('tasks').some(t=>t.section===key)?empty('لم تُدخل بنود هذا القسم بعد'):'')+'</div>').join('');
}
function journal(){return heading('سجل التجربة','ما نجح، وما تعثر، وما تقرر في كل أسبوع',btn('newjournal','تدوين أسبوع','goldbtn'))+rows('journal').map(j=>'<div class="card" style="margin-bottom:12px"><h3>'+esc(weekName(j.week_id))+'</h3><p><strong>نجح:</strong> '+esc(j.success)+'</p><p><strong>تعثر:</strong> '+esc(j.obstacle)+'</p><p><strong>القرار:</strong> '+esc(j.decision)+'</p></div>').join('')||empty('لا توجد تدوينات بعد')}
function reports(){
const periodWeeks=rows('weeks').filter(w=>w.kind==='program'&&(state.period==='all'||(state.period==='month1'&&Number(w.code.slice(1))<=4)||(state.period==='month2'&&Number(w.code.slice(1))>=5))).map(w=>w.id);const reports=rows('followups').filter(f=>periodWeeks.includes(f.week_id)),known=reports.filter(x=>x.majlis),present=known.filter(x=>['present','late'].includes(x.majlis)),families=rows('families');
return heading('التقارير','المؤشرات المستخرجة من المتابعة المحفوظة',btn('print','طباعة / حفظ PDF','secondary no-print'))+'<div class="toolbar no-print"><select data-select="period">'+[['all','المرحلة كلها'],['month1','الشهر الأول (الأسابيع ١–٤)'],['month2','الشهر الثاني (الأسابيع ٥–٨)']].map(x=>option(x[0],x[1],state.period)).join('')+'</select></div><div class="grid stats">'+[['عدد الأسر',families.length],['الحضور',known.length?Math.round(present.length/known.length*100)+'٪':'—'],['متوسط الورد',reports.filter(x=>x.wird_days!==null).length?(reports.reduce((a,x)=>a+Number(x.wird_days||0),0)/reports.filter(x=>x.wird_days!==null).length).toFixed(1):'—'],['المخرجات المنجزة',rows('milestones').filter(m=>m.done).length]].map(([label,v])=>'<div class="card stat"><div class="value">'+v+'</div><div class="label">'+label+'</div></div>').join('')+'</div><div class="card"><h3>ملخص الأسر</h3>'+families.map(f=>'<div class="list-row"><strong>'+esc(f.name)+'</strong><span class="muted">'+rows('students').filter(s=>s.family_id===f.id&&s.stage==='active').length+' غارسات</span></div>').join('')+'</div>';
}
function survey(){
if(team())return heading('صوت الغارسة','استبانة بلا اسم ولا أسرة')+btn('togglesurvey',setting('survey_open',false)?'إغلاق الاستبانة':'فتح الاستبانة','goldbtn')+'<div class="card" style="margin-top:20px"><h3>الإجابات: '+rows('responses_survey').length+'</h3>'+rows('responses_survey').map(r=>'<div class="list-row"><div>'+((r.answers||[]).map((v,i)=>'<p><strong>'+['ما الذي نفعك؟','ما الذي أثقل عليك؟','هل كان الحمل مناسبًا؟','كيف وجدتِ أسرتك؟','مقترحاتك'][i]+'</strong> '+esc(v)+'</p>').join(''))+'</div></div>').join('')+'</div>';
if(!setting('survey_open',false))return '<div class="card"><h2>صوت الغارسة</h2><p>الاستبانة غير مفتوحة الآن.</p></div>';
if(rows('done_survey').some(d=>d.student_id===state.account?.student_id))return '<div class="notice">جزاكِ الله خيرًا، وصلت إجابتكِ.</div>';
return heading('صوت الغارسة','تُحفظ إجاباتكِ دون اسم ولا أسرة')+'<form id="surveyForm" class="card">'+['ما الذي نفعكِ في هذه المرحلة أكثر من غيره؟','ما الذي أثقل عليكِ؟','هل كان حمل الأسبوع مناسبًا لدراستكِ وبيتكِ؟ وأين زاد؟','كيف وجدتِ أسرتكِ ولقاءها؟','ماذا تقترحين للمرحلة الثانية؟'].map((t,i)=>field(t,'q'+i,'','textarea',true)).join('')+'<button type="submit" class="btn">إرسال الإجابات</button></form>';
}
function accounts(){
return heading('الحسابات والصلاحيات','موافقة الحسابات وربطها بالغارسات')+table(['الاسم','البريد','الصفة','الغارسة المرتبطة','إجراء'],rows('accounts').map(a=>'<tr><td>'+esc(a.name)+'</td><td>'+esc(a.email)+'</td><td><span class="chip '+(a.role==='pending'?'warn':'')+'">'+esc(a.role)+'</span></td><td>'+esc(rows('students').find(s=>s.id===a.student_id)?.name||'—')+'</td><td>'+btn('editaccount:'+a.user_id,a.role==='pending'?'مراجعة وربط':'تعديل','secondary smallbtn')+'</td></tr>').join('')||'<tr><td colspan="5">'+empty('لا توجد حسابات')+'</td></tr>');
}
function settings(){
return heading('الإعدادات','اسم البرنامج والدورة الجارية والمعلومات الظاهرة')+'<form id="settingsForm" class="card"><div class="form-grid">'+field('اسم البرنامج','program_name',setting('program_name','الغارسات'))+field('اسم المرحلة','stage_name',setting('stage_name','المرحلة الأولى'))+field('الدورة الجارية','current_cycle',setting('current_cycle',1),'number')+field('الرقم البديل','backup_phone',setting('backup_phone',''),'tel')+'<div class="full">'+field('عبارة الترحيب','welcome',setting('welcome',''),'textarea')+'</div></div><button class="btn" type="submit">حفظ الإعدادات</button></form><div class="card" style="margin-top:15px"><h3>إزاحة التقويم</h3><p class="muted">يُزاح ترتيب الأسابيع والمواعيد مع الحفاظ على محتواها.</p>'+field('بداية الأسبوع الأول الجديدة','first_start',rows('weeks').find(w=>w.code==='w1')?.starts_on||'','date')+btn('shiftcalendar','تطبيق الإزاحة','secondary')+'</div>';
}
function myweek(){
const w=currentWeek();return '<div class="eyebrow">'+date(new Date())+'</div>'+heading('أسبوعي','أهلاً '+(state.account?.name||'')+' | '+name('families',state.profile?.family_id))+'<div class="hero-card"><div class="eyebrow">'+esc(w?.code||'')+' | '+(w?date(w.starts_on):'')+'</div><h1>'+esc(w?.title||'أهلاً بك في الغارسات')+'</h1><p>'+esc(w?.reflection||'رحلة غرسٍ ورعاية')+'</p></div><div class="grid two"><div class="card"><h3>منهج الأسبوع</h3>'+[['الدرس العلمي',w?.lesson],['الأربعون',w?.hadith],['جزء عم',w?.tilawa],['رياض الصالحين',w?.riyad]].map(([t,v])=>'<div class="list-row"><strong>'+t+'</strong><span class="muted">'+esc(v)+'</span></div>').join('')+'</div><div class="card"><h3>مهمتي الثلاثية</h3>'+[['في نفسي',w?.task_self],['في بيتي',w?.task_home],['في محيطي',w?.task_community]].map(([t,v])=>'<div class="list-row" style="display:block"><strong>'+t+'</strong><p>'+esc(v)+'</p></div>').join('')+btn('go:myreport','سجلي تقريركِ','goldbtn')+'</div></div><div class="card" style="margin-top:15px"><h3>المواعيد والإعلانات</h3>'+rows('events').filter(e=>!e.family_id||e.family_id===state.profile?.family_id).slice(0,4).map(e=>'<p>'+esc(e.title)+' | '+date(e.starts_at)+'</p>').join('')+rows('announcements').slice(0,3).map(a=>'<p>'+esc(a.title)+'</p>').join('')+'</div>';
}
function myreport(){
const w=rows('weeks').find(x=>x.id===state.week)||currentWeek(),report=rows('reports_self').find(x=>x.student_id===state.account?.student_id&&x.week_id===w?.id)||{};
return heading('تقريري الأسبوعي','تراه منسقة الأسرة، وتُبنى عليه المتابعة')+'<div class="toolbar">'+selectWeeks()+'</div><form class="card" id="reportForm">'+field('أيام الورد (من ٠ إلى ٧)','wird_days',report.wird_days??0,'number',true)+[['task_self','في نفسي'],['task_home','في بيتي'],['task_community','في محيطي']].map(([key,label])=>field(label,key,report[key]||'none','text',true,[['done','أنجزت'],['partial','بعضها'],['none','لم أنجز']])+field('ماذا فعلتِ؟','note_'+key.split('_')[1],report['note_'+key.split('_')[1]]||'','textarea')).join('')+field('الدرس المنقول: ماذا نقلتِ؟','transferred_lesson',report.transferred_lesson||'','textarea')+field('إلى من؟ (دون أسماء)','transferred_to',report.transferred_to||'')+'<label class="field"><span>القراءة الفكرية</span><select name="thought_read">'+option('true','قرأتها',report.thought_read?'true':'false')+option('false','لم أقرأها',report.thought_read?'true':'false')+'</select></label><div class="notice">تبقى المحاسبة الشخصية في دفتركِ ولا تُكتب هنا.</div><button type="submit" class="btn">حفظ تقريري</button></form>';
}
function myaccount(){
const p=state.profile||{};return heading('حسابي','بيانات التواصل وتغيير كلمة المرور')+'<form class="card" id="profileForm">'+field('البريد الإلكتروني','email',state.account?.email||'','email')+field('الهاتف','phone',p.phone||'','tel')+field('الجامعة','university',p.university||'')+field('الكلية','college',p.college||'')+field('المستوى الدراسي','study_level',p.study_level||'')+field('الحي','neighborhood',p.neighborhood||'')+'<button type="submit" class="btn">حفظ بياناتي</button></form><div class="card" style="margin-top:15px"><h3>كلمة المرور</h3>'+field('كلمة المرور الجديدة','newpassword','','password')+btn('changepassword','تغيير كلمة المرور')+'</div>';
}
function page(){
switch(state.page){
case 'dashboard':return dashboard();case 'dashboardStudent':return dashboardStudentFile();case 'weeks':case 'program':return weeks();case 'weekdetail':return weekDetails();case 'students':return students();case 'families':case 'myfamily':return families();case 'followups':case 'myfollowup':return followups();case 'cards':case 'mycard':return cards();case 'milestones':return milestones();case 'questions':case 'myquestions':return questions();case 'announcements':case 'notices':return announcements();case 'tasks':return tasks();case 'journal':return journal();case 'reports':return reports();case 'survey':return survey();case 'accounts':return accounts();case 'settings':return settings();case 'myweek':return myweek();case 'myreport':return myreport();case 'myaccount':return myaccount();default:return dashboard();}
}
function render(){window.__algharisatReady=true;document.title='الغارسات | معهد التأسيس الشرعي';$('#root').innerHTML=(!state.user?auth():!state.account||['pending','disabled'].includes(state.account.role)?pending():shell())+(state.notice?'<div class="toast" role="status">'+esc(state.notice)+'</div>':'');}
function dialog(title,body,submit='حفظ'){const old=$('.dialog-backdrop');if(old)old.remove();const e=document.createElement('div');e.className='dialog-backdrop';e.innerHTML='<form id="modalForm" class="dialog"><div class="page-head"><h2>'+esc(title)+'</h2><button type="button" class="btn secondary smallbtn" data-action="close">إغلاق</button></div><div class="form-grid">'+body+'</div><div class="form-actions"><button class="btn" type="submit">'+esc(submit)+'</button></div></form>';document.body.appendChild(e)}
function formData(f){const o={};new FormData(f).forEach((v,k)=>o[k]=v);return o}
async function save(t,obj,conflict){const q=db.from(t).upsert(obj,conflict?{onConflict:conflict}:{});const{error}=await q;if(error)throw error;await read(t);flash('حُفظت التغييرات بنجاح')}
async function modal(action){
const [a,id]=action.split(':');state.editing={a,id};let o={};
if(a.startsWith('edit')){const tab={editstudent:'students',editweek:'weeks',editaccount:'accounts'}[a];o=rows(tab).find(x=>x.id===id||x.user_id===id)||{}}
const stSelect=[['','بلا أسرة'],...rows('families').map(x=>[x.id,x.name])];
switch(a){
case 'newstudent':case 'editstudent':
dialog('بيانات الغارسة',field('الاسم كاملًا','name',o.name||'','text',true)+field('الهاتف','phone',o.phone||'','tel')+field('البريد','email',o.email||'','email')+field('الأسرة','family_id',o.family_id||'','text',false,stSelect)+field('الحال','stage',o.stage||'candidate','text',true,[['candidate','مرشحة'],['accepted','مقبولة'],['selected_not','لم تختر'],['active','في البرنامج'],['paused','متوقفة مؤقتاً'],['withdrawn','خرجت']])+field('الجامعة','university',o.university||'')+field('الكلية','college',o.college||'')+field('المستوى','study_level',o.study_level||'')+field('دون العشرين','under_twenty',String(!!o.under_twenty),'text',false,[['false','لا'],['true','نعم']])+field('اسم ولي الأمر','guardian_name',o.guardian_name||'')+field('هاتف ولي الأمر','guardian_phone',o.guardian_phone||''));break;
case 'newgoal':dialog('هدف في الخطة الفردية',field('الجانب','aspect','الفقهي الشرعي','text',true,aspects.map(t=>[t,t]))+field('الهدف','goal','','textarea',true)+field('مقياس التحقق','measure','','textarea',true));break;
case 'newobservation':dialog('ملاحظة المرافقة',field('نوع الملاحظة','kind','ملاحظة','text',true,['ملاحظة','لقاء فردي','حضور لقاء أسرة','لقاء الترشيح','تزكية','تعثر','ترشيح للإشراف',...(state.account.role==='murafiqa'?['حدود الستر']:[])].map(t=>[t,t]))+field('نص الملاحظة','note','','textarea',true)+(state.account.role==='murafiqa'?field('سرية الملاحظة','secret','false','text',true,[['false','غير سرية'],['true','سرية']]):''));break;
case 'newfamily':dialog('إضافة أسرة',field('اسم الأسرة','name','','text',true)+field('يوم اللقاء','meeting_day')+field('ساعة اللقاء','meeting_time')+field('الرابط','meeting_url','','url'));break;
case 'bulkstudents':dialog('إضافة قائمة',field('الأسماء، اسم في كل سطر (ثم الهاتف والجامعة مفصولة بفاصلة)','bulk','','textarea',true));break;
case 'editweek':o=rows('weeks').find(w=>w.id===state.week)||{};dialog('تعديل جميع بيانات الأسبوع',field('رمز الأسبوع','code',o.code,'text',true)+field('العنوان','title',o.title,'text',true)+field('النوع','kind',o.kind,'text',true,[['prep','التحضير'],['program','المرحلة'],['break','ما بعدها']])+field('الترتيب','sort_order',o.sort_order,'number',true)+field('من','starts_on',o.starts_on,'date',true)+field('إلى','ends_on',o.ends_on,'date',true)+[['reflection','وقفة التدبر'],['lesson','الدرس العلمي'],['hadith','الأربعون'],['tilawa','جزء عمّ'],['riyad','رياض الصالحين'],['task_self','في نفسي'],['task_home','في بيتي'],['task_community','في محيطي'],['discussion','أسئلة مدارسة الأسرة'],['activity','نشاط الأسبوع'],['team_work','ما يجري سوى الإيقاع الثابت / عمل الفريق'],['deliverable','ما يكون في اليد في آخر الأسبوع']].map(([key,title])=>field(title,key,o[key],'textarea')).join(''));break;
case 'followup':o=rows('followups').find(f=>f.student_id===id&&f.week_id===state.week)||{};dialog('متابعة '+name('students',id),field('المجلس','majlis',o.majlis||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('لقاء الأسرة','family_meeting',o.family_meeting||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('أيام الورد','wird_days',o.wird_days??'','number')+['triple_task','transferred_lesson','rotating_task'].map((k,i)=>field(['المهمة الثلاثية','الدرس المنقول','المهمة الدوارة'][i],k,o[k]||'','text',false,[['','لم يسجل'],['done','أنجزت'],['partial','بعضها'],['none','لم تنجز']])).join('')+field('ملاحظة','note',o.note,'textarea'));break;
case 'card':o=rows('cards').filter(c=>c.student_id===id);dialog('تقييم جوانب الغارسة',aspects.map((aspect,i)=>field(aspect,'aspect'+i,o.find(c=>c.aspect===aspect&&c.stage===(team()?'first':'self'))?.level??0,'text',true,levels.map((t,n)=>[n,t]))).join(''));break;
case 'newquestion':dialog('سؤال جديد',field('نوع السؤال','kind','general','text',true,[['fiqh','فقهي'],['fikr','فكري'],['general','عام']])+field('نص السؤال','body','','textarea',true));break;
case 'answer':o=rows('questions').find(x=>x.id===id)||{};dialog('إجابة السؤال',field('السؤال','question',o.body,'textarea')+field('الإجابة','answer',o.answer||'','textarea',true)+field('الحال','status',o.status||'open','text',true,[['open','جديد'],['sent','عند المرجعية'],['answered','أجيب']])+field('النشر للجميع دون اسم','published',String(!!o.published),'text',true,[['false','لا'],['true','نعم']]));break;
case 'newannouncement':dialog('إعلان جديد',field('العنوان','title','','text',true)+field('نص الإعلان','body','','textarea',true)+field('الأُسرة','family_id','','text',false,stSelect)+field('مثبت','pinned','false','text',false,[['false','لا'],['true','نعم']]));break;
case 'newresource':dialog('مصدر جديد',field('العنوان','title','','text',true)+field('الرابط','url','','url',true)+field('النوع','kind','link','text',true,[['recording','تسجيل'],['file','ملف'],['link','رابط']]));break;
case 'newtask':dialog('مهمة جديدة',field('القسم','section','task','text',true,[['decision','قرار'],['task','مهمة'],['launch','شرط انطلاق'],['closing','قائمة الختام']])+field('الأسبوع (للمهام الأسبوعية)','week_id',(sortedWeeks().find(w=>w.kind==='program')?.starts_on>todayISO()?(sortedWeeks().find(w=>w.kind==='prep'&&weekCurrent(w))||sortedWeeks().find(w=>w.kind==='prep'&&w.starts_on>todayISO())||sortedWeeks().find(w=>w.kind==='prep'))?.id:state.week)||'','text',false,[['','غير مرتبطة بأسبوع'],...sortedWeeks().map(w=>[w.id,w.title])])+field('المهمة','body','','textarea',true)+field('المسؤول','owner')+field('موعد الإنجاز','due_on','','date'));break;
case 'newjournal':dialog('تدوين التجربة',field('الأسبوع','week_id',state.week,'text',true,rows('weeks').filter(w=>w.kind==='program').map(w=>[w.id,w.title]))+field('ما نجح','success','','textarea')+field('ما تعثر','obstacle','','textarea')+field('القرار','decision','','textarea'));break;
case 'editaccount':dialog('مراجعة الحساب',field('الاسم','name',o.name,'text',true)+field('الصفة','role',o.role,'text',true,[['pending','ينتظر'],['gharisa','غارسة'],['musaida','مساعدة المرافقة'],['murafiqa','المرافقة'],...(state.account?.role==='admin'?[['admin','الإدارة']]:[]),['disabled','موقوف']])+field('اللقب','title',o.title)+field('سجل الغارسة','student_id',o.student_id||'','text',false,[['','بدون ربط'],...rows('students').map(s=>[s.id,s.name])]));break;
case 'doc':o=rows('docs_family').find(d=>d.family_id===state.family&&d.kind===id)||{};dialog('وثيقة الأسرة',field('نص الوثيقة','body',o.body,'textarea',true));break;
case 'assignrole':dialog('توزيع مهمة دوارة',field('المهمة','task','munassiqa','text',true,[['munassiqa','المنسقة'],['fiqhiya','المسؤولة الفقهية'],['fikriya','المسؤولة الفكرية'],['ijtimaiya','المسؤولة الاجتماعية'],['ataa','مسؤولة العطاء']])+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name]))+field('الدورة','cycle',setting('current_cycle',1),'number',true));break;
case 'assignleader':dialog('مديرة اللقاء',field('الأسبوع','week_id',state.week,'text',true,rows('weeks').filter(x=>x.kind==='program').map(x=>[x.id,x.title]))+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name])));break;
case 'newevent':dialog('موعد جديد',field('عنوان الموعد','title','','text',true)+field('نوع الموعد','kind','مجلس','text',true,[['مجلس','مجلس'],['درس','درس'],['لقاء أسرة','لقاء أسرة'],['لقاء حضوري','لقاء حضوري'],['لقاء فردي','لقاء فردي'],['لقاء فريق','لقاء فريق'],['غيره','غيره']])+field('وقت الموعد (اختياري — يُحدّد لاحقًا)','starts_at','','datetime-local')+field('المدة بالدقائق','duration_minutes',90,'number')+field('الأسبوع','week_id',state.week||'','text',false,[['','غير مرتبط بأسبوع'],...sortedWeeks().map(w=>[w.id,w.title])])+field('الأسرة (اختياري)','family_id','','text',false,[['','للجميع'],...rows('families').map(f=>[f.id,f.name])])+field('المكان أو الرابط','place')+field('ملاحظات','notes','','textarea'));break;
case 'newminute':dialog('محضر لقاء',field('تاريخ اللقاء','meeting_date',new Date().toISOString().slice(0,10),'date')+field('الأسبوع','week_id',state.week,'text',false,rows('weeks').filter(w=>w.kind==='program').map(w=>[w.id,w.title]))+field('عدد الحاضرات','attendance_count','','number')+field('الخلاصة','summary','','textarea')+field('التكليف والقرارات','decisions','','textarea'));break;
default:return;
}
}
async function modalSave(f){
const {a,id}=state.editing||{};const x=formData(f),bo=v=>v==='true';
if(['newstudent','editstudent'].includes(a)){x.family_id||=null;x.under_twenty=bo(x.under_twenty);if(a==='editstudent')x.id=id;await save('students',x)}
else if(a==='newfamily')await save('families',x);else if(a==='newgoal'){if(rows('goals').filter(g=>g.student_id===id).length>=3)throw Error('الحد الأقصى ثلاثة أهداف للغارسة');await save('goals',{...x,student_id:id,done:false})}
else if(a==='newobservation')await save('observations',{...x,student_id:id,secret:bo(x.secret),week_id:state.week,author_id:state.user.id});

else if(a==='bulkstudents'){const arr=x.bulk.split(/\n+/).map(s=>s.trim()).filter(Boolean).map(line=>{const [name,phone,university]=line.split(',');return{name:name.trim(),phone:phone?.trim(),university:university?.trim(),stage:'candidate'}});const{error}=await db.from('students').insert(arr);if(error)throw error;await read('students');flash('تمت إضافة '+arr.length+' غارسة')}
else if(a==='editweek'){x.sort_order=Number(x.sort_order);if(x.ends_on<x.starts_on)throw Error('تاريخ النهاية لا يمكن أن يسبق البداية');await save('weeks',{...x,id:state.week})}
else if(a==='followup'){for(const k of ['majlis','family_meeting','triple_task','transferred_lesson','rotating_task'])x[k]||=null;x.wird_days=x.wird_days===''?null:Number(x.wird_days);await save('followups',{...x,student_id:id,week_id:state.week,recorded_by:state.user.id},'student_id,week_id')}
else if(a==='card'){const objects=aspects.map((aspect,i)=>({student_id:id,aspect,stage:team()?'first':'self',level:Number(x['aspect'+i]),evaluator_id:state.user.id}));const{error}=await db.from('cards').upsert(objects,{onConflict:'student_id,aspect,stage'});if(error)throw error;await read('cards');flash('حُفظ التقييم')}
else if(a==='newquestion')await save('questions',{...x,student_id:state.account.student_id});
else if(a==='answer')await save('questions',{id,answer:x.answer,status:x.status,published:bo(x.published),answered_at:x.status==='answered'?new Date().toISOString():null});
else if(a==='newannouncement')await save('announcements',{...x,family_id:x.family_id||null,pinned:bo(x.pinned),author_id:state.user.id});
else if(a==='newresource'){if(!/^https?:\/\//i.test(x.url))throw Error('رابط المصدر يجب أن يبدأ بـ https:// أو http://');await save('resources',x)}
else if(a==='newtask')await save('tasks',{...x,due_on:x.due_on||null,week_id:x.section==='task'?(x.week_id||null):null});
else if(a==='newjournal')await save('journal',{...x,author_id:state.user.id});
else if(a==='editaccount'){const{error}=await db.from('accounts').update({...x,student_id:x.student_id||null}).eq('user_id',id);if(error)throw error;await read('accounts');flash('حُفظت صلاحية الحساب')}
else if(a==='doc')await save('docs_family',{...x,kind:id,family_id:state.family},'family_id,kind');
else if(a==='assignrole')await save('roles_family',{family_id:state.family,student_id:x.student_id,task:x.task,cycle:Number(x.cycle)},'family_id,task,cycle');
else if(a==='assignleader')await save('rota_leader',{family_id:state.family,week_id:x.week_id,student_id:x.student_id},'family_id,week_id');
else if(a==='newevent')await save('events',{...x,starts_at:x.starts_at||null,duration_minutes:Number(x.duration_minutes||90),week_id:x.week_id||null,family_id:x.family_id||null});
else if(a==='newminute')await save('minutes',{...x,family_id:state.family,attendance_count:x.attendance_count?Number(x.attendance_count):null,author_id:state.user.id});
$('.dialog-backdrop')?.remove();state.editing=null;render();
}
document.addEventListener('click',async e=>{
const el=e.target.closest('[data-action],[data-page],[data-week]');
if(!el)return;
if(el.dataset.page){state.page=el.dataset.page;closeMobileMore();$('.dialog-backdrop')?.remove();render();window.scrollTo({top:0,behavior:'instant'});return}
if(el.dataset.week){state.week=el.dataset.week;state.page='weekdetail';render();window.scrollTo(0,0);return}
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
else if(action==='signin'||action==='signup'){state.authTab=action;render()}
else if(action==='backweeks'){state.page=team()?'weeks':'program';render();window.scrollTo(0,0)}
else if(action==='reportthisweek'){state.page='myreport';render();window.scrollTo(0,0)}
else if(action==='logout'){logoutConfirmDialog()}
else if(action==='refresh')await start();
else if(action==='reset'){const email=prompt('أدخلي بريدكِ الإلكتروني لإرسال رابط إعادة كلمة المرور');if(email){const{error}=await db.auth.resetPasswordForEmail(email,{redirectTo:location.href});if(error)throw error;flash('إن كان البريد مسجلاً، سيصلك رابط إعادة كلمة المرور')}}
else if(action==='close')$('.dialog-backdrop')?.remove();
else if(action==='print')window.print();
else if(action==='shiftcalendar'){const newDate=$('#f_first_start')?.value;if(!newDate)throw Error('اختاري التاريخ الجديد');if(!confirm('ستتغير تواريخ جميع الأسابيع والمواعيد. هل تؤكدين؟'))return;const {data,error}=await db.rpc('shift_program',{p_first_week:newDate});if(error)throw error;await load();flash('تمت إزاحة التقويم بمقدار '+data+' يوم')}
else if(action==='more'){showMobileMore()}
else if(action==='closeMore'){closeMobileMore()}
else if(action.startsWith('viewstudent:')){state.dashboardStudent=action.split(':')[1];state.page='dashboardStudent';render();window.scrollTo(0,0)}
else if(action.startsWith('go:')){state.page=action.split(':')[1];render()}
else if(action==='changepassword'){const password=$('#f_newpassword').value;if(password.length<6)throw Error('كلمة المرور يجب أن تتكون من ستة أحرف على الأقل');const{error}=await db.auth.updateUser({password});if(error)throw error;flash('تغيرت كلمة المرور')}
else if(action==='togglesurvey'){await save('settings',{key:'survey_open',value:!setting('survey_open',false)});render()}
else await modal(action);
}catch(err){flash(err.message||'تعذر تنفيذ الإجراء',true)}
});
document.addEventListener('change',async e=>{
const el=e.target;
try{
if(el.dataset.select==='week'){state.week=el.value;render()}
else if(el.dataset.select==='period'){state.period=el.value;render()}
else if(el.dataset.select==='family'){state.family=el.value;render()}
else if(el.dataset.milestone){const[student_id,code]=el.dataset.milestone.split(':');await save('milestones',{student_id,code,done:el.checked,done_at:el.checked?new Date().toISOString():null},'student_id,code')}
else if(el.dataset.task){const{error}=await db.from('tasks').update({done:el.checked,done_at:el.checked?new Date().toISOString():null}).eq('id',el.dataset.task);if(error)throw error;await read('tasks');render()}
}catch(err){flash(err.message||'تعذر الحفظ',true)}
});
document.addEventListener('submit',async e=>{
if(!['authForm','modalForm','reportForm','settingsForm','surveyForm','profileForm'].includes(e.target.id))return;
e.preventDefault();
const f=e.target,x=formData(f);
const submit=f.querySelector('button[type="submit"]');
if(submit?.disabled)return;
if(submit)submit.disabled=true;
try{
if(f.id==='authForm'){
if(state.authTab==='signup'){if((x.password||'').length<6)throw Error('كلمة المرور يجب أن تتكون من ستة أحرف على الأقل');const{data,error}=await db.auth.signUp({email:x.email,password:x.password,options:{data:{full_name:x.full_name,phone:x.phone}}});if(error)throw error;if(data.session){await start();flash('تم إنشاء الحساب وتسجيل الدخول. حسابك بانتظار موافقة الإدارة.')}else{flash('تم إرسال طلب التسجيل، لكن إعداد تأكيد البريد ما زال مفعلًا في Supabase. راجعي الإدارة لإيقافه.')}}
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
if(account&&!['pending','disabled'].includes(account.role)){
state.page=['admin','murafiqa','musaida'].includes(account.role)?'dashboard':'myweek';
render();
load().then(()=>render()).catch(err=>{console.error(err);flash('دخلتِ حسابكِ، لكن بعض البيانات لم تُحمّل. أعيدي تحديث الصفحة.',true)});
}else{render()}
}catch(error){status.textContent='تعذر إكمال الدخول: '+(error.message||'خطأ غير معروف');status.style.color='#a12525';throw error}
finally{loginInProgress=false}
}}
else if(f.id==='modalForm')await modalSave(f);
else if(f.id==='reportForm'){x.wird_days=Number(x.wird_days);x.thought_read=x.thought_read==='true';await save('reports_self',{...x,student_id:state.account.student_id,week_id:state.week},'student_id,week_id')}
else if(f.id==='settingsForm'){for(const [key,value] of Object.entries(x)){await save('settings',{key,value:key==='current_cycle'?Number(value):value})}render()}
else if(f.id==='surveyForm'){const{error}=await db.rpc('submit_survey',{p_answers:[0,1,2,3,4].map(i=>x['q'+i]),p_round:'p1'});if(error)throw error;await read('done_survey');render();flash('جزاكِ الله خيرًا. وصلت إجابتكِ')}
else if(f.id==='profileForm'){const{error}=await db.rpc('update_my_profile',{p_phone:x.phone,p_email:x.email,p_university:x.university,p_college:x.college,p_study_level:x.study_level,p_neighborhood:x.neighborhood});if(error)throw error;await load();flash('حُفظت بياناتكِ الشخصية')}
}catch(err){console.error(err);const message=String(err?.message||'');const match=message.match(/(?:after|in)\s+(\d+)\s+seconds?/i);const throttled=err?.status===429||/for security purposes|rate limit|too many requests/i.test(message);flash(err?.code==='over_email_send_rate_limit'?'تعذّر إنشاء الحساب: بلغت رسائل تأكيد البريد حدّ الإرسال في Supabase. على الإدارة إيقاف Confirm Email من إعدادات Email؛ لا يكفي الانتظار بضع ثوانٍ.':throttled?'تم رفض الطلب مؤقتًا بسبب كثرة المحاولات. انتظري قليلًا ثم حاولي مرة واحدة.':message||'تعذر الحفظ، تحققي من الاتصال',true)}finally{if(submit)submit.disabled=false}
});
render();
start().catch(err=>{console.error(err);$('#root').innerHTML='<div class="card" style="margin:30px"><h2>تعذر تحميل المنصة</h2><p>تحققي من الاتصال بالإنترنت ثم أعيدي تحميل الصفحة.</p></div>'});
