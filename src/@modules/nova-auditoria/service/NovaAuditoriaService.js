export const NovaAuditoriaService = {
  async start(data) {
    console.log('[NovaAuditoriaService] Iniciando auditoria:', data);
    await new Promise(r => setTimeout(r, 1500));
    sessionStorage.setItem('current_audit', JSON.stringify({ url: data.value, score: 68 }));
  }
};
