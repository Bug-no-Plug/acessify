/**
 * @modules/settings/infra/components/settings-notifications/settings-notifications.js
 */
import { SettingsService } from '../../../service/SettingsService.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.notif { display: flex; flex-direction: column; gap: var(--space-6); }
.notif__title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
.notif__list { display: flex; flex-direction: column; gap: var(--space-1); }
.notif__item {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  gap: var(--space-4);
}
.notif__info { display: flex; flex-direction: column; gap: 2px; }
.notif__name { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
.notif__desc { font-size: var(--text-xs); color: var(--color-text-muted); }
.notif__footer { display: flex; justify-content: flex-end; }
.notif__save-btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  background: var(--color-primary); color: #000;
  font-weight: 700; font-size: var(--text-sm);
  border-radius: var(--radius-full); border: none; cursor: pointer;
  transition: background var(--transition-fast); font-family: inherit;
}
.notif__save-btn:hover { background: var(--color-primary-hover); }

</style>
  <div class="notif">
    <h2 class="notif__title">Preferências de Notificações</h2>

    <div class="notif__list">
      <div class="notif__item">
        <div class="notif__info">
          <span class="notif__name">Notificações por email</span>
          <span class="notif__desc">Receba atualizações sobre suas auditorias</span>
        </div>
        <toggle-switch checked id="toggle-email"></toggle-switch>
      </div>

      <div class="notif__item">
        <div class="notif__info">
          <span class="notif__name">Notificações push</span>
          <span class="notif__desc">Alertas em tempo real no navegador</span>
        </div>
        <toggle-switch id="toggle-push"></toggle-switch>
      </div>

      <div class="notif__item">
        <div class="notif__info">
          <span class="notif__name">Resumo semanal</span>
          <span class="notif__desc">Relatório com estatísticas das suas auditorias</span>
        </div>
        <toggle-switch checked id="toggle-weekly"></toggle-switch>
      </div>
    </div>

    <div class="notif__footer">
      <button class="notif__save-btn" id="save-btn">💾 Salvar preferências</button>
    </div>
  </div>
`;

class SettingsNotifications extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('save-btn').addEventListener('click', async () => {
      const prefs = {
        email:  this.shadowRoot.getElementById('toggle-email').checked,
        push:   this.shadowRoot.getElementById('toggle-push').checked,
        weekly: this.shadowRoot.getElementById('toggle-weekly').checked,
      };
      await SettingsService.saveNotifications(prefs);
      this.shadowRoot.getElementById('save-btn').textContent = '✅ Salvo!';
      setTimeout(() => { this.shadowRoot.getElementById('save-btn').textContent = '💾 Salvar preferências'; }, 2000);
    });
  }
}

export { SettingsNotifications };
