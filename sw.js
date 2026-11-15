'use strict';
// Altere a versão a cada publicação com mudanças nos arquivos do app.
const VERSION='2.1.1';
const BASE=new URL('./',self.location.href);
const PREFIX='corda-shell-'+BASE.pathname.replace(/[^a-z0-9]/gi,'_')+'-';
const CACHE=PREFIX+VERSION;
const FILES=['./','music.js','studio.js','alphatab-1.9.0.mjs','index.html','style.css','app.js','pwa.js','manifest.webmanifest','pick.svg','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png'];
const URLS=new Set(FILES.map(p=>new URL(p,BASE).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([...URLS].map(url=>new Request(url,{cache:'reload'})))));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 if(request.mode==='navigate'){event.respondWith((async()=>{const cache=await caches.open(CACHE);return(await cache.match(BASE.href))||fetch(request);})());return;}
 url.search='';url.hash='';if(!URLS.has(url.href))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),saved=await cache.match(url.href);return saved||fetch(request);})());
});
