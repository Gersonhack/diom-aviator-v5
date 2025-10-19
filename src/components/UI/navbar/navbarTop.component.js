import { ModalNexus } from '/src/components/UI/modal/Modal.nexus.js';

export class NavbarTop {
  render(){
    const modalnexus = new ModalNexus()
    return`
  <nav class="navbarTop" id="navtop">

<div class="flex items-center justify-center space-x-2">

  <div class="flex gap-2  items-center space-x-4">
  <img class="w-8 h-8 shadow-2xl rounded-full mr-4" src="/src/assents/imgs/logo.jpg" alt="">
  <div class="pl-8">
  <span class="text-white font-bold text-sm">
    Diom Aviator <i class="fas fa-crown text-cyan-300 text-lg animate-pulse"></i>
  </span>
    <p class="text-blue-200 text-xs">Bot v5.0.0</p>
  </div>
</div>

</div>
      
      <div>
      <i class="fa-solid fa-bars"></i>
      </div>
  </nav>
  ${modalnexus.render()}
    `
  }
}