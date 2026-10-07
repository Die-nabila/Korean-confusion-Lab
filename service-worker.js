const C='klab-v4',F=['./','index.html','styles.css','app.js','manifest.json','data/confusions.js','data/confusions-more.js','data/confusions-3.js','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(e.request,k));return x}).catch(()=>caches.match('index.html'))))});
