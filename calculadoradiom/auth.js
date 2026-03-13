
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
const db = firebase.database();
const usersRef = db.ref('users');

// Elementos DOM
const overlay = document.getElementById('authOverlay');
const loginBtn = document.getElementById('loginButton');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');
const authError = document.getElementById('authError');
const logoutBtn = document.getElementById('logoutBtn');

// Função para mostrar/esconder o conteúdo principal (calculadora)
function toggleContent(show) {
  if (show) {
    overlay.classList.remove('active');
  } else {
    overlay.classList.add('active');
  }
}

// Função de logout
function logout() {
  auth.signOut().then(() => {
    localStorage.removeItem('loggedUser');
    toggleContent(false);
  });
}

// Monitora estado de autenticação
auth.onAuthStateChanged(user => {
  if (user) {
    // Usuário logado no Firebase Auth -> verificar se está no nó 'users'
    usersRef.orderByChild('email').equalTo(user.email).once('value', snapshot => {
      if (snapshot.exists()) {
        // Autorizado
        toggleContent(true);
        logoutBtn.style.display = 'block';
        localStorage.setItem('loggedUser', user.email);
      } else {
        // Não autorizado: desloga e mostra mensagem
        authError.style.display = 'block';
        authError.textContent = 'Acesso negado: usuário não autorizado.';
        auth.signOut(); // força logout
        toggleContent(false);
        logoutBtn.style.display = 'none';
      }
    }).catch(err => {
      console.error('Erro ao verificar usuário:', err);
      auth.signOut();
      toggleContent(false);
    });
  } else {
    // Não logado
    toggleContent(false);
    logoutBtn.style.display = 'none';
  }
});

// Evento de login
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  authError.style.display = 'none'; // limpa erro anterior
  
  if (!email || !password) {
    authError.style.display = 'block';
    authError.textContent = 'Preencha todos os campos';
    return;
  }
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Sucesso: onAuthStateChanged cuidará da verificação
      emailInput.value = '';
      passwordInput.value = '';
    })
    .catch(error => {
      authError.style.display = 'block';
      authError.textContent = error.message;
    });
});

// Logout
logoutBtn.addEventListener('click', logout);

// Login com Enter
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    loginBtn.click();
  }
});