// CARGADO DE PAGINA 

// Cuando se carga la pagina se ejecutan funciones principales para cargar idioma
document.addEventListener("DOMContentLoaded", async () => {
    // Cargar contenido inicial en el idioma deseado y segun pagina ejectuada
    await cambiarIdioma(idiomaInicial);
    if (esPaginaIndex()) {
        await tipado(idiomaInicial); 
        await cargarIntereses(idiomaInicial);
        await cargarSkills(idiomaInicial);
        await cargarCV(idiomaInicial);
        await cargarProyectos(idiomaInicial);
        if (typeof establecerPlaceholders === "function") {
            await establecerPlaceholders(idiomaInicial);
        }
    } else {
        console.log("sin placeholders")
    };
});

// Escuchar clicks para cambio de idioma e iniciar funciones segun pagina (modulo)
if (esPaginaIndex()){
    idiomas.addEventListener("click", (e) =>{
        const nuevoIdioma = e.target.parentElement.dataset.language;
        cambiarIdioma(nuevoIdioma);
        tipado(nuevoIdioma);
        cargarIntereses(nuevoIdioma);
        cargarSkills(nuevoIdioma);
        cargarCV(nuevoIdioma);
        cargarProyectos(nuevoIdioma);
        if (typeof establecerPlaceholders === "function") {
            establecerPlaceholders(nuevoIdioma);
        }
    });
    let botonesShowCV = document.querySelectorAll('.dropdown-content .dropdown-item');
    botonesShowCV.forEach(boton => {
        boton.addEventListener('click', () => {
            const nuevoIdioma = obtenerIdiomaSeleccionado();
            if (boton.id == "dropdown-programmer") {
                showProgrammer();
                actualizarContenedorExp('cv_programmer', nuevoIdioma);
            } else if (boton.id === 'dropdown-mechanic') {
                showMechanic();
                actualizarContenedorExp('cv_mechanic', nuevoIdioma);
            }
        })
    })
} else {
    console.log("Sin info")
};