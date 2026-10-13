const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const originalClaim = 'Price is causing the decline in conversion.';
const revisedClaim = 'Price came up in three of twelve interviews; its effect on conversion remains untested.';
const strongerClaim = 'Customer interviews prove that lowering prices will improve conversion.';
let stage = 'original';

// A scripted, fictional example: no model request, storage, or upload occurs.
function animateFeedback(element) {
  element.getAnimations?.().forEach(animation => animation.cancel());
  if (!reducedMotion.matches && element.animate) {
    element.animate([
      { opacity: 0.5, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
}
function insight(title, text, actions = []) {
  const restoreFocus = $('insight-actions').contains(document.activeElement);
  $('insight').hidden = false;
  $('insight-title').textContent = title;
  $('insight-text').textContent = text;
  $('insight-actions').replaceChildren();
  for (const [label, fn] of actions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.textContent = label;
    button.onclick = fn;
    $('insight-actions').append(button);
  }
  animateFeedback($('insight'));
  if (restoreFocus) $('insight-title').focus({ preventScroll: true });
}
function setClaim(text, status) {
  $('claim').textContent = text;
  $('check-state').textContent = status;
  animateFeedback($('claim'));
}
function accept() {
  stage = 'reviewed';
  setClaim(revisedClaim, 'Reviewed wording · source unchanged');
  $('later-edit').disabled = false;
  insight('A narrower claim, with the uncertainty intact.', 'This example records a check for this exact wording and source. It is not a guarantee that the source itself is correct.', [['Undo revision', reset]]);
}
function restoreWording() {
  stage = 'restored';
  setClaim(revisedClaim, 'Check still open · wording restored');
  insight('The wording is restored. The check stays open.', 'Undo does not reinstate an earlier review. Explicitly check this revision against the linked source.', [['Recheck restored wording', examine]]);
}
function examine() {
  if (stage === 'restored') {
    insight('Review the restored wording against its source.', 'The passage reports three price objections and no causal test. This narrower wording preserves those limits.', [['Confirm source review', accept]]);
    return;
  }
  if (stage === 'reviewed') {
    insight('This wording matches the scope of the supplied passage.', 'Try the stronger rewrite to see why a check must follow changes to the draft.');
    return;
  }
  insight(stage === 'changed' ? 'The old check no longer applies.' : 'The source does not establish causation.', 'The interviews report price objections, not a tested effect on conversion. Proposed revision: “' + revisedClaim + '”', [['Accept scoped revision', accept], ['Keep wording', () => insight('Wording kept. Check remains open.', 'The source does not establish the causal claim. You can add stronger evidence or reconsider the wording.')]]);
}
function reset() {
  stage = 'original';
  setClaim(originalClaim, 'Needs review · causal claim');
  $('later-edit').disabled = true;
  const restoreFocus = $('insight').contains(document.activeElement);
  $('insight').hidden = true;
  if (restoreFocus) $('reset-demo').focus({ preventScroll: true });
}
$('examine').onclick = examine;
$('later-edit').onclick = () => {
  stage = 'changed';
  setClaim(strongerClaim, 'Check reopened · wording changed');
  $('later-edit').disabled = true;
  insight('A smoother sentence has become a stronger claim.', '“Prove” and “will improve” go beyond the linked interview passage. The earlier review belongs to the previous wording.', [['Review changed claim', examine], ['Undo stronger rewrite', restoreWording]]);
  // Do not leave keyboard focus on a control that has just become disabled.
  $('insight-title').focus({ preventScroll: true });
};
$('reset-demo').onclick = reset;

// Automatic emphasis never moves keyboard focus or interrupts a source link.
const methodRows = [...document.querySelectorAll('.hero-methods li')];
let methodIndex = 0;
let manuallyPaused = false;
let methodTimer;
const motionControl = $('method-motion');
function selectMethod(index) {
  methodIndex = index;
  methodRows.forEach((row, i) => {
    row.classList.toggle('method-active', i === index);
    row.querySelector('button')?.setAttribute('aria-pressed', String(i === index));
  });
}
function scheduleMethod() {
  clearTimeout(methodTimer);
  if (!methodRows.length || document.hidden || manuallyPaused || reducedMotion.matches) return;
  methodTimer = setTimeout(() => {
    selectMethod((methodIndex + 1) % methodRows.length);
    scheduleMethod();
  }, 3200);
}
methodRows.forEach((row, index) => {
  const number = row.querySelector('.step-number');
  const name = row.querySelector('.method-name');
  if (!number || !name) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'method-select';
  button.append(number, name);
  row.prepend(button);
  button.addEventListener('click', () => { selectMethod(index); scheduleMethod(); });
  button.addEventListener('keydown', event => {
    const next = { ArrowDown: (index + 1) % methodRows.length, ArrowRight: (index + 1) % methodRows.length, ArrowUp: (index + methodRows.length - 1) % methodRows.length, ArrowLeft: (index + methodRows.length - 1) % methodRows.length, Home: 0, End: methodRows.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectMethod(next);
    methodRows[next].querySelector('button')?.focus({ preventScroll: true });
    scheduleMethod();
  });
});
function renderMotionControl() {
  if (!motionControl) return;
  // This is an action button; its label describes the next action, not a toggle state.
  motionControl.removeAttribute('aria-pressed');
  motionControl.disabled = reducedMotion.matches;
  motionControl.textContent = reducedMotion.matches ? 'Reduced motion' : manuallyPaused ? 'Play motion' : 'Pause motion';
  motionControl.title = reducedMotion.matches ? 'Your device’s reduced-motion preference is on. You can still select any step.' : '';
}
if (motionControl) motionControl.onclick = () => { manuallyPaused = !manuallyPaused; renderMotionControl(); scheduleMethod(); };
reducedMotion.addEventListener('change', () => {
  renderMotionControl();
  scheduleMethod();
  if (reducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach(section => section.classList.add('revealed'));
    [$('claim'), $('insight')].forEach(element => element.getAnimations?.().forEach(animation => animation.cancel()));
  }
});
document.addEventListener('visibilitychange', scheduleMethod);
renderMotionControl();
if (methodRows.length) { selectMethod(0); scheduleMethod(); }

// Content is visible without JavaScript; reveals are decorative and happen once.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: .08 });
  document.querySelectorAll('.section,.demo-section').forEach(section => { section.classList.add('reveal'); observer.observe(section); });
}
