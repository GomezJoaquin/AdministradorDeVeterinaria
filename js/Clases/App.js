
import { datosCita, nuevaCita, crearDB } from '../Funciones.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from '../Selectores.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        // Eventos
        eventListeners();
        
        //Crear Base de Datos.
        crearDB();
        function eventListeners() {
            mascotaInput.addEventListener('change', datosCita);
            propietarioInput.addEventListener('change', datosCita);
            telefonoInput.addEventListener('change', datosCita);
            fechaInput.addEventListener('change', datosCita);
            horaInput.addEventListener('change', datosCita);
            sintomasInput.addEventListener('change', datosCita);

            // Formulario nuevas citas
            formulario.addEventListener('submit', nuevaCita);
        }

    }
}

export default App;