const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; flex: 1; }
.search { display: flex; align-items: center; gap: var(--space-3); background: var(--color-bg-surface); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); transition: border-color var(--transition-fast); }
.search:focus-within { border-color: var(--color-border-focus); }
.search svg { color: var(--color-text-muted); flex-shrink: 0; }
.search__input { flex: 1; background: none; border: none; outline: none; color: var(--color-text); font-size: var(--text-sm); }
.search__input::placeholder { color: var(--color-text-subtle); }

</style>
  <div class="search">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    <input class="search__input" type="text" placeholder="Buscar por URL..." id="input" />
  </div>
`;
class SearchBar extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    this.shadowRoot.getElementById('input').addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('search', { detail: e.target.value, bubbles: true, composed: true }));
    });
  }
}
export { SearchBar };
