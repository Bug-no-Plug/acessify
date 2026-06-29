/**
 * @modules/settings/infra/components/settings-profile/settings-profile.js
 */
import { SettingsService } from '../../../service/SettingsService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }

.profile { display: flex; flex-direction: column; gap: var(--space-6); }

.profile__title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }

/* Avatar row */
.profile__avatar-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.profile__avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #000;
  font-size: var(--text-xl);
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.profile__avatar-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.profile__avatar-info span:first-child { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
.profile__avatar-info span:last-of-type { font-size: var(--text-xs); color: var(--color-text-muted); }
.profile__photo-btn {
  margin-top: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: none; border: none; cursor: pointer; padding: 0;
  font-family: inherit; font-weight: 500;
}
.profile__photo-btn:hover { text-decoration: underline; }

/* Fields */
.profile__fields { display: flex; flex-direction: column; gap: var(--space-4); }
.profile__field  { display: flex; flex-direction: column; gap: var(--space-2); }
.profile__label  { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); letter-spacing: 0.04em; }
.profile__input  {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text);
  font-size: var(--text-sm);
  outline: none;
  transition: border-color var(--transition-fast);
  box-sizing: border-box;
}
.profile__input::placeholder { color: var(--color-text-subtle); }
.profile__input:focus { border-color: var(--color-border-focus); }

.profile__input-icon {
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-4);
  transition: border-color var(--transition-fast);
}
.profile__input-icon:focus-within { border-color: var(--color-border-focus); }
.profile__input-icon svg { color: var(--color-text-subtle); flex-shrink: 0; }
.profile__input-icon .profile__input { border: none; padding-left: 0; background: none; }
.profile__input-icon .profile__input:focus { border: none; }

/* Footer */
.profile__footer { display: flex; justify-content: flex-end; }
.profile__save-btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  background: var(--color-primary); color: #000;
  font-weight: 700; font-size: var(--text-sm);
  border-radius: var(--radius-full); border: none; cursor: pointer;
  transition: background var(--transition-fast); font-family: inherit;
}
.profile__save-btn:hover { background: var(--color-primary-hover); }

.profile__feedback {
  font-size: var(--text-sm);
  color: var(--color-success);
  text-align: right;
}

</style>
  <div class="profile">
    <h2 class="profile__title">Informações Pessoais</h2>

    <div class="profile__avatar-row">
      <div class="profile__avatar" id="avatar-circle">G</div>
      <div class="profile__avatar-info">
        <span id="avatar-name">giulia</span>
        <span id="avatar-email">giuliamobre@gmail.com</span>
        <button class="profile__photo-btn">Alterar foto</button>
      </div>
    </div>

    <div class="profile__fields">
      <div class="profile__field">
        <label class="profile__label" for="name">Nome completo</label>
        <input class="profile__input" type="text" id="name" value="giulia" />
      </div>
      <div class="profile__field">
        <label class="profile__label" for="email">Email</label>
        <div class="profile__input-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/></svg>
          <input class="profile__input" type="email" id="email" value="giuliamobre@gmail.com" />
        </div>
      </div>
      <div class="profile__field">
        <label class="profile__label" for="org">Organização</label>
        <input class="profile__input" type="text" id="org" placeholder="Nome da empresa" />
      </div>
      <div class="profile__field">
        <label class="profile__label" for="website">Website</label>
        <div class="profile__input-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 3C12 3 8 8 8 12s4 9 4 9M12 3c0 0 4 5 4 9s-4 9-4 9M3 12h18" stroke="currentColor" stroke-width="2"/></svg>
          <input class="profile__input" type="url" id="website" placeholder="https://exemplo.com.br" />
        </div>
      </div>
    </div>

    <div class="profile__footer">
      <button class="profile__save-btn" id="save-btn">💾 Salvar alterações</button>
    </div>

    <p class="profile__feedback" id="feedback" hidden></p>
  </div>
`;

class SettingsProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._loadUser();
    this.shadowRoot.getElementById('save-btn').addEventListener('click', () => this._save());
  }

  _loadUser() {
    const user = JSON.parse(sessionStorage.getItem('acessify_user') || '{}');
    if (user.name)    this.shadowRoot.getElementById('name').value  = user.name;
    if (user.email)   this.shadowRoot.getElementById('email').value = user.email;
    const initial = (user.name || 'G')[0].toUpperCase();
    this.shadowRoot.getElementById('avatar-circle').textContent = initial;
    this.shadowRoot.getElementById('avatar-name').textContent   = user.name  || 'giulia';
    this.shadowRoot.getElementById('avatar-email').textContent  = user.email || 'giuliamobre@gmail.com';
  }

  async _save() {
    const data = {
      name:    this.shadowRoot.getElementById('name').value,
      email:   this.shadowRoot.getElementById('email').value,
      org:     this.shadowRoot.getElementById('org').value,
      website: this.shadowRoot.getElementById('website').value,
    };
    await SettingsService.saveProfile(data);
    const fb = this.shadowRoot.getElementById('feedback');
    fb.textContent = '✅ Alterações salvas!';
    fb.hidden = false;
    window.Toast?.show('Perfil atualizado com sucesso', 'success');
    setTimeout(() => { fb.hidden = true; }, 3000);
  }
}

export { SettingsProfile };
