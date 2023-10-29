// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = []; //Array vacio
let idGasto = 0;
// TODO: Variable global


function actualizarPresupuesto(p) {
    if (p >= 0) {
        p = presupuesto;
        return p;
    } else {
        return p = -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

console.log(mostrarPresupuesto());

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.actualizarDescripcion = function (des) {
        this.descripcion = des;
    }

    this.actualizarValor = function (valor) {
        this.valor = (valor >= 0) ? valor : this.valor;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        let gastoCompleto = `Gasto correspondiente a ${this.descripcion } con valor ${this.valor} €.
Fecha: ${(new Date(this.fecha)).toLocaleString()}
Etiquetas:\n`

        for (let i of this.etiquetas) {
            gastoCompleto += `- ${i}\n`
        }
        return gastoCompleto;

    };

    this.actualizarFecha = function(fecha){
        let fec = Date.parse(fecha)
        if(fec){
            this.fecha = fec;
        }
    }

    this.anyadirEtiquetas = function(...e) {
        for (let i of e) {
	    if (this.etiquetas.indexOf(i) == -1) {
		this.etiquetas.push(i);
	    }
        }
    }

    this.borrarEtiquetas = function(...e) {
        let nuevaEtiquetas = [];

        for (let i of this.etiquetas) {
	    if (e.indexOf(i) == -1) {
                nuevaEtiquetas.push(i);
	    }
        }

        this.etiquetas = nuevaEtiquetas;
    }

    /*********************        PROPIEDADES       *********************** */

    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    let fec = Date.parse(fecha);
        if(fec){
            this.fecha = fec;
        } else{
            this.fecha = Date.parse(new Date())
        }
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
    
}

function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id) {
    const index=gastos.findIndex((gasto) => {
         return gasto.id == id
    });
    gastos.splice(index,1);
    
}
function calcularTotalGastos() {
    let sumarTotal = 0;

    for(let i = 0; i < gastos.length; i++){
            sumarTotal += gastos[i];
    }
    return sumarTotal;
}
function calcularBalance() {

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}