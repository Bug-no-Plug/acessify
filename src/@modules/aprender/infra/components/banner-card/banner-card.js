const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.banner { background: var(--color-learn-banner); border-radius: var(--radius-xl); padding: var(--space-5) var(--space-6); display: flex; align-items: center; gap: var(--space-4); }
.banner__icon { font-size: 2rem; flex-shrink: 0; background: rgba(255,255,255,0.15); width: 52px; height: 52px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; }
h3 { font-size: var(--text-base); font-weight: 700; color: #fff; margin-bottom: var(--space-1); }
p  { font-size: var(--text-sm); color: rgba(255,255,255,0.8); line-height: 1.5; }

</style>
  <div class="banner">
    <div class="banner__icon">📖</div>
    <div>
      <h3>Construa sites mais inclusivos</h3>
      <p>Aprenda as melhores práticas de acessibilidade e torne a web um lugar melhor para todos</p>
    </div>
  </div>
`;
class BannerCard extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { BannerCard };
