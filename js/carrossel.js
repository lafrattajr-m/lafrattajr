document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_1.png",
            titulo: "Soluções Digitais e Automação",
            descricao: "IA aplicada, automações inteligentes e sites que vendem sozinhos.",
            link: "https://lafrattajr.com.br/solucoes"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_2.png",
            titulo: "Estratégia e Posicionamento Digital",
            descricao: "Existe método por trás de cada clique. UX, branding e dados em ação.",
            link: "https://lafrattajr.com.br/portfolio"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_3.png",
            titulo: "Landing Page Corretor Imobiliário",
            descricao: "Imóvel certo, atendimento humano e CTA na hora certa.",
            link: "https://lafrattajr.com.br/corretor"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_4.png",
            titulo: "Minha Casa Minha Vida 2025",
            descricao: "As novas regras facilitam, mas ter um corretor experiente faz toda diferença.",
            link: "https://lafrattajr.com.br/mcmv"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_5.png",
            titulo: "Portfólio Profissional Estratégico",
            descricao: "Experiência, método e visão. Tudo reunido num só lugar.",
            link: "https://lafrattajr.com.br/portfolio"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_6.png",
            titulo: "Imóveis Disponíveis",
            descricao: "Busque, filtre, visualize e fale comigo. Tudo fácil e direto.",
            link: "https://lafrattajr.com/imoveis"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_7.png",
            titulo: "Investimentos Imobiliários",
            descricao: "Rentabilidade, valorização e liquidez. Você escolhe a estratégia.",
            link: "https://lafrattajr.com.br/investimento"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_8.png",
            titulo: "Linktree Premium dos Projetos",
            descricao: "Um só link, todos os projetos. Tudo conectado, visual e funcional.",
            link: "https://lafrattajr.com.br/links"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_9.png",
            titulo: "Perfil Profissional no LinkedIn",
            descricao: "Estratégia, autoridade e conteúdo. Conecte-se comigo no LinkedIn.",
            link: "https://linkedin.com/in/lafrattajr"
        },
        {
            img: "https://lafrattajr.com.br/imgs/projects/slide_lafratta_10.png",
            titulo: "Identidade Visual da Tríade Lafratta Jr",
            descricao: "Uma imagem, três pilares. Imobiliário, tecnologia e estratégia em sintonia.",
            link: "https://lafrattajr.com.br"
        }
    ];

    const containerSlides = document.querySelector('.slides');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');
    const containerIndicadores = document.querySelector('.indicadores');
    let currentIndex = 0;
    let autoSlideInterval;

    function renderSlides() {
        containerSlides.innerHTML = '';

        slides.forEach((slide, index) => {
            const slideHTML = `
                <div class="slide" role="group" aria-label="Slide ${index + 1} de ${slides.length}">
                    <a href="${slide.link}" target="_blank" rel="noopener noreferrer"
                       title="${slide.titulo}" aria-label="Ver projeto: ${slide.titulo}" class="image-link">
                        <img src="${slide.img}" alt="${slide.titulo}" loading="lazy"
                             onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'900\' height=\'506\'%3E%3Crect fill=\'%23f5f5f5\' width=\'900\' height=\'506\'/%3E%3Ctext fill=\'%23666\' font-family=\'Poppins\' font-size=\'24\' x=\'450\' y=\'253\' text-anchor=\'middle\'%3E${encodeURIComponent(slide.titulo)}%3C/text%3E%3C/svg%3E'">
                    </a>
                    <div class="legenda">
                        <h3>${slide.titulo}</h3>
                        <div class="descricao-wrapper">
                            <button class="fa-button" aria-label="Mostrar descrição do ${slide.titulo}" aria-expanded="false" aria-controls="desc-${index}">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            <div class="descricao" id="desc-${index}">
                                <p>${slide.descricao}</p>
                                <a href="${slide.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    Ver projeto completo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            containerSlides.insertAdjacentHTML('beforeend', slideHTML);
        });

        setupInteractions();
    }

    function setupInteractions() {
        document.querySelectorAll('.fa-button').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const desc = document.querySelectorAll('.descricao')[index];
                const isShowing = desc.classList.toggle('show');
                desc.hidden = !isShowing;

                const icon = btn.querySelector('i');
                icon.classList.toggle('fa-info-circle');
                icon.classList.toggle('fa-times');
                btn.setAttribute('aria-expanded', isShowing);

                if (isShowing) stopAutoSlide();
                else startAutoSlide();
            });
        });
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        containerSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();

        document.querySelectorAll('.descricao').forEach(desc => {
            desc.classList.remove('show');
            const btn = desc.closest('.descricao-wrapper').querySelector('.fa-button');
            btn.setAttribute('aria-expanded', 'false');
            btn.querySelector('i').classList.add('fa-info-circle');
            btn.querySelector('i').classList.remove('fa-times');
        });
    }

    function nextSlide() {
        if (!document.querySelector('.descricao.show')) goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (!document.querySelector('.descricao.show')) goToSlide(currentIndex - 1);
    }

    function createIndicators() {
        containerIndicadores.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicador ${index === 0 ? 'ativo' : ''}`;
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            containerIndicadores.appendChild(indicator);
        });
    }

    function updateIndicators() {
        document.querySelectorAll('.indicador').forEach((ind, i) => {
            ind.classList.toggle('ativo', i === currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    btnPrev.addEventListener('click', prevSlide);
    btnNext.addEventListener('click', nextSlide);

    document.querySelector('.carrossel').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.carrossel').addEventListener('mouseleave', startAutoSlide);

    renderSlides();
    createIndicators();
    startAutoSlide();
});
