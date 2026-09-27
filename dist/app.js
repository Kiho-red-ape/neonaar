const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#site-menu');
function setMenu(open){menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');}
toggle.addEventListener('click',()=>setMenu(menu.hidden));
document.addEventListener('click',event=>{if(!event.target.closest('.header'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){setMenu(false);toggle.focus();}});
menu.addEventListener('focusout',event=>{if(!event.relatedTarget?.closest('.header'))setMenu(false);});
const form=document.querySelector('#enquiry-form');
if(form){
 const select=document.querySelector('#material-select');
 const params=new URLSearchParams(location.search);
 const industry=document.querySelector('select[name="Industry"]');
 if(industry&&[...industry.options].some(o=>o.value===params.get('industry')))industry.value=params.get('industry');
 const request=document.querySelector('#request-select');
 if(request&&[...request.options].some(o=>o.value===params.get('request')))request.value=params.get('request');
 const selected=params.get('material');
 if([...select.options].some(o=>o.value===selected))select.value=selected;
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);
  const body=[...data].map(([k,v])=>`${k}: ${String(v).trim()||'Not specified'}`).join('\r\n');
  const href=`mailto:hello@neonaar.com?subject=${encodeURIComponent('NeoNaar enquiry — '+(data.get('Material')||'Material evaluation'))}&body=${encodeURIComponent(body)}`;
  const fallback=document.querySelector('#email-fallback');fallback.href=href;fallback.hidden=false;
  const status=document.querySelector('#form-status');status.textContent='Your draft is ready. Send it from your email app. If no app opened, email hello@neonaar.com with your details.';status.hidden=false;
  location.href=href;
 });
}

// Calm fixed-frame scenes, with a shared pause control for the homepage lettering.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[...document.querySelectorAll('[data-motion-scene]')];
for(const scene of scenes){
 const button=scene.querySelector('[data-motion-toggle]');const film=scene.querySelector('video');
 let userPaused=false;
 const apply=()=>{const paused=userPaused||reducedMotion.matches;scene.dataset.paused=String(paused);button.textContent=paused?'▶':'Ⅱ';button.setAttribute('aria-label',paused?'Play background motion':'Pause background motion');button.title=button.getAttribute('aria-label');if(film){if(paused)film.pause();else film.play().catch(()=>scene.classList.add('no-video'));}};
 button.addEventListener('click',()=>{userPaused=!userPaused;apply()});reducedMotion.addEventListener('change',apply);if(film)film.addEventListener('error',()=>scene.classList.add('no-video'));apply();
}
const suffix=document.querySelector('#neo-suffix');
if(suffix){const words=['Naar','Cell','Nilam'];let index=0;const reset=()=>{if(reducedMotion.matches){index=0;suffix.textContent=words[0]}};reducedMotion.addEventListener('change',reset);reset();setInterval(()=>{if(document.hidden||reducedMotion.matches||document.querySelector('.calm-hero')?.dataset.paused==='true')return;index=(index+1)%words.length;suffix.textContent=words[index];suffix.animate([{opacity:0},{opacity:1}],{duration:750,easing:'ease-out'});},5000);}
// Small pointer-driven movement stays inside each product image frame.
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
for(const frame of document.querySelectorAll('.product-texture,.choice-image,.material-image')){
 if(!frame.querySelector('img[src*="neocell-"],img[src*="neonilam-"]'))continue;
 frame.classList.add('product-motion');
 const reset=()=>{frame.style.setProperty('--tilt-x','0deg');frame.style.setProperty('--tilt-y','0deg');frame.style.setProperty('--image-scale','1')};
 frame.addEventListener('pointermove',event=>{if(!finePointer.matches||reducedMotion.matches)return;const rect=frame.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;frame.style.setProperty('--tilt-x',(-y*3).toFixed(2)+'deg');frame.style.setProperty('--tilt-y',(x*3).toFixed(2)+'deg');frame.style.setProperty('--image-scale','1.018')});
 frame.addEventListener('pointerleave',reset);reducedMotion.addEventListener('change',reset);finePointer.addEventListener('change',reset);reset();
}
