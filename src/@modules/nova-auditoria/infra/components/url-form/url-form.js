const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.url-form { background: var(--color-bg-elevated); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
.url-form__title { font-size: var(--text-lg); font-weight: 600; color: var(--color-text); }
.url-form__subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-2)); }
.url-form__field { display: flex; align-items: center; gap: var(--space-3); background: var(--color-bg-surface); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); }
.url-form__field svg { color: var(--color-text-subtle); flex-shrink: 0; }
.url-form__input { flex: 1; background: none; border: none; outline: none; color: var(--color-text); font-size: var(--text-sm); }
.url-form__input::placeholder { color: var(--color-text-subtle); }
.url-form__btn { width: 100%; padding: var(--space-4); background: var(--color-primary); color: #000; font-weight: 700; font-size: var(--text-base); border-radius: var(--radius-full); border: none; cursor: pointer; transition: background var(--transition-fast); }
.url-form__btn:hover { background: var(--color-primary-hover); }

</style>
  <div class="url-form">
    <h3 class="url-form__title">URL do Website</h3>
    <p class="url-form__subtitle">Insira a URL completa do site que deseja auditar</p>
    <div class="url-form__field">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input class="url-form__input" type="url" id="url-input" placeholder="https://exemplo.com.br" />
    </div>
    <button class="url-form__btn" id="start-btn">Iniciar Auditoria →</button>
  </div>
`;
class UrlForm extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    this.shadowRoot.getElementById('start-btn').addEventListener('click', () => {
      const url = this.shadowRoot.getElementById('url-input').value.trim();
      if (!url) return;
      this.dispatchEvent(new CustomEvent('audit-start', { detail: { type: 'url', value: url }, bubbles: true, composed: true }));
    });
  }
}
export { UrlForm };
