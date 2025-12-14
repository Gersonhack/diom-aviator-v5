// ============================================================
// CARREGAR EVENTOS (Mantido no primeiro arquivo)
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
        renderEventos(); // Esta função agora está no segundo arquivo
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

// ============================================================
// DETALHES DO EVENTO
// ============================================================

/**
 * Abrir modal com detalhes do evento
 * REMOVER esta função do primeiro arquivo pois ela está definida no segundo
 */
/*
function abrirDetalhesEvento(eventoId) {
    // ... código removido
}
*/

/**
 * Fechar modal de detalhes (Mantido)
 */
function closeModalEvento() {
    document.getElementById('modalEvento').classList.remove('active');
}