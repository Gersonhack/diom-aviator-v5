import { auth, database } from '/src/_config/config.db.js';

export class Profile{
  
  render(){
    const html = `
      <section class="modal" id="Profile">
      <div class="headerModal">
            <h1 class="txt">
      Perfil
      </h1>
             <span class="close" id="CloseProfile">
    <i class="fa-solid fa-xmark"></i>
      </span>
       </div>
<div id="user-info-section" class="dark-card rounded-2xl shadow-lg p-8 mb-8 card-hover border-l-4 border-blue-500">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
        <i class="fas fa-user-circle text-blue-400 mr-3"></i>
        Bem-vindo(a)!
    </h2>
    
    <div class="user-info-display space-y-4 mb-6">
        <div class="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
            <i class="fas fa-user text-blue-400 mr-3 w-5"></i>
            <div>
                <p class="text-gray-400 text-sm">Nome</p>
                <p class="text-white font-semibold" id="display-name">Carregando...</p>
            </div>
        </div>
        
        <div class="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
            <i class="fas fa-envelope text-green-400 mr-3 w-5"></i>
            <div>
                <p class="text-gray-400 text-sm">Email</p>
                <p class="text-white font-semibold" id="display-email">Carregando...</p>
            </div>
        </div>
        
        <div class="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
            <i class="fas fa-key text-purple-400 mr-3 w-5"></i>
            <div>
                <p class="text-gray-400 text-sm">Acesso</p>
                <p class="text-white font-semibold" id="display-access">Carregando...</p>
            </div>
        </div>
        
        <div class="flex items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
            <i class="fas fa-clock text-yellow-400 mr-3 w-5"></i>
            <div>
                <p class="text-gray-400 text-sm">Expira em</p>
                <p class="text-white font-semibold" id="display-expiration">Carregando...</p>
            </div>
        </div>
    </div>
    
    <button id="logout-user-btn" class="w-38 bg-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 ">
        <i class="fas fa-sign-out-alt mr-2"></i>
        Sair da Conta
    </button>
</div>

      </section>
    `;
    this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  }//Render
  
  afterRender() {
  
    $(document).ready(function() {
      
      const $OpenProfile = $('#openProfile');
      const $CloseProfile = $('#CloseProfile');
      const $Profile = $('#Profile');
      const $navModal = $('.modal-nexus');
      const ofusc = $('#blur');
      
      // Abrir modal
      $OpenProfile.on('click', function() {
        $Profile.css('display', 'flex');
        $navModal.removeClass('active');
        ofusc.css('display','flex')
        $('#robo')[0].play()
        
      });
      
      // Fechar modal
      $CloseProfile.on('click', function() {
        $Profile.css('display', 'none');
        ofusc.css('display','none')
      });
      
      // Fechar clicando fora
      ofusc.on('click', function() {
        $Profile.css('display', 'none');
        ofusc.css('display','none')
      });
      
      // Funções utilitárias
      const Utils = {
        formatDate: function(timestamp) {
          if (!timestamp) return 'N/A';
          return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        },

        calculateDaysRemaining: function(expirationDate) {
          if (!expirationDate) return 'Permanente';
          const now = new Date().getTime();
          const expiration = new Date(expirationDate).getTime();
          const diffTime = expiration - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays > 0 ? diffDays : 0;
        },

        isAccessExpired: function(expirationDate) {
          if (!expirationDate) return false;
          return new Date().getTime() > new Date(expirationDate).getTime();
        },

        validateEmail: function(email) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
        }
      };

      class UserInfoPage {
        constructor() {
          this.currentUser = null;
          this.init();
        }

        init() {
          this.bindEvents();
          this.checkAuthState();
        }

        bindEvents() {
          document.getElementById('logout-user-btn').addEventListener('click', () => {
            this.handleLogout();
          });
        }

        checkAuthState() {
          auth.onAuthStateChanged((user) => {
            if (user) {
              this.currentUser = user;
              this.loadAndDisplayUserInfo();
            } else {
              // Usuário não logado
            }
          });
        }

        async handleLogout() {
          try {
            await auth.signOut();
            console.log('Logout ✅')
            window.location.href = "#/home"
          } catch (error) {
            console.error('Erro no logout:', error);
          }
        }

        async loadAndDisplayUserInfo() {
          if (!this.currentUser) return;

          try {
            // Buscar no nó /usuarios primeiro
            const snapshotUsuarios = await database.ref('usuarios')
              .orderByChild('email')
              .equalTo(this.currentUser.email)
              .once('value');
            
            if (snapshotUsuarios.exists()) {
              const userData = Object.values(snapshotUsuarios.val())[0];
              this.displayUserInfo(userData);
              this.showUserInfoSection();
              return;
            }

            // Se não encontrou em /usuarios, buscar em /diom
            const snapshotDiom = await database.ref('diom')
              .orderByChild('email')
              .equalTo(this.currentUser.email)
              .once('value');
            
            if (snapshotDiom.exists()) {
              const userData = Object.values(snapshotDiom.val())[0];
              this.displayUserInfo(userData);
              this.showUserInfoSection();
              return;
            }

            // Se não encontrou em nenhum dos nós
            this.displayUserInfo({ 
              name: 'N/A', 
              email: this.currentUser.email, 
              hasAccess: false, 
              accessExpiration: null 
            });
            this.showUserInfoSection();
            
          } catch (error) {
            console.log('Erro ao carregar informações do usuário: ' + error.message);
          }
        }

        displayUserInfo(userData) {
          document.getElementById('display-name').textContent = userData.name || 'N/A';
          
          // Verificar se existe elemento com id 'name' antes de tentar acessar
          const nameElement = document.getElementById('name');
          if (nameElement) {
            nameElement.textContent = userData.name || 'N/A';
          }
          
          document.getElementById('display-email').textContent = userData.email;
          
          let accessStatusText = 'Sem Acesso';
          let expirationText = 'N/A';

          if (userData.hasAccess) {
            const isExpired = Utils.isAccessExpired(userData.accessExpiration);
            if (isExpired) {
              accessStatusText = 'Acesso Expirado';
              expirationText = `Expirou em: ${Utils.formatDate(userData.accessExpiration)}`;
            } else if (userData.accessExpiration === null || userData.accessPlan === 'permanent') {
              accessStatusText = 'Acesso Permanente';
              expirationText = 'Nunca expira';
            } else {
              const daysRemaining = Utils.calculateDaysRemaining(userData.accessExpiration);
              accessStatusText = `Ativo (${daysRemaining} dias restantes)`;
              expirationText = `Expira em: ${Utils.formatDate(userData.accessExpiration)}`;
            }
          }
          
          document.getElementById('display-access').textContent = accessStatusText;
          document.getElementById('display-expiration').textContent = expirationText;
        }

        showUserInfoSection() {
          document.getElementById('user-info-section').style.display = 'block';
          const noUserSection = document.getElementById('no-user-message-section');
          if (noUserSection) {
            noUserSection.style.display = 'none';
          }
        }

        showNoUserMessage() {
          document.getElementById('user-info-section').style.display = 'none';
          const noUserSection = document.getElementById('no-user-message-section');
          if (noUserSection) {
            noUserSection.style.display = 'block';
          }
        }
      }

      new UserInfoPage();

    });

  }//afterRender
  
}//class
