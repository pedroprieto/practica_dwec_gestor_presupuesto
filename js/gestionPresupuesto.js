// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;


function actualizarPresupuesto(nuevoValor) {
    if( nuevoValor >= 1){

        presupuesto = nuevoValor
        return presupuesto

    }else{

        console.log("El valor es negativo")
        return -1
    }
    
}

function mostrarPresupuesto() {
  // TODO
  let text = `Tu presupuesto actual es de ${presupuesto} €`
  return text

}
function CrearGasto() {
  
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
}
