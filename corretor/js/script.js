
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
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Scroll suave
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
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});

// Header transparente
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }
});

// Máscara de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 2) value = value.replace(/(\d{0,2})/, '($1');
            else if (value.length <= 7) value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            else value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            e.target.value = value;
        });
    }
});

// Formulário redirecionamento customizado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.setAttribute('action', 'https://formsubmit.co/marcos@lafrattajr.com');
        form.setAttribute('method', 'POST');
        form.setAttribute('target', '_blank');

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = '_next';
        hiddenInput.value = 'https://lafrattajr.com/obrigado.html';

        form.appendChild(hiddenInput);
    }
});

// Animações ao scroll
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('animate-in'));
    }, observerOptions);

    document.querySelectorAll('.servico-card, .stat-item, .contato-item')
        .forEach(el => observer.observe(el));
});

// Feedback visual de botões
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);
        });
    });
});

// Navegação ativa
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const observerOptions = { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' };
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));
});

// Banner de cookies
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

