// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variables globales
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
        //console.log('creando gasto');
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
            texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
            texto = texto + `\nFecha: ${new Date(this.fecha).toLocaleString()}`;
            texto = texto + `\nEtiquetas:\n`;
                for ( let i = 0; i < this.etiquetas.length; i++){
                    texto = texto + "- " + this.etiquetas[i] + "\n";
                }
                return texto;
        }

        if(!fecha) {
            fecha = Date.parse(new Date())
            this.fecha = fecha;
        } else {
            fecha = Date.parse(fecha);
            this.fecha = fecha;
        }
        this.etiquetas = []; 
        if ( etiquetas.length != 0) {
            for ( let i in etiquetas) {
                this.etiquetas.push(etiquetas[i]);
            }
        }else {
            this.etiquetas = [];
        }
        this.anyadirEtiquetas = function ( ...etiquetaNueva) {
            let indice = -1;
            for ( let i of etiquetaNueva) {
                indice = this.etiquetas.indexOf(i);
                if( indice == -1) {
                this.etiquetas.push(i);
                }
            }
        }
        this.borrarEtiquetas = function (...etiquetasEliminar) {
            let indice = -1;
            for ( let i of etiquetasEliminar ){
                indice = this.etiquetas.indexOf(i);
                if (indice != -1) {
                    this.etiquetas.splice(indice, 1);
                }
            }
        }
        this.actualizarFecha = function(fechaCompra) {
            fechaCompra = Date.parse(fechaCompra);
            if ( fechaCompra) {
                this.fecha = fechaCompra;
            }
        }
    // parte 3
        this.obtenerPeriodoAgrupacion = function (periodo) {
            let aux = new Date(this.fecha).toISOString();
            let cont;
            switch(periodo) {
                case ('dia'):
                    cont = 10;
                    break;
                case('mes'):
                    cont = 7;
                    break;
                case('anyo'):
                    cont = 4;
                    break;
                default: 
                    return 'Periodo erroneo';
            }
            return aux.slice(0, cont);
            // if (periodo == "dia") {
            //     console.log(aux);
            //     console.log (aux.toISOString().slice(0, 10));
            //     //aux = fecha.slice();
            // }else if (periodo == "mes") {
            //     aux = fecha.slice(0, 7);
            // }else if (periodo == "anyo") {
            //     aux = fecha.slice(0, 4)
            // }
            // return aux;
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
    let indice = 0;
    let identificador = id;
    for ( let i of gastos){
        if (i.id == identificador){
            indice = gastos.indexOf(i);
            gastos.splice(indice, 1);
        }
    }
    
}
function calcularTotalGastos() {
    let suma = 0;
    for ( let i of gastos){
        suma = suma + i.valor;
    }
    return suma;
}
function calcularBalance() {
    let balance = 0;
    balance = presupuesto - calcularTotalGastos();
    return balance;
    
}
function filtrarGastos() {

}

function agruparGastos() {
    
}
// pruebas de consola
let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );
let agrupacion = gasto1.obtenerPeriodoAgrupacion('anyo');        
console.log(agrupacion);
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
