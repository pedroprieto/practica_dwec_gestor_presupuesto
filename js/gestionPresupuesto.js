// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(x) {

    if (x > 0) {
        presupuesto = x;
    }
    else {
        x=-1
    }
    return x;
}

//actualizarPresupuesto(2000);
//mostrarPresupuesto();



function mostrarPresupuesto() {
    
    let y = presupuesto;
    return "Tu presupuesto actual es de " + y + " €";
}

let gasto = {
    
    descripcion: "",
    valor: 0,

    mostrarGasto = function () {

        return ("Gasto correspondiente a " + this.descripcion + " con valor " + tdhis.valor + " €");

    },

    actualizarDescripcion = function (descripcion) {

        descripcion = this.descripcion;

    },

    actualizarValor = function (valor) {

        if (valor >= 0) {

            this.valor = valor;

        } else {

            valor = this.valor;

        }
    }
}

function CrearGasto(descripcion,valor) {

    this.descripcion = descripcion;
    
    if (valor < 0) {
            
        return 0;
        
        }
         else {

            valor= this.valor;
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
