/**
 * SISTEMA DE EVENTOS DE SORTEIO
 * Configuração Firebase
 * 
 * Este arquivo contém a configuração do Firebase para o sistema de eventos.
 * Substitua os valores pelos dados reais do seu projeto Firebase.
 */

// ============================================================
// CONFIGURAÇÃO FIREBASE
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyB_wnuKZfpXFPtjCGoSdqshPJ99jKLbnSQ",
  authDomain: "baco-dados-ghost.firebaseapp.com",
  databaseURL: "https://baco-dados-ghost-default-rtdb.firebaseio.com",
  projectId: "baco-dados-ghost",
  storageBucket: "baco-dados-ghost.appspot.com",
  messagingSenderId: "223550098785",
  appId: "1:223550098785:web:27f4aa50b80db006d44920"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências globais do Firebase
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
console.log("storage:", storage)
//const storage = getStorage(); 
// ============================================================
// CONSTANTES DO SISTEMA
// ============================================================

const ADMIN_EMAIL = 'root@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// Caminhos do Realtime Database
const DB_PATHS = {
    EVENTOS: 'eventos',
    PARTICIPANTES: 'participantes',
    COMPROVANTES: 'comprovantes',
    USUARIOS: 'usuarios'
};

// Caminhos do Storage
const STORAGE_PATHS = {
    COMPROVANTES: 'comprovantes/',
    EVENTOS: 'eventos/'
};

// ============================================================
// ESTRUTURA DO BANCO DE DADOS
// ============================================================

/**
 * EVENTOS
 * 
 * eventos/
 * ├── evento_001/
 * │   ├── id: "evento_001"
 * │   ├── titulo: "Sorteio PIX"
 * │   ├── descricao: "Sorteio de PIX para novos usuários"
 * │   ├── dataInicio: 1702000000000
 * │   ├── dataFim: 1702086400000
 * │   ├── status: "ativo" | "encerrado" | "cancelado"
 * │   ├── premiacao: [
 * │   │   { lugar: "1°", valor: 50 },
 * │   │   { lugar: "2°", valor: 40 }
 * │   │ ]
 * │   ├── requisitos: "Deposite R$25,00 e envie comprovante"
 * │   ├── linkAfiliado: "https://go.aff.hanz.bet/1emoczbc"
 * │   ├── suporte: {
 * │   │   whatsapp: "(32)999432590",
 * │   │   email: "suporte@exemplo.com"
 * │   │ }
 * │   ├── totalParticipantes: 42
 * │   ├── criadoEm: 1701913600000
 * │   └── atualizadoEm: 1701913600000
 * │
 * └── evento_002/
 *     └── ...
 */

/**
 * PARTICIPANTES
 * 
 * participantes/
 * ├── evento_001/
 * │   ├── participante_001/
 * │   │   ├── id: "participante_001"
 * │   │   ├── eventoId: "evento_001"
 * │   │   ├── nome: "João Silva"
 * │   │   ├── email: "joao@email.com"
 * │   │   ├── telefone: "(32)999432590"
 * │   │   ├── status: "pendente" | "aprovado" | "rejeitado"
 * │   │   ├── comprovante: {
 * │   │   │   url: "https://storage.googleapis.com/...",
 * │   │   │   uploadedAt: 1702000000000,
 * │   │   │   verificadoEm: 1702086400000
 * │   │   │ }
 * │   │   ├── participacaoEm: 1702000000000
 * │   │   └── atualizadoEm: 1702000000000
 * │   │
 * │   └── participante_002/
 * │       └── ...
 * │
 * └── evento_002/
 *     └── ...
 */

/**
 * COMPROVANTES (Referência para auditoria)
 * 
 * comprovantes/
 * ├── evento_001/
 * │   ├── participante_001/
 * │   │   ├── nomeArquivo: "joao_silva_evento_001.jpg"
 * │   │   ├── url: "https://storage.googleapis.com/..."
 * │   │   ├── tamanho: 2048576
 * │   │   ├── tipo: "image/jpeg"
 * │   │   └── uploadedAt: 1702000000000
 * │   │
 * │   └── participante_002/
 * │       └── ...
 * │
 * └── evento_002/
 *     └── ...
 */

// ============================================================
// REGRAS DE SEGURANÇA DO FIREBASE
// ============================================================

/**
 * Regras sugeridas para o Realtime Database:
 * 
 * {
 *   "rules": {
 *     "eventos": {
 *       ".read": true,
 *       ".write": "auth.token.email == 'root@gmail.com'",
 *       "$eventoId": {
 *         ".read": true,
 *         ".write": "auth.token.email == 'root@gmail.com'"
 *       }
 *     },
 *     "participantes": {
 *       ".read": "auth.token.email == 'root@gmail.com'",
 *       ".write": true,
 *       "$eventoId": {
 *         ".read": "auth.token.email == 'root@gmail.com'",
 *         ".write": true,
 *         "$participanteId": {
 *           ".read": "auth.token.email == 'root@gmail.com'",
 *           ".write": true
 *         }
 *       }
 *     },
 *     "comprovantes": {
 *       ".read": "auth.token.email == 'root@gmail.com'",
 *       ".write": "auth != null"
 *     },
 *     "usuarios": {
 *       ".read": "auth != null",
 *       ".write": "auth != null"
 *     }
 *   }
 * }
 */

// ============================================================
// REGRAS DE SEGURANÇA DO STORAGE
// ============================================================

/**
 * Regras sugeridas para o Storage:
 * 
 * rules_version = '2';
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /comprovantes/{allPaths=**} {
 *       allow read: if request.auth.token.email == 'root@gmail.com';
 *       allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
 *     }
 *     match /eventos/{allPaths=**} {
 *       allow read: if true;
 *       allow write: if request.auth.token.email == 'root@gmail.com';
 *     }
 *   }
 * }
 */

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

/**
 * Gerar ID único para evento
 */
function gerarIdEvento() {
    return 'evento_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Gerar ID único para participante
 */
function gerarIdParticipante() {
    return 'participante_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Formatar data para exibição
 */
function formatarData(timestamp) {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Verificar se um evento expirou
 */
function eventoExpirou(dataFim) {
    return new Date().getTime() > dataFim;
}

/**
 * Formatar valor monetário
 */
function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Validar email
 */
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validar telefone
 */
function validarTelefone(telefone) {
    const re = /^\(\d{2}\)\d{4,5}-?\d{4}$/;
    return re.test(telefone.replace(/\s/g, ''));
}

console.log('✅ Firebase configurado com sucesso');
