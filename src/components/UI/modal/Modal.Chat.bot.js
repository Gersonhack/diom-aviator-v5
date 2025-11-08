export class ModalChatBot {
  render(){
    
          const html = `
   <section class="modal chatbot" id="ModalChatbot">

      
                     <span class="close" id="closeChatbot">
    <i class="fa-solid fa-xmark"></i>
      </span>
    </div>
  
<<iframe 
 src="https://app.gptmaker.ai/widget/3E9EEA6A82BEF09376CF36158D09BF2D/iframe" 
 width="100%" 
 style="height: 100%; min-height: 700px" 
 allow="microphone;" 
 frameborder="0">
</iframe>
</div>
  </section>
  
    `;
this.afterRender = this.afterRender.bind(this);
setTimeout(() => this.afterRender(), 0);
return html;
  }
  afterRender() {
  $(document).ready(function() {
    const $Btnchatbot = $('#Btnchatbot');
const $closeChatbot = $('#closeChatbot');
const $ModalChatbot = $('#ModalChatbot');
const $navModal = $('.modal-nexus');
const $ofuscator = $('#blur');
const $calcMeta = $('#calcMeta')
    
         $Btnchatbot.on('click', function() {
        $ModalChatbot.css('display', 'flex');
        $navModal.removeClass('active');
        $ofuscator.css('display', 'flex')
        if (robo) {
          robo.play();
        }
        
      });
      
      // Fechar modal
      $closeChatbot.on('click', function() {
        $ModalChatbot.css('display', 'none');
        $ofuscator.css('display', 'none')
        if (robo) {
          robo.play();
        }
      });
      
      
      $ofuscator.on('click', function(e) {
        if (e.target === this) {
          $ModalChatbot.css('display', 'none');
          $ofuscator.css('display', 'none')
          if (robo) {
            robo.play();
          }
        }
      }); 
    
  });//ready
  
  
} //after
}
