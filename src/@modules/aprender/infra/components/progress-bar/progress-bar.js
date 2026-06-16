const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.progress { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-5) var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
.progress__header { display: flex; align-items: center; justify-content: space-between; }
.progress__info { display: flex; align-items: center; gap: var(--space-3); }
.progress__title { display: block; font-size: var(--text-base); font-weight: 600; color: var(--color-text); }
.progress__sub   { display: block; font-size: var(--text-xs); color: var(--color-text-muted); }
.progress__pct   { font-size: var(--text-lg); font-weight: 800; color: var(--color-primary); }
.progress__track { height: 8px; background: var(--color-bg-elevated); border-radius: var(--radius-full); overflow: hidden; }
.progress__fill  { height: 100%; background: var(--color-primary); border-radius: var(--radius-full); transition: width 0.5s ease; animation: progressFill 1s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes progressFill { from { width: 0% !important; } }

</style>
  <div class="progress">
    <div class="progress__header">
      <div class="progress__info">
        <span>📈</span>
        <div>
          <span class="progress__title">Seu Progresso</span>
          <span class="progress__sub" id="sub">2 de 6 completos</span>
        </div>
      </div>
      <span class="progress__pct" id="pct">33%</span>
    </div>
    <div class="progress__track"><div class="progress__fill" id="fill" style="width:33%"></div></div>
  </div>
`;
class ProgressBar extends HTMLElement {
  static get observedAttributes() { return ['completed','total']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const done  = parseInt(this.getAttribute('completed') || '2');
    const total = parseInt(this.getAttribute('total') || '6');
    const pct   = Math.round(done / total * 100);
    this.shadowRoot.getElementById('sub').textContent   = `${done} de ${total} completos`;
    this.shadowRoot.getElementById('pct').textContent   = `${pct}%`;
    this.shadowRoot.getElementById('fill').style.width  = `${pct}%`;
  }
}
export { ProgressBar };
