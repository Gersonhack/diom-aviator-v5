// Classe base para a criação de anúncios com SweetAlert
export class SweetAlertAds {
    
    // Função principal para criar anúncios personalizados
    static createCustomAd(config) {
        const {
            title = "Oferta Especial!",
            image = "https://via.placeholder.com/80x80/dc2626/ffffff?text=AD",
            adTitle = "Nosso Serviço",
            description = "Descrição do serviço ou produto",
            buttonText = "Saiba Mais",
            redirectUrl = "#",
            showCloseButton = true,
            timer = null
        } = config;

        // HTML personalizado para o anúncio
        const adHTML = `
            <div class="custom-ad-content">
                <img src="${image}" alt="Anúncio" class="ad-image">
                <div class="ad-text">
                    <div class="ad-title">${adTitle}</div>
                    <div class="ad-description">${description}</div>
                </div>
            </div>
            <button class="ad-button" onclick="window.open(\'${redirectUrl}\', \'_blank\')">${buttonText}</button>
        `;

        return Swal.fire({
            title: title,
            html: adHTML,
            showConfirmButton: false,
            showCloseButton: showCloseButton,
            allowOutsideClick: true,
            allowEscapeKey: true,
            timer: timer,
            customClass: {
                popup: 'custom-ad-popup'
            },
            didOpen: () => {
                // Adicionar evento de clique no botão personalizado
                const adButton = document.querySelector('.ad-button');
                if (adButton) {
                    adButton.addEventListener('click', () => {
                        Swal.close();
                    });
                }
            }
        });
    }

    // Anúncio com timer automático
    static createTimedAd(config) {
        return this.createCustomAd({
            ...config,
            timer: config.timer || 5000,
            showCloseButton: false
        });
    }

    // Anúncio com confirmação
    static createConfirmAd(config) {
        const {
            title = "Oferta Especial!",
            image = "https://via.placeholder.com/80x80/dc2626/ffffff?text=AD",
            adTitle = "Nosso Serviço",
            description = "Descrição do serviço ou produto",
            confirmText = "Aceitar Oferta",
            cancelText = "Não, obrigado",
            redirectUrl = "#"
        } = config;

        const adHTML = `
            <div class="custom-ad-content">
                <img src="${image}" alt="Anúncio" class="ad-image">
                <div class="ad-text">
                    <div class="ad-title">${adTitle}</div>
                    <div class="ad-description">${description}</div>
                </div>
            </div>
        `;

        return Swal.fire({
            title: title,
            html: adHTML,
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            customClass: {
                popup: 'custom-ad-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(redirectUrl, '_blank');
            }
        });
    }
}

