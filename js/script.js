/**
 * LINKTREE INTERATIVO - LAFRATTA JR
 * Funções:
 * 1. Atualiza o ano no footer automaticamente
 * 2. Controla a abertura/fechamento dos grupos de links (Details/Summary)
 * 3. Adiciona efeitos de interação nos botões (Hover/Click)
 * 4. Animação de carregamento (fade-in e slide-up)
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== ATUALIZA O ANO NO FOOTER =====
  // Procura pelo elemento com o ID 'year' e atualiza seu conteúdo com o ano atual.
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ===== CONTROLE DOS GRUPOS DE LINKS (DETAILS/SUMMARY) =====
  // Seleciona todos os elementos com a classe 'tree-group' (que são as tags <details>).
  const treeGroups = document.querySelectorAll('.tree-group');
  
  treeGroups.forEach(group => {
    // Para cada grupo, encontra o elemento <summary> e o ícone de alternância.
    const summary = group.querySelector('summary');
    const toggleIcon = summary.querySelector('.toggle-icon');
    
    // Inicializa o texto do ícone de acordo com o estado inicial do grupo (aberto ou fechado).
    if (group.hasAttribute('open')) {
      toggleIcon.textContent = '−'; // Se estiver aberto, mostra '-'
    } else {
      toggleIcon.textContent = '+'; // Se estiver fechado, mostra '+'
    }

    // Adiciona um ouvinte de evento de clique ao <summary> para controlar a abertura/fechamento.
    summary.addEventListener('click', function(e) {
      // Impede o comportamento padrão do <summary> para que possamos controlar a animação.
      e.preventDefault();
      
      // Alterna o atributo 'open' no elemento <details>, que controla sua visibilidade.
      group.toggleAttribute('open');
      
      // Atualiza o texto do ícone e aplica/remove a altura máxima para a animação de slide.
      if (group.hasAttribute('open')) {
        toggleIcon.textContent = '−';
        // Define a altura máxima para a altura de rolagem para que a animação de 'max-height' funcione.
        group.style.maxHeight = group.scrollHeight + 'px';
      } else {
        toggleIcon.textContent = '+';
        // Remove a altura máxima para que o conteúdo possa encolher.
        group.style.maxHeight = null;
      }
    });
  });

  // ===== EFEITOS DE HOVER E CLIQUE NOS BOTÕES =====
  // Seleciona todos os elementos interativos: links principais, sublinks e botões sociais.
  const interactiveElements = document.querySelectorAll('.tree-main-link, .tree-sublink, .social-button');
  
  interactiveElements.forEach(element => {
    // Efeito ao passar o mouse sobre o elemento.
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)'; // Move ligeiramente para cima.
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'; // Adiciona uma sombra.
    });
    
    // Efeito ao remover o mouse do elemento.
    element.addEventListener('mouseleave', function() {
      this.style.transform = ''; // Reseta a posição.
      this.style.boxShadow = ''; // Reseta a sombra.
    });
    
    // Efeito ao pressionar o botão do mouse sobre o elemento.
    element.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(1px)'; // Move ligeiramente para baixo.
    });
    
    // Efeito ao soltar o botão do mouse sobre o elemento.
    element.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-2px)'; // Retorna à posição de hover.
    });
  });

  // ===== ANIMAÇÃO DE CARREGAMENTO (FADE-IN E SLIDE-UP) =====
  // CORREÇÃO: O seletor foi alterado de '.container' para 'document.body' ou '.tree-container'
  // já que a div '.container' não está presente no HTML atual.
  // Usar document.body é mais seguro para aplicar um efeito global de entrada.
  const container = document.body; // Alvo da animação de carregamento

  if (container) {
    // Aplica estilos iniciais para a animação.
    // Estes estilos devem ser definidos no CSS ou diretamente aqui para a transição.
    // Ex: container.style.opacity = '0'; container.style.transform = 'translateY(20px)';
    
    // Após um curto atraso, remove os estilos iniciais para iniciar a animação.
    setTimeout(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
      // Nota: As propriedades 'opacity' e 'transform' para a animação
      // precisam ter transições definidas no CSS para 'body' ou '.container'.
      // Exemplo no CSS para 'body': transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }, 100);
  }
});