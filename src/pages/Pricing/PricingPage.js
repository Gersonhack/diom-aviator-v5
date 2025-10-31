export class PricingPage {
    
    render() {
        const html = `
     <section class="pricing-section">
        <div class="section-header">
            <h1>Escolha Seu Plano</h1>
            <p>Selecione o plano ideal para suas necessidades e comece a lucrar hoje mesmo</p>
        </div>

        <div class="pricing-grid">
            <!-- Plano Básico -->
            <div class="pricing-card">
                <div class="plan-header">
                    <div class="plan-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Básico</h3>
                    <div class="text-4xl font-bold text-blue-400 mb-4">R$ 24,99<span class="text-lg text-gray-400">/3dias</span></div>
                    
                </div>

                <ul class="plan-features">
                    <li>
                        <i class="fas fa-check"></i>
                        <span class="feature-text">Acesso por 3 dias</span>
                    </li>
                </ul>

                <button class="plan-button secondary" data-plan="basic" data-price="24,99">
                    <i class="fas fa-shopping-cart"></i>
                    Escolher Plano
                </button>
            </div>

            <!-- Plano Premium -->
            <div class="pricing-card popular">
                <div class="popular-badge">MAIS POPULAR</div>
                <div class="plan-header">
                    <div class="plan-icon">
                        <i class="fas fa-crown"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Premium</h3>
                    <div class="text-4xl font-bold text-blue-400 mb-4">R$ 59,99<span class="text-lg text-gray-400">/7dias</span></div>
            
                </div>

                <ul class="plan-features">
                    <li>
                        <i class="fas fa-check"></i>
                        <span class="feature-text">Acesso por 7 dias</span>
                    </li>
                  
                </ul>

                <button class="plan-button primary" data-plan="premium" data-price="59,99">
                    <i class="fas fa-bolt"></i>
                    Começar Agora
                </button>
            </div>

            <!-- Plano Pro -->
            <div class="pricing-card">
                <div class="plan-header">
                    <div class="plan-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Pro</h3>
                    <div class="text-4xl font-bold text-blue-400 mb-4">R$ 199,00<span class="text-lg text-gray-400">/1mês</span></div> 
        
                </div>
                <ul class="plan-features">
        
                    <li>
                        <i class="fas fa-check"></i>
                        <span class="feature-text">Acesso por 30 dias</span>
                    </li>

                </ul>

                <button class="plan-button secondary" data-plan="pro" data-price="199,00">
                    <i class="fas fa-gem"></i>
                    Escolher Pro
                </button>
            </div>
        </div>
    </section>`;
        
        this.afterRender = this.afterRender.bind(this);
        setTimeout(() => this.afterRender(), 0);
        return html;
    } //Render
    
    afterRender() {
        document.getElementById('root').classList.add('auto');


        // Adiciona event listeners aos botões
        const buttons = document.querySelectorAll('.plan-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan');
                const price = e.target.getAttribute('data-price');
                this.selectPlan(plan, parseFloat(price));
            });
        });
        
    } //afterRender
    
    selectPlan(plano, preco) {
        // Número do WhatsApp (substitua pelo seu número)
        const phoneNumber = "5527999876397";
        
        // Mensagem personalizada
        const message = `hello! Gostaria de adquirir o plano *${plano}* no valor de *R$ ${preco.toFixed(2)}*.\n\nPor favor, me envie mais informações sobre como proceder com a compra.`;
        
        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Criar URL do WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Redirecionar para o WhatsApp
        window.open(whatsappURL, '_blank');
    }
    
    selectPlanDetailed(plano, preco, benefícios) {
        const phoneNumber = "5527999876397";
        
        const message = `💎 *INTERESSE NO PLANO ${plano.toUpperCase()}* 💎\n\n` +
            `*Valor:* R$ ${preco.toFixed(2)}/mês\n\n` +
            `*Benefícios incluídos:*\n`
            `Gostaria de mais informações sobre este plano!`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    }
    
} //class