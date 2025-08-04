// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização das funcionalidades
    initScrollAnimations();
    initPillarCards();
    initSmoothScroll();
    initCTAAnimations();
    initBenefitAnimations();
    initParallaxEffect();
    
    console.log('MBA Soluções - Landing Page carregada com sucesso!');
});

// Animações no Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animação especial para cards dos pilares
                if (entry.target.classList.contains('pillar-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                // Animação especial para cards de audiência
                if (entry.target.classList.contains('audience-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const elementsToAnimate = document.querySelectorAll('.pillar-card, .audience-card, .section-header, .about-text, .quote');
    elementsToAnimate.forEach(el => {
        // Define estado inicial
        if (el.classList.contains('pillar-card') || el.classList.contains('audience-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        }
        observer.observe(el);
    });
}

// Interatividade dos Cards dos Pilares
function initPillarCards() {
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach((card, index) => {
        // Efeito hover aprimorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(52, 152, 219, 0.25)';
            
            // Animação do ícone
            const icon = this.querySelector('.pillar-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.background = 'linear-gradient(135deg, #17A589, #3498DB)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
            
            // Reset do ícone
            const icon = this.querySelector('.pillar-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = 'linear-gradient(135deg, #3498DB, #17A589)';
            }
        });
        
        // Efeito de clique
        card.addEventListener('click', function() {
            // Animação de pulse
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Scroll Suave para Links Internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações dos CTAs
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-whatsapp, .cta-email');
    
    ctaButtons.forEach(button => {
        // Efeito de hover aprimorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            
            // Efeito de brilho
            if (!this.querySelector('.shine-effect')) {
                const shine = document.createElement('div');
                shine.className = 'shine-effect';
                shine.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.6s ease;
                    pointer-events: none;
                `;
                this.appendChild(shine);
                
                setTimeout(() => {
                    shine.style.left = '100%';
                }, 100);
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animações dos Benefícios
function initBenefitAnimations() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Animação do check
                    const check = entry.target.querySelector('.benefit-check');
                    if (check) {
                        check.style.animation = 'checkPop 0.5s ease 0.3s both';
                    }
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        benefitObserver.observe(item);
    });
}

// Efeito Parallax Sutil
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Contador Animado (para futuras métricas)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy Loading de Imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Detecção de Dispositivo Móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizações para Mobile
function initMobileOptimizations() {
    if (isMobile()) {
        // Reduz animações em dispositivos móveis
        const cards = document.querySelectorAll('.pillar-card, .audience-card');
        cards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
        
        // Simplifica efeitos hover para touch
        const hoverElements = document.querySelectorAll('.pillar-card, .audience-card, .benefit-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

// Performance Monitor
function initPerformanceMonitor() {
    // Monitora o tempo de carregamento
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Página carregada em ${Math.round(loadTime)}ms`);
        
        // Reporta Core Web Vitals se disponível
        if ('web-vital' in window) {
            // Implementação futura para métricas de performance
        }
    });
}

// Adiciona CSS para animações dinâmicas
const dynamicStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes checkPop {
        0% { transform: scale(0.8); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .touch-active {
        transform: scale(0.98) !important;
        opacity: 0.9 !important;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

// Injeta estilos dinâmicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Inicializa otimizações móveis
initMobileOptimizations();
initPerformanceMonitor();

// Função para debug (remover em produção)
function debugInfo() {
    console.log('=== MBA Soluções Debug Info ===');
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
    console.log('Pillar Cards:', document.querySelectorAll('.pillar-card').length);
    console.log('Benefit Items:', document.querySelectorAll('.benefit-item').length);
    console.log('CTA Buttons:', document.querySelectorAll('.cta-primary, .cta-whatsapp, .cta-email').length);
}

// Executa debug em desenvolvimento
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    debugInfo();
}

// Exporta funções para uso global se necessário
window.MBASolucoes = {
    animateCounter,
    isMobile,
    debugInfo
};

// Data automática e banner de cookies
document.addEventListener('DOMContentLoaded', function () {
    // Data no rodapé
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Banner de cookies
    const banner = document.getElementById('cookie-banner');
    if (banner && !localStorage.getItem('cookiesAccepted')) {
        banner.style.display = 'block';

        const btn = document.getElementById('accept-cookies');
        if (btn) {
            btn.addEventListener('click', function () {
                localStorage.setItem('cookiesAccepted', 'true');
                banner.style.display = 'none';
            });
        }
    }
});


