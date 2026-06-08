const template = document.createElement('template');
template.innerHTML = `<style>
:host { display: block; }
.auth-layout { min-height: 100vh; background: var(--color-bg); display: flex; align-items: center; justify-content: center; padding: var(--space-6); }

</style><div class="auth-layout"><slot></slot></div>`;
class AuthLayout extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { AuthLayout };
