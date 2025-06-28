document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Función para alternar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Bloquear el scroll cuando el menú está abierto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Evento para el botón del menú
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Cerrar el menú al redimensionar la ventana (si se cambia a desktop)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Carrusel de testimonios
document.addEventListener('DOMContentLoaded', function () {
    // Configuración del carrusel
    const carousel = document.getElementById('testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;
    const intervalTime = 5000; // Cambia cada 5 segundos

    // Crear puntos de navegación
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    // Función para mover el carrusel
    function goToTestimonial(index) {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentIndex = index;
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Mover el carrusel
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Auto-avance
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        goToTestimonial(currentIndex);
    }, intervalTime);

    // Pausar al hacer hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    // Reanudar al salir del hover
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            goToTestimonial(currentIndex);
        }, intervalTime);
    });
});

// Optimización para marquesina infinita
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + 24; // Ancho + gap
    
    // Clonamos las tarjetas para efecto infinito
    track.innerHTML += track.innerHTML;
    
    // Ajustamos la velocidad según el ancho
    function updateAnimation() {
        const duration = cards.length * 1.2;
        track.style.animationDuration = `${duration}s`;
    }
    
    updateAnimation();
    window.addEventListener('resize', updateAnimation);
    
    // Reinicio suave cuando llega al final
    track.addEventListener('animationiteration', () => {
        track.style.animation = 'none';
        void track.offsetWidth; // Trigger reflow
        track.style.animation = `scroll ${cards.length * 1.5}s linear infinite`;
    });
});

// Función para el botón de volver atrás
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de retroceso
    const backButtons = document.querySelectorAll('.back-arrow, [data-back]');
    
    // Añadir evento click
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
    
    // Validación básica del formulario
    const form = document.querySelector('.inscription-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert('¡Inscripción enviada con éxito!');
                form.reset();
                // Aquí podrías añadir envío AJAX o redirección
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        });
    }
});