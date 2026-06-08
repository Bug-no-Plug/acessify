/**
 * @modules/auth/infra/components/register-form/register-form.js
 */
import { AuthService } from '../../../service/AuthService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.register { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: var(--space-4); }
.register__header { text-align: center; margin-bottom: var(--space-2); }
.register__title    { font-size: var(--text-2xl); font-weight: 800; color: var(--color-text); }
.register__subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--space-1); }
.register__form { display: flex; flex-direction: column; gap: var(--space-4); }
.auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
.auth-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); letter-spacing: 0.04em; }
.auth-input-wrap { display: flex; align-items: center; gap: var(--space-3); background: var(--color-bg-elevated); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: 0 var(--space-4); transition: border-color var(--transition-fast); }
.auth-input-wrap:focus-within { border-color: var(--color-border-focus); }
.auth-input-wrap svg { color: var(--color-text-subtle); flex-shrink: 0; }
.auth-input { flex: 1; background: none; border: none; outline: none; color: var(--color-text); font-size: var(--text-sm); padding: var(--space-3) 0; font-family: inherit; }
.auth-input::placeholder { color: var(--color-text-subtle); }
.auth-toggle-pwd { background: none; border: none; cursor: pointer; color: var(--color-text-subtle); font-size: var(--text-sm); padding: 0; }
.register__terms-check { display: flex; align-items: flex-start; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-muted); cursor: pointer; line-height: 1.5; }
.register__terms-check input { accent-color: var(--color-primary); margin-top: 2px; }
.register__terms-check a { color: var(--color-primary); }
.auth-feedback { font-size: var(--text-sm); padding: var(--space-3) var(--space-4); background: var(--color-critical-bg); border: 1px solid rgba(255,68,68,0.3); border-radius: var(--radius-md); color: var(--color-critical); }
.auth-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-4); border-radius: var(--radius-full); font-size: var(--text-base); font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all var(--transition-fast); text-decoration: none; }
.auth-btn--primary { background: var(--color-primary); color: #000; }
.auth-btn--primary:hover { background: var(--color-primary-hover); }
.auth-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-btn--outline { background: transparent; border: 1.5px solid var(--color-border); color: var(--color-text); }
.auth-btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.auth-divider { display: flex; align-items: center; gap: var(--space-3); color: var(--color-text-subtle); font-size: var(--text-sm); }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }
.register__login-hint { text-align: center; font-size: var(--text-sm); color: var(--color-text-muted); }

</style>
  <div class="register">
    <div class="register__header">
      <h1 class="register__title">Criar Conta</h1>
      <p class="register__subtitle">Crie sua conta grátis</p>
    </div>

    <form class="register__form" id="form" novalidate>
      <div class="auth-field">
        <label class="auth-label" for="name">Nome</label>
        <div class="auth-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input class="auth-input" type="text" id="name" placeholder="Nome" />
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="email">E-mail</label>
        <div class="auth-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/></svg>
          <input class="auth-input" type="email" id="email" placeholder="seu@email.com" />
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="password">Senha</label>
        <div class="auth-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
          <input class="auth-input" type="password" id="password" placeholder="Mínimo 8 caracteres" />
          <button type="button" class="auth-toggle-pwd" id="toggle-pwd">👁</button>
        </div>
      </div>

      <div class="auth-field">
        <label class="auth-label" for="confirm">Digite a senha novamente</label>
        <div class="auth-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
          <input class="auth-input" type="password" id="confirm" placeholder="Repita sua senha" />
          <button type="button" class="auth-toggle-pwd" id="toggle-confirm">👁</button>
        </div>
      </div>

      <label class="register__terms-check">
        <input type="checkbox" id="terms" />
        Li e aceito os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
      </label>

      <p class="auth-feedback" id="feedback" hidden></p>

      <button type="submit" class="auth-btn auth-btn--primary" id="submit-btn">
        ✦ Criar conta grátis
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
    ['toggle-pwd', 'toggle-confirm'].forEach(id => {
      const toggleId = id === 'toggle-pwd' ? 'password' : 'confirm';
      this.shadowRoot.getElementById(id).addEventListener('click', () => {
        const inp = this.shadowRoot.getElementById(toggleId);
        inp.type = inp.type === 'password' ? 'text' : 'password';
      });
    });
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
      btn.disabled = false; btn.textContent = '✦ Criar conta grátis';
    }
  }
}

export { RegisterForm };
