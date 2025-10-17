import { auth, database} from '/src/_config/config.db.js'

// Funções utilitárias 
const Utils = {
    // Calcular dias restantes
    calculateDaysRemaining: function(expirationDate) {
        if (!expirationDate) return 'Permanente';
        
        const now = new Date().getTime();
        const expiration = new Date(expirationDate).getTime();
        const diffTime = expiration - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    },

    // Formatar data
    formatDate: function(timestamp) {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }
};

export class AccessVerification {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Verificar estado de autenticação do Firebase
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.currentUser = user;
                this.verifyUserAccess();
            } else {
              //  console.log('Usuário não autenticado');
            }
        });
    }

    // Verificar acesso do usuário em ambos os nós
    async verifyUserAccess() {
    if (!this.currentUser) {
       // this.forceLogout();
        return;
    }
    
    try {
        // Buscar dados do usuário no nó /usuarios
        const snapshotUsuarios = await database.ref("usuarios")
            .orderByChild("email")
            .equalTo(this.currentUser.email)
            .once("value");
        
        if (snapshotUsuarios.exists()) {
            const userData = Object.values(snapshotUsuarios.val())[0];
            this.checkAccessStatus(userData);
            return;
        }
        
        // Se não encontrou em /usuarios, buscar em /diom
        const snapshotDiom = await database.ref("diom")
            .orderByChild("email")
            .equalTo(this.currentUser.email)
            .once("value");
        
        if (snapshotDiom.exists()) {
            const userData = Object.values(snapshotDiom.val())[0];
            this.checkAccessStatus(userData);
            return;
        }
        
        // Se não encontrou em nenhum dos nós - FORÇA LOGOUT
        //this.forceLogout();
        
    } catch (error) {
        console.error("Erro ao verificar acesso:", error);
       // this.forceLogout();
    }
}

// Função simples para forçar logout
//async forceLogout() {
   // try {
        //await auth.signOut();
      //  window.location.href = '#/login';
    //} catch (error) {
        // Mesmo com erro, redireciona
       // window.location.href = '#/login';
   // }
//}

    // Verificar status do acesso
    checkAccessStatus(userData) {
        const now = new Date().getTime();
        const hasAccess = userData.hasAccess;
        const accessExpiration = userData.accessExpiration;

        if (!hasAccess) {
            this.showAccessDenied("Você não possui acesso premium. Entre em contato com o administrador para adquirir acesso.");
            return;
        }

        if (accessExpiration) {
            const expirationTime = new Date(accessExpiration).getTime();
            
            if (now > expirationTime) {
                // Acesso expirado
                this.showAccessExpired(userData);
                return;
            } else {
                // Acesso válido
                this.showAccessValid(userData);
                return;
            }
        }

        // Se chegou aqui, tem acesso mas sem data de expiração (acesso permanente)
        this.showAccessValid(userData);
    }

    // Mostrar acesso válido
    showAccessValid(userData) {
        const daysRemaining = Utils.calculateDaysRemaining(userData.accessExpiration);
       
        // Mostrar notificação discreta apenas se daysRemaining for um número
        if (daysRemaining === 'Permanente') {
            this.showWarning('Parabéns! Você possui acesso vitalício e ilimitado ao nosso serviço.');
        } else if (typeof daysRemaining === 'number') {
            if (daysRemaining <= 3 && daysRemaining > 0) {
                this.showWarning(`Seu acesso premium expira em ${daysRemaining} dias. Renove para continuar aproveitando os benefícios!`);
            } else if (daysRemaining > 3) {
           //     this.showWarning(`Seu acesso premium expira em ${daysRemaining} dias.`);
            } else if (daysRemaining === 0) {
                this.showWarning('Seu acesso premium expirou. Renove para continuar aproveitando os benefícios!');
            } else if (daysRemaining < 0) {
                this.showWarning('Seu acesso premium expirou há algum tempo. Renove para continuar aproveitando os benefícios!');
            }
        }
    }

    // Mostrar acesso expirado
    showAccessExpired(userData) {
        const expirationDate = Utils.formatDate(userData.accessExpiration);
        const message = `Seu acesso expirou em: ${expirationDate}\n\nPara renovar seu acesso e continuar aproveitando todos os benefícios premium, entre em contato com o administrador.`;
        this.showAccessDeniedModal("expired", message);
    }

    // Mostrar acesso negado
    showAccessDenied(message) {
        this.showAccessDeniedModal("denied", message);
    }

    // Modal em tela cheia
    showAccessDeniedModal(type = "denied", customMessage = null) {
        this.hidePremiumContent();

        let modal = document.getElementById("accessDeniedMessage");
        
        if (!modal) {
            modal = this.createAccessDeniedModal();
        }

        this.updateModalContent(modal, type, customMessage);
        
        modal.style.display = "flex";
        
        setTimeout(() => {
            modal.classList.add("active");
        }, 10);
    }

    // Criar a modal
    createAccessDeniedModal() {
        const modal = document.createElement("div");
        modal.id = "accessDeniedMessage";
        modal.className = "access-denied-modal";
        
        modal.innerHTML = `
            <div class="access-denied-content">
                <div class="access-denied-header">
                    <h1 id="modalTitle">❌ Acesso Negado</h1>
                </div>
                
                <div class="access-denied-body">
                    <div class="expired-info">
                        <p id="modalMessage"></p>
                    </div>
                    
                    <div class="premium-features">
                        <h3>🎯 Benefícios Premium:</h3>
                        <ul>
                            <li>✅ Sinais ilimitados</li>
                            <li>✅ Análises em tempo real</li>
                        </ul>
                    </div>
                </div>
                
                <div class="access-denied-footer">
                    <button id="renewAccessBtn" class="renew-btn">
                        <i class="fas fa-sync-alt"></i> Quero Renovar Meu Acesso
                    </button>
                    
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        this.attachModalEvents(modal);
        
        return modal;
    }

    // Atualizar conteúdo da modal
    updateModalContent(modal, type, customMessage) {
        const title = modal.querySelector("#modalTitle");
        const message = modal.querySelector("#modalMessage");
        
        if (type === "expired") {
            title.innerHTML = "❌ Acesso Premium Expirado";
            message.innerHTML = `<strong>${customMessage}</strong>`;
        } else {
            title.innerHTML = "🔒 Acesso Negado";
            message.innerHTML = customMessage || "Você não possui acesso a este conteúdo premium.";
        }
    }

    // Anexar eventos da modal
    attachModalEvents(modal) {
        const renewBtn = modal.querySelector("#renewAccessBtn");
        renewBtn.onclick = () => this.handleRenewAccess();
    }

    // Função do botão de renovar
    handleRenewAccess() {
        const whatsappMessage = `Olá! Gostaria de renovar meu acesso premium.`;
        window.open(`https://wa.me/5527999876397?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    }

    // Fechar modal
    closeAccessDeniedModal() {
        const modal = document.getElementById("accessDeniedMessage");
        if (modal) {
            modal.classList.remove("active");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    }

    // Mostrar aviso (notificação discreta)
    showWarning(message) {
        const notification = document.createElement("div");
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1F2937DB;
            border: 1px solid #4f46e5;
            color: #ECF4FF;
            padding: 13px 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 100001;
            backdrop-filter: blur(4px);
            max-width: 270px;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 12px;
            border-left: 1px solid #1F2937DB;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5300); 
    }

    // Ocultar conteúdo premium
    hidePremiumContent() {
        const premiumElements = document.querySelectorAll(".premium, .premium-content, .paid-content, .subscriber-only");
        
        premiumElements.forEach(element => {
            element.style.display = "none";
        });
    }
}
