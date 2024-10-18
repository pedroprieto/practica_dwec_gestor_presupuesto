// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
//Cathaysa Navarro Benítez.
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

//actualizarPresupuesto();

//mostrarPresupuesto();
//pruebas para la función CrearGasto.
/*let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10");
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa");
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado");
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida");*/

//console.log(gasto6.mostrarGastoCompleto());

//console.log(gasto6);

function actualizarPresupuesto(dinero) {
  if (dinero >= 0) {
    presupuesto = dinero;
    return presupuesto;
  } else {
    console.error("La cantidad introducida no es válida");
    return -1;
  }
}

function mostrarPresupuesto() {
  return "Tu presupuesto actual es de " + presupuesto + " €";
}
//FUNCIÓN CREAR GASTO:
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  this.descripcion = descripcion;
  //comprobación de si el valor tiene un tipo correcto.
  this.valor = typeof valor === "number" && valor >= 0 ? valor : 0;

  //verificación de la fecha
  if (fecha && !isNaN(Date.parse(fecha))) {
    this.fecha = Date.parse(fecha);
  } else {
    this.fecha = Date.now();
  }
  //el array de etiquetas comienza vacío
  this.etiquetas = etiquetas.length > 0 ? etiquetas : [];

  //mostrar todos los datos introducidos por pantalla
  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
  };

  this.mostrarGastoCompleto = function () {
    let fechaLocalizada = new Date(this.fecha).toLocaleString(); // Formato de fecha localizado
    let textoEtiquetas = this.etiquetas.map((etiqueta) => `- ${etiqueta}`).join("\n"); // Formato de etiquetas
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n${textoEtiquetas}`;
  };

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  };

  this.actualizarValor = function (nuevoValor) {
    if (typeof nuevoValor === "number" && nuevoValor >= 0) {
      this.valor = nuevoValor;
    }
  };

  this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let i = 0; i < nuevasEtiquetas.length; i++) {
      let etiqueta = nuevasEtiquetas[i];

      if (!this.etiquetas.includes(etiqueta)) {
        this.etiquetas.push(etiqueta);
      }
    }
  };

  this.actualizarFecha = function (nuevaFecha) {
    if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
      this.fecha = Date.parse(nuevaFecha);
    }
  };

  this.borrarEtiquetas = function (...borrarEtiquetas) {
    for (let i = 0; i < borrarEtiquetas.length; i++) {
      let etiqueta = borrarEtiquetas[i];
      let index = this.etiquetas.indexOf(etiqueta); //Buscar la etiqueta en el Array
      if (index !== -1) {
        this.etiquetas.splice(index, 1); //elimina la etiqueda si existe
      }
    }
  };
}

//Función listar gastos
function listarGastos() {
  return gastos;
}

//Función añadir gastos
function anyadirGasto(gasto) {
  gasto.id = idGasto;

  idGasto++;

  gastos.push(gasto);
}

//Función borrar gastos.
function borrarGasto(id) {
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].id === id) {
      gastos.splice(i, 1); //Elimina el gasto de la posición i

      console.log(`Gasto con ID ${id} ha sido eliminado`);
      return;
    }
  }
  console.log(`El gasto con el ID ${id} no ha sido encontrado`); //comprobar si funciona.
}

//función Calcular el total de los gastos
function calcularTotalGastos() {
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    total += gastos[i].valor;
  }
  return total;
}

//Función calcular balance presupuestario
function calcularBalance() {
  let computo = presupuesto - calcularTotalGastos();

  return computo;
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
  calcularBalance,
};
