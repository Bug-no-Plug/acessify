export const AuditoriasService = {
  async getAll() {
    return [
      { url: 'https://example.com',      date: '30 de maio de 2025', critical: 3, serious: 2, moderate: 2 },
      { url: 'https://mystore.com',      date: '28 de maio de 2025', critical: 2, serious: 1, moderate: 4 },
      { url: 'https://blog.example.com', date: '20 de maio de 2025', critical: 4, serious: 3, moderate: 1 },
    ];
  }
};
