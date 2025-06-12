document.addEventListener('DOMContentLoaded', function() {
    // Overlay inicial
    const overlay = document.getElementById('preload-overlay');
    const enterButton = document.getElementById('enter-button');
    
    document.body.classList.add('preload-active');
    
    enterButton.addEventListener('click', function() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.classList.remove('preload-active');
            
            // Inicia a música após a interação
            const musicPlayer = document.getElementById('bgMusic');
            musicPlayer.play().catch(e => console.log("Autoplay não permitido"));
        }, 500);
    });

    // Slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function showNextSlide() {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        
        setTimeout(showNextSlide, 5000);
    }
    
    slides[0].classList.add('active');
    slides[0].style.opacity = '1';
    setTimeout(showNextSlide, 5000);

    // Controle de música
    const musicPlayer = document.getElementById('bgMusic');
    const playButton = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    musicPlayer.volume = 0.4;
    let userInteracted = false;

    function togglePlay() {
        if (musicPlayer.paused) {
            musicPlayer.play()
                .then(() => {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                })
                .catch(error => {
                    console.log("Falha ao reproduzir:", error);
                });
        } else {
            musicPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    function handleFirstInteraction() {
        if (!userInteracted) {
            musicPlayer.muted = false;
            userInteracted = true;
            // Tenta reproduzir novamente após interação
            musicPlayer.play()
                .then(() => {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                });
        }
    }

    // Configuração inicial dos ícones
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';

    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    // Efeito de digitação
    const title = document.querySelector('.love-header h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100);
});