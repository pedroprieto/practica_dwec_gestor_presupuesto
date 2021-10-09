// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;

function actualizarPresupuesto(actPresupuesto) {
    // TODO
     
    if ( actPresupuesto >= 0)
    {
        presupuesto = presupuesto + actPresupuesto;
        return presupuesto;
    }
else 
actPresupuesto = -1;
return `Comprueba el valor de introducido si es correcto ${actPresupuesto} €`;
}


function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion;
   if ( valor >= 0) {
       this.valor = valor;
   }else {
       this.valor = 0;
   }
   // mostrar gasto 
   this.mostrarGasto = function() {
       return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
   };
   //Actualizar descripcion
   this.actualizarDescripcion = function(nuevaDescripcion) {
       this.descripcion = nuevaDescripcion;
   };
   //actualizar valor
   this.actualizarValor = function(nuevoValor) {
       this.valor = nuevoValor;
   };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
