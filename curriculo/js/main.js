/**
 * main.js - Funcionalidades para o Currículo de Marcos Lafratta Junior
 * @version 1.1.0
 * @license MIT
 */

((window, document) => {
  'use strict';
  
  // ==========================================
  // 1. CONSTANTES DE CONFIGURAÇÃO
  // ==========================================
  const CONFIG = {
    imagesToPreload: [
      'https://lafrattajr.com.br/imgs/profile_2.png',
      'https://lafrattajr.com.br/imgs/preview-lafrattajr.png'
    ],
    lazyLoadSelectors: 'img[data-lazy]',
    pdfUrl: '/downloads/curriculo-marcos-lafratta.pdf'
  };

  // ==========================================
  // 2. FUNÇÕES UTILITÁRIAS
  // ==========================================
  
  /**
   * Pré-carrega imagens para melhor performance
   * @param {string[]} imageUrls - Array de URLs de imagens
   */
  const preloadImages = (imageUrls) => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => console.debug(`Imagem pré-carregada: ${url}`);
    });
  };

  /**
   * Adiciona lazy loading para imagens
   * @param {string} selector - Seletor CSS para imagens lazy
   */
  const initLazyLoading = (selector) => {
    const lazyImages = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.lazy;
            img.removeAttribute('data-lazy');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      lazyImages.forEach(img => observer.observe(img));
    } else {
      // Fallback para navegadores sem IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.lazy;
      });
    }
  };

  /**
   * Adiciona botão de download de PDF (opcional)
   */
  const addPdfDownload = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const downloadBtn = document.createElement('a');
    downloadBtn.href = CONFIG.pdfUrl;
    downloadBtn.className = 'pdf-download-btn';
    downloadBtn.textContent = 'Baixar PDF';
    downloadBtn.download = 'Curriculo-Marcos-Lafratta-Junior.pdf';
    
    header.appendChild(downloadBtn);
  };

  // ==========================================
  // 3. INICIALIZAÇÃO
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // A. Pré-carregamento de imagens
      preloadImages(CONFIG.imagesToPreload);

      // B. Lazy Loading (opcional - descomente se necessário)
      // initLazyLoading(CONFIG.lazyLoadSelectors);

      // C. Botão de download (opcional - descomente se necessário)
      // addPdfDownload();

      console.info('Currículo inicializado com sucesso!');
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  });

})(window, document);