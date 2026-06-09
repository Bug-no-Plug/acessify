const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.filter { padding: var(--space-2) var(--space-4); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500; color: var(--color-text-muted); background: transparent; border: 1.5px solid var(--color-border); cursor: pointer; transition: all var(--transition-fast); font-family: inherit; }
.filter:hover { color: var(--color-text); border-color: rgba(255,255,255,0.2); }
.filter--active { background: var(--color-primary); color: #000; border-color: transparent; font-weight: 600; }

</style>
  <div class="filters" role="tablist">
    <button class="filter filter--active" data-filter="all">Todos</button>
    <button class="filter" data-filter="critical">Críticos</button>
    <button class="filter" data-filter="serious">Sérios</button>
    <button class="filter" data-filter="moderate">Moderados</button>
    <button class="filter" data-filter="minor">Menores</button>
  </div>
`;
class FilterTabs extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    this.shadowRoot.querySelector('.filters').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;
      this.shadowRoot.querySelectorAll('.filter').forEach(b => b.classList.toggle('filter--active', b === btn));
      this.dispatchEvent(new CustomEvent('filter-change', { detail: btn.dataset.filter, bubbles: true, composed: true }));
    });
  }
}
export { FilterTabs };
