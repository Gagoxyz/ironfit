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
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials-track');

  // Clona las tarjetas una vez
  track.innerHTML += track.innerHTML;

  // Ajusta la duración de la animación en función del ancho
  function updateAnimationDuration() {
    const trackWidth = track.scrollWidth;
    const speed = 200; // px por segundo
    const duration = trackWidth / speed;

    track.style.animationDuration = `${duration}s`;
  }

  updateAnimationDuration();
  window.addEventListener('resize', updateAnimationDuration);
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
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        });
    }
});