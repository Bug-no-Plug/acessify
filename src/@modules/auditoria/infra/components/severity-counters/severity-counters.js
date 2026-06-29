const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.counters { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
.counter { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
.counter__icon { width: 32px; height: 32px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: var(--text-sm); font-weight: 700; }
.counter__icon--critical { background: var(--color-critical-bg); color: var(--color-critical); }
.counter__icon--serious  { background: var(--color-serious-bg);  color: var(--color-serious); }
.counter__icon--moderate { background: var(--color-moderate-bg); color: var(--color-moderate); }
.counter__icon--minor    { background: var(--color-minor-bg);    color: var(--color-minor); }
.counter__value { font-size: var(--text-3xl); font-weight: 800; }
.counter--critical .counter__value { color: var(--color-critical); }
.counter--serious  .counter__value { color: var(--color-serious); }
.counter--moderate .counter__value { color: var(--color-moderate); }
.counter--minor    .counter__value { color: var(--color-minor); }
.counter__label { font-size: var(--text-xs); color: var(--color-text-muted); }
@media (max-width: 600px) { .counters { grid-template-columns: repeat(2, 1fr); } }

</style>
  <div class="counters" id="counters"></div>
`;
class SeverityCounters extends HTMLElement {
  static get observedAttributes() { return ['critical','serious','moderate','minor']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const items = [
      { key: 'critical', label: 'Críticos',  icon: '✕', cls: 'critical' },
      { key: 'serious',  label: 'Sérios',    icon: 'ⓘ', cls: 'serious'  },
      { key: 'moderate', label: 'Moderados', icon: '⚠', cls: 'moderate' },
      { key: 'minor',    label: 'Menores',   icon: 'ⓘ', cls: 'minor'   },
    ];
    this.shadowRoot.getElementById('counters').innerHTML = items.map(i => `
      <div class="counter counter--${i.cls}">
        <span class="counter__icon counter__icon--${i.cls}">${i.icon}</span>
        <span class="counter__value">${this.getAttribute(i.key) || '0'}</span>
        <span class="counter__label">${i.label}</span>
      </div>
    `).join('');
  }
}
export { SeverityCounters };
