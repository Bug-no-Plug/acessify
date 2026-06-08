const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.item { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-5); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); gap: var(--space-4); transition: border-color var(--transition-fast); }
.item:hover { border-color: rgba(255,255,255,0.15); }
.item__info { display: flex; flex-direction: column; gap: var(--space-2); flex: 1; min-width: 0; }
.item__url  { font-size: var(--text-sm); font-weight: 500; color: var(--color-text); text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item__url:hover { color: var(--color-primary); }
.item__date { font-size: var(--text-xs); color: var(--color-text-subtle); }
.item__badges { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: var(--radius-full); font-size: 11px; font-weight: 600; }
.badge--critical { background: var(--color-critical-bg); color: var(--color-critical); }
.badge--serious  { background: var(--color-serious-bg);  color: var(--color-serious); }
.badge--moderate { background: var(--color-moderate-bg); color: var(--color-moderate); }
.item__actions { display: flex; gap: var(--space-2); flex-shrink: 0; }
.item__action { width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--color-bg-elevated); border: 1px solid var(--color-border); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: var(--text-sm); transition: all var(--transition-fast); }
.item__action:hover { border-color: var(--color-primary); }


.item { cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
.item:hover { transform: translateX(4px); border-color: rgba(245,230,66,0.3); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
</style>
  <div class="item">
    <div class="item__info">
      <a class="item__url" id="url" href="#/auditoria"></a>
      <span class="item__date" id="date"></span>
      <div class="item__badges" id="badges"></div>
    </div>
    <div class="item__actions">
      <button class="item__action" title="Ver auditoria">👁</button>
      <button class="item__action" title="Compartilhar">↗</button>
    </div>
  </div>
`;
class AuditListItem extends HTMLElement {
  static get observedAttributes() { return ['url','date','critical','serious','moderate']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    this.shadowRoot.getElementById('url').textContent  = this.getAttribute('url') || '';
    this.shadowRoot.getElementById('date').textContent = this.getAttribute('date') || '';
    const badges = [];
    const c = this.getAttribute('critical'); if (c) badges.push(`<span class="badge badge--critical">${c} Críticos</span>`);
    const s = this.getAttribute('serious');  if (s) badges.push(`<span class="badge badge--serious">${s} Sérios</span>`);
    const m = this.getAttribute('moderate'); if (m) badges.push(`<span class="badge badge--moderate">${m} Moderados</span>`);
    this.shadowRoot.getElementById('badges').innerHTML = badges.join('');
  }
}
export { AuditListItem };
