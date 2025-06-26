document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o ano automaticamente
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Aplica animação de entrada com classe
  const container = document.querySelector('.container');
  if (container) {
    container.classList.add('visible');
  }
});
