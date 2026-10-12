const $=id=>document.getElementById(id);
const originalClaim='Price is causing the decline in conversion.';
const revisedClaim='Price came up in three of twelve interviews; its effect on conversion remains untested.';
const strongerClaim='Customer interviews prove that lowering prices will improve conversion.';
let stage='original';
function insight(title,text,actions=[]){$('insight').hidden=false;$('insight-title').textContent=title;$('insight-text').textContent=text;$('insight-actions').replaceChildren();for(const [label,fn] of actions){const button=document.createElement('button');button.className='button';button.textContent=label;button.onclick=fn;$('insight-actions').append(button);}}
function setClaim(text,status){$('claim').textContent=text;$('check-state').textContent=status;}
function accept(){stage='reviewed';setClaim(revisedClaim,'Reviewed wording · source unchanged');$('later-edit').disabled=false;insight('A narrower claim, with the uncertainty intact.','This example records a check for this exact wording and source. It is not a guarantee that the source itself is correct.',[['Undo revision',reset]]);}
function restoreWording(){stage='restored';setClaim(revisedClaim,'Check still open · wording restored');insight('The wording is restored. The check stays open.','Undo does not reinstate an earlier review. Explicitly check this revision against the linked source.',[['Recheck restored wording',examine]]);}
function examine(){if(stage==='restored'){insight('Review the restored wording against its source.','The passage reports three price objections and no causal test. This narrower wording preserves those limits.',[['Confirm source review',accept]]);return;}if(stage==='reviewed'){insight('This wording matches the scope of the supplied passage.','Try the stronger rewrite to see why a check must follow changes to the draft.');return;}insight(stage==='changed'?'The old check no longer applies.':'The source does not establish causation.','The interviews report price objections, not a tested effect on conversion. Proposed revision: “'+revisedClaim+'”',[['Accept scoped revision',accept],['Keep wording',()=>insight('Wording kept. Check remains open.','The source does not establish the causal claim. You can add stronger evidence or reconsider the wording.')]]);}
function reset(){stage='original';setClaim(originalClaim,'Needs review · causal claim');$('later-edit').disabled=true;$('insight').hidden=true;}
$('examine').onclick=examine;
$('later-edit').onclick=()=>{stage='changed';setClaim(strongerClaim,'Check reopened · wording changed');$('later-edit').disabled=true;insight('A smoother sentence has become a stronger claim.','“Prove” and “will improve” go beyond the linked interview passage. The earlier review belongs to the previous wording.',[['Review changed claim',examine],['Undo stronger rewrite',restoreWording]]);};
$('reset-demo').onclick=reset;
const modal=$('availability');document.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{$('plan-name').textContent=b.dataset.plan;modal.showModal();});document.querySelector('.close').onclick=()=>modal.close();$('modal-sample').onclick=()=>{modal.close();$('practice').scrollIntoView({behavior:'smooth'});$('examine').focus({preventScroll:true});};

// Selectable, sequential method emphasis without extra explanatory copy.
const methodRows=[...document.querySelectorAll('.hero-methods li')];
let methodIndex=0;
function selectMethod(index){methodIndex=index;methodRows.forEach((row,i)=>{row.classList.toggle('method-active',i===index);row.querySelector('button')?.setAttribute('aria-pressed',String(i===index));});}
methodRows.forEach((row,index)=>{
 const number=row.querySelector('.step-number');const name=row.querySelector('.method-name');
 const button=document.createElement('button');button.className='method-select';button.append(number,name);row.prepend(button);
 button.addEventListener('click',()=>selectMethod(index));
});
if(methodRows.length){selectMethod(0);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{if(!document.hidden)selectMethod((methodIndex+1)%methodRows.length);},2400);}

// Reveal once, and only when motion is welcome. Content is visible without JavaScript.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!motionPreference.matches && 'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}},{threshold:.08});document.querySelectorAll('.section,.demo-section').forEach(section=>{section.classList.add('reveal');observer.observe(section);});}
