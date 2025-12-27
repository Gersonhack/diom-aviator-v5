import { auth } from '/src/_config/config.db.js';
import { Router } from '/src/_config/AppRoutes.js';

// const router = new Router();

export function isUserAuth() {
  // Configura persistência padrão
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      // console.warn("Persistência LOCAL");
      
      // state auth
      auth.onAuthStateChanged((user) => {
        if (user) {
          showSuccess("Você já está logado! Redirecionando...");
          setTimeout(() => {
            window.location.href = "#/console"
          }, 1000);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao configurar persistência:", error);
    });
}

// Função melhorada para login com email e senha
export async function loginWithEmail(email, password, remember) {
  const loginButton = document.querySelector(".login-button");
  if (!loginButton) {
    console.error("Button de login não encontrado");
    return;
  }
  
  const originalHTML = loginButton.innerHTML;
  const originalText = loginButton.textContent;
  
  // Adiciona spinner e muda texto
  loginButton.innerHTML = `
    <div class="login-spinner"></div>
    <span>Entrando...</span>
  `;
  loginButton.disabled = true;
  
  try {
    // Validação básica dos campos
    if (!email || !password) {
      showError("Por favor, preencha todos os campos.");
      return;
    }
    
    const persistence = remember ?
      firebase.auth.Auth.Persistence.LOCAL :
      firebase.auth.Auth.Persistence.SESSION;
    
    await auth.setPersistence(persistence);
    
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    // console.log("User logged in:", userCredential.user.email);
    
    showSuccess("Login realizado com sucesso!");
    //setTimeout(() => {
    window.location.href = "#/console";
    // }, 9000);
    
  } catch (error) {
    console.error("Login error:", error);
    handleLoginError(error);
  } finally {
    if (loginButton) {
      loginButton.innerHTML = originalHTML;
      loginButton.disabled = false;
    }
  }
}

// Tratamento centralizado de erros de login
function handleLoginError(error) {
  const errorMap = {
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/invalid-email": "Email inválido.",
    "auth/user-disabled": "Esta conta foi desativada.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "default": "Erro ao fazer login. Tente novamente."
  };
  
  const errorMessage = errorMap[error.code] || errorMap.default;
  showError(errorMessage);
}

// Funções auxiliares melhoradas
function showError(message) {
  if (!message) return;
  
  // Remove mensagens de erro existentes
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
  
  // Cria nova mensagem de erro
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  Object.assign(errorDiv.style, {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "15px"
  });
  
  // Insere no DOM
  const passwordGroup = document.querySelector(".input-group:nth-child(2)");
  if (passwordGroup) {
    passwordGroup.insertAdjacentElement("afterend", errorDiv);
  }
  
  // Animação de shake
  const loginCard = document.querySelector(".login-card");
  if (loginCard) {
    loginCard.style.animation = "shake 0.5s";
    setTimeout(() => {
      loginCard.style.animation = "";
    }, 500);
  }
}

function showSuccess(message) {
  const loginButton = document.querySelector(".login-button");
  if (!loginButton || !message) return;
  
  const originalHTML = loginButton.innerHTML;
  loginButton.innerHTML = `
    <div class="success-icon">✓</div>
    <span>${message}</span>
  `;
  loginButton.style.backgroundColor = "#10b981";
  
  setTimeout(() => {
    if (loginButton) {
      loginButton.innerHTML = originalHTML;
      loginButton.style.backgroundColor = "";
    }
  }, 2000);
}

// Adiciona animação shake e estilos do spinner apenas uma vez
if (!document.querySelector('style[data-login-styles]')) {
  const style = document.createElement("style");
  style.setAttribute('data-login-styles', 'true');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .login-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: login-spin 1s linear infinite;
      margin-right: 8px;
    }
    
    .success-icon {
      width: 16px;
      height: 16px;
      background: #ffffff;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      font-size: 12px;
      font-weight: bold;
    }
    
    @keyframes login-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .login-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `;
  document.head.appendChild(style);
}

export async function logoutUser() {
  try {
    await auth.signOut();
    console.log("Usuário deslogado com sucesso");
    
    // Dispara evento para notificar o sistema
    window.dispatchEvent(new CustomEvent('auth-state-changed'));
    
    // Redireciona para login
    window.location.hash = '/login';
    
    return true;
  } catch (error) {
    console.error("Erro ao deslogar:", error);
    throw error;
  }
}