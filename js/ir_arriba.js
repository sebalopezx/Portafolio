document.addEventListener('DOMContentLoaded', () => {
    const botonArriba = document.querySelector('.ir_arriba');
    const seccionInicio = document.getElementById('inicio');

    // Intersection Observer para detectar cuando la sección de inicio está visible
    const observerInicio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Si la sección de inicio no está visible, hacer el botón flotante
                botonArriba.classList.add('flotante');
                botonArriba.classList.add('visible');
                botonArriba.style.opacity = '1';
                botonArriba.style.transform = 'scale(1)'; 
            } else {
                botonArriba.style.opacity = '0';
                botonArriba.style.transform = 'scale(0.5)';
                // Si la sección de inicio está visible, quitar el estilo flotante
                setTimeout(() => {
                    botonArriba.classList.remove('flotante');
                    botonArriba.classList.remove('visible');
                }, 300);
            }
        });
    }, { threshold: 0.5 });


    let lastScrollPosition = 0; 
    // Evento de scroll para detectar cuando se desplaza hacia arriba
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition < lastScrollPosition) {
            // Si se está desplazando hacia arriba y el footer no está visible
            if (!isInicioVisible()) {
                botonArriba.classList.add('flotante');
                botonArriba.classList.add('visible');
            }
        }

        // Actualizar la posición del scroll
        lastScrollPosition = currentScrollPosition;
    });
    
    function isInicioVisible() {
        const InicioRect = seccionInicio.getBoundingClientRect();
        return (InicioRect.top < window.innerHeight && InicioRect.bottom >= 0);
    }


    // Observar la sección de inicio
    observerInicio.observe(seccionInicio);

});

