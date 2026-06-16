import { Router } from '../router/router.js';
import { Toast }  from './toast.js';
window.Toast = Toast;

// @templates
import { AppLayout }  from '../../@templates/layouts/app-layout/index.js';
import { AuthLayout } from '../../@templates/layouts/auth-layout/index.js';
import { AppNavbar }  from '../../@templates/components/app-navbar/index.js';
import { AppFooter }  from '../../@templates/components/app-footer/index.js';

// auth
import { LoginForm }          from '../../@modules/auth/infra/components/login-form/index.js';
import { RegisterForm }       from '../../@modules/auth/infra/components/register-form/index.js';
import { ForgotPasswordForm } from '../../@modules/auth/infra/components/forgot-password-form/index.js';
import { AuthPage }           from '../../@modules/auth/infra/pages/auth-page/index.js';

// inicio
import { StatsGrid }    from '../../@modules/inicio/infra/components/stats-grid/index.js';
import { FeatureCard }  from '../../@modules/inicio/infra/components/feature-card/index.js';
import { MissionBlock } from '../../@modules/inicio/infra/components/mission-block/index.js';
import { FaqAccordion } from '../../@modules/inicio/infra/components/faq-accordion/index.js';
import { InicioPage }   from '../../@modules/inicio/infra/pages/inicio-page/index.js';

// nova-auditoria
import { AuditTabs }         from '../../@modules/nova-auditoria/infra/components/audit-tabs/index.js';
import { UrlForm }           from '../../@modules/nova-auditoria/infra/components/url-form/index.js';
import { FileUpload }        from '../../@modules/nova-auditoria/infra/components/file-upload/index.js';
import { FeatureCardMini }   from '../../@modules/nova-auditoria/infra/components/feature-card-mini/index.js';
import { NovaAuditoriaPage } from '../../@modules/nova-auditoria/infra/pages/nova-auditoria-page/index.js';

// auditorias
import { StatsSummary }    from '../../@modules/auditorias/infra/components/stats-summary/index.js';
import { AuditListItem }   from '../../@modules/auditorias/infra/components/audit-list-item/index.js';
import { AuditEmptyState } from '../../@modules/auditorias/infra/components/audit-empty-state/index.js';
import { SearchBar }       from '../../@modules/auditorias/infra/components/search-bar/index.js';
import { AuditoriasPage }  from '../../@modules/auditorias/infra/pages/auditorias-page/index.js';

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

customElements.define('audit-tabs',          AuditTabs);
customElements.define('audit-url-form',      UrlForm);
customElements.define('audit-file-upload',   FileUpload);
customElements.define('audit-feature-mini',  FeatureCardMini);
customElements.define('nova-auditoria-page', NovaAuditoriaPage);

customElements.define('auditorias-stats',     StatsSummary);
customElements.define('auditorias-list-item', AuditListItem);
customElements.define('auditorias-empty',     AuditEmptyState);
customElements.define('auditorias-search',    SearchBar);
customElements.define('auditorias-page',      AuditoriasPage);

Router.init();
// settings
import { SettingsSidebar }       from '../../@modules/settings/infra/components/settings-sidebar/index.js';
import { SettingsProfile }       from '../../@modules/settings/infra/components/settings-profile/index.js';
import { SettingsNotifications } from '../../@modules/settings/infra/components/settings-notifications/index.js';
import { SettingsSecurity }      from '../../@modules/settings/infra/components/settings-security/index.js';
import { SettingsAppearance }    from '../../@modules/settings/infra/components/settings-appearance/index.js';
import { ToggleSwitch }          from '../../@modules/settings/infra/components/toggle-switch/index.js';
import { SettingsPage }          from '../../@modules/settings/infra/pages/settings-page/index.js';

customElements.define('settings-sidebar',       SettingsSidebar);
customElements.define('settings-profile',       SettingsProfile);
customElements.define('settings-notifications', SettingsNotifications);
customElements.define('settings-security',      SettingsSecurity);
customElements.define('settings-appearance',    SettingsAppearance);
customElements.define('toggle-switch',          ToggleSwitch);
customElements.define('settings-page',          SettingsPage);
