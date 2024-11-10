// FUNCIÓN DE APERTURA DE MODALES
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector('.modal');
    const contenedorModal = document.querySelector('.modal-contenedor');

    document.body.addEventListener('click', async (e) => {
        if (e.target.classList.contains('ver-detalle')) {
            e.preventDefault();
            // Lógica para proyectos
            abrirModalProyecto(e);
        } else if (e.target.classList.contains('project-href')) {
            e.preventDefault();
            // Lógica para CV
            abrirModalCV(e);
        }
    });

    // Función para abrir modal de proyectos
    async function abrirModalProyecto(e) {
        let proyectoDiv = e.target.closest('.proyecto');
        let proyectoId = proyectoDiv?.id;

        if (!proyectoId) {
            console.error('No se encontró el proyecto relacionado.');
            return;
        }

        const idiomaActual = obtenerIdiomaSeleccionado();
        const data = await cargarDatos(idiomaActual);
        const listaProyectos = data.projects.study_projects.concat(data.projects.professional_projects);

        const proyecto = listaProyectos.find(p => p.id === proyectoId);
        // console.log("proyecto PERO DESDE LOS PROYECTOS NMORMALES : ",proyecto)

        if (proyecto) {
            contenedorModal.innerHTML = crearModal(proyecto, data.projects.projectsConfig);
            modal.classList.add('mostrar-modal');
            cerrarModal();
        } else {
            console.error(`Proyecto con ID ${proyectoId} no encontrado`);
        }
    }

    // Función para abrir modal del CV
    async function abrirModalCV(e) {
        let cvDiv = e.target.closest('.project-href');
        let href = cvDiv?.href; 
        let proyectoID = href.split('/').pop();
        
        console.log(href)
        if (!href) {
            console.error('No se encontró el href relacionado.');
            return;
        }

        const idiomaActual = obtenerIdiomaSeleccionado();
        const data = await cargarDatos(idiomaActual);

        if (href.endsWith('.html')) {
            const datasetPDF = cvDiv.dataset.certificados;
            console.log(datasetPDF)
            
            window.location.href = `certificados.html?pdf=${encodeURIComponent(datasetPDF)}`;
  
        } else {
            let proyecto = {};
            const listaProyectos = data.projects;

            if (proyectoID.includes('profesional')) {
                proyecto = listaProyectos.professional_projects.find(p => p.id === proyectoID);
            } else {
                proyecto = listaProyectos.study_projects.find(p => p.id === proyectoID);
            }
            console.log(proyecto)

            if (proyecto) {
                contenedorModal.innerHTML = crearModal(proyecto, listaProyectos.projectsConfig);
                modal.classList.add('mostrar-modal');
                cerrarModal();
            } else {
                console.error(`Proyecto relacionado no encontrada para href: ${proyectoID}`);
            }
        }
    }

    // Función para cerrar el modal
    function cerrarModal() {
        const closeModal = document.querySelector('.modal-close');
        closeModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('mostrar-modal');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('mostrar-modal');
            }
        });
    }
});




// MODAL DE PROYECTOS

// HTML para creación de modales
const crearModal = (proyecto, proyectosConfig) => {
    let modalHTML = `    
        <h3 class="modal-titulo">${proyecto.title}</h3>
        <div class="contenedor-modal-img">
            <img src="${proyecto.image2}" alt="${proyecto.title}" title="${proyecto.title}" class="modal-img">
        </div>
        <p class="modal-parrafo">${proyecto.info1}</p>
        <hr class="separador">
        <p class="modal-parrafo">${proyecto.info2}</p>
        <div class="modal-botones">
            <a href="${proyecto.ref}" target="_blank">
                    <button class="modal-ver">
                    <span class="texto-boton">${proyectosConfig.btn_web}</span>
                    <i class="fa-solid fa-file-export"></i>

                    <span class="overlay"></span>
                </button>
            </a>
            <button class="btn modal-close">
                <span class="texto-boton">${proyectosConfig.btn_close}</span>
                <i class="fa-solid fa-x"></i>
                <span class="overlay"></span>
            </button>
            <a href="${proyecto.ref2}" target="_blank">
                    ${proyecto.show_github 
                    ?   
                        `<button class="modal-git">
                        <span class="texto-boton">${proyectosConfig.btn_github}</span>
                        <i class="fa-brands fa-github"></i>`
                    :   
                        `<button class="modal-company">
                        <span class="texto-boton">${proyectosConfig.btn_link_company}</span>
                        <i class="fa-solid fa-briefcase"></i>`
                    }
                    <span class="overlay"></span>
                </button>
            </a>
        </div>`;
    return modalHTML;
};