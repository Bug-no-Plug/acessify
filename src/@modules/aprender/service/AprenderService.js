/**
 * @modules/aprender/service/AprenderService.js
 */
export const AprenderService = {
  async getLessons() {
    return [
      { title: 'Introdução à Acessibilidade Web',  description: 'Entenda os princípios básicos e a importância da acessibilidade digital', level: 'Básico',        duration: '10 min' },
      { title: 'WCAG 2.2: Guia Completo',          description: 'Conheça todos os critérios de sucesso e níveis de conformidade',          level: 'Intermediário', duration: '25 min' },
      { title: 'Testando com Leitores de Tela',    description: 'Aprenda a usar NVDA, JAWS e VoiceOver para testar seus sites',            level: 'Intermediário', duration: '20 min' },
      { title: 'Acessibilidade em Formulários',    description: 'Boas práticas para criar formulários inclusivos e utilizáveis',           level: 'Básico',        duration: '15 min' },
      { title: 'Navegação por Teclado',            description: 'Como garantir que seu site seja totalmente navegável sem mouse',          level: 'Básico',        duration: '12 min' },
      { title: 'ARIA: Quando e Como Usar',         description: 'Domine os atributos ARIA para componentes complexos',                     level: 'Avançado',      duration: '30 min' },
    ];
  },
  async getResources() {
    return [
      { title: 'WCAG 2.2 Quick Reference', description: 'W3C Web Accessibility Initiative', href: 'https://www.w3.org/WAI/WCAG22/quickref/' },
      { title: 'The A11Y Project',         description: 'Checklist e recursos da comunidade', href: 'https://www.a11yproject.com/' },
      { title: 'WebAIM',                   description: 'Artigos e ferramentas de teste',     href: 'https://webaim.org/' },
      { title: 'Inclusive Components',     description: 'Padrões de componentes acessíveis',  href: 'https://inclusive-components.design/' },
    ];
  },
  async getProgress() {
    return { completed: 2, total: 6 };
  },
};
