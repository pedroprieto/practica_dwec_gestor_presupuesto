// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(budget) {
    if(budget >=  0){
        presupuesto = budget;
        console.log(presupuesto);
    }
    else{
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto}€`;
    
}

function CrearGasto(descripcion,valor) {
    // TODO
    let gasto={};
    this.descripcion=descripcion;
    this.valor = valor;
    if(valor < 0){
        this.valor= 0;
    }
    else{
        this.valor = valor;
    }
    return gasto;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} 
        con valor ${this.valor}€`
    }

    this.actualizarDescripcion = function(nuevaDescripcion){

        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){

        if(nuevoValor < 0 ){
            this.valor = valor;
            
        }else{
            this.valor = nuevoValor;
        }
        
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
