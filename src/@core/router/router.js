const DEV_MODE = true;
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];

const routes = {
  '/'                : '<inicio-page></inicio-page>',
  '/login'           : '<auth-page view="login"></auth-page>',
  '/register'        : '<auth-page view="register"></auth-page>',
  '/forgot-password' : '<auth-page view="forgot"></auth-page>',
};

const WIP_PAGE = `
  <div style="
    min-height:80vh; display:flex; flex-direction:column; align-items:center;
    justify-content:center; gap:1rem; font-family:'Inter',sans-serif;
    color:#fff; text-align:center; padding:2rem;
  ">
    <div style="font-size:3rem">🚧</div>
    <h2 style="font-size:1.25rem; font-weight:700">Em desenvolvimento</h2>
    <p style="color:#a0a0a0; max-width:360px; line-height:1.6; font-size:0.875rem">
      Esta seção será implementada em breve.
    </p>
    <a href="#/" style="color:#f5e642; font-size:0.875rem">← Voltar ao início</a>
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
  const hash     = window.location.hash.replace('#', '') || '/';
  const app      = document.getElementById('app');
  const isPublic = PUBLIC_ROUTES.includes(hash);

  if (!isPublic && !isLoggedIn()) { window.location.hash = '#/login'; return; }

  const pageTag = routes[hash];

  function inject() {
    if (pageTag) {
      if (isPublic) {
        app.innerHTML = `<auth-layout>${pageTag}</auth-layout>`;
      } else {
        app.innerHTML = `<app-layout>${pageTag}</app-layout>`;
      }
    } else {
      app.innerHTML = `<app-layout>${WIP_PAGE}</app-layout>`;
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
