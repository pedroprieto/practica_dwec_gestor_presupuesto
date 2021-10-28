// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
function Gasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.isAdvalormin = valor;
  }

let presupuesto = 0;


function actualizarPresupuesto(valor) {
    if(valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("El valor no es válido. No se ha podido actualizar el presupuesto");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    if(valor < 0) {
        valor = 0;
    }
    return Gasto(descripcion, valor);
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
