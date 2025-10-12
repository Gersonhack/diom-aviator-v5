export class Header {
  render() {
    return `
            <div class="header">
                <a href="/e" data-link>Home</a>
                <a href="#/sobre" data-link>Sobre</a>
                <a href="#/contato" data-link>Contato</a>
                <a href="#/login" data-link>login</a>
            </div>
        `;
  }
}