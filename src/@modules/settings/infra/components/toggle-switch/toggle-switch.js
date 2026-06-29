/**
 * @modules/settings/infra/components/toggle-switch/toggle-switch.js
 * Toggle acessível que emite 'toggle-change' com { checked: boolean }
 * Atributos: checked, disabled, label
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: inline-block; }

.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}

.toggle__input { position: absolute; opacity: 0; width: 0; height: 0; }

.toggle__track {
  position: relative;
  width: 44px; height: 24px;
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: background var(--transition-fast), border-color var(--transition-fast);
  flex-shrink: 0;
}

.toggle__thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 16px; height: 16px;
  background: var(--color-text-muted);
  border-radius: 50%;
  transition: transform var(--transition-fast), background var(--transition-fast);
}

.toggle__input:checked ~ .toggle__track {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.toggle__input:checked ~ .toggle__track .toggle__thumb {
  transform: translateX(20px);
  background: #000;
}

.toggle__input:focus-visible ~ .toggle__track {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.toggle__input:disabled ~ .toggle__track {
  opacity: 0.4;
  cursor: not-allowed;
}

.toggle__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text);
}

</style>
  <label class="toggle">
    <input class="toggle__input" type="checkbox" id="cb" role="switch" />
    <span class="toggle__track">
      <span class="toggle__thumb"></span>
    </span>
    <span class="toggle__label" id="lbl"></span>
  </label>
`;

class ToggleSwitch extends HTMLElement {
  static get observedAttributes() { return ['checked', 'disabled', 'label']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._cb = this.shadowRoot.getElementById('cb');
    this._render();
    this._cb.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('toggle-change', {
        detail: { checked: this._cb.checked },
        bubbles: true,
        composed: true,
      }));
    });
  }

  attributeChangedCallback() { this._render(); }

  _render() {
    if (!this._cb) return;
    this._cb.checked  = this.hasAttribute('checked') && this.getAttribute('checked') !== 'false';
    this._cb.disabled = this.hasAttribute('disabled');
    this.shadowRoot.getElementById('lbl').textContent = this.getAttribute('label') || '';
  }

  get checked() { return this._cb?.checked ?? false; }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }
}

export { ToggleSwitch };
