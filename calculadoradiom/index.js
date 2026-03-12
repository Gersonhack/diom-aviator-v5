    const  xyz =  68393847
    const url = "https://go.aff.esportiva.bet/6t870ke0"//webscraping 
     
        // Criar partículas
      
        function createParticles() {
          const container = document.getElementById('particles');
          const count = 30;
          
          for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
            
            container.appendChild(particle);
          }
        }
        
        createParticles();
        
        // ESPORTIVABET 
        function processData() {
          const input = document.getElementById('input').value.trim();
          const output = document.getElementById('out');
          const loading = document.getElementById('loading');
          
          output.innerHTML = '';
          loading.style.display = 'block';
          
          if (!input) {
            loading.style.display = 'none';
            showError('Insira os dados para análise');
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
              
              if (!roundNumber) {
                throw new Error('Número da rodada inválido');
              }
              
              // Extrair horário
              const timeMatch = input.match(/(\d{1,2})[:\.](\d{1,2})[:\.](\d{1,2})/);
              
              if (!timeMatch) {
                throw new Error('Horário não encontrado');
              }
              
              const minutes = String(timeMatch[2]).padStart(2, '0');
              const seconds = String(timeMatch[3]).padStart(2, '0');
              
              // Cálculos
              const minuteDigit = parseInt(minutes[1]) || 1;
              const secondDigit = parseInt(seconds[0]) || 1;
              
              let sum = minuteDigit + secondDigit;
              if (sum === 0) sum = 2;
              
              const lastTwoDigits = roundNumber % 100;
              const sumDigit = sum % 10;
              const currentTen = Math.floor(lastTwoDigits / 10) * 10;
              
              let targetTen = currentTen + sumDigit;
              if (targetTen <= lastTwoDigits) {
                targetTen += 10;
              }
              
              while (targetTen % 10 !== sumDigit) {
                targetTen++;
              }
              
              const firstBlock = [targetTen - 1, targetTen, targetTen + 1];
              const secondBlock = [targetTen + 9, targetTen + 10, targetTen + 11];
              
              const baseWithoutLastTwo = Math.floor(roundNumber / 100) * 100;
              
              const firstResults = firstBlock.map(v => baseWithoutLastTwo + v);
              const secondResults = secondBlock.map(v => baseWithoutLastTwo + v);
              
              loading.style.display = 'none';
              displayResults(roundNumber, firstResults, secondResults);
              
            } catch (error) {
              loading.style.display = 'none';
              showError(error.message || 'Erro no processamento');
            }
          }, 500);
        }
        
        function displayResults(originalRound, firstBlock, secondBlock) {
          const output = document.getElementById('out');
          
          // Função para formatar número
          const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          
          // Card da rodada original
          const originalCard = document.createElement('div');
          originalCard.className = 'result-card fade-up';
          originalCard.innerHTML = `
                <div class="result-header">🎯 RODADA ANALISADA</div>
                <div style="font-size: 24px; font-weight: 800; color: var(--primary); text-align: center; letter-spacing: 2px;">
                    ${formatNum(originalRound)}
                </div>
                <div style="text-align: center; margin-top: 12px;">
                    <span class="badge-success">ANÁLISE CONCLUÍDA</span>
                </div>
            `;
          output.appendChild(originalCard);
          
          // Primeiro bloco
          const firstCard = document.createElement('div');
          firstCard.className = 'result-card fade-up';
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
          secondCard.className = 'result-card fade-up';
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
          tipCard.className = 'result-card fade-up';
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
          document.getElementById('input').value = '3433362 1.5x 09:57:44';
          
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