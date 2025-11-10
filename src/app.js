import { Router } from '/src/_config/AppRoutes.js';

import { HomePage } from '/src/pages/main/HomePage.js';

import { Loading } from '/src/components/main/loading.js';
import { NexusBotPage } from '/src/pages/signalNexus/NexusBot.Page.js';
import { PricingPage } from '/src/pages/Pricing/PricingPage.js'
import { LoginPage } from '/src/pages/auth/LoginPage.js';
import { LoginService } from '/src/features/services/auth.service.js';
import { NotFound } from '/src/pages/404/Not-found_Page.js';
import { Mtx } from '/src/_config/Strings.js';
import { Service,News } from '/src/components/UI/ads/alert.service.js';
import '/src/_config/link.src.js';


//import '/src/_config/veri.js'
// Configuração das rotas
export const routes = [
	{ path : '/', component: Loading , protected: false},
	{ path: '/home', component: HomePage , protected: false},
	{ path: '/nexus', component: NexusBotPage, protected: true},
	{ path: '/pricing', component: PricingPage ,protected:false},
	{ path: '/login', component: LoginPage },
	{ path: '/notfound', component: NotFound} // Fallback
];


LoginService()

// Inicia o app
document.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
	new Router(routes);
//	console.warn('run dev')

}, Mtx.App.Config.timeInitializeApp); //setTimeout loading home

	
	document.addEventListener('click', (e) => {
		if (e.target.matches('[data-link]')) {
			e.preventDefault();
			const path = e.target.getAttribute('href').substring(1);
			window.location.hash = path;
		}
	});
});

