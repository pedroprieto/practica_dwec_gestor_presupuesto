// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

let gastos= [];
let idGasto = 0;
function actualizarPresupuesto(numero) {
    if(numero > 0){
        presupuesto = numero;
        return numero;
    }
    else{
        return -1;

    }
}
function listarGastos(){
    return gastos
}
function anyadirGasto(gasto){

    gasto.id = idGasto;
    idGasto = idGasto +1;
    gastos.push(gasto);
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {

    this.descripcion = descripcion;
    

    this.actualizarDescripcion  = function(descripcion){
        this.descripcion = descripcion;
    }
    
    
    this.mostrarGasto = function () {
        return  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        
    }

    this.actualizarValor = function (valor){
        if (valor > 0 ){
        this.valor = valor;
        }
    }
    if (valor > 0 ){
        this.valor = valor; 
    } 
    else {
        this.valor = 0;
    }
    this.etiquetas = [];
    if(fecha){
        fecha = Date.parse(fecha)
        this.fecha = fecha;
    }
    else{
        fecha = Date.now();
        this.fecha = fecha;
    }
    


    this.actualizarFecha = function(fecha){
    
        fecha = Date.parse(fecha);
        if (fecha){
            this.fecha = fecha;
        }
    }
    
    
    this.anyadirEtiquetas = function(...etiquetas){
        let posicion;
        for (let etiqueta of etiquetas){
            posicion = this.etiquetas.lastIndexOf(etiqueta);
            if(posicion == -1){
                this.etiquetas.push(etiqueta)
            }
        }
    } 
    this.anyadirEtiquetas(...etiquetas) 
    
    this.borrarEtiquetas = function(...etiquetas){
        let posicion;
        for (let etiqueta of etiquetas){
            posicion = this.etiquetas.indexOf(etiqueta);
            if (posicion !=-1){
                this.etiquetas.splice(posicion,1);
            }
        }
        
    }
    this.mostrarGastoCompleto = function(){

        let fecha = new Date(this.fecha);
        let fechaTexto = fecha.toLocaleString();
    
        let etiqueta = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiqueta += `- ${this.etiquetas[i]}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaTexto}\nEtiquetas:\n${etiqueta}`;
    
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
