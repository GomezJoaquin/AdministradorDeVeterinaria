let BD;

import Citas from './Clases/Citas.js'
import UI from './Clases/UI.js'
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './Selectores.js';


const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if (editando) {
    //Edicción
        administrarCitas.editarCita({ ...citaObj });

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
       // Nuevo Registro

        // Generar un ID único
        citaObj.id = Date.now();

        administrarCitas.agregarCita({...citaObj});
 
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');
        const peticion = objectStore.add(citaObj);

        transaction.oncomplete = () => {
            console.log('Cita agregada!');
            ui.imprimirAlerta('Se agregó correctamente')
        }

        transaction.onerror = () => {
            console.log('Hubo un error!');
        }
    }

    ui.imprimirCitas(DB);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();
    formulario.reset();
}

export function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


export function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirAlerta('Se eliminó correctamente','error');
    ui.imprimirCitas(DB);
}

export function cargarEdicion(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

// Código de IndexedDB
function crearDB() {
    // crear base de datos con la versión 1
    const crearDB = window.indexedDB.open('citas', 1);

    // si hay un error, lanzarlo
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }

    // si todo esta bien, asignar a database el resultado
    crearDB.onsuccess = function() {
        console.log('Citas Listo!');

        // guardamos el resultado
        DB = crearDB.result;

        // mostrar citas al cargar
        ui.imprimirCitas();
    }

    // este método solo corre una vez
    crearDB.onupgradeneeded = function(e) {
        // el evento que se va a correr tomamos la base de datos
        const db = e.target.result;

        
        // definir el objectstore, primer parametro el nombre de la BD, segundo las opciones
        // keypath es de donde se van a obtener los indices
        const objectStore = db.createObjectStore('citas', { keyPath: 'id',  autoIncrement: true } );

        //createindex, nombre y keypath, 3ro los parametros
        objectStore.createIndex('mascota', 'mascota', { unique: false } );
        objectStore.createIndex('cliente', 'cliente', { unique: false } );
        objectStore.createIndex('telefono', 'telefono', { unique: false } );
        objectStore.createIndex('fecha', 'fecha', { unique: false } );
        objectStore.createIndex('hora', 'hora', { unique: false } );
        objectStore.createIndex('sintomas', 'sintomas', { unique: false } );
        objectStore.createIndex('id', 'id', { unique: true } );

        

        console.log('Database creada y lista');
    }
}
