document.addEventListener('DOMContentLoaded', function() {
  // 1. Efeito de carregamento suave para ambas as páginas
  // Aplica a transição para opacidade e transform
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 100);

  // 2. Controle do botão do WhatsApp flutuante (executa apenas se o elemento existir)
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) { // Verifica se o botão do WhatsApp existe na página atual
    function showWhatsAppButton() {
      // Exibe o botão se o usuário rolou ou se a página é naturalmente curta
      if (window.scrollY > 200 || document.body.scrollHeight < 800) {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.transform = 'translateY(0)';
      } else {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.transform = 'translateY(100px)';
      }
    }

    // Mostra imediatamente se a página for curta ao carregar
    if (document.body.scrollHeight < 800) {
      showWhatsAppButton();
    }

    // Adiciona listener para rolagem
    window.addEventListener('scroll', showWhatsAppButton);

    // Mostra após 3 segundos, mesmo sem rolagem (garantia de visibilidade)
    setTimeout(() => {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'translateY(0)';
    }, 3000);
  }

  // 3. Suaviza links âncora (funciona em qualquer página com links #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Previne o comportamento padrão do link

      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignora links vazios

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20, // Offset para garantir que o elemento não fique colado no topo
          behavior: 'smooth' // Rolagem suave
        });
      }
    });
  });

  // 4. Atualiza o ano no rodapé automaticamente (funciona em qualquer página com #year)
  const yearSpan = document.getElementById('year');
  if (yearSpan) { // Verifica se o span com id 'year' existe
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Lógica para os grupos <details> do LinkTree (executa apenas se os elementos existirem)
  const treeGroups = document.querySelectorAll('.tree-group');
  if (treeGroups.length > 0) { // Verifica se há grupos LinkTree na página
    treeGroups.forEach(group => {
      const summary = group.querySelector('summary');
      const icon = summary.querySelector('.toggle-icon');

      if (icon) { // Define o ícone inicial (+ ou -)
        icon.textContent = group.hasAttribute('open') ? '−' : '+';
      }

      if (summary) { // Adiciona o listener de clique para alternar o estado do grupo
        summary.addEventListener('click', (e) => {
          e.preventDefault(); // Previne o comportamento padrão do <details>
          group.toggleAttribute('open'); // Alterna o atributo 'open'

          if (icon) { // Atualiza o ícone
            icon.textContent = group.hasAttribute('open') ? '−' : '+';
          }
        });
      }
    });

    // 6. Efeitos de hover/click nos links do LinkTree (executa apenas se os elementos existirem)
    const interactiveEls = document.querySelectorAll('.tree-main-link, .tree-sublink');
    interactiveEls.forEach(el => {
      // Efeitos de hover (mouse-enter/mouse-leave)
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      });

      // Efeitos de click (mouse-down/mouse-up)
      el.addEventListener('mousedown', () => {
        el.style.transform = 'translateY(1px)';
      });
      el.addEventListener('mouseup', () => {
        el.style.transform = 'translateY(-2px)';
      });
    });
  }
});