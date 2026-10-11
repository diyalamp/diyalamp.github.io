const stage=document.querySelector('.editorial');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const action=document.querySelector('#review-action');
const phases=[
['📝 Raw input','Start with what you think.','Your claim, observations, and uncertainties can start in the same messy draft.','We’ll separate them before polishing the prose.','Rough draft','🔎 Map argument'],
['🔎 Argument map','What connects the evidence to the claim?','Claim: shorter setup improves activation. Observation: 18 of 40 accounts stopped during setup.','Missing bridge: we do not yet know why they stopped.','Argument mapped','🛡️ Stress-test'],
['🛡️ Stress test','Imagine the change failed.','A shorter setup might leave users less prepared, or leave the real blocker untouched.','What if low intent or unclear value explains the drop-off?','Objections surfaced','🧭 Check assumptions'],
['🧭 Assumption check','Does the draft overstate what we know?','“Will improve” is stronger than the evidence supports. Activation and retention are separate outcomes.','Supply the missing context; do not turn an assumption into a fact.','Needs your evidence','⚖️ Define decision'],
['⚖️ Decision criteria','What would change your mind?','Run a reversible pilot. Define activation, a comparison group, and the measurement window before starting.','Set a stop threshold with your team. Do not invent a target from this draft.','Decision framed','✍️ Shape draft'],
['✍️ Final structure','Lead with the proposal and its limits.','Propose a pilot first, then show the observation, uncertainty, alternatives, and decision criteria.','The draft is ready for your review. Its missing measurements remain explicit.','Awaiting your approval','✅ Mark ready'],
['✅ Author approval','Your draft. Your decision.','You have approved the proposed structure and acknowledged its open questions.','Revisit the decision when new evidence arrives.','Ready','📝 Start again']
];
let phase=0,timer;
function paint(n){phase=n;stage.dataset.phase=n;const p=phases[n];['phase-label','phase-title','review-text','objection-text','review-status'].forEach((id,i)=>document.getElementById(id).textContent=p[i]);action.textContent=p[5];document.querySelector('#draft-status').textContent=p[4];document.querySelectorAll('.phase-progress i').forEach((dot,i)=>dot.classList.toggle('complete',i<n));}
function stop(){clearTimeout(timer);}
action.addEventListener('click',()=>{stop();paint((phase+1)%phases.length);});
function tour(){if(reduced.matches)return;timer=setTimeout(()=>{paint(phase+1);if(phase<5)tour();},3600);}
reduced.addEventListener('change',()=>{stop();paint(0);});
paint(0);tour();
