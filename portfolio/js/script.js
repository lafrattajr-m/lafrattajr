// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initAnimations();
    updateCurrentYear();
    initSmoothScroll();
    initContactForms();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.skill-card, .tool-tag, .timeline-item, .education-card, .project-card, .competency-category'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
function initAnimations() {
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .skill-card,
        .tool-tag,
        .timeline-item,
        .education-card,
        .project-card,
        .competency-category {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.animate-in,
        .tool-tag.animate-in,
        .timeline-item.animate-in,
        .education-card.animate-in,
        .project-card.animate-in,
        .competency-category.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animation delays */
        .skills-grid .skill-card:nth-child(1) { transition-delay: 0.1s; }
        .skills-grid .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skills-grid .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skills-grid .skill-card:nth-child(4) { transition-delay: 0.4s; }
        .skills-grid .skill-card:nth-child(5) { transition-delay: 0.5s; }
        .skills-grid .skill-card:nth-child(6) { transition-delay: 0.6s; }
        .skills-grid .skill-card:nth-child(7) { transition-delay: 0.7s; }
        .skills-grid .skill-card:nth-child(8) { transition-delay: 0.8s; }
        
        .tools-grid .tool-tag:nth-child(odd) { transition-delay: 0.1s; }
        .tools-grid .tool-tag:nth-child(even) { transition-delay: 0.2s; }
        
        .projects-grid .project-card:nth-child(1) { transition-delay: 0.1s; }
        .projects-grid .project-card:nth-child(2) { transition-delay: 0.2s; }
        .projects-grid .project-card:nth-child(3) { transition-delay: 0.3s; }
        .projects-grid .project-card:nth-child(4) { transition-delay: 0.4s; }
        
        .education-grid .education-card:nth-child(1) { transition-delay: 0.1s; }
        .education-grid .education-card:nth-child(2) { transition-delay: 0.2s; }
        .education-grid .education-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling (if needed in the future)
function initContactForms() {
    // WhatsApp click tracking
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp clicks (can be used with analytics)
            console.log('WhatsApp contact initiated');
            
            // Optional: Add analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'method': 'whatsapp'
                });
            }
        });
    });

    // Email click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks
            console.log('Email contact initiated');
            
            // Optional: Add analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'method': 'email'
                });
            }
        });
    });

    // Project link tracking
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            console.log(`Project link clicked: ${projectName}`);
            
            // Optional: Add analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'project_visit', {
                    'project_name': projectName
                });
            }
        });
    });
}

// Utility functions
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

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Poppins:wght@300;400;500;600;700&family=Lora:ital,wght@1,400&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Optional: Send error to analytics or error tracking service
});

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations or heavy operations
        console.log('Page hidden');
    } else {
        // Page is visible, resume operations
        console.log('Page visible');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollEffects,
        initAnimations,
        updateCurrentYear,
        initSmoothScroll,
        initContactForms
    };
}

