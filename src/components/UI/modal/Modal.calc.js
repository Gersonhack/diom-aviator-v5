export class Modalcalc {
  
  render() {
    
    
    const html = `
      <section class="modal calc" id="Modalcalc">
      <div class="headerModal">
      <h1 class="txt">
      calculadora de gestão 
      </h1>
             <span class="close" id="closecalc">
    <i class="fa-solid fa-xmark"></i>
      </span>
       </div>
<div class="min-h-screen cc flex items-center justify-center p-4 ">
    <div class="containerc w-full max-w-md p-6 mx-auto animate-fade-in">
        <div class="text-center mb-6 delay-1">
            <img src="/src/assents/imgs/Nexus/calc.png" alt="Logo" class="mx-auto rounded-lg shadow-lg w-full h-50">
        </div>
        
        <div class="space-y-4">
            <div class="input-group delay-2">
                <label for="capitalInicial" class="block text-sm font-medium mb-1">Quanto você tem de banca? (R$):</label>
                <input type="number" id="capitalInicial" placeholder="Ex: 1000" min="1" required 
                       class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-600 input text-white">
            </div>
            
            <div class="input-group delay-2">
                <label for="tipoSoldado" class="block text-sm font-medium mb-1">Qual tipo de Investidor você é?</label>
                <select id="tipoSoldado" class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-600">
                    <option value="0.05">Alavancagem Conservadora</option>
                    <option value="0.10">Alavancagem Moderada</option>
                    <option value="0.15">Alavancagem Agressiva</option>
                </select>
            </div>

            <button id="calcMeta">Calcular Gestão</button>   
            <br>
            <div class="result-container flex justify-between gap-4 mt-6 delay-3">
                <div class="result-boxx flex-1 p-4 rounded-lg">
                    <p id="segurancaText" class="font-bold text-lg bet">APOSTA<br><span class="text-green-400 money">0.00 BRL</span></p>
                </div>
                <div class="result-boxx flex-1 p-4 rounded-lg">
                    <p id="stakeText" class="font-bold text-lg bet">APOSTA<br><span class="text-green-400">0.00 BRL</span></p>
                </div>
            </div>
            
            <div class="image-container mt-6 delay-3">
                <img src="http://static.photos/finance/640x360/7" alt="Aviator" class="rounded-lg shadow-lg w-full h-auto">
            </div>
            </div>

            <div class="table-container mt-6 delay-3">
                <h1 class="text-xl font-semibold mb-3">Planilha</h1>
                <div class="overflow-x-auto">
                    <table id="planilha" class="w-full border-collapse">
                        <thead>
                            <tr>
                                <th class="p-3 border">Dia</th>
                                <th class="p-3 border">Saldo do Dia</th>
                                <th class="p-3 border">Meta Diária</th>
                                <th class="p-3 border">Valor Final</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

      </section>
    `;
    this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  } //Render
  afterRender() {
    
    $(document).ready(function() {
      const $btnopencalc = $('#btncalc');
      const $closecalc = $('#closecalc');
      const $Modalcalc = $('#Modalcalc');
      const $navModal = $('.modal-nexus');
      const $ofuscator = $('#blur');
      const $calcMeta = $('#calcMeta')
      // Abrir modal
      $btnopencalc.on('click', function() {
        $Modalcalc.css('display', 'flex');
        $navModal.removeClass('active');
        $ofuscator.css('display', 'flex')
        if (robo) {
    robo.play();
}
        
      });
      
      // Fechar modal
      $closecalc.on('click', function() {
        $Modalcalc.css('display', 'none');
        $ofuscator.css('display', 'none')
        if (robo) {
    robo.play();
}
      });
      
      
      $ofuscator.on('click', function(e) {
        if (e.target === this) {
          $Modalcalc.css('display', 'none');
          $ofuscator.css('display', 'none')
          if (robo) {
    robo.play();
}
        }
      });
      
   //   console.log('text calc')

$calcMeta.on('click', function() {
    const capitalInput = document.getElementById('capitalInicial').value.trim();
    const tipoSoldado = parseFloat(document.getElementById('tipoSoldado').value);
    
    if (capitalInput === "" || isNaN(tipoSoldado)) {
        alert('Por favor, insira um valor válido para a banca.');
        return;
    }
    
    const capitalInicial = parseFloat(capitalInput);
    if (capitalInicial <= 0) {
        alert('O valor da banca deve ser maior que zero.');
        return;
    }
    
    const aposta = capitalInicial * tipoSoldado;
    const metadeAposta = aposta / 2;
    
    document.getElementById('segurancaText').innerHTML = `<p  class="font-bold text-lg bet">APOSTA<br><span class="text-green-400">${aposta.toFixed(2)} BRL</span></p>`;
    document.getElementById('stakeText').innerHTML = `<p id="segurancaText" class="font-bold text-lg bet">APOSTA<br><span class="text-green-400 money">${metadeAposta.toFixed(2)} BRL</span></p>`;
    
    preencherPlanilha(capitalInicial, aposta);
})

function preencherPlanilha(capitalInicial, metaDiariaFixa) {
    const tbody = document.querySelector('#planilha tbody');
    tbody.innerHTML = '';
    
    let saldoDoDia = capitalInicial;
    
    for (let dia = 1; dia <= 30; dia++) {
        const valorFinal = saldoDoDia + metaDiariaFixa;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${dia}</td>
          <td>R$ ${saldoDoDia.toFixed(2)}</td>
          <td>R$ ${metaDiariaFixa.toFixed(2)}</td>
          <td>R$ ${valorFinal.toFixed(2)}</td>
        `;
        
        tbody.appendChild(tr);
        saldoDoDia = valorFinal;
    }
}
    });
    
  } //afterRender
  
} //class