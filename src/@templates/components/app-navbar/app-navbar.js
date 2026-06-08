const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }

    .navbar {
      display: flex; align-items: center; gap: var(--space-4);
      height: var(--navbar-height); padding: 0 var(--space-6);
      background: rgba(26, 26, 26, 0.85);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--color-border);
      position: relative;
      animation: navbarSlideDown 0.5s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes navbarSlideDown {
      from { opacity: 0; transform: translateY(-100%); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Brand */
    .navbar__brand { display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; text-decoration: none; }
    .navbar__logo  { width: 28px; height: 28px; transition: transform 0.3s ease; }
    .navbar__brand:hover .navbar__logo { transform: rotate(-8deg) scale(1.1); }
    .navbar__name  { font-weight: 700; font-size: var(--text-base); color: var(--color-text); }

    /* Links */
    .navbar__links { display: flex; align-items: center; gap: var(--space-1); list-style: none; }
    .navbar__links a {
      display: flex; align-items: center; gap: var(--space-1);
      padding: var(--space-2) var(--space-3); border-radius: var(--radius-full);
      font-size: var(--text-sm); font-weight: 500; color: var(--color-text-muted);
      transition: all 0.2s ease; text-decoration: none; white-space: nowrap;
      position: relative;
    }
    .navbar__links a::after {
      content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%;
      height: 2px; background: var(--color-primary); border-radius: 2px;
      transition: left 0.2s ease, right 0.2s ease;
    }
    .navbar__links a:hover { color: var(--color-text); background: rgba(255,255,255,0.06); }
    .navbar__links a.active { background: var(--color-primary); color: #000; font-weight: 600; }
    .navbar__links a.active::after { display: none; }

    /* Search */
    .navbar__actions { display: flex; align-items: center; gap: var(--space-3); margin-left: auto; position: relative; }
    .navbar__search-btn {
      display: flex; align-items: center; gap: var(--space-2);
      padding: var(--space-2) var(--space-3); border-radius: var(--radius-lg);
      background: var(--color-bg-elevated); border: 1px solid var(--color-border);
      color: var(--color-text-muted); font-size: var(--text-sm); cursor: pointer;
      transition: all 0.2s ease;
    }
    .navbar__search-btn:hover { border-color: var(--color-primary); color: var(--color-text); transform: translateY(-1px); }
    kbd { font-size: var(--text-xs); opacity: 0.5; font-family: var(--font-mono); }

    /* Avatar */
    .navbar__avatar {
      display: flex; align-items: center; gap: var(--space-2);
      padding: var(--space-1) var(--space-3) var(--space-1) var(--space-1);
      border-radius: var(--radius-full); background: var(--color-bg-elevated);
      border: 1px solid var(--color-border); cursor: pointer;
      transition: all 0.2s ease;
    }
    .navbar__avatar:hover { border-color: var(--color-primary); transform: translateY(-1px); }
    .navbar__avatar-initial {
      width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary);
      color: #000; font-weight: 700; font-size: var(--text-sm);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s ease;
    }
    .navbar__avatar:hover .navbar__avatar-initial { transform: scale(1.1); }
    .navbar__avatar-name { font-size: var(--text-sm); font-weight: 500; color: var(--color-text); }

    /* Dropdown */
    .navbar__dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      background: var(--color-bg-overlay); border: 1px solid var(--color-border);
      border-radius: var(--radius-xl); padding: var(--space-2);
      min-width: 220px; box-shadow: 0 16px 48px rgba(0,0,0,0.5);
      animation: dropdownOpen 0.2s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes dropdownOpen {
      from { opacity: 0; transform: translateY(-8px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .navbar__dropdown-header { padding: var(--space-3); }
    .navbar__dropdown-header span { display: block; }
    .navbar__dropdown-header span:first-child { font-weight: 600; font-size: var(--text-sm); color: var(--color-text); }
    .navbar__dropdown-header span:last-child  { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }
    .navbar__dropdown-divider { height: 1px; background: var(--color-border); margin: var(--space-2) 0; }
    .navbar__dropdown-item {
      display: flex; align-items: center; gap: var(--space-2);
      width: 100%; padding: var(--space-2) var(--space-3); border-radius: var(--radius-md);
      font-size: var(--text-sm); color: var(--color-text-muted); cursor: pointer;
      text-decoration: none; transition: all 0.15s ease;
      border: none; background: none; font-family: inherit;
    }
    .navbar__dropdown-item:hover { background: var(--color-bg-elevated); color: var(--color-text); }
    .navbar__dropdown-item--danger:hover { color: var(--color-critical); }

    /* Hamburger */
    .navbar__hamburger {
      display: none; flex-direction: column; justify-content: space-between;
      width: 22px; height: 16px; background: none; border: none;
      cursor: pointer; padding: 0; margin-left: auto;
    }
    .navbar__hamburger span {
      display: block; width: 100%; height: 2px;
      background: var(--color-text); border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .navbar__hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .navbar__hamburger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .navbar__hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* Mobile */
    @media (max-width: 768px) {
      .navbar__hamburger { display: flex; }
      .navbar__links {
        display: none; flex-direction: column; align-items: stretch;
        position: absolute; top: var(--navbar-height); left: 0; right: 0;
        background: rgba(26,26,26,0.97); backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--color-border);
        padding: var(--space-4); gap: var(--space-1);
      }
      .navbar__links--open {
        display: flex;
        animation: mobileMenuOpen 0.25s cubic-bezier(0.16,1,0.3,1) both;
      }
      @keyframes mobileMenuOpen {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .navbar__links a { border-radius: var(--radius-md); padding: var(--space-3); }
      .navbar__search-btn span, .navbar__search-btn kbd { display: none; }
      .navbar__avatar-name { display: none; }
    }
  </style>

  <nav class="navbar">
    <a href="#/" class="navbar__brand">
      <div class="navbar__logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F5E642"/>
          <path d="M7 17L12 7L17 17M9.5 13H14.5" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="navbar__name">Acessify</span>
    </a>

    <ul class="navbar__links" id="nav-links">
      <li><a href="#/"               data-route="/">⌂ Início</a></li>
      <li><a href="#/nova-auditoria" data-route="/nova-auditoria" class="navbar__link--new">+ Criar Auditoria</a></li>
      <li><a href="#/auditorias"     data-route="/auditorias">⊞ Auditorias</a></li>
      <li><a href="#/aprender"       data-route="/aprender">📖 Aprender</a></li>
    </ul>

    <div class="navbar__actions">
      <button class="navbar__search-btn" id="search-btn" aria-label="Buscar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
          <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Buscar...</span>
        <kbd>⌘K</kbd>
      </button>

      <button class="navbar__avatar" id="avatar-btn" aria-label="Menu do usuário" aria-haspopup="true" aria-expanded="false">
        <span class="navbar__avatar-initial" id="avatar-initial">N</span>
        <span class="navbar__avatar-name" id="avatar-name">nome</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="navbar__dropdown" id="user-dropdown" hidden>
        <div class="navbar__dropdown-header">
          <span id="dropdown-name">nome</span>
          <span id="dropdown-email">email@exemplo.com</span>
        </div>
        <div class="navbar__dropdown-divider"></div>
        <a href="#/settings" class="navbar__dropdown-item">⚙ Configurações</a>
        <a href="#/auditorias" class="navbar__dropdown-item">⊞ Minhas Auditorias</a>
        <div class="navbar__dropdown-divider"></div>
        <button class="navbar__dropdown-item navbar__dropdown-item--danger" id="logout-btn">↩ Sair</button>
      </div>
    </div>

    <button class="navbar__hamburger" id="hamburger-btn" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
`;

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._avatarBtn  = this.shadowRoot.getElementById('avatar-btn');
    this._dropdown   = this.shadowRoot.getElementById('user-dropdown');
    this._hamburger  = this.shadowRoot.getElementById('hamburger-btn');
    this._navLinks   = this.shadowRoot.getElementById('nav-links');
    this._logoutBtn  = this.shadowRoot.getElementById('logout-btn');

    this._avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !this._dropdown.hidden;
      this._dropdown.hidden = isOpen;
      this._avatarBtn.setAttribute('aria-expanded', !isOpen);
    });

    this._hamburger.addEventListener('click', () => {
      const isOpen = this._navLinks.classList.toggle('navbar__links--open');
      this._hamburger.classList.toggle('navbar__hamburger--open', isOpen);
      this._hamburger.setAttribute('aria-expanded', isOpen);
    });

    this._logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('acessify_user');
      window.location.hash = '#/login';
    });

    this.shadowRoot.getElementById('search-btn').addEventListener('click', () => {
      window.location.hash = '#/auditorias';
    });

    window.addEventListener('hashchange', () => {
      this._highlightActive();
      this._dropdown.hidden = true;
      this._navLinks.classList.remove('navbar__links--open');
      this._hamburger.classList.remove('navbar__hamburger--open');
    });

    document.addEventListener('click', (e) => {
      if (!this.shadowRoot.contains(e.target)) this._dropdown.hidden = true;
    });

    this._highlightActive();
    this._loadUser();
  }

  _highlightActive() {
    const hash = window.location.hash.replace('#', '') || '/';
    this.shadowRoot.querySelectorAll('.navbar__links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-route') === hash);
    });
  }

  _loadUser() {
    const user = JSON.parse(sessionStorage.getItem('acessify_user') || '{"name":"nome","email":""}');
    const initial = (user.name || 'N')[0].toUpperCase();
    this.shadowRoot.getElementById('avatar-initial').textContent  = initial;
    this.shadowRoot.getElementById('avatar-name').textContent     = user.name || 'nome';
    this.shadowRoot.getElementById('dropdown-name').textContent   = user.name || 'nome';
    this.shadowRoot.getElementById('dropdown-email').textContent  = user.email || '';
  }
}

export { AppNavbar };
