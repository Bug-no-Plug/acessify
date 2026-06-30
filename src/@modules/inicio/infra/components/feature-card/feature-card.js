/**
 * @modules/inicio/infra/components/feature-card/feature-card.js
 * Card de feature: icon + title + description
 * Atributos: icon, title, description
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.feature-card { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); transition: border-color var(--transition-fast); }
.feature-card:hover { border-color: var(--color-primary); }
.feature-card__icon-wrap {
  width: 44px; height: 44px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: #000;
  flex-shrink: 0;
}
h3 { font-size: var(--text-base); font-weight: 600; color: var(--color-text); }
p  { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }


.feature-card { cursor: default; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
</style>
  <div class="feature-card">
    <div class="feature-card__icon-wrap"><span id="icon"></span></div>
    <h3 id="title"></h3>
    <p id="desc"></p>
  </div>
`;
class FeatureCard extends HTMLElement {
  static get observedAttributes() { return ['icon','title','description']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    this.shadowRoot.getElementById('icon').innerHTML  = this.getAttribute('icon') || '';
    this.shadowRoot.getElementById('title').textContent = this.getAttribute('title') || '';
    this.shadowRoot.getElementById('desc').textContent  = this.getAttribute('description') || '';
  }
}
export { FeatureCard };
