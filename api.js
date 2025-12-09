/**
 * Live Audio Feature - Versão de Produção
 * Autenticação Firebase Real + Gerenciamento de Permissões
 * Admin: root@gmail.com / admin123
 */

// ============================================================
// CONFIGURAÇÃO FIREBASE
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyB5v0e77dvzHINhHzCKeMs6QPjqo7Z7img",
  authDomain: "login-database-black.firebaseapp.com",
  databaseURL: "https://login-database-black-default-rtdb.firebaseio.com",
  projectId: "login-database-black",
  storageBucket: "login-database-black.appspot.com",
  messagingSenderId: "768021690283",
  appId: "1:768021690283:web:221e866026541faffa04ee"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Email do administrador
const ADMIN_EMAIL = 'root@gmail.com';

// ============================================================
// CLASSE PRINCIPAL - LIVE AUDIO PRODUCTION
// ============================================================

class LiveAudioProduction {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.liveRoomId = 'live_audio_main';
        this.listeners = [];
        this.speakRequests = [];
        this.currentSpeaker = null;
        this.isLiveActive = false;
        this.userAudioStream = null;
        this.audioContext = null;
        this.mediaRecorder = null;
        this.isSpeaking = false;
        this.isAuthenticated = false;

        this.init();
    }

    /**
     * Inicializar a funcionalidade
     */
    init() {
        this.bindLoginEvents();
        this.checkAuthState();
        this.setupAudioContext();
    }

    /**
     * Configurar contexto de áudio
     */
    setupAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            console.log('✅ AudioContext inicializado');
        } catch (error) {
            console.warn('⚠️ AudioContext não suportado:', error);
        }
    }

    /**
     * Vincular eventos do formulário de login
     */
    bindLoginEvents() {
        $('#btnLogin').on('click', () => this.handleLogin());
        $('#loginForm').on('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });
        $('#btnLogout').on('click', () => this.handleLogout());
    }

    /**
     * Verificar estado de autenticação
     */
    checkAuthState() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.currentUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0]
                };

                this.isAuthenticated = true;
                this.verifyAdminStatus();
                this.showLiveAudio();
                this.bindLiveAudioEvents();
                this.listenToLiveRoom();

                console.log(`✅ Usuário autenticado: ${this.currentUser.email}`);
            } else {
                this.isAuthenticated = false;
                this.showLoginForm();
                console.log('❌ Usuário não autenticado');
            }
        });
    }

    /**
     * Verificar se o usuário é administrador
     */
    verifyAdminStatus() {
        this.isAdmin = this.currentUser.email === ADMIN_EMAIL;
        console.log(`👤 Tipo de usuário: ${this.isAdmin ? 'Admin' : 'Usuário'}`);
        this.updateUI();
    }

    /**
     * Manipular login
     */
    async handleLogin() {
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val();
        const rememberMe = $('#rememberMe').is(':checked');

        // Validação
        if (!email || !password) {
            this.showLoginError('Por favor, preencha todos os campos');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showLoginError('Email inválido');
            return;
        }

        // Desabilitar botão
        const btnLogin = $('#btnLogin');
        btnLogin.prop('disabled', true);
        btnLogin.html('<span class="loading-spinner"></span> Entrando...');

        try {
            // Fazer login com Firebase
            const result = await auth.signInWithEmailAndPassword(email, password);

            // Salvar preferência de "manter conectado"
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }

            console.log('✅ Login bem-sucedido');

            // Limpar formulário
            $('#loginForm')[0].reset();
            this.hideLoginError();

        } catch (error) {
            console.error('❌ Erro ao fazer login:', error);

            let errorMessage = 'Erro ao fazer login';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Usuário não encontrado';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Senha incorreta';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email inválido';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'Usuário desabilitado';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde';
            }

            this.showLoginError(errorMessage);

        } finally {
            // Reabilitar botão
            btnLogin.prop('disabled', false);
            btnLogin.html('<span>Entrar</span>');
        }
    }

    /**
     * Manipular logout
     */
    async handleLogout() {
        Swal.fire({
            icon: 'question',
            title: 'Sair',
            text: 'Tem certeza que deseja sair?',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await auth.signOut();
                    console.log('✅ Logout bem-sucedido');

                    Swal.fire({
                        icon: 'success',
                        title: 'Desconectado',
                        text: 'Você foi desconectado com sucesso',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error('❌ Erro ao fazer logout:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro ao desconectar',
                        confirmButtonColor: '#135bec'
                    });
                }
            }
        });
    }

    /**
     * Mostrar formulário de login
     */
    showLoginForm() {
        $('#loginContainer').show();
        $('#liveAudioContainer').removeClass('show');

        // Carregar email salvo se "manter conectado" foi marcado
        if (localStorage.getItem('rememberMe') === 'true') {
            const savedEmail = localStorage.getItem('userEmail');
            if (savedEmail) {
                $('#loginEmail').val(savedEmail);
                $('#rememberMe').prop('checked', true);
                $('#loginPassword').focus();
            }
        }
    }

    /**
     * Mostrar Live Audio
     */
    showLiveAudio() {
        $('#loginContainer').hide();
        $('#liveAudioContainer').addClass('show');
    }

    /**
     * Mostrar erro de login
     */
    showLoginError(message) {
        const errorDiv = $('#loginError');
        errorDiv.text(message).addClass('show');
    }

    /**
     * Ocultar erro de login
     */
    hideLoginError() {
        $('#loginError').removeClass('show').text('');
    }

    /**
     * Validar email
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Atualizar UI baseado no tipo de usuário
     */
    updateUI() {
        if (this.isAdmin) {
            $('#adminControls').show();
            $('#userControls').hide();
            $('#userRole').html('👑 <strong>Admin</strong>');
        } else {
            $('#adminControls').hide();
            $('#userControls').show();
            $('#userRole').html('👤 <strong>Usuário</strong>');
        }
    }

    /**
     * Vincular eventos do Live Audio
     */
    bindLiveAudioEvents() {
        // Admin Controls
        $('#btnStartLive').on('click', () => this.startLive());
        $('#btnStopLive').on('click', () => this.stopLive());

        // User Controls
        $('#btnRequestSpeak').on('click', () => this.requestToSpeak());
        $('#btnSpeak').on('click', () => this.startSpeaking());
        $('#btnStopSpeak').on('click', () => this.stopSpeaking());
    }

    /**
     * Ouvir mudanças na sala de live
     */
    listenToLiveRoom() {
        database.ref(`live_rooms/${this.liveRoomId}`).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.isLiveActive = data.isActive || false;
                this.currentSpeaker = data.currentSpeaker || null;
                this.listeners = data.listeners || [];
                this.speakRequests = data.requests || [];

                this.updateLiveUI();
            }
        });
    }

    /**
     * Iniciar transmissão ao vivo (Admin)
     */
    async startLive() {
        if (!this.isAdmin) {
            Swal.fire({
                icon: 'error',
                title: 'Acesso Negado',
                text: 'Apenas administradores podem iniciar uma live',
                confirmButtonColor: '#135bec'
            });
            return;
        }

        try {
            // Solicitar permissão de áudio
            this.userAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Atualizar estado
            this.isLiveActive = true;
            this.currentSpeaker = {
                uid: this.currentUser.uid,
                name: this.currentUser.displayName,
                avatar: '🎤'
            };

            // Atualizar UI
            $('#offlineState').hide();
            $('#speakerSection').show();
            $('#btnStartLive').hide();
            $('#btnStopLive').show();
            $('#liveIndicator').show();
            $('#headerTitle').html('🔴 Live Audio Ativa');

            // Atualizar dados do orador
            $('#speakerName').text(this.currentSpeaker.name);
            $('#speakerStatus').text('Transmitindo ao vivo...');

            // Mostrar seção de solicitações
            $('#requestsSection').show();

            // Salvar no Firebase
            this.saveLiveRoomState();

            // Iniciar gravação simulada
            this.startAudioRecording();

            Swal.fire({
                icon: 'success',
                title: 'Live Iniciada!',
                text: 'Sua transmissão ao vivo começou',
                timer: 3000,
                showConfirmButton: false
            });

            console.log('✅ Live iniciada');
        } catch (error) {
            console.error('❌ Erro ao iniciar live:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível acessar o microfone: ' + error.message,
                confirmButtonColor: '#135bec'
            });
        }
    }

    /**
     * Parar transmissão ao vivo (Admin)
     */
    async stopLive() {
        if (!this.isAdmin) return;

        try {
            // Parar gravação
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }

            // Parar stream de áudio
            if (this.userAudioStream) {
                this.userAudioStream.getTracks().forEach(track => track.stop());
            }

            // Atualizar estado
            this.isLiveActive = false;
            this.currentSpeaker = null;
            this.listeners = [];
            this.speakRequests = [];

            // Atualizar UI
            $('#offlineState').show();
            $('#speakerSection').hide();
            $('#btnStartLive').show();
            $('#btnStopLive').hide();
            $('#liveIndicator').hide();
            $('#headerTitle').text('Live Audio');

            // Salvar no Firebase
            this.saveLiveRoomState();

            Swal.fire({
                icon: 'success',
                title: 'Live Finalizada',
                text: 'A transmissão ao vivo foi encerrada',
                timer: 3000,
                showConfirmButton: false
            });

            console.log('✅ Live parada');
        } catch (error) {
            console.error('❌ Erro ao parar live:', error);
        }
    }

    /**
     * Iniciar gravação de áudio
     */
    startAudioRecording() {
        try {
            if (!this.userAudioStream) return;

            this.mediaRecorder = new MediaRecorder(this.userAudioStream);

            this.mediaRecorder.ondataavailable = (event) => {
                console.log('🎙️ Dados de áudio disponíveis:', event.data.size, 'bytes');
            };

            this.mediaRecorder.start();
            console.log('🎙️ Gravação iniciada');
        } catch (error) {
            console.warn('⚠️ Erro ao iniciar gravação:', error);
        }
    }

    /**
     * Solicitar permissão para falar (Usuário)
     */
    async requestToSpeak() {
        if (!this.isLiveActive) {
            Swal.fire({
                icon: 'warning',
                title: 'Live Inativa',
                text: 'Nenhuma transmissão ativa no momento',
                confirmButtonColor: '#135bec'
            });
            return;
        }

        // Verificar se já solicitou
        if (this.speakRequests.some(r => r.uid === this.currentUser.uid)) {
            Swal.fire({
                icon: 'info',
                title: 'Já Solicitado',
                text: 'Você já solicitou permissão para falar',
                confirmButtonColor: '#135bec'
            });
            return;
        }

        try {
            // Criar solicitação
            const request = {
                uid: this.currentUser.uid,
                name: this.currentUser.displayName,
                avatar: '👤',
                timestamp: new Date().getTime(),
                status: 'pending'
            };

            // Salvar no Firebase
            await database.ref(`live_rooms/${this.liveRoomId}/requests/${this.currentUser.uid}`).set(request);

            // Desabilitar botão
            $('#btnRequestSpeak').prop('disabled', true).css('opacity', '0.5');

            Swal.fire({
                icon: 'success',
                title: 'Solicitação Enviada',
                text: 'Aguarde a aprovação do admin',
                timer: 3000,
                showConfirmButton: false
            });

            console.log('✅ Solicitação para falar enviada');
        } catch (error) {
            console.error('❌ Erro ao solicitar falar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar solicitação',
                confirmButtonColor: '#135bec'
            });
        }
    }

    /**
     * Aprovar solicitação de fala (Admin)
     */
    async approveSpeakRequest(userId) {
        if (!this.isAdmin) return;

        try {
            // Encontrar solicitação
            const request = this.speakRequests.find(r => r.uid === userId);
            if (!request) return;

            // Adicionar aos listeners com permissão de falar
            const newListener = {
                uid: request.uid,
                name: request.name,
                avatar: request.avatar,
                canSpeak: true,
                isSpeaking: false
            };

            // Salvar listener
            await database.ref(`live_rooms/${this.liveRoomId}/listeners/${userId}`).set(newListener);

            // Remover solicitação
            await database.ref(`live_rooms/${this.liveRoomId}/requests/${userId}`).remove();

            Swal.fire({
                icon: 'success',
                title: 'Aprovado',
                text: `${request.name} pode falar agora`,
                timer: 2000,
                showConfirmButton: false
            });

            console.log(`✅ Solicitação de ${request.name} aprovada`);
        } catch (error) {
            console.error('❌ Erro ao aprovar solicitação:', error);
        }
    }

    /**
     * Negar solicitação de fala (Admin)
     */
    async denySpeakRequest(userId) {
        if (!this.isAdmin) return;

        try {
            // Encontrar solicitação
            const request = this.speakRequests.find(r => r.uid === userId);
            if (!request) return;

            // Remover solicitação
            await database.ref(`live_rooms/${this.liveRoomId}/requests/${userId}`).remove();

            Swal.fire({
                icon: 'info',
                title: 'Negado',
                text: `Solicitação de ${request.name} foi negada`,
                timer: 2000,
                showConfirmButton: false
            });

            console.log(`❌ Solicitação de ${request.name} negada`);
        } catch (error) {
            console.error('❌ Erro ao negar solicitação:', error);
        }
    }

    /**
     * Iniciar fala (Usuário com permissão)
     */
    async startSpeaking() {
        if (!this.isLiveActive) return;

        try {
            // Solicitar permissão de áudio
            this.userAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Atualizar estado
            this.isSpeaking = true;

            // Atualizar UI
            $('#btnSpeak').hide();
            $('#btnStopSpeak').show();
            $('#btnRequestSpeak').hide();

            // Iniciar gravação
            this.startAudioRecording();

            // Atualizar listener
            const listener = this.listeners.find(l => l.uid === this.currentUser.uid);
            if (listener) {
                listener.isSpeaking = true;
                await database.ref(`live_rooms/${this.liveRoomId}/listeners/${this.currentUser.uid}`).update({
                    isSpeaking: true
                });
            }

            Swal.fire({
                icon: 'success',
                title: 'Você está falando',
                text: 'Seu áudio está sendo transmitido',
                timer: 2000,
                showConfirmButton: false
            });

            console.log('🎤 Começou a falar');
        } catch (error) {
            console.error('❌ Erro ao iniciar fala:', error);
        }
    }

    /**
     * Parar fala (Usuário)
     */
    async stopSpeaking() {
        try {
            // Parar gravação
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }

            // Parar stream
            if (this.userAudioStream) {
                this.userAudioStream.getTracks().forEach(track => track.stop());
            }

            // Atualizar estado
            this.isSpeaking = false;

            // Atualizar UI
            $('#btnSpeak').show();
            $('#btnStopSpeak').hide();

            // Atualizar listener
            const listener = this.listeners.find(l => l.uid === this.currentUser.uid);
            if (listener) {
                listener.isSpeaking = false;
                await database.ref(`live_rooms/${this.liveRoomId}/listeners/${this.currentUser.uid}`).update({
                    isSpeaking: false
                });
            }

            Swal.fire({
                icon: 'info',
                title: 'Você parou de falar',
                text: 'Seu áudio não está mais sendo transmitido',
                timer: 2000,
                showConfirmButton: false
            });

            console.log('🔇 Parou de falar');
        } catch (error) {
            console.error('❌ Erro ao parar fala:', error);
        }
    }

    /**
     * Remover ouvinte (Admin)
     */
    async removeListener(userId) {
        if (!this.isAdmin) return;

        try {
            const listener = this.listeners.find(l => l.uid === userId);
            if (!listener) return;

            // Remover do Firebase
            await database.ref(`live_rooms/${this.liveRoomId}/listeners/${userId}`).remove();

            Swal.fire({
                icon: 'info',
                title: 'Removido',
                text: `${listener.name} foi removido da live`,
                timer: 2000,
                showConfirmButton: false
            });

            console.log(`❌ ${listener.name} removido`);
        } catch (error) {
            console.error('❌ Erro ao remover listener:', error);
        }
    }

    /**
     * Atualizar UI da Live
     */
    updateLiveUI() {
        this.updateListenersUI();
        this.updateRequestsUI();
    }

    /**
     * Atualizar UI dos ouvintes
     */
    updateListenersUI() {
        const listenersList = $('#listenersList');

        if (this.listeners.length === 0) {
            listenersList.html(`
                <div style="text-align: center; color: var(--text-secondary); padding: 20px;">
                    Nenhum ouvinte conectado
                </div>
            `);
            $('#listenersCount').text('0');
            return;
        }

        let html = '';
        this.listeners.forEach(listener => {
            const speakingClass = listener.isSpeaking ? 'border-l-4 border-accent-green' : '';
            const speakingStatus = listener.isSpeaking ? '🎤 Falando' : '👂 Ouvindo';
            const canSpeakBadge = listener.canSpeak ? '<span style="font-size: 10px; color: var(--accent-green);">✓ Pode falar</span>' : '';

            html += `
                <div class="listener-item ${speakingClass}">
                    <div class="listener-info">
                        <div class="listener-avatar">${listener.avatar}</div>
                        <div class="listener-details">
                            <div class="listener-name">${listener.name}</div>
                            <div class="listener-status">${speakingStatus}</div>
                            ${canSpeakBadge}
                        </div>
                    </div>
                    ${this.isAdmin ? `
                        <div class="listener-action">
                            <button class="btn-icon" onclick="liveAudioApp.removeListener('${listener.uid}')" title="Remover">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        listenersList.html(html);
        $('#listenersCount').text(this.listeners.length);
    }

    /**
     * Atualizar UI das solicitações
     */
    updateRequestsUI() {
        const requestsList = $('#requestsList');

        if (this.speakRequests.length === 0) {
            requestsList.html(`
                <div style="text-align: center; color: var(--text-secondary); padding: 20px;">
                    Nenhuma solicitação
                </div>
            `);
            $('#requestsCount').text('0');
            return;
        }

        let html = '';
        this.speakRequests.forEach(request => {
            const timeAgo = this.getTimeAgo(request.timestamp);
            html += `
                <div class="request-item">
                    <div class="request-info">
                        <div class="request-avatar">${request.avatar}</div>
                        <div class="request-details">
                            <div class="request-name">${request.name}</div>
                            <div class="request-time">Solicitou há ${timeAgo}</div>
                        </div>
                    </div>
                    <div class="request-actions">
                        <button class="btn-approve" onclick="liveAudioApp.approveSpeakRequest('${request.uid}')">
                            Aprovar
                        </button>
                        <button class="btn-deny" onclick="liveAudioApp.denySpeakRequest('${request.uid}')">
                            Negar
                        </button>
                    </div>
                </div>
            `;
        });

        requestsList.html(html);
        $('#requestsCount').text(this.speakRequests.length);
    }

    /**
     * Calcular tempo decorrido
     */
    getTimeAgo(timestamp) {
        const now = new Date().getTime();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);

        if (seconds < 60) return `${seconds}s`;
        if (minutes < 60) return `${minutes}m`;
        return `${Math.floor(minutes / 60)}h`;
    }

    /**
     * Salvar estado da sala
     */
    async saveLiveRoomState() {
        const state = {
            isActive: this.isLiveActive,
            currentSpeaker: this.currentSpeaker,
            listeners: this.listeners,
            requests: this.speakRequests,
            timestamp: new Date().getTime()
        };

        try {
            await database.ref(`live_rooms/${this.liveRoomId}`).set(state);
            console.log('💾 Estado salvo');
        } catch (error) {
            console.error('❌ Erro ao salvar estado:', error);
        }
    }
}

// ============================================================
// INICIALIZAR
// ============================================================

let liveAudioApp;

$(document).ready(function() {
    liveAudioApp = new LiveAudioProduction();
    console.log('✅ Live Audio Production inicializado');
});
