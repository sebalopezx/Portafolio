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
const obtenerVersionVisibleModal = (proyecto) => {
    if (Array.isArray(proyecto.versions) && proyecto.versions.length > 0) {
        return proyecto.versions.find(version => version.principal) || proyecto.versions[proyecto.versions.length - 1];
    }

    return proyecto;
};

const obtenerLinkWeb = (version, proyecto) => {
    return version.ref_web || version.ref1 || version.ref || version.url || proyecto.ref_web || proyecto.ref1 || proyecto.ref || proyecto.url;
};

const obtenerLinkRepositorio = (version, proyecto) => {
    return version.ref_github || version.ref2 || proyecto.ref_github || proyecto.ref2;
};

const crearParrafosInfo = (proyecto, versionVisible) => {
    const infosProyecto = Object.keys(proyecto)
        .filter(key => /^info\d+$/.test(key) && proyecto[key])
        .sort((a, b) => Number(a.replace('info', '')) - Number(b.replace('info', '')))
        .map(key => proyecto[key]);
    const infos = infosProyecto.length > 0
        ? infosProyecto
        : [versionVisible.info1, versionVisible.info2].filter(Boolean);

    return infos
        .map((info, index) => `
            ${index > 0 ? '<hr class="separador">' : ''}
            <p class="modal-parrafo">${renderInfoModal(info)}</p>
        `)
        .join('');
};

const renderInfoModal = (info) => {
    const partesInfo = info.split(':');

    if (partesInfo.length < 2) {
        return info;
    }

    const titulo = partesInfo.shift();
    const descripcion = partesInfo.join(':').trim();
    return `<span class="modal-info-titulo">${titulo}:</span> ${descripcion}`;
};

const crearBotonesWeb = (proyecto, proyectosConfig) => {
    const tieneListaVersiones = Array.isArray(proyecto.versions) && proyecto.versions.length > 0;
    const versionVisible = obtenerVersionVisibleModal(proyecto);
    const versiones = tieneListaVersiones
        ? proyecto.versions
        : [{ label: proyectosConfig.btn_web, ref: proyecto.ref, private: proyecto.private || versionVisible.private }];
    const tieneVariasVersiones = versiones.length > 1;

    return versiones
        .filter(version => obtenerLinkWeb(version, proyecto))
        .map(version => {
            const linkVersion = obtenerLinkWeb(version, proyecto);
            const textoBoton = tieneVariasVersiones && version.label
                ? `${proyectosConfig.btn_web} ${version.label}`
                : proyectosConfig.btn_web;

            return `
                <a class="modal-link-boton" href="${linkVersion}" target="_blank">
                    <button class="modal-ver ${version.private ? `private-content` : ``}"
                        data-private-question="${proyectosConfig.private_question}"
                    >
                        <span class="texto-boton">${textoBoton}</span>
                        <i class="fa-solid fa-file-export"></i>
                        <span class="overlay"></span>
                    </button>
                </a>
            `;
        })
        .join('');
};

const crearBotonesRepositorio = (proyecto, proyectosConfig) => {
    const tieneListaVersiones = Array.isArray(proyecto.versions) && proyecto.versions.length > 0;
    const versionVisible = obtenerVersionVisibleModal(proyecto);
    const versiones = tieneListaVersiones
        ? proyecto.versions
        : [{
            label: proyectosConfig.btn_github,
            ref2: proyecto.ref2,
            show_github: proyecto.show_github || versionVisible.show_github
        }];
    const tieneVariasVersiones = versiones.length > 1;

    return versiones
        .filter(version => obtenerLinkRepositorio(version, proyecto))
        .map(version => {
            const linkVersion = obtenerLinkRepositorio(version, proyecto);
            const showGithub = version.show_github || proyecto.show_github;
            const textoBase = showGithub
                ? proyectosConfig.btn_github
                : proyectosConfig.btn_link_company;
            const textoBoton = tieneVariasVersiones && version.label
                ? `${textoBase} ${version.label}`
                : textoBase;
            const claseBoton = showGithub ? 'modal-git' : 'modal-company';
            const iconoBoton = showGithub ? 'fa-brands fa-github' : 'fa-solid fa-briefcase';

            return `
                <a class="modal-link-boton" href="${linkVersion}" target="_blank">
                    <button class="${claseBoton}">
                        <span class="texto-boton">${textoBoton}</span>
                        <i class="${iconoBoton}"></i>
                        <span class="overlay"></span>
                    </button>
                </a>
            `;
        })
        .join('');
};

const crearModal = (proyecto, proyectosConfig) => {
    const versionVisible = obtenerVersionVisibleModal(proyecto);

    let modalHTML = `    
        <h3 class="modal-titulo">${versionVisible.title}</h3>
        <div class="contenedor-modal-img">
            <img src="${versionVisible.image2}" alt="${versionVisible.title}" title="${versionVisible.title}" class="modal-img">
        </div>
        ${crearParrafosInfo(proyecto, versionVisible)}
        <div class="modal-botones">
            <div class="modal-botones-grupo">
                ${crearBotonesWeb(proyecto, proyectosConfig)}
            </div>
            <button class="btn modal-close">
                <span class="texto-boton">${proyectosConfig.btn_close}</span>
                <i class="fa-solid fa-x"></i>
                <span class="overlay"></span>
            </button>
            <div class="modal-botones-grupo">
                ${crearBotonesRepositorio(proyecto, proyectosConfig)}
            </div>
        </div>`;
    return modalHTML;
};


document.addEventListener('click', function (event) {
    const target = event.target.closest('.private-content');
    if (target) {
        const private_question = target.getAttribute('data-private-question');
        if (!confirm(private_question)) {
            event.preventDefault();
        }
    }
});
