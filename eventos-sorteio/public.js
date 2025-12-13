/**
 * SISTEMA DE EVENTOS DE SORTEIO
 * JavaScript do Site Público - Atualizado com SweetAlert
 */

// ============================================================
// VARIÁVEIS GLOBAIS
// ============================================================

let eventos = [];
let currentEventoId = null;
let currentFilter = 'todos';
let comprovanteSelecionado = null;

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site Público carregado');
    loadEventos();
    setupEventListeners();
    
    // Verificar se é a primeira visita
    const primeiraVisita = !localStorage.getItem('tutorialVisto');
    if (primeiraVisita) {
        setTimeout(() => {
            mostrarTutorialPrimeiraVez();
        }, 1000);
    }
});

// ============================================================
// SETUP DE EVENTOS
// ============================================================

/**
 * Configurar listeners de eventos
 */
function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.status;
            document.querySelectorAll('.filter-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            renderEventos();
        });
    });

    // Busca
    document.getElementById('searchEventos').addEventListener('input', function() {
        renderEventos(this.value);
    });

    // Upload de comprovante
    document.getElementById('participaComprovante').addEventListener('change', handleComprovante);

    // Enviar participação
    document.getElementById('btnEnviarParticipacao').addEventListener('click', enviarParticipacao);
}

// ============================================================
// MODAL TUTORIAL
// ============================================================

/**
 * Mostrar tutorial na primeira visita
 */
function mostrarTutorialPrimeiraVez() {
    Swal.fire({
        title: '🎉 Bem-vindo aos Eventos de Sorteio!',
        html: `
            <p style="font-size:13px;>Para participar dos nossos sorteios, siga estes passos simples:</p>
            <ol style=" margin: 20px 0;">
                <l>Escolha um evento disponível</li>
                <li>Leia os requisitos cuidadosamente</li>
                <li>Crie sua conta (se necessário)</li>
                <li>Clique em "Participar do Sorteio"</li>
                <li>Envie o comprovante solicitado</li>
            </ol>
            <p>Precisa de mais detalhes? Clique no botão "Como Participar" no cabeçalho.</p>
        `,
        icon: 'info',
        confirmButtonText: 'Entendi, vamos lá!',
        confirmButtonColor: '#3b82f6',
        showCancelButton: true,
        cancelButtonText: 'Ver Tutorial Completo',
        cancelButtonColor: '#6b7280',
    }).then((result) => {
        if (result.isDismissed && result.dismiss === 'cancel') {
            abrirTutorial();
        }
        localStorage.setItem('tutorialVisto', 'false');
    });
}

/**
 * Abrir modal de tutorial
 */
function abrirTutorial() {
    document.getElementById('modalTutorial').classList.add('active');
}

/**
 * Fechar modal de tutorial
 */
function fecharTutorial() {
    document.getElementById('modalTutorial').classList.remove('active');
}

// ============================================================
// CARREGAR EVENTOS
// ============================================================

/**
 * Carregar eventos do Firebase
 */
async function loadEventos() {
    try {
        Swal.fire({
            title: 'Carregando eventos...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const snapshot = await database.ref(DB_PATHS.EVENTOS).once('value');
        eventos = [];

        snapshot.forEach(function(childSnapshot) {
            const evento = childSnapshot.val();
            evento.id = childSnapshot.key;
            
            if (evento.status === 'ativo' || evento.status === 'encerrado') {
                eventos.push(evento);
            }
        });

        eventos.sort(function(a, b) {
            return b.dataInicio - a.dataInicio;
        });

        Swal.close();
        renderEventos();
    } catch (error) {
        console.error('❌ Erro ao carregar eventos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar',
            text: 'Não foi possível carregar os eventos. Tente novamente.',
            confirmButtonText: 'OK'
        });
    }
}

/**
 * Renderizar eventos
 */
function renderEventos(searchTerm) {
    if (!searchTerm) searchTerm = '';
    
    const container = document.getElementById('eventosList');
    const noEventos = document.getElementById('noEventos');
    
    let filtered = eventos;

    if (currentFilter !== 'todos') {
        filtered = filtered.filter(function(e) {
            return e.status === currentFilter;
        });
    }

    if (searchTerm) {
        filtered = filtered.filter(function(e) {
            return e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   e.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    if (filtered.length === 0) {
        container.classList.add('hidden');
        noEventos.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    noEventos.classList.add('hidden');

    container.innerHTML = filtered.map(function(evento) {
        let statusIcon = 'fa-play-circle';
        let statusText = 'Ativo';
        let statusClass = 'ativo';
        
        if (evento.status === 'encerrado') {
            statusIcon = 'fa-check-circle';
            statusText = 'Encerrado';
            statusClass = 'encerrado';
        }

        return `
            <div class="evento-card" onclick="abrirDetalhesEvento('${evento.id}')">
                <div class="evento-card-header">
                    <h3 class="evento-card-title">
                        ${evento.titulo}
                        <span class="evento-card-status ${statusClass}">
                            <i class="fas ${statusIcon}"></i> ${statusText}
                        </span>
                    </h3>
                </div>
                <div class="evento-card-body">
                    <p class="evento-card-descricao">${evento.descricao}</p>
                    <div class="evento-card-info">
                        <div class="evento-card-info-item">
                            <span class="evento-card-info-label">Início</span>
                            <span class="evento-card-info-value">${formatarData(evento.dataInicio)}</span>
                        </div>
                        <div class="evento-card-info-item">
                            <span class="evento-card-info-label">Término</span>
                            <span class="evento-card-info-value">${formatarData(evento.dataFim)}</span>
                        </div>
                    </div>
                    <div class="evento-card-premiacao">
                        <div class="evento-card-premiacao-title">
                            <i class="fas fa-trophy"></i> Premiação
                        </div>
                        <ul class="evento-card-premiacao-list">
                            ${evento.premiacao ? evento.premiacao.slice(0, 3).map(function(p) {
                                return `<li><span>${p.lugar}</span><strong>${formatarValor(p.valor)}</strong></li>`;
                            }).join('') : ''}
                            ${evento.premiacao && evento.premiacao.length > 3 ? 
                                `<li><em><i class="fas fa-plus"></i> ${evento.premiacao.length - 3} mais...</em></li>` : ''}
                        </ul>
                    </div>
                    <div class="evento-card-footer">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); abrirDetalhesEvento('${evento.id}')">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// DETALHES DO EVENTO
// ============================================================

/**
 * Abrir modal com detalhes do evento
 */
function abrirDetalhesEvento(eventoId) {
    const evento = eventos.find(function(e) {
        return e.id === eventoId;
    });
    
    if (!evento) {
        Swal.fire({
            icon: 'error',
            title: 'Evento não encontrado',
            text: 'Este evento não está mais disponível.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Verificar se evento está encerrado
    if (evento.status === 'encerrado') {
        Swal.fire({
            icon: 'info',
            title: 'Evento Encerrado',
            text: 'Este evento já foi finalizado. Veja outros eventos ativos.',
            confirmButtonText: 'Ver Outros Eventos'
        });
        return;
    }

    currentEventoId = eventoId;

    // Preencher detalhes
    document.getElementById('detailTitulo').textContent = evento.titulo;
    document.getElementById('detailDescricao').textContent = evento.descricao;
    document.getElementById('detailDataInicio').textContent = formatarData(evento.dataInicio);
    document.getElementById('detailDataFim').textContent = formatarData(evento.dataFim);
    document.getElementById('detailParticipantes').textContent = evento.totalParticipantes || 0;

    // Premiação
    document.getElementById('detailPremiacao').innerHTML = evento.premiacao ? evento.premiacao.map(function(p) {
        let icon = 'fa-medal';
        if (p.lugar.includes('1°')) icon = 'fa-trophy';
        else if (p.lugar.includes('2°')) icon = 'fa-medal';
        else if (p.lugar.includes('3°')) icon = 'fa-medal';
        
        return `
            <li>
                <span><i class="fas ${icon}"></i> ${p.lugar}</span>
                <strong>${formatarValor(p.valor)}</strong>
            </li>
        `;
    }).join('') : '';

    // Requisitos
    const requisitosElement = document.getElementById('detailRequisitos');
    if (evento.requisitos) {
        let formattedRequisitos = evento.requisitos
            .replace(/1️⃣/g, '<i class="fas fa-1"></i>')
            .replace(/2️⃣/g, '<i class="fas fa-2"></i>')
            .replace(/3️⃣/g, '<i class="fas fa-3"></i>')
            .replace(/📱/g, '<i class="fas fa-mobile-alt"></i>')
            .replace(/🏦/g, '<i class="fas fa-university"></i>')
            .replace(/📸/g, '<i class="fas fa-camera"></i>')
            .replace(/💾/g, '<i class="fas fa-save"></i>')
            .replace(/✏️/g, '<i class="fas fa-edit"></i>')
            .replace(/📎/g, '<i class="fas fa-paperclip"></i>')
            .replace(/✅/g, '<i class="fas fa-check-circle"></i>')
            .replace(/⚠️/g, '<i class="fas fa-exclamation-triangle"></i>')
            .replace(/📞/g, '<i class="fas fa-phone"></i>')
            .replace(/📧/g, '<i class="fas fa-envelope"></i>')
            .replace(/🎯/g, '<i class="fas fa-bullseye"></i>')
            .replace(/💰/g, '<i class="fas fa-money-bill-wave"></i>')
            .replace(/📋/g, '<i class="fas fa-clipboard-list"></i>')
            .replace(/📲/g, '<i class="fab fa-whatsapp"></i>')
            .replace(/\n/g, '<br>');
        
        requisitosElement.innerHTML = formattedRequisitos;
    } else {
        requisitosElement.innerHTML = 'Sem requisitos específicos para este evento.';
    }

    // Link afiliado
    if (evento.linkAfiliado) {
        const linkBtn = document.getElementById('detailLinkAfiliado');
        linkBtn.href = evento.linkAfiliado;
        linkBtn.style.display = 'flex';
    }

    document.getElementById('modalEvento').classList.add('active');
}

/**
 * Fechar modal de detalhes
 */
function closeModalEvento() {
    document.getElementById('modalEvento').classList.remove('active');
}

// ============================================================
// PARTICIPAÇÃO
// ============================================================

/**
 * Abrir formulário de participação
 */
function participarEvento() {
    if (!currentEventoId) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Nenhum evento selecionado. Volte à lista de eventos e tente novamente.',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    closeModalEvento();
    
    Swal.fire({
        title: 'Preparando formulário...',
        text: 'Aguarde um momento',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    }).then(() => {
        document.getElementById('formParticipacao').reset();
        comprovanteSelecionado = null;
        document.getElementById('previewComprovante').classList.add('hidden');
        document.getElementById('modalParticipacao').classList.add('active');
    });
}

/**
 * Fechar modal de participação
 */
function closeModalParticipacao() {
    document.getElementById('modalParticipacao').classList.remove('active');
    document.getElementById('formParticipacao').reset();
    comprovanteSelecionado = null;
    document.getElementById('previewComprovante').classList.add('hidden');
}

/**
 * Lidar com upload de comprovante
 */
function handleComprovante(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
        Swal.fire({
            icon: 'error',
            title: 'Formato inválido',
            text: 'Por favor, selecione uma imagem (JPG, PNG ou GIF).',
            confirmButtonText: 'OK'
        });
        event.target.value = '';
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
            icon: 'error',
            title: 'Arquivo muito grande',
            text: 'A imagem não pode ter mais de 5MB.',
            confirmButtonText: 'OK'
        });
        event.target.value = '';
        return;
    }

    comprovanteSelecionado = file;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('previewComprovante').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

/**
 * Remover comprovante
 */
function removerComprovante() {
    comprovanteSelecionado = null;
    document.getElementById('participaComprovante').value = '';
    document.getElementById('previewComprovante').classList.add('hidden');
}

/**
 * Gerar ID único para participante
 */
function gerarIdParticipante() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return 'participante_' + timestamp + '_' + random;
}

/**
 * Enviar participação
 */
async function enviarParticipacao() {
    const nome = document.getElementById('participaNome').value.trim();
    const email = document.getElementById('participaEmail').value.trim();
    const termos = document.getElementById('participaTermos').checked;

    // Validações com SweetAlert
    if (!nome) {
        Swal.fire({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Preencha seu nome completo.',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!email || !validarEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor, insira um email válido.',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!comprovanteSelecionado) {
        Swal.fire({
            icon: 'error',
            title: 'Comprovante necessário',
            text: 'Selecione um comprovante para enviar.',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!termos) {
        Swal.fire({
            icon: 'error',
            title: 'Termos não aceitos',
            text: 'Você deve concordar com os termos e condições.',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!currentEventoId) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Evento não identificado. Volte à lista de eventos.',
            confirmButtonText: 'OK'
        });
        return;
    }

    const swalResult = await Swal.fire({
        title: 'Confirmar participação',
        html: `
            <div style="text-align: left;">
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Comprovante:</strong> ${comprovanteSelecionado.name}</p>
                <p style="color: #666; font-size: 0.9em; margin-top: 15px;">
                    <i class="fas fa-info-circle"></i> Após enviar, sua participação será verificada pela nossa equipe.
                </p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, enviar participação',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                // 1. Upload do comprovante
                const nomeArquivo = Date.now() + '_' + Math.random().toString(36).substring(2) + '_' + comprovanteSelecionado.name.replace(/\s+/g, '_');
                const caminhoStorage = STORAGE_PATHS.COMPROVANTES + currentEventoId + '/' + nomeArquivo;
                
                const uploadTask = await storage.ref(caminhoStorage).put(comprovanteSelecionado);
                const urlComprovante = await uploadTask.ref.getDownloadURL();

                // 2. Salvar participação
                const participanteId = gerarIdParticipante();
                const timestamp = new Date().getTime();
                
                const participacaoData = {
                    id: participanteId,
                    eventoId: currentEventoId,
                    nome: nome,
                    email: email,
                    status: 'pendente',
                    comprovante: {
                        url: urlComprovante,
                        nomeArquivo: nomeArquivo,
                        uploadedAt: timestamp
                    },
                    participacaoEm: timestamp,
                    atualizadoEm: timestamp
                };

                await database.ref(DB_PATHS.PARTICIPANTES + '/' + currentEventoId + '/' + participanteId).set(participacaoData);

                // 3. Atualizar contagem
                const eventoRef = database.ref(DB_PATHS.EVENTOS + '/' + currentEventoId);
                const eventoSnapshot = await eventoRef.once('value');
                
                if (eventoSnapshot.exists()) {
                    const eventoData = eventoSnapshot.val();
                    const totalAtual = eventoData.totalParticipantes || 0;
                    await eventoRef.update({
                        totalParticipantes: totalAtual + 1,
                        atualizadoEm: timestamp
                    });
                }

                return { success: true, participanteId: participanteId };
            } catch (error) {
                throw new Error('Erro ao processar participação: ' + error.message);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    });

    if (swalResult.isConfirmed) {
        if (swalResult.value && swalResult.value.success) {
            await Swal.fire({
                title: '🎉 Participação Enviada!',
                html: `
                    <p>Sua participação foi enviada com sucesso!</p>
                    <p style="color: #666; font-size: 0.9em; margin-top: 15px;">
                        <i class="fas fa-clock"></i> Nossa equipe verificará seu comprovante e você receberá uma confirmação por email.
                    </p>
                    <p style="color: #666; font-size: 0.9em;">
                        <i class="fas fa-info-circle"></i> ID da participação: <code>${swalResult.value.participanteId.substring(0, 15)}...</code>
                    </p>
                `,
                icon: 'success',
                confirmButtonText: 'Ótimo!',
                confirmButtonColor: '#10b981'
            });

            // Fechar modal e recarregar eventos
            closeModalParticipacao();
            await loadEventos();
        }
    }
}

/**
 * Validar email
 */
function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Formatar data
 */
function formatarData(timestamp) {
    if (!timestamp) return 'Não definida';
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formatar valor
 */
function formatarValor(valor) {
    if (!valor) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

console.log('✅ Public.js carregado com SweetAlert');