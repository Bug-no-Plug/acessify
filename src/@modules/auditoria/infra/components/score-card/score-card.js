const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
@keyframes ringDraw {
  from { stroke-dashoffset: 213.6; }
}
.score-card { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); }
.score-card__left { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-3); }
.score-card__label { font-size: var(--text-xs); color: var(--color-text-muted); }
.score-card__value { font-size: var(--text-4xl); font-weight: 800; line-height: 1; color: var(--color-text); margin-top: 2px; }
.score-card__max { font-size: var(--text-xl); color: var(--color-text-muted); font-weight: 400; }
.score-card__summary { font-size: var(--text-sm); color: var(--color-text-muted); }
.score-card__summary strong { color: var(--color-text); font-weight: 700; }

</style>
  <div class="score-card">
    <div class="score-card__left">
      <div class="score-card__ring">
        <svg viewBox="0 0 80 80" width="60" height="60"><circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-bg-elevated)" stroke-width="8"/><circle id="ring" cx="40" cy="40" r="34" fill="none" stroke="var(--color-primary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="213.6" stroke-dashoffset="68" transform="rotate(-90 40 40)"/></svg>
      </div>
      <div>
        <span class="score-card__label">Score de Acessibilidade</span>
        <div class="score-card__value"><span id="score">68</span><span class="score-card__max">/100</span></div>
      </div>
    </div>
    <p class="score-card__summary" id="summary">68 problemas encontrados em 6 categorias</p>
  </div>
`;
class ScoreCard extends HTMLElement {
  static get observedAttributes() { return ['score','problems','categories']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const score = parseInt(this.getAttribute('score') || '68');
    const problems = this.getAttribute('problems') || '68';
    const cats = this.getAttribute('categories') || '6';
    this.shadowRoot.getElementById('score').textContent   = score;
    this.shadowRoot.getElementById('summary').innerHTML   = `<strong>${problems} problemas</strong> encontrados em ${cats} categorias`;
    const offset = 213.6 - (213.6 * score / 100);
    this.shadowRoot.getElementById('ring').setAttribute('stroke-dashoffset', offset);
    const color = score >= 90 ? 'var(--color-success)' : score >= 70 ? 'var(--color-primary)' : score >= 50 ? 'var(--color-moderate)' : 'var(--color-critical)';
    this.shadowRoot.getElementById('ring').setAttribute('stroke', color);
    // Anima o anel ao renderizar
    const ring = this.shadowRoot.getElementById('ring');
    ring.style.animation = 'none';
    ring.offsetHeight; // reflow
    ring.style.animation = 'ringDraw 1.2s cubic-bezier(0.16,1,0.3,1) forwards';
  }
}
export { ScoreCard };
