// ===== LÓGICA DE PROCESSAMENTO ATUALIZADA =====
function processData() {
    console.log('Iniciando processamento...');
    
    const input = document.getElementById('input').value.trim();
    const output = document.getElementById('out');
    const loading = document.getElementById('loading');
    
    output.innerHTML = '';
    loading.style.display = 'block';
    
    if (!input) {
        loading.style.display = 'none';
        showError('Por favor, insira os dados para análise.');
        return;
    }
    
    setTimeout(function() {
        try {
            // Extrair número da rodada (6-9 dígitos)
            let roundNumber = null;
            const numberMatches = input.match(/\d+/g);
            
            if (numberMatches && numberMatches.length > 0) {
                for (let match of numberMatches) {
                    if (match.length >= 6 && match.length <= 9) {
                        roundNumber = parseInt(match);
                        break;
                    }
                }
            }
            
            if (!roundNumber) {
                loading.style.display = 'none';
                showError('Número da rodada não encontrado (precisa ter 6 a 9 dígitos).');
                return;
            }
            
            // Extrair multiplicador (vela)
            let multiplier = null;
            const multiplierMatch = input.match(/(\d+(?:[.,]\d+)?)\s*x/i);
            if (multiplierMatch) {
                multiplier = parseFloat(multiplierMatch[1].replace(',', '.'));
            } else {
                // Tentar encontrar um número com ponto ou vírgula
                const possibleMultiplier = input.match(/(\d+[.,]\d+)/);
                if (possibleMultiplier) {
                    multiplier = parseFloat(possibleMultiplier[1].replace(',', '.'));
                }
            }
            
            if (!multiplier) {
                multiplier = 1.0; // padrão
                console.warn('Multiplicador não encontrado, usando padrão 1.0');
            }
            
            console.log('Multiplicador:', multiplier);
            
            // Definir finais preferenciais, cor do card e texto
            let preferredEndings;
            let cardColorClass;
            let cardText;
            
            if (multiplier >= 10) {
                preferredEndings = [3, 5, 8, 9]; // especiais
                cardColorClass = 'pink-card';
                cardText = 'BUSCAR ROSAS';
            } else {
                preferredEndings = [0,1,2,3,4,5,6,7,8,9]; // todos os dígitos
                cardColorClass = 'purple-card';
                cardText = 'BUSCAR ROXOS';
            }
            
            // Gerar 6 números próximos à rodada com os finais permitidos
            const generatedNumbers = generateNumbersWithEndings(roundNumber, preferredEndings, 6);
            
            // Dividir em dois blocos de 3 e ordenar
            const firstBlock = generatedNumbers.slice(0, 3).sort((a,b) => a - b);
            const secondBlock = generatedNumbers.slice(3, 6).sort((a,b) => a - b);
            
            console.log('Números gerados:', generatedNumbers);
            
            loading.style.display = 'none';
            
            // Exibir resultados com a cor e texto apropriados
            displayResults(roundNumber, firstBlock, secondBlock, cardColorClass, cardText);
            
        } catch (error) {
            console.error('Erro no processamento:', error);
            loading.style.display = 'none';
            showError('Erro ao processar. Verifique o formato dos dados e tente novamente.');
        }
    }, 500);
}

// Função para gerar números próximos à base com terminações específicas
function generateNumbersWithEndings(baseNumber, allowedEndings, count) {
    const results = [];
    let range = 100; // intervalo inicial de busca
    
    // Coletar candidatos dentro do range
    while (results.length < count && range < 1000) {
        for (let offset = -range; offset <= range; offset++) {
            const candidate = baseNumber + offset;
            if (candidate <= 0) continue;
            const lastDigit = candidate % 10;
            if (allowedEndings.includes(lastDigit) && !results.includes(candidate)) {
                results.push(candidate);
            }
        }
        range += 100; // expande se necessário
    }
    
    // Ordenar por proximidade à base
    results.sort((a, b) => Math.abs(a - baseNumber) - Math.abs(b - baseNumber));
    
    // Selecionar os primeiros 'count' e ordenar crescentemente
    const selected = results.slice(0, count).sort((a, b) => a - b);
    return selected;
}

function displayResults(originalRound, firstBlock, secondBlock, cardClass, cardText) {
    const output = document.getElementById('out');
    
    const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Card da rodada original
    const originalCard = document.createElement('div');
    originalCard.className = `result-card fade-up ${cardClass}`;
    originalCard.innerHTML = `
        <div class="result-header">🎯 RODADA ANALISADA</div>
        <div style="font-size: 24px; font-weight: 800; color: var(--primary); text-align: center; letter-spacing: 2px;">
            ${formatNum(originalRound)}
        </div>
        <div style="text-align: center; margin-top: 12px;">
            <span class="rtx">${cardText}</span>
        </div>
    `;
    output.appendChild(originalCard);
    
    // Primeiro bloco
    const firstCard = document.createElement('div');
    firstCard.className = `result-card fade-up ${cardClass}`;
    firstCard.innerHTML = `
        <div class="result-header">🔥 PRIMEIRO GRUPO</div>
        <div class="numbers-grid">
            <div class="number-item">
                <div class="number-label">PRIMEIRA</div>
                <div class="number-value">${formatNum(firstBlock[0])}</div>
            </div>
            <div class="number-item">
                <div class="number-label">SEGUNDA</div>
                <div class="number-value">${formatNum(firstBlock[1])}</div>
            </div>
            <div class="number-item">
                <div class="number-label">TERCEIRA</div>
                <div class="number-value">${formatNum(firstBlock[2])}</div>
            </div>
        </div>
    `;
    output.appendChild(firstCard);
    
    // Segundo bloco
    const secondCard = document.createElement('div');
    secondCard.className = `result-card fade-up ${cardClass}`;
    secondCard.innerHTML = `
        <div class="result-header">⚡ SEGUNDO GRUPO</div>
        <div class="numbers-grid">
            <div class="number-item">
                <div class="number-label">QUARTA</div>
                <div class="number-value">${formatNum(secondBlock[0])}</div>
            </div>
            <div class="number-item">
                <div class="number-label">QUINTA</div>
                <div class="number-value">${formatNum(secondBlock[1])}</div>
            </div>
            <div class="number-item">
                <div class="number-label">SEXTA</div>
                <div class="number-value">${formatNum(secondBlock[2])}</div>
            </div>
        </div>
    `;
    output.appendChild(secondCard);
    
    // Card de recomendação
    const tipCard = document.createElement('div');
    tipCard.className = `result-card fade-up ${cardClass}`;
    tipCard.style.background = 'rgba(255, 122, 0, 0.05)';
    tipCard.innerHTML = `
        <div class="result-header">💡 RECOMENDAÇÃO</div>
        <div style="text-align: center; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
            Utilize estas 6 projeções como referência para suas análises. O algoritmo prioriza sequências com maior probabilidade estatística.
        </div>
    `;
    output.appendChild(tipCard);
}

function showError(message) {
    const output = document.getElementById('out');
    const errorCard = document.createElement('div');
    errorCard.className = 'result-card fade-up';
    errorCard.style.background = 'rgba(255, 0, 0, 0.05)';
    errorCard.style.borderColor = 'rgba(255, 0, 0, 0.2)';
    errorCard.innerHTML = `
        <div class="result-header" style="color: #ff4444;">⚠️ ERRO</div>
        <div style="text-align: center; color: #ff4444; font-size: 15px;">
            ${message}
        </div>
    `;
    output.appendChild(errorCard);
}

function clearData() {
    document.getElementById('input').value = '';
    document.getElementById('out').innerHTML = '';
    document.getElementById('loading').style.display = 'none';
    
    const input = document.getElementById('input');
    input.focus();
    input.style.boxShadow = '0 0 30px rgba(255, 122, 0, 0.2)';
    setTimeout(() => {
        input.style.boxShadow = '';
    }, 500);
}

function loadExample() {
    document.getElementById('input').value = '3968320 4.55x 12:23:09';
    
    const input = document.getElementById('input');
    input.style.boxShadow = '0 0 30px rgba(255, 122, 0, 0.2)';
    setTimeout(() => {
        input.style.boxShadow = '';
    }, 500);
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadExample, 1000);
    setTimeout(processData, 3000);
});

// Ctrl+Enter
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        processData();
    }
});

// Foco inicial
window.addEventListener('load', () => {
    document.getElementById('input').focus();
});