(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const demo = byId('demo');
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenarios = [...document.querySelectorAll('[data-scenario].scenario')];
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const agents = [...document.querySelectorAll('[data-agent]')];
  const names = {shopify:'Commerce',printify:'Merch',domain:'Domain'};
  const addresses = {shopify:'shop.example.invalid / settings',printify:'merch.example.invalid / products',domain:'domain.example.invalid / connections'};
  let scenario = 'currency', tab = 'shopify', phase = 0, conflict = false, paused = media.matches;
  const set = (id, value) => { byId(id).textContent = value; };
  function announce(value) { set('demo-status', value); }
  function animate(element) {
    if (paused || media.matches) return;
    element.getAnimations().forEach(animation => animation.cancel());
    element.animate([{transform:'translateY(5px)'},{transform:'translateY(0)'}], {duration:360,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  function row(parent, label, value) {
    const line = document.createElement('div'); line.className = 'setting-row';
    const key = document.createElement('span'); key.textContent = label;
    const content = document.createElement('strong'); content.textContent = value;
    line.append(key,content); parent.append(line);
  }
  function page() {
    const box = byId('page-content'); box.replaceChildren();
    const label = document.createElement('p'); label.className='label';
    const heading = document.createElement('h3'); const description = document.createElement('p');
    box.append(label,heading,description);
    if (tab === 'shopify') {
      set('page-app','Store settings'); label.textContent='Market preferences'; heading.textContent='Make the same decision once.';
      description.textContent='Your storefront, product prices and launch checks should agree on the currency.';
      row(box,'Store currency',scenario==='currency' && phase===0?'Awaiting decision':'USD');
      row(box,'Decision status',scenario==='currency'?(phase===0?'Needs your input':phase===1?'New revision · Review needed':'USD revision approved'):'Shared with the team');
      if (scenario==='handoff') row(box,'Product handoff',phase?'2 product drafts ready':'Waiting for Merch');
    } else if (tab === 'printify') {
      set('page-app','Product workspace'); label.textContent='Print-on-demand catalog'; heading.textContent='A handoff, not another relay.';
      description.textContent='Merch prepares the product drafts. Commerce receives their references and can continue the listing work.';
      row(box,'Product drafts','Notebook · Ceramic mug'); row(box,'Currency',scenario==='currency' && phase===0?'Waiting for a decision':'USD');
      row(box,'Handoff status',scenario==='handoff' && phase?'Recorded · Tab released':'Merch preparing drafts');
    } else {
      set('page-app','Domain connection'); label.textContent='Connection checks'; heading.textContent='Your sign-in stays yours.';
      description.textContent='The Domain agent surfaces the blocker and waits. It resumes only after the fictional user handoff.';
      row(box,'Connection','store.example.invalid'); row(box,'Access',scenario==='login'?(phase?'Example sign-in completed':'Human sign-in needed'):'Check queued');
      row(box,'Next step',scenario==='login' && phase?'Resume connection check':'Wait for the required access');
    }
    set('tab-address',addresses[tab]);
    const released = scenario==='handoff' && phase>0 && tab==='printify';
    set('tab-ownership',released?'Released · Available to acquire':names[tab]+' owns this tab');
    set('browser-footer-status',conflict?'Conflicting request blocked. Owner unchanged.':released?'Tab released. Available for the next assignment.':'One tab, one current owner.');
  }
  function activities(items) {
    const list = byId('activity-list'); list.replaceChildren();
    items.forEach(([title, text])=>{
      const item=document.createElement('div'); item.className='activity';
      const dot=document.createElement('span');dot.className='activity-node';dot.setAttribute('aria-hidden','true');
      const body=document.createElement('div'); const strong=document.createElement('strong'); strong.textContent=title;
      const copy=document.createElement('p');copy.textContent=text;body.append(strong,copy);item.append(dot,body);list.append(item);
    });
  }
  function render() {
    demo.dataset.scenario=scenario;demo.dataset.complete=String(phase>0);
    scenarios.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===scenario)));
    tabs.forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.tab===tab));
      const released = scenario==='handoff' && phase>0 && button.dataset.tab==='printify';
      const owner = button.querySelector('.tab-owner');
      owner.textContent = released?'–':({shopify:'C',printify:'M',domain:'D'})[button.dataset.tab];
      owner.setAttribute('title',released?'Available to acquire':names[button.dataset.tab]+' owns this tab');
    });
    agents.forEach(agent=>agent.dataset.active=String(agent.dataset.agent===({shopify:'commerce',printify:'merch',domain:'domain'})[tab]));
    set('shared-decision',scenario==='currency' && phase===0?'Currency · Not decided':'Currency · USD');
    set('context-version',scenario==='currency'?(phase===0?'Awaiting your choice':phase===1?'Revision 2 · Review needed':'Revision 2 · Approved'):'Revision 2 · Shared');
    const action=byId('advance-demo');action.disabled=false;
    if (scenario==='currency') {
      if (phase===0) {
        activities([['Commerce → Team','Which currency should the storefront use?'],['Merch · Waiting','Prices depend on the shared currency decision.']]);
        set('approval-title','Your decision');set('approval-description','Choose USD once. See the decision reach every responsibility.');action.textContent='Set shared currency to USD ↗';
      } else if (phase===1) {
        activities([['You → Shared state','Use USD. Decision revision 2 recorded.'],['Merch + Domain','Both received the updated currency decision.'],['Approval reopened','The earlier approval covered a different state. Review the USD revision.']]);
        set('approval-title','A changed decision needs review');set('approval-description','An old approval must not silently authorize the new currency.');action.textContent='Approve the USD revision ✓';
      } else {
        activities([['You → Team','USD revision 2 approved.'],['Commerce + Merch','Store settings and product prices now refer to the same decision.']]);
        set('approval-title','One decision. No relay.');set('approval-description','The team can continue from the shared, approved revision. Try the product handoff next.');action.textContent='Shared decision approved';action.disabled=true;
      }
    } else if(scenario==='handoff') {
      activities(phase?[['Merch → Commerce','Two product draft references and their USD prices are recorded.'],['Merch · Released','The product tab is available. Commerce has the next assignment.']]:[['Merch · Working','Preparing the notebook and mug drafts in its owned tab.'],['Commerce · Waiting','Listing work depends on the product handoff, not another chat message.']]);
      set('approval-title',phase?'Handoff recorded':'The dependency is explicit');
      set('approval-description',phase?'Completed work, the next assignment and tab availability stay visible.':'Record the product references, then release the tab. Commerce gets the next step.');
      action.textContent=phase?'Handoff complete':'Simulate the product handoff ↗';action.disabled=phase>0;
    } else {
      activities(phase?[['You → Domain','Fictional sign-in completed. No credentials were entered.'],['Domain · Resumed','The agent can continue the connection check from its saved step.']]:[['Domain → You','The provider needs your sign-in. Please take over.'],['Domain · Paused','Connection work is waiting. Product work remains separate.']]);
      set('approval-title',phase?'A deliberate return to the agent':'Human sign-in requested');
      set('approval-description',phase?'The blocker is resolved in this example. The agent resumes the same task.':'No password guessing, no agent loop. You handle sign-in; the team keeps its context.');
      action.textContent=phase?'Example handoff complete':'Simulate the user handoff ↗';action.disabled=phase>0;
    }
    if(conflict) {
      const title=names[tab]+' keeps ownership';
      const current=[...byId('activity-list').children];
      const first=document.createElement('div');first.className='activity';
      const body=document.createElement('div');const strong=document.createElement('strong');strong.textContent='Conflicting request blocked';
      const p=document.createElement('p');p.textContent=title+'. Another agent must wait for a handoff.';body.append(strong,p);
      const dot=document.createElement('span');dot.className='activity-node';dot.setAttribute('aria-hidden','true');first.append(dot,body);byId('activity-list').replaceChildren(first,...current);
    }
    page();
  }
  function chooseScenario(value) {
    scenario=value;phase=0;conflict=false;tab=value==='currency'?'shopify':value==='handoff'?'printify':'domain';render();animate(byId('page-view'));
    announce('Illustration: '+({currency:'a shared currency decision',handoff:'a product handoff',login:'a human sign-in request'})[value]+'. No external accounts are connected.');
  }
  scenarios.forEach(button=>button.addEventListener('click',()=>chooseScenario(button.dataset.scenario)));
  tabs.forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.tab;conflict=false;render();animate(byId('page-view'));announce('Inspecting the fictional '+button.textContent.trim().replace(/\s+/g,' ')+' tab. Ownership has not changed.');}));
  for(const group of [scenarios,tabs]) group.forEach((button,index)=>button.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?group.length-1:(index+(event.key==='ArrowRight'?1:-1)+group.length)%group.length;group[next].focus();group[next].click();
  }));
  byId('advance-demo').addEventListener('click',()=>{
    if(byId('advance-demo').disabled)return;
    phase++;conflict=false;render();animate(byId('approval-card'));animate(byId('activity-list'));
    announce(scenario==='currency'?(phase===1?'Example decision changed to USD. All agents received it. The old approval is invalid; the new revision needs review.':'Example USD revision approved. The team shares the current decision.'):scenario==='handoff'?'Example product handoff recorded. Merch released its tab and Commerce received the next assignment.':'Fictional user handoff recorded. Domain resumed its connection check. No sign-in occurred.');
  });
  byId('test-conflict').addEventListener('click',()=>{
    if(scenario==='handoff'&&phase>0&&tab==='printify') {announce('This example tab has been released. There is no conflicting owner. Inspect Shopify or Domain to test an owned tab.');return;}
    conflict=true;render();animate(byId('activity-list'));announce('Example conflicting request blocked. '+names[tab]+' still owns the tab; the other agent must wait for a handoff.');
  });
  byId('reset-demo').addEventListener('click',()=>chooseScenario('currency'));
  function renderMotion(){demo.classList.toggle('motion-paused',paused);byId('motion-toggle').setAttribute('aria-pressed',String(paused));byId('motion-toggle').setAttribute('aria-label',paused?'Resume ambient animation':'Pause ambient animation');byId('motion-toggle').textContent=paused?'▷':'Ⅱ';}
  byId('motion-toggle').addEventListener('click',()=>{paused=!paused;renderMotion();announce(media.matches?'System reduced-motion preference remains enabled.':paused?'Ambient animation paused.':'Ambient animation resumed.');});
  media.addEventListener('change',()=>{if(media.matches)paused=true;renderMotion();});
  render();renderMotion();
})();
