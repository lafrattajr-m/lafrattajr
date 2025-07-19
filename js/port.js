document.addEventListener('DOMContentLoaded', function() {
  // Efeito de carregamento suave
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  // Controle do botão do WhatsApp
  const whatsappBtn = document.getElementById('whatsappBtn');
  
  function showWhatsAppButton() {
    if (window.scrollY > 200 || document.body.scrollHeight < 800) {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'translateY(0)';
    } else {
      whatsappBtn.style.opacity = '0';
      whatsappBtn.style.transform = 'translateY(100px)';
    }
  }
  
  // Mostra imediatamente se a página for curta
  if (document.body.scrollHeight < 800) {
    showWhatsAppButton();
  }
  
  window.addEventListener('scroll', showWhatsAppButton);
  
  // Mostra após 3 segundos mesmo sem scroll
  setTimeout(() => {
    whatsappBtn.style.opacity = '1';
    whatsappBtn.style.transform = 'translateY(0)';
  }, 3000);

  // Suaviza links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Atualiza ano no footer (se houver)
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});