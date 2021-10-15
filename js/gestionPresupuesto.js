// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;
//variables Array test2
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(actPresupuesto) {
    // TODO
     
    if ( actPresupuesto >= 0)
    {
        presupuesto = actPresupuesto;
        return presupuesto;
    }
    else {
        return -1;
    }
}


function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
        
        this.descripcion = descripcion;
        this.valor = (valor >= 0 ) ? valor : 0;
   
        this.mostrarGasto = function (){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        }
        this.actualizarDescripcion = function(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        }
        this.actualizarValor = function(nuevoValor) {
            if(typeof nuevoValor == 'number' &&  nuevoValor >= 0) {
                this.valor = nuevoValor;
            }
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
