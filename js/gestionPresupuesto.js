// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto;

presupuesto = 0; //Asignamos valor inicial 0 

function actualizarPresupuesto(n) {
    // TODO
    if (n < 0) {
        presupuesto = -1;
        console.log ('El valor introducido ha de ser mayor que cero.');

    } else {
        presupuesto = n;
    
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    // TODO
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');     
}

function CrearGasto(valor) {
    // TODO
     
    if (valor < 0) {
       this.gasto = 0;

   } else {
       this.gasto = valor;
   }  
}

let gasto = new CrearGasto (gasto, descripcion);

this.mostrarGasto = function () {
    return ('Gasto correspondiente a' + this.descripcion +
     ' con valor ' + this.gasto +'€')
}

this.actualizaDescripcion = funcion (descripcion) {
    this.descripcion = descripcion;
}

this.actualizaGasto = function (valor) {
    if (valor<0) {
        this.gasto = valor;
    } 
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
