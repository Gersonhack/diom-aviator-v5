  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB5v0e77dvzHINhHzCKeMs6QPjqo7Z7img",
    authDomain: "login-database-black.firebaseapp.com",
    projectId: "login-database-black",
    storageBucket: "login-database-black.appspot.com",
    messagingSenderId: "768021690283",
    appId: "1:768021690283:web:221e866026541faffa04ee",
    databaseURL: "https://login-database-black-default-rtdb.firebaseio.com/"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Elementos
  const overlay = document.getElementById('authOverlay');
  const loginBtn = document.getElementById('loginButton');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const authError = document.getElementById('authError');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Função para mostrar/esconder o conteúdo principal (sua calculadora)
  function toggleContent(show) {
    // Aqui você seleciona o container principal da calculadora
    // Exemplo: document.querySelector('.analysis-card').style.display = show ? 'block' : 'none';
    // Ou pode ocultar o overlay de login apenas.
    if (show) {
      overlay.classList.remove('active');
    } else {
      overlay.classList.add('active');
    }
  }
  
  // Verifica estado de autenticação
  auth.onAuthStateChanged(user => {
    if (user) {
      // Usuário logado: esconde modal, mostra logout
      overlay.classList.remove('active');
      logoutBtn.style.display = 'block';
      // Aqui você pode chamar uma função para liberar a calculadora
      // Exemplo: enableCalculator();
    } else {
      // Não logado: mostra modal, esconde logout
      overlay.classList.add('active');
      logoutBtn.style.display = 'none';
      // Desabilita calculadora se necessário
    }
  });
  
  // Login com email/senha
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
      authError.style.display = 'block';
      authError.textContent = 'Preencha todos os campos';
      return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Sucesso: limpa campos e erros
        emailInput.value = '';
        passwordInput.value = '';
        authError.style.display = 'none';
      })
      .catch(error => {
        authError.style.display = 'block';
        authError.textContent = error.message;
      });
  });
  
  // Logout
  logoutBtn.addEventListener('click', () => {
    auth.signOut();
  });
  
  // Opcional: Permitir login com Enter
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginBtn.click();
    }
  });