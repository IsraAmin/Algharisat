const CACHE_NAME='algharisat-shell-v1';
const FILES=['./','./index.html','./style.css','./app.bundle.js','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(req.cache==='only-if-cached'&&req.mode!=='same-origin')return;
  event.respondWith(fetch(req).then(res=>{
    if(res.ok&&res.type==='basic'){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)).catch(()=>{});}
    return res;
  }).catch(()=>caches.match(req).then(cached=>cached||Response.error())));
});
