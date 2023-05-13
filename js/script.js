
let menuVisible = false;
// let claseMenu = "fa-solid fa-bars-sort";
//let icono = document.getElementById("icono-menu");


// funcion que oculta o muestra menu
function menuMostrarOcultar(){
    
    if(menuVisible){
        document.getElementById("nav").classList = "";

        document.getElementById("icono-menu").style.color = "#f5f5f5";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList = "responsive";
        //document.getElementById("nav").style.transition = "to bottom 0.5s";

        document.getElementById("icono-menu").style.color = "#2bff00";
        menuVisible = true;
        
    }
}

// ocultar el menu una vez que selecciono una opcion
function seleccionar(){
    if(menuVisible){
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } 
}
// Cambia icono al mostrar menu
function cambiarClase(){
    let icono = document.getElementById("icono-menu");
    icono.classList.toggle("fa-bars-staggered");
}


// Cambio de color al fijar opcion en NAVEGADOR 
// const fijar = (id)=>{
//     if(id === "click-inicio"){
//         document.getElementById("click-inicio").style.color = "#2bff00";
//         // document.getElementById("click-inicio").style.boxShadow = "0px 0px 10px 4px green";
//         // document.getElementById("click-inicio").style.borderRadius = "15px";         
//     }
//     else if(id !== "click-inicio"){
//         document.getElementById("click-inicio").style.color = "#f5f5f5";
//         // document.getElementById("click-inicio").style.boxShadow = "none";  
//     }
//     if(id === "click-acercade"){
//         document.getElementById("click-acercade").style.color = "#2bff00";         
//     }
//     else if(id !== "click-acercade"){
//         document.getElementById("click-acercade").style.color = "#f5f5f5";  
//     }
//     if(id === "click-skills"){
//         document.getElementById("click-skills").style.color = "#2bff00";         
//     }
//     else if(id !== "click-skills"){
//         document.getElementById("click-skills").style.color = "#f5f5f5";  
//     }
//     if(id === "click-cv"){
//         document.getElementById("click-cv").style.color = "#2bff00";         
//     }
//     else if(id !== "click-cv"){
//         document.getElementById("click-cv").style.color = "#f5f5f5";  
//     }
//     if(id === "click-proyectos"){
//         document.getElementById("click-proyectos").style.color = "#2bff00";         
//     }
//     else if(id !== "click-proyectos"){
//         document.getElementById("click-proyectos").style.color = "#f5f5f5";  
//     }
//     if(id === "click-contacto"){
//         document.getElementById("click-contacto").style.color = "#2bff00";         
//     }
//     else if(id !== "click-contacto"){
//         document.getElementById("click-contacto").style.color = "#f5f5f5";  
//     }
// }


// Cambio de color al fijar opcion en NAVEGADOR 

// Obtener todos los enlaces del menú
const menuLinks = document.querySelectorAll('nav ul li a');
//console.log(menuLinks);

// Crear un Intersection Observer para detectar cuando una sección está en el viewport
const visualizar = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        const ID = entrada.target.getAttribute('id');
        const link = document.querySelector(`nav ul li a[href="#${ID}"]`);
        if (entrada.isIntersecting) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { threshold: 0.5 });
  
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





// BORRAR ? !
// const clickResponsiveHTML =()=>{
//     let clickResponsiveHTML = 
//     `<i class="fa-solid fa-bars"></i>`;
//     document.getElementById("crear-responsive").innerHTML = clickResponsiveHTML; 
// }
// const clickResponsivePresionadoHTML =()=>{
//     let clickResponsivePresionadoHTML = 
//     `<div class="menu-responsive" onclick="menuMostrarOcultar()" id="click-responsive">
//         <i class="fa-solid fa-bars-sort"></i>
//     </div>`;  
//     document.getElementById("crear-responsive").innerHTML = clickResponsivePresionadoHTML; 
// }

let tipado = new Typed(".titulo-inicio", {
    strings: ["Desarrollador Junior","Ingeniero Mecánico"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

// let tipado2 = new Typed(".informacion", {
//     strings: [
//         `Soy una persona responsable, comprometido con mi trabajo, ordenado y meticuloso, 
//         dispuesto a dar mi mayor esfuerzo para brindar las necesidades que ser requieran, 
//         con ganas de aprender nuevas tecnologías, metodologías y todo lo que pueda complementarme 
//         tanto en lo profesional como en lo personal. <br>
//             En estos momentos soy estudiante de la carrera de analista programador y estoy en busca 
//         de experiencias laborales relacionado a ello, aunque actualmente soy titulado de ingeniería
//         en mecánica automotriz, y trabajo como mecánico de mantenimiento preventivo y correctivo 
//         de trenes para Metro de Santiago. <br>
//             Poseo conocimientos básicos de Python, Tkinter, SQL (MySQL, Oracle), Html y Css, 
//         y me encuentro complementando mis estudios con cursos en Udemy mientras saco mi carrera.`
//     ],
//     typeSpeed: 1,
//     backSpeed: 10,
//     backDelay: 1000,
//     loop: false
// })



// funcion que aplica las animaciones de las habilidades
const efectoHabilidades =()=>{
    let skills = document.getElementById("skills");
    let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("lvl");
        // habilidades[1].classList.add("lvl");
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
window.onscroll = function(){
    efectoHabilidades();
}



// Scroll para sliders de animaciones de contenedores
// const menu = document.querySelectorAll(".contenedor-header");
const menu = document.getElementById("contenedor-header");
const nav = document.querySelectorAll(".contenedor-header header nav ul li");
// const menu_responsive = document.getElementsByClassName(".contenedor-header header nav ul li .responsive");
const menu_responsive = document.getElementById("click-responsive");
const nav_responsive = document.getElementById("nav");
// const nav_responsive = document.querySelectorAll(".contenedor-header header nav ul li .responsive");

// BANNER
const banner = document.querySelector(".banner");
const imgBanner = document.getElementById("cont-img-banner");
const redes = document.querySelectorAll(".redes nav a")

// TITULOS PRINCIPALES
// const titulo1 = document.getElementById("titulo-inicio1");
// const titulo2 = document.getElementById("titulo-inicio2");

const titulo = document.querySelectorAll(".titulo");
const tituloDerecha = document.querySelectorAll(".tituloDerecha");
// const titulo_inicio = document.getElementById("");
// const titulos = document.getElementById("");

// BOTONES
const boton = document.querySelectorAll(".boton");

// COLUMNAS
const centro = document.querySelectorAll(".centro");
const izquierda = document.querySelectorAll(".izquierda");
const derecha = document.querySelectorAll(".derecha");

// PROYECTOS
const proyectos = document.querySelectorAll(".proyectos .galeria .proyecto");



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
observador.observe(menu);
nav.forEach((enlace) => {
    observador.observe(enlace);
});
observador.observe(menu_responsive);

observador.observe(nav_responsive);
// nav_responsive.forEach((enlace) => {
//     observador.observe(enlace);
// });

// banner
observador.observe(banner);
observador.observe(imgBanner);
// observador.observe(titulo1);
// observador.observe(titulo2);
redes.forEach((enlace) => {
    observador.observe(enlace);
});

titulo.forEach((enlace) => {
    observador.observe(enlace);
});
tituloDerecha.forEach((enlace) => {
    observador.observe(enlace);
});
boton.forEach((enlace) => {
    observador.observe(enlace);
});
izquierda.forEach((enlace) => {
    observador.observe(enlace);
});
derecha.forEach((enlace) => {
    observador.observe(enlace);
});
centro.forEach((enlace) => {
    observador.observe(enlace);
});
proyectos.forEach((enlace) => {
    observador.observe(enlace);
});
// Agrega la animación al menú responsive al hacer clic

// nav_responsive.addEventListener("click", () => {
//     nav_responsive.classList.toggle("animado");
    // if (nav_responsive.classList.contains("animado")) {
    //   nav_responsive.classList.toggle("animado");
    // } else {
    //   nav_responsive.classList.add("animado");
    // }
// });

// observador.observe(titulo_inicio);
// observador.observe(titulos);








// window.addEventListener("scroll", function(){
//     let animacion = this.document.getElementById("");
//     let posicionObj = animacion.getBoundingClientRect().top;
//     console.log(posicionObj);
// })