// PDF segun idioma elegido

async function establecerPDF(idioma){
    const data = await cargarDatos(idioma);
    if (window.location.pathname.endsWith("cv_developer.html")){
        if(data && data.cv_pagina){
            const pdf_data = data.cv_pagina;
            document.getElementById('pdf').src = pdf_data.pdf_developer;
        };
    };
    if (window.location.pathname.endsWith("cv_mechanic.html")){
        if(data && data.cv_pagina){
            const pdf_data = data.cv_pagina;
            document.getElementById('pdf').src = pdf_data.pdf_mechanic;
        };
    };
};

if (window.location.pathname.endsWith("cv_developer.html")){
    console.log("developer html")
    idiomas.addEventListener("click", (e) =>{
        const nuevoIdioma = e.target.parentElement.dataset.language;
        cambiarIdioma(nuevoIdioma);
        establecerPDF(nuevoIdioma);
    });
}