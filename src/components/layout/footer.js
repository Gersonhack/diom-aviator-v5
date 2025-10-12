
import { logoutUser } from '/src/features/auth/auth.js';

export class Logout {
  constructor() {
    this.setupLogout();
  }
  
  setupLogout() {
    // Usa event delegation para garantir funcionamento mesmo após re-render
    document.addEventListener('click', async (e) => {
      if (e.target.id === 'logout') {
        e.preventDefault();
        await this.handleLogout();
      }
    });
  }
  
  async handleLogout() {
    const logoutButton = document.getElementById('logout');
    if (!logoutButton) return;
    
    // Feedback visual
    const originalText = logoutButton.textContent;
    logoutButton.textContent = 'Saindo...';
    logoutButton.disabled = true;
    
    try {
      await logoutUser();
      // O redirecionamento é tratado pela função logoutUser
    } catch (error) {
      console.error('Erro no logout:', error);
      // Restaura o botão
      if (logoutButton) {
        logoutButton.textContent = originalText;
        logoutButton.disabled = false;
      }
      alert('Ocorreu um erro ao tentar sair. Tente novamente.');
    }
  }
  
  render() {
  
    return `
      ${header.render()}
      
        <button id="logout" class="logout-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sair
        </button>
      
    `;
  }
}