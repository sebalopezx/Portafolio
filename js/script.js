// DETECTAR PAGINA INDEX
function esPaginaIndex() {
    return window.location.pathname.endsWith('') || window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
};


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

// cambiarIdiomaSeleccionado('es');
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

    // Actualizar los titulos de redes sociales
    const redesSocialesNav = document.querySelector('.redes nav');
    if (redesSocialesNav) {
        redesSocialesTexto(redesSocialesNav, texto);
        cambiarIdiomaSeleccionado(texto.idioma);
    }

    const redesSocialesNavFooter = document.querySelector('.redes-footer nav');
    if (redesSocialesNavFooter) {
        redesSocialesTexto(redesSocialesNavFooter, texto);
        cambiarIdiomaSeleccionado(texto.idioma);
    }

    // Mandar el cambio de idioma para guardar en localStorage
    // cambiarIdiomaSeleccionado(texto.idioma);
};


function redesSocialesTexto(redSocial, texto) {
    let redesSocialesCount = 5
    
    for (let i = 1; i <= redesSocialesCount; i++) {
        const link = redSocial.querySelector(`li[data-nav="${i}"] a`);

        if (link) {
            const titleKey = `nav${i}`;  // Crear la clave dinámica (nav1, nav2, etc.)
            link.setAttribute('title', texto.nav[titleKey]); // Asignar el título desde el JSON
        }
    }
}

// MENU RESPONSIVE

/* TOGGLE de menu responsive */
let menuVisible = false;

// Funcion que oculta o muestra menu
function menuMostrarOcultar(){
    let menu =  document.getElementById("nav");
    let icono = document.getElementById("icono-menu");
    if(menuVisible){
        menu.classList = "";
        icono.style.color = "#f5f5f5";
    }else{
        menu.classList = "responsive";
        icono.style.color = "#2bff00";
    };
    menuVisible = !menuVisible;
};

// Cambia icono al mostrar menu
function cambiarClase(){
    let icono = document.getElementById("icono-menu");
    icono.classList.toggle("fa-bars-staggered");
}; 

// Obtener el elemento del menú responsive y agregar el evento click
const menuResponsive = document.getElementById('click-responsive');
menuResponsive.addEventListener('click', (event) => {
    event.stopPropagation();
    menuMostrarOcultar();
    cambiarClase();
});
// Evento global para cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (event) => {
    // event.preventDefault();
    const nav = document.getElementById("nav");

    // Si el menú está abierto y se hace clic fuera del nav, se cierra
    if (menuVisible && !nav.contains(event.target)) {
        event.preventDefault();
        menuMostrarOcultar();
        cambiarClase();
    }
});

// Obtener todos los enlaces del menú y agregar el evento click a cada uno
const menuLinks = document.querySelectorAll('#nav ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', (evento) => {
        evento.preventDefault();
        menuMostrarOcultar();
        cambiarClase();
        // seleccionar();
        // const pagina = esPaginaIndex()}
        const targetID = link.getAttribute('href');
        if(esPaginaIndex() && targetID.startsWith('#')){
            const targetSeccion = document.querySelector(targetID);
            if (targetSeccion) {
                targetSeccion.scrollIntoView({ behavior: 'smooth' });
            }
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
        rootMargin: "50px 400px",
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
    if (elementoTitulo) {
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
    }
   


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

const listaIconos = ["fa-gamepad","fa-bicycle","fa-headphones","fa-desktop","fa-car","fa-book", "fa-user-ninja"]


const cargarIntereses = async (idioma) => {
    const contenedorIntereses = document.getElementById("contenedor-intereses");
    const contenedorStack = document.getElementById("stack-destacado");

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

    if (esPaginaIndex()){
        if (contenedorIntereses) {
            contenedorIntereses.innerHTML = nuevoContenedorIntereses;
        }
        if (contenedorStack) {
            contenedorStack.innerHTML = nuevoContenedorStack;
        }
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
        <img class="animacion stack-img" src="${stack.image}" alt="${stack.name}" title="${stack.name}">`;
    return stackHTML;
};



// ANIMACIÓN SKILLS

const efectoHabilidades =()=>{
    let skills = document.getElementById("skills");
    if (skills) {
        let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

        if(distancia_skills >= 300){
            let habilidades = document.getElementsByClassName("progreso");
            if (habilidades) {
                for (i=0;i<habilidades.length;i++){
                    habilidades[i].classList.add("lvl");
                };
            }
        };
    }
};

// if (esPaginaIndex()) {
    window.onscroll = function () {
        efectoHabilidades();
    },{ passive:true };
// };


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
                <div class="progreso" style="--progreso:${skill.lvl}%">
                    <span class="valor-skill">${skill.value}</span>
                </div>
            </div>
        </div>`;
    return skillHTML;
};



const cargarSkills = async(idioma)=>{
    const contenedorConocimiento = document.getElementById("contenedor-conocimiento");
    const contenedorHerramientas = document.getElementById("contenedor-herramientas");
    const contenedorHabilidades = document.getElementById("contenedor-habilidades");

    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "skills" entrega una lista ordenada de los elementos
    const listaSkillsTecnicas = data.skills.skill;
    const listaSkillsHerramientas = data.skills.tools;
    const listaSkillsHabilidades = data.skills.ability;

    let nuevoContenedorSkillsTecnicas = recorrerListaSkills(listaSkillsTecnicas, crearSkill);
    let nuevoContenedorSkillsHerramientas = recorrerListaSkills(listaSkillsHerramientas, crearSkill);
    let nuevoContenedorSkillsHabilidades = recorrerListaSkills(listaSkillsHabilidades, crearHabilidad);
    

    if (esPaginaIndex()){
        if (contenedorConocimiento || contenedorHerramientas || contenedorHabilidades) {
            contenedorConocimiento.innerHTML = nuevoContenedorSkillsTecnicas;
            contenedorHerramientas.innerHTML = nuevoContenedorSkillsHerramientas;
            contenedorHabilidades.innerHTML = nuevoContenedorSkillsHabilidades;
        }
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

{/* <p>${cv.description}</p> */}

const crearCV = (cv, columna, posicion) => {
    const flecha_redireccion = '&#8617;';
    const agregar_tech =(cv)=>{
        let tech = '';
        let lista_tech = cv.tech
        // console.log(lista_tech);
        for (const t of lista_tech) {
            tech += ` <img class="img-project-tech" src="${t.image}" alt="${t.name}" title="${t.name}"/> `
        }
        return tech;
    }
    let cvHTML = `
        <div class="${columna}">
            <h4>${cv.name}</h4>
            <span class="lugar">${cv.place} 
                <a class="project-href link-white" ${cv.blank ? blank : null} href="${cv.href}">${cv.href ? flecha_redireccion : ''}</a>
            </span>
            <span class="fecha">${cv.date}</span>
            ${cv.tech 
                ? agregar_tech(cv)
                : ''
            }
            <p>
                ${cv.pdf
                ? `<a class="project-href link" href="certificados.html" data-certificados="${cv.pdf}">${cv.description} ${flecha_redireccion}</a>`
                : `${cv.description}`}
            </p>
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
            ${cv.image
                ? `<span class="badges"><img src="${cv.image}" alt="${cv.description}" title="${cv.description}"></span>`
                : ''
            }
            <span class="lugar">${cv.company}</span>
            <span class="fecha">${cv.date}</span>
            <p>
                <a class='link' href="${cv.url}" target="_blank">${cv.description} &#8617;</a>
            </p>
  
            <div class="conector${posicion}">
                <div class="circulo${posicion}"></div>
            </div>
        </div>`;
    return cursoHTML;
};


const cargarCV = async(idioma)=>{
    const contenedorEstudios = document.getElementById("contenedor-estudios");
    const contenedorCursos = document.getElementById("contenedor-cursos");
    const contenedorExpProgramador = document.getElementById("contenedor-exp-programador");
    const contenedorExpMecanico = document.getElementById("contenedor-exp-mecanico");

    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "cv" entrega una lista ordenada de los elementos
    const listaEstudios = data.education.education;
    const listaCursos = data.courses.courses;
    const listaExpProgramador = data.cv_programmer.cv_programmer;
    const listaExpMecanico = data.cv_mechanic.cv_mechanic;

    let nuevoContenedorEstudios = recorrerListaCV(listaEstudios, crearCV, "item izq");
    let nuevoContenedorCursos = recorrerListaCV(listaCursos, crearCursos, "item izq");
    let nuevoContenedorExpProgramador = recorrerListaCV(listaExpProgramador, crearCV, "item der");
    let nuevoContenedorExpMecanico = recorrerListaCV(listaExpMecanico, crearCV, "item der");
    

    if (esPaginaIndex()){
        if (contenedorEstudios || contenedorCursos || contenedorExpProgramador || contenedorExpMecanico){
            contenedorEstudios.innerHTML = nuevoContenedorEstudios;
            contenedorCursos.innerHTML = nuevoContenedorCursos;
            contenedorExpProgramador.innerHTML = nuevoContenedorExpProgramador;
            contenedorExpMecanico.innerHTML = nuevoContenedorExpMecanico;
        }
    }
}

// Recorres cada lista sacada desde la data de los JSON
const recorrerListaCV = (lista, crearCV, columna) => {
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

const crearProyectos = (proyecto, indexProyectos, proyectosConfig) => {
    let proyectoHTML = `
        <div class="proyecto animacion" data-nav="${indexProyectos}" id="${proyecto.id}">
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
                <button class="ver-detalle">${proyectosConfig.btn_detail}</button>
            </div>
        </div>`;
    return proyectoHTML;
};
const crearLenguajes = (proyecto) => {
    let stackHTML = "";
    let lenguajes = proyecto.languages;
    for (let l of lenguajes){
        stackHTML += `
            <img src="${l}" alt="" title="">
        `;
    }
    return stackHTML;
};
const crearBoton = () => {
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


const cargarProyectos = async(idioma) => {
    const contenedorGaleria = document.getElementById("galeria");
    const contenedorGaleriaProfesionales = document.getElementById("galeria_profesionales");

    // Se carga la data del JSON segun idioma
    const data = await cargarDatos(idioma);
    // JSON "projects" entrega una lista ordenada de los elementos
    const proyectosConfig = data.projects.projectsConfig;
    const listaProyectos = data.projects.study_projects;
    const listaProyectosProfesionales = data.projects.professional_projects;

    listaProyectos.sort((a, b) => a.order - b.order);
    listaProyectosProfesionales.sort((a, b) => a.order - b.order);

    let nuevoContenedorProyectos = recorrerListaProyectos(listaProyectos, crearProyectos, proyectosConfig);
    let nuevoContenedorProyectosProfesionales = recorrerListaProyectos(listaProyectosProfesionales, crearProyectos, proyectosConfig);

    if (esPaginaIndex()) {
        if (contenedorGaleria || contenedorGaleriaProfesionales) {
            contenedorGaleria.innerHTML = nuevoContenedorProyectos;
            contenedorGaleriaProfesionales.innerHTML = nuevoContenedorProyectosProfesionales;
            aplicarIntersectionObserver(".animacion");
        }
    }
};

// Recorres cada lista sacada desde la data de los JSON
let indexProyectos = 0;

const recorrerListaProyectos = (lista, crearProyectos, proyectosConfig) => {
    let nuevoContenedor = "";
    for (let i = 0; i < lista.length; i++){
        nuevoContenedor += crearProyectos(lista[i], indexProyectos, proyectosConfig);
        indexProyectos++;
    }
    return nuevoContenedor;
};
  


