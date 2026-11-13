import { createClient } from '@supabase/supabase-js';
const db=createClient('https://utlcejgzkrvdhojrnxcm.supabase.co','sb_publishable_iOHkDZzbKgUKy7h3HQp1PQ_U0zxCjzE');
const safeUrl=v=>/^https?:\/\//i.test(String(v||''))?String(v):'#';
const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={user:null,account:null,profile:null,page:'dashboard',rows:{},week:null,family:null,editing:null,notice:'',authTab:'signin',period:'all'};
const icons={dashboard:'◫',weeks:'▦',students:'♧',families:'⌂',followups:'☑',cards:'◈',milestones:'⚑',questions:'?',announcements:'✉',tasks:'☷',journal:'✎',reports:'▥',survey:'♡',accounts:'♙',settings:'⚙',myweek:'✦',myreport:'✎',myfamily:'⌂',myfollowup:'☑',mycard:'◈',program:'▦',myquestions:'?',notices:'✉',myaccount:'♙'};
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
return '<div class="auth"><section class="auth-hero"><div class="brand"><div class="brandmark">✦</div>معهد التأسيس الشرعي | منصة الغارسات</div><h1>الغارسات</h1><p class="verse">﴿كَزَرْعٍ أَخْرَجَ شَطْأَهُ فَآزَرَهُ فَاسْتَغْلَظَ فَاسْتَوَىٰ عَلَىٰ سُوقِهِ﴾</p><p style="margin-top:35px;color:#c8c7c6">مساحة تجمع الأسبوع، والأسرة، والمتابعة، والثمرة في مكان واحد.</p></section><section class="auth-panel"><div class="eyebrow">أهلًا بكِ في منصة الغارسات</div><h2 class="welcome">رحلة تُغرس فيها المعاني وتُرعى ثمارها.</h2><p class="muted">ادخلي إلى حسابك، أو أنشئي حسابًا جديدًا للمراجعة.</p><div class="tabs"><button data-action="signin" class="'+(state.authTab==='signin'?'active':'')+'">تسجيل الدخول</button><button data-action="signup" class="'+(state.authTab==='signup'?'active':'')+'">حساب جديد</button></div><form id="authForm">'+(state.authTab==='signup'?field('الاسم كاملًا','full_name','', 'text',true)+field('رقم الهاتف (واتساب)','phone','', 'tel',true):'')+field('البريد الإلكتروني','email','','email',true)+field('كلمة المرور','password','','password',true)+'<button class="btn" type="submit" style="width:100%;margin-top:15px">'+(state.authTab==='signup'?'إرسال طلب التسجيل':'دخول إلى المنصة')+'</button></form><button class="textbtn" data-action="reset">نسيتِ كلمة المرور؟</button></section></div>';
}
function pending(){return '<div class="auth"><section class="auth-hero"><div class="brand">✦ معهد التأسيس الشرعي</div><h1>الغارسات</h1><p class="verse">لكل بذرة أوانها، ولكل غرس رعاية.</p></section><section class="auth-panel"><h2>'+(state.account?.role==='disabled'?'هذا الحساب موقوف':'وصل طلبكِ')+'</h2><p class="muted" style="margin:20px 0">'+(state.account?.role==='disabled'?'راجعي إدارة البرنامج إن ظننتِ أن هناك خطأ.':'طلب التسجيل في انتظار موافقة إدارة البرنامج. يمكنكِ العودة للتحقق من حالته.')+'</p>'+btn('refresh','تحديث حالة الحساب')+' '+btn('logout','تسجيل الخروج')+'</section></div>'}
function shell(){
const nav=team()?teamNav:studentNav.filter(x=>x[0]!=='myfollowup'||coordinator()).filter(x=>x[0]!=='survey'||setting('survey_open',false)===true);
const visible=nav.filter(x=>x[0]!=='accounts'||leadership()).filter(x=>x[0]!=='survey'||state.account?.role!=='musaida');
let main='';
try{main=page()}catch(err){console.error(err);main='<div class="card"><p>تعذر عرض هذه الصفحة. حدّثي البيانات وحاولي مرة أخرى.</p></div>'}
const top=team()?'الفريق':'الغارسة';
return '<div class="app"><aside class="sidebar"><div class="brand"><div class="brandmark">✦</div><span>الغارسات<small style="display:block;font-weight:400;color:#acb5c3">معهد التأسيس الشرعي</small></span></div><div class="side-label">مساحة '+top+'</div>'+visible.map(([p,t])=>'<button class="nav-item '+(p===state.page?'active':'')+'" data-page="'+p+'"><span style="width:20px;text-align:center;color:#b79867">'+icons[p]+'</span>'+t+'</button>').join('')+'</aside><main class="main"><header class="topbar"><div class="mobile-brand brand"><div class="brandmark" style="width:32px;height:32px">✦</div>الغارسات</div><div class="muted small user-title">منصة برنامج الغارسات | '+esc(setting('stage_name','المرحلة الأولى'))+'</div><div style="display:flex;align-items:center;gap:12px"><span class="small">'+esc(state.account?.name||'')+' <span class="muted">| '+esc(state.account?.title||top)+'</span></span><button data-action="logout" class="btn secondary smallbtn">خروج</button></div></header><div class="content">'+main+'</div></main><nav class="mobile-nav">'+visible.slice(0,4).map(([p,t])=>'<button class="'+(p===state.page?'active':'')+'" data-page="'+p+'"><span style="font-size:20px">'+icons[p]+'</span>'+t+'</button>').join('')+'<button data-action="more"><span style="font-size:20px">☷</span>المزيد</button></nav></div>';
}
function heading(title,desc,action=''){return '<div class="page-head"><div><div class="eyebrow">مِن الغَرْسِ إلى الثَّمَر</div><h1>'+esc(title)+'</h1><p class="subtitle">'+esc(desc)+'</p></div>'+action+'</div>'}
function empty(text){return '<div class="empty"><strong>لا توجد بيانات بعد</strong>'+esc(text)+'</div>'}
function table(headers,body){return '<div class="card table-wrap"><table><thead><tr>'+headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table></div>'}
function selectWeeks(){return '<select id="weekSelect" data-select="week">'+rows('weeks').filter(w=>w.kind==='program').map(w=>option(w.id,'الأسبوع '+esc(w.code.slice(1))+' | '+w.title,state.week)).join('')+'</select>'}
function selectFamilies(){return '<select id="familySelect" data-select="family">'+rows('families').map(f=>option(f.id,f.name,state.family)).join('')+'</select>'}
function weekCard(w){return '<button class="week-tile '+(state.week===w.id?'active':'')+'" data-week="'+w.id+'"><div class="week-code">'+(w.kind==='prep'?'التحضير':w.kind==='break'?'الفاصل':'الأسبوع '+w.code.slice(1))+'</div><h3>'+esc(w.title)+'</h3><div class="small muted">'+date(w.starts_on)+' – '+date(w.ends_on)+'</div></button>'}
function dashboard(){
const w=currentWeek(),people=rows('students').filter(s=>s.stage==='active'),follow=rows('followups').filter(f=>f.week_id===w?.id),waiting=rows('accounts').filter(a=>a.role==='pending');
const present=follow.filter(f=>['present','late'].includes(f.majlis)).length,known=follow.filter(f=>f.majlis).length;
const avg=follow.filter(f=>f.wird_days!==null).reduce((a,b)=>a+Number(b.wird_days),0)/Math.max(1,follow.filter(f=>f.wird_days!==null).length);
return '<div class="eyebrow">'+date(new Date())+'</div>'+heading('لوحة المتابعة','نظرة على الدفعة والمهام التي تحتاج رعاية')+'<div class="hero-card"><div class="eyebrow">الأسبوع الجاري أو القادم</div><h1>'+esc(w?.title||'البرنامج يستعد للانطلاق')+'</h1><p>'+esc(w?.reflection||'تتابع هنا بداية الأسابيع، ومهامها، ومواعيدها.')+'</p><p class="small" style="margin-top:12px">'+(w?date(w.starts_on)+' | '+date(w.ends_on):'')+'</p></div><div class="grid stats">'+[['الغارسات في البرنامج',people.length],['حضور المجلس',known?Math.round(present/known*100)+'٪':'—'],['متوسط أيام الورد',follow.length?avg.toFixed(1):'—'],['حسابات تنتظر',waiting.length]].map(([l,v])=>'<div class="card stat"><div class="value">'+v+'</div><div class="label">'+l+'</div></div>').join('')+'</div><div class="grid two"><section class="card"><h3>الأسر هذا الأسبوع</h3>'+rows('families').map(f=>{const members=people.filter(s=>s.family_id===f.id);return '<div class="list-row"><div><strong>'+esc(f.name)+'</strong><p class="muted">'+members.length+' غارسات</p></div><span class="chip">'+members.filter(s=>follow.some(x=>x.student_id===s.id)).length+' / '+members.length+' متابعة</span></div>'}).join('')+(rows('families').length?'':empty('أضيفي الأسر من صفحة الأسر'))+'</section><section class="card"><h3>يحتاج متابعة</h3>'+rows('questions').filter(q=>q.status==='open').slice(0,5).map(q=>'<div class="list-row"><span>'+esc(q.body.slice(0,75))+'</span><span class="chip warn">سؤال جديد</span></div>').join('')+waiting.slice(0,3).map(a=>'<div class="list-row">'+esc(a.name)+'<span class="chip warn">طلب حساب</span></div>').join('')+(!waiting.length&&!rows('questions').some(q=>q.status==='open')?empty('لا توجد أسئلة أو طلبات معلقة'):'')+'</section></div>';
}
function weeks(){
const w=rows('weeks').find(x=>x.id===state.week)||currentWeek();
return heading('البرنامج والأسابيع','خريطة المرحلة الأولى: التحضير، الأسابيع الثمانية، والفاصل')+'<div class="week-grid">'+rows('weeks').sort((a,b)=>a.sort_order-b.sort_order).map(weekCard).join('')+'</div>'+(w?'<div class="card" style="margin-top:20px"><div class="eyebrow">'+date(w.starts_on)+' – '+date(w.ends_on)+'</div><h2>'+esc(w.title)+'</h2>'+[['وقفة التدبر',w.reflection],['الدرس العلمي',w.lesson],['الأربعون',w.hadith],['جزء عمّ',w.tilawa],['رياض الصالحين',w.riyad],['في نفسي',w.task_self],['في بيتي',w.task_home],['في محيطي',w.task_community],['أسئلة مدارسة الأسرة',w.discussion],['نشاط الأسبوع',w.activity],...(team()?[['عمل الفريق',w.team_work],['ما يكون في اليد',w.deliverable]]:[])].filter(x=>x[1]).map(([t,v])=>'<div class="separator"></div><h3>'+t+'</h3><p class="text-content">'+esc(v)+'</p>').join('')+(team()?'<div class="form-actions">'+btn('editweek','تعديل الأسبوع')+' '+btn('newevent','إضافة موعد')+'</div>':'')+'</div>':'');
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
case 'dashboard':return dashboard();case 'weeks':case 'program':return weeks();case 'students':return students();case 'families':case 'myfamily':return families();case 'followups':case 'myfollowup':return followups();case 'cards':case 'mycard':return cards();case 'milestones':return milestones();case 'questions':case 'myquestions':return questions();case 'announcements':case 'notices':return announcements();case 'tasks':return tasks();case 'journal':return journal();case 'reports':return reports();case 'survey':return survey();case 'accounts':return accounts();case 'settings':return settings();case 'myweek':return myweek();case 'myreport':return myreport();case 'myaccount':return myaccount();default:return dashboard();}
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
case 'editweek':dialog('تعديل الأسبوع',field('عنوان الأسبوع','title',o.title)+field('وقفة التدبر','reflection',o.reflection,'textarea')+field('الدرس العلمي','lesson',o.lesson,'textarea')+field('مهمة في نفسي','task_self',o.task_self,'textarea')+field('مهمة في بيتي','task_home',o.task_home,'textarea')+field('مهمة في محيطي','task_community',o.task_community,'textarea')+field('أسئلة المدارسة','discussion',o.discussion,'textarea')+field('نشاط الأسبوع','activity',o.activity,'textarea'));break;
case 'followup':o=rows('followups').find(f=>f.student_id===id&&f.week_id===state.week)||{};dialog('متابعة '+name('students',id),field('المجلس','majlis',o.majlis||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('لقاء الأسرة','family_meeting',o.family_meeting||'','text',false,[['','لم يسجل'],['present','حاضرة'],['late','متأخرة'],['excused','غائبة بعذر'],['absent','غائبة']])+field('أيام الورد','wird_days',o.wird_days??'','number')+['triple_task','transferred_lesson','rotating_task'].map((k,i)=>field(['المهمة الثلاثية','الدرس المنقول','المهمة الدوارة'][i],k,o[k]||'','text',false,[['','لم يسجل'],['done','أنجزت'],['partial','بعضها'],['none','لم تنجز']])).join('')+field('ملاحظة','note',o.note,'textarea'));break;
case 'card':o=rows('cards').filter(c=>c.student_id===id);dialog('تقييم جوانب الغارسة',aspects.map((aspect,i)=>field(aspect,'aspect'+i,o.find(c=>c.aspect===aspect&&c.stage===(team()?'first':'self'))?.level??0,'text',true,levels.map((t,n)=>[n,t]))).join(''));break;
case 'newquestion':dialog('سؤال جديد',field('نوع السؤال','kind','general','text',true,[['fiqh','فقهي'],['fikr','فكري'],['general','عام']])+field('نص السؤال','body','','textarea',true));break;
case 'answer':o=rows('questions').find(x=>x.id===id)||{};dialog('إجابة السؤال',field('السؤال','question',o.body,'textarea')+field('الإجابة','answer',o.answer||'','textarea',true)+field('الحال','status',o.status||'open','text',true,[['open','جديد'],['sent','عند المرجعية'],['answered','أجيب']])+field('النشر للجميع دون اسم','published',String(!!o.published),'text',true,[['false','لا'],['true','نعم']]));break;
case 'newannouncement':dialog('إعلان جديد',field('العنوان','title','','text',true)+field('نص الإعلان','body','','textarea',true)+field('الأُسرة','family_id','','text',false,stSelect)+field('مثبت','pinned','false','text',false,[['false','لا'],['true','نعم']]));break;
case 'newresource':dialog('مصدر جديد',field('العنوان','title','','text',true)+field('الرابط','url','','url',true)+field('النوع','kind','link','text',true,[['recording','تسجيل'],['file','ملف'],['link','رابط']]));break;
case 'newtask':dialog('مهمة جديدة',field('القسم','section','task','text',true,[['decision','قرار'],['task','مهمة'],['launch','شرط انطلاق'],['closing','قائمة الختام']])+field('المهمة','body','','textarea',true)+field('المسؤول','owner')+field('موعد الإنجاز','due_on','','date'));break;
case 'newjournal':dialog('تدوين التجربة',field('الأسبوع','week_id',state.week,'text',true,rows('weeks').filter(w=>w.kind==='program').map(w=>[w.id,w.title]))+field('ما نجح','success','','textarea')+field('ما تعثر','obstacle','','textarea')+field('القرار','decision','','textarea'));break;
case 'editaccount':dialog('مراجعة الحساب',field('الاسم','name',o.name,'text',true)+field('الصفة','role',o.role,'text',true,[['pending','ينتظر'],['gharisa','غارسة'],['musaida','مساعدة المرافقة'],['murafiqa','المرافقة'],...(state.account?.role==='admin'?[['admin','الإدارة']]:[]),['disabled','موقوف']])+field('اللقب','title',o.title)+field('سجل الغارسة','student_id',o.student_id||'','text',false,[['','بدون ربط'],...rows('students').map(s=>[s.id,s.name])]));break;
case 'doc':o=rows('docs_family').find(d=>d.family_id===state.family&&d.kind===id)||{};dialog('وثيقة الأسرة',field('نص الوثيقة','body',o.body,'textarea',true));break;
case 'assignrole':dialog('توزيع مهمة دوارة',field('المهمة','task','munassiqa','text',true,[['munassiqa','المنسقة'],['fiqhiya','المسؤولة الفقهية'],['fikriya','المسؤولة الفكرية'],['ijtimaiya','المسؤولة الاجتماعية'],['ataa','مسؤولة العطاء']])+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name]))+field('الدورة','cycle',setting('current_cycle',1),'number',true));break;
case 'assignleader':dialog('مديرة اللقاء',field('الأسبوع','week_id',state.week,'text',true,rows('weeks').filter(x=>x.kind==='program').map(x=>[x.id,x.title]))+field('الغارسة','student_id','','text',true,rows('students').filter(x=>x.family_id===state.family).map(x=>[x.id,x.name])));break;
case 'newevent':dialog('موعد جديد',field('عنوان الموعد','title','','text',true)+field('نوع الموعد','kind','مجلس الإدارة')+field('وقت الموعد','starts_at','','datetime-local')+field('المدة بالدقائق','duration_minutes',90,'number')+field('المكان أو الرابط','place')+field('ملاحظات','notes','','textarea'));break;
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
else if(a==='editweek')await save('weeks',{...x,id:state.week});
else if(a==='followup'){for(const k of ['majlis','family_meeting','triple_task','transferred_lesson','rotating_task'])x[k]||=null;x.wird_days=x.wird_days===''?null:Number(x.wird_days);await save('followups',{...x,student_id:id,week_id:state.week,recorded_by:state.user.id},'student_id,week_id')}
else if(a==='card'){const objects=aspects.map((aspect,i)=>({student_id:id,aspect,stage:team()?'first':'self',level:Number(x['aspect'+i]),evaluator_id:state.user.id}));const{error}=await db.from('cards').upsert(objects,{onConflict:'student_id,aspect,stage'});if(error)throw error;await read('cards');flash('حُفظ التقييم')}
else if(a==='newquestion')await save('questions',{...x,student_id:state.account.student_id});
else if(a==='answer')await save('questions',{id,answer:x.answer,status:x.status,published:bo(x.published),answered_at:x.status==='answered'?new Date().toISOString():null});
else if(a==='newannouncement')await save('announcements',{...x,family_id:x.family_id||null,pinned:bo(x.pinned),author_id:state.user.id});
else if(a==='newresource'){if(!/^https?:\/\//i.test(x.url))throw Error('رابط المصدر يجب أن يبدأ بـ https:// أو http://');await save('resources',x)}
else if(a==='newtask')await save('tasks',{...x,due_on:x.due_on||null});
else if(a==='newjournal')await save('journal',{...x,author_id:state.user.id});
else if(a==='editaccount'){const{error}=await db.from('accounts').update({...x,student_id:x.student_id||null}).eq('user_id',id);if(error)throw error;await read('accounts');flash('حُفظت صلاحية الحساب')}
else if(a==='doc')await save('docs_family',{...x,kind:id,family_id:state.family},'family_id,kind');
else if(a==='assignrole')await save('roles_family',{family_id:state.family,student_id:x.student_id,task:x.task,cycle:Number(x.cycle)},'family_id,task,cycle');
else if(a==='assignleader')await save('rota_leader',{family_id:state.family,week_id:x.week_id,student_id:x.student_id},'family_id,week_id');
else if(a==='newevent')await save('events',{...x,starts_at:x.starts_at||null,duration_minutes:Number(x.duration_minutes||90),week_id:state.week,family_id:null});
else if(a==='newminute')await save('minutes',{...x,family_id:state.family,attendance_count:x.attendance_count?Number(x.attendance_count):null,author_id:state.user.id});
$('.dialog-backdrop')?.remove();state.editing=null;render();
}
document.addEventListener('click',async e=>{
const el=e.target.closest('[data-action],[data-page],[data-week]');
if(!el)return;
if(el.dataset.page){state.page=el.dataset.page;$('.dialog-backdrop')?.remove();render();window.scrollTo({top:0,behavior:'instant'});return}
if(el.dataset.week){state.week=el.dataset.week;render();return}
const action=el.dataset.action;
try{
if(action==='signin'||action==='signup'){state.authTab=action;render()}
else if(action==='logout'){await db.auth.signOut();state.user=null;state.account=null;render()}
else if(action==='refresh')await start();
else if(action==='reset'){const email=prompt('أدخلي بريدكِ الإلكتروني لإرسال رابط إعادة كلمة المرور');if(email){const{error}=await db.auth.resetPasswordForEmail(email,{redirectTo:location.href});if(error)throw error;flash('إن كان البريد مسجلاً، سيصلك رابط إعادة كلمة المرور')}}
else if(action==='close')$('.dialog-backdrop')?.remove();
else if(action==='print')window.print();
else if(action==='shiftcalendar'){const newDate=$('#f_first_start')?.value;if(!newDate)throw Error('اختاري التاريخ الجديد');if(!confirm('ستتغير تواريخ جميع الأسابيع والمواعيد. هل تؤكدين؟'))return;const {data,error}=await db.rpc('shift_program',{p_first_week:newDate});if(error)throw error;await load();flash('تمت إزاحة التقويم بمقدار '+data+' يوم')}
else if(action==='more'){const nav=team()?teamNav:studentNav;dialog('انتقلي إلى صفحة',nav.map(([key,label])=>'<button type="button" class="btn secondary" style="margin:3px" data-page="'+key+'">'+label+'</button>').join(''),'إغلاق')}
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
