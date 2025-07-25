// ===== SISTEMA DE LEADS - LAFRATTAJR.COM.BR =====

class LeadSystem {
    constructor() {
        this.modal = document.getElementById('lead-modal');
        this.leadButton = document.getElementById('lead-form-btn');
        this.closeButton = document.querySelector('.close');
        this.whatsappButtons = document.querySelectorAll('.btn-whatsapp, .social-btn.whatsapp');
        
        this.init();
    }
    
    init() {
        this.setupModalEvents();
        this.setupWhatsAppIntegration();
        this.setupFormTracking();
        this.setupLeadScoring();
        
        console.log('Sistema de leads inicializado');
    }
    
    // ===== MODAL DE LEADS =====
    setupModalEvents() {
        if (!this.modal || !this.leadButton) return;
        
        // Abrir modal
        this.leadButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
        
        // Fechar modal
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeModal());
        }
        
        // Fechar clicando fora
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
        
        // Trap focus no modal
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        });
    }
    
    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus no primeiro elemento focável
        const firstFocusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        // Tracking
        this.trackEvent('lead_modal_opened', 'lead_generation', 'main_cta');
        
        // Incrementar lead score
        this.incrementLeadScore('modal_opened', 10);
        
        console.log('Modal de leads aberto');
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Retornar focus ao botão que abriu o modal
        if (this.leadButton) {
            this.leadButton.focus();
        }
        
        this.trackEvent('lead_modal_closed', 'lead_generation', 'modal_close');
        
        console.log('Modal de leads fechado');
    }
    
    isModalOpen() {
        return this.modal && this.modal.style.display === 'block';
    }
    
    trapFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
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
    
    // ===== INTEGRAÇÃO WHATSAPP =====
    setupWhatsAppIntegration() {
        this.whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp(button);
            });
        });
    }
    
    openWhatsApp(button) {
        const phoneNumber = '5583993578751';
        let message = 'Olá! Gostaria de saber mais sobre os serviços digitais.';
        
        // Personalizar mensagem baseada no contexto
        const context = this.getButtonContext(button);
        message = this.getContextualMessage(context);
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Tracking
        this.trackEvent('whatsapp_click', 'contact', context);
        this.incrementLeadScore('whatsapp_contact', 25);
        
        console.log('WhatsApp aberto:', context);
    }
    
    getButtonContext(button) {
        if (button.closest('.hero-section')) return 'hero';
        if (button.closest('.solutions-section')) return 'solutions';
        if (button.closest('.social-links')) return 'social';
        return 'general';
    }
    
    getContextualMessage(context) {
        const messages = {
            hero: 'Olá! Vi seu perfil e gostaria de saber mais sobre consultoria estratégica.',
            solutions: 'Olá! Tenho interesse nas soluções digitais. Podemos conversar?',
            social: 'Olá Marcos! Encontrei seu perfil e gostaria de conversar sobre seus serviços.',
            general: 'Olá! Gostaria de saber mais sobre os serviços digitais.'
        };
        
        return messages[context] || messages.general;
    }
    
    // ===== TRACKING DE FORMULÁRIOS =====
    setupFormTracking() {
        // Monitorar iframe do Google Forms
        const iframe = this.modal?.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                this.trackEvent('form_loaded', 'lead_generation', 'google_forms');
            });
        }
        
        // Monitorar interações com o formulário
        this.setupFormInteractionTracking();
    }
    
    setupFormInteractionTracking() {
        // Detectar quando o usuário interage com o formulário
        let formInteracted = false;
        
        this.modal?.addEventListener('click', () => {
            if (!formInteracted) {
                formInteracted = true;
                this.trackEvent('form_interaction_started', 'lead_generation', 'first_click');
                this.incrementLeadScore('form_interaction', 15);
            }
        });
        
        // Detectar tempo gasto no modal
        let modalOpenTime = null;
        
        const originalOpenModal = this.openModal.bind(this);
        this.openModal = function() {
            modalOpenTime = Date.now();
            originalOpenModal();
        };
        
        const originalCloseModal = this.closeModal.bind(this);
        this.closeModal = function() {
            if (modalOpenTime) {
                const timeSpent = Date.now() - modalOpenTime;
                this.trackEvent('modal_time_spent', 'engagement', 'time', Math.round(timeSpent / 1000));
                
                // Lead scoring baseado no tempo
                if (timeSpent > 30000) { // 30 segundos
                    this.incrementLeadScore('engaged_user', 20);
                }
            }
            originalCloseModal();
        };
    }
    
    // ===== LEAD SCORING =====
    setupLeadScoring() {
        // Inicializar lead score no localStorage
        if (!localStorage.getItem('leadScore')) {
            localStorage.setItem('leadScore', '0');
        }
        
        // Monitorar comportamentos para scoring
        this.setupBehaviorTracking();
    }
    
    incrementLeadScore(action, points) {
        const currentScore = parseInt(localStorage.getItem('leadScore') || '0');
        const newScore = currentScore + points;
        
        localStorage.setItem('leadScore', newScore.toString());
        localStorage.setItem('lastScoreAction', JSON.stringify({
            action,
            points,
            timestamp: Date.now()
        }));
        
        // Tracking
        this.trackEvent('lead_score_increment', 'lead_scoring', action, newScore);
        
        console.log(`Lead score incrementado: ${action} (+${points}) = ${newScore}`);
        
        // Verificar se atingiu threshold para lead qualificado
        if (newScore >= 50 && currentScore < 50) {
            this.markAsQualifiedLead();
        }
    }
    
    getLeadScore() {
        return parseInt(localStorage.getItem('leadScore') || '0');
    }
    
    markAsQualifiedLead() {
        localStorage.setItem('qualifiedLead', 'true');
        localStorage.setItem('qualifiedLeadDate', Date.now().toString());
        
        this.trackEvent('qualified_lead', 'lead_generation', 'threshold_reached', this.getLeadScore());
        
        console.log('Lead qualificado!');
        
        // Opcional: mostrar mensagem especial ou oferta
        this.showQualifiedLeadMessage();
    }
    
    showQualifiedLeadMessage() {
        // Criar notificação discreta
        const notification = document.createElement('div');
        notification.className = 'lead-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-star"></i>
                <span>Você demonstrou interesse! Que tal uma consultoria gratuita?</span>
                <button class="notification-cta">Agendar</button>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Estilos inline para a notificação
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-color), var(--warning-color));
            color: var(--bg-dark);
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 300px;
            animation: slideInFromRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Event listeners
        notification.querySelector('.notification-cta').addEventListener('click', () => {
            this.openWhatsApp({ closest: () => null }); // Contexto especial
            notification.remove();
        });
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remover após 10 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }
    
    // ===== TRACKING DE COMPORTAMENTO =====
    setupBehaviorTracking() {
        // Tempo na página
        let pageLoadTime = Date.now();
        
        // Scroll depth
        let maxScrollDepth = 0;
        const trackScrollDepth = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                // Marcos de scroll importantes
                if (scrollPercent >= 25 && maxScrollDepth < 25) {
                    this.incrementLeadScore('scroll_25', 5);
                }
                if (scrollPercent >= 50 && maxScrollDepth < 50) {
                    this.incrementLeadScore('scroll_50', 10);
                }
                if (scrollPercent >= 75 && maxScrollDepth < 75) {
                    this.incrementLeadScore('scroll_75', 15);
                }
            }
        };
        
        window.addEventListener('scroll', this.throttle(trackScrollDepth, 1000));
        
        // Cliques em elementos importantes
        document.addEventListener('click', (e) => {
            const element = e.target.closest('[data-track]');
            if (element) {
                const trackingData = element.dataset.track;
                this.incrementLeadScore(`click_${trackingData}`, 5);
            }
        });
        
        // Tempo de permanência na página
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - pageLoadTime;
            const minutes = Math.round(timeOnPage / 60000);
            
            if (minutes >= 2) {
                this.incrementLeadScore('time_on_page_2min', 10);
            }
            if (minutes >= 5) {
                this.incrementLeadScore('time_on_page_5min', 20);
            }
        });
    }
    
    // ===== UTILITÁRIOS =====
    trackEvent(action, category = 'lead_system', label = '', value = null) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            const eventData = {
                'event_category': category,
                'event_label': label
            };
            
            if (value !== null) {
                eventData.value = value;
            }
            
            gtag('event', action, eventData);
        }
        
        // Console log para debug
        console.log('Event tracked:', { action, category, label, value });
    }
    
    throttle(func, limit) {
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
    
    // ===== API PÚBLICA =====
    getLeadData() {
        return {
            score: this.getLeadScore(),
            qualified: localStorage.getItem('qualifiedLead') === 'true',
            lastAction: JSON.parse(localStorage.getItem('lastScoreAction') || '{}'),
            qualifiedDate: localStorage.getItem('qualifiedLeadDate')
        };
    }
    
    resetLeadData() {
        localStorage.removeItem('leadScore');
        localStorage.removeItem('qualifiedLead');
        localStorage.removeItem('lastScoreAction');
        localStorage.removeItem('qualifiedLeadDate');
        
        console.log('Lead data resetado');
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    window.leadSystem = new LeadSystem();
});

// ===== EXPORT =====
window.LeadSystem = LeadSystem;

