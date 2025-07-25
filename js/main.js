// ===== MAIN JAVASCRIPT - LAFRATTAJR.COM.BR =====

// Variáveis globais
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Remover loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Inicializar funcionalidades
    initializeSlider();
    initializeModal();
    initializeScrollEffects();
    initializeSmoothScroll();
    initializeAnimations();
    
    console.log('Site Lafrattajr.com.br carregado com sucesso!');
});

// ===== SLIDER DE IMAGENS =====
function initializeSlider() {
    if (slides.length === 0) return;
    
    // Configurar slide inicial
    showSlide(0);
    
    // Botões de navegação
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play
    startSlideshow();
    
    // Pausar auto-play ao hover
    const slider = document.querySelector('.image-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideshow);
        slider.addEventListener('mouseleave', startSlideshow);
    }
}

function showSlide(index) {
    // Remover classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe active ao slide e indicador atual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function startSlideshow() {
    stopSlideshow(); // Limpar interval anterior
    slideInterval = setInterval(nextSlide, 5000); // 5 segundos
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// ===== MODAL DE LEADS =====
function initializeModal() {
    const modal = document.getElementById('lead-modal');
    const btn = document.getElementById('lead-form-btn');
    const span = document.querySelector('.close');
    
    if (!modal || !btn) return;
    
    // Abrir modal
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_form_opened', {
                'event_category': 'engagement',
                'event_label': 'main_cta'
            });
        }
    });
    
    // Fechar modal
    if (span) {
        span.addEventListener('click', closeModal);
    }
    
    // Fechar modal clicando fora
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.content-card, .nav-card, .spec-card, .value-card, .feature-item, .pillar-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ANIMAÇÕES =====
function initializeAnimations() {
    // Adicionar classes CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-item, .pillar-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .feature-item.animate-in, .pillar-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITÁRIOS =====

// Debounce function para performance
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

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Tracking de eventos (Google Analytics)
function trackEvent(action, category = 'engagement', label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Tracking de cliques em links externos
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        trackEvent('external_link_click', 'outbound', link.href);
    }
});

// Tracking de cliques em WhatsApp
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="wa.me"]');
    if (link) {
        trackEvent('whatsapp_click', 'contact', 'whatsapp_button');
    }
});

// ===== PERFORMANCE =====

// Preload de imagens críticas
function preloadCriticalImages() {
    const criticalImages = [
        'imgs/profile.png',
        'imgs/projects/slide_lafrattajr_1.png',
        'imgs/projects/slide_lafrattajr_2.png',
        'imgs/projects/slide_lafrattajr_3.png',
        'imgs/projects/slide_lafrattajr_4.png',
        'imgs/projects/slide_lafrattajr_5.png',
        'imgs/projects/slide_lafrattajr_6.png',
        'imgs/projects/slide_lafrattajr_7.png',
        'imgs/projects/slide_lafrattajr_8.png',
        'imgs/projects/slide_lafrattajr_9.png',
        'imgs/projects/slide_lafrattajr_10.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}


// Inicializar preload
preloadCriticalImages();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript:', e.error);
    
    // Tracking de erros (opcional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
});

// ===== RESPONSIVE UTILITIES =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Ajustes responsivos
window.addEventListener('resize', debounce(() => {
    // Ajustar slider para mobile
    if (isMobile()) {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.style.height = '250px';
        }
    }
}, 250));

// ===== ACCESSIBILITY =====

// Navegação por teclado no slider
document.addEventListener('keydown', function(e) {
    if (e.target.closest('.image-slider')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case ' ':
                e.preventDefault();
                if (slideInterval) {
                    stopSlideshow();
                } else {
                    startSlideshow();
                }
                break;
        }
    }
});

// Focus management para modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}
 // Atualiza o ano dinamicamente
  document.getElementById("anoAtual").textContent = new Date().getFullYear();

// ===== EXPORT PARA OUTROS MÓDULOS =====
window.LafrattaJr = {
    showSlide,
    nextSlide,
    previousSlide,
    trackEvent,
    isMobile,
    isTablet,
    isDesktop
};

