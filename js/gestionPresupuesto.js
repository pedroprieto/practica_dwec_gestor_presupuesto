// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
console.log(presupuesto);


function actualizarPresupuesto(cantidad) {
    var cantidad = cantidad;
    if (cantidad >= 0){
        presupuesto = cantidad;
    } else{
        presupuesto = -1;
        //alert("Presupuesto inferior a 0");
        console.log("Presupuesto inferior a 0");
    }

}
actualizarPresupuesto(9);
console.log("Presupuesto " + presupuesto);

function mostrarPresupuesto() {
    //document.write("Tu presupuesto actual es de "+ presupuesto + "€")
    console.log("Tu presupuesto actual es de "+ presupuesto + " €")
}
mostrarPresupuesto();

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
