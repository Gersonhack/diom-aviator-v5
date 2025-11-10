// ========================================
// DEVICE DETECTOR MODULE - ES6
// ========================================
// Sistema modular de detecção de dispositivos
// Use: import { DeviceDetector, getDeviceInfo } from './device-detector-module.js';

class DeviceDetector {
    constructor() {
        this.startTime = Date.now();
        this.isOnline = navigator.onLine;
        this.userAgent = navigator.userAgent;
    }

    // Detectar tipo de dispositivo (sem ícones)
    detectDevice() {
        const ua = this.userAgent;
        
        // Detectar iPhone
        if (/iPhone/i.test(ua)) {
            return 'iPhone';
        }
        // Detectar iPad
        else if (/iPad/i.test(ua)) {
            return 'iPad';
        }
        // Detectar Android Phone
        else if (/Android/i.test(ua) && /Mobile/i.test(ua)) {
            return 'Android Phone';
        }
        // Detectar Android Tablet
        else if (/Android/i.test(ua) && !/Mobile/i.test(ua)) {
            return 'Android Tablet';
        }
        // Detectar Windows Phone
        else if (/Windows Phone/i.test(ua)) {
            return 'Windows Phone';
        }
        // Detectar BlackBerry
        else if (/BlackBerry/i.test(ua)) {
            return 'BlackBerry';
        }
        // Detectar Desktop/PC
        else if (/Windows/i.test(ua)) {
            return 'PC Windows';
        }
        // Detectar Mac
        else if (/Macintosh|Mac OS X/i.test(ua)) {
            return 'Mac';
        }
        // Detectar Linux
        else if (/Linux/i.test(ua)) {
            return 'PC Linux';
        }
        // Detectar Smart TV
        else if (/Smart-TV|SmartTV|GoogleTV|AppleTV/i.test(ua)) {
            return 'Smart TV';
        }
        // Detectar Game Console
        else if (/PlayStation|Xbox|Nintendo/i.test(ua)) {
            return 'Game Console';
        }

        // Verificação adicional para dispositivos móveis
        if (this.isMobileDevice()) {
            return 'Mobile';
        } else {
            return 'Desktop';
        }
    }

    // Verificar se é dispositivo móvel
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent) ||
               (window.innerWidth <= 768 && 'ontouchstart' in window);
    }

    // Detectar navegador (sem ícones)
    detectBrowser() {
        const ua = this.userAgent;
        
        if (/Chrome/i.test(ua) && !/Edge|Edg/i.test(ua)) {
            return 'Chrome';
        } else if (/Firefox/i.test(ua)) {
            return 'Firefox';
        } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
            return 'Safari';
        } else if (/Edge|Edg/i.test(ua)) {
            return 'Edge';
        } else if (/Opera|OPR/i.test(ua)) {
            return 'Opera';
        } else if (/MSIE|Trident/i.test(ua)) {
            return 'Internet Explorer';
        } else if (/Samsung/i.test(ua)) {
            return 'Samsung Browser';
        }

        return 'Unknown';
    }

    // Detectar sistema operacional (sem ícones)
    detectOS() {
        const ua = this.userAgent;
        
        if (/Windows NT 10.0/i.test(ua)) {
            return 'Windows 10/11';
        } else if (/Windows NT 6.3/i.test(ua)) {
            return 'Windows 8.1';
        } else if (/Windows NT 6.2/i.test(ua)) {
            return 'Windows 8';
        } else if (/Windows NT 6.1/i.test(ua)) {
            return 'Windows 7';
        } else if (/Windows/i.test(ua)) {
            return 'Windows';
        } else if (/iPhone OS|iOS/i.test(ua)) {
            const version = ua.match(/OS (\d+_\d+)/);
            return version ? `iOS ${version[1].replace('_', '.')}` : 'iOS';
        } else if (/Android/i.test(ua)) {
            const version = ua.match(/Android (\d+\.?\d*)/);
            return version ? `Android ${version[1]}` : 'Android';
        } else if (/Mac OS X/i.test(ua)) {
            const version = ua.match(/Mac OS X (\d+[._]\d+)/);
            return version ? `macOS ${version[1].replace('_', '.')}` : 'macOS';
        } else if (/Linux/i.test(ua)) {
            return 'Linux';
        } else if (/CrOS/i.test(ua)) {
            return 'Chrome OS';
        }

        return 'Unknown';
    }

    // Obter tempo online formatado
    getOnlineTime() {
        const now = Date.now();
        const diff = now - this.startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Obter status de conexão
    getConnectionStatus() {
        return navigator.onLine ? 'Online' : 'Offline';
    }

    // Obter resolução da tela
    getScreenResolution() {
        const width = screen.width;
        const height = screen.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        return `${width}x${height} (${viewportWidth}x${viewportHeight})`;
    }

    // Obter todas as informações básicas
    getBasicInfo() {
        return {
            tempoOnline: this.getOnlineTime(),
            status: this.getConnectionStatus(),
            dispositivo: this.detectDevice()
        };
    }

    // Obter informações completas
    getFullInfo() {
        return {
            tempoOnline: this.getOnlineTime(),
            status: this.getConnectionStatus(),
            dispositivo: this.detectDevice(),
            navegador: this.detectBrowser(),
            sistemaOperacional: this.detectOS(),
            resolucao: this.getScreenResolution(),
            userAgent: this.userAgent,
            isMobile: this.isMobileDevice(),
            timestamp: new Date().toISOString()
        };
    }
}

// ========================================
// FUNÇÕES UTILITÁRIAS EXPORTÁVEIS
// ========================================

// Função para detectar dispositivo (uso rápido)
export function detectDevice() {
    const ua = navigator.userAgent;
    
    if (/iPhone/i.test(ua)) return 'iPhone';
    if (/iPad/i.test(ua)) return 'iPad';
    if (/Android/i.test(ua) && /Mobile/i.test(ua)) return 'Android Phone';
    if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'Android Tablet';
    if (/Windows Phone/i.test(ua)) return 'Windows Phone';
    if (/BlackBerry/i.test(ua)) return 'BlackBerry';
    if (/Windows/i.test(ua)) return 'PC Windows';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
    if (/Linux/i.test(ua)) return 'PC Linux';
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ? 'Mobile' : 'Desktop';
}

// Função para obter status de conexão
export function getConnectionStatus() {
    return navigator.onLine ? 'Online' : 'Offline';
}

// Função para formatar tempo
export function formatTime(startTime) {
    const now = Date.now();
    const diff = now - startTime;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Função para obter informações básicas (uso rápido)
export function getDeviceInfo(startTime = Date.now()) {
    return {
        tempoOnline: formatTime(startTime),
        status: getConnectionStatus(),
        dispositivo: detectDevice()
    };
}

// Função para criar e atualizar uma div
export function createDeviceDiv(containerId = null, options = {}) {
    const container = containerId ? document.getElementById(containerId) : document.body;
    
    if (!container) {
        console.error('Container não encontrado:', containerId);
        return null;
    }

    const div = document.createElement('div');
    div.id = options.id || 'deviceInfo';
    
    // Estilos padrão (podem ser sobrescritos)
    const defaultStyles = {
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        margin: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        maxWidth: '300px'
    };

    const styles = { ...defaultStyles, ...options.styles };
    
    Object.assign(div.style, styles);
    
    container.appendChild(div);
    
    const startTime = Date.now();
    
    // Função para atualizar o conteúdo
    const updateContent = () => {
        const info = getDeviceInfo(startTime);
        div.innerHTML = `
            Tempo online: ${info.tempoOnline}<br>
            Status: ${info.status}<br>
            Dispositivo: ${info.dispositivo}
        `;
    };
    
    // Atualizar conteúdo inicial
    updateContent();
    
    // Atualizar a cada segundo se solicitado
    if (options.autoUpdate !== false) {
        const interval = setInterval(updateContent, 1000);
        
        // Retornar objeto com métodos úteis
        return {
            element: div,
            update: updateContent,
            destroy: () => {
                clearInterval(interval);
                div.remove();
            },
            getInfo: () => getDeviceInfo(startTime)
        };
    }
    
    return {
        element: div,
        update: updateContent,
        getInfo: () => getDeviceInfo(startTime)
    };
}

// ========================================
// EXPORTAÇÕES PRINCIPAIS
// ========================================

export { DeviceDetector };
export default DeviceDetector;

// ========================================
// EXEMPLO DE USO (comentado):
// ========================================

/*
// 1. Importar em outro arquivo:
import { DeviceDetector, getDeviceInfo, detectDevice } from './device-detector-module.js';

// 2. Usar a classe completa:
const detector = new DeviceDetector();
console.log(detector.getBasicInfo());

// 3. Usar funções individuais:
console.log('Dispositivo:', detectDevice());
console.log('Info completa:', getDeviceInfo());

// 4. Criar div automaticamente:
import { createDeviceDiv } from './device-detector-module.js';
const deviceDiv = createDeviceDiv('meuContainer', {
    styles: { background: 'white' },
    autoUpdate: true
});
*/
