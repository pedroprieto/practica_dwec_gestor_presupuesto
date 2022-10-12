let presupuesto = 0;

// FUNCIONES
function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        return presupuesto = cantidad;
        } else{
            return presupuesto = -1;
            console.log("Presupuesto inferior a 0");
        }    
}

function mostrarPresupuesto() {
    if (presupuesto >= 0){
        return `Tu presupuesto actual es de ${presupuesto} €`;
    }     
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    if (valor < 0){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }

    this.actualizarValor = function (valor){
        if (valor >= 0){
            this.valor = valor;
        }
        return this.valor;
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
