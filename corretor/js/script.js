// Atualizar ano atual no rodapé
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Scroll suave para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header transparente no scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const interesse = document.getElementById('interesse').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            const aceite = document.getElementById('aceite').checked;
            
            if (!nome || !email || !telefone || !interesse || !aceite) {
                alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Criar mensagem para WhatsApp
            const whatsappMessage = `
*Nova mensagem do site - Corretor Lafratta Jr*

*Nome:* ${nome}
*Email:* ${email}
*Telefone:* ${telefone}
*Interesse:* ${interesse}
*Mensagem:* ${mensagem || 'Não informada'}

_Enviado através do site lafrattajr.com.br/corretor_
            `.trim();
            
            // Codificar mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/5583993578751?text=${encodedMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Mostrar mensagem de sucesso
            alert('Redirecionando para o WhatsApp. Sua mensagem será enviada automaticamente!');
            
            // Limpar formulário
            contactForm.reset();
        });
    }
});

// Animações ao scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.servico-card, .stat-item, .contato-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Máscara para telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Prevenção de spam no formulário
let lastSubmission = 0;
const SUBMISSION_COOLDOWN = 30000; // 30 segundos

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const originalSubmitHandler = contactForm.onsubmit;
        
        contactForm.addEventListener('submit', function(e) {
            const now = Date.now();
            
            if (now - lastSubmission < SUBMISSION_COOLDOWN) {
                e.preventDefault();
                alert('Aguarde um momento antes de enviar outra mensagem.');
                return false;
            }
            
            lastSubmission = now;
        });
    }
});

// Feedback visual para botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Smooth scroll para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe ativa ao link de navegação baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Adicionar estilos CSS para animações via JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--azul-oceano);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .header.scrolled {
            background-color: rgba(44, 62, 80, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .nav-link.active {
            color: var(--amarelo-ouro) !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieBanner");
    const button = document.getElementById("acceptCookies");

    if (!localStorage.getItem("cookiesAccepted")) {
        banner.style.display = "block";
    }

    button.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        banner.style.display = "none";
    });
});
