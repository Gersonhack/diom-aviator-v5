export class Modalcurso{
  
  render() {
    
    
    const html = `
      <section class="modal curso" id="Modal">
      <div class="headerModal">
      <h1 class="txt">
      Informações De Vela 
      </h1>
             <span class="close" id="close">
    <i class="fa-solid fa-xmark"></i>
      </span>
       </div>
<div class="container">
  <div class="content">
    <div class="section">
      <h3 class="titlee">PADRÃO DE ACOMPANHAMENTO</h3>
      <div class="tags">
        <span class="tag pink">+10X</span>
        <span class="tag">+2X</span>
        <span class="tag">+2X</span>
        <span class="tag blue">+1X</span>
        <span class="tag">+2X</span>
      </div>
    </div>
    <div class="section">
      <h3 class="titlee">PADRÃO QUINTA E QUARTA CASA</h3>
      <div class="tags">
        <span class="tag pink">+10x</span>
        <span class="tag">2x</span>
        <span class="tag">+2x</span>
        <span class="tag">+2x</span>
        <span class="tag">+2x</span>
        <span class="tag blue">+1x</span>
        <span class="tag">+2x</span>
      </div>
    </div>
    <div class="section">
      <h3 class="titlee">GATILHOS</h3>
      <p class="text"> <span class="tag blue">1.90x</span> <span class="tag">2.72x</span> <span class="tag">2.57x</span> = Puxam <span class="pink">103X</span> </p>
    </div>
    <div class="section">
      <h3 class="titlee">VELAS QUE PUXAM VELAS BEM SUPERIORES</h3>
      <div class="tags">
        <span class="tag blue">1.11x</span>
        <span class="tag blue">1.22x</span>
        <span class="tag blue">1.66x</span>
        <span class="tag blue">1.88x</span>
        <span class="tag blue">1.80x</span>
        <span class="tag blue">1.90x</span>
        <span class="tag">2.72x</span>
        <span class="tag pink">22.47x</span>
        <span class="tag">2.57x</span>
        <span class="tag pink">33.16x</span>
        <span class="tag">3.07x</span>
      </div>
    </div>
    <div class="section">
      <h3 class="titlee">MINUTOS PAGANTES</h3>
      <div class="tags">
        <span class="tag time">00</span>
        <span class="tag time">02</span>
        <span class="tag time">07</span>
        <span class="tag time">10</span>
        <span class="tag time">12</span>
        <span class="tag time">17</span>
        <span class="tag time">20</span>
        <span class="tag time">22</span>
        <span class="tag time">27</span>
        <span class="tag time">30</span>
        <span class="tag time">33</span>
        <span class="tag time">36</span>
        <span class="tag time">37</span>
        <span class="tag time">40</span>
        <span class="tag time">42</span>
        <span class="tag time">47</span>
        <span class="tag time">50</span>
        <span class="tag time">52</span>
        <span class="tag time">57</span>
      </div>
      <p class="text">Sempre 1 minuto antes ou depois - Funciona bem para o gráfico da <span class="highlight">ESPORTIVABET</span></p>
    </div>
    <div class="section">
      <h3 class="titlee">VELAS ESPECIAIS</h3>
      <p class="text"> Velas com <button class="button">1.00x</button> (ex: 1.00x, 1.01x, etc.) podem resultar em 2x, 3x, 5x ou 🌹 </p>
      <div class="tags">
        <span class="tag blue">1.00x</span>
        <span class="tag blue">1.01x</span>
        <span class="tag blue">1.02x</span>
        <span class="tag blue">11.03x</span>
        <span class="tag blue">1.04x</span>
        <span class="tag blue">1.05x</span>
        <span class="tag blue">1.07x</span>
        <span class="tag blue">11.10x</span>
        <span class="tag blue">1.11x</span>
        <span class="tag blue">1.12x</span>
        <span class="tag blue">1.14x</span>
        <span class="tag blue">1.15x</span>
        <span class="tag blue">1.18x</span>
        <span class="tag blue">1.20x</span>
        <span class="tag blue">1.37x</span>
        <span class="tag blue">1.36x</span>
        <span class="tag blue">1.38x</span>
        <span class="tag blue">1.39x</span>
        <span class="tag blue">1.40x</span>
        <span class="tag blue">1.43x</span>
        <span class="tag blue">1.48x</span>
        <span class="tag blue">1.50x</span>
        <span class="tag blue">1.52x</span>
        <span class="tag blue">1.56x</span>
        <span class="tag blue">1.58x</span>
        <span class="tag blue">1.60x</span>
        <span class="tag blue">1.66x</span>
        <span class="tag blue">11.67x</span>
        <span class="tag blue">1.68x</span>
        <span class="tag blue">1.70x</span>
        <span class="tag blue">1.71x</span>
        <span class="tag blue">1.73x</span>
        <span class="tag blue">11.77x</span>
        <span class="tag blue">1.88x</span>
        <span class="tag blue">1.98x</span>
        <span class="tag blue">1.99x</span>
        <span class="tag ">2.88x</span>
        <span class="tag">3.88x</span>
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
      const $btncurso = $('#btnCurso');
      const $close = $('#close');
      const $Modal = $('#Modal');
      const $navModal = $('.modal-nexus');
      const $ofuscar = $('#blur');
      // Abrir modal
      $btncurso.on('click', function() {
        $Modal.css('display', 'flex');
        $navModal.removeClass('active');
        $ofuscar.css('display', 'flex')
        if (robo) {
  robo.play();
}
      });
      
      // Fechar modal
      $close.on('click', function() {
        $Modal.css('display', 'none');
        $ofuscar.css('display', 'none')
        if (robo) {
  robo.play();
}
      });
      
    
      $ofuscar.on('click', function(e) {
        if (e.target === this) {
          $Modal.css('display', 'none');
          $ofuscar.css('display', 'none')
          if (robo) {
  robo.play();
}
        }
      });
    });
    
  } //afterRender
  
} //class