// Atualiza o ano no rodapé
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Animação suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animações na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Para melhor performance, para de observar após animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.section, .benefit-card'
    );
    
    elementsToAnimate.forEach((element, index) => {
        // Adiciona delay escalonado para efeito em cascata
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
});

// Smooth hover effects para cards
document.querySelectorAll('.section').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Efeitos nos botões CTA
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Efeito de clique
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(1.01)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
});

// Tracking de cliques para analytics (preparado para GA4)
document.querySelectorAll('a[href^="https://"], a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        const text = this.textContent.trim();
        
        // Log para desenvolvimento
        console.log('Link clicked:', {
            url: href,
            text: text,
            type: href.includes('wa.me') ? 'whatsapp' : 
                  href.includes('mailto:') ? 'email' : 
                  href.includes('tel:') ? 'phone' : 'external'
        });
        
        // Exemplo para Google Analytics 4 (descomente se GA4 estiver configurado)
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'engagement',
                event_label: text,
                value: href
            });
        }
        */
    });
});

// Otimização de performance - debounce para scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top suave quando clicar no logo/título
document.querySelector('.header h1').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preload de imagens críticas
function preloadImages() {
    const criticalImages = [
        'https://lafrattajr.com.br/imgs/profile.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Executar preload após carregamento da página
window.addEventListener('load', preloadImages);

// Otimização para dispositivos móveis - reduzir animações se preferir movimento reduzido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desabilita animações para usuários que preferem movimento reduzido
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

// Função para melhorar acessibilidade - navegação por teclado
document.addEventListener('keydown', function(e) {
    // Esc para fechar modais (se houver no futuro)
    if (e.key === 'Escape') {
        // Fechar modais ou overlays
    }
    
    // Enter em elementos focáveis
    if (e.key === 'Enter' && e.target.tagName === 'A') {
        e.target.click();
    }
});

// Otimização de imagens - WebP fallback
function supportsWebP() {
    return new Promise(resolve => {
        const webP = new Image();
        webP.onload = webP.onerror = () => resolve(webP.height === 2);
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// Aplicar WebP se suportado
supportsWebP().then(supported => {
    if (supported) {
        document.documentElement.classList.add('webp');
    }
});

// Função para otimizar carregamento de fontes
function optimizeFonts() {
    // Preload de fontes críticas
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'
    ];
    
    fontPreloads.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Executar otimizações após DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    optimizeFonts();
    
    // Adicionar classe para CSS que depende de JS
    document.documentElement.classList.add('js-loaded');
});

// Error handling para imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Erro ao carregar imagem:', this.src);
        // Fallback para imagem padrão se necessário
        // this.src = 'path/to/fallback-image.jpg';
    });
});

// Função para melhorar SEO - atualizar meta tags dinamicamente
function updateMetaTags(title, description) {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', description);
    }
}

// Exportar funções para uso global se necessário
window.LafrattaJr = {
    updateMetaTags,
    preloadImages,
    optimizeFonts
};

