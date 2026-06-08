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

// @modules/inicio
import { StatsGrid }    from '../../@modules/inicio/infra/components/stats-grid/index.js';
import { FeatureCard }  from '../../@modules/inicio/infra/components/feature-card/index.js';
import { MissionBlock } from '../../@modules/inicio/infra/components/mission-block/index.js';
import { FaqAccordion } from '../../@modules/inicio/infra/components/faq-accordion/index.js';
import { InicioPage }   from '../../@modules/inicio/infra/pages/inicio-page/index.js';

// Registro
customElements.define('app-layout',  AppLayout);
customElements.define('auth-layout', AuthLayout);
customElements.define('app-navbar',  AppNavbar);
customElements.define('app-footer',  AppFooter);

customElements.define('auth-login-form',    LoginForm);
customElements.define('auth-register-form', RegisterForm);
customElements.define('auth-forgot-form',   ForgotPasswordForm);
customElements.define('auth-page',          AuthPage);

customElements.define('inicio-stats-grid',    StatsGrid);
customElements.define('inicio-feature-card',  FeatureCard);
customElements.define('inicio-mission-block', MissionBlock);
customElements.define('inicio-faq-accordion', FaqAccordion);
customElements.define('inicio-page',          InicioPage);

Router.init();
console.log('[Acessify v2] ✅ Base + Auth + Início');
