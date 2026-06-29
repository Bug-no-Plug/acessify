const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.lesson { display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: border-color var(--transition-fast); cursor: pointer; }
.lesson:hover { border-color: rgba(255,255,255,0.2); }
.lesson__play { width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--color-bg-elevated); display: flex; align-items: center; justify-content: center; color: var(--color-primary); flex-shrink: 0; }
.lesson__body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); }
h4 { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
p  { font-size: var(--text-xs); color: var(--color-text-muted); line-height: 1.5; }
.lesson__meta { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2); }
.lesson__badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); }
.lesson__badge--basic    { background: var(--color-learn-badge-basic);    color: var(--color-learn-badge-basic-text); }
.lesson__badge--inter    { background: var(--color-learn-badge-inter);    color: var(--color-learn-badge-inter-text); }
.lesson__badge--advanced { background: var(--color-learn-badge-advanced); color: var(--color-learn-badge-advanced-text); }
.lesson__time { display: flex; align-items: center; gap: 4px; font-size: var(--text-xs); color: var(--color-text-muted); }


.lesson { transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
.lesson:hover { transform: translateY(-3px); border-color: rgba(245,230,66,0.3); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
</style>
  <div class="lesson">
    <div class="lesson__play"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="currentColor"/></svg></div>
    <div class="lesson__body">
      <h4 id="title"></h4>
      <p id="desc"></p>
      <div class="lesson__meta">
        <span class="lesson__badge" id="badge"></span>
        <span class="lesson__time"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> <span id="time"></span></span>
      </div>
    </div>
  </div>
`;
class LessonCard extends HTMLElement {
  static get observedAttributes() { return ['title','description','level','duration']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const level = this.getAttribute('level') || 'Básico';
    const cls = { 'Básico': 'basic', 'Intermediário': 'inter', 'Avançado': 'advanced' }[level] || 'basic';
    this.shadowRoot.getElementById('title').textContent = this.getAttribute('title') || '';
    this.shadowRoot.getElementById('desc').textContent  = this.getAttribute('description') || '';
    this.shadowRoot.getElementById('time').textContent  = this.getAttribute('duration') || '';
    const badge = this.shadowRoot.getElementById('badge');
    badge.textContent = level;
    badge.className = `lesson__badge lesson__badge--${cls}`;
  }
}
export { LessonCard };
