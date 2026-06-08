/**
 * @modules/inicio/infra/components/faq-accordion/faq-accordion.js
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.faq__item { border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: var(--space-2); transition: border-color var(--transition-fast); }
.faq__item--open { border-color: rgba(245,230,66,0.3); }
.faq__question { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: var(--space-4) var(--space-5); background: var(--color-bg-surface); color: var(--color-text); font-size: var(--text-sm); font-weight: 500; cursor: pointer; border: none; text-align: left; gap: var(--space-4); font-family: inherit; }
.faq__question:hover { background: var(--color-bg-elevated); }
.faq__chevron { flex-shrink: 0; color: var(--color-text-muted); transition: transform var(--transition-fast); }
.faq__item--open .faq__chevron { transform: rotate(180deg); color: var(--color-primary); }
.faq__answer { padding: 0 var(--space-5) var(--space-4); background: var(--color-bg-surface); animation: faqOpen 0.25s ease both; }
@keyframes faqOpen { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
.faq__answer p { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.7; }

</style>
  <div class="faq" id="faq-list"></div>
`;

const FAQS = [
  { q: 'O que é o Acessify?', a: 'O Acessify é uma ferramenta de auditoria de acessibilidade web que ajuda desenvolvedores e designers a identificar, entender e corrigir problemas de acessibilidade em seus sites. Nossa missão é tornar a web mais inclusiva através de ferramentas claras e educativas.' },
  { q: 'Como funciona a análise de acessibilidade?', a: 'Nossa engine analisa o HTML da página em busca de violações dos critérios WCAG 2.2, classificando cada problema por severidade e fornecendo orientações de correção.' },
  { q: 'O que é WCAG?', a: 'Web Content Accessibility Guidelines — diretrizes internacionais do W3C para tornar conteúdo web acessível a pessoas com deficiência.' },
  { q: 'Preciso ter conhecimento técnico para usar?', a: 'Não! O Acessify foi projetado para ser intuitivo para designers, gestores e desenvolvedores de todos os níveis.' },
  { q: 'Quanto custa o Acessify?', a: 'O plano básico é gratuito. Planos avançados com mais auditorias e recursos estão disponíveis mediante assinatura.' },
  { q: 'Como interpretar o score de acessibilidade?', a: 'O score vai de 0 a 100. Acima de 90 é excelente. Entre 70-89 é bom com pontos de melhoria. Abaixo de 70 requer atenção.' },
  { q: 'Posso exportar os relatórios?', a: 'Sim! Você pode exportar relatórios em PDF com todos os problemas encontrados e sugestões de correção.' },
  { q: 'O Acessify substitui testes manuais?', a: 'Não completamente. Ele automatiza ~30-40% dos testes WCAG. Testes manuais com leitores de tela continuam sendo necessários.' },
  { q: 'Com que frequência devo fazer auditorias?', a: 'Recomendamos auditorias a cada deploy significativo ou, no mínimo, mensalmente.' },
  { q: 'Vocês oferecem suporte?', a: 'Sim! Acesse nossa Central de Ajuda ou envie e-mail para suporte@acessify.com.' },
];

class FaqAccordion extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }

  connectedCallback() {
    const list = this.shadowRoot.getElementById('faq-list');
    list.innerHTML = FAQS.map((f, i) => `
      <div class="faq__item" data-index="${i}">
        <button class="faq__question" aria-expanded="false">
          <span>${f.q}</span>
          <svg class="faq__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="faq__answer" hidden><p>${f.a}</p></div>
      </div>
    `).join('');

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__question');
      if (!btn) return;
      const item   = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fecha todos
      list.querySelectorAll('.faq__item').forEach(i => {
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq__answer').hidden = true;
        i.classList.remove('faq__item--open');
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        item.classList.add('faq__item--open');
      }
    });
  }
}
export { FaqAccordion };
