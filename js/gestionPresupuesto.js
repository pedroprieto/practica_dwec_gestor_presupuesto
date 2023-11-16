// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

// llamadas a las funciones
presupuesto = actualizarPresupuesto(500);

if (presupuesto >= 0){
    console.log(mostrarPresupuesto());
}

// Primera llamada a la función crearGasto: crea el objeto.
let gasto1 = new CrearGasto("Gastos ordinarios", 350);
gasto1.mostrarGasto();

// Segunda llamada a la función crearGasto: actualiza el objeto.
gasto1.actualizarDescripcion("Gastos imprevistos");
gasto1.actualizarValor(500);
gasto1.mostrarGasto();

// funciones
function actualizarPresupuesto(numero) {
    if ((numero >= 0) && (!isNaN(numero))){
        return numero;
    } else {
        console.log("Error: número menor que cero o carácter no numérico");
        return -1;
    }
}


function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor) {
    let gasto = {
        descripcion: descripcion,
        valor: valor,
        
        mostrarGasto(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor);
        },

        actualizarDescripcion(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },

        actualizarValor(nuevoValor){
            this.valor = nuevoValor;
        }

    };

    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
