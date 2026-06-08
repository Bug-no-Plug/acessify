/**
 * @modules/inicio/infra/components/stats-grid/stats-grid.js
 * Grid de 4 cards de estatísticas: 100+, 50+, 4, 24/7
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
.stat-card { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-2); }
.stat-card__icon { font-size: 1.5rem; color: var(--color-primary); }
.stat-card__value { font-size: var(--text-3xl); font-weight: 800; color: var(--color-primary); line-height: 1; }
.stat-card__label { font-size: var(--text-sm); color: var(--color-text-muted); }
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr; } }


.stat-card { transition: transform 0.25s ease, border-color 0.25s ease; cursor: default; }
.stat-card:hover { transform: translateY(-4px); border-color: rgba(245,230,66,0.3); }
</style>
  <div class="stats-grid" id="grid"></div>
`;

class StatsGrid extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  connectedCallback() {
    const stats = [
      { icon: '◎', value: '100+', label: 'Critérios WCAG' },
      { icon: '⊙', value: '50+',  label: 'Tipos de Problemas' },
      { icon: '◈', value: '4',    label: 'Níveis de Severidade' },
      { icon: '⊕', value: '24/7', label: 'Disponibilidade' },
    ];
    this.shadowRoot.getElementById('grid').innerHTML = stats.map(s => `
      <div class="stat-card">
        <span class="stat-card__icon">${s.icon}</span>
        <span class="stat-card__value">${s.value}</span>
        <span class="stat-card__label">${s.label}</span>
      </div>
    `).join('');
  }
}
export { StatsGrid };
