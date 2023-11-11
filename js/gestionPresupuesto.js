// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// la creamos con let
let presupuesto = 0;

// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    if (typeof valor === 'number' && valor >=0) {
        presupuesto =valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    console.log("Tu presupuesto actual es de " + presupuesto.toString() +"€.");
}
//función CrearGasto porqeu es un constructor y va en en mayúsculas.
// Para objeto gasto creamos dentro de Crear Gasto los métodos qeu nos piden
function CrearGasto(descripcion, valor) {
    // TODO
    let gasto = {};
    //propiedades
    gasto.descripcion = descripcion;
    gasto.valor = (typeof valor === 'number' && valor >=0) ? valor: 0; 

    // Métodos 
    gasto.mostrarGasto = function () {
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor}  €"`);
    }
    gasto.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    gasto.actualizarValor = function (nuevoValor){
        if(typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }

    }

}




// Lo que haríamos es un nuevo objeto llamado gasto, podríamos haberlo creaado en la función también.



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
