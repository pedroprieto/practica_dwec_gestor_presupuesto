
let presupuesto = 0;


function actualizarPresupuesto(valor) {
    if(valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("El valor no es válido. No se ha podido actualizar el presupuesto");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = (isNaN(valor) || valor < 0) ? 0 : valor;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(newDesc) {
        this.descripcion = newDesc;
    };

    this.actualizarValor = function(newValue) {
        if (newValue > 0){
            this.valor = newValue;
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
