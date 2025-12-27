import { isUserAuth } from '/src/features/auth/auth.js';
import { Mtx } from '/src/_config/Strings.js';
import { Service } from '/src/components/UI/ads/alert.service.js';

export class LoginPage {
    constructor() {
        isUserAuth();
        Service();
    }
    
    render() {
        return `
<div class="contentLogin">
                <h1 class="get">Login</h1>
    <div class="login-container">
        <!-- Logo -->
        <div class="logo-section-login">
            <img class="logo-img" src="/src/assents/imgs/Logo.jpg" alt="Diom Aviator Logo">
            <h1 class="logo-text">${Mtx.App.Config.name}</h1>
            <p>Bem-vindo ao ${Mtx.App.Config.name}</p>
        </div>

        <!-- Card de Login -->
        <div class="login-card">
            <div class="login-header">


            </div>
            
            <form id="login-form">
                <div class="input-group">
                    <label for="email">${Mtx.App.Login.label_email}</label>
                    <input type="email" id="email" required>
                </div>
                
                <div class="input-group">
                    <label for="password">${Mtx.App.Login.label_senha}</label>
                    <div class="password-wrapper">
                        <input type="password" id="password" required>
                        <button type="button" id="toggle-password" class="toggle-password">
                            ${Mtx.App.Login.svg_eye}
                        </button>
                    </div>
                </div>
                
                <div class="options">
                
                    <div class="remember-me">
                        <input type="checkbox" id="remember">
                        <label for="remember">
                            ${Mtx.App.Login.label_remember}
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="login-button">
                    ${Mtx.App.Login.btn_login}
                </button>
            </form>
            
            <div class="signup-link">

                <p>
                    ${Mtx.App.Login.SignupLink.label_primary}
                    <a href="${Mtx.App.Login.SignupLink.route_pricing}">
                        ${Mtx.App.Login.SignupLink.label_secundary}
                    </a>
                </p>
            </div>
        </div>
    </div>
    <div class="gradient-bg-login"></div>
</div>

<style>
${this.getStyles()}
</style>
    `;
    }
    
    getStyles() {
        return `

    `;
    }
}