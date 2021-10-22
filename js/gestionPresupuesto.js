
let presupuesto = 0;
let gastos= [];
let idGasto = 0;

function mostrarPresupuesto() {
    
    return `Tu presupuesto actual es de ${presupuesto} €`
}
function actualizarPresupuesto(numero) {
    if(numero > 0){

    
    return presupuesto = numero;
    }
    else{
        return -1
    }
}
function anyadirGasto(gasto){

    gasto.id = idGasto;
    idGasto = idGasto +1;
    gastos.push(gasto);
}
function borrarGasto(id) {
    let pos = gastos.findIndex(gasto => gasto.id === id);
    if (pos != -1) {
        gastos.splice(pos, 1);
    }
}

function calcularTotalGastos (){
    let suma = 0;
    for (let gasto of gastos) {
        suma += gasto.valor;
    }
    return suma
}
function calcularBalance (){
    let gastosTotales = calcularTotalGastos();
    let balance = presupuesto - gastosTotales;
    return balance
}
function listarGastos(){
    return gastos
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
    
}
