const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.file-upload { display: flex; flex-direction: column; gap: var(--space-4); }
.file-upload__drop { background: var(--color-bg-elevated); border: 2px dashed var(--color-border); border-radius: var(--radius-xl); padding: var(--space-12) var(--space-6); display: flex; flex-direction: column; align-items: center; gap: var(--space-3); text-align: center; transition: border-color var(--transition-fast); cursor: pointer; }
.file-upload__drop--over { border-color: var(--color-primary); }
.file-upload__drop svg { color: var(--color-text-muted); }
.file-upload__title { font-weight: 600; font-size: var(--text-base); color: var(--color-text); }
.file-upload__sub   { font-size: var(--text-sm); color: var(--color-text-muted); }
.file-upload__hint  { font-size: var(--text-xs); color: var(--color-text-subtle); }
.file-upload__select-btn { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-5); background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600; color: var(--color-text); cursor: pointer; transition: all var(--transition-fast); }
.file-upload__select-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.file-upload__start-btn { width: 100%; padding: var(--space-4); background: var(--color-primary); color: #000; font-weight: 700; font-size: var(--text-base); border-radius: var(--radius-full); border: none; cursor: pointer; transition: background var(--transition-fast); }
.file-upload__start-btn:hover { background: var(--color-primary-hover); }

</style>
  <div class="file-upload">
    <div class="file-upload__drop" id="drop-zone">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <p class="file-upload__title">Arraste seu arquivo HTML aqui</p>
      <p class="file-upload__sub">ou clique para selecionar</p>
      <button class="file-upload__select-btn" id="select-btn">↑ Selecionar Arquivo</button>
      <p class="file-upload__hint">Formatos aceitos: .html (máx. 10MB)</p>
      <input type="file" id="file-input" accept=".html" hidden />
    </div>
    <button class="file-upload__start-btn" id="start-btn">Iniciar Auditoria →</button>
  </div>
`;
class FileUpload extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    const input    = this.shadowRoot.getElementById('file-input');
    const drop     = this.shadowRoot.getElementById('drop-zone');
    const selectBtn = this.shadowRoot.getElementById('select-btn');
    this.shadowRoot.getElementById('start-btn').addEventListener('click', () => {
      if (input.files[0]) this.dispatchEvent(new CustomEvent('audit-start', { detail: { type: 'file', value: input.files[0] }, bubbles: true, composed: true }));
    });
    selectBtn.addEventListener('click', () => input.click());
    input.addEventListener('change', () => this._updateLabel(input.files[0]?.name));
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('file-upload__drop--over'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('file-upload__drop--over'));
    drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('file-upload__drop--over'); input.files = e.dataTransfer.files; this._updateLabel(input.files[0]?.name); });
  }
  _updateLabel(name) {
    if (name) this.shadowRoot.querySelector('.file-upload__title').textContent = name;
  }
}
export { FileUpload };
