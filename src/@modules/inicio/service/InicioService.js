export const InicioService = {
  async getStats() {
    return [
      { icon: '◎', value: '100+', label: 'Critérios WCAG' },
      { icon: '⊙', value: '50+',  label: 'Tipos de Problemas' },
      { icon: '◈', value: '4',    label: 'Níveis de Severidade' },
      { icon: '⊕', value: '24/7', label: 'Disponibilidade' },
    ];
  },
};
