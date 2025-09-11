const CACHE='pulse-guides-v1';
const ASSETS=['./','./index.html','./index.css','./index.js','./privacy.html','./PulseLogo.png','./manifest.webmanifest'];

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
));
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=> 
      r || fetch(e.request).then(net=>{
        if(e.request.method==='GET' && e.request.url.startsWith(self.location.origin)){
          caches.open(CACHE).then(c=>c.put(e.request, net.clone()));
        }
        return net;
      }).catch(()=>r)
    )
  );
});