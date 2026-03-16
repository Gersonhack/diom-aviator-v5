

        // ===== LÓGICA DA CALCULADORA =====
        function processData() {
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

            setTimeout(() => {
                try {
                    // Extrair número da rodada
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
                    if (!roundNumber) throw new Error('Número da rodada não encontrado (precisa ter 6 a 9 dígitos).');

                    // Extrair multiplicador
                    let multiplier = 1.0;
                    const multiplierMatch = input.match(/(\d+(?:[.,]\d+)?)\s*x/i);
                    if (multiplierMatch) {
                        multiplier = parseFloat(multiplierMatch[1].replace(',', '.'));
                    } else {
                        const possibleMultiplier = input.match(/(\d+[.,]\d+)/);
                        if (possibleMultiplier) {
                            multiplier = parseFloat(possibleMultiplier[1].replace(',', '.'));
                        }
                    }

                    // Definir finais e estilo do card
                    let preferredEndings;
                    let cardColorClass;
                    let cardText;
                    if (multiplier >= 10) {
                        preferredEndings = [3, 5, 8, 9];
                        cardColorClass = 'pink-card';
                        cardText = 'BUSCAR ROSAS';
                    } else {
                        preferredEndings = [0,1,2,3,4,5,6,7,8,9];
                        cardColorClass = 'purple-card';
                        cardText = 'BUSCAR ROXOS';
                    }

                    // Gerar números futuros (maiores que a rodada) com os finais permitidos
                    const generatedNumbers = generateFutureNumbersWithEndings(roundNumber, preferredEndings, 6);

                    const firstBlock = generatedNumbers.slice(0, 3);
                    const secondBlock = generatedNumbers.slice(3, 6);

                    loading.style.display = 'none';
                    displayResults(roundNumber, firstBlock, secondBlock, cardColorClass, cardText);
                } catch (error) {
                    loading.style.display = 'none';
                    showError(error.message || 'Erro ao processar.');
                }
            }, 500);
        }

        function generateFutureNumbersWithEndings(baseNumber, allowedEndings, count) {
            const results = [];
            let candidate = baseNumber + 1;
            while (results.length < count) {
                const lastDigit = candidate % 10;
                if (allowedEndings.includes(lastDigit)) {
                    results.push(candidate);
                }
                candidate++;
                // limite de segurança
                if (candidate > baseNumber + 1000) break;
            }
            return results; // já em ordem crescente
        }

        function displayResults(originalRound, firstBlock, secondBlock, cardClass, cardText) {
            const output = document.getElementById('out');
            const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            const originalCard = document.createElement('div');
            originalCard.className = `result-card fade-up ${cardClass}`;
            originalCard.innerHTML = `
                <div class="result-header">🎯 RODADA ANALISADA</div>
                <div style="font-size: 24px; font-weight: 800; color: var(--primary); text-align: center; letter-spacing: 2px;">${formatNum(originalRound)}</div>
                <div style="text-align: center; margin-top: 12px;"><span class="badge-success">${cardText}</span></div>
            `;
            output.appendChild(originalCard);

            const firstCard = document.createElement('div');
            firstCard.className = `result-card fade-up ${cardClass}`;
            firstCard.innerHTML = `
                <div class="result-header">🔥 PRIMEIRO GRUPO</div>
                <div class="numbers-grid">
                    <div class="number-item"><div class="number-label">PRIMEIRA</div><div class="number-value">${formatNum(firstBlock[0])}</div></div>
                    <div class="number-item"><div class="number-label">SEGUNDA</div><div class="number-value">${formatNum(firstBlock[1])}</div></div>
                    <div class="number-item"><div class="number-label">TERCEIRA</div><div class="number-value">${formatNum(firstBlock[2])}</div></div>
                </div>
            `;
            output.appendChild(firstCard);

            const secondCard = document.createElement('div');
            secondCard.className = `result-card fade-up ${cardClass}`;
            secondCard.innerHTML = `
                <div class="result-header">⚡ SEGUNDO GRUPO</div>
                <div class="numbers-grid">
                    <div class="number-item"><div class="number-label">QUARTA</div><div class="number-value">${formatNum(secondBlock[0])}</div></div>
                    <div class="number-item"><div class="number-label">QUINTA</div><div class="number-value">${formatNum(secondBlock[1])}</div></div>
                    <div class="number-item"><div class="number-label">SEXTA</div><div class="number-value">${formatNum(secondBlock[2])}</div></div>
                </div>
            `;
            output.appendChild(secondCard);

            const tipCard = document.createElement('div');
            tipCard.className = `result-card fade-up ${cardClass}`;
            tipCard.innerHTML = `
                <div class="result-header">💡 RECOMENDAÇÃO</div>
                <div style="text-align: center; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">Utilize estas 6 projeções como referência para suas análises. O algoritmo prioriza sequências com maior probabilidade estatística.</div>
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
                <div style="text-align: center; color: #ff4444; font-size: 15px;">${message}</div>
            `;
            output.appendChild(errorCard);
        }

        function clearData() {
            document.getElementById('input').value = '';
            document.getElementById('out').innerHTML = '';
            document.getElementById('loading').style.display = 'none';
            document.getElementById('input').focus();
        }

        function loadExample() {
           // document.getElementById('input').value = '3968320 4.55x 12:23:09';
            document.getElementById('input').focus();
        }

        // Criar partículas
        (function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                p.style.width = (Math.random() * 4 + 1) + 'px';
                p.style.height = p.style.width;
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 15 + 's';
                p.style.animationDuration = (Math.random() * 15 + 15) + 's';
                container.appendChild(p);
            }
        })();

        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(loadExample, 1000);
            setTimeout(processData, 3000);
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') processData();
        });
        window.addEventListener('load', () => document.getElementById('input').focus());
    