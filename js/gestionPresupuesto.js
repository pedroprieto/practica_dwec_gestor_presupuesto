// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// MIO
function actualizarPresupuesto(num) {
    if(num >= 0){
        presupuesto = num;
        return presupuesto;
    }
    else{
        console.log("No se puede introducir un número negativo.");
        return -1;
    }
}


// MIO
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // Métodos
    // MIO
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    // MIO
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return descripcion;
    }

    // MIO
    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
            return valor;
        }
        else{
            valor = this.valor;
            return valor;
        }
    }

    // MIO
    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
            for(let e of this.etiquetas){
                texto += `- ${e}\n`
            }
            return texto;
    }

    this.actualizarFecha = function(fecha) {
        let f = Date.parse(fecha);
        if (f) {
            this.fecha = f;
        }
    }

    // MIO
    this.anyadirEtiquetas = function(...etiqueta){
        for(let e of etiqueta){
            if(this.etiquetas.indexOf(e) == -1){
                this.etiquetas.push(e);
            }
        }
    }
    // SOLUCION
    this.borrarEtiquetas = function(...etqs) {
        // No entiendo porqué se pone push si se supone que hay que borrar la etiqueta que
        // coincida con la que nos dan.
        let newetiquetas = [];

        for (let e of this.etiquetas) {
	    if (etqs.indexOf(e) == -1) {
                newetiquetas.push(e);
	    }
        }

        this.etiquetas = newetiquetas;

        // No entiendo porqué no funciona el código de abajo.
        /*for(let e of this.etiquetas){
            for(let f of etqs){
                if(e == f){
                    this.etiquetas.slice(f);
                }
            }
        }*/
    }

    // PROPIEDADES --- MIO
    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;
    let f = Date.parse(fecha);
    if(f){
        this.fecha = f;
    }
    else{
        this.fecha = Date.parse(new Date());
    }
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
}

// MIO
function listarGastos(){
    return gastos;
}

// MIO
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

/* SOLUCION ---*/
function borrarGasto(idGasto) {
    let gasto = null;
    for (let g of gastos) {
	if (g.id == idGasto) {
	    gasto = g;
	}
    }
    if (gasto) {
        let posGasto = gastos.indexOf(gasto);
        gastos.splice(posGasto, 1);
    }
}
// MIO
/*function borrarGasto(idGasto){
    for(let g of gastos){
        if(g.id == idGasto){
            gastos.splice(g);
        }
    }
}*/

// MIO
function calcularTotalGastos(){
    let sumaGastos = 0;
    for (let g of gastos){
        sumaGastos += g.valor;
    }
    return sumaGastos;
}

// MIO
function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
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
