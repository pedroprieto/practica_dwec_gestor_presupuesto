"use strict";

function mostrarDatoEnId(idElemento, valor) {
  let identificador = document.getElementById(idElemento);
  let textoValor = (identificador.innerHTML = valor);

  return textoValor;
}

function mostrarGastoWeb(idElemento, gasto) {
  let identificador = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className = "gasto";
  identificador.append(divGasto);

  let gastoDescripcion = document.createElement("div");
  gastoDescripcion.className = "gasto-descripcion";
  gastoDescripcion.innerHTML = gastos.descripcion;
  divGasto.append(gastoDescripcion);

  let gastoFecha = document.createElement("div");
  gastoFecha.className = "gasto-fecha";
  gastoFecha.innerHTML = gastos.fecha;
  divGasto.append(gastoFecha);

  let gastoValor = document.createElement("div");
  gastoValor.className = "gasto-valor";
  gastoValor.innerHTML = gastos.valor;
  divGasto.append(gastoValor);

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className = "gasto-etiquetas";
  divGasto.append(gastoEtiquetas);

  for (let x of gastos.etiquetas) {
    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiqueta.innerHTML = x;
    gastoEtiquetas.append(gastoEtiqueta);
  }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let identificador = document.getElementById(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";
  identificador.append(divAgrupacion);

  let tituloAgrupacion = document.createElement("h1");
  tituloAgrupacion.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(tituloAgrupacion);

  for (let x in agrup) {
    let agrupacionDato = document.createElement("div");
    agrupacionDato.className = "agrupacion-dato";
    divAgrupacion.append(agrupacionDato);

    let agrupacionClave = document.createElement("span");
    agrupacionClave.className = "agrupacion-dato-clave";
    agrupacionClave.innerHTML = x + "<br>";
    agrupacionDato.append(agrupacionClave);

    let agrupacionValor = document.createElement("span");
    agrupacionValor.className = "agrupacion-dato-valor";
    agrupacionValor.innerHTML = agrup[x] + "<br>";
    agrupacionDato.append(agrupacionValor);
  }
}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
