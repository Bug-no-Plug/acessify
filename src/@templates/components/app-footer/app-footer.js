const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.footer { background: var(--color-bg-surface); border-top: 1px solid var(--color-border); padding: var(--space-12) var(--space-6) var(--space-6); }
.footer__top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--space-8); margin-bottom: var(--space-8); max-width: var(--container-max); margin-inline: auto; }
.footer__brand { display: flex; flex-direction: column; gap: var(--space-3); }
.footer__brand span { font-weight: 700; font-size: var(--text-lg); color: var(--color-text); }
.footer__brand p { font-size: var(--text-sm); color: var(--color-text-muted); }
.footer__logo { width: 28px; }
.footer__socials { display: flex; gap: var(--space-3); }
.footer__socials a { width: 32px; height: 32px; border-radius: var(--radius-md); background: var(--color-bg-elevated); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; font-size: var(--text-sm); color: var(--color-text-muted); text-decoration: none; transition: all var(--transition-fast); }
.footer__socials a:hover { border-color: var(--color-primary); color: var(--color-primary); }
.footer__col { display: flex; flex-direction: column; gap: var(--space-3); }
.footer__col h4 { font-size: var(--text-sm); font-weight: 600; color: var(--color-text); }
.footer__col a { font-size: var(--text-sm); color: var(--color-text-muted); text-decoration: none; transition: color var(--transition-fast); }
.footer__col a:hover { color: var(--color-primary); }
.footer__bottom { max-width: var(--container-max); margin-inline: auto; display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-6); border-top: 1px solid var(--color-border); font-size: var(--text-xs); color: var(--color-text-subtle); }
.footer__bottom div { display: flex; gap: var(--space-6); }
.footer__bottom a { color: var(--color-text-subtle); text-decoration: none; }
.footer__bottom a:hover { color: var(--color-primary); }
@media (max-width: 768px) { .footer__top { grid-template-columns: 1fr; } .footer__bottom { flex-direction: column; gap: var(--space-4); text-align: center; } }

</style>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__brand">
        <div class="footer__logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#F5E642"/><path d="M7 17L12 7L17 17M9.5 13H14.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <span>Acessify</span>
        <p>Tornando a web mais acessível, uma auditoria por vez.</p>
        <div class="footer__socials">
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub">⬡</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <div class="footer__col"><h4>Produto</h4><a href="#/">Início</a><a href="#/auditorias">Auditorias</a><a href="#/nova-auditoria">Nova Auditoria</a><a href="#/aprender">Aprender</a></div>
      <div class="footer__col"><h4>Recursos</h4><a href="#">Documentação API</a><a href="#">Central de Ajuda</a><a href="#/">Sobre</a></div>
      <div class="footer__col"><h4>Contato</h4><a href="mailto:contato@acessify.com">✉ contato@acessify.com</a><a href="mailto:suporte@acessify.com">✉ suporte@acessify.com</a></div>
    </div>
    <div class="footer__bottom">
      <span>© 2025 Acessify. Todos os direitos reservados.</span>
      <div><a href="#">Termos de Uso</a><a href="#">Privacidade</a><a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener">WCAG 2.2</a></div>
    </div>
  </footer>
`;
class AppFooter extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { AppFooter };
