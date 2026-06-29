/**
 * @modules/nova-auditoria/infra/components/audit-tabs/audit-tabs.js
 * Tabs "URL do Site" / "Arquivo HTML" — emite CustomEvent 'tab-change'
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.tabs { display: inline-flex; background: var(--color-bg-elevated); border-radius: var(--radius-full); padding: 4px; gap: 4px; }
.tabs__btn { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-5); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500; color: var(--color-text-muted); cursor: pointer; background: none; border: none; transition: all var(--transition-fast); font-family: inherit; }
.tabs__btn--active { background: var(--color-primary); color: #000; font-weight: 600; }
.tabs__btn:hover:not(.tabs__btn--active) { color: var(--color-text); }

</style>
  <div class="tabs" role="tablist">
    <button class="tabs__btn tabs__btn--active" data-tab="url"  role="tab" aria-selected="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 3C12 3 8 8 8 12s4 9 4 9M12 3c0 0 4 5 4 9s-4 9-4 9M3 12h18" stroke="currentColor" stroke-width="2"/></svg>
      URL do Site
    </button>
    <button class="tabs__btn" data-tab="file" role="tab" aria-selected="false">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2"/></svg>
      Arquivo
    </button>
  </div>
`;

class AuditTabs extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  connectedCallback() {
    this.shadowRoot.querySelector('.tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('.tabs__btn');
      if (!btn) return;
      this.shadowRoot.querySelectorAll('.tabs__btn').forEach(b => {
        b.classList.toggle('tabs__btn--active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });
      this.dispatchEvent(new CustomEvent('tab-change', { detail: btn.dataset.tab, bubbles: true, composed: true }));
    });
  }
}
export { AuditTabs };
