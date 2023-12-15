var presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        presupuesto = cantidad;
        return presupuesto;
    }
    else {
        console.log("Cantidad introducida no es positiva");
        return Number(-1);
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;

    if (Number(valor) >= 0){
        this.valor = Number(valor);
    }
    else{
        this.valor = 0;
    }  
}

CrearGasto.prototype.mostrarGasto = function (){
    return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
}

CrearGasto.prototype.actualizarDescripcion = function (actDescripcion) {
    (this.descripcion = actDescripcion);
}
CrearGasto.prototype.actualizarValor = function (nuevovalor){
    if (Number(nuevovalor) >= 0){
        this.valor = nuevovalor;
    }     
};




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
