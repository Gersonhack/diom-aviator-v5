export class Live{
  
  render(){
    
    
    const html = `
      <section class="modal" id="LiveModal">
      <div class="headerModal">
            <h1 class="txt">
    Live Telegram 
      </h1>
             <span class="close" id="closeLive">
    <i class="fa-solid fa-xmark"></i>
      </span>
       </div>
<div class="content p-6 max-w-6xl mx-auto">
    <!-- Cabeçalho -->
    <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
            <i class="fas fa-broadcast-tower text-blue-400 mr-3"></i>
            Live
        </h1>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Nossas lives acontecem no Telegram nos horários abaixo
        </p>
        
        <!-- Horários das Lives -->
        <div class="flex justify-center flex-wrap gap-4 mb-8">
            <span class="bg-green-900 text-green-300 px-4 py-2 rounded-full border border-green-600 font-semibold">
                🕛 12:00h
            </span>
            <span class="bg-blue-900 text-blue-300 px-4 py-4 rounded-full border border-blue-600 font-semibold">
                🕑 14:00h
            </span>
            <span class="bg-purple-900 text-purple-300 px-4 py-2 rounded-full border border-purple-600 font-semibold">
                🕗 20:00h
            </span>
            <span class="bg-red-900 text-red-300 px-4 py-2 rounded-full border border-red-600 font-semibold">
                🕙 22:00h
            </span>
        </div>
<br>
        <!-- Botão Acessar Grupo -->
        <a href="https://t.me/seugrupo" target="_blank" class="inline-block">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                <i class="fab fa-telegram mr-2"></i>
                Acessar Grupo do Telegram
            </button>
        </a>
    </div>

      </section>
    `;
        this.afterRender = this.afterRender.bind(this);
    setTimeout(() => this.afterRender(), 0);
    return html;
  }//Render
  afterRender() {
  
  $(document).ready(function() {

  const $OpenLive = $('#OpenLive');
  const $closeLive = $('#closeLive');
  const $LiveModal = $('#LiveModal');
 const $navModal = $('.modal-nexus');
 const ofuscarr = $('#blur');
  // Abrir modal
  $OpenLive.on('click', function() {
      if (robo) {
    robo.play();
}
    $LiveModal.css('display', 'flex');
   $navModal.removeClass('active');
   ofuscarr.css('display','flex')
  });
  
  // close modal
  $closeLive.on('click', function() {
      if (robo) {
    robo.play();
}
    $LiveModal.css('display', 'none');
ofuscarr.css('display','none')
  });
  
  // close
  ofuscarr.on('click', function() {
      $LiveModal.css('display', 'none');
    if (robo) {
    robo.play();
}
  });
});
  
  }//afterRender
  
}//class