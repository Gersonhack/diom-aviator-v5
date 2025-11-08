import { SweetAlertAds } from '/src/components/UI/ads/config.js'
// Alertas específicos para Serviços
class ServiceAlert {
    
    // Configurações padrão para alertas de serviços
    static defaultConfig = {
        title: "🚀 Participe da nossa Live no Telegram! 🚀",
    image: "/black-friday/20251104_212101.jpg",
    adTitle: "Live ao Vivo: Não Perca!",
    description: "Não perca os melhores momentos! Confira o cronograma dos horários da live na imagem e junte-se a nós no Telegram para uma experiência incrível!",
    buttonText: "Entrar no Grupo",
        redirectUrl: "https://example.com/portfolio"
    };

    // Mostrar alerta de serviço padrão
    static show(customConfig = {}) {
        const config = { ...this.defaultConfig, ...customConfig };
        return SweetAlertAds.createCustomAd(config);
    }

    // Alerta específico para desenvolvimento web
    static showWebDevelopment() {
        return SweetAlertAds.createCustomAd({
            title: "💻 Desenvolvimento Web Profissional",
            image: "https://via.placeholder.com/80x80/dc2626/ffffff?text=WEB",
            adTitle: "Sites Responsivos",
            description: "Desenvolvemos sites modernos, rápidos e otimizados para SEO. Aumente sua presença online!",
            buttonText: "Ver Projetos",
            redirectUrl: "https://example.com/web-development"
        });
    }

    // Alerta específico para aplicativos móveis
    static showMobileApp() {
        return SweetAlertAds.createCustomAd({
            title: "📱 Desenvolvimento de Apps",
            image: "https://via.placeholder.com/80x80/dc2626/ffffff?text=APP",
            adTitle: "Apps iOS & Android",
            description: "Criamos aplicativos nativos e híbridos para iOS e Android. Sua ideia no bolso dos usuários!",
            buttonText: "Solicitar Orçamento",
            redirectUrl: "https://example.com/mobile-apps"
        });
    }

    // Alerta específico para e-commerce
    static showEcommerce() {
        return SweetAlertAds.createCustomAd({
            title: "🛒 Loja Virtual Completa",
            image: "https://via.placeholder.com/80x80/dc2626/ffffff?text=SHOP",
            adTitle: "E-commerce Profissional",
            description: "Desenvolvemos lojas virtuais completas com pagamento integrado e gestão de estoque!",
            buttonText: "Ver Demos",
            redirectUrl: "https://example.com/ecommerce"
        });
    }

    // Alerta específico para consultoria
    static showConsulting() {
        return SweetAlertAds.createConfirmAd({
            title: "🎯 Consultoria Especializada",
            image: "https://via.placeholder.com/80x80/dc2626/ffffff?text=CONS",
            adTitle: "Consultoria em TI",
            description: "Precisa de orientação técnica? Nossa consultoria especializada pode ajudar seu projeto!",
            confirmText: "Agendar Consulta",
            cancelText: "Talvez depois",
            redirectUrl: "https://example.com/consultoria"
        });
    }

    // Alerta específico para manutenção
    static showMaintenance() {
        return SweetAlertAds.createTimedAd({
            title: "🔧 Manutenção de Sites",
            image: "https://via.placeholder.com/80x80/dc2626/ffffff?text=FIX",
            adTitle: "Suporte Técnico",
            description: "Seu site precisa de manutenção? Oferecemos suporte técnico completo e atualizações!",
            buttonText: "Solicitar Suporte",
            redirectUrl: "https://example.com/manutencao",
            timer: 6000
        });
    }


    // Alerta com múltiplas opções de serviços
    static showServiceNews() {
        const customHTML = `
            <div class="custom-ad-content">
                <img src="/src/assents/imgs/ads/IA_Diom_Systems.jpg" alt="Anúncio" class="ad-image">
                <div class="ad-text">
                    <div class="ad-title">Assistente IA DIOM SYSTEMS já disponível!</div>
                    <div class="ad-description">Descubra a nova forma de operar com a ajuda da nossa inteligência artificial. IA DIOM SYSTEMS está aqui para você!</div>
                </div>
            </div>

            <!-- From Uiverse.io by Spacious74 --> 
<div class="outer-cont flex" id="bot">
  <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
      ></path>
      <path
        d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
        fill="currentColor"
      ></path>
    </g>
  </svg>
 Fale com a IA Diom Aviator agora!
</div>

        `;

        return Swal.fire({
            title: "🚀 LANÇAMENTO!",
            html: customHTML,
            showConfirmButton: false,
            showCloseButton: true,
            width: '400px',
            customClass: {
                popup: 'custom-ad-popup'
            }
        });
        
    }
    
}


// Função global para compatibilidade com o HTML existente
export const Service = function showServiceAd() {
   ServiceAlert.show();
}

export const News = function showServiceAd() {
ServiceAlert.showServiceNews()
const $bot = $('#bot');
const $navModal = $('.modal-nexus');
const $blur = $('.ofus');

    
      $bot.on('click', function() {
          const alert = ServiceAlert.showServiceNews();
// após a ação
swal.close()
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

}
