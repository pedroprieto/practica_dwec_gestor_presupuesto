// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;
//variables Array test2
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(actPresupuesto) {
    // TODO
     
    if ( actPresupuesto >= 0)
    {
        presupuesto = actPresupuesto;
        return presupuesto;
    }
    else {
        return -1;
    }
}


function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
        
        this.descripcion = descripcion;
        this.valor = (valor >= 0 ) ? valor : 0;
   
        this.mostrarGasto = function (){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        }
        this.actualizarDescripcion = function(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        }
        this.actualizarValor = function(nuevoValor) {
            if(typeof nuevoValor == 'number' &&  nuevoValor >= 0) {
                this.valor = nuevoValor;
            } 
        };
    //Parte dos
        this.mostrarGastoCompleto = function () {
            let texto;
            texto = `Gasto correspondiente a ${descripcion} con valor ${valor} €.`;
            texto = texto + `\nFecha: ${new Date(this.fecha).toLocaleString()}.`;
            texto = texto + `\nEtiquetas:\n`;
                for ( let i = 0; i < this.etiquetas.length; i++){
                    texto = texto + this.etiquetas[i] + "\n";
                }
                return texto;
        }
        if(typeof fecha === "undefined" || typeof fecha === NaN){
            this.fecha = new Date(datestring);
        }else {
            this.fecha = Date.parse(fecha);
        }
        this.etiquetas = []; 
        if ( etiquetas.length != 0) {
            for ( let i in etiquetas) {
                this.etiquetas.push(etiquetas[i]);
            }
        }else {
            this.etiquetas = [];
        }
        this.anyadirEtiquetas = function ( ...etiquetas) {
            for ( let i in etiquetas) {
                this.etiquetas.push(etiquetas[i]);
            }
        }
        this.borrarEtiquetas = function (...etiquetas) {
            for ( let i in etiquetas ){
                this.etiquetas.splice(i, i );
            }
        }
        this.actualizarFecha = function(fecha) {
            if ( isNaN(Date.parse(fecha)) ){
                this.fecha;
            }else {
                this.fecha = Date.parse(fecha);
            }
        }
}
//Funciones test 2
function listarGastos() {
    return gastos;

}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
    
}
function borrarGasto(id) {
    for ( let i in gastos){
        let identificador = gastos[i].id;
        if (identificador == id){
            gastos.splice(i, i);
        }
    }
    
}
function calcularTotalGastos() {
    let suma = 0;
    for ( let i in gastos){
        suma = suma + gastos[i].valor;
    }
    return suma;
}
function calcularBalance() {
    let queda = calcularTotalGastos();
    let balance;
    balance = presupuesto - queda;
    return(`Te queda de un total de : ${balance} €`)
    
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
