// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.etiquetas = etiquetas;
    this.fecha = Date.parse(fecha) || Date.now();   

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }    
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.mostrarGastoCompleto = function() {
        let texto = this.mostrarGasto() + ".\n";
        texto += "Fecha: " + (new Date(this.fecha)).toLocaleString() + "\n";  
        texto += "Etiquetas:\n";
        for (const etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    }
    this.actualizarFecha = function(nuevaFecha) {
        this.fecha = Date.parse(nuevaFecha) || this.fecha;
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (const nuevaEtiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(nuevaEtiqueta)) {
                this.etiquetas.push(nuevaEtiqueta);
            }
        }
    } 
    this.borrarEtiquetas = function(...borrarEtiquetas) {        
        for (const borrarEtiqueta of borrarEtiquetas) {
            let indexBorrar = this.etiquetas.findIndex(function(etiqueta) {
                return etiqueta === borrarEtiqueta;
            })
            if (indexBorrar != -1) {
                this.etiquetas.splice(indexBorrar, 1);
            }           
        }
    }
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
    let indexBorrar = gastos.findIndex(function(gasto) {
        return gasto.id === id;
    })
    if (indexBorrar != -1) {
        gastos.splice(indexBorrar, 1);
    }    
}

function calcularTotalGastos() {
    let resultado = gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
    return resultado;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
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
