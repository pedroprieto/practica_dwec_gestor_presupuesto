// TODO: Crear las funciones, objetos y letiables indicadas en el enunciado

// TODO: letiable global
let presupuesto = 0;
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
    s += "Fecha: " + new Date(this.fecha).toLocaleString() + "\n";
    s += "Etiquetas:\n";

    for (let i = 0; i < this.etiquetas.length; i++) {
      let etiqueta = this.etiquetas[i];
      s += "- " + etiqueta + "\n";
    }

    return s;
  };

  this.actualizarFecha = function (fecha) {
    fecha = Date.parse(fecha);

    if (!isNaN(fecha)) {
      this.fecha = fecha;
    }
  };

  this.anyadirEtiquetas = function (...etiquetas) {
    for (let i = 0; i < etiquetas.length; i++) {
      let etiqueta = etiquetas[i];
      if (this.etiquetas.indexOf(etiqueta) < 0) {
        this.etiquetas.push(etiqueta);
      }
    }
  };

  this.borrarEtiquetas = function (...etiquetas) {
    for (let i = 0; i < etiquetas.length; i++) {
      let etiqueta = etiquetas[i];
      let posicion = this.etiquetas.indexOf(etiqueta);

      if (posicion >= 0) {
        this.etiquetas.splice(posicion, 1);
      }
    }
  };

  this.obtenerPeriodoAgrupacion = function (periodo) {
    let d = new Date(this.fecha);
    let mes = d.getMonth() + 1;

    if (mes < 10) {
      mes = "0" + mes;
    }

    let dia = d.getDate();

    if (dia < 10) {
      dia = "0" + dia;
    }

    if (periodo == "dia") {
      return `${d.getFullYear()}-${mes}-${dia}`;
    } else if (periodo == "mes") {
      return `${d.getFullYear()}-${mes}`;
    } else if (periodo == "anyo") {
      return `${d.getFullYear()}`;
    }

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

function filtrarGastos(filtro) {
  return gastos.filter(function (element) {
    let fecha = element.fecha;
    let valor = element.valor;
    let descripcion = element.descripcion;
    let etiquetas = element.etiquetas;

    // Tratar parametros
    let fechaDesde = Date.parse(filtro.fechaDesde);
    let fechaHasta = Date.parse(filtro.fechaHasta);
    let valorMinimo = filtro.valorMinimo;
    let valorMaximo = filtro.valorMaximo;
    let descripcionContiene = filtro.descripcionContiene;
    let etiquetasTiene = filtro.etiquetasTiene;

    let incluir = true; // Por excluir seria muy largo de comprobar

    // Fecha
    if (fecha < fechaDesde || fecha > fechaHasta) {
      incluir = false;
    }

    // Valor
    if (valor < valorMinimo || valor > valorMaximo) {
      incluir = false;
    }

    // Descripcion
    if (descripcionContiene && !descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())) {
      incluir = false;
    }

    // Etiquetas
    if (etiquetasTiene) {
      var encontrado = false;

      for (let etiqueta of etiquetasTiene) {
        for (let e of etiquetas) {
          if (e.toLowerCase() == etiqueta.toLowerCase()) {
            encontrado = true;
            break;
          }
        }

        if (encontrado) {
          break;
        }
      }

      if (!encontrado) {
        incluir = false;
      }
    }

    // Objeto vacio
    if (Object.keys(filtro).length == 0) {
      incluir = true;
    }

    return incluir;
  });
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
  return filtrarGastos({
    etiquetasTiene: etiquetas, // Cuidado la propiedad de filtro es etiquetasTiene no etiquetas
    fechaDesde,
    fechaHasta
  }).reduce(function (acc, gasto) {
    let agrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
    acc[agrupacion] = acc[agrupacion] ? acc[agrupacion] + gasto.valor : gasto.valor;
    return acc;
  }, {});
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
  agruparGastos
}




