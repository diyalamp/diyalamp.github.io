const stage = document.querySelector('.editorial');
const caption = document.querySelector('#scene-caption');
const pause = document.querySelector('#pause');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const scenes = ['Start with your own argument.', 'Examine the assumption behind the claim.', 'Bring evidence into the review.', 'Revise the claim to reflect what you know.', 'You approve the change.'];
let elapsed = 0, previous = performance.now(), stopped = reduced.matches;
function paint(){ const phase = Math.min(4, Math.floor((elapsed % 16000)/3200)); stage.dataset.phase = reduced.matches ? '4' : String(phase); caption.textContent = scenes[reduced.matches ? 4 : phase]; }
function tick(now){ if(!stopped) elapsed += now-previous; previous=now; paint(); requestAnimationFrame(tick); }
pause.textContent=stopped?'Play':'Pause';
pause.addEventListener('click',()=>{ stopped=!stopped; pause.textContent=stopped?'Play':'Pause'; stage.classList.toggle('paused',stopped); });
document.querySelector('#replay').addEventListener('click',()=>{elapsed=0; stopped=false; pause.textContent='Pause'; stage.classList.remove('paused'); paint();});
reduced.addEventListener('change',()=>{stopped=reduced.matches; pause.textContent=stopped?'Play':'Pause'; paint();});
paint(); requestAnimationFrame(tick);
