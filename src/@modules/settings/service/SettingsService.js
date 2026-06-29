/**
 * @modules/settings/service/SettingsService.js
 */
export const SettingsService = {
  async saveProfile(data) {
    console.log('[SettingsService] Salvando perfil:', data);
    const current = JSON.parse(sessionStorage.getItem('acessify_user') || '{}');
    sessionStorage.setItem('acessify_user', JSON.stringify({ ...current, ...data }));
    await new Promise(r => setTimeout(r, 600));
  },

  async saveNotifications(prefs) {
    console.log('[SettingsService] Salvando notificações:', prefs);
    await new Promise(r => setTimeout(r, 400));
  },

  async changePassword({ current, newPwd }) {
    console.log('[SettingsService] Atualizando senha');
    await new Promise(r => setTimeout(r, 800));
    // Integrar com API real aqui
  },
};
