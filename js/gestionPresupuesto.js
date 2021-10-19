// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {

    // let x = presupuesto;

    if (cantidad >= 0){
        presupuesto = cantidad;
        //return `Tu presupuesto actual es de ${presupuesto} €`:
        return presupuesto;
    } else{
        
        return -1;
    }
}

function mostrarPresupuesto() {
    
    // let x = presupuesto;
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.fecha = (!fecha) ? new Date() : Date.parse(fecha);
    this.etiquetas = (!etiquetas) ? "" : etiquetas;
    /* if (valor < 0){
        this.valor = 0;
    } else {
        this.valor = valor;
    };*/
    // this.valor = valor;
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function (nueva_decripcion){
        this.descripcion = nueva_decripcion;
    };
    this.actualizarValor = function (nuevo_valor){
        if (nuevo_valor >= 0){
            this.valor = nuevo_valor;
        };
    this.mostrarGastoCompeto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor}`;
        return `Fecha ${fecha.toLocaleString()}`;
        return `Etiquetas`;
        for (let etiqueta of etiquetas){
            return `- ${etiquetas[etiqueta]}`
        };
    };
    
        
    };

};

function listarGastos(){
    return gastos;
};

function anyadirGasto(){
    
};

function borrarGasto(){
    
};

function calcularTotalGastos(){
    
};

function calcularBalance(){
    
};

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
