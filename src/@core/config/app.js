/**
 * app.js — Versão 1
 * Responsável: [Participante 1]
 * Contém: @core, @templates, módulo auth
 * Próximo commit: módulo inicio (landing page)
 */

import { Router } from '../router/router.js';
import { Toast }  from './toast.js';
window.Toast = Toast;

// @templates
import { AppLayout }  from '../../@templates/layouts/app-layout/index.js';
import { AuthLayout } from '../../@templates/layouts/auth-layout/index.js';
import { AppNavbar }  from '../../@templates/components/app-navbar/index.js';
import { AppFooter }  from '../../@templates/components/app-footer/index.js';

// @modules/auth
import { LoginForm }          from '../../@modules/auth/infra/components/login-form/index.js';
import { RegisterForm }       from '../../@modules/auth/infra/components/register-form/index.js';
import { ForgotPasswordForm } from '../../@modules/auth/infra/components/forgot-password-form/index.js';
import { AuthPage }           from '../../@modules/auth/infra/pages/auth-page/index.js';

// Registro
customElements.define('app-layout',  AppLayout);
customElements.define('auth-layout', AuthLayout);
customElements.define('app-navbar',  AppNavbar);
customElements.define('app-footer',  AppFooter);

customElements.define('auth-login-form',    LoginForm);
customElements.define('auth-register-form', RegisterForm);
customElements.define('auth-forgot-form',   ForgotPasswordForm);
customElements.define('auth-page',          AuthPage);

Router.init();
console.log('[Acessify v1] ✅ Base + Auth');
