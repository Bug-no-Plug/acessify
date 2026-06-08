/**
 * @modules/auth/service/AuthService.js
 */
export const AuthService = {
  /**
   * Login mock — substitua pelo fetch real.
   */
  async login({ email, password }) {
    await new Promise(r => setTimeout(r, 800));
    // Mock: aceita qualquer e-mail com senha >= 6 caracteres
    if (!email || password.length < 6) throw new Error('Credenciais inválidas');
    const name = email.split('@')[0];
    return { name, email };
  },

  /**
   * Cadastro mock.
   */
  async register({ name, email, password }) {
    await new Promise(r => setTimeout(r, 1000));
    if (!name || !email || password.length < 8) throw new Error('Dados inválidos');
    return { name, email };
  },

  /**
   * Recuperação de senha mock.
   */
  async forgotPassword(email) {
    await new Promise(r => setTimeout(r, 700));
    console.log('[AuthService] E-mail de recuperação enviado para:', email);
  },
};
