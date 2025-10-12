import { Logout } from '/src/components/UI/buttons/logout.js';


import { NavbarTop } from '/src/components/UI/navbar/navbarTop.component.js';
import { AccessVerification } from '/src/_config/veri.js';
import { ModalAfiliad } from '/src/components/UI/modal/Modal.afiliad.js'
import { Modalcurso } from '/src/components/UI/modal/modal.curso.js'

import { Modalcalc } from '/src/components/UI/modal/Modal.calc.js'

import { Modalsocial } from '/src/components/UI/modal/Modal.socil.js'

import  { Profile } from '/src/components/profile/Modal.profile.js'

import { Live } from '/src/components/UI/modal/Modal.live.js'

import 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'




export class NexusBotPage{
  
  render() {
      
      
const accessVerification = new AccessVerification();

    const logout = new Logout()
    const navbartop = new NavbarTop()
    const modalafiliad = new ModalAfiliad()
    const modalcurso = new Modalcurso()
    const modalcalc = new Modalcalc()
    const modalsocial = new Modalsocial()
    const profile = new Profile()
    const live = new Live()
    const html = `
    
<section class="containerN">
  <!-- Loading Nexus bot -->
  <div class="bgloading" id="bgL">

  </div>

  ${navbartop.render()}
  ${modalafiliad.render()}
  ${modalcurso.render()}
  ${modalcalc.render()}
  ${modalsocial.render()}
  ${profile.render()}
  ${live.render()}

  <!-- Blur screen ofuscator -->
  <div class="ofus" id="blur">
  
  </div>

  <div class="container"></div>

  <div class="app-card">
    <div class="app-header">
     <img class="logoFb" src="/src/assents/imgs/Logo.jpg" alt="logo">
      <p>Gerador De Sinais</p>
    </div>

    <div class="form-container">
      <div class="margin-group">
        <div class="input-group">
          <label class="label" for="optionselect">
            <i class="fas fa-dice text-warning text-1xl mr-4"></i>
            Casa de Apostas
          </label>
          <select id="optionselect" required>
            <option value="" selected disabled>Escolha a casa de apostas</option>
            <option value="1">ESPORTIVABET</option>
            <option value="2">Modo Lucro</option>
          </select>
        </div>

        <div class="input-group part2">
          <input class="modo" type="text" data-vaz="modo fast" readonly="readonly" id="selectedcontent" />
          <span id="livetime">12:34:15</span>

          <section class="auto-generate-container">
            <label class="switch">
              <input type="checkbox" id="autoGenerate" />
              <span class="slider"></span>
            </label>
            <span class="auto-generate-label">Auto</span>
          </section>
        </div>
      </div>

      <div class="box-group2">
        <label class="label" for="selectNumber">
          <i class="fas fa-chart-line text-warning text-1xl mr-4"></i>
          Sinais De Possibilidade
        </label>
        <div class="select-button-group">
          <select class="input" id="selectNumber">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="300">300</option>
            <option value="1000">1000</option>
          </select>
          <button class="custom-btn btn-2" type="button" id="btnAdicionar">Gerar</button>
        </div>
      </div>
    </div>
  </div>

  <form action="/generate">
    <div class="results-container">
      <div class="result-section">
        <h2 class="title"><i class="fas fa-list"></i> Resultado Busca</h2>
        <ul id="lista2" class="signal-list">
          <div class="grid-background"></div>
        </ul>
      </div>

      <div class="result-section">
        <h2 class="title">
         <i class="fas fa-th"></i>
        Conjunção De Dados Semanas</h2>
        <ul id="lista1" class="signal-list">
          <div class="loader-wrapper">
            <span class="loader-letter">D</span>
            <span class="loader-letter">I</span>
            <span class="loader-letter">O</span>
            <span class="loader-letter">M</span>
            <span class="loader-letter">.</span>
            <span class="loader-letter">A</span>
            <span class="loader-letter">V</span>
            <span class="loader-letter">I</span>
            <span class="loader-letter">A</span>
            <span class="loader-letter">T</span>
            <span class="loader-letter">O</span>
            <span class="loader-letter">R</span>
            <div class="loaderr"></div>
          </div>
        </ul>
      </div>
    </div>
  </form>

  <audio id="clickSound" src="/public/assents/music/alert-signal.wav"></audio>
  <audio id="robo" src="/public/assents/music/click.mp3"></audio>
  <audio id="house" src="/public/assents/music/house.mp3"></audio>
  <audio id="lucro" src="/public/assents/music/lucro.mp3"></audio>
  <audio id="cin" src="/public/assents/music/50x.mp3"></audio>
  <audio id="cem" src="/public/assents/music/100x.mp3"></audio>
  <audio id="tre" src="/public/assents/music/300x.mp3"></audio>
  <audio id="mil" src="/public/assents/music/1000x.mp3"></audio>
</section>


    `;
   // ${logout.render()}
    this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  }
  
 
afterRender() {
    
// Ocultar a div após 3 segundos
setTimeout(() => {
  //  console.log('open bg loader')
    document.getElementById('bgL').style.display = 'none';
   document.getElementById('navtop').classList.add('Zindex')
}, 7300);

// Logic
document.getElementById('root').classList.add('auto');

// ==========================================
// DECLARAÇÃO DE VARIÁVEIS GLOBAIS (para esta instância)
// ==========================================
let clickCount = 0;
let horasLista2 = [];
let autoGenerateInterval = null;
let isGenerating = false;
let detalhesVelas = {}; // Armazenar detalhes das velas

// ==========================================
// FUNÇÃO PARA ABRIR DETALHES DA VELA
// ==========================================

/**
 * Gera números aleatórios para os multiplicadores
 */
const gerarMultiplicadorAleatorio = (base, minDecimal, maxDecimal) => {
    const decimal = Math.floor(Math.random() * (maxDecimal - minDecimal + 1)) + minDecimal;
    return `${base}.${String(decimal).padStart(2, '0')}x`;
};

/**
 * Abre SweetAlert com detalhes da vela clicada
 */
const abrirDetalhesVela = (horaVela) => {
    const selectNumber = document.getElementById("selectNumber");
    const velaSelecionada = selectNumber ? selectNumber.value : "20";
    
    // Verificar se já existem detalhes para esta vela
    if (!detalhesVelas[horaVela]) {
        // Gerar multiplicadores aleatórios e armazenar
        detalhesVelas[horaVela] = {
            conservador: gerarMultiplicadorAleatorio(2, 50, 99),
            moderador: gerarMultiplicadorAleatorio(4, 0, 99),
            agressivo: gerarMultiplicadorAleatorio(10, 0, 99)
        };
    }
    
    const { conservador, moderador, agressivo } = detalhesVelas[horaVela];
    
    // Calcular horários para tentativas
    const [hora, minuto, segundo] = horaVela.split(':').map(Number);
    
    const dataBase = new Date();
    dataBase.setHours(hora, minuto, segundo);
    
    const umMinutoAntes = new Date(dataBase.getTime() - 60000);
    const umMinutoDepois = new Date(dataBase.getTime() + 60000);
    
    const formatarHora = (data) => {
        return `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}:${String(data.getSeconds()).padStart(2, '0')}s`;
    };
    
    const horaAntes = formatarHora(umMinutoAntes);
    const horaDepois = formatarHora(umMinutoDepois);

const htmlContent = `
    <div class="vela-details">
        <div class="text-center">
            <h3 class=""><i class="fas fa-robot robot mr-4 text-3xl "></i>
       Detalhes da Vela</h3>
<div class="vela-time ">
  <span class="animate-pulse">
  <i class="far fa-clock"></i>
  ${horaVela}
  </span>
</div>

        
        <div class="estrategia-section">
            <h4>
<span class="icon-tempo text-green-500">
  <i class="fas fa-chess"></i>
</span>

                Estratégia de Tentativas
            </h4>
            <div class="estrategia-content">
                <p><strong>Duas tentativas recomendadas:</strong></p>
                <div class="tentativas-grid">
                    <div class="tentativa-item">
                        <div class="tentativa-label">1 minuto antes</div>
                        <div class="tentativa-hora"><i class="far fa-clock text-blue-500"></i> ${horaAntes}</div>
                    </div>
                    <div class="tentativa-item">
                        <div class="tentativa-label">1 minuto depois</div>
                        <div class="tentativa-hora"><i class="far fa-clock text-blue-500"></i> ${horaDepois}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="protecao-section">
            <h4>
<span class="icon-protecao">
  <i class="fas fa-shield-alt text-blue-500"></i>
</span>

                Níveis de Proteção
            </h4>
            <div class="protecoes-list">
                <div class="protecao-item conservador">
                    <span class="protecao-label">Conservador:</span>
                    <span class="protecao-valor">${conservador}</span>
                </div>
                <div class="protecao-item moderado">
                    <span class="protecao-label">Moderado:</span>
                    <span class="protecao-valor">${moderador}</span>
                </div>
                <div class="protecao-item agressivo">
                    <span class="protecao-label">Agressivo:</span>
                    <span class="protecao-valor">${agressivo}</span>
                </div>
            </div>
        </div>
        <div class="especial-vela">
                    <h4>
  <i class="fas fa-exclamation-triangle text-warning mr-3 text-red-400"></i>
    Lembrete de Velas especiais 
            </h4>
<div class="divis">
  <span class="especial">1.00x</span>
  <span class="especial">1.01x</span>
  <span class="especial">1.02x</span>
  <span class="especial">1.03x</span>
  <span class="especial">1.04x</span>
</div>

<div class="divis">
  <span class="especial">1.05x</span>
  <span class="especial">1.07x</span>
  <span class="especial">1.10x</span>
  <span class="especial">1.11x</span>
  <span class="especial">1.12x</span>
</div>

<div class="divis">
  <span class="especial">1.14x</span>
  <span class="especial">1.15x</span>
  <span class="especial">1.18x</span>
  <span class="especial">1.20x</span>
  <span class="especial">1.36x</span>
</div>

<div class="divis">
  <span class="especial">1.37x</span>
  <span class="especial">1.38x</span>
  <span class="especial roxo">3.88x</span>
  <span class="especial">1.39x</span>
  <span class="especial">1.40x</span>
</div>

<div class="divis">
  <span class="especial">1.43x</span>
  <span class="especial">1.48x</span>
  <span class="especial">1.50x</span>
  <span class="especial">1.52x</span>
  <span class="especial">1.56x</span>
</div>

<div class="divis">
  <span class="especial">1.58x</span>
  <span class="especial">1.60x</span>
  <span class="especial">1.66x</span>
  <span class="especial">1.70x</span>
  <span class="especial">1.71x</span>
</div>

<div class="divis">
  <span class="especial">1.73x</span>
  <span class="especial">1.77x</span>
  <span class="especial">1.88x</span>
  <span class="especial">1.98x</span>
  <span class="especial">1.99x</span>
  <span class="especial roxo">2.88x</span>
</div>


        </div>
        <div class="multiplicador-section">
            <h4>
                <span class="icon-multiplicador"><i class="fas fa-chart-line text-purple-500"></i></span>
                Multiplicador Possível
            </h4>
            <div class="multiplicador-content">
                <div class="multiplicador-valor">${velaSelecionada}x</div>
                <div class="multiplicador-desc">Baseado na vela selecionada</div>
            </div>
        </div>
    </div>
`;

    // Abrir SweetAlert com tema dark
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Detalhes do Sinal',
            html: htmlContent,
            width: 500,
            padding: '20px',
            background: '#1f2937',
            color: '#ffffff',
            customClass: {
                popup: 'rounded-2xl shadow-2xl border border-gray-700',
                title: 'text-2xl font-bold mb-4 text-white',
                confirmButton: 'bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors',
                closeButton: 'text-gray-400 hover:text-white'
            },
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#7c3aed',
            buttonsStyling: true,
            focusConfirm: false
        });
    } else {
        alert(`Detalhes da Vela: ${horaVela}\n\nEstratégia: Duas tentativas\n• 1min antes: ${horaAntes}\n• 1min depois: ${horaDepois}\n\nProteção:\n• Conservador: ${conservador}\n• Moderado: ${moderador}\n• Agressivo: ${agressivo}\n\nPossível: ${velaSelecionada}x`);
    }
};

// ==========================================
// FUNÇÕES DE GERAÇÃO DE SINAIS
// ==========================================

/**
 * Função principal para adicionar itens às listas
 */
const adicionarItem = () => {
    const selectNumber = document.getElementById("selectNumber");
    const numRepeticoes = parseInt(selectNumber.value);
    
    const lista1 = document.getElementById("lista1");
    const lista2 = document.getElementById("lista2");
    
    // Limpar lista1
    lista1.innerHTML = "";
    
    const horarios = [];
    
    // Determinar número de repetições
    const totalRepeticoes = isNaN(numRepeticoes) || numRepeticoes === 0 ? 40 : numRepeticoes;
    
    // Gerar horários aleatórios para lista1
    for (let i = 0; i < totalRepeticoes; i++) {
        const hora = gerarHoraAleatoria();
        const cor = gerarCorAleatoria();
        
        const li = document.createElement("li");
        li.classList.add("custom");
        li.style.backgroundColor = cor;
        li.appendChild(document.createTextNode(hora));
        lista1.appendChild(li);
        
        horarios.push(hora);
    }
    
    // Ordenar horários
    horarios.sort();
    
    // Obter hora atual
    const horaAtual = new Date();
    const horaAtualCentralizada = horaAtual.getHours();
    const minutoAtual = horaAtual.getMinutes();
    const segundoAtual = horaAtual.getSeconds();
    
    // **VOLTAR À LÓGICA ORIGINAL: Adicionar à lista2 a cada 40 cliques**
    if (clickCount % 40 === 0) {
        const novaHoraLista2 = gerarHoraLista2(
            horaAtualCentralizada,
            minutoAtual,
            segundoAtual
        );
        
        if (horaMaiorOuIgual(horaAtualCentralizada, minutoAtual, segundoAtual, novaHoraLista2)) {
            horasLista2.push(novaHoraLista2);
            
            const li = document.createElement("li");
            li.classList.add("pinkbackground");
            li.appendChild(document.createTextNode(novaHoraLista2));
            
            // ADICIONAR EVENT LISTENER PARA CLIQUE
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                abrirDetalhesVela(novaHoraLista2);
            });
            
            lista2.appendChild(li);
        }
    }
    
    clickCount++;
};

/**
 * Verifica se uma hora é maior ou igual à hora atual
 */
const horaMaiorOuIgual = (horaAtual, minutoAtual, segundoAtual, hora) => {
    const horaSeparada = hora.split(":");
    const horaLista2 = parseInt(horaSeparada[0]);
    const minutoLista2 = parseInt(horaSeparada[1]);
    const segundoLista2 = parseInt(horaSeparada[2]);
    
    return (
        horaLista2 > horaAtual ||
        (horaLista2 === horaAtual && minutoLista2 > minutoAtual)
    );
};

/**
 * Gera uma hora aleatória no formato HH:MM:SS
 */
const gerarHoraAleatoria = () => {
    let hora = Math.floor(Math.random() * 24);
    let minuto = Math.floor(Math.random() * 60);
    let segundo = Math.floor(Math.random() * 60);
    
    hora = hora < 10 ? "0" + hora : hora;
    minuto = minuto < 10 ? "0" + minuto : minuto;
    segundo = segundo < 10 ? "0" + segundo : segundo;
    
    return hora + ":" + minuto + ":" + segundo;
};

/**
 * Gera uma cor aleatória da paleta definida
 */
const gerarCorAleatoria = () => {
    const cores = ["#81007f", "#3289ba", "#D3076D"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    
    return corAleatoria;
};

/**
 * Gera hora para lista2 baseada na hora atual
 */
const gerarHoraLista2 = (horaAtualCentralizada, minutoAtual, segundoAtual) => {
    const hora = horaAtualCentralizada;
    const minuto = Math.floor(Math.random() * (60 - minutoAtual)) + minutoAtual;
    const segundo = Math.floor(Math.random() * 60);
    
    // Tocar som de alerta
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        clickSound.play();
    }
    
    // Formatar hora
    const horaFormatada = hora < 10 ? "0" + hora : hora;
    const minutoFormatado = minuto < 10 ? "0" + minuto : minuto;
    const segundoFormatado = segundo < 10 ? "0" + segundo : segundo;
    
    // **VOLTAR AO TOASTIFY ORIGINAL**
    // Exibir notificação
    if (typeof Toastify !== 'undefined') {
        Toastify({
            text: "Signal: " + horaFormatada + ":" + minutoFormatado + ":" + segundoFormatado + "s",
            duration: 5000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {},
            onClick: function() {}
        }).showToast();
    }
    
    return horaFormatada + ":" + minutoFormatado + ":" + segundoFormatado;
};

// ==========================================
// FUNÇÕES DE AUTO-GERAÇÃO
// ==========================================

/**
 * Inicia a geração automática de sinais
 */
const iniciarAutoGeracao = () => {
    if (isGenerating) return;
    
    isGenerating = true;
    const btnAdicionar = document.getElementById("btnAdicionar");
    
    // Alterar texto do botão
    if (btnAdicionar) {
        btnAdicionar.textContent = "Gerando...";
        btnAdicionar.disabled = true;
    }
    
    // Gerar imediatamente
    adicionarItem();
    
    // **VOLTAR À VELOCIDADE ORIGINAL: 200ms**
    autoGenerateInterval = setInterval(function() {
        adicionarItem();
    }, 200);
};

/**
 * Para a geração automática de sinais
 */
const pararAutoGeracao = () => {
    if (!isGenerating) return;
    
    isGenerating = false;
    const btnAdicionar = document.getElementById("btnAdicionar");
    
    // Restaurar texto do botão
    if (btnAdicionar) {
        btnAdicionar.textContent = "Gerar";
        btnAdicionar.disabled = false;
    }
    
    // Limpar intervalo
    if (autoGenerateInterval) {
        clearInterval(autoGenerateInterval);
        autoGenerateInterval = null;
    }
};

/**
 * Manipula mudanças no checkbox de auto-geração
 */
const handleAutoGenerateChange = (event) => {
    const isChecked = event.target.checked;
    
    if (isChecked) {
        iniciarAutoGeracao();
        const input = document.getElementById('selectedcontent');
        if (input && input.value === '') {
            input.value = 'Modo lucro';
        }
    } else {
        pararAutoGeracao();
    }
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

/**
 * Toca som do robô
 */
const robo = () => {
    const roboSound = document.getElementById("robo");
    if (roboSound) {
        roboSound.play();
    }
};

/**
 * Atualiza status do input select
 */
const atualizarStatusInput = () => {
    const input = document.getElementById('selectedcontent');
    if (input && input.value === '') {
        input.value = 'Modo lucro ';
    }
};

// ==========================================
// EVENT LISTENERS
// ==========================================

// Botão de adicionar item
const btnAdicionar = document.getElementById("btnAdicionar");
if (btnAdicionar) {
    btnAdicionar.addEventListener("click", adicionarItem);
}

// Checkbox de auto-geração
const autoGenerateCheckbox = document.getElementById("autoGenerate");
if (autoGenerateCheckbox) {
    autoGenerateCheckbox.addEventListener("change", handleAutoGenerateChange);
}

// Botão de voltar
const btnBack = document.getElementById('btn');
if (btnBack) {
    btnBack.addEventListener('click', function() {
        window.history.back();
    });
}

// ==========================================
// Choose Type Vela
// ==========================================
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        // Handler para botão adicionar com jQuery
        $('#btnAdicionar').on('click', function() {
            atualizarStatusInput();
        });
        
        // Handler para mudança no select de números
        $("#selectNumber").change(function() {
            const values = $("#selectNumber option:selected").text();
            
const cin = document.getElementById("cin");
const tre = document.getElementById("tre"); 
const mil = document.getElementById("mil");
const cem = document.getElementById("cem");


if (values === "50") {
    cin.play();
} else if (values === "300") {
    tre.play();
}  if (values === "1000") {
    mil.play()
}else if(values == "100"){
    cem.play()
}
            // RESETAR LISTA2 quando mudar o número
            var lista2 = document.getElementById("lista2");
            if (lista2) {
                lista2.innerHTML = ""; // Limpar toda a lista2
            }
            horasLista2 = []; // Resetar array de horas
            clickCount = 0; // Resetar contador de cliques
            detalhesVelas = {}; // Limpar detalhes das velas
            
            if (typeof Toastify !== 'undefined') {
                Toastify({
                    text: "vela: " + values + "x",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        width: '150px',
                    },
                    onClick: function() {}
                }).showToast();
            }
            
            
        });
        
        // Handler para mudança no select de opções
        $("#optionselect").change(function() {
            const values = $("#optionselect option:selected").text();
$("#selectedcontent").val(values);

const house = document.getElementById("house");
const robo = document.getElementById("robo"); // supondo que você tenha um elemento com id "robo" para o som do robô
const lucro = document.getElementById("lucro"); // supondo que você tenha um elemento com id "lucro" para o som do lucro

if (values === "ESPORTIVABET") {
    house.play();
} else if (values === "Modo Lucro") {
    lucro.play();
} 

if (typeof Toastify !== 'undefined') {
                Toastify({
                    text: values,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                     width: '150px',   
                    },
                    onClick: function() {}
                }).showToast();
            }
            
            robo();
        });
    });
}

// ==========================================
// ADICIONAR EVENT LISTENERS PARA VELAS EXISTENTES
// ==========================================

setTimeout(() => {
    const velasLista2 = document.querySelectorAll('#lista2 .pinkbackground');
    velasLista2.forEach(vela => {
        vela.style.cursor = 'pointer';
        vela.addEventListener('click', () => {
            abrirDetalhesVela(vela.textContent);
        });
    });
}, 1000);

// ==========================================
// ATUALIZAÇÃO DO TEMPO
// ==========================================

function updateTime() {
    const timeElement = document.getElementById('livetime');
    
    if (!timeElement) {
        clearInterval(timeInterval);
        return;
    }
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeElement.innerHTML = `<i class="fas fa-clock"></i> ${hours}:${minutes}:${seconds}s`;
}

let timeInterval = setInterval(updateTime, 1000);

}//after
}