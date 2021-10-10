// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if(CompruebaCantidad(cantidad) <= 0){
        console.log('No se pueden introducir números negativos');
        return -1;
    } else{
        presupuesto = cantidad;
        console.log(cantidad)
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CompruebaCantidad(cantidad){
    if (cantidad < 0 || isNaN(cantidad)){
        return -1;
    }
    else{
        return cantidad;
    }
}
function CrearGasto(descripcion, valorGasto) {
    
    
    let gasto = {
        descripcion: "",
        valor : 0,
        mostrarGasto: function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },
        actualizarDescripcion: function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },
        actualizarValor: function(nuevoValor){
            if(CompruebaCantidad(nuevoValor) > -1){
                this.valor = nuevoValor;
            }
        }
    }

    gasto.actualizarDescripcion(descripcion);
    gasto.actualizarValor(valorGasto);
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
