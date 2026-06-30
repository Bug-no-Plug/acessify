/**
 * @templates/layouts/app-layout/app-layout.js
 * Layout autenticado: navbar + conteúdo + footer
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.layout { display: flex; flex-direction: column; min-height: 100vh; }
.layout__main { flex: 1; padding-top: var(--navbar-height); }

</style>
  <div class="layout">
    <app-navbar></app-navbar>
    <main class="layout__main"><slot></slot></main>
    <app-footer></app-footer>
  </div>
`;
class AppLayout extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { AppLayout };
