import { eliminarCita, cargarEdicion } from '../Funciones.js'
import { contenedorCitas } from '../Selectores.js'

class UI {
    imprimirAlerta(mensaje, tipo) {

        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

        // Agregar clase en base al tipo de Error.
        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el DOM
        document
            .querySelector("#contenido")
            .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        //Quitar la alerta después de 3 segundos.
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas() {

        this.limpiarHTML();


    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

export default UI;
