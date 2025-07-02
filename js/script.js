document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o ano no rodapé automaticamente
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Controle dos ícones de abertura/fechamento nos grupos
  const treeGroups = document.querySelectorAll('.tree-group');

  treeGroups.forEach(group => {
    const summary = group.querySelector('summary');
    const icon = summary.querySelector('.toggle-icon');

    // Define o ícone de acordo com o estado inicial
    icon.textContent = group.hasAttribute('open') ? '−' : '+';

    summary.addEventListener('click', (e) => {
      e.preventDefault(); // Evita o comportamento padrão
      group.toggleAttribute('open');

      icon.textContent = group.hasAttribute('open') ? '−' : '+';
    });
  });

  // Efeitos de hover/click nos botões
  const interactiveEls = document.querySelectorAll('.tree-main-link, .tree-sublink');

  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-2px)';
      el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });

    el.addEventListener('mousedown', () => {
      el.style.transform = 'translateY(1px)';
    });

    el.addEventListener('mouseup', () => {
      el.style.transform = 'translateY(-2px)';
    });
  });

  // Animação de carregamento suave (fade + slide)
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';

  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 100);
});
