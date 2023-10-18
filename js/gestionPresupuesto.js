let presupuesto=0;
function actualizarPresupuesto(valor) {
    if(valor>=0){
        presupuesto=valor;
        return presupuesto;
    }
    else{      
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor) {
    if ( valor >= 0) {
        this.descripcion = descripcion || "";
        this.valor = valor;
    } else {
        this.descripcion = descripcion || "";
        this.valor = 0;
    }
}
CrearGasto.prototype.mostrarGasto = function () {
    return "Gasto correspondiente a "+ this.descripcion+ " con valor "+ this.valor +" €";
};

CrearGasto.prototype.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
};

CrearGasto.prototype.actualizarValor = function (valor) {
    if (valor>= 0) {
        this.valor = valor;
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






