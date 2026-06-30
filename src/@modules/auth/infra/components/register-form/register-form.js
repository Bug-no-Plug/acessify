/**
 * @modules/auth/infra/components/register-form/register-form.js
 */
import { AuthService } from '../../../service/AuthService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.register { width: 100%; display: flex; flex-direction: column; gap: var(--space-3); }
.register__form { display: flex; flex-direction: column; gap: var(--space-3); }
.auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
.auth-label { font-size: var(--text-sm); font-weight: 500; color: var(--color-text-muted); }
.auth-input-wrap {
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--color-bg-elevated);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-4);
  height: 52px;
  transition: border-color var(--transition-fast);
}
.auth-input-wrap:focus-within { border-color: rgba(245,230,66,0.4); }
.auth-input-wrap svg { color: var(--color-text-subtle); flex-shrink: 0; width: 16px; height: 16px; }
.auth-input { flex: 1; background: none; border: none; outline: none; color: var(--color-text); font-size: var(--text-base); font-family: inherit; }
.auth-input::placeholder { color: var(--color-text-subtle); }
.auth-toggle-pwd { background: none; border: none; cursor: pointer; color: var(--color-text-subtle); padding: 0; display: flex; align-items: center; }
.register__terms-check { display: flex; align-items: flex-start; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-muted); cursor: pointer; line-height: 1.5; }
.register__terms-check input { accent-color: var(--color-primary); margin-top: 2px; width: 16px; height: 16px; }
.register__terms-check a { color: var(--color-primary); text-decoration: none; }
.auth-feedback { font-size: var(--text-sm); padding: var(--space-3) var(--space-4); background: var(--color-critical-bg); border: 1px solid rgba(255,68,68,0.3); border-radius: var(--radius-md); color: var(--color-critical); }
.auth-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-2); width: calc(100% - 32px); margin: 0 16px; padding: var(--space-4); border-radius: var(--radius-full); font-size: var(--text-base); font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all var(--transition-fast); text-decoration: none; }
.auth-btn--primary { background: var(--color-primary); color: #000; }
.auth-btn--primary:hover { background: var(--color-primary-hover); transform: translateY(-1px); }
.auth-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.auth-btn--outline { background: transparent; border: 1.5px solid var(--color-serious); color: var(--color-text); }
.auth-btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.auth-divider { display: flex; align-items: center; gap: var(--space-3); color: var(--color-text-subtle); font-size: var(--text-sm); }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
.register__login-hint { text-align: center; font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
</style>
  <div class="register">
    <form class="register__form" id="form" novalidate>
      <div class="auth-field">
        <label class="auth-label" for="name">Nome</label>
        <div class="auth-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke-linecap="round"/></svg>
          <input class="auth-input" type="text" id="name" placeholder="Seu nome" autocomplete="name" />
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="email">E-mail</label>
        <div class="auth-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input class="auth-input" type="email" id="email" placeholder="seu@email.com" autocomplete="email" />
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="password">Senha</label>
        <div class="auth-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <input class="auth-input" type="password" id="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password" />
          <button type="button" class="auth-toggle-pwd" id="toggle-pwd" aria-label="Mostrar senha">
            <svg id="eye1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="confirm">Confirmar senha</label>
        <div class="auth-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <input class="auth-input" type="password" id="confirm" placeholder="Repita sua senha" autocomplete="new-password" />
          <button type="button" class="auth-toggle-pwd" id="toggle-confirm" aria-label="Mostrar senha">
            <svg id="eye2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <label class="register__terms-check">
        <input type="checkbox" id="terms" />
        Li e aceito os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
      </label>

      <p class="auth-feedback" id="feedback" hidden></p>

      <button type="submit" class="auth-btn auth-btn--primary" id="submit-btn">
        Criar conta grátis
      </button>
    </form>

    <div class="auth-divider"><span>ou</span></div>
    <p class="register__login-hint">Já tem uma conta?</p>
    <a href="#/login" class="auth-btn auth-btn--outline">Entrar na sua conta</a>
  </div>
`;

class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('form').addEventListener('submit', (e) => { e.preventDefault(); this._register(); });
    const toggleEye = (inputId, eyeId) => {
      const inp  = this.shadowRoot.getElementById(inputId);
      const icon = this.shadowRoot.getElementById(eyeId);
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      icon.innerHTML = show
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    };
    this.shadowRoot.getElementById('toggle-pwd').addEventListener('click', () => toggleEye('password', 'eye1'));
    this.shadowRoot.getElementById('toggle-confirm').addEventListener('click', () => toggleEye('confirm', 'eye2'));
  }

  async _register() {
    const name     = this.shadowRoot.getElementById('name').value.trim();
    const email    = this.shadowRoot.getElementById('email').value.trim();
    const password = this.shadowRoot.getElementById('password').value;
    const confirm  = this.shadowRoot.getElementById('confirm').value;
    const terms    = this.shadowRoot.getElementById('terms').checked;
    const fb       = this.shadowRoot.getElementById('feedback');
    const btn      = this.shadowRoot.getElementById('submit-btn');

    if (!name || !email || !password || !confirm) { fb.textContent = '⚠️ Preencha todos os campos.'; fb.hidden = false; return; }
    if (password !== confirm)   { fb.textContent = '⚠️ As senhas não coincidem.'; fb.hidden = false; return; }
    if (password.length < 8)    { fb.textContent = '⚠️ A senha deve ter ao menos 8 caracteres.'; fb.hidden = false; return; }
    if (!terms)                 { fb.textContent = '⚠️ Aceite os termos para continuar.'; fb.hidden = false; return; }

    btn.disabled = true; btn.textContent = 'Criando conta...';
    try {
      const user = await AuthService.register({ name, email, password });
      sessionStorage.setItem('acessify_user', JSON.stringify(user));
      window.Toast?.show('Conta criada com sucesso! ✓', 'success');
      window.location.hash = '#/';
    } catch {
      fb.textContent = '❌ Erro ao criar conta. Tente novamente.'; fb.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = 'Criar conta grátis';
    }
  }
}

export { RegisterForm };
