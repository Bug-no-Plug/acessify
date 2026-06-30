const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    .inicio { max-width: var(--container-max); margin-inline: auto; padding: var(--space-12) var(--space-6) var(--space-16); }

    /* Hero */
    .inicio__hero { text-align: center; padding-bottom: var(--space-12); animation: fadeInUp 0.6s ease both; }
    @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    .inicio__title { font-size: var(--text-4xl); font-weight: 800; margin-bottom: var(--space-4); }
    .inicio__subtitle { font-size: var(--text-base); color: var(--color-text-muted); max-width: 580px; margin-inline: auto; line-height: 1.7; margin-bottom: var(--space-4); }
    .inicio__wcag-badge { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-muted); }
    .inicio__wcag-badge span:first-child { color: var(--color-primary); }
    .inicio__wcag-badge a { color: var(--color-primary); transition: opacity 0.2s; }
    .inicio__wcag-badge a:hover { opacity: 0.75; }

    .inicio__section { margin-bottom: var(--space-16); animation: fadeInUp 0.6s ease both; }
    .inicio__section:nth-child(2) { animation-delay: 0.1s; }
    .inicio__section:nth-child(3) { animation-delay: 0.2s; }
    .inicio__section:nth-child(4) { animation-delay: 0.3s; }
    .inicio__section:nth-child(5) { animation-delay: 0.4s; }

    .inicio__section-title { font-size: var(--text-2xl); font-weight: 700; text-align: center; margin-bottom: var(--space-8); }
    .inicio__features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }

    @media (max-width: 768px) { .inicio__title { font-size: var(--text-3xl); } .inicio__features-grid { grid-template-columns: 1fr; } }
    @media (min-width: 769px) and (max-width: 1024px) { .inicio__features-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>

  <div class="inicio">
    <section class="inicio__hero">
      <h1 class="inicio__title">Sobre o Acessify</h1>
      <p class="inicio__subtitle">Tornando a web mais acessível, uma auditoria por vez. Nossa missão é democratizar o conhecimento sobre acessibilidade e facilitar a criação de experiências digitais inclusivas.</p>
      <div class="inicio__wcag-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-primary)"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
        <span>Baseado em WCAG 2.2 •</span>
        <a href="https://www.w3.org/WAI/" target="_blank" rel="noopener">Padrões W3C</a>
      </div>
    </section>

    <section class="inicio__section">
      <inicio-stats-grid></inicio-stats-grid>
    </section>

    <section class="inicio__section">
      <h2 class="inicio__section-title">Por que usar o Acessify?</h2>
      <div class="inicio__features-grid">
        <inicio-feature-card
          icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
          title="Análise Rápida"
          description="Resultados em segundos com análise automática completa baseada em WCAG 2.2"></inicio-feature-card>
        <inicio-feature-card
          icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
          title="Aprenda Fazendo"
          description="Cada problema identificado vem com explicações claras e exemplos de código"></inicio-feature-card>
        <inicio-feature-card
          icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
          title="Acompanhe Progresso"
          description="Compare auditorias ao longo do tempo e veja a evolução da acessibilidade"></inicio-feature-card>
        <inicio-feature-card
          icon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
          title="Conformidade WCAG"
          description="Baseado nos padrões internacionais de acessibilidade web mais atualizados"></inicio-feature-card>
      </div>
    </section>

    <section class="inicio__section">
      <inicio-mission-block></inicio-mission-block>
    </section>

    <section class="inicio__section">
      <h2 class="inicio__section-title">Perguntas Frequentes</h2>
      <inicio-faq-accordion></inicio-faq-accordion>
    </section>
  </div>
`;
class InicioPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { InicioPage };
