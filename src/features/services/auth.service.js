import { loginWithEmail } from '/src/features/auth/auth.js';

let loginFormInitialized = false;

export function LoginService() {
  if (loginFormInitialized) return;
  
  const initLoginForm = () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return false;
    
    console.log('Inicializando formulário de login...');
    
    // Toggle password
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const icon = togglePassword.querySelector('svg');
        if (icon) {
          icon.innerHTML = type === 'text' ?
            '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><line x1="2" y1="2" x2="22" y2="22"></line>' :
            '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
      });
    }
    
    // Form submission
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember')?.checked;
      
      if (!email || !password) {
        alert('Por favor, preencha todos os campos');
        return;
      }
      
      try {
        await loginWithEmail(email, password, remember);
      } catch (error) {
        console.error('Login error:', error);
      }
    });
    
    loginFormInitialized = true;
    return true;
  };
  
  // Tenta inicializar imediatamente (caso o form já exista)
  if (initLoginForm()) return;
  
  // Se não encontrou, configura o observer
  const observer = new MutationObserver((mutations) => {
    if (initLoginForm()) {
      observer.disconnect();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}