let presupuesto=0;

function actualizarPresupuesto(presu) {
    if (isNaN(presu)){
        return -1
    }
    if (presu < 0){
        return -1
    }

    presupuesto=presu

    return presupuesto
}

function mostrarPresupuesto() {

    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion,valor) {
    this.descripcion=descripcion;
    if (valor >0 ){
        this.valor=valor;
    }else{
        this.valor=0;
    }
    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.actualizarDescripcion=function(descripcionNueva){
        this.descripcion=descripcionNueva
    }

    this.actualizarValor=function(valorNuevo){
        if(valorNuevo>0){
            this.valor=valorNuevo
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
