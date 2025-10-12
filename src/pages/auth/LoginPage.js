import { isUserAuth } from '/src/features/auth/auth.js';

export class LoginPage {
  constructor() {
    isUserAuth(); 
  }
  
  render() {
    return `
<div class="contentLogin">
    <div class="login-container">
        <!-- Logo -->
        <div class="logo-section">
            <img class="logo-img" src="/src/assents/imgs/Logo.jpg" alt="Diom Aviator Logo">
            <h1 class="logo-text">Diom Aviator</h1>
        </div>

        <!-- Botão tema -->


        <!-- Card de Login -->
        <div class="login-card">
            <div class="login-header">
                <h1>Entrar</h1>
                <p>Bem-vindo ao Diom Aviator 5.0.0</p>
            </div>
            
            <form id="login-form">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                
                <div class="input-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" required>
                    <button type="button" id="toggle-password" class="toggle-password">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                
                <div class="options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember">
                        <label for="remember">Mantenha-me com sessão iniciada</label>
                    </div>
                </div>
                
                <button type="submit" class="login-button">Entrar</button>
            </form>
            
            <div class="signup-link">
                <p>Não tem uma conta? <a href="#/pricing">Cadastre-se</a></p>
            </div>
        </div>
    </div>
</div>

<style>

</style>
    `;
  }
}