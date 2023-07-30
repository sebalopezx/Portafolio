let menuVisible = false;

// funcion que oculta o muestra menu
function menuMostrarOcultar(){
    if(menuVisible){
        document.getElementById("nav").classList = "";
        document.getElementById("icono-menu").style.color = "#f5f5f5";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList = "responsive";
        document.getElementById("icono-menu").style.color = "#2bff00";
        menuVisible = true;
    }
}

// Cambia icono al mostrar menu
function cambiarClase(){
    let icono = document.getElementById("icono-menu");
    icono.classList.toggle("fa-bars-staggered");
} 

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
        seleccionar();
        const targetID = link.getAttribute('href');
        const targetSeccion = document.querySelector(targetID);
        targetSeccion.scrollIntoView({ behavior: 'smooth' });
    });
});

// ocultar el menu una vez que selecciono una opcion
function seleccionar(){
    if(menuVisible){
        document.getElementById("nav").classList = "";
        document.getElementById("icono-menu").style.color = "#f5f5f5";
        cambiarClase();
        menuVisible = false;
    } 
}





// FUNCION MENU RESPONSIVE

// let menuVisible = false;
// let claseMenu = "fa-solid fa-bars-sort";
// let icono = document.getElementById("icono-menu");


// // funcion que oculta o muestra menu
// function menuMostrarOcultar(){
    
//     if(menuVisible){
//         document.getElementById("nav").classList = "";

//         document.getElementById("icono-menu").style.color = "#f5f5f5";
//         menuVisible = false;
//     }else{
//         document.getElementById("nav").classList = "responsive";
//         //document.getElementById("nav").style.transition = "to bottom 0.5s";

//         document.getElementById("icono-menu").style.color = "#2bff00";
//         menuVisible = true;
        
//     }
// }

// // ocultar el menu una vez que selecciono una opcion
// function seleccionar(){
//     if(menuVisible){
//         document.getElementById("nav").classList = "";
//         document.getElementById("icono-menu").style.color = "#f5f5f5";
//         cambiarClase();
//         menuVisible = false;
//     } 
// }
// // Cambia icono al mostrar menu
// function cambiarClase(){
//     let icono = document.getElementById("icono-menu");
//     icono.classList.toggle("fa-bars-staggered");
// }




// LINKS DE MENU  

// Obtener todos los enlaces del menú
// const menuLinks = document.querySelectorAll('.nav ul li a');

// Crear un Intersection Observer para detectar cuando una sección está en el viewport
const visualizar = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        const ID = entrada.target.getAttribute('id');
        const link = document.querySelector(`nav ul li a[href="#${ID}"]`);
     
        if (entrada.isIntersecting) {
            link.classList.add('active');
            // console.log(link);
        } else {
            link.classList.remove('active');
        }
    });
}, { threshold: 0.2 });
  
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
    //console.log(targetId);

    // Remover la clase 'active' de todos los enlaces del menú
    menuLinks.forEach(menuLink => {
        // menuLink.classList.toggle("active");
        menuLink.classList.remove('active');
    });

    ///////////////////////////////////////////

    // Agregar la clase 'active' al enlace del menú actual
    link.classList.add('active');

    // Desplazarse suavemente hasta la sección correspondiente
    const targetSeccion = document.querySelector(targetID);
    targetSeccion.scrollIntoView({ behavior: 'smooth' });
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
        }
    }, { passive: true });

});



// PDF
// const pdfURL = 'docs/SebastianLopezCV.pdf';
// const canvas = document.querySelector('.pdfview');
// const context = canvas.getContext('2d');

// const renderPDF = async () => {
//   const pdfDoc = await pdfjsLib.getDocument(pdfURL).promise;
//   const page = await pdfDoc.getPage(1);
//   const viewport = page.getViewport({ scale: 1 });
//   canvas.height = viewport.height;
//   canvas.width = viewport.width;

//   const renderContext = {
//     canvasContext: context,
//     viewport: viewport,
//   };
//   await page.render(renderContext);
// };

// renderPDF();





// TIPADO DE PALABRAS

// let tipado = new Typed(".titulo-inicio", {
//     strings: ["Desarrollador Junior","Ingeniero Mecánico"],
//     typeSpeed: 100,
//     backSpeed: 30,
//     backDelay: 1500,
//     loop: true
// });


// tipado();

function tipado() {
    let tipado = new Typed(".titulo-inicio", {
        strings: ["Desarrollador Junior", "Ingeniero Mecánico"],
        typeSpeed: 100,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si la URL actual es "index.html"
    if (window.location.pathname.endsWith("index.html")) {
        tipado();
    }
});
  


// ANIMACION SKILLS

const efectoHabilidades =()=>{
    let skills = document.getElementById("skills");
    let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("lvl");
        habilidades[1].classList.add("lvl");
        // habilidades[2].classList.add("lvl");
        // habilidades[3].classList.add("lvl");  
        // habilidades[4].classList.add("lvl"); 
        // habilidades[5].classList.add("lvl");
        // habilidades[6].classList.add("lvl");  
        // habilidades[7].classList.add("lvl"); 
        // habilidades[8].classList.add("lvl"); 
    }
}   

// detectar scrolling para aplicar animacion de barra hab
function esPaginaIndex() {
    return window.location.pathname.endsWith('index.html');
}

if (esPaginaIndex()) {
    window.onscroll = function () {
        efectoHabilidades();
    };
}

// window.onscroll = function(){
//     efectoHabilidades();
// }



// Scroll para sliders de animaciones de contenedores
// const seccion = document.querySelector(".animacion");
// const animacionCentro = document.querySelectorAll(".centro");
const animacion = document.querySelectorAll(".animacion");
// const animacionIzquierda = document.querySelectorAll(".izquierda");
const animacionNav = document.querySelectorAll("nav ul li");

// const derecha = document.querySelectorAll(".derecha");

// const menu = document.getElementById("contenedor-header");
// const nav = document.querySelectorAll(".contenedor-header header nav ul li");

// const menu_responsive = document.getElementById("click-responsive");
// const nav_responsive = document.getElementById("nav");


// // BANNER
// const banner = document.querySelector(".banner");
// const imgBanner = document.getElementById("cont-img-banner");
// const redes = document.querySelectorAll(".redes nav ul li")

// // TITULOS PRINCIPALES
// const titulo = document.querySelectorAll(".titulo");
// const tituloDerecha = document.querySelectorAll(".tituloDerecha");

// // BOTONES
// const boton = document.querySelectorAll(".boton");

// // COLUMNAS
// const centro = document.querySelectorAll(".centro");
// const izquierda = document.querySelectorAll(".izquierda");
// const derecha = document.querySelectorAll(".derecha");

// // PROYECTOS
// const proyectos = document.querySelectorAll(".proyectos .galeria .proyecto");



const cargarAnimacion = (entradas, observador) => {
    // if(entrada.isIntersecting){
    //     entrada.target.classList.add("animado");
    // }
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            console.log("entrada en el viewport");

            const delay = entrada.target.dataset.nav; // Obtener el valor de data-nav
            entrada.target.style.transitionDelay = `${delay * 0.15}s`; // Aplicar retraso en la animación
            entrada.target.classList.add("animado");

            // const delay2 = entrada.target.dataset.red; // Obtener el valor de data-nav
            // entrada.target.style.transitionDelay = `${delay2 * 0.5}s`; // Aplicar retraso en la animación
            // entrada.target.classList.add("animado");


            // const delay_red = entrada.target.dataset.red; // Obtener el valor de data-nav
            // entrada.target.style.transitionDelay = `${delay_red * 0.15}s`; // Aplicar retraso en la animación
            // entrada.target.classList.add("animado");
        }
    });
    
}
const observador = new IntersectionObserver(cargarAnimacion, {
    root: null,
    rootMargin: "50px 200px",
    threshold: 0.3
});

animacion.forEach((enlace)=>{
    observador.observe(enlace);
});
// animacionIzquierda.forEach((enlace)=>{
//     observador.observe(enlace);
// });
animacionNav.forEach((enlace)=>{
    observador.observe(enlace);
});




// observador.observe(menu);
// nav.forEach((enlace) => {
//     observador.observe(enlace);
// });
// observador.observe(menu_responsive);

// observador.observe(nav_responsive);


// // banner
// observador.observe(banner);
// observador.observe(imgBanner);

// redes.forEach((enlace) => {
//     observador.observe(enlace);
// });

// titulo.forEach((enlace) => {
//     observador.observe(enlace);
// });
// tituloDerecha.forEach((enlace) => {
//     observador.observe(enlace);
// });
// boton.forEach((enlace) => {
//     observador.observe(enlace);
// });
// izquierda.forEach((enlace) => {
//     observador.observe(enlace);
// });
// derecha.forEach((enlace) => {
//     observador.observe(enlace);
// });
// centro.forEach((enlace) => {
//     observador.observe(enlace);
// });
// proyectos.forEach((enlace) => {
//     observador.observe(enlace);
// });











// const menu = document.getElementById("contenedor-header");
// const nav = document.querySelectorAll(".contenedor-header header nav ul li");

// const menu_responsive = document.getElementById("click-responsive");
// const nav_responsive = document.getElementById("nav");


// // BANNER
// const banner = document.querySelector(".banner");
// const imgBanner = document.getElementById("cont-img-banner");
// const redes = document.querySelectorAll(".redes nav ul li")

// // TITULOS PRINCIPALES
// const titulo = document.querySelectorAll(".titulo");
// const tituloDerecha = document.querySelectorAll(".tituloDerecha");

// // BOTONES
// const boton = document.querySelectorAll(".boton");

// // COLUMNAS
// const centro = document.querySelectorAll(".centro");
// const izquierda = document.querySelectorAll(".izquierda");
// const derecha = document.querySelectorAll(".derecha");

// // PROYECTOS
// const proyectos = document.querySelectorAll(".proyectos .galeria .proyecto");



// const cargarAnimacion = (entradas, observador) => {
//     // if(entrada.isIntersecting){
//     //     entrada.target.classList.add("animado");
//     // }
//     entradas.forEach((entrada) => {
//         if(entrada.isIntersecting){
//             console.log("entrada en el viewport");

//             const delay = entrada.target.dataset.nav; // Obtener el valor de data-nav
//             entrada.target.style.transitionDelay = `${delay * 0.15}s`; // Aplicar retraso en la animación
//             entrada.target.classList.add("animado");

//             // const delay2 = entrada.target.dataset.red; // Obtener el valor de data-nav
//             // entrada.target.style.transitionDelay = `${delay2 * 0.5}s`; // Aplicar retraso en la animación
//             // entrada.target.classList.add("animado");


//             // const delay_red = entrada.target.dataset.red; // Obtener el valor de data-nav
//             // entrada.target.style.transitionDelay = `${delay_red * 0.15}s`; // Aplicar retraso en la animación
//             // entrada.target.classList.add("animado");
//         }
//     });
    
// }
// const observador = new IntersectionObserver(cargarAnimacion, {
//     root: null,
//     rootMargin: "50px 200px",
//     threshold: 0.3
// });
// observador.observe(menu);
// nav.forEach((enlace) => {
//     observador.observe(enlace);
// });
// observador.observe(menu_responsive);

// observador.observe(nav_responsive);


// // banner
// observador.observe(banner);
// observador.observe(imgBanner);

// redes.forEach((enlace) => {
//     observador.observe(enlace);
// });

// titulo.forEach((enlace) => {
//     observador.observe(enlace);
// });
// tituloDerecha.forEach((enlace) => {
//     observador.observe(enlace);
// });
// boton.forEach((enlace) => {
//     observador.observe(enlace);
// });
// izquierda.forEach((enlace) => {
//     observador.observe(enlace);
// });
// derecha.forEach((enlace) => {
//     observador.observe(enlace);
// });
// centro.forEach((enlace) => {
//     observador.observe(enlace);
// });
// proyectos.forEach((enlace) => {
//     observador.observe(enlace);
// });


// Esperamos a que el DOM esté completamente cargado
// const p = document.querySelectorAll(".proyecto");

// p.forEach((proyecto) => {
//     const overlay = proyecto.querySelector(".overlay");
//     const boton = proyecto.querySelector(".ver-detalle");
  
//     proyecto.addEventListener("mouseenter", function () {
//       overlay.style.opacity = 1;
//       boton.style.display = "none"; // Ocultamos el botón al inicio del hover
//     });
  
//     proyecto.addEventListener("mouseleave", function () {
//       overlay.style.opacity = 0;
//       boton.style.display = "none"; // Ocultamos el botón al salir del hover
//     });
  
//     overlay.addEventListener("transitionend", function (event) {
//       // Mostramos el botón solo cuando la opacidad sea 0.5 (50%) o superior (efecto hover completo)
//       if (event.propertyName === "opacity" && parseFloat(overlay.style.opacity) >= 0.5) {
//         boton.style.display = "inline-block";
//       }
//     });
//   });
  
// const p = document.querySelectorAll(".proyecto");

// p.forEach((proyecto) => {
//     const overlay = proyecto.querySelector(".overlay");
//     const boton = proyecto.querySelector(".ver-detalle");
//     const overlayOpacity = window.getComputedStyle(overlay).opacity;
//     console.log(boton);
//     console.log(overlayOpacity);

//     proyecto.addEventListener("mouseenter", function () {
//         overlay.style.opacity = 1;
//         const overlayOpacity = parseFloat(window.getComputedStyle(overlay).opacity);
    
//         if (overlayOpacity >= 0.5) {
//           boton.style.pointerEvents = "auto";
//         } else {
//           boton.style.pointerEvents = "none";
//         }
//       });
    
//       proyecto.addEventListener("mouseleave", function () {
//         overlay.style.opacity = 0;
//         boton.style.pointerEvents = "none";
//       });
//     });


//     if (overlayOpacity  >= 0.5){
//         boton.style.pointerEvents = "auto";
//     }
// });
  



  


// PORTAFOLIO - PROYECTOS
const proyectos = [
    {
        id:"proyecto1",
        nombre:"APP Inglés",
        imagen:"images/proyecto1_modal.png",
        info1:"Proyecto propio, creado con html, css y javascript para aprender y practicar las funcionalidades básicas de estos lenguajes, y reforzar el inglés.",
        info2:"> El proyecto es una aplicación web creada utilizando las tecnologías HTML, CSS y JavaScript. Su objetivo principal es proporcionar"+ 
        " una herramienta para mejorar y practicar el conocimiento del inglés, enfocándose en el aprendizaje de verbos en diferentes conjugaciones.",    
        ref:"https://sebalopezx.github.io/app-ingles/"
    },
    {
        id:"proyecto2",
        nombre:"Carrito de Compras",
        imagen:"images/proyecto2_modal.png",
        info1:"Proyecto de instituto, desarrollada como parte del curso de Front-End con uso de HTML, CSS y JS con LocalStorage.",
        info2:"> Se ha desarrollado una aplicación funcional de un carrito de compras utilizando el LocalStorage."+
        " Además, se ha fortalecido la comprensión de conceptos clave en el desarrollo web y la importancia de una interfaz interactiva y amigable para el usuario.",    
        ref:"https://sebalopezx.github.io/carrito_compras/"
    }
];

// MODAL DE PROYECTOS

const crearModal = (proyecto) =>{
let modalHTML = `
    
        <h3 class="modal-titulo">${proyecto.nombre}</h3>
        <div class="contenedor-modal-img">
            <img src="${proyecto.imagen}" alt="${proyecto.nombre}" title="${proyecto.nombre}" class="modal-img">
        </div>
        <p class="modal-parrafo">${proyecto.info1}</p>
        <hr>
        <p class="modal-parrafo">${proyecto.info2}</p>
        <div class="modal-botones">
            <a href="${proyecto.ref}" target="_blank">
                    <button class="modal-ver">
                    <span class="texto-boton">Ver</span>
                    <i class="fa-solid fa-file-export"></i>

                    <span class="overlay"></span>
                </button>
            </a>
            <button class="btn modal-close">
                <span class="texto-boton">Cerrar</span>
                <i class="fa-solid fa-x"></i>
                <span class="overlay"></span>
            </button>
        </div>
    `;
    return modalHTML;
}



// FUNCION DE APERTURA DE MODALES

const openModal = document.querySelectorAll('.ver-detalle');
const modal = document.querySelector('.modal');
const contenedorModal = document.querySelector('.modal-contenedor')


openModal.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let proyectoDiv = boton.closest('.proyecto');
        let proyectoId = proyectoDiv.id;
        let proyecto = proyectos.find((p) => p.id === proyectoId);
        contenedorModal.innerHTML = crearModal(proyecto);
        modal.classList.add('mostrar-detalle');

        // PARA CERRAR EL MODAL
        const closeModal = document.querySelector('.modal-close');
        closeModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('mostrar-detalle');
        });
    });
});


// const openModal = document.querySelectorAll('.ver-detalle');
// const modal = document.querySelector('.modal');
// const contenedorModal = document.querySelector('.modal-contenedor');

// openModal.forEach((boton) => {
//   boton.addEventListener('click', (e) => {
//     e.preventDefault();
//     let proyectoDiv = boton.closest('.proyecto');
//     let proyectoId = proyectoDiv.id;
//     let proyecto = proyectos.find((p) => p.id === proyectoId);

//     // Deshabilitamos el botón durante la transición
//     boton.style.pointerEvents = 'none';

//     contenedorModal.innerHTML = crearModal(proyecto);
//     modal.classList.add('mostrar-detalle');

//     // PARA CERRAR EL MODAL
//     const closeModal = document.querySelector('.modal-close');
//     closeModal.addEventListener('click', (e) => {
//       e.preventDefault();
//       modal.classList.remove('mostrar-detalle');
//     });
//   });
// });

// // Agregamos un listener al evento transitionend para habilitar el botón después de la transición
// const overlays = document.querySelectorAll('.proyecto .overlay');
// overlays.forEach((overlay) => {
//   overlay.addEventListener('transitionend', () => {
//     const boton = overlay.querySelector('button.ver-detalle');
//     boton.style.pointerEvents = 'auto';
//   });
// });


