(() => {
'use strict';
const examples=[
{title:'Context you can bring with you',label:'Selected context',heading:'Bring the useful parts, not everything.',summary:'Choose the context a compatible agent needs. Inspect the proposed scope before handing it over.',before:'Preferences: concise explanations and morning work sessions.',after:'Agent A may read Preferences for this task only.',step:'Inspect this selected context before a handoff.'},
{title:'A boundary for this task',label:'Task-scoped access',heading:'Your private journal stays outside.',summary:'The sample research task needs a summary. It does not need the entire vault. Inspect what is included and excluded.',before:'Available sample notes: Research summary and Private journal.',after:'Agent A may read Research summary. Private journal is excluded.',step:'Keep the private journal outside this sample task.'},
{title:'A thread you can pick up again',label:'Inspectable checkpoint',heading:'Continue from the work already done.',summary:'The fictional task has reviewed sources but has not finished its draft. Inspect the checkpoint before another compatible agent continues.',before:'Checkpoint: sources reviewed; draft unfinished; no actions submitted.',after:'Agent B receives approved context and checkpoint. No private journal access.',step:'Review the unfinished draft checkpoint before continuing.'}
];
let selected=0,inspected=false;const saved=new Set();
const get=id=>document.getElementById(id);
const buttons=[...document.querySelectorAll('[data-goal]')];
function render(){
 const example=examples[selected];
 for(const [id,text]of [['goal-title',example.title],['change-label',example.label],['change-title',example.heading],['change-summary',example.summary],['before-text',example.before],['after-text',example.after]])get(id).textContent=text;
 buttons.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===selected)));
 get('inspect-change').setAttribute('aria-expanded',String(inspected));get('inspect-change').textContent=inspected?'Hide the sample scope':'Inspect the proposed handoff ↗';
 get('source-placeholder').hidden=inspected;get('source-before').hidden=!inspected;get('source-after').hidden=!inspected;
 get('save-step').setAttribute('aria-pressed',String(saved.has(selected)));get('save-step').textContent=saved.has(selected)?'Remove sample checkpoint':'Keep sample checkpoint';
 get('saved-count').textContent=`${saved.size} sample checkpoint${saved.size===1?'':'s'} kept`;
}
buttons.forEach((button,index)=>{
 button.addEventListener('click',()=>{selected=index;inspected=false;render();get('preview-status').textContent=`Sample view: ${examples[selected].title}.`;});
 button.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+buttons.length)%buttons.length;buttons[next].focus();buttons[next].click();});
});
get('inspect-change').addEventListener('click',()=>{inspected=!inspected;render();get('preview-status').textContent=inspected?'Selected sample context and proposed scope are shown beside the handoff.':'Sample scope hidden.';});
get('save-step').addEventListener('click',()=>{saved.has(selected)?saved.delete(selected):saved.add(selected);render();get('preview-status').textContent=saved.has(selected)?`Sample checkpoint kept: ${examples[selected].step} It lasts only while this page stays open.`:'Sample checkpoint removed.';});
render();
})();
