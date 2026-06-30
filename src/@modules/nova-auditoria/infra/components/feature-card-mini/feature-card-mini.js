const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.mini-card { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
.mini-card__icon {
  width: 40px; height: 40px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: #000;
  flex-shrink: 0;
}
h4 { font-size: var(--text-sm); font-weight: 700; color: var(--color-text); }
p  { font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.5; }

</style>
  <div class="mini-card">
    <div class="mini-card__icon" id="icon"></div>
    <h4 id="title"></h4>
    <p id="desc"></p>
  </div>
`;
class FeatureCardMini extends HTMLElement {
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
export { FeatureCardMini };
