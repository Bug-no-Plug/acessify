import { NovaAuditoriaService } from '../../../service/NovaAuditoriaService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInScale { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
    .nova { max-width: 680px; margin-inline: auto; padding: var(--space-12) var(--space-6) var(--space-16); }
    .nova__title    { font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-2); animation: fadeInUp 0.4s ease both; }
    .nova__subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-8); animation: fadeInUp 0.4s ease 0.05s both; }
    .nova__tabs-wrap  { display: flex; justify-content: center; margin-bottom: var(--space-6); animation: fadeInUp 0.4s ease 0.1s both; }
    .nova__form-wrap  { margin-bottom: var(--space-8); animation: fadeInScale 0.4s ease 0.15s both; }
    .nova__features   { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); animation: fadeInUp 0.4s ease 0.25s both; }

    /* Loading overlay */
    .nova__loading {
      display: none; flex-direction: column; align-items: center; gap: var(--space-4);
      padding: var(--space-12); text-align: center;
    }
    .nova__loading--active { display: flex; }
    .nova__spinner {
      width: 40px; height: 40px; border: 3px solid var(--color-bg-elevated);
      border-top-color: var(--color-primary); border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .nova__loading-text { font-size: var(--text-sm); color: var(--color-text-muted); }
    @media (max-width: 600px) { .nova__features { grid-template-columns: 1fr; } }
  </style>

  <div class="nova">
    <h1 class="nova__title">Criar auditoria</h1>
    <p class="nova__subtitle">Identifique e corrija problemas de acessibilidade com análise automatizada e orientações detalhadas</p>
    <div class="nova__tabs-wrap"><audit-tabs></audit-tabs></div>
    <div class="nova__form-wrap" id="form-wrap">
      <audit-url-form></audit-url-form>
    </div>
    <div class="nova__loading" id="loading">
      <div class="nova__spinner"></div>
      <p class="nova__loading-text">Analisando acessibilidade...</p>
    </div>
    <div class="nova__features">
      <audit-feature-mini
        icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
        title="Análise Rápida"
        description="Resultados em segundos com tecnologia avançada"></audit-feature-mini>
      <audit-feature-mini
        icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
        title="WCAG 2.2"
        description="Verificação completa de conformidade"></audit-feature-mini>
      <audit-feature-mini
        icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
        title="Guias Práticos"
        description="Aprenda como corrigir cada problema"></audit-feature-mini>
    </div>
  </div>
`;

class NovaAuditoriaPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  connectedCallback() {
    this._attachFormListener(this.shadowRoot.querySelector('audit-url-form'));

    this.shadowRoot.querySelector('audit-tabs').addEventListener('tab-change', (e) => {
      const wrap = this.shadowRoot.getElementById('form-wrap');
      wrap.innerHTML = e.detail === 'url' ? '<audit-url-form></audit-url-form>' : '<audit-file-upload></audit-file-upload>';
      this._attachFormListener(wrap.firstElementChild);
    });
  }

  _attachFormListener(el) {
    if (!el) return;
    el.addEventListener('audit-start', (e) => this._handleStart(e.detail));
  }

  async _handleStart(data) {
    const loading = this.shadowRoot.getElementById('loading');
    const formWrap = this.shadowRoot.getElementById('form-wrap');
    formWrap.style.display = 'none';
    loading.classList.add('nova__loading--active');
    try {
      await NovaAuditoriaService.start(data);
      window.location.hash = '#/auditoria';
    } catch (err) {
      console.error('[NovaAuditoriaPage]', err);
      formWrap.style.display = '';
      loading.classList.remove('nova__loading--active');
    }
  }
}
export { NovaAuditoriaPage };
