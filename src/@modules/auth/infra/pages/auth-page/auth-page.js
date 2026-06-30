const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    @keyframes fadeInScale { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }

    .auth-page {
      min-height: 100vh;
      background: var(--color-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
      gap: var(--space-6);
    }

    /* Cabeçalho acima do card — igual ao Figma */
    .auth-page__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      animation: fadeInScale 0.35s cubic-bezier(0.16,1,0.3,1) both;
    }
    .auth-page__logo {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-1);
    }
    .auth-page__logo-icon {
      width: 36px; height: 36px;
      background: var(--color-primary);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }
    .auth-page__title {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--color-text);
      margin: 0;
    }
    .auth-page__subtitle {
      font-size: var(--text-sm);
      color: var(--color-text-muted);
      margin: 0;
    }

    /* Card */
    .auth-page__card {
      width: 100%; max-width: 440px;
      background: var(--color-bg-surface);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: var(--radius-2xl);
      padding: var(--space-8) var(--space-6);
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
      animation: fadeInScale 0.45s cubic-bezier(0.16,1,0.3,1) both;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Footer terms abaixo do card */
    .auth-page__terms {
      text-align: center;
      font-size: var(--text-xs);
      color: var(--color-text-subtle);
      animation: fadeInScale 0.5s cubic-bezier(0.16,1,0.3,1) both;
      white-space: nowrap;
    }
    .auth-page__terms a { color: var(--color-primary); text-decoration: none; }
    .auth-page__terms a:hover { text-decoration: underline; }

    @media (max-width: 480px) {
      .auth-page__card { padding: var(--space-6) var(--space-5); border-radius: var(--radius-xl); }
    }
  </style>

  <div class="auth-page">
    <header class="auth-page__header" id="header">
      <div class="auth-page__logo">
        <div class="auth-page__logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#000" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="auth-page__title">Acessify</h1>
      </div>
      <p class="auth-page__subtitle" id="subtitle">Acesse sua conta</p>
    </header>

    <div class="auth-page__card" id="card"></div>

    <footer class="auth-page__terms" id="terms">
      Ao continuar, você aceita os
      <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
    </footer>
  </div>
`;

const VIEWS = {
  login:    '<auth-login-form></auth-login-form>',
  register: '<auth-register-form></auth-register-form>',
  forgot:   '<auth-forgot-form></auth-forgot-form>',
};

class AuthPage extends HTMLElement {
  static get observedAttributes() { return ['view']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback()    { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const view     = this.getAttribute('view') || 'login';
    const subtitle = { login: 'Acesse sua conta', register: 'Crie sua conta grátis', forgot: 'Recupere seu acesso' };

    this.shadowRoot.getElementById('card').innerHTML       = VIEWS[view] ?? VIEWS.login;
    this.shadowRoot.getElementById('subtitle').textContent = subtitle[view] ?? subtitle.login;
    this.shadowRoot.getElementById('terms').style.display  = view === 'register' ? 'none' : 'block';
    // forgot tem header interno próprio, esconde o externo
    this.shadowRoot.getElementById('header').style.display = view === 'forgot' ? 'none' : 'flex';
  }
}
export { AuthPage };
