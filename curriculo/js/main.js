/**
 * main.js - Funcionalidades para o Currículo de Marcos Lafratta Junior
 * @version 1.1.0
 * @license MIT
 */

((window, document) => {
  'use strict';
  
  // Configurações
  const CONFIG = {
    imagesToPreload: [
      'https://lafrattajr.com.br/imgs/profile_2.png',
      'https://lafrattajr.com.br/imgs/preview-lafrattajr.png'
    ]
  };

  // Pré-carrega imagens para melhor performance
  const preloadImages = (imageUrls) => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // Pré-carregamento de imagens
      preloadImages(CONFIG.imagesToPreload);
      
      // Ações após carregamento
      console.log('Currículo carregado com sucesso!');
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  });

})(window, document);