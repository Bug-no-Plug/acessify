import { AuthService } from '../../../service/AuthService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
/**
 * @modules/auth/infra/components/login-form/login-form.css
 * Estilos compartilhados por todos os formulários de auth.
 */

:host { display: block; }

.login {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Brand */
.login__brand { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); }
.login__title    { font-size: var(--text-2xl); font-weight: 800; color: var(--color-text); }
.login__subtitle { font-size: var(--text-sm); color: var(--color-text-muted); }

/* Form */
.login__form { display: flex; flex-direction: column; gap: var(--space-4); }

/* Shared field styles (reused across all auth forms) */
.auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
.auth-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); letter-spacing: 0.04em; }
.auth-input-wrap {
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-4);
  transition: border-color var(--transition-fast);
}
.auth-input-wrap:focus-within { border-color: var(--color-border-focus); }
.auth-input-wrap svg { color: var(--color-text-subtle); flex-shrink: 0; }
.auth-input {
  flex: 1; background: none; border: none; outline: none;
  color: var(--color-text); font-size: var(--text-sm);
  padding: var(--space-3) 0; font-family: inherit;
}
.auth-input::placeholder { color: var(--color-text-subtle); }
.auth-toggle-pwd {
  background: none; border: none; cursor: pointer; color: var(--color-text-subtle);
  font-size: var(--text-sm); padding: 0; line-height: 1;
}
.auth-toggle-pwd:hover { color: var(--color-text); }

/* Options row */
.login__options { display: flex; align-items: center; justify-content: space-between; }
.login__remember { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-muted); cursor: pointer; }
.login__remember input { accent-color: var(--color-primary); }
.login__forgot { font-size: var(--text-sm); color: var(--color-primary); }
.login__forgot:hover { text-decoration: underline; }

/* Feedback */
.auth-feedback {
  font-size: var(--text-sm); padding: var(--space-3) var(--space-4);
  background: var(--color-critical-bg); border: 1px solid rgba(255,68,68,0.3);
  border-radius: var(--radius-md); color: var(--color-critical);
}

/* Buttons */
.auth-btn {
  display: flex; align-items: center; justify-content: center; gap: var(--space-2);
  width: 100%; padding: var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-base); font-weight: 700;
  cursor: pointer; border: none; font-family: inherit;
  transition: all var(--transition-fast); text-decoration: none;
}
.auth-btn--primary { background: var(--color-primary); color: #000; }
.auth-btn--primary:hover { background: var(--color-primary-hover); }
.auth-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.auth-btn--outline {
  background: transparent;
  border: 1.5px solid var(--color-border);
  color: var(--color-text);
}
.auth-btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* Divider */
.auth-divider {
  display: flex; align-items: center; gap: var(--space-3);
  color: var(--color-text-subtle); font-size: var(--text-sm);
}
.auth-divider::before, .auth-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--color-border);
}

.login__signup-hint { text-align: center; font-size: var(--text-sm); color: var(--color-text-muted); }
.login__terms {
  text-align: center; font-size: var(--text-xs); color: var(--color-text-subtle);
}
.login__terms a { color: var(--color-primary); }

</style>
  <div class="login">
    <div class="login__brand">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#F5E642"/><path d="M7 17L12 7L17 17M9.5 13H14.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>
      <h1 class="login__title">Acessify</h1>
      <p class="login__subtitle">Acesse sua conta</p>
    </div>

    <form class="login__form" id="form" novalidate>
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
          <input class="auth-input" type="password" id="password" placeholder="••••••••" />
          <button type="button" class="auth-toggle-pwd" id="toggle-pwd" aria-label="Mostrar senha">👁</button>
        </div>
      </div>

      <div class="login__options">
        <label class="login__remember">
          <input type="checkbox" id="remember" /> Lembrar
        </label>
        <a href="#/forgot-password" class="login__forgot">Esqueceu a senha?</a>
      </div>

      <p class="auth-feedback" id="feedback" hidden></p>

      <button type="submit" class="auth-btn auth-btn--primary" id="submit-btn">
        → Entrar
      </button>
    </form>

    <div class="auth-divider"><span>ou</span></div>
    <p class="login__signup-hint">Não tem uma conta ainda?</p>
    <a href="#/register" class="auth-btn auth-btn--outline">Criar conta grátis</a>

    <p class="login__terms">
      Ao continuar, você aceita os
      <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
    </p>
  </div>
`;

class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('form').addEventListener('submit', (e) => { e.preventDefault(); this._login(); });
    this.shadowRoot.getElementById('toggle-pwd').addEventListener('click', () => {
      const inp = this.shadowRoot.getElementById('password');
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  }

  async _login() {
    const email    = this.shadowRoot.getElementById('email').value.trim();
    const password = this.shadowRoot.getElementById('password').value;
    const fb       = this.shadowRoot.getElementById('feedback');
    const btn      = this.shadowRoot.getElementById('submit-btn');

    if (!email || !password) {
      fb.textContent = '⚠️ Preencha e-mail e senha.'; fb.hidden = false; return;
    }

    btn.disabled = true; btn.textContent = 'Entrando...';
    try {
      const user = await AuthService.login({ email, password });
      sessionStorage.setItem('acessify_user', JSON.stringify(user));
      window.Toast?.show('Bem-vindo de volta! ✓', 'success');
      window.location.hash = '#/';
    } catch {
      fb.textContent = '❌ E-mail ou senha incorretos.'; fb.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = '→ Entrar';
    }
  }
}

export { LoginForm };
