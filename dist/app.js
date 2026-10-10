const stage=document.querySelector('.editorial');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const action=document.querySelector('#review-action');
const buttons=['🔎 Review argument','📎 Add evidence','✍️ Propose revision','✅ Approve revision','📝 Start again'];
const statuses=['Ready to review','Assumption found','Evidence included','Revision ready','Approved'];
let phase=0,timer;
function paint(n){phase=n;stage.dataset.phase=n;action.textContent=buttons[n];document.querySelector('#review-status').textContent=statuses[n];}
function advance(){paint((phase+1)%5);}
function stop(){clearTimeout(timer);}
action.addEventListener('click',()=>{stop();advance();});
function tour(){if(reduced.matches)return;timer=setTimeout(()=>{advance();if(phase<4)tour();},3000);}
reduced.addEventListener('change',()=>{stop();paint(0);});
paint(0);tour();
