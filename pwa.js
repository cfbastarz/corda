'use strict';
(()=>{
 const installButton=document.getElementById('install-app'),dialog=document.getElementById('install-help'),status=document.getElementById('pwa-status'),banner=document.getElementById('update-banner');
 let promptEvent=null,registration=null,reloading=false,installing=false;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function refresh(){installButton.hidden=standalone();status.textContent=navigator.onLine?'':'Offline · suas músicas continuam disponíveis';}
 refresh();addEventListener('online',refresh);addEventListener('offline',refresh);matchMedia('(display-mode: standalone)').addEventListener('change',refresh);
 addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;installButton.textContent='↓ Instalar app';});
 addEventListener('appinstalled',()=>{promptEvent=null;refresh();});
 installButton.onclick=async()=>{if(promptEvent){const p=promptEvent;promptEvent=null;await p.prompt();await p.userChoice;refresh();}else dialog.showModal();};
 document.getElementById('close-install').onclick=()=>dialog.close();
 document.getElementById('check-update').onclick=async()=>{if(!registration){status.textContent='A instalação requer HTTPS ou localhost.';return;}if(!navigator.onLine){status.textContent='Conecte-se à internet para buscar atualizações.';return;}try{await registration.update();status.textContent=registration.waiting?'Uma atualização está pronta.':registration.installing?'Baixando atualização…':'Busca concluída. Se houver atualização, avisaremos aqui.';}catch{status.textContent='Não foi possível buscar atualizações. Tente novamente.';}};
 function announce(){if(registration?.waiting){banner.hidden=false;document.getElementById('apply-update').disabled=false;}}
 document.getElementById('later-update').onclick=()=>banner.hidden=true;
 document.getElementById('apply-update').onclick=()=>{if(!registration?.waiting)return;window.dispatchEvent(new Event('corda:before-update'));reloading=true;document.getElementById('apply-update').disabled=true;registration.waiting.postMessage({type:'SKIP_WAITING'});};
 if('serviceWorker' in navigator&&['https:','http:'].includes(location.protocol)){
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)location.reload();});
 addEventListener('load',async()=>{try{registration=await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});announce();registration.addEventListener('updatefound',()=>{const worker=registration.installing;if(!worker)return;installing=true;worker.addEventListener('statechange',()=>{if(worker.state==='installed'){installing=false;if(navigator.serviceWorker.controller)announce();else status.textContent='Pronto para usar offline.';}});});await navigator.serviceWorker.ready;if(!registration.waiting&&!installing)status.textContent=navigator.onLine?'Pronto para usar offline.':'Offline · suas músicas continuam disponíveis';}catch{status.textContent='Uso offline indisponível. O editor continua funcionando.';}});
 }
})();
