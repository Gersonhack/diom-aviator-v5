import { Mtx } from '/src/_config/Strings.js'
export class Loading {
  render() {
    
    const html = `
      <div class="loading">
      <img class="logoFb" src="/src/assents/imgs/Logo.jpg" alt="logo">
         <div class="container">
            
      <div class="div1" id="div1"></div>
      <div class="div2" id="div2"></div>
      <div class="div3" id="div3"></div>
      <div class="div4" id="div4"></div>
      <div class="div5" id="div5"></div>
      
                  <div class="from">
                <span>From</span>
                <h1 class="company-name">${Mtx.App.Config.companyName}</h1>
            </div>
       </div>

      </div>
    `;
this.afterRender = this.afterRender.bind(this);
setTimeout(() => this.afterRender(), 0);
return html;
}
afterRender() {
  setTimeout(() => {
    //loading 2
   // document.querySelector('.loading').remove();
   // document.getElementById('root').classList.add('auto');
   window.location.href='#/nexus'
    
    
    
  }, Mtx.App.Config.timeLoading_screen);
} //after 
  }
