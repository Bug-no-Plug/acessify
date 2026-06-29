/**
 * @core/router/router.js
 * Roteador hash-based com transições de página animadas.
 * DEV_MODE = true → sem guard de autenticação
 */

const DEV_MODE = true;

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];

const routes = {
  '/'                : '<inicio-page></inicio-page>',
  '/nova-auditoria'  : '<nova-auditoria-page></nova-auditoria-page>',
  '/auditorias'      : '<auditorias-page></auditorias-page>',
  '/auditoria'       : '<auditoria-page></auditoria-page>',
  '/aprender'        : '<aprender-page></aprender-page>',
  '/settings'        : '<settings-page></settings-page>',
  '/login'           : '<auth-page view="login"></auth-page>',
  '/register'        : '<auth-page view="register"></auth-page>',
  '/forgot-password' : '<auth-page view="forgot"></auth-page>',
};

function isLoggedIn() {
  if (DEV_MODE) return true;
  return sessionStorage.getItem('acessify_user') !== null;
}

let isFirstRender = true;

function render() {
  const hash     = window.location.hash.replace('#', '') || '/';
  const app      = document.getElementById('app');
  const isPublic = PUBLIC_ROUTES.includes(hash);

  if (!isPublic && !isLoggedIn()) {
    window.location.hash = '#/login';
    return;
  }

  const pageTag = routes[hash] ?? routes['/'];

  // Animação de saída antes de trocar o conteúdo
  if (!isFirstRender && app.firstElementChild) {
    app.firstElementChild.style.animation = 'fadeOut 0.18s ease forwards';
    setTimeout(() => inject(app, pageTag, isPublic), 160);
  } else {
    inject(app, pageTag, isPublic);
    isFirstRender = false;
  }

  // Scroll para o topo a cada navegação
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function inject(app, pageTag, isPublic) {
  if (isPublic) {
    app.innerHTML = `<auth-layout>${pageTag}</auth-layout>`;
  } else {
    app.innerHTML = `<app-layout>${pageTag}</app-layout>`;
  }
}

// Adiciona fadeOut globalmente
const style = document.createElement('style');
style.textContent = `@keyframes fadeOut { to { opacity: 0; transform: translateY(-8px); } }`;
document.head.appendChild(style);

export const Router = {
  init() {
    render();
    window.addEventListener('hashchange', render);
  },
  navigate(path) {
    window.location.hash = `#${path}`;
  },
};
