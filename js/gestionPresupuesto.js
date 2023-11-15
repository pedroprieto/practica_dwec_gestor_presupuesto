// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO

    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return nuevoPresupuesto;
    } else {
        console.log("error");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {
    
}

function borrarGasto() {

}

function calcularTotalGastos() {
    
}

function calcularBalance() {
    
}




function CrearGasto(descripcion, valor, fecha, ...etiquetas ) {
    // TODO

    //propiedades
    this.descripcion = descripcion;
    
    if (valor >= 0) {
        this.valor = valor;
    } else{
        this.valor = 0;
    }

    this.fecha = fecha;
    this.etiquetas = etiquetas;

    //metodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevaValor) {
        if (nuevaValor >= 0) {
            this.valor = nuevaValor;
            return nuevaValor;
        } else {
            return this.valor;
        }
    }

    this.mostrarGastoCompleto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €. 
Fecha: ${this.fecha.toLocalString()}
Etiquetas:
- ETIQUETA 1
- ETIQUETA 2
- ETIQUETA 3`
    }

    this.actualizarFecha = function (nuevaFechaString) {
        let ts = Date.parse(nuevaFechaString); //creo un timestamp
        //compruebo si es NaN para ver si es fecha valida
        if (isNaN(ts) == false) {
            this.fecha = ts;
        }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        
        for(let etiqueta of nuevasEtiquetas){
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
       this.etiquetas = this.etiquetas.filter ( function (e) {
           return !etiquetasBorrar.includes(e) 
        })   
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
