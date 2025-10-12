import { Header } from '/src/components/layout/Header.js';

export class ContactPage {
  async render() {
    const header = new Header();
    return `
            ${header.render()}

                <h1>Contato</h1>
                em  desenvolvimento 
                <p>Email: contato@app.com</p>
            
        `;
  }
}