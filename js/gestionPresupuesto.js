// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
  if (valor >= 0) {
    presupuesto = valor;
    return valor;
  }

  console.log("Error valor negativo: " + valor);
  return -1;
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  if (isNaN(valor) || valor < 0) {
    valor = 0;
  }

  fecha = Date.parse(fecha);

  if (isNaN(fecha)) {
    fecha = Date.now();
  }

  this.descripcion = descripcion;
  this.valor = valor;
  this.fecha = fecha;
  this.etiquetas = etiquetas || [];


  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };

  this.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  };

  this.actualizarValor = function (valor) {
    if (valor >= 0) {
      this.valor = valor;
    }
  };

  this.mostrarGastoCompleto = function () {
    let s = "";
    s += this.mostrarGasto() + ".\n";
    s += "Fecha: " + this.fecha.toLocaleString() + "\n";
    s += "Etiquetas: \n";

    for (let i = 0; i < this.etiquetas.length; i++) {
      let etiqueta = this.etiquetas[i];
      s += " - " + etiqueta;
    }
    
    return s;
  };

  this.actualizarFecha = function (fecha) {

  };

  this.anyadirEtiquetas = function (...etiquetas) {
    for (let i = 0; i < etiquetas.length; i++) {
      let etiqueta = etiquetas[i];
      if (this.etiquetas.indexOf(etiqueta) == -1) {
        this.etiquetas.push(etiqueta);
      }
    }
  };

  this.borrarEtiquetas = function (...etiquetas) {

  };
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
  for (let i = 0; i < gastos.length; i++) {
    let gasto = gastos[i];
    if (gasto.id == id) {
      gastos.splice(i, 1);
    }
  }
}

function calcularTotalGastos() {
  let suma = 0;

  for (let i = 0; i < gastos.length; i++) {
    let gasto = gastos[i];
    suma += gasto.valor;
  }

  return suma;
}

function calcularBalance() {
  return presupuesto - calcularTotalGastos();
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




