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
.stat-card__icon { color: var(--color-primary); display: flex; align-items: center; margin-bottom: var(--space-1); }
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
      { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`, value: '100+', label: 'Critérios WCAG' },
      { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`, value: '50+',  label: 'Tipos de Problemas' },
      { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, value: '4',    label: 'Níveis de Severidade' },
      { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, value: '24/7', label: 'Disponibilidade' },
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
