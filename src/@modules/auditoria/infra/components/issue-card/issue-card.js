const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.issue { display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4) var(--space-5); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: border-color var(--transition-fast); }
.issue:hover { border-color: rgba(255,255,255,0.15); }
.issue__icon-wrap { width: 36px; height: 36px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: var(--text-sm); flex-shrink: 0; }
.issue__icon-wrap--critical { background: var(--color-critical-bg); color: var(--color-critical); }
.issue__icon-wrap--serious  { background: var(--color-serious-bg);  color: var(--color-serious); }
.issue__icon-wrap--moderate { background: var(--color-moderate-bg); color: var(--color-moderate); }
.issue__icon-wrap--minor    { background: var(--color-minor-bg);    color: var(--color-minor); }
.issue__body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); }
h4 { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
p  { font-size: var(--text-xs); color: var(--color-text-muted); }
.issue__meta { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-1); }
.issue__badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); }
.issue__badge--critical { background: var(--color-critical-bg); color: var(--color-critical); }
.issue__badge--serious  { background: var(--color-serious-bg);  color: var(--color-serious); }
.issue__badge--moderate { background: var(--color-moderate-bg); color: var(--color-moderate); }
.issue__badge--minor    { background: var(--color-minor-bg);    color: var(--color-minor); }
.issue__level { font-size: var(--text-xs); color: var(--color-text-subtle); }


.issue { cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease; }
.issue:hover { transform: translateX(4px); border-color: rgba(255,255,255,0.2); }
</style>
  <div class="issue" id="card">
    <div class="issue__icon-wrap" id="icon-wrap"><span id="icon"></span></div>
    <div class="issue__body">
      <h4 id="title"></h4>
      <p id="criterion"></p>
      <div class="issue__meta">
        <span class="issue__badge" id="count"></span>
        <span class="issue__level" id="level"></span>
      </div>
    </div>
  </div>
`;
class IssueCard extends HTMLElement {
  static get observedAttributes() { return ['severity','title','criterion','count','level']; }
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  _render() {
    const sev = this.getAttribute('severity') || 'minor';
    const icons = { critical:'✕', serious:'ⓘ', moderate:'⚠', minor:'ⓘ' };
    this.shadowRoot.getElementById('icon').textContent      = icons[sev] || '•';
    this.shadowRoot.getElementById('icon-wrap').className   = `issue__icon-wrap issue__icon-wrap--${sev}`;
    this.shadowRoot.getElementById('title').textContent     = this.getAttribute('title') || '';
    this.shadowRoot.getElementById('criterion').textContent = this.getAttribute('criterion') || '';
    this.shadowRoot.getElementById('count').textContent     = this.getAttribute('count') || '0';
    this.shadowRoot.getElementById('count').className       = `issue__badge issue__badge--${sev}`;
    this.shadowRoot.getElementById('level').textContent     = this.getAttribute('level') || '';
  }
}
export { IssueCard };
