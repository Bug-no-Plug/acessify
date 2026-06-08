import { AuthService } from '../../../service/AuthService.js';
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.forgot { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: var(--space-4); }
.forgot__back { font-size: var(--text-sm); color: var(--color-text-muted); text-decoration: none; display: flex; align-items: center; gap: var(--space-2); }
.forgot__back:hover { color: var(--color-text); }
.forgot__icon { width: 64px; height: 64px; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-inline: auto; }
.forgot__title { font-size: var(--text-2xl); font-weight: 800; color: var(--color-text); text-align: center; }
.forgot__desc  { font-size: var(--text-sm); color: var(--color-text-muted); text-align: center; }
form { display: flex; flex-direction: column; gap: var(--space-4); }
.auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
.auth-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); letter-spacing: 0.04em; }
.auth-input-wrap { display: flex; align-items: center; gap: var(--space-3); background: var(--color-bg-elevated); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: 0 var(--space-4); transition: border-color var(--transition-fast); }
.auth-input-wrap:focus-within { border-color: var(--color-border-focus); }
.auth-input-wrap svg { color: var(--color-text-subtle); flex-shrink: 0; }
.auth-input { flex: 1; background: none; border: none; outline: none; color: var(--color-text); font-size: var(--text-sm); padding: var(--space-3) 0; font-family: inherit; }
.auth-input::placeholder { color: var(--color-text-subtle); }
.auth-feedback { font-size: var(--text-sm); padding: var(--space-3) var(--space-4); background: var(--color-critical-bg); border: 1px solid rgba(255,68,68,0.3); border-radius: var(--radius-md); color: var(--color-critical); }
.auth-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; padding: var(--space-4); border-radius: var(--radius-full); font-size: var(--text-base); font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all var(--transition-fast); }
.auth-btn--primary { background: var(--color-primary); color: #000; }
.auth-btn--primary:hover { background: var(--color-primary-hover); }
.auth-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.forgot__security-note { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-4); background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
.forgot__security-note svg { color: var(--color-text-muted); flex-shrink: 0; margin-top: 1px; }
.forgot__security-note p { font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.6; }

</style>
  <div class="forgot">
    <a href="#/login" class="forgot__back">← Voltar para login</a>
    <div class="forgot__icon">✉</div>
    <h1 class="forgot__title">Esqueceu sua senha?</h1>
    <p class="forgot__desc">Enviaremos um e-mail com as instruções</p>
    <form id="form" novalidate>
      <div class="auth-field">
        <label class="auth-label" for="email">E-mail</label>
        <div class="auth-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/></svg>
          <input class="auth-input" type="email" id="email" placeholder="seu@email.com" />
        </div>
      </div>
      <p class="auth-feedback" id="feedback" hidden></p>
      <button type="submit" class="auth-btn auth-btn--primary" id="submit-btn">✈ Enviar e-mail</button>
    </form>
    <div class="forgot__security-note">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/></svg>
      <p>Sua segurança é nossa prioridade. Por segurança, sempre confirmamos o envio. Se seu e-mail estiver cadastrado, você receberá as instruções.</p>
    </div>
  </div>
`;
class ForgotPasswordForm extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    this.shadowRoot.getElementById('form').addEventListener('submit', (e) => { e.preventDefault(); this._send(); });
  }
  async _send() {
    const email = this.shadowRoot.getElementById('email').value.trim();
    const fb    = this.shadowRoot.getElementById('feedback');
    const btn   = this.shadowRoot.getElementById('submit-btn');
    if (!email) { fb.textContent = '⚠️ Insira seu e-mail.'; fb.hidden = false; return; }
    btn.disabled = true; btn.textContent = 'Enviando...';
    await AuthService.forgotPassword(email);
    fb.textContent = '✅ Se o e-mail estiver cadastrado, você receberá as instruções.';
    fb.style.background = 'var(--color-success-bg)'; fb.style.borderColor = 'rgba(34,197,94,0.3)'; fb.style.color = 'var(--color-success)';
    fb.hidden = false;
    btn.disabled = false; btn.textContent = '✈ Enviar e-mail';
  }
}
export { ForgotPasswordForm };
