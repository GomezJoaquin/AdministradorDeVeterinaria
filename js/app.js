//Campos del formulario. 
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

//Clases.

class Citas {
    constructor() {
        this.citas = [];
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de Error. 
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM.
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta después de 5 segundos.
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);

    }
}

const ui = new UI();
const administrarCitas = new Citas();


// Registrar Eventos
eventListeners();

function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

//Objeto con info de la cita.
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agrega datos en el objeto de cita. 
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    //console.log(e.target.name);
    console.log(citaObj);
}

//Valida y agrega una nueva cita a la clase de citas. 
function nuevaCita(e) {
    e.preventDefault();

    //Extraer la informacion del objeto cita. 
    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas
    } = citaObj;

    //Validar. 
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios.', 'error');
        return;
    }
}