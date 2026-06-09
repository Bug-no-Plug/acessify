const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.mission { text-align: center; padding: var(--space-12) var(--space-8); max-width: 680px; margin-inline: auto; }
.mission__text { font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-6); }
.mission__text strong { color: var(--color-text); }
.mission__badges { display: flex; justify-content: center; gap: var(--space-3); flex-wrap: wrap; }
.mission__badge { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-size: var(--text-sm); color: var(--color-text-muted); }

</style>
  <div class="mission">
    <p class="mission__text">
      Acreditamos que a web deve ser acessível para <strong>todas as pessoas</strong>, independente de suas habilidades.
      O Acessify nasceu para <strong>educar</strong> e <strong>capacitar</strong> desenvolvedores, designers e gestores
      a criar experiências digitais verdadeiramente inclusivas.
    </p>
    <div class="mission__badges">
      <span class="mission__badge">✓ Inclusão Digital</span>
      <span class="mission__badge">✓ Educação Contínua</span>
      <span class="mission__badge">✓ Ferramentas Práticas</span>
    </div>
  </div>
`;
class MissionBlock extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { MissionBlock };
