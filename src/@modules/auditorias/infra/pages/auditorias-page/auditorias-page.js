import { AuditoriasService } from '../../../service/AuditoriasService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    .auditorias { max-width: var(--container-max); margin-inline: auto; padding: var(--space-8) var(--space-6) var(--space-16); }

    .auditorias__header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: var(--space-8); flex-wrap: wrap; gap: var(--space-4);
      animation: fadeInDown 0.4s ease both;
    }
    @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInUp   { from { opacity:0; transform:translateY(20px); }  to { opacity:1; transform:translateY(0); } }

    .auditorias__header h1 { font-size: var(--text-2xl); font-weight: 800; }
    .auditorias__header p  { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--space-1); }
    .auditorias__new-btn {
      display: inline-flex; align-items: center; gap: var(--space-2);
      padding: var(--space-2) var(--space-5); background: var(--color-primary);
      color: #000; font-weight: 700; font-size: var(--text-sm);
      border-radius: var(--radius-full); text-decoration: none; white-space: nowrap;
      transition: all 0.2s ease;
    }
    .auditorias__new-btn:hover { background: var(--color-primary-hover); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(245,230,66,0.3); }

    .auditorias__stats-wrap { animation: fadeInUp 0.4s ease 0.05s both; }

    .auditorias__list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); animation: fadeInUp 0.4s ease 0.1s both; }
    .auditorias__list-header h2 { font-size: var(--text-base); font-weight: 600; }
    .auditorias__see-all { font-size: var(--text-sm); color: var(--color-primary); text-decoration: none; transition: opacity 0.2s; }
    .auditorias__see-all:hover { opacity: 0.7; }

    .auditorias__search-row { margin-bottom: var(--space-4); animation: fadeInUp 0.4s ease 0.15s both; }
    .auditorias__list { display: flex; flex-direction: column; gap: var(--space-3); animation: fadeInUp 0.4s ease 0.2s both; }
  </style>

  <div class="auditorias">
    <div class="auditorias__header">
      <div>
        <h1>Auditorias gerais</h1>
        <p>Acompanhe suas auditorias de acessibilidade</p>
      </div>
      <a href="#/nova-auditoria" class="auditorias__new-btn">+ Nova Auditoria</a>
    </div>

    <div class="auditorias__stats-wrap">
      <auditorias-stats></auditorias-stats>
    </div>

    <div class="auditorias__list-header">
      <h2>Auditorias Recentes</h2>
      <a href="#/auditorias" class="auditorias__see-all">Ver todas →</a>
    </div>

    <div class="auditorias__search-row">
      <auditorias-search></auditorias-search>
    </div>

    <div class="auditorias__list" id="list"></div>
  </div>
`;

class AuditoriasPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  async connectedCallback() {
    const audits = await AuditoriasService.getAll();
    this._render(audits);
    this.shadowRoot.querySelector('auditorias-search').addEventListener('search', (e) => {
      const term = e.detail.toLowerCase();
      this._render(audits.filter(a => a.url.toLowerCase().includes(term)));
    });
  }

  _render(audits) {
    const list = this.shadowRoot.getElementById('list');
    if (!audits.length) { list.innerHTML = '<auditorias-empty></auditorias-empty>'; return; }
    list.innerHTML = audits.map((a, i) => `
      <auditorias-list-item
        url="${a.url}" date="${a.date}"
        critical="${a.critical}" serious="${a.serious}" moderate="${a.moderate}"
        style="animation: fadeInUp 0.4s ease ${i * 0.07}s both"
      ></auditorias-list-item>
    `).join('');
  }
}
export { AuditoriasPage };
