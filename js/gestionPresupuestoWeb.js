"use strict";
import * as datosPresupuesto from "./gestionPresupuesto.js";

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
  gastoDescripcion.innerHTML = gasto.descripcion;
  divGasto.append(gastoDescripcion);

  let gastoFecha = document.createElement("div");
  gastoFecha.className = "gasto-fecha";
  let fechaNueva = new Date(gasto.fecha);
  gastoFecha.innerHTML = fechaNueva.toLocaleString();
  divGasto.append(gastoFecha);

  let gastoValor = document.createElement("div");
  gastoValor.className = "gasto-valor";
  gastoValor.innerHTML = gasto.valor;
  divGasto.append(gastoValor);

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className = "gasto-etiquetas";
  divGasto.append(gastoEtiquetas);

  for (let x of gasto.etiquetas) {
    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiqueta.innerHTML = x + "<br>";
    gastoEtiquetas.append(gastoEtiqueta);

    let nuevoObjEtiqueta = new BorrarEtiquetasHandle();
    nuevoObjEtiqueta.gasto = gasto;
    nuevoObjEtiqueta.etiqueta = x;
    gastoEtiqueta.addEventListener("click", nuevoObjEtiqueta);
  }

  let nuevoObj = new EditarHandle();
  nuevoObj.gasto = gasto;

  let button = document.createElement("button");
  button.type = "button";
  button.innerText = "Editar";
  button.className = "gasto-editar";
  button.addEventListener("click", nuevoObj);
  divGasto.append(button);

  let nuevoObjBorrar = new BorrarHandle();
  nuevoObjBorrar.gasto = gasto;

  let buttonBorrar = document.createElement("button");
  buttonBorrar.type = "button";
  buttonBorrar.innerText = "Borrar";
  buttonBorrar.className = "gasto-borrar";
  buttonBorrar.addEventListener("click", nuevoObjBorrar);
  divGasto.append(buttonBorrar);

  let ObjBorrarApi = new BorrarApiHandle();
  ObjBorrarApi.id = gasto.gastoId;

  let BorrarApi = document.createElement("button");
  BorrarApi.type = "button";
  BorrarApi.innerText = "Borrar (API)";
  BorrarApi.className = "gasto-borrar-api";
  BorrarApi.addEventListener("click", ObjBorrarApi);
  divGasto.append(BorrarApi);

  let nuevoObjFormulario = new EditarHandleFormulario();
  nuevoObjFormulario.id = gasto.gastoId;
  nuevoObjFormulario.gasto = gasto;
  nuevoObjFormulario.div = divGasto;

  let buttonFormulario = document.createElement("button");
  buttonFormulario.type = "button";
  buttonFormulario.innerText = "Editar (formulario)";
  buttonFormulario.className = "gasto-editar-formulario";
  buttonFormulario.addEventListener("click", nuevoObjFormulario);
  divGasto.append(buttonFormulario);
}

function BorrarApiHandle() {
  this.handleEvent = async function (e) {
    let number = this.id;
    let nombre = document.getElementById("nombre_usuario");
    let usuarioApi = nombre.value
      .match(/[a-z]+/gi)
      .join("")
      .toLowerCase();
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuarioApi}/${number}`;
    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(error);
    }
    cargarGastosApi();
  };
}

function ActualizarApiHandle() {
  this.handleEvent = async function (e) {
    let number = this.id;
    let nombre = document.getElementById("nombre_usuario");
    let usuarioApi = nombre.value
      .match(/[a-z]+/gi)
      .join("")
      .toLowerCase();
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuarioApi}/${number}`;
    let disparador = event.currentTarget;
    let formulario = disparador.parentNode;

    let descripcionFormularioGasto = formulario.elements.descripcion.value;
    let valorFormularioGasto = parseFloat(formulario.elements.valor.value);
    let fechaFormularioGasto = formulario.elements.fecha.value;
    let etiquetasFormularioGasto = formulario.elements.etiquetas.value;

    let arrFormularioGasto = etiquetasFormularioGasto.split(",");

    let gasto = new datosPresupuesto.CrearGasto(
      descripcionFormularioGasto,
      valorFormularioGasto,
      fechaFormularioGasto,
      ...arrFormularioGasto
    );

    try {
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(gasto),
      });
    } catch (error) {
      alert(error);
    }
    cargarGastosApi();
  };
}

function submitHandle() {
  this.handleEvent = function (e) {
    event.preventDefault();

    let formulario = event.currentTarget;

    let descripcionFormularioGasto = formulario.elements.descripcion.value;
    let valorFormularioGasto = parseFloat(formulario.elements.valor.value);
    let fechaFormularioGasto = formulario.elements.fecha.value;
    let etiquetasFormularioGasto = formulario.elements.etiquetas.value;

    let arrFormularioGasto = etiquetasFormularioGasto.split(",");

    this.gasto.actualizarDescripcion(descripcionFormularioGasto);
    this.gasto.actualizarValor(valorFormularioGasto);
    this.gasto.actualizarFecha(fechaFormularioGasto);
    this.gasto.anyadirEtiquetas(...arrFormularioGasto);

    repintar();
  };
}

function EditarHandleFormulario() {
  this.handleEvent = function (e) {
    let BotonLlamada = event.currentTarget;
    BotonLlamada.disabled = true;
    let plantillaFormulario = document
      .getElementById("formulario-template")
      .content.cloneNode(true);
    let divGasto = this.div;

    let datos = plantillaFormulario.querySelector("form");

    datos.elements.descripcion.value = this.gasto.descripcion;
    datos.elements.valor.value = this.gasto.valor;
    let fecha = new Date(this.gasto.fecha);

    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    } else {
      month = `${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    } else {
      day = `${day}`;
    }
    let fechaValor = `${year}-${month}-${day}`;
    datos.elements.fecha.value = fechaValor;
    datos.elements.etiquetas.value = this.gasto.etiquetas;

    let objetoActualizar = new submitHandle();
    objetoActualizar.gasto = this.gasto;

    datos.addEventListener("submit", objetoActualizar);

    let objetoCancelar = new CancelarHandle();
    objetoCancelar.formulario = datos;
    objetoCancelar.asignacion = event.currentTarget;

    datos
      .querySelector("button.cancelar")
      .addEventListener("click", objetoCancelar);

    let objetoActualizarApi = new ActualizarApiHandle();
    objetoActualizarApi.id = this.id;
    objetoActualizarApi.gasto = this.gasto;

    datos
      .querySelector("button.gasto-enviar-api")
      .addEventListener("click", objetoActualizarApi);

    divGasto.append(plantillaFormulario);
  };
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let identificador = document.getElementById(idElemento);
  identificador.innerHTML = "";

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
    let valorDecimal = agrup[x];
    agrupacionValor.innerHTML = valorDecimal.toFixed(2) + "<br>";
    agrupacionDato.append(agrupacionValor);
  }

  identificador.style.width = "33%";
  identificador.style.display = "inline-block";

  let chart = document.createElement("canvas");

  let unit = "";
  switch (periodo) {
    case "anyo":
      unit = "year";
      break;
    case "mes":
      unit = "month";
      break;
    case "dia":
    default:
      unit = "day";
      break;
  }

  const myChart = new Chart(chart.getContext("2d"), {
    type: "bar",
    data: {
      datasets: [
        {
          label: `Gastos por ${periodo}`,
          backgroundColor: "#555555",
          data: agrup,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: unit,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  identificador.append(chart);
}

function repintar() {
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", mostrar);

  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId("gastos-totales", gastoTotal);

  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total", balanceTotal);

  let borrarDatos = (document.getElementById(
    "listado-gastos-completo"
  ).innerHTML = "");

  let matrizGasto = datosPresupuesto.listarGastos();
  for (const x of matrizGasto) {
    mostrarGastoWeb("listado-gastos-completo", x);
  }

  let agrupacionDia = datosPresupuesto.agruparGastos("dia");
  mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "día");

  let agrupacionMes = datosPresupuesto.agruparGastos("mes");
  mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

  let agrupacionAnyo = datosPresupuesto.agruparGastos("anyo");
  mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyo, "año");
}

function actualizarPresupuestoWeb() {
  let cambioPresupuesto = parseInt(
    prompt("Cual es el valor del presupuesto actualmente")
  );
  datosPresupuesto.actualizarPresupuesto(cambioPresupuesto);
  repintar();
}

let botonActualizarPresupuesto = document.getElementById(
  "actualizarpresupuesto"
);
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
  let descripcion = prompt("Escribe la descripción del gasto");
  let valor = parseFloat(prompt("Escribe el valor del gasto"));
  let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
  let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");

  let arrEtiquetas = etiquetas.split(",");

  let gastoAnyadido = new datosPresupuesto.CrearGasto(
    descripcion,
    valor,
    fecha,
    ...arrEtiquetas
  );

  datosPresupuesto.anyadirGasto(gastoAnyadido);
  repintar();
}

let botonGasto = document.getElementById("anyadirgasto");
botonGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
  this.handleEvent = function (e) {
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor = parseFloat(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");

    let arrEditar = etiquetas.split(",");

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...arrEditar);

    repintar();
  };
}

function BorrarHandle() {
  this.handleEvent = function (e) {
    let number = this.gasto.id;

    datosPresupuesto.borrarGasto(number);

    repintar();
  };
}

function BorrarEtiquetasHandle() {
  this.handleEvent = function (e) {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
  };
}

function submitBoton(event) {
  document
    .getElementById("anyadirgasto-formulario")
    .attributes.removeNamedItem("disabled");

  event.preventDefault();

  let formulario = event.currentTarget;

  let descripcionFormulario = formulario.elements.descripcion.value;
  let valorFormulario = parseFloat(formulario.elements.valor.value);
  let fechaFormulario = formulario.elements.fecha.value;
  let etiquetasFormulario = formulario.elements.etiquetas.value;

  let arrFormulario = etiquetasFormulario.split(",");

  let gasto = new datosPresupuesto.CrearGasto(
    descripcionFormulario,
    valorFormulario,
    fechaFormulario,
    ...arrFormulario
  );

  datosPresupuesto.anyadirGasto(gasto);
  repintar();
}

function CancelarHandle() {
  this.handleEvent = function (e) {
    this.formulario.remove();
    this.asignacion.attributes.removeNamedItem("disabled");
  };
}

async function enviarApi(event) {
  let nombre = document.getElementById("nombre_usuario");
  let usuarioApi = nombre.value
    .match(/[a-z]+/gi)
    .join("")
    .toLowerCase();

  let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuarioApi}`;

  let formulario = event.currentTarget.parentNode;
  let descripcionFormulario = formulario.elements.descripcion.value;
  let valorFormulario = parseFloat(formulario.elements.valor.value);
  let fechaFormulario = formulario.elements.fecha.value;
  let etiquetasFormulario = formulario.elements.etiquetas.value;

  let arrFormulario = etiquetasFormulario.split(",");

  let gasto = new datosPresupuesto.CrearGasto(
    descripcionFormulario,
    valorFormulario,
    fechaFormulario,
    ...arrFormulario
  );

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(gasto),
    });
  } catch (error) {
    alert(error);
  }
  cargarGastosApi();
}

function nuevoGastoWebFormulario() {
  document.getElementById("anyadirgasto-formulario").disabled = true;
  let plantillaFormulario = document
    .getElementById("formulario-template")
    .content.cloneNode(true);

  let control = document.getElementById("controlesprincipales");

  var datos = plantillaFormulario.querySelector("form");

  datos.addEventListener("submit", submitBoton);

  let cancelar = new CancelarHandle();
  cancelar.formulario = datos;
  cancelar.asignacion = event.currentTarget;

  datos.querySelector("button.cancelar").addEventListener("click", cancelar);
  datos
    .querySelector("button.gasto-enviar-api")
    .addEventListener("click", enviarApi);
  control.append(plantillaFormulario);
}

let anyadirFormulario = document.getElementById("anyadirgasto-formulario");
anyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

function filtraGastosWeb() {
  event.preventDefault();
  let formulario = document.getElementById("formulario-filtrado");

  let descripcionForm =
    formulario.elements["formulario-filtrado-descripcion"].value;
  let valorMinimoForm = parseFloat(
    formulario.elements["formulario-filtrado-valor-minimo"].value
  );
  let valorMaximoForm = parseFloat(
    formulario.elements["formulario-filtrado-valor-maximo"].value
  );
  let fechaDesdeForm =
    formulario.elements["formulario-filtrado-fecha-desde"].value;

  let fechaHastaForm =
    formulario.elements["formulario-filtrado-fecha-hasta"].value;

  let etiquetasTieneForm =
    formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
  let EtiquetasArray;

  if (etiquetasTieneForm != "") {
    EtiquetasArray =
      datosPresupuesto.transformarListadoEtiquetas(etiquetasTieneForm);
  }

  let objetoAFiltrar = {
    descripcionContiene: descripcionForm,
    valorMinimo: valorMinimoForm,
    valorMaximo: valorMaximoForm,
    fechaDesde: fechaDesdeForm,
    fechaHasta: fechaHastaForm,
    etiquetasTiene: EtiquetasArray,
  };

  var borrarGastosPantalla = document.getElementById("listado-gastos-completo");
  borrarGastosPantalla.innerHTML = "";

  let filtro = datosPresupuesto.filtrarGastos(objetoAFiltrar);

  for (const x of filtro) {
    mostrarGastoWeb("listado-gastos-completo", x);
  }
}

let formulario = document.getElementById("formulario-filtrado");
formulario.addEventListener("submit", filtraGastosWeb);

function guardarGastosWeb() {
  let listaGasto = datosPresupuesto.listarGastos();
  localStorage.GestorGastosDWEC = JSON.stringify(listaGasto);
}
let guardarGastos = document.getElementById("guardar-gastos");
guardarGastos.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb() {
  let cargarLocal, cargar;

  if (localStorage.GestorGastosDWEC) {
    cargarLocal = JSON.parse(localStorage.GestorGastosDWEC);
    cargar = datosPresupuesto.cargarGastos(cargarLocal);
  } else {
    cargarLocal = [];
    cargar = datosPresupuesto.cargarGastos(cargarLocal);
  }

  repintar();
}

let cargarGastos = document.getElementById("cargar-gastos");
cargarGastos.addEventListener("click", cargarGastosWeb);

async function cargarGastosApi() {
  let nombre = document.getElementById("nombre_usuario");
  let usuarioApi = nombre.value
    .match(/[a-z]+/gi)
    .join("")
    .toLowerCase();

  let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuarioApi}`;

  try {
    let response = await fetch(url);
    let datos = await response.json();
    datosPresupuesto.cargarGastos(datos);
    repintar();
  } catch (error) {
    alert(error);
  }
}

let GastosApi = document.getElementById("cargar-gastos-api");
GastosApi.addEventListener("click", cargarGastosApi);

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
