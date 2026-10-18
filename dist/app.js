(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const demo = byId('demo');
  if (!demo) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const agentButtons = [...document.querySelectorAll('[data-select-agent]')];
  const modelButtons = [...document.querySelectorAll('[data-model]')];
  const heroModelButtons = [...document.querySelectorAll('[data-hero-model]')];
  const recordButtons = [...document.querySelectorAll('[data-record-tab]')];
  const traceButtons = [...document.querySelectorAll('button[data-trace]')];
  const definitions = {
    atlas: {
      name:'Atlas', letter:'A', role:'Research & synthesis', model:'Claude',
      purpose:'Explore a question, keep the evidence, and return with a useful next step.',
      checkpoint:['Compare distributed SQL architectures.','Source comparison saved. Assumptions recorded.','Ask you to review the recommendation.'],
      memory:[['Current focus','Distributed systems and the decisions behind them.'],['Saved comparison','Isolation guarantees, throughput and their tradeoffs.'],['Your last review','Keep benchmark assumptions visible in every comparison.']],
      work:[['Compare architecture tradeoffs','A comparison with its source material and open questions.','Ready for your review'],['Maintain a reading list','Return to the question without rebuilding the context.','Scheduled']],
      instructions:[['Work from evidence','Prefer primary sources and preserve their references.'],['Make uncertainty visible','Separate observations, assumptions and conclusions.'],['Keep you in control','Ask before sharing or taking an external action.']]
    },
    forge: {
      name:'Forge', letter:'F', role:'Engineering & systems', model:'GPT',
      purpose:'Develop an implementation, preserve the reasoning, and keep the next step explicit.',
      checkpoint:['Make interrupted tasks recoverable.','Failure boundary and proposed change saved.','Ask you to approve the bounded change.'],
      memory:[['Project context','A small service with explicit ownership and recoverable task state.'],['Saved constraint','Keep provider credentials outside browser code and prompts.'],['Your last review','Show the failure case before proposing the next change.']],
      work:[['Review a recovery boundary','Inspect the checkpoint and the unresolved failure case.','Awaiting your decision'],['Prepare a focused change','A bounded implementation plan with validation steps.','Queued']],
      instructions:[['Keep scope clear','Prefer a small, inspectable change over a broad rewrite.'],['Record the reasoning','Preserve decisions and their limitations with the task.'],['Respect approvals','Ask before an external write or deployment.']]
    },
    scout: {
      name:'Scout', letter:'S', role:'Signals & discovery', model:'Gemini',
      purpose:'Follow a question over time and bring back the changes worth a closer look.',
      checkpoint:['Track meaningful changes in agent tooling.','Source list and previous findings saved.','Revisit selected sources at the next check.'],
      memory:[['Current watchlist','Open-source infrastructure and changes in agent tooling.'],['Saved preference','Prioritize substantial changes over launch-day noise.'],['Your last review','Explain what changed and why it affects the open question.']],
      work:[['Review a new signal','Source material is saved with the proposed interpretation.','Ready for your review'],['Revisit an open question','A future check that starts from the previous findings.','Scheduled']],
      instructions:[['Keep the source','Every finding should remain linked to its origin.'],['Avoid repeated alerts','Connect new information to what is already recorded.'],['Respect boundaries','Read selected sources; ask before publishing.']]
    }
  };
  const initialState = () => Object.fromEntries(Object.entries(definitions).map(([id, definition]) => [id, {model:definition.model, paused:false, events:[]} ]));
  let state = initialState(), selected = 'atlas', recordTab = 'work', motionPaused = reducedMotion.matches;
  const set = (id, value) => { byId(id).textContent = value; };
  const announce = message => set('demo-status', message);
  function icon(kind) {
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('ui-icon');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',({memory:'M5 4h14v16H5z M9 9h6 M9 13h6',pause:'M9 5v14 M15 5v14',play:'m9 5 10 7-10 7z',check:'m5 12 4 4L19 6'})[kind]);
    svg.append(path);return svg;
  }
  function lift(element) {
    if (motionPaused || reducedMotion.matches) return;
    element.animate([{opacity:.55,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  function memoryFlash() {
    const box=byId('continuity-summary');box.classList.remove('flash');
    if(motionPaused || reducedMotion.matches)return;
    void box.offsetWidth;box.classList.add('flash');
  }
  function modelChangePulse() {
    const sketch=document.querySelector('.continuity-sketch');sketch.classList.remove('model-changed');
    if(motionPaused || reducedMotion.matches)return;
    void sketch.offsetWidth;sketch.classList.add('model-changed');
  }
  function renderRecords() {
    const definition=definitions[selected], current=state[selected], list=byId('record-list');
    const content=definition[recordTab];list.replaceChildren();
    const descriptions={memory:['A record you can inspect.', '3 saved memories'],work:['Work with a next step.', '2 tasks'],instructions:['An explicit brief.', '3 instructions']};
    set('record-heading',descriptions[recordTab][0]);set('record-label',descriptions[recordTab][1]);
    for(const [title,description,status] of content){
      const item=document.createElement('li');
      const mark=document.createElement('span');mark.className='memory-icon';mark.append(icon(recordTab==='work'?'check':'memory'));
      const copy=document.createElement('div'), strong=document.createElement('strong'), paragraph=document.createElement('p');
      strong.textContent=title;paragraph.textContent=description;copy.append(strong,paragraph);
      if(status){const detail=document.createElement('span');detail.className='work-state';detail.textContent=current.paused?'Paused · checkpoint kept':status;copy.append(detail);}
      const saved=document.createElement('span');saved.className='memory-saved';saved.setAttribute('aria-hidden','true');saved.append(icon('check'));
      item.append(mark,copy,saved);list.append(item);
    }
    recordButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordTab===recordTab)));
  }
  function renderEvents() {
    const definition=definitions[selected], current=state[selected], list=byId('event-list');
    const items=[['Agent identity created',definition.name+' has its own instructions and record.'],['Memory saved','Three records belong to '+definition.name+'.'],...current.events];
    if(!current.events.length)items.push(['Ready for a model change','Try another model. The saved records stay in place.']);
    list.replaceChildren();
    items.slice(-4).forEach(([title,description],index,array)=>{
      const item=document.createElement('li'),node=document.createElement('span'),copy=document.createElement('div'),strong=document.createElement('strong'),p=document.createElement('p');
      node.className='event-node'+(index===array.length-1?' current':'');node.setAttribute('aria-hidden','true');
      strong.textContent=title;p.textContent=description;copy.append(strong,p);item.append(node,copy);list.append(item);
    });
  }
  function render() {
    const definition=definitions[selected],current=state[selected];demo.dataset.agent=selected;
    set('breadcrumb-agent',definition.name);set('active-name',definition.name);set('active-role',definition.role);set('active-glyph',definition.letter);set('agent-purpose',definition.purpose);
    byId('active-glyph').className='agent-glyph large-glyph '+selected+'-glyph';
    byId('agent-state').dataset.paused=String(current.paused);set('agent-state-text',current.paused?'Paused':'Active');
    const pause=byId('pause-agent');pause.replaceChildren(document.createTextNode(current.paused?'Resume agent':'Pause agent'),icon(current.paused?'play':'pause'));pause.setAttribute('aria-pressed',String(current.paused));
    agentButtons.forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.selectAgent===selected));button.dataset.paused=String(state[button.dataset.selectAgent].paused);});
    modelButtons.forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.model===current.model));button.setAttribute('aria-label','Use '+button.dataset.model+' for '+definition.name);});
    set('task-goal',definition.checkpoint[0]);set('task-checkpoint',definition.checkpoint[1]);set('task-next',current.paused?'Waiting for you to resume.':definition.checkpoint[2]);set('run-record-status',current.paused?'Paused · record kept':'Checkpoint saved');set('run-identity','agent / '+selected);
    heroModelButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.heroModel===state.atlas.model)));set('hero-model-note',state.atlas.model+' reasons. Atlas keeps the record.');
    set('continuity-count','3 memories retained');set('continuity-copy',current.paused?'Execution pauses. The saved record stays with '+definition.name+'.':'Memory belongs to '+definition.name+', not the model selection.');
    renderRecords();renderEvents();
  }
  agentButtons.forEach(button=>button.addEventListener('click',()=>{
    selected=button.dataset.selectAgent;recordTab='work';render();lift(byId('agent-workspace')||document.querySelector('.agent-overview'));
    announce(definitions[selected].name+' selected.');
  }));
  modelButtons.forEach(button=>button.addEventListener('click',()=>{
    const current=state[selected],name=definitions[selected].name,newModel=button.dataset.model;
    if(current.model===newModel){announce(newModel+' is already selected.');return;}
    const old=current.model;current.model=newModel;current.events.push(['Model selection changed',old+' → '+newModel+'. Identity, task checkpoint and memory retained.']);current.events=current.events.slice(-3);
    render();memoryFlash();if(selected==='atlas')modelChangePulse();lift(byId('event-list'));
    announce('Model updated. Memory and task checkpoint retained.');
  }));
  heroModelButtons.forEach(button=>button.addEventListener('click',()=>{selected='atlas';recordTab='work';render();modelButtons.find(model=>model.dataset.model===button.dataset.heroModel).click();lift(document.querySelector('.agent-paper'));}));
  recordButtons.forEach(button=>button.addEventListener('click',()=>{recordTab=button.dataset.recordTab;renderRecords();lift(byId('record-panel'));announce(definitions[selected].name+'’s '+recordTab+'.');}));
  byId('pause-agent').addEventListener('click',()=>{
    const current=state[selected],name=definitions[selected].name;current.paused=!current.paused;
    current.events.push([current.paused?'Paused by you':'Resumed by you',current.paused?'Task checkpoints and saved memory remain in place.':'Continue from the saved checkpoint with '+current.model+'.']);current.events=current.events.slice(-3);
    render();lift(byId('event-list'));announce(name+' '+(current.paused?'paused. Progress retained.':'resumed from its checkpoint.'));
  });
  traceButtons.forEach(button=>button.addEventListener('click',()=>{
    const flow=byId('architecture-flow'),trace=button.dataset.trace;flow.classList.remove('trace-pulse');flow.dataset.trace=trace;
    traceButtons.forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
    set('architecture-note',trace==='model'?'A scoped request reaches the open-source engine, which calls your selected model through OpenRouter.':'The engine checkpoints the task to the agent’s isolated store. The database preserves state; workers execute the task.');
    if(!motionPaused && !reducedMotion.matches){void flow.offsetWidth;flow.classList.add('trace-pulse');}
  }));
  for(const group of [agentButtons,modelButtons,heroModelButtons,recordButtons,traceButtons])group.forEach((button,index)=>button.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?group.length-1:(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)+group.length)%group.length;group[next].focus();group[next].click();
  }));
  byId('reset-demo').addEventListener('click',()=>{state=initialState();selected='atlas';recordTab='work';render();byId('continuity-summary').classList.remove('flash');announce('Workspace reset.');});
  function renderMotion(){document.documentElement.classList.toggle('motion-paused',motionPaused);const button=byId('motion-toggle');button.setAttribute('aria-pressed',String(motionPaused));button.setAttribute('aria-label',motionPaused?'Resume decorative animation':'Pause decorative animation');button.replaceChildren(icon(motionPaused?'play':'pause'));}
  byId('motion-toggle').addEventListener('click',()=>{motionPaused=!motionPaused;renderMotion();announce(reducedMotion.matches?'Reduced motion enabled.':motionPaused?'Animation paused.':'Animation resumed.');});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)motionPaused=true;renderMotion();});
  render();renderMotion();
})();
