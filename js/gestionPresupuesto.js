// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto;

presupuesto = 0; //Asignamos valor inicial 0 

let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO    
    if (valor < 0 || isNaN(valor)) {
        return -1;
        console.log (`El valor introducido ha de ser mayor que cero.`);

    } else {
        presupuesto = valor;
        return presupuesto;
    }
    
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);     
}

function CrearGasto(descripcion, valor, fecha = new Date (), ...etiquetas) {   
    // TODO
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0 ) ? valor : 0;
    this.fecha = Date.parse(fecha);
    this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;

    this.mostrarGasto = function () {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.mostrarGastoCompleto = function () {
                
        let fechaCambio = new Date (fecha);        
        let txtEtiqueta = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
                txtEtiqueta += `- ${this.etiquetas[i]}\n`;
            }         

        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaCambio.toLocaleString()}\nEtiquetas:\n${txtEtiqueta}`);
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        this.valor = (valor >= 0) ? valor : this.valor;
    }

    this.anyadirEtiquetas = function(...etiquetas){

        for (let i = 0; i < etiquetas.length; i++) {
            if(this.etiquetas.includes(etiquetas[i]) == false) {
                this.etiquetas.push(etiquetas[i]);
            }
        }           
    }

    this.actualizarFecha = function (fecha) {
        let newFecha = Date.parse (fecha);
        if (newFecha) {
            this.fecha = newFecha;
        }
    }
}

function listarGastos () {
    // TODO
    return (gastos);
}

function anyadirGasto () {
    // TODO
}

function borrarGasto () {
    // TODO
}

function calcularTotalGastos () {
    // TODO
}

function calcularBalance () {
    // TODO
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
