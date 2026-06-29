/**
 * @modules/settings/infra/components/settings-security/settings-security.js
 */
import { SettingsService } from '../../../service/SettingsService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.security { display: flex; flex-direction: column; gap: var(--space-8); }
.security__title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
.security__section { display: flex; flex-direction: column; gap: var(--space-4); }
.security__section h3 { font-size: var(--text-base); font-weight: 600; color: var(--color-text); }
.security__desc { font-size: var(--text-sm); color: var(--color-text-muted); }
.security__fields { display: flex; flex-direction: column; gap: var(--space-4); }
.security__field  { display: flex; flex-direction: column; gap: var(--space-2); }
.security__label  { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); }
.security__input-wrap {
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--color-bg-elevated); border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg); padding: 0 var(--space-4);
  transition: border-color var(--transition-fast);
}
.security__input-wrap:focus-within { border-color: var(--color-border-focus); }
.security__input-wrap svg { color: var(--color-text-subtle); flex-shrink: 0; }
.security__input {
  flex: 1; background: none; border: none; outline: none;
  color: var(--color-text); font-size: var(--text-sm);
  padding: var(--space-3) 0; font-family: inherit;
}
.security__input::placeholder { color: var(--color-text-subtle); }
.security__btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-5); border-radius: var(--radius-full);
  font-size: var(--text-sm); font-weight: 600; cursor: pointer;
  border: none; font-family: inherit; transition: all var(--transition-fast);
  align-self: flex-start;
}
.security__btn--primary { background: var(--color-primary); color: #000; }
.security__btn--primary:hover { background: var(--color-primary-hover); }
.security__btn--outline { background: transparent; border: 1.5px solid var(--color-border); color: var(--color-text); }
.security__btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.security__btn--danger { background: var(--color-critical); color: #fff; }
.security__btn--danger:hover { opacity: 0.85; }
.security__section--danger {
  background: rgba(255, 68, 68, 0.06);
  border: 1px solid rgba(255, 68, 68, 0.2);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}
.security__danger-header {
  display: flex; align-items: center; gap: var(--space-2);
  color: var(--color-critical); font-weight: 600; font-size: var(--text-sm);
}
.security__feedback { font-size: var(--text-sm); }

</style>
  <div class="security">
    <h2 class="security__title">Segurança da Conta</h2>

    <!-- Alterar senha -->
    <section class="security__section">
      <h3>Alterar senha</h3>
      <div class="security__fields">
        <div class="security__field">
          <label class="security__label" for="pwd-current">Senha atual</label>
          <div class="security__input-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
            <input class="security__input" type="password" id="pwd-current" placeholder="••••••••" />
          </div>
        </div>
        <div class="security__field">
          <label class="security__label" for="pwd-new">Nova senha</label>
          <div class="security__input-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
            <input class="security__input" type="password" id="pwd-new" placeholder="Mínimo 8 caracteres" />
          </div>
        </div>
        <div class="security__field">
          <label class="security__label" for="pwd-confirm">Confirmar nova senha</label>
          <div class="security__input-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2"/></svg>
            <input class="security__input" type="password" id="pwd-confirm" placeholder="Repita sua senha" />
          </div>
        </div>
      </div>
      <button class="security__btn security__btn--primary" id="change-pwd-btn">Atualizar senha</button>
      <p class="security__feedback" id="pwd-feedback" hidden></p>
    </section>

    <!-- Exportar dados -->
    <section class="security__section">
      <h3>Exportar dados</h3>
      <p class="security__desc">Salve uma cópia de todos os seus dados de auditoria</p>
      <button class="security__btn security__btn--outline" id="export-btn">↓ Exportar dados</button>
    </section>

    <!-- Zona de perigo -->
    <section class="security__section security__section--danger">
      <div class="security__danger-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/></svg>
        <span>Alerta</span>
      </div>
      <p class="security__desc">Excluir sua conta permanentemente. Esta ação não pode ser desfeita.</p>
      <button class="security__btn security__btn--danger" id="delete-btn">Excluir conta</button>
    </section>
  </div>
`;

class SettingsSecurity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('change-pwd-btn').addEventListener('click', () => this._changePassword());
    this.shadowRoot.getElementById('export-btn').addEventListener('click', () => {
      alert('Exportação de dados iniciada. Você receberá um email em breve.');
    });
    this.shadowRoot.getElementById('delete-btn').addEventListener('click', () => {
      if (confirm('Tem certeza? Esta ação é irreversível.')) {
        sessionStorage.clear();
        window.location.hash = '#/login';
      }
    });
  }

  async _changePassword() {
    const current = this.shadowRoot.getElementById('pwd-current').value;
    const newPwd  = this.shadowRoot.getElementById('pwd-new').value;
    const confirm = this.shadowRoot.getElementById('pwd-confirm').value;
    const fb      = this.shadowRoot.getElementById('pwd-feedback');

    if (!current || !newPwd || !confirm) {
      fb.textContent = '⚠️ Preencha todos os campos.'; fb.style.color = 'var(--color-critical)'; fb.hidden = false; return;
    }
    if (newPwd !== confirm) {
      fb.textContent = '⚠️ As senhas não coincidem.'; fb.style.color = 'var(--color-critical)'; fb.hidden = false; return;
    }
    if (newPwd.length < 8) {
      fb.textContent = '⚠️ A senha deve ter ao menos 8 caracteres.'; fb.style.color = 'var(--color-critical)'; fb.hidden = false; return;
    }
    await SettingsService.changePassword({ current, newPwd });
    fb.textContent = '✅ Senha atualizada com sucesso!'; fb.style.color = 'var(--color-success)'; fb.hidden = false;
    setTimeout(() => { fb.hidden = true; }, 3000);
  }
}

export { SettingsSecurity };
