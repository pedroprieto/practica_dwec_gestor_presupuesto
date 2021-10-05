
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}


// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;

function actualizarPresupuesto(valor) {
    // TODO
    let cantidad=-1;
    if ( valor >= 0)
    {
        presupuesto=valor;
        cantidad=valor;
    }
    return cantidad;
}

function mostrarPresupuesto() {
    // TODO
    return `tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, value) {
    // TODO

    // get Validar(){
    //     console.log("Validando el dato");
    // }
    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion =function (descripcion){
        this.descripcion=descripcion;
    }
    this.actualizarValor=function(dato){
        if ( !isNaN(dato) ){
            if ( dato >=  0 ){
                this.valor=dato;
            }
        }
    }
    let actualizar =function(dato){
        if ( !isNaN(dato) ){
            return valor=dato < 0 ? 0:dato;
        }
        else {
            return valor=0;
        }
    }

    this.valor=actualizar(value);
    this.descripcion=descripcion;



}
