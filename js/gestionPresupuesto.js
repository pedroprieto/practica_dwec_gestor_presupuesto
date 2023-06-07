// ----------------  VARIABLES GLOBALES   -------------------------------

var presupuesto = 0;

// ----------------  OBJETO GASTOS Y SUS PROPIEDADES   ------------------
function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor: 0;

 
// ----------------  METODOS  --------------------------------   

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        this.valor = !isNaN(nuevoValor) && nuevoValor > 0 ? nuevoValor: this.valor; // NO olvidar usar this. !!!!!
    }

}

// ----------------       FUNCIONES     --------------------------------

function actualizarPresupuesto(nuevoPresupuesto) {
    
    if(!isNaN(nuevoPresupuesto) && nuevoPresupuesto > 0){
        presupuesto = nuevoPresupuesto;
        return presupuesto;  
    }
    else{
        return -1;
        console.log("Presupuesto erroneo, debe ser un número positivo");
    }

}

/*
let objeto1 = new CrearGasto("hola", 10);
objeto1.actualizarValor(15);
console.log(objeto1.mostrarGasto());
*/
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

//-----------------------------------------------------------------------





// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
