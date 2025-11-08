import { ModalNexus } from '/src/components/UI/modal/Modal.nexus.js';
import { Mtx } from '/src/_config/Strings.js';
export class NavbarTop {
  render(){
    const modalnexus = new ModalNexus()
    //<i class="fas fa-crown  animate-pulse"></i>g
    return`
  <nav class="navbarTop" id="navtop">

<div class="flex items-center justify-center space-x-2">

  <div class="flex gap-2  items-center space-x-4">
  <img class="w-8 h-8 shadow-2xl rounded-full mr-4" src="/src/assents/imgs/logo.jpg" alt="">
  <div class="pl-8">
  <span class="text-white font-bold text-sm">
    ${Mtx.App.Config.name}

    <i class="fas  fa-sparkles text-cyan-300 text-lg"></i>
  </span>
    <p class="text-blue-200 text-xs">Bot ${Mtx.App.Config.version}</p>
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