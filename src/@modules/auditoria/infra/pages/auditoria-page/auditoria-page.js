import { AuditoriaService } from '../../../service/AuditoriaService.js';

const MOCK_ISSUES = [
  { severity:'critical', title:'Imagens sem texto alternativo',    criterion:'1.1.1 Conteúdo Não-textual',      count:'12 ocorrências', level:'WCAG Nível A'  },
  { severity:'serious',  title:'Contraste insuficiente',           criterion:'1.4.3 Contraste Mínimo',          count:'8 ocorrências',  level:'WCAG Nível AA' },
  { severity:'serious',  title:'Links sem texto descritivo',       criterion:'2.4.4 Finalidade do Link',        count:'15 ocorrências', level:'WCAG Nível A'  },
  { severity:'critical', title:'Formulário sem labels',            criterion:'3.3.2 Etiquetas ou Instruções',   count:'6 ocorrências',  level:'WCAG Nível A'  },
  { severity:'moderate', title:'Hierarquia de cabeçalhos incorreta',criterion:'1.3.1 Informações e Relações',  count:'4 ocorrências',  level:'WCAG Nível A'  },
  { severity:'serious',  title:'Botões sem indicador de foco',     criterion:'2.4.7 Foco Visível',             count:'23 ocorrências', level:'WCAG Nível AA' },
];

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    .page { max-width: var(--container-max); margin-inline: auto; padding: var(--space-8) var(--space-6) var(--space-16); display: flex; flex-direction: column; gap: var(--space-6); }

    @keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInUp   { from { opacity:0; transform:translateY(20px); }  to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInScale{ from { opacity:0; transform:scale(0.96); }        to { opacity:1; transform:scale(1); } }

    .page__nav    { display: flex; align-items: center; justify-content: space-between; animation: fadeInDown 0.35s ease both; }
    .page__back   { font-size: var(--text-sm); color: var(--color-text-muted); text-decoration: none; display: flex; align-items: center; gap: var(--space-2); transition: all 0.2s ease; padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); }
    .page__back:hover { color: var(--color-text); background: var(--color-bg-elevated); transform: translateX(-2px); }
    .page__report-btn {
      display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4);
      background: var(--color-serious-bg); color: var(--color-serious);
      border: 1px solid var(--color-serious); border-radius: var(--radius-full);
      font-size: var(--text-sm); font-weight: 600; cursor: pointer; transition: all 0.2s ease;
    }
    .page__report-btn:hover { background: var(--color-serious); color: #fff; transform: translateY(-1px); }
    .page__title  { font-size: var(--text-2xl); font-weight: 800; animation: fadeInDown 0.4s ease 0.05s both; }
    .page__score-wrap    { animation: fadeInScale 0.5s ease 0.1s both; }
    .page__severity-wrap { animation: fadeInUp 0.4s ease 0.15s both; }
    .page__filter-row    { padding-top: var(--space-2); animation: fadeInUp 0.4s ease 0.2s both; }
    .page__issues-header { animation: fadeInUp 0.4s ease 0.22s both; }
    .page__issues-header h3 { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-muted); }
    .page__issues { display: flex; flex-direction: column; gap: var(--space-3); }
  </style>

  <div class="page">
    <div class="page__nav">
      <a href="#/auditorias" class="page__back">← Voltar</a>
      <button class="page__report-btn">↓ Relatório</button>
    </div>
    <h1 class="page__title">Auditoria de Acessibilidade</h1>
    <div class="page__score-wrap">
      <auditoria-score score="68" problems="68" categories="6"></auditoria-score>
    </div>
    <div class="page__severity-wrap">
      <auditoria-severity critical="2" serious="3" moderate="1" minor="0"></auditoria-severity>
    </div>
    <div class="page__filter-row">
      <auditoria-filter-tabs></auditoria-filter-tabs>
    </div>
    <div class="page__issues-header">
      <h3>Problemas Encontrados (<span id="count">6</span>)</h3>
    </div>
    <div class="page__issues" id="issues"></div>
  </div>
`;

class AuditoriaPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); this._issues = MOCK_ISSUES; }

  connectedCallback() {
    this._renderIssues(this._issues);
    this.shadowRoot.querySelector('auditoria-filter-tabs').addEventListener('filter-change', (e) => {
      const filtered = e.detail === 'all' ? this._issues : this._issues.filter(i => i.severity === e.detail);
      this._renderIssues(filtered);
    });
  }

  _renderIssues(issues) {
    this.shadowRoot.getElementById('count').textContent = issues.length;
    this.shadowRoot.getElementById('issues').innerHTML = issues.map((i, idx) => `
      <auditoria-issue-card
        severity="${i.severity}" title="${i.title}"
        criterion="${i.criterion}" count="${i.count}" level="${i.level}"
        style="animation: fadeInUp 0.35s ease ${idx * 0.06}s both"
      ></auditoria-issue-card>
    `).join('');
  }
}
export { AuditoriaPage };
