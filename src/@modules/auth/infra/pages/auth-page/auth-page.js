const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    @keyframes fadeInUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInScale { from { opacity:0; transform:scale(0.96); }      to { opacity:1; transform:scale(1); } }
    .auth-page {
      min-height: 100vh; background: var(--color-bg);
      display: flex; align-items: center; justify-content: center; padding: var(--space-6);
    }
    .auth-page__card {
      width: 100%; max-width: 440px;
      background: var(--color-bg-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-2xl); padding: var(--space-10) var(--space-8);
      box-shadow: 0 24px 64px rgba(0,0,0,0.5);
      animation: fadeInScale 0.45s cubic-bezier(0.16,1,0.3,1) both;
    }
    @media (max-width: 480px) { .auth-page__card { padding: var(--space-8) var(--space-5); border-radius: var(--radius-xl); } }
  </style>

  <div class="auth-page">
    <div class="auth-page__card" id="card"></div>
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
    const view = this.getAttribute('view') || 'login';
    this.shadowRoot.getElementById('card').innerHTML = VIEWS[view] ?? VIEWS.login;
  }
}
export { AuthPage };
