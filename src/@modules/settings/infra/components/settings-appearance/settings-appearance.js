/**
 * @modules/settings/infra/components/settings-appearance/settings-appearance.js
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.appearance { display: flex; flex-direction: column; gap: var(--space-6); }
.appearance__title { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
.appearance__options { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
.appearance__radio { position: absolute; opacity: 0; pointer-events: none; }
.appearance__option {
  position: relative;
  display: flex; flex-direction: column; gap: var(--space-3);
  padding: var(--space-5);
  background: var(--color-bg-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}
.appearance__option:hover { border-color: rgba(255,255,255,0.2); }
.appearance__option--active { border-color: var(--color-primary); }

.appearance__preview {
  width: 52px; height: 52px; border-radius: var(--radius-lg);
  display: flex; align-items: center; justify-content: center;
}
.appearance__preview--light { background: #f8fafc; color: #475569; }
.appearance__preview--dark  { background: var(--color-bg-elevated); color: var(--color-text-muted); }

.appearance__mode-name { display: block; font-size: var(--text-sm); font-weight: 700; color: var(--color-text); margin-bottom: var(--space-1); }
.appearance__mode-desc { display: block; font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.5; }

.appearance__check {
  position: absolute; top: var(--space-4); right: var(--space-4);
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--color-primary); color: #000;
  font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

@media (max-width: 480px) { .appearance__options { grid-template-columns: 1fr; } }

</style>
  <div class="appearance">
    <h2 class="appearance__title">Modo de Exibição</h2>

    <div class="appearance__options">
      <label class="appearance__option" data-mode="light">
        <input type="radio" name="theme" value="light" class="appearance__radio" />
        <div class="appearance__preview appearance__preview--light">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <div class="appearance__info">
          <span class="appearance__mode-name">Light Mode</span>
          <span class="appearance__mode-desc">Interface clara e vibrante, ideal para ambientes bem iluminados</span>
        </div>
        <span class="appearance__check" id="check-light" hidden>✓</span>
      </label>

      <label class="appearance__option appearance__option--active" data-mode="dark">
        <input type="radio" name="theme" value="dark" class="appearance__radio" checked />
        <div class="appearance__preview appearance__preview--dark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" stroke-width="2"/></svg>
        </div>
        <div class="appearance__info">
          <span class="appearance__mode-name">Dark Mode</span>
          <span class="appearance__mode-desc">Interface escura, reduz cansaço visual em ambientes com pouca luz</span>
        </div>
        <span class="appearance__check" id="check-dark">✓</span>
      </label>
    </div>
  </div>
`;

class SettingsAppearance extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.appearance__option').forEach(option => {
      option.addEventListener('click', () => {
        const mode = option.dataset.mode;
        this._setMode(mode);
      });
    });
  }

  _setMode(mode) {
    // Atualiza UI
    this.shadowRoot.querySelectorAll('.appearance__option').forEach(o => {
      o.classList.toggle('appearance__option--active', o.dataset.mode === mode);
    });
    this.shadowRoot.getElementById('check-light').hidden = mode !== 'light';
    this.shadowRoot.getElementById('check-dark').hidden  = mode !== 'dark';

    // Aplica no documento (placeholder — no projeto real integrar com variáveis CSS)
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('acessify_theme', mode);
  }
}

export { SettingsAppearance };
