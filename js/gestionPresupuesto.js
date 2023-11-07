// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(nuevoPresupuesto >= 0){
        presupuesto=nuevoPresupuesto;
        return nuevoPresupuesto;
    }else{
        
        return -1;       
    }
}

function mostrarPresupuesto() {    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(concepto, cantidad) {
    var gasto={
        "descripcion":'',
        "valor":0,
        mostrarGasto(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },
        actualizarDescripcion(nuevaDescripcion){
            this.descripcion=nuevaDescripcion;
        },
        actualizarValor(nuevoValor){
            if(nuevoValor>0){
                this.valor=nuevoValor;
            }
        }
    };
    gasto.actualizarDescripcion(concepto);
    gasto.actualizarValor(cantidad)

    if(cantidad < 0){
        gasto.actualizarValor(0);
        return gasto;
    }else{
        return gasto;      
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
