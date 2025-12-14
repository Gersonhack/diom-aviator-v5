/**
 * SISTEMA DE EVENTOS DE SORTEIO COM BANNERS
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
    const participaComprovante = document.getElementById('participaComprovante');
    if (participaComprovante) {
        participaComprovante.addEventListener('change', handleComprovante);
    }

    // Enviar participação
    const btnEnviarParticipacao = document.getElementById('btnEnviarParticipacao');
    if (btnEnviarParticipacao) {
        btnEnviarParticipacao.addEventListener('click', enviarParticipacao);
    }
}

// ============================================================
// RENDERIZAR EVENTOS COM BANNERS
// ============================================================

/**
 * Renderizar eventos com banners
 */
function renderEventos(searchTerm = '') {
    const container = document.getElementById('eventosList');
    const noEventos = document.getElementById('noEventos');
    
    let filtered = eventos;
    
    // Filtrar por status
    if (currentFilter !== 'todos') {
        filtered = filtered.filter(e => e.status === currentFilter);
    }
    
    // Filtrar por busca
    if (searchTerm) {
        filtered = filtered.filter(e =>
            e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        container.classList.add('hidden');
        noEventos.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noEventos.classList.add('hidden');
    
    container.innerHTML = filtered.map(evento => `
        <div class="evento-card" onclick="abrirDetalhesEvento('${evento.id}')">
            <!-- BANNER -->
            <div class="evento-card-banner">
                <img 
                    src="${evento.banner || 'https://via.placeholder.com/1200x400?text=Sem+Banner'}" 
                    alt="Banner do Evento" 
                    class="evento-banner-img"
                    onerror="this.src='https://via.placeholder.com/1200x400?text=Erro+ao+carregar'"
                >
                <div class="evento-card-status-badge">
                    <span class="evento-status-badge ${evento.status}">
                        ${evento.status === 'ativo' ? '🔴 Ativo' : '✓ Encerrado'}
                    </span>
                </div>
            </div>

            <!-- CONTEÚDO -->
            <div class="evento-card-content">
                <!-- Título -->
                <div class="evento-card-header">
                    <h3 class="evento-card-title">${evento.titulo}</h3>
                </div>

                <!-- Descrição -->
                <p class="evento-card-descricao">${evento.descricao}</p>

                <!-- Datas -->
                <div class="evento-card-dates">
                    <div class="evento-card-date-item">
                        <i class="fas fa-calendar-check"></i>
                        <div>
                            <span class="evento-card-date-label">Início</span>
                            <span class="evento-card-date-value">${formatarData(evento.dataInicio)}</span>
                        </div>
                    </div>
                    <div class="evento-card-date-item">
                        <i class="fas fa-calendar-times"></i>
                        <div>
                            <span class="evento-card-date-label">Término</span>
                            <span class="evento-card-date-value">${formatarData(evento.dataFim)}</span>
                        </div>
                    </div>
                </div>

                <!-- Informações -->
                <div class="evento-card-info">
                    <div class="evento-card-info-item">
                        <i class="fas fa-users"></i>
                        <span>${evento.totalParticipantes || 0} participantes</span>
                    </div>
                    
                    ${evento.vencedores ? 
                        `<div class="evento-card-info-item">
                            <i class="fas fa-trophy"></i>
                            <span>${Object.keys(evento.vencedores).length} vencedores</span>
                        </div>` : ''
                    }
                </div>

                <!-- Botão -->
                <div class="evento-card-footer">
                    <button 
                        class="btn btn-primary btn-full" 
                        onclick="event.stopPropagation(); abrirDetalhesEvento('${evento.id}')"
                    >
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================================
// ABRIR DETALHES COM BANNER E ÍCONES COLORIDOS
// ============================================================

/**
 * Abrir modal com detalhes do evento (COM BANNER E ÍCONES COLORIDOS)
 */
function abrirDetalhesEvento(eventoId) {
    const evento = eventos.find(e => e.id === eventoId);
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
    
    // Preencher banner
    const bannerImg = document.getElementById('detailBannerImg');
    if (bannerImg && evento.banner) {
        bannerImg.src = evento.banner;
        bannerImg.onerror = function() {
            this.src = 'https://via.placeholder.com/1200x400?text=Erro+ao+carregar';
        };
    }
    
    // Preencher detalhes existentes
    document.getElementById('detailTitulo').textContent = evento.titulo;
    document.getElementById('detailDescricao').textContent = evento.descricao;
    document.getElementById('detailDataInicio').textContent = formatarData(evento.dataInicio);
    document.getElementById('detailDataFim').textContent = formatarData(evento.dataFim);
    document.getElementById('detailParticipantes').textContent = evento.totalParticipantes || 0;
    
    // PREMIAÇÃO COM ÍCONES COLORIDOS
    const premiacaoElement = document.getElementById('detailPremiacao');
    if (evento.premiacao && Array.isArray(evento.premiacao) && evento.premiacao.length > 0) {
        premiacaoElement.innerHTML = evento.premiacao.map(function(p, index) {
            let icon = 'fa-medal';
            let iconColor = '';
            let bgColor = '';
            let textColor = '';
            
            // Definir cores e ícones baseados na posição
            if (p.lugar.includes('1°') || p.lugar.includes('1º') || p.lugar.toLowerCase().includes('primeiro')) {
                icon = 'fa-trophy';
                iconColor = 'color: #FFD700;'; // Ouro
                bgColor = 'background: linear-gradient(135deg, #FFD70022, #FFEC8B22);';
                textColor = 'color: #B8860B;';
            } else if (p.lugar.includes('2°') || p.lugar.includes('2º') || p.lugar.toLowerCase().includes('segundo')) {
                icon = 'fa-medal';
                iconColor = 'color: #C0C0C0;'; // Prata
                bgColor = 'background: linear-gradient(135deg, #C0C0C022, #E6E8FA22);';
                textColor = 'color: #808080;';
            } else if (p.lugar.includes('3°') || p.lugar.includes('3º') || p.lugar.toLowerCase().includes('terceiro')) {
                icon = 'fa-medal';
                iconColor = 'color: #CD7F32;'; // Bronze
                bgColor = 'background: linear-gradient(135deg, #CD7F3222, #DEB88722);';
                textColor = 'color: #8B4513;';
            } else {
                // Para outras posições
                icon = 'fa-award';
                iconColor = 'color: var(--color-primary);';
                bgColor = 'background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50));';
                textColor = 'color: var(--color-primary-700);';
            }
            
            return `
                <li style="margin-bottom: 12px; padding: 15px; border-radius: 10px; ${bgColor}">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="width: 50px; height: 50px; ${bgColor} border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="fas ${icon}" style="font-size: 24px; ${iconColor}"></i>
                        </div>
                        <div style="flex: 1;">
                            <span style="font-weight: 600; font-size: 16px; ${textColor}">
                                ${p.lugar} Lugar
                            </span>
                            <strong style="display: block; font-size: 20px; color: var(--color-success); margin-top: 5px;">
                                ${formatarValor(p.valor)}
                            </strong>
                        </div>
                        <div style="width: 30px; height: 30px; background: var(--color-primary-100); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="font-weight: bold; color: var(--color-primary);">${index + 1}</span>
                        </div>
                    </div>
                </li>
            `;
        }).join('');
    } else {
        premiacaoElement.innerHTML = `
            <li style="text-align: center; padding: 30px; color: var(--color-gray-500);">
                <i class="fas fa-gift" style="font-size: 48px; color: var(--color-gray-300); margin-bottom: 15px; display: block;"></i>
                <p>Premiação a ser definida</p>
            </li>
        `;
    }
    
    // REQUISITOS COM ÍCONES COLORIDOS
    const requisitosElement = document.getElementById('detailRequisitos');
    if (evento.requisitos) {
        let formattedRequisitos = evento.requisitos
            .replace(/1️⃣/g, '<span class="requisito-number" style="background: var(--color-primary); color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 12px; font-weight: bold;">1</span>')
            .replace(/2️⃣/g, '<span class="requisito-number" style="background: var(--color-success); color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 12px; font-weight: bold;">2</span>')
            .replace(/3️⃣/g, '<span class="requisito-number" style="background: var(--color-warning); color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 12px; font-weight: bold;">3</span>')
            .replace(/📱/g, '<i class="fas fa-mobile-alt" style="color: var(--color-primary); margin-right: 8px;"></i>')
            .replace(/🏦/g, '<i class="fas fa-university" style="color: var(--color-success); margin-right: 8px;"></i>')
            .replace(/📸/g, '<i class="fas fa-camera" style="color: var(--color-warning); margin-right: 8px;"></i>')
            .replace(/💾/g, '<i class="fas fa-save" style="color: var(--color-info); margin-right: 8px;"></i>')
            .replace(/✏️/g, '<i class="fas fa-edit" style="color: var(--color-primary); margin-right: 8px;"></i>')
            .replace(/📎/g, '<i class="fas fa-paperclip" style="color: var(--color-gray-600); margin-right: 8px;"></i>')
            .replace(/✅/g, '<i class="fas fa-check-circle" style="color: var(--color-success); margin-right: 8px;"></i>')
            .replace(/⚠️/g, '<i class="fas fa-exclamation-triangle" style="color: var(--color-warning); margin-right: 8px;"></i>')
            .replace(/📞/g, '<i class="fas fa-phone" style="color: var(--color-info); margin-right: 8px;"></i>')
            .replace(/📧/g, '<i class="fas fa-envelope" style="color: var(--color-primary); margin-right: 8px;"></i>')
            .replace(/🎯/g, '<i class="fas fa-bullseye" style="color: var(--color-danger); margin-right: 8px;"></i>')
            .replace(/💰/g, '<i class="fas fa-money-bill-wave" style="color: var(--color-success); margin-right: 8px;"></i>')
            .replace(/📋/g, '<i class="fas fa-clipboard-list" style="color: var(--color-primary); margin-right: 8px;"></i>')
            .replace(/📲/g, '<i class="fab fa-whatsapp" style="color: #25D366; margin-right: 8px;"></i>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '<span style="color: var(--color-primary); margin-right: 8px;">•</span>');
        
        // Adicionar estilo geral aos requisitos
        requisitosElement.innerHTML = `
            <div style="background: linear-gradient(135deg, var(--color-primary-50), var(--color-gray-50)); 
                        padding: 20px; 
                        border-radius: 12px; 
                        border-left: 4px solid var(--color-primary);
                        margin-top: 10px;">
                ${formattedRequisitos}
            </div>
        `;
    } else {
        requisitosElement.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--color-gray-500);">
                <i class="fas fa-clipboard-check" style="font-size: 48px; color: var(--color-gray-300); margin-bottom: 15px; display: block;"></i>
                <p>Sem requisitos específicos para este evento.</p>
            </div>
        `;
    }
    
    // Link afiliado com ícone colorido
    const linkBtn = document.getElementById('detailLinkAfiliado');
    if (linkBtn && evento.linkAfiliado) {
        linkBtn.href = evento.linkAfiliado;
        linkBtn.style.display = 'flex';
        linkBtn.innerHTML = '<i class="fas fa-dice" style="color: var(--color-warning); margin-right: 10px;"></i> Criar conta';
        
        // Adicionar efeito hover
        linkBtn.style.transition = 'all 0.3s ease';
        linkBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        };
        linkBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        };
    } else if (linkBtn) {
        linkBtn.style.display = 'none';
    }
    
    // Adicionar botão para ver vencedores (se houver) com ícone colorido
    if (evento.vencedores && Object.keys(evento.vencedores).length > 0) {
        const footer = document.querySelector('#modalEvento .modal-footer');
        const verVencedoresBtn = document.createElement('button');
        verVencedoresBtn.className = 'btn btn-success btn-full';
        verVencedoresBtn.style.marginBottom = '10px';
        verVencedoresBtn.style.background = 'linear-gradient(135deg, var(--color-warning), var(--color-warning-dark))';
        verVencedoresBtn.innerHTML = '<i class="fas fa-trophy" style="color: #FFD700; margin-right: 8px;"></i> Ver Vencedores';
        verVencedoresBtn.onclick = function() {
            mostrarVencedoresModal(eventoId);
        };
        
        // Adicionar efeito hover ao botão
        verVencedoresBtn.style.transition = 'all 0.3s ease';
        verVencedoresBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
        };
        verVencedoresBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        };
        
        if (footer) {
            // Remover botão anterior se existir
            const btnAnterior = footer.querySelector('.btn-success');
            if (btnAnterior) btnAnterior.remove();
            
            footer.insertBefore(verVencedoresBtn, footer.firstChild);
        }
    }
    
    // Adicionar cores personalizadas aos títulos das seções
    const sections = document.querySelectorAll('.detail-section h3, .detail-section h4');
    sections.forEach(section => {
        const icon = section.querySelector('i');
        if (icon) {
            if (section.textContent.includes('Premiação')) {
                icon.style.color = 'var(--color-warning)';
            } else if (section.textContent.includes('Requisitos')) {
                icon.style.color = 'var(--color-primary)';
            } else if (section.textContent.includes('Como participar')) {
                icon.style.color = 'var(--color-info)';
            } else if (section.textContent.includes('Se Cadastre')) {
                icon.style.color = 'var(--color-danger)';
            }
        }
    });
    
    // Adicionar cor ao ícone do casino
    const casinoIcon = document.querySelector('.casino-section i');
    if (casinoIcon) {
        casinoIcon.style.color = 'var(--color-danger)';
    }
    
    document.getElementById('modalEvento').classList.add('active');
    
    // Adicionar efeito de entrada
    setTimeout(() => {
        const modalContent = document.querySelector('#modalEvento .modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }
    }, 50);
}
// ============================================================
// FUNÇÕES AUXILIARES (do primeiro arquivo)
// ============================================================

/**
 * Função para mostrar vencedores (adicione se necessário)
 */
function mostrarVencedoresModal(eventoId) {
    // Implemente esta função se precisar
    console.log('Mostrar vencedores do evento:', eventoId);
    Swal.fire({
        icon: 'info',
        title: 'Vencedores',
        text: 'Funcionalidade em desenvolvimento',
        confirmButtonText: 'OK'
    });
}

// ... Continue com o restante do código do primeiro arquivo
// (handleComprovante, enviarParticipacao, validarEmail, etc.)
/**
 * Fechar modal de detalhes
 */
function closeModalEvento() {
    document.getElementById('modalEvento').classList.remove('active');
}

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

// ============================================================
// PARTICIPAÇÃO
// ============================================================

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