import 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
export class ModalNexus {
render() {
    
    const html = `
<section class="modal-nexus" role="menu" aria-label="Menu de navegação">
  
  <!-- Cabeçalho do menu -->
  <div class="headerNav">
    <img src="/public/assents/images/user.png" class="userImg" alt="user" id="OpenProfile">
    <span class="name" id="name">...</span>
  </div>

  <!-- Opções do menu -->
  <div class="box-actions" id="openProfile">
    <i class="fas fa-user"></i>
    <span>Perfil</span>
  </div>

  <div class="box-actions x" id="openModalAfilid" tabindex="0" role="menuitem">
    <i class="fas fa-building"></i>
    <span> Casa De Apostas </span>
  </div>

  <div class="box-actions x" id="btncalc" tabindex="0" role="menuitem">
    <i class="fas fa-calculator"></i>
    Calculadora Diom
  </div>

  <div class="box-actions xx" id="btnCurso" tabindex="0" role="menuitem">
    <i class="fas fa-book"></i>
    <span>Estratégias</span>
  </div>

  <div class="box-actions x" id="HowUse" tabindex="0" role="menuitem">
    <i class="fas fa-question-circle"></i>
    <span> Como Usar </span>
  </div>

  <div class="box-actions x" id="OpenLive" tabindex="0" role="menuitem">
    <i class="fas fa-tv"></i>
    <span>Info Live</span>
  </div>

  <div class="box-actions x" id="openSocial" tabindex="0" role="menuitem">
    <i class="fas fa-share-alt"></i>
    <span>Redes Sociais</span>
  </div>

  <div class="box-actions x" id="Btnchatbot" tabindex="0" role="menuitem">
    <i class="fas fa-robot"></i>
    
     <span> IA DIOM SYSTEMS</span>
    <button class="New">
    <span>Novo</span>
    </button>
  </div>

  <div class="box-actions x" id="suporte" tabindex="0" role="menuitem">
    <i class="fas fa-headset"></i>
    <span>Suporte</span>
  </div>

  <div class="box-actions x" id="sobre" tabindex="0" role="menuitem">
    <i class="fas fa-info-circle"></i>
    <span>Sobre o App</span>
  </div>

</section>


    `;
        this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  }
  afterRender() {
$(document).ready(function() {
  const $hamburgerBtn = $('.fa-bars');
  const $navModal = $('.modal-nexus');
  const $blur = $('.ofus');
  const howUse = $('#HowUse')
  const sobre = $('#sobre')
  const suporte = $('#suporte')
  const robo = document.getElementById("robo");
  
  sobre.on('click', function () {
  Swal.fire({
  title: 'Informações do App ',
  text: 'Obrigado por usar nosso aplicativo!',
  footer: 'Versão 5.0.0',
  icon: 'info',
  confirmButtonText: 'Fechar'
});
  });
  
  
  
  howUse.on('click', function() {
if (robo) {
  robo.play();
}
window.location.href = "/page/doc"
});

suporte.on('click', function() {
  window.open("https://t.me/juliia_rs", "_blank");
  if (robo) {
  robo.play();
}
})
  
  $hamburgerBtn.on('click', function() {
    if (robo) {
        robo.play();
    }
    if ($navModal.hasClass('active')) {
      $navModal.removeClass('active');
$blur.removeClass('active')
  
      
    } else {
  $blur.addClass('active')
  
      $navModal.addClass('active');
    }
  });
  
  $blur.on('click', function () {
  $navModal.removeClass('active');
$blur.removeClass('active')
  
  })

});


}//after
}