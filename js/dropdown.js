
// DROPDOWNS

async function toggleDropdown() {
    // Mostrar u ocultar el dropdown
    // const dropdown = document.querySelector('.dropdown').classList.toggle('show');
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
    // Rotar la flecha
    const arrow = document.querySelector('.arrow');
    if (arrow) {
        arrow.classList.toggle('rotate');
    }
}

async function showProgrammer() {
    // Mostrar la sección de Programador y ocultar Mecánico
    document.getElementById('contenedor-exp-programador').style.display = 'block';
    document.getElementById('contenedor-exp-mecanico').style.display = 'none';

    // Marcar Programador como activo en el dropdown
    document.getElementById('dropdown-programmer').classList.add('active');
    document.getElementById('dropdown-mechanic').classList.remove('active');
    
    // await actualizarContenedorExp('cv_programmer');
}

async function showMechanic() {
    // Mostrar la sección de Mecánico y ocultar Programador
    document.getElementById('contenedor-exp-programador').style.display = 'none';
    document.getElementById('contenedor-exp-mecanico').style.display = 'block';

    // Marcar Mecánico como activo en el dropdown
    document.getElementById('dropdown-programmer').classList.remove('active');
    document.getElementById('dropdown-mechanic').classList.add('active');

    // await actualizarContenedorExp('cv_mechanic');
}

// Cerrar el dropdown si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-title')) {
        let dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                document.querySelector('.arrow').classList.remove('rotate');
            }
        }
    }
}

async function actualizarContenedorExp(data_section, idioma) {
    const data = await cargarDatos(idioma);

    // Obtener el contenido para programador y Actualizar el atributo data-section
    const contenedorExp = document.getElementById('contenedor-exp');
    const h3Element = contenedorExp.querySelector('h3');

    h3Element.setAttribute('data-section', data_section);
    h3Element.setAttribute('data-value', 'title');

    if (data[data_section] && data[data_section].title) {
        h3Element.textContent = data[data_section].title;
    }
}
