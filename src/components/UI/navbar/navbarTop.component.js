import { ModalNexus } from '/src/components/UI/modal/Modal.nexus.js';

export class NavbarTop {
  render(){
    const modalnexus = new ModalNexus()
    return`
  <nav class="navbarTop" id="navtop">

<div class="flex items-center justify-center space-x-2">
  <span class="logo-name text-1xl font-bold bg-gradient-to-r from-purple-100 to-cyan-400 bg-clip-text text-transparent">
    Diom Aviator
  </span>
  <i class="fas fa-crown text-cyan-300 text-lg animate-pulse"></i>
</div>
      
      <div>
      <i class="fa-solid fa-bars"></i>
      </div>
  </nav>
  ${modalnexus.render()}
    `
  }
}