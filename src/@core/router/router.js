/**
 * router.js — Versão 1
 * Rotas disponíveis: login, register, forgot-password
 * Rotas pendentes: /, /nova-auditoria, /auditorias, /auditoria, /aprender, /settings
 */

const DEV_MODE = true;
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];

const routes = {
  '/login'           : '<auth-page view="login"></auth-page>',
  '/register'        : '<auth-page view="register"></auth-page>',
  '/forgot-password' : '<auth-page view="forgot"></auth-page>',
};

// Página de "em desenvolvimento" para rotas ainda não implementadas
const WIP_PAGE = `
  <div style="
    min-height:100vh; display:flex; flex-direction:column; align-items:center;
    justify-content:center; gap:1rem; font-family:'Inter',sans-serif;
    background:#0d0d0d; color:#fff; text-align:center; padding:2rem;
  ">
    <div style="font-size:3rem">🚧</div>
    <h2 style="font-size:1.25rem; font-weight:700">Em desenvolvimento</h2>
    <p style="color:#a0a0a0; max-width:360px; line-height:1.6; font-size:0.875rem">
      Esta página será implementada nos próximos commits.
      Acesse <a href="#/login" style="color:#f5e642">Login</a> para ver o que está pronto.
    </p>
  </div>
`;

function isLoggedIn() {
  if (DEV_MODE) return true;
  return sessionStorage.getItem('acessify_user') !== null;
}

const style = document.createElement('style');
style.textContent = `@keyframes fadeOut { to { opacity:0; transform:translateY(-8px); } }`;
document.head.appendChild(style);

let isFirstRender = true;

function render() {
  const hash     = window.location.hash.replace('#', '') || '/login';
  const app      = document.getElementById('app');
  const isPublic = PUBLIC_ROUTES.includes(hash);

  if (!isPublic && !isLoggedIn()) { window.location.hash = '#/login'; return; }

  const pageTag  = routes[hash];

  function inject() {
    if (pageTag) {
      app.innerHTML = `<auth-layout>${pageTag}</auth-layout>`;
    } else {
      app.innerHTML = WIP_PAGE;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!isFirstRender && app.firstElementChild) {
    app.firstElementChild.style.animation = 'fadeOut 0.18s ease forwards';
    setTimeout(inject, 160);
  } else {
    inject();
    isFirstRender = false;
  }
}

export const Router = {
  init() { render(); window.addEventListener('hashchange', render); },
  navigate(path) { window.location.hash = `#${path}`; },
};
