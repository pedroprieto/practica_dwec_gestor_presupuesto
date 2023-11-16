var presupuesto = 0;
var gastos = [];
var idGasto = 0;

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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (Number(valor) >= 0){
        this.valor = Number(valor);
    }
    else{
        this.valor = 0;
    }

    //fecha viene en formato string
    //this.fecha tiene que guardar un timestamp
    if (etiquetas = []){
        this.etiquetas = []
    }
    else {
        this.etiquetas = etiquetas;
    }

    if(isNaN(fecha)){
        this.fecha = Date.now;
    }
    else{
        this.fecha = Date.parse(fecha);
    }

    //etiquetas
    

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
}

CrearGasto.prototype.fecha = function(){
    this.fecha = new Date.timestamp;
}

CrearGasto.prototype.etiquetas = function(){
    this.etiquetas = [];
}

function mostrarGastoCompleto() {
    let objFecha = new Date(this.fecha);
    return (`
    Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
    Fecha: ${objFecha.toLocaleString}
    Etiquetas:\n`

    for (let e of this etiquetas) {
        texto += `- $(e)\n`
    }
    )
}

function actualizarFecha (actFecha){
    if(isNaN(actFecha)){
        this.fecha = this.fecha;
    }
    else{
        this.fecha = Date.parse(actFecha);
    }
}

function anyadiretiquetas (...etiquetas) {
    for (let etiqueta of etiquetas) {
        if (this.etiquetas.indexOf(etiqueta) == -1) {
            this.etiquetas.push(etiqueta);
        }
    }
}

function borrarEtiquetas = function(...etiquetas) {
    let nuevoListadoEtiquetas = [];
    for (let etiqueta of this.etiquetas){
        if(etiquetas.indexOf(etiqueta) == -1) {
            nuevoListadoEtiquetas.push(etiqueta);
        }
    this.etiquetas = nuevoListadoEtiquetas;
    }
}


]
function listarGastos () {
    return gastos;
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
