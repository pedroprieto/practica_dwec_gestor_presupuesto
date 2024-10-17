// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
//Cathaysa Navarro Benítez.
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

let dinero = prompt("Introduce la cantidad de dinero para el presupuesto");
actualizarPresupuesto(dinero);

mostrarPresupuesto();

function actualizarPresupuesto(dinero) {
  if (dinero >= 0) {
    presupuesto = dinero;
    return presupuesto;
  } else {
    alert("La cantidad introducida no es válida");
    return -1;
  }
}

function mostrarPresupuesto() {
  console.log("Tu presupuesto actual es de " + presupuesto + " euros");
}

function CrearGasto(descripcion, valor) {
  this.descripcion = descripcion;
  this.valor = typeof valor === "number" && valor >= 0 ? valor : 0;

  this.mostrarGasto = function () {
    console.log(
      `Gasto correspondiente a ${this.descripcion} con valor de ${this.valor} euros`
    );
  };

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  };

  this.actualizarValor = function (nuevoValor) {
    if (typeof valor === "number" && valor >= 0) {
      this.valor = nuevoValor;
    }
  };
}

function listarGastos() {}

function anyadirGasto() {}

function borrarGasto() {}

function calcularTotalGastos() {}

function calcularBalance() {}
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
  calcularBalance,
};
