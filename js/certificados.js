if (window.location.pathname.endsWith("certificados.html")){
    console.log("certificados html")
    document.addEventListener('DOMContentLoaded', function () {
        let botones = document.querySelectorAll('.contenedor-botones-certificados button');

        // Función para cambiar el PDF mostrado
        function cambiarPDF(event) {
            let botonClickeado = event.target; // El botón que fue clickeado
            // console.log(botonClickeado);

            // Si el botón ya tiene la clase active, no hacemos nada
            if (botonClickeado.classList.contains('active')) return;
            // Remover la clase active de todos los botones
            botones.forEach(boton => boton.classList.remove('active'));
            // Añadir la clase active al botón clickeado
            botonClickeado.classList.add('active');

            let src = botonClickeado.getAttribute('data-src'); // Obtiene el 'data-src' del botón
            let iframe = document.getElementById('pdf-iframe'); // Selecciona el iframe
            if (iframe) {
                iframe.src = src; // Cambia el 'src' del iframe al del botón
            }
        }

        // Añade el evento 'click' a cada botón
        botones.forEach(function (boton) {
            boton.addEventListener('click', cambiarPDF);
        });
    });
};