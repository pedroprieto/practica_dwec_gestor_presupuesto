let presupuesto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0){
        presupuesto=valor;
        return presupuesto;
    }
    else{ 
        console.log("Has introducido un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion=descripcion;

    if (valor>0){
        this.valor=valor;
    }
    else{
        this.valor=0;
    }

    //metodos:

    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion=descripcion;
    }

    this.actualizarValor = function (nuevoValor){
        if (nuevoValor>=0)
        {
            this.valor=nuevoValor;
        }
        else{
            console.log("Has introducido un valor negativo");
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
