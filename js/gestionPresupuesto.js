// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;

// Función que actualiza el presupuesto y devuelve el nuevo valor comprobando que sea un número válido
function actualizarPresupuesto(nuevoPresupuesto) {

    if (nuevoPresupuesto >= 0 && !isNaN(nuevoPresupuesto)) {
        return presupuesto = nuevoPresupuesto;
    }
    else {
        return -1;
    }
}

// Función que devuelve el presupuesto actual
function mostrarPresupuesto() {
    return ("El presupuesto es: " + presupuesto + "€");
}

function CrearGasto(valor, descripcion) {
    
    if (valor > 0 || !isNaN(valor)) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.descripcion = descripcion;

    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + "€";
    }
  
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor > 0 || !isNaN(nuevoValor)) {
            this.valor = nuevoValor;
        }
    }
  }
  
// Para probar el código, descomenta la siguiente línea y ejecuta este archivo con Node.js
console.log("El presupuesto actual es: " + mostrarPresupuesto());
console.log("El nuevo presupuesto es: " + actualizarPresupuesto(1000));
console.log("El presupuesto actual es: " + mostrarPresupuesto());
let gasto = new CrearGasto(10, "Café");
console.log(gasto.mostrarGasto());
gasto.actualizarValor(20);
gasto.actualizarDescripcion("Café con leche");
console.log(gasto.mostrarGasto());
gasto.actualizarValor(-10);
gasto.actualizarDescripcion("");
console.log(gasto.mostrarGasto());


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
