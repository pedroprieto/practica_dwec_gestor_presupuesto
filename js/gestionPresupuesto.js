"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
export let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorIntroducido) {
  let numero;
  if (valorIntroducido >= 0 && typeof valorIntroducido === "number") {
    presupuesto = valorIntroducido;
    numero = presupuesto;
  } else {
    numero = -1;
  }

  return numero;
}

function mostrarPresupuesto() {
  // TODO
  return `Tu presupuesto actual es de ${presupuesto} €`;
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
  for (let i of gastos) {
    let numGasto = i.id;

    if (numGasto == id) {
      let numIndex = gastos.indexOf(i);
      gastos.splice(numIndex, 1);
    }
  }
}

function calcularTotalGastos() {
  let sum = 0;
  for (let i of gastos) {
    sum += i.valor;
  }
  return sum;
}

function calcularBalance() {
  let gastosTotales = calcularTotalGastos();
  let balance = presupuesto - gastosTotales;

  return balance;
}

function filtrarGastos(objeto) {
  let fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene,
    num;
  let nuevaMatriz = [];
  if (Object.keys(objeto).length === 0) {
    nuevaMatriz = gastos;
  } else {
    for (const propiedad in objeto) {
      if (propiedad == "fechaDesde") {
        fechaDesde = objeto[propiedad];
      } else if (propiedad == "fechaHasta") {
        fechaHasta = objeto[propiedad];
      } else if (propiedad == "valorMinimo") {
        valorMinimo = objeto[propiedad];
      } else if (propiedad == "valorMaximo") {
        valorMaximo = objeto[propiedad];
      } else if (propiedad == "descripcionContiene") {
        descripcionContiene = objeto[propiedad];
      } else if (propiedad == "etiquetasTiene") {
        etiquetasTiene = objeto[propiedad];
      }
    }
  }

  //let nuevaMatriz;

  if (
    fechaDesde != undefined &&
    fechaHasta === undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter(
      (filtro) => filtro.fecha >= Date.parse(fechaDesde)
    );
    num = nuevaMatriz.length;
  } else if (
    fechaDesde != undefined &&
    fechaHasta != undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter(
      (filtro) =>
        filtro.fecha >= Date.parse(fechaDesde) &&
        filtro.fecha <= Date.parse(fechaHasta)
    );
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo != undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => filtro.valor > valorMinimo);
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo != undefined &&
    valorMaximo != undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter(
      (filtro) => filtro.valor > valorMinimo && filtro.valor < valorMaximo
    );
    num = nuevaMatriz.length;
  } else if (
    fechaDesde != undefined &&
    fechaHasta != undefined &&
    valorMinimo === undefined &&
    valorMaximo != undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter(
      (filtro) =>
        filtro.fecha >= Date.parse(fechaDesde) &&
        filtro.fecha <= Date.parse(fechaHasta) &&
        filtro.valor < valorMaximo
    );
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (filtro.etiquetas.indexOf(x) != -1) {
          return filtro;
        }
      }
    });
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo === undefined &&
    valorMaximo != undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (filtro.etiquetas.indexOf(x) != -1 && filtro.valor < valorMaximo) {
          return filtro;
        }
      }
    });
    num = nuevaMatriz.length;
  } else if (
    fechaDesde != undefined &&
    fechaHasta === undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (
          filtro.etiquetas.indexOf(x) != -1 &&
          filtro.fecha >= Date.parse(fechaDesde)
        ) {
          return filtro;
        }
      }
    });
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta != undefined &&
    valorMinimo === undefined &&
    valorMaximo != undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (
          filtro.etiquetas.indexOf(x) != -1 &&
          filtro.fecha <= Date.parse(fechaHasta) &&
          filtro.valor <= valorMaximo
        ) {
          return filtro;
        }
      }
    });
    num = nuevaMatriz.length;
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo != undefined &&
    valorMaximo != undefined &&
    descripcionContiene != undefined &&
    etiquetasTiene === undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      if (
        filtro.descripcion.indexOf(descripcionContiene) != -1 &&
        filtro.valor >= valorMinimo &&
        filtro.valor <= valorMaximo
      ) {
        return filtro;
      }
    });
  } else if (
    fechaDesde != undefined &&
    fechaHasta != undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (
          filtro.etiquetas.indexOf(x) != -1 &&
          filtro.fecha >= Date.parse(fechaDesde) &&
          filtro.fecha <= Date.parse(fechaHasta)
        ) {
          return filtro;
        }
      }
    });
  } else if (
    fechaDesde === undefined &&
    fechaHasta != undefined &&
    valorMinimo === undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (
          filtro.etiquetas.indexOf(x) != -1 &&
          filtro.fecha <= Date.parse(fechaHasta)
        ) {
          return filtro;
        }
      }
    });
  } else if (
    fechaDesde === undefined &&
    fechaHasta === undefined &&
    valorMinimo != undefined &&
    valorMaximo === undefined &&
    descripcionContiene === undefined &&
    etiquetasTiene != undefined
  ) {
    nuevaMatriz = gastos.filter((filtro) => {
      for (let x of etiquetasTiene) {
        if (filtro.etiquetas.indexOf(x) != -1 && filtro.valor >= valorMinimo) {
          return filtro;
        }
      }
    });
    num = nuevaMatriz.length;
  }

  return nuevaMatriz;
}

function agruparGastos(periodo, etiquetasTiene, fechaDesde, fechaHasta) {
  let periodoInicial, fechaInicial, fechaFinal;
  let num = [];
  let etiqueta = [];

  if (periodo === undefined) {
    periodoInicial = "mes";
  } else {
    periodoInicial = periodo;
  }

  if (etiquetasTiene === undefined || etiquetasTiene.length === 0) {
    etiqueta;
  } else {
    etiqueta = etiquetasTiene;
  }

  if (fechaHasta === undefined || isNaN(Date.parse(fechaHasta))) {
    fechaFinal = new Date();
  } else {
    fechaFinal = new Date(Date.parse(fechaHasta));
  }

  if (fechaDesde === undefined || isNaN(Date.parse(fechaDesde))) {
    fechaInicial;
  } else {
    fechaInicial = new Date(Date.parse(fechaDesde));
  }

  if (etiquetasTiene === undefined || etiquetasTiene.length === 0) {
    num = gastos;
  } else if (fechaDesde === undefined || isNaN(Date.parse(fechaDesde))) {
    num = gastos;
    num = filtrarGastos({ fechaHasta: fechaFinal, etiquetasTiene: etiqueta });
  } else {
    num = filtrarGastos({
      fechaDesde: fechaInicial,
      fechaHasta: fechaFinal,
      etiquetasTiene: etiqueta,
    });
  }

  let result = num.reduce((acc, order) => {
    return {
      ...acc,
      [order.obtenerPeriodoAgrupacion(periodoInicial)]:
        (acc[order.obtenerPeriodoAgrupacion(periodoInicial)] || 0) +
        order.valor,
    };
  }, {});

  return result;
}


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  // TODO
  this.descripcion = descripcion;
  this.etiquetas = [];

  this.anyadirEtiquetas = function (...etiquetas) {
    for (let i of etiquetas) {
      let comparar = this.etiquetas.indexOf(i);
      if (comparar == -1) {
        this.etiquetas.push(i);
      }
    }
  };

  if (etiquetas.length == 0) {
    this.etiquetas = [];
  } else {
    this.anyadirEtiquetas(...etiquetas);
  }

  if (typeof fecha === "undefined") {
    this.fecha = new Date();
  } else {
    if (isNaN(Date.parse(fecha))) {
      this.fecha = new Date();
    } else {
      this.fecha = Date.parse(fecha);
    }
  }

  if (valor >= 0 && typeof valor === "number") {
    this.valor = valor;
  } else {
    this.valor = 0;
  }

  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };

  this.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  };

  this.actualizarValor = function (valor) {
    if (valor >= 0 && typeof valor === "number") {
      this.valor = valor;
    }
  };

  this.mostrarGastoCompleto = function () {
    let texto =
      `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:` + "\n";
    for (let i = 0; i < this.etiquetas.length; i++) {
      texto += "- " + this.etiquetas[i] + "\n";
    }

    return texto;
  };

  this.actualizarFecha = function (fecha) {
    if (isNaN(Date.parse(fecha))) {
      this.fecha;
    } else {
      this.fecha = Date.parse(fecha);
    }
  };

  this.borrarEtiquetas = function (...etiquetas) {
    for (let i of etiquetas) {
      let comparar = this.etiquetas.indexOf(i);
      if (comparar != -1) {
        this.etiquetas.splice(comparar, 1);
      }
    }
  };


  this.obtenerPeriodoAgrupacion = function (periodo) {
    let dia = new Date(this.fecha).getDate();
    let anyo = new Date(this.fecha).getFullYear();
    let mes = new Date(this.fecha).getMonth() + 1;
    let text;

    if (dia < 10) {
      dia = "0" + dia.toString();
    } else {
      dia = dia.toString();
    }

    if (mes < 10) {
      mes = "0" + mes.toString();
    } else {
      mes = mes.toString();
    }

    if (periodo == "mes") {
      text = anyo.toString() + "-" + mes;
    } else if (periodo == "anyo") {
      text = anyo.toString();
    } else {
      text = anyo.toString() + "-" + mes + "-" + dia;
    }
    return text;
  };
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
  filtrarGastos,
  agruparGastos,
};
