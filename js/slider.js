// ===== SLIDER AVANÇADO - LAFRATTAJR.COM.BR =====

class ImageSlider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.setupEventListeners();
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
        this.showSlide(0);
        this.startAutoPlay();
        
        // Pausar/retomar ao hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        console.log('Slider inicializado com', this.slides.length, 'slides');
    }
    
    setupEventListeners() {
        // Botões de navegação
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
            
            // Acessibilidade
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.setAttribute('tabindex', '0');
            
            // Navegação por teclado nos indicadores
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
        });
    }
    
    setupTouchEvents() {
        // Touch/swipe support para mobile
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    setupKeyboardNavigation() {
        // Navegação por teclado
        this.container.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
            }
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo slide
                this.nextSlide();
            } else {
                // Swipe right - slide anterior
                this.previousSlide();
            }
        }
    }
    
    showSlide(index, direction = 'next') {
        // Validar índice
        if (index < 0 || index >= this.slides.length) return;
        
        // Remover classes ativas
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            slide.setAttribute('aria-hidden', 'true');
        });
        
        this.indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-selected', 'false');
        });
        
        // Adicionar classes ativas
        this.slides[index].classList.add('active');
        this.slides[index].setAttribute('aria-hidden', 'false');
        
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
            this.indicators[index].setAttribute('aria-selected', 'true');
        }
        
        // Efeito de transição
        this.addTransitionEffect(index, direction);
        
        this.currentSlide = index;
        
        // Atualizar ARIA live region
        this.announceSlideChange();
        
        // Tracking
        this.trackSlideView(index);
    }
    
    addTransitionEffect(index, direction) {
        const currentSlideEl = this.slides[index];
        
        // Adicionar classe de animação baseada na direção
        currentSlideEl.classList.add(`slide-in-${direction}`);
        
        // Remover classe após animação
        setTimeout(() => {
            currentSlideEl.classList.remove(`slide-in-${direction}`);
        }, 500);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex, 'next');
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex, 'prev');
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        const direction = index > this.currentSlide ? 'next' : 'prev';
        this.showSlide(index, direction);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.isPlaying = true;
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
        this.isPlaying = false;
    }
    
    pauseAutoPlay() {
        this.stopAutoPlay();
    }
    
    resumeAutoPlay() {
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
    
    announceSlideChange() {
        // Criar ou atualizar live region para screen readers
        let liveRegion = document.getElementById('slider-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'slider-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        
        const slideContent = this.slides[this.currentSlide].querySelector('.slide-content');
        if (slideContent) {
            const title = slideContent.querySelector('h3')?.textContent || '';
            const description = slideContent.querySelector('p')?.textContent || '';
            liveRegion.textContent = `Slide ${this.currentSlide + 1} de ${this.slides.length}: ${title}. ${description}`;
        }
    }
    
    trackSlideView(index) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'slide_view', {
                'event_category': 'slider',
                'event_label': `slide_${index + 1}`,
                'value': index + 1
            });
        }
    }
    
    // Método público para controle externo
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.slides.length;
    }
    
    isAutoPlaying() {
        return this.isPlaying;
    }
    
    // Destruir slider (cleanup)
    destroy() {
        this.stopAutoPlay();
        
        // Remover event listeners
        this.container.removeEventListener('mouseenter', this.pauseAutoPlay);
        this.container.removeEventListener('mouseleave', this.resumeAutoPlay);
        
        // Limpar referências
        this.container = null;
        this.slides = null;
        this.indicators = null;
        this.prevBtn = null;
        this.nextBtn = null;
    }
}

// ===== CSS ADICIONAL PARA TRANSIÇÕES =====
const sliderStyles = `
    .slide-in-next {
        animation: slideInFromRight 0.5s ease-out;
    }
    
    .slide-in-prev {
        animation: slideInFromLeft 0.5s ease-out;
    }
    
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .slider-container {
        position: relative;
        overflow: hidden;
    }
    
    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    .slide.active {
        opacity: 1;
        z-index: 2;
    }
    
    /* Melhorias de acessibilidade */
    .indicator:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    .prev-btn:focus,
    .next-btn:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    /* Indicador de loading */
    .slider-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: var(--bg-dark);
        color: var(--text-light);
    }
    
    .slider-loading::after {
        content: '';
        width: 40px;
        height: 40px;
        border: 3px solid var(--primary-color);
        border-top: 3px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = sliderStyles;
document.head.appendChild(styleSheet);

// ===== INICIALIZAÇÃO AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.image-slider');
    if (sliderContainer) {
        window.imageSlider = new ImageSlider(sliderContainer);
    }
});

// ===== EXPORT =====
window.ImageSlider = ImageSlider;

