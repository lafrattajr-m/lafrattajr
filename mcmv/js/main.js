// Atualiza o ano no rodapé
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Animação suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Animação dos cards quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de benefícios
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observar seções de estágios
document.querySelectorAll('.stage-section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(section);
});

// Efeito de hover nos botões CTA
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Tracking de cliques nos CTAs (para analytics futuras)
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const stage = this.closest('.stage-section');
        const stageNumber = stage ? stage.className.match(/stage-(\d+)/)?.[1] : 'unknown';
        
        // Aqui você pode adicionar código para enviar dados para Google Analytics
        console.log(`CTA clicked - Stage: ${stageNumber}, Button: ${this.textContent.trim()}`);
        
        // Exemplo para Google Analytics (descomente se tiver GA configurado)
        // gtag('event', 'cta_click', {
        //     'stage': stageNumber,
        //     'button_text': this.textContent.trim()
        // });
    });
});

// Efeito parallax suave no header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador de urgência (opcional - pode ser ativado se necessário)
function startUrgencyCounter() {
    const urgencySection = document.querySelector('.urgency-section');
    if (urgencySection) {
        let count = 47; // Número inicial de unidades
        const countElement = document.createElement('div');
        countElement.className = 'urgency-counter';
        countElement.innerHTML = `<strong>Apenas ${count} unidades restantes!</strong>`;
        countElement.style.cssText = `
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            margin: 15px 0;
            font-size: 1.1rem;
            display: inline-block;
            animation: pulse 2s infinite;
        `;
        
        urgencySection.insertBefore(countElement, urgencySection.querySelector('.urgency-cta'));
        
        // Diminui o contador a cada 30 segundos (simulação)
        setInterval(() => {
            if (count > 20) {
                count--;
                countElement.innerHTML = `<strong>Apenas ${count} unidades restantes!</strong>`;
            }
        }, 30000);
    }
}

// Ativar contador de urgência após 10 segundos na página
setTimeout(startUrgencyCounter, 10000);

// Smooth scroll para o topo quando clicar no logo/título
document.querySelector('h1').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adicionar classe ativa ao navegar pelos estágios
function updateActiveStage() {
    const stages = document.querySelectorAll('.stage-section');
    const scrollPosition = window.scrollY + 100;
    
    stages.forEach(stage => {
        const stageTop = stage.offsetTop;
        const stageBottom = stageTop + stage.offsetHeight;
        
        if (scrollPosition >= stageTop && scrollPosition < stageBottom) {
            stage.classList.add('active-stage');
        } else {
            stage.classList.remove('active-stage');
        }
    });
}

window.addEventListener('scroll', updateActiveStage);

// CSS para estágio ativo
const style = document.createElement('style');
style.textContent = `
    .active-stage {
        transform: scale(1.02);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

