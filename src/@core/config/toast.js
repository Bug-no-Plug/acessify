/**
 * @core/config/toast.js
 * Sistema de toast/notificação global leve
 */

class ToastManager {
  constructor() {
    this._container = null;
    this._init();
  }

  _init() {
    const style = document.createElement('style');
    style.textContent = `
      .toast-container {
        position: fixed; bottom: 24px; right: 24px;
        display: flex; flex-direction: column; gap: 8px;
        z-index: 9999; pointer-events: none;
      }
      .toast {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 12px 18px; border-radius: 12px;
        font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
        color: #fff; pointer-events: auto; cursor: pointer;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        animation: toastIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
        max-width: 320px;
      }
      .toast--success { background: #1a2e1a; border: 1px solid rgba(34,197,94,0.4); color: #22c55e; }
      .toast--error   { background: #2e1a1a; border: 1px solid rgba(255,68,68,0.4);  color: #ff6060; }
      .toast--info    { background: #1a1e2e; border: 1px solid rgba(245,230,66,0.3); color: #f5e642; }
      .toast--out { animation: toastOut 0.25s ease forwards; }
      @keyframes toastIn  { from { opacity:0; transform:translateX(80px) scale(0.9); } to { opacity:1; transform:translateX(0) scale(1); } }
      @keyframes toastOut { from { opacity:1; transform:translateX(0) scale(1); }     to { opacity:0; transform:translateX(80px) scale(0.9); } }
    `;
    document.head.appendChild(style);

    this._container = document.createElement('div');
    this._container.className = 'toast-container';
    document.body.appendChild(this._container);
  }

  show(message, type = 'info', duration = 3000) {
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    this._container.appendChild(toast);

    toast.addEventListener('click', () => this._dismiss(toast));
    setTimeout(() => this._dismiss(toast), duration);
  }

  _dismiss(toast) {
    toast.classList.add('toast--out');
    setTimeout(() => toast.remove(), 240);
  }
}

export const Toast = new ToastManager();
