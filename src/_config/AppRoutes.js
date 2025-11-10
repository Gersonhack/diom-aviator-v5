import { auth } from '/src/_config/config.db.js'
import { Mtx } from '/src/_config/Strings.js'


export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPath = window.location.hash.substring(1) || '/';
    this.init();
    this.setupAuthListener();
  }
  
  init() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash.substring(1) || '/';
      this.handleRoute();
    });
    this.handleRoute();
  }
  
  async handleRoute() {
    // Verificar autenticação antes de processar a rota
    const isAuthenticated = await this.checkAuthState();
    const route = this.findMatchingRoute();
    
    if (!route) return;
    
    // Redirecionamentos baseados em autenticação
    if (this.shouldRedirectToLogin(route, isAuthenticated)) {
      return this.redirectToLogin();
    }
    
    if (this.shouldRedirectToDashboard(route, isAuthenticated)) {
      return this.redirectToDashboard();
    }
    
    this.renderRoute(route);
  }
  
  findMatchingRoute() {
    return this.routes.find(r => r.path === this.currentPath) ||
      this.routes.find(r => r.path === 'notfound');
  }
  
  async checkAuthState() {
    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        resolve(!!user);
      });
    });
  }
  
  shouldRedirectToLogin(route, isAuthenticated) {
    return route.protected && !isAuthenticated && this.currentPath !== '/login';
  }
  
  shouldRedirectToDashboard(route, isAuthenticated) {
    return this.currentPath === '/login' && isAuthenticated;
  }
  
  redirectToLogin() {
    // Guarda a rota original para redirecionamento pós-login
    sessionStorage.setItem('redirectAfterLogin', this.currentPath);
    this.navigate('/login');
    return;
  }
  
  redirectToDashboard() {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/nexus';
    console.log("redirect nexus")
    sessionStorage.removeItem('redirectAfterLogin');
    this.navigate(redirectUrl);
    return;
    
  }
  
  async renderRoute(route) {
    const page = new route.component();
    document.getElementById('root').innerHTML = await page.render();
    
    // Dispara evento para componentes saberem que foram renderizados
    window.dispatchEvent(new CustomEvent('route-rendered'));
  }
  
  setupAuthListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
       // console.warn('Usuário autenticado:', user.email);
      setTimeout(() => {
  this.navigate('/nexus');

}, Mtx.App.Config.timeLoading_screen);

        
        // Se estiver na página de login e se autenticar, redireciona
        if (this.currentPath === '/login') {
          this.redirectToDashboard();
        }
      } else {
      //  console.log('Usuário não autenticado');
        // Se estiver em rota protegida e deslogar, redireciona
        this.navigate('/home')
        const currentRoute = this.findMatchingRoute();
        if (currentRoute?.protected) {
          this.redirectToLogin();
        }
      }
    });
  }
   
  navigate(path) {
    window.location.hash = path;
  }
}