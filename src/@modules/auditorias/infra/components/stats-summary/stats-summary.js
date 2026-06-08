const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-8); }
.stat { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-1); }
.stat__value { font-size: var(--text-3xl); font-weight: 800; color: var(--color-text); }
.stat--yellow .stat__value { color: var(--color-primary); }
.stat--red    .stat__value { color: var(--color-critical); }
.stat__label { font-size: var(--text-xs); color: var(--color-text-muted); font-weight: 500; }
.stat__sub   { font-size: var(--text-xs); color: var(--color-text-subtle); }
@media (max-width: 768px) { .stats { grid-template-columns: repeat(2, 1fr); } }

</style>
  <div class="stats" id="stats"></div>
`;
class StatsSummary extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    const data = [
      { label: 'Auditorias',         value: '3',    sub: 'Ver todas →',    color: '' },
      { label: 'Pontuação Média',     value: '45',   sub: 'Precisa melhorar', color: 'yellow' },
      { label: 'Problemas Críticos',  value: '10',   sub: 'Requer atenção',  color: 'red' },
      { label: 'Última Auditoria',    value: 'Hoje', sub: '30 de março',     color: '' },
    ];
    this.shadowRoot.getElementById('stats').innerHTML = data.map(d => `
      <div class="stat ${d.color ? 'stat--'+d.color : ''}">
        <span class="stat__value">${d.value}</span>
        <span class="stat__label">${d.label}</span>
        <span class="stat__sub">${d.sub}</span>
      </div>
    `).join('');
  }
}
export { StatsSummary };
