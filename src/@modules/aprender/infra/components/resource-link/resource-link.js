const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.resource { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-5); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); text-decoration: none; transition: border-color var(--transition-fast); gap: var(--space-4); }
.resource:hover { border-color: var(--color-primary); }
.resource svg { color: var(--color-text-subtle); flex-shrink: 0; }
h4 { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); margin-bottom: 2px; }
p  { font-size: var(--text-xs); color: var(--color-text-muted); }


.resource { transition: transform 0.2s ease, border-color 0.2s ease; }
.resource:hover { transform: translateX(4px); }
</style>
  <a class="resource" id="link" target="_blank" rel="noopener">
    <div class="resource__body"><h4 id="title"></h4><p id="desc"></p></div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" stroke-width="2"/><polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"/></svg>
  </a>
`;
class ResourceLink extends HTMLElement {
  static get observedAttributes() { return ['title','description','href']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    this.shadowRoot.getElementById('link').href         = this.getAttribute('href') || '#';
    this.shadowRoot.getElementById('title').textContent = this.getAttribute('title') || '';
    this.shadowRoot.getElementById('desc').textContent  = this.getAttribute('description') || '';
  }
}
export { ResourceLink };
