
export class ModalAfiliad{
  
  render(){
    
    
    const html = `
      <section class="modal" id="ModalAfiliad">
      <div class="headerModal">
            <h1 class="txt">
      Casa De Aposta
      </h1>
             <span class="close" id="closeAfiliad">
    <i class="fa-solid fa-xmark"></i>
      </span>
       </div>
<div class="content">
      <p class="title">
      Crie Sua Conta  Na Casa De Apostas Abaixo e Aproveite Bônus Exclusivos Para Novos Usuários Comece A Apostar Com Vantagens
      </p>
                <div class="flex btnhouse flex-col space-y-3">
              <a href="https://go.aff.esportiva.bet/53gau5lf" class="minimalist-btn e text-white py-3 px-4 rounded-lg text-center" target="_blank"><i class="fas fa-dice text-yellow-400"></i> ESPORTIVABET</a>

          </div>
</div>

  <audio id="aff" src="/public/assents/music/affiliad.mp3"></audio>
      </section>
    `;
        this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  }//Render
  afterRender() {
  
  $(document).ready(function() {
  const $OpenAfiliad = $('#openModalAfilid');
  const $closeBtnAfiliad = $('#closeAfiliad');
  const $AfiliadModal = $('#ModalAfiliad');
 const $navModal = $('.modal-nexus');
 const ofuscar = $('#blur');

  // Abrir modal
  $OpenAfiliad.on('click', function() {
    $AfiliadModal.css('display', 'flex');
   $navModal.removeClass('active');
   ofuscar.css('display','flex')
   $('#aff')[0].play()
  if (robo) {
  robo.play();
}

  });
  
  
  // Fechar modal
  $closeBtnAfiliad.on('click', function() {
    $AfiliadModal.css('display', 'none');
ofuscar.css('display','none')
if (robo) {
  robo.play();
  
}
  });
  
  // Fechar clicando fora
  ofuscar.on('click', function() {
    if (robo) {
  robo.play();
}
      $AfiliadModal.css('display', 'none');
      ofuscar.css('display','none')
      
  });
});
  
  }//afterRender
  
}//class