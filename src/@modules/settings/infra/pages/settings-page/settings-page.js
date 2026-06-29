const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    @keyframes fadeInUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInRight { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
    .settings { max-width: var(--container-max); margin-inline: auto; padding: var(--space-8) var(--space-6) var(--space-16); }
    .settings__header { margin-bottom: var(--space-8); animation: fadeInUp 0.4s ease both; }
    .settings__header h1 { font-size: var(--text-2xl); font-weight: 800; }
    .settings__header p  { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--space-1); }
    .settings__body { display: grid; grid-template-columns: 180px 1fr; gap: var(--space-8); align-items: start; }
    .settings__sidebar {
      background: var(--color-bg-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-xl); padding: var(--space-3);
      position: sticky; top: calc(var(--navbar-height) + var(--space-4));
      animation: fadeInUp 0.4s ease 0.05s both;
    }
    .settings__panel {
      background: var(--color-bg-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-xl); padding: var(--space-8);
      animation: fadeInRight 0.35s ease 0.1s both;
    }
    @media (max-width: 768px) {
      .settings__body { grid-template-columns: 1fr; gap: var(--space-4); }
      .settings__sidebar { position: static; overflow-x: auto; }
      .settings__panel { padding: var(--space-5); }
    }
  </style>

  <div class="settings">
    <div class="settings__header">
      <h1>Configurações</h1>
      <p>Gerencie suas preferências e configurações de conta</p>
    </div>
    <div class="settings__body">
      <aside class="settings__sidebar">
        <settings-sidebar></settings-sidebar>
      </aside>
      <main class="settings__panel" id="panel">
        <settings-profile></settings-profile>
      </main>
    </div>
  </div>
`;

const PANELS = {
  profile:       '<settings-profile></settings-profile>',
  notifications: '<settings-notifications></settings-notifications>',
  security:      '<settings-security></settings-security>',
  appearance:    '<settings-appearance></settings-appearance>',
};

class SettingsPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  connectedCallback() {
    this.shadowRoot.querySelector('settings-sidebar').addEventListener('nav-change', (e) => {
      const panel = this.shadowRoot.getElementById('panel');
      // Fade out → swap → fade in
      panel.style.opacity = '0';
      panel.style.transform = 'translateX(8px)';
      panel.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      setTimeout(() => {
        panel.innerHTML = PANELS[e.detail] ?? PANELS.profile;
        panel.style.opacity = '1';
        panel.style.transform = 'translateX(0)';
      }, 140);
    });
  }
}
export { SettingsPage };
