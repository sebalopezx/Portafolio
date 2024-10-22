
// CONTACTO 

// Función para establecer los valores de los placeholders en el formulario de contacto
async function establecerPlaceholders(idioma) {
    // const idiomaActual = obtenerIdiomaSeleccionado();
    const data = await cargarDatos(idioma);
    if (esPaginaIndex()){
        if (data && data.contact) {
            const placeholders = data.contact;
            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');
            const asuntoInput = document.getElementById('asunto');
            const mensajeInput = document.getElementById('mensaje');

            if (nombreInput || emailInput || asuntoInput || mensajeInput) {
                nombreInput.placeholder = placeholders.name;
                emailInput.placeholder = placeholders.email;
                asuntoInput.placeholder = placeholders.subject;
                mensajeInput.placeholder = placeholders.message;
            }
        };
    };
};


// const btnContacto = document.getElementById('btnContacto');

// Se obtiene el valor de idioma y data.json desde funciones de script.js
const obtenerDataContacto = async () => {
    let idiomaContacto = obtenerIdiomaSeleccionado();
    const data = await cargarDatos(idiomaContacto);
    // Se retorna la data necesaria solo para los modales de contacto
    return data.contact_modal;
}

if (esPaginaIndex()) {
    document.getElementById('formulario')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            // Desempaquetamos los valores de la data JSON en variables
            obtenerDataContacto().then(result => {
                const title_data = result.title;
                const text_data = result.text;

                const title_error = result.title_error;
                const text_error = result.text_error;

                const serviceID = 'default_service';
                const templateID = 'template_9pe89eh';

                // Se inicia la API de EMAILJS pasando las variables
                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        Swal.fire({
                            title: title_data,
                            text: text_data,
                            icon: 'success',
                            iconColor: '#2bff00',
                            showConfirmButton: false,
                            timer: 4000,
                            timerProgressBar: true,
                            customClass: {
                                title: 'titulo-alert',
                                popup: 'popup-alert',
                                timerProgressBar: 'timer-alert'
                            },
                            didOpen: () => {
                                Swal.showLoading()
                                // const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    // b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        })
                    }, (err) => {
                        Swal.fire({
                            title: title_error,
                            text: text_error,
                            icon: 'error',
                            iconColor: 'red',
                            showConfirmButton: false,
                            timer: 4000,
                            timerProgressBar: true,
                            customClass: {
                                title: 'titulo-alert',
                                popup: 'popup-alert-error',
                                timerProgressBar: 'timer-alert-error'
                            },
                            didOpen: () => {
                                Swal.showLoading()
                                // const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    // b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        })
                        // alert(JSON.stringify(err));
                    });

            });

        });
    }

// MODALES PARA PRUEBAS

// const btnContacto = document.getElementById('btnContacto');

// btnContacto.addEventListener('click',()=>{
//     Swal.fire({
//         title: 'Tu mensaje ha sido enviado.',
//         text: 'Te respondere en la brevedad, Saludos.',
//         icon: 'success',
//         iconColor: '#2bff00',
//         showConfirmButton: false,
//         timer: 4000,
//         timerProgressBar: true,
//         customClass: {
//             title: 'titulo-alert',
//             popup: 'popup-alert',
//             timerProgressBar: 'timer-alert'
//         },
//         didOpen: () => {
//             Swal.showLoading()
//             // const b = Swal.getHtmlContainer().querySelector('b')
//             timerInterval = setInterval(() => {
//                 // b.textContent = Swal.getTimerLeft()
//             }, 100)
//         },
//         willClose: () => {
//             clearInterval(timerInterval)
//         }
//     })
// });

// btnContacto.addEventListener('click',()=>{
//     Swal.fire({
//         title: 'Tu mensaje no ha sido enviado.',
//         text: 'Ha ocurrido un error!',
//         icon: 'error',
//         iconColor: 'red',
//         showConfirmButton: false,
//         timer: 4000,
//         timerProgressBar: true,
//         customClass: {
//             title: 'titulo-alert',
//             popup: 'popup-alert-error',
//             timerProgressBar: 'timer-alert-error'
//         },
//         didOpen: () => {
//             Swal.showLoading()
//             const b = Swal.getHtmlContainer().querySelector('b')
//             timerInterval = setInterval(() => {
//                 b.textContent = Swal.getTimerLeft()
//             }, 100)
//         },
//         willClose: () => {
//             clearInterval(timerInterval)
//         }
//     })
// });