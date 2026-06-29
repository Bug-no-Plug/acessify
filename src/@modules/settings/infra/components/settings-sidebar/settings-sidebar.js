/**
 * @modules/settings/infra/components/settings-sidebar/settings-sidebar.js
 * Navegação lateral das configurações. Emite 'nav-change' com o painel selecionado.
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }

.sidebar { width: 100%; }

.sidebar__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.sidebar__item svg { flex-shrink: 0; }

.sidebar__item:hover { background: var(--color-bg-elevated); color: var(--color-text); }

.sidebar__item--active {
  background: var(--color-primary);
  color: #000;
  font-weight: 600;
}

.sidebar__item--active svg { color: #000; }

/* Mobile: horizontal tabs */
@media (max-width: 768px) {
  .sidebar__list { flex-direction: row; gap: var(--space-2); overflow-x: auto; padding-bottom: var(--space-2); }
  .sidebar__item { white-space: nowrap; flex-shrink: 0; }
}

</style>
  <nav class="sidebar" role="navigation" aria-label="Configurações">
    <ul class="sidebar__list">
      <li><button class="sidebar__item sidebar__item--active" data-panel="profile">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Perfil
      </button></li>
      <li><button class="sidebar__item" data-panel="notifications">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="2"/></svg>
        Notificações
      </button></li>
      <li><button class="sidebar__item" data-panel="security">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
        Segurança
      </button></li>
      <li><button class="sidebar__item" data-panel="appearance">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Aparência
      </button></li>
    </ul>
  </nav>
`;

class SettingsSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.sidebar__list').addEventListener('click', (e) => {
      const btn = e.target.closest('.sidebar__item');
      if (!btn) return;
      this.shadowRoot.querySelectorAll('.sidebar__item').forEach(b =>
        b.classList.toggle('sidebar__item--active', b === btn)
      );
      this.dispatchEvent(new CustomEvent('nav-change', {
        detail: btn.dataset.panel,
        bubbles: true,
        composed: true,
      }));
    });
  }
}

export { SettingsSidebar };
