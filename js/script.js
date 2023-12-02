// CAMBIO DE IDIOMA

// Función para guardar el idioma seleccionado en localStorage
function guardarIdiomaSeleccionado(idioma) {
    localStorage.setItem('idiomaSeleccionado', idioma);
};

// Función para obtener el idioma seleccionado de localStorage
function obtenerIdiomaSeleccionado() {
    return localStorage.getItem('idiomaSeleccionado') || 'es'; // Valor predeterminado 'es'
};

// Función para cambiar el idioma seleccionado y guardar en localStorage
function cambiarIdiomaSeleccionado(idioma) {
    guardarIdiomaSeleccionado(idioma);
    // Aquí podrías realizar las acciones necesarias para refrescar la página o cargar el contenido en el nuevo idioma  
};

cambiarIdiomaSeleccionado('es');
const idiomaInicial = obtenerIdiomaSeleccionado();


// Función para establecer el idioma activo
function establecerIdiomaActivo(idioma) {
    const botonesIdioma = document.querySelectorAll('.idioma_item');

    botonesIdioma.forEach(boton => {
        const botonIdioma = boton.getAttribute('data-language');
        if (botonIdioma === idioma) {
            boton.classList.add('active');
        } else {
            boton.classList.remove('active');
        }
    });
};

// Escuchar clicks en los botones de idioma
document.querySelectorAll('.idioma_item').forEach(boton => {
    boton.addEventListener('click', () => {
        const idiomaSeleccionado = boton.getAttribute('data-language');
        localStorage.setItem('idioma', idiomaSeleccionado); // Guardar en Local Storage
        establecerIdiomaActivo(idiomaSeleccionado);

        // Aquí puedes llamar a funciones para cambiar el contenido según el idioma
        // cambiarIdioma(idiomaSeleccionado);
    });
});

// Establecer el idioma activo al cargar la página
establecerIdiomaActivo(idiomaInicial);


/* TOOGLE de cambio de idioma */
const idiomas = document.getElementById("idiomas");
// Obtenemos NODOS con todos los elementos HTML que contengan [data-section]
const cambiarTexto = document.querySelectorAll("[data-section]");

const cambiarIdioma = async (lenguaje) =>{
    // Cargamos el JSON segun idioma obtenido
    const requestJson = await fetch(`./languages/${lenguaje}.json`);
    const texto = await requestJson.json();

    // FOR para recorrer todo el documento JSON y cambiar valores segun idioma
    for (const textoACambiar of cambiarTexto){
        const seccion = textoACambiar.dataset.section;
        const valor = textoACambiar.dataset.value;

        textoACambiar.innerHTML = texto[seccion][valor];
    };
    // Mandar el cambio de idioma para guardar en localStorage
    cambiarIdiomaSeleccionado(texto.idioma);
};

// Cuando se carga la pagina se ejecutan funciones principales para cargar idioma
document.addEventListener("DOMContentLoaded", async () => {
    // Cargar contenido inicial en el idioma deseado y segun pagina ejectuada
    await cambiarIdioma(idiomaInicial);
    if (window.location.pathname.endsWith("index.html")){
        await tipado(idiomaInicial); 
        await cargarIntereses(idiomaInicial);
        await cargarSkills(idiomaInicial);
        await cargarCV(idiomaInicial);
        await cargarProyectos(idiomaInicial);
        await establecerPlaceholders(idiomaInicial);
    };
});

// Escuchar clicks para cambio de idioma e iniciar funciones segun pagina (modulo)
if (window.location.pathname.endsWith("index.html")){
    idiomas.addEventListener("click", (e) =>{
        const nuevoIdioma = e.target.parentElement.dataset.language;
        cambiarIdioma(nuevoIdioma);
        tipado(nuevoIdioma);
        cargarIntereses(nuevoIdioma);
        cargarSkills(nuevoIdioma);
        cargarCV(nuevoIdioma);
        cargarProyectos(nuevoIdioma);
        establecerPlaceholders(nuevoIdioma);
    });
};
if (window.location.pathname.endsWith("cv.html")){
    idiomas.addEventListener("click", (e) =>{
        const nuevoIdioma = e.target.parentElement.dataset.language;
        cambiarIdioma(nuevoIdioma);
        establecerPDF(nuevoIdioma);
    });
};



// MENU RESPONSIVE

/* TOGGLE de menu responsive */
let menuVisible = false;

// Funcion que oculta o muestra menu
function menuMostrarOcultar(){
    if(menuVisible){
        document.getElementById("nav").classList = "";
        document.getElementById("icono-menu").style.color = "#f5f5f5";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList = "responsive";
        document.getElementById("icono-menu").style.color = "#2bff00";
        menuVisible = true;
    };
};

// Cambia icono al mostrar menu
function cambiarClase(){
    let icono = document.getElementById("icono-menu");
    icono.classList.toggle("fa-bars-staggered");
}; 

// Obtener el elemento del menú responsive y agregar el evento click
const menuResponsive = document.getElementById('click-responsive');
menuResponsive.addEventListener('click', () => {
    menuMostrarOcultar();
    cambiarClase();
});

// Obtener todos los enlaces del menú y agregar el evento click a cada uno
const menuLinks = document.querySelectorAll('#nav ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', (evento) => {
        evento.preventDefault();
        menuMostrarOcultar();
        cambiarClase();
        // seleccionar();
        const pagina = esPaginaIndex()
        if(pagina){
            const targetID = link.getAttribute('href');
            const targetSeccion = document.querySelector(targetID);
            targetSeccion.scrollIntoView({ behavior: 'smooth' });
        }else{
            // Si se esta en index.html, redirecciona al href del enlace
            window.location.href = link.getAttribute('href');
        };
    });
});



// LINKS DE MENU DE NAVEGACIÓN 

// Crear un Intersection Observer para detectar cuando una sección está en el viewport
const visualizar = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        const ID = entrada.target.getAttribute('id');
        
        // Obtener todos los enlaces del menú
        const link = document.querySelector(`nav ul li a[href="#${ID}"]`);
     
        // Funcion para indicar link activo
        if (entrada.isIntersecting) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        };
    });
}, { threshold: .9 }); // Establecer límite de observado
  
// Visualizar cada sección para detectar cuando entra y sale del viewport
const secciones = document.querySelectorAll('section');
secciones.forEach(seccion => {
    visualizar.observe(seccion);
});

// Agrega evento clic a cada enlace del menú
menuLinks.forEach(link => {
    link.addEventListener('click', (evento) => {
    // Prevenir el comportamiento predeterminado de los enlaces
    // evento.preventDefault();

    // Obtener el identificador de la sección a la que se enlaza
    const targetID = link.getAttribute('href');

    // Remover la clase 'active' de todos los enlaces del menú
    menuLinks.forEach(menuLink => {
        // menuLink.classList.toggle("active");
        menuLink.classList.remove('active');
    });

    // Agregar la clase 'active' al enlace del menú actual
    link.classList.add('active');

    // Desplazarse suavemente hasta la sección correspondiente
    const pagina = esPaginaIndex()
    if(pagina){
        const targetSeccion = document.querySelector(targetID);
        targetSeccion.scrollIntoView({ behavior: 'smooth' });
    }else{
        // Si se esta en index.html, redirecciona al href del enlace
        window.location.href = link.getAttribute('href');
    };
}, {passive:true});

    // Agregar evento 'touchstart' al enlace del menú
    link.addEventListener('touchstart', () => {
        // Remover la clase 'active' de todos los enlaces del menú
        menuLinks.forEach(menuLink => {
            menuLink.classList.remove('active');
        });

        // Agregar la clase 'active' al enlace del menú actual
        link.classList.add('active');
    }, { passive: true }); // Agregar el modificador 'passive' al evento 'touchstart'

    // Agregar evento 'scroll' al documento
    document.addEventListener('scroll', () => {
        // Remover la clase 'active' de todos los enlaces del menú
        menuLinks.forEach(menuLink => {
            menuLink.classList.remove('active');
        });

        // Obtener el enlace activo basado en la sección actualmente visible
        const activeLink = [...secciones].reverse().find(seccion => seccion.getBoundingClientRect().top <= 100);
        if (activeLink) {
            const target_ID = activeLink.getAttribute('ID');
            const link = document.querySelector(`nav ul li a[href="#${target_ID}"]`);
            link.classList.add('active');
        };
    }, { passive: true });

});



// Scroll para sliders de animaciones de contenedores

const animacion = document.querySelectorAll(".animacion");
const animacionNav = document.querySelectorAll("nav ul li");

const cargarAnimacion = (entradas, observador) => {

    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){

            const delay = entrada.target.dataset.nav; // Obtener el valor de data-nav
            entrada.target.style.transitionDelay = `${delay * 0.15}s`; // Aplicar retraso en la animación
            entrada.target.classList.add("animado");

        };
    }, { passive: true });   
};
// Parámetros para el intersecter
const aplicarIntersectionObserver = (selector) => {
    const elementos = document.querySelectorAll(selector);

    const observador = new IntersectionObserver(cargarAnimacion, {
        root: null,
        rootMargin: "50px 200px",
        // threshold: 0.3
        threshold: 0.25
    }, { passive: true });
    // Observador de elementos
    animacion.forEach((enlace)=>{
        observador.observe(enlace);
    });
    // Observador de elementos de menu o navegadores
    animacionNav.forEach((enlace)=>{
        observador.observe(enlace);
    });
    // Elementos creados despues de cargar la página
    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    aplicarIntersectionObserver(".animacion");
    aplicarIntersectionObserver("nav ul li");
});


// TIPADO AUTOMÁTICO

let instanciaTipado;
function tipado(idioma) {
    const elementoTitulo = document.querySelector(".titulo-inicio");
    if (instanciaTipado){
        instanciaTipado.destroy();
    };
    fetch(`./languages/${idioma}.json`)
        .then(response => response.json())
        .then(texto => {
            let titulos = texto.tipado.title;
    
            instanciaTipado = new Typed(elementoTitulo, {
                strings: titulos,
                typeSpeed: 100,
                backSpeed: 30,
                backDelay: 1500,
                loop: true
            });
        });
    };


// // FUNCION GENERAL para cargar datos de JSON segun idioma
const cargarDatos = async (idioma) => {
    try {
        const response = await fetch(`./languages/${idioma}.json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return null;
    };
};



// CREACIÓN DE CONTENDOR DE INTERESES 'acerca de'

const contenedorIntereses = document.getElementById("contenedor-intereses");
const contenedorStack = document.getElementById("stack-destacado");
const listaIconos = ["fa-gamepad","fa-bicycle","fa-headphones","fa-desktop","fa-car","fa-book"]

const cargarIntereses = async (idioma) => {
    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "interest" entrega una listaIntereses ordenada igual a listaIconos
    const listaIntereses = data.profile.interests;
    const listaStackDestacados = data.profile.stack;

    let nuevoContenedorIntereses = "";
    for (let i = 0; i < listaIntereses.length; i++) {
        nuevoContenedorIntereses += crearContenedorInteres(listaIntereses[i]);
    }
    let nuevoContenedorStack = "";
    for (let i = 0; i < listaStackDestacados.length; i++){
        nuevoContenedorStack += crearContenedorStackDestacado(listaStackDestacados[i], [i]);
    }

    if (window.location.pathname.endsWith("index.html")){
        contenedorIntereses.innerHTML = nuevoContenedorIntereses;
        contenedorStack.innerHTML = nuevoContenedorStack;
    }
};
// HTML para contenedores de intereses
const crearContenedorInteres = (valor)=>{
    let interesHTML = `
    <div class="intereses">
        <i class="${valor.icon}"></i>
        <span class="valor-interes">${valor.name}</span>
    </div>`;
    return interesHTML;
};
// HTML para contenedores de stack destacado
const crearContenedorStackDestacado = (stack, index)=>{
    let stackHTML = `
        <img class="animacion" data-nav="${index}" src="${stack.image}" alt="${stack.name}">`;
    return stackHTML;
};



// ANIMACIÓN SKILLS

const efectoHabilidades =()=>{
    let skills = document.getElementById("skills");
    let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        for (i=0;i<habilidades.length;i++){
            habilidades[i].classList.add("lvl");
        };
    };
};

// detectar scrolling para aplicar animación de barra hab
function esPaginaIndex() {
    return window.location.pathname.endsWith('index.html');
};

if (esPaginaIndex()) {
    window.onscroll = function () {
        efectoHabilidades();
    };
};


// Creacion de skills 

const crearSkill =(skill)=>{
    let skillHTML = `
        <div class="skill">
            <div class="contenedor-skill">
                <div class="skills-img">
                    <img src="${skill.image}" alt="${skill.name}">
                </div>
            </div>
            <div class="barra-skill">
                <span class="nombre-skill">${skill.name}</span>
                <div class="progreso " style="--progreso:${skill.lvl}%">
                    <span class="valor-skill">${skill.value}</span>
                </div>
            </div>
        </div>`;
    return skillHTML;
};

const crearHabilidad =(skill)=>{
    let skillHTML = `
        <div class="skill">
            <span><i class="${skill.icon}"></i></span>
            <div class="barra-skill">
                <span class="nombre-habilidad">${skill.name}</span>
                <div class="progreso " style="--progreso:${skill.lvl}%">
                    <span class="valor-skill">${skill.value}</span>
                </div>
            </div>
        </div>`;
    return skillHTML;
};



const contenedorConocimiento = document.getElementById("contenedor-conocimiento");
const contenedorHerramientas = document.getElementById("contenedor-herramientas");
const contenedorHabilidades = document.getElementById("contenedor-habilidades");


const cargarSkills = async(idioma)=>{
    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "interest" entrega una listaIntereses ordenada igual a listaIconos
    const listaSkillsTecnicas = data.skills.skill;
    const listaSkillsHerramientas = data.skills.tools;
    const listaSkillsHabilidades = data.skills.ability;

    let nuevoContenedorSkillsTecnicas = recorrerListaSkills(listaSkillsTecnicas, crearSkill);
    let nuevoContenedorSkillsHerramientas = recorrerListaSkills(listaSkillsHerramientas, crearSkill);
    let nuevoContenedorSkillsHabilidades = recorrerListaSkills(listaSkillsHabilidades, crearHabilidad);
    

    if (window.location.pathname.endsWith("index.html")){
        contenedorConocimiento.innerHTML = nuevoContenedorSkillsTecnicas;
        contenedorHerramientas.innerHTML = nuevoContenedorSkillsHerramientas;
        contenedorHabilidades.innerHTML = nuevoContenedorSkillsHabilidades;
    }
}

// Recorres cada lista sacada desde la data de los JSON
const recorrerListaSkills = (lista, crearSkill)=>{
    let nuevoContenedor = "";
    for (let i = 0; i < lista.length; i++){
        nuevoContenedor += crearSkill(lista[i]);
    }
    return nuevoContenedor;
};



// Creacion de estudios, cursos y experiencia

const crearCV =(cv, columna, posicion)=>{
    let cvHTML = `
        <div class="${columna}">
            <h4">${cv.name}</h4>
            <span class="lugar">${cv.place}</span>
            <span class="fecha">${cv.date}</span>
            <p>${cv.description}</p>
            
            <div class="conector${posicion}">
                <div class="circulo${posicion}"></div>
            </div>
        </div>`;
    return cvHTML;
};
const crearCursos =(cv, columna, posicion)=>{
    let cursoHTML = `
        <div class="${columna}">
            <h4">${cv.name}</h4>
            <span class="lugar">${cv.company}</span>
            <span class="fecha">${cv.date}</span>
            <p>
                <a href="${cv.url}" target="_blank">${cv.description}</a>
            </p>
            <div class="conector${posicion}">
                <div class="circulo${posicion}"></div>
            </div>
        </div>`;
    return cursoHTML;
};

const contenedorEstudios = document.getElementById("contenedor-estudios");
const contenedorCursos = document.getElementById("contenedor-cursos");
const contenedorExpProgramador = document.getElementById("contenedor-exp-programador");
const contenedorExpMecanico = document.getElementById("contenedor-exp-mecanico");

const cargarCV = async(idioma)=>{
    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "interest" entrega una listaIntereses ordenada igual a listaIconos
    const listaEstudios = data.education.education;
    const listaCursos = data.courses.courses;
    const listaExpProgramador = data.cv_programmer.cv_programmer;
    const listaExpMecanico = data.cv_mechanic.cv_mechanic;

    let nuevoContenedorEstudios = recorrerListaCV(listaEstudios, crearCV, "item izq");
    let nuevoContenedorCursos = recorrerListaCV(listaCursos, crearCursos, "item izq");
    let nuevoContenedorExpProgramador = recorrerListaCV(listaExpProgramador, crearCV, "item der");
    let nuevoContenedorExpMecanico = recorrerListaCV(listaExpMecanico, crearCV, "item der");
    

    if (window.location.pathname.endsWith("index.html")){
        contenedorEstudios.innerHTML = nuevoContenedorEstudios;
        contenedorCursos.innerHTML = nuevoContenedorCursos;
        contenedorExpProgramador.innerHTML = nuevoContenedorExpProgramador;
        contenedorExpMecanico.innerHTML = nuevoContenedorExpMecanico;
    }
}

// Recorres cada lista sacada desde la data de los JSON
const recorrerListaCV = (lista, crearCV, columna)=>{
    let nuevoContenedor = "";
    let posicion = 0;
    switch (columna) {
        case "item izq":
            posicion = 1;
            break;
        case "item der":
            posicion = 2;
            break;
        }
    for (let i = 0; i < lista.length; i++){
        nuevoContenedor += crearCV(lista[i], columna, posicion);
    }
    return nuevoContenedor;
};



// Creacion de trabajos

const crearProyectos =(proyecto, index, proyectosConfig)=>{
    let proyectoHTML = `
        <div class="proyecto animacion" data-nav="${index}" id="${proyecto.id}">
            <img src="${proyecto.image1}" alt="${proyecto.title}" title="${proyecto.title}">           
            <div class="nombre-proyecto">
                <span>${proyecto.title}</span>
            </div>
            <div class="overlay">
                <h3>${proyecto.title}</h3>
                <div class="contenedor-img-projects">
                    ${crearLenguajes(proyecto)}
                </div>
                <p>${proyecto.type}</p>
                <button class="ver-detalle">${proyectosConfig.btn}</button>
            </div>
        </div>`;
    return proyectoHTML;
};
const crearLenguajes =(proyecto)=>{
    let stackHTML = "";
    let lenguajes = proyecto.languages;
    for (let l of lenguajes){
        stackHTML += `
            <img src="${l}" alt="" title="">
        `;
    }
    return stackHTML;
};
const crearBoton =()=>{
    const section = "projects";
    const btnValue = "btn";

    let button = document.createElement('button');
    button.classList.add('ver-detalle');
    button.setAttribute('data-section', section);
    button.setAttribute('data-value', btnValue);
    button.textContent = btnValue;

    overlay.appendChild(button);
    proyectoHTML.appendChild(overlay);

    return proyectoHTML;
}

const contenedorGaleria = document.getElementById("galeria");

const cargarProyectos = async(idioma)=>{
    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "interest" entrega una listaIntereses ordenada igual a listaIconos
    const proyectosConfig = data.projects.projectsConfig;
    const listaProyectos = data.projects.study_projects;

    let nuevoContenedorProyectos = recorrerListaProyectos(listaProyectos, crearProyectos, proyectosConfig);

    if (window.location.pathname.endsWith("index.html")){
        contenedorGaleria.innerHTML = nuevoContenedorProyectos;
        aplicarIntersectionObserver(".animacion");
    }
};

// Recorres cada lista sacada desde la data de los JSON
const recorrerListaProyectos =(lista, crearProyectos, proyectosConfig)=>{
    let nuevoContenedor = "";
    for (let i = 0; i < lista.length; i++){
        nuevoContenedor += crearProyectos(lista[i], [i], proyectosConfig);
    }
    return nuevoContenedor;
};




// MODAL DE PROYECTOS

// HTML para creación de modales
const crearModal = (proyecto, proyectosConfig) =>{
    let modalHTML = `    
        <h3 class="modal-titulo">${proyecto.title}</h3>
        <div class="contenedor-modal-img">
            <img src="${proyecto.image2}" alt="${proyecto.title}" title="${proyecto.title}" class="modal-img">
        </div>
        <p class="modal-parrafo">${proyecto.info1}</p>
        <hr>
        <p class="modal-parrafo">${proyecto.info2}</p>
        <div class="modal-botones">
            <a href="${proyecto.ref}" target="_blank">
                    <button class="modal-ver">
                    <span class="texto-boton">${proyectosConfig.btn1}</span>
                    <i class="fa-solid fa-file-export"></i>

                    <span class="overlay"></span>
                </button>
            </a>
            <button class="btn modal-close">
                <span class="texto-boton">${proyectosConfig.btn2}</span>
                <i class="fa-solid fa-x"></i>
                <span class="overlay"></span>
            </button>
            <a href="${proyecto.ref2}" target="_blank">
                    <button class="modal-git">
                    <span class="texto-boton">${proyectosConfig.btn3}</span>
                    <i class="fa-brands fa-github"></i>

                    <span class="overlay"></span>
                </button>
            </a>
        </div>`;
    return modalHTML;
};


// FUNCION DE APERTURA DE MODALES


document.addEventListener("DOMContentLoaded", function() {
    // const openModal = document.querySelectorAll('.ver-detalle');
    const modal = document.querySelector('.modal');
    const contenedorModal = document.querySelector('.modal-contenedor');

    document.body.addEventListener('click', async (e)=>{
        if (e.target.classList.contains('ver-detalle')){

            e.preventDefault();
            
            let proyectoDiv = e.target.closest('.proyecto');
            let proyectoId = proyectoDiv.id;
            console.log(proyectoId);

            const idiomaActual = obtenerIdiomaSeleccionado();
            const data = await cargarDatos(idiomaActual);
            const listaProyectos = data.projects.study_projects;
            const proyectosConfig = data.projects.projectsConfig;
            const proyecto = listaProyectos.find(p => p.id === proyectoId);

            // Crear y Mostrar el modal con click
            contenedorModal.innerHTML = crearModal(proyecto, proyectosConfig);
            modal.classList.add('mostrar-detalle');

            // // Para Cerrar el modal
            const closeModal = document.querySelector('.modal-close');
            closeModal.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('mostrar-detalle');
            });
        }

            // const idiomaActual = obtenerIdiomaSeleccionado();

            // const data = await cargarDatos(idiomaActual);
            // const listaProyectos = data.projects.study_projects;
            // // PROJECTS: entrega información general para el contenedor del proyecto y un documento embebido con datos del modal 
            // const proyecto = listaProyectos[proyectoId];

            // // Crear y Mostrar el modal con click
            // contenedorModal.innerHTML = crearModal(proyecto);
            // modal.classList.add('mostrar-detalle');

            // // Para Cerrar el modal
            // const closeModal = document.querySelector('.modal-close');
            // closeModal.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     modal.classList.remove('mostrar-detalle');
            // });
        });
    });




// const crearModal = (proyecto) =>{
//     let modalHTML = `    
//         <h3 class="modal-titulo">${proyecto.title}</h3>
//         <div class="contenedor-modal-img">
//             <img src="${proyecto.imagen}" alt="${proyecto.title}" title="${proyecto.title}" class="modal-img">
//         </div>
//         <p class="modal-parrafo">${proyecto.info1}</p>
//         <hr>
//         <p class="modal-parrafo">${proyecto.info2}</p>
//         <div class="modal-botones">
//             <a href="${proyecto.ref}" target="_blank">
//                     <button class="modal-ver">
//                     <span class="texto-boton">${proyecto.btn1}</span>
//                     <i class="fa-solid fa-file-export"></i>

//                     <span class="overlay"></span>
//                 </button>
//             </a>
//             <button class="btn modal-close">
//                 <span class="texto-boton">${proyecto.btn2}</span>
//                 <i class="fa-solid fa-x"></i>
//                 <span class="overlay"></span>
//             </button>
//             <a href="${proyecto.ref2}" target="_blank">
//                     <button class="modal-git">
//                     <span class="texto-boton">${proyecto.btn3}</span>
//                     <i class="fa-brands fa-github"></i>

//                     <span class="overlay"></span>
//                 </button>
//             </a>
//         </div>`;
//     return modalHTML;
// };


// // FUNCION DE APERTURA DE MODALES

// const openModal = document.querySelectorAll('.ver-detalle');
// const modal = document.querySelector('.modal');
// const contenedorModal = document.querySelector('.modal-contenedor')



// openModal.forEach((boton) => {
//     boton.addEventListener('click', async (e) => {
//         e.preventDefault();

//         let proyectoDiv = boton.closest('.proyecto');
//         let proyectoId = proyectoDiv.id;

//         const idiomaActual = obtenerIdiomaSeleccionado();

//         const data = await cargarDatos(idiomaActual);
//         const listaProyectos = data.projects;
//         // PROJECTS: entrega información general para el contenedor del proyecto y un documento embebido con datos del modal 
//         const proyecto = listaProyectos[proyectoId];

//         // Crear y Mostrar el modal con click
//         contenedorModal.innerHTML = crearModal(proyecto);
//         modal.classList.add('mostrar-detalle');

//         // Para Cerrar el modal
//         const closeModal = document.querySelector('.modal-close');
//         closeModal.addEventListener('click', (e) => {
//             e.preventDefault();
//             modal.classList.remove('mostrar-detalle');
//         });
//     });
// });



// CONTACTO 

// Función para establecer los valores de los placeholders en el formulario de contacto
async function establecerPlaceholders(idioma) {
    // const idiomaActual = obtenerIdiomaSeleccionado();
    const data = await cargarDatos(idioma);
    if (window.location.pathname.endsWith("index.html")){
        if (data && data.contact) {
            const placeholders = data.contact;
            document.getElementById('nombre').placeholder = placeholders.name;
            document.getElementById('email').placeholder = placeholders.email;
            document.getElementById('asunto').placeholder = placeholders.subject;
            document.getElementById('mensaje').placeholder = placeholders.message;
        };
    };
};



// PDF segun idioma elegido

async function establecerPDF(idioma){
    const data = await cargarDatos(idioma);
    if (window.location.pathname.endsWith("cv.html")){
        if(data && data.cv_pagina){
            const pdf_data = data.cv_pagina;
            document.getElementById('pdf').src = pdf_data.pdf;
        };
    };
};


