const LESSONS = [
  { title:'Introdução à Acessibilidade Web',  description:'Entenda os princípios básicos e a importância da acessibilidade digital', level:'Básico',        duration:'10 min' },
  { title:'WCAG 2.2: Guia Completo',          description:'Conheça todos os critérios de sucesso e níveis de conformidade',          level:'Intermediário', duration:'25 min' },
  { title:'Testando com Leitores de Tela',    description:'Aprenda a usar NVDA, JAWS e VoiceOver para testar seus sites',            level:'Intermediário', duration:'20 min' },
  { title:'Acessibilidade em Formulários',    description:'Boas práticas para criar formulários inclusivos e utilizáveis',           level:'Básico',        duration:'15 min' },
  { title:'Navegação por Teclado',            description:'Como garantir que seu site seja totalmente navegável sem mouse',          level:'Básico',        duration:'12 min' },
  { title:'ARIA: Quando e Como Usar',         description:'Domine os atributos ARIA para componentes complexos',                     level:'Avançado',      duration:'30 min' },
];
const RESOURCES = [
  { title:'WCAG 2.2 Quick Reference', description:'W3C Web Accessibility Initiative', href:'https://www.w3.org/WAI/WCAG22/quickref/' },
  { title:'The A11Y Project',         description:'Checklist e recursos da comunidade', href:'https://www.a11yproject.com/' },
  { title:'WebAIM',                   description:'Artigos e ferramentas de teste',    href:'https://webaim.org/' },
  { title:'Inclusive Components',     description:'Padrões de componentes acessíveis', href:'https://inclusive-components.design/' },
];

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .aprender { max-width: var(--container-max); margin-inline: auto; padding: var(--space-8) var(--space-6) var(--space-16); display: flex; flex-direction: column; gap: var(--space-6); }
    h1 { font-size: var(--text-2xl); font-weight: 800; animation: fadeInUp 0.4s ease both; }
    .aprender__sub { font-size: var(--text-sm); color: var(--color-text-muted); animation: fadeInUp 0.4s ease 0.05s both; }
    .aprender__banner-wrap  { animation: fadeInUp 0.4s ease 0.1s both; }
    .aprender__progress-wrap{ animation: fadeInUp 0.4s ease 0.15s both; }
    .aprender__section { display: flex; flex-direction: column; gap: var(--space-4); animation: fadeInUp 0.4s ease 0.2s both; }
    .aprender__section + .aprender__section { animation-delay: 0.28s; }
    .aprender__section h2 { font-size: var(--text-base); font-weight: 700; color: var(--color-text); }
    .aprender__lessons { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
    .aprender__resources { display: flex; flex-direction: column; gap: var(--space-2); }
    @media (max-width: 640px) { .aprender__lessons { grid-template-columns: 1fr; } }
  </style>

  <div class="aprender">
    <h1>Aprenda Acessibilidade</h1>
    <p class="aprender__sub">Recursos educativos para desenvolver suas habilidades em acessibilidade web</p>
    <div class="aprender__banner-wrap"><aprender-banner></aprender-banner></div>
    <div class="aprender__progress-wrap"><aprender-progress completed="2" total="6"></aprender-progress></div>
    <section class="aprender__section">
      <h2>Trilha de Aprendizado</h2>
      <div class="aprender__lessons" id="lessons"></div>
    </section>
    <section class="aprender__section">
      <h2>Recursos Externos</h2>
      <div class="aprender__resources" id="resources"></div>
    </section>
  </div>
`;

class AprenderPage extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
  connectedCallback() {
    this.shadowRoot.getElementById('lessons').innerHTML = LESSONS.map((l,i) => `
      <aprender-lesson-card title="${l.title}" description="${l.description}" level="${l.level}" duration="${l.duration}"
        style="animation: fadeInUp 0.4s ease ${0.25 + i*0.07}s both"></aprender-lesson-card>
    `).join('');
    this.shadowRoot.getElementById('resources').innerHTML = RESOURCES.map((r,i) => `
      <aprender-resource-link title="${r.title}" description="${r.description}" href="${r.href}"
        style="animation: fadeInUp 0.4s ease ${0.25 + i*0.07}s both"></aprender-resource-link>
    `).join('');
  }
}
export { AprenderPage };
