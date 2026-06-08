const template = document.createElement('template');
template.innerHTML = `
  <style>
:host { display: block; }
.empty { display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--space-20) var(--space-6); gap: var(--space-4); }
.empty__icon { width: 80px; height: 80px; background: var(--color-bg-elevated); border-radius: var(--radius-2xl); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); }
h3 { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
p  { font-size: var(--text-sm); color: var(--color-text-muted); max-width: 340px; line-height: 1.6; }
.empty__btn { padding: var(--space-3) var(--space-6); background: var(--color-primary); color: #000; font-weight: 700; border-radius: var(--radius-full); font-size: var(--text-sm); text-decoration: none; margin-top: var(--space-2); }
.empty__btn:hover { background: var(--color-primary-hover); }

</style>
  <div class="empty">
    <div class="empty__icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="15" r="1" fill="currentColor"/><path d="M12 11v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <h3>Você ainda não possui auditorias</h3>
    <p>Crie sua primeira auditoria de acessibilidade para começar a monitorar e melhorar a experiência dos seus usuários.</p>
    <a href="#/nova-auditoria" class="empty__btn">Criar auditoria</a>
  </div>
`;
class AuditEmptyState extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.shadowRoot.appendChild(template.content.cloneNode(true)); }
}
export { AuditEmptyState };
