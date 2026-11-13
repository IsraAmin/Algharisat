import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
let problems=[];
for(const viewport of [{width:1365,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport,locale:'ar-SA'});
  page.on('pageerror',err=>{problems.push(err.message);console.error('PAGE ERROR',err.message)});page.on('console',msg=>{if(msg.type()==='error')console.error('CONSOLE ERROR',msg.text())});page.on('requestfailed',req=>console.error('REQUEST FAILED',req.url(),req.failure()?.errorText));
  const response=await page.goto('https://utlcejgzkrvdhojrnxcm.supabase.co/functions/v1/algharisat',{waitUntil:'networkidle',timeout:45000});
  if(response?.status()!==200)throw new Error('Page status: '+response?.status());
  try{await page.getByText('تسجيل الدخول').first().waitFor({timeout:10000})}catch(error){console.error('BODY:',(await page.locator('body').innerText()).slice(0,1600));console.error('URL:',page.url());throw error}
  const inputs=await page.locator('#authForm input').count();
  if(inputs!==2)throw new Error('Sign-in inputs mismatch: '+inputs);
  const horizontal=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  if(horizontal)throw new Error('Horizontal scroll on viewport '+viewport.width);
  await page.getByText('حساب جديد').first().click();
  if(await page.locator('#authForm input').count()!==4)throw new Error('Registration fields missing');
  await page.close();
}
await browser.close();
if(problems.length)throw new Error('Browser runtime errors: '+problems.join(' | '));
console.log('Desktop and mobile entry/login/registration smoke tests passed');
