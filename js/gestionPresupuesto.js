let presupuesto = 0;

function actualizarPresupuesto(valor){
    if (valor < 0 || isNaN(valor)){
        return -1;
       
    } else{
        return presupuesto = valor;
    }
}

function mostrarPresupuesto() {
   return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = valor;
    this.valor = valor < 0 || isNaN(this.valor) ? 0: this.valor; 
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }
    this.actualizarValor = function(valor){
        if (valor >= 0 & isNaN(valor) == false){
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
