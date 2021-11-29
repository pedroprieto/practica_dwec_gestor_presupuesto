import * as gestion from "./gestionPresupuesto.js";

function repintar() {
  document.getElementById("presupuesto").innerHTML = "";
  mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

  document.getElementById("gastos-totales").innerHTML = "";
  mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

  document.getElementById("balance-total").innerHTML = "";
  mostrarDatoEnId("balance-total", gestion.calcularBalance());

  document.getElementById("listado-gastos-completo").innerHTML = "";
  for (let gasto of gestion.listarGastos()) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

function actualizarPresupuestoWeb() {
  let presupesto = Number(prompt("Introduzca prespuesto"));
  gestion.actualizarPresupuesto(presupesto);
  repintar();
}

function nuevoGastoWeb() {
  let descripcion = prompt("Introduzca descripción");
  let valor = Number(prompt("Introduzca valor"));
  let fecha = prompt("Introduzca fecha");
  let etiquetas = prompt("Introduzca etiquetas separas por commas");

  // Tener en cuenta el caso vacio
  etiquetas = etiquetas == "" ? [] : etiquetas.split(",");
  gestion.anyadirGasto(new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas));
  repintar();
}

function nuevoGastoWebFormulario(event) {
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
  let formulario = plantillaFormulario.querySelector("form");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    let form = event.currentTarget;

    let descripcion = form.elements.descripcion.value;
    let valor = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;

    etiquetas = etiquetas == "" ? [] : etiquetas.split(",");
    gestion.anyadirGasto(new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas));
    repintar();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  });

  let manejadorCancelarFormulario = new CancelarFormularioHandle();
  manejadorCancelarFormulario.formulario = formulario;
  manejadorCancelarFormulario.botonAnyadirFormulario = event.currentTarget;

  formulario.querySelector("button.cancelar").addEventListener("click", manejadorCancelarFormulario);

  event.currentTarget.setAttribute("disabled", "");

  let controles = document.getElementById("controlesprincipales");
  controles.appendChild(plantillaFormulario);
}

function CancelarFormularioHandle() {
  this.handleEvent = function () {
    this.formulario.remove();
    this.botonAnyadirFormulario.removeAttribute("disabled");
  };
}

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto) {
  let gastoEl = document.createElement("div");
  gastoEl.classList.add("gasto");

  gastoEl.innerHTML = `
  <div class="gasto-descripcion">${gasto.descripcion}</div>
  <div class="gasto-fecha">${gasto.obtenerPeriodoAgrupacion("dia")}</div> 
  <div class="gasto-valor">${gasto.valor}</div>`;


  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.classList.add("gasto-etiquetas");

  for (let etiqueta of gasto.etiquetas) {
    let span = document.createElement("span");
    span.classList.add("gasto-etiquetas-etiqueta");
    span.innerHTML = etiqueta;

    let manejadorBorrarEtiquetas = new BorrarEtiquetasHandle();
    manejadorBorrarEtiquetas.gasto = gasto;
    manejadorBorrarEtiquetas.etiqueta = etiqueta;

    span.addEventListener("click", manejadorBorrarEtiquetas);
    gastoEtiquetas.appendChild(span);
  }

  gastoEl.appendChild(gastoEtiquetas);

  let botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.classList.add("gasto-editar");
  botonEditar.innerHTML = "Editar";

  let manejadorEditar = new EditarHandle();
  manejadorEditar.gasto = gasto;

  botonEditar.addEventListener("click", manejadorEditar);

  gastoEl.appendChild(botonEditar);

  let botonBorrar = document.createElement("button");
  botonBorrar.type = "button";
  botonBorrar.classList.add("gasto-borrar");
  botonBorrar.innerHTML = "Borrar";

  let manejadorBorrar = new BorrarHandle();
  manejadorBorrar.gasto = gasto;

  botonBorrar.addEventListener("click", manejadorBorrar);

  gastoEl.appendChild(botonBorrar);

  let botonEditarFormulario = document.createElement("button");
  botonEditarFormulario.type = "button";
  botonEditarFormulario.classList.add("gasto-editar-formulario");
  botonEditarFormulario.innerHTML = "Editar (formulario)";

  let manejadorEditarFormulario = new EditarHandleFormulario();
  manejadorEditarFormulario.gasto = gasto;
  manejadorEditarFormulario.gastoEl = gastoEl;

  botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);

  gastoEl.appendChild(botonEditarFormulario);

  document.getElementById(idElemento).appendChild(gastoEl);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let agrupaciones = ``;

  for (let agrupacion in agrup) {
    agrupaciones += `
    <div class="agrupacion-dato">
      <span class="agrupacion-dato-clave">${agrupacion}</span>
      <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
    </div>`;
  }

  mostrarDatoEnId(idElemento, `
  <div class="agrupacion">
  <h1>Gastos agrupados por ${periodo}</h1>
  ${agrupaciones}
  </div>`);
}

function EditarHandleFormularioSubmit() {
  this.handleEvent = function (event) {
    event.preventDefault();

    let form = event.currentTarget;

    let descripcion = form.elements.descripcion.value;
    let valor = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;

    etiquetas = etiquetas == "" ? [] : etiquetas.split(",");

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    // gasto.actualizarEtiquetas(etiquetas); // No hay actualizar etiquetas en la logica de negocio

    repintar();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  };
}

function EditarHandleFormulario() {
  this.handleEvent = function (event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");

    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = this.gasto.obtenerPeriodoAgrupacion("dia");
    formulario.elements.etiquetas.value = this.gasto.etiquetas.join(",");

    let manejadorEditarFormulario = new EditarHandleFormularioSubmit();
    manejadorEditarFormulario.gasto = this.gasto;

    formulario.addEventListener("submit", manejadorEditarFormulario);

    let manejadorCancelarFormulario = new CancelarFormularioHandle();
    manejadorCancelarFormulario.formulario = formulario;
    manejadorCancelarFormulario.botonAnyadirFormulario = event.currentTarget;

    formulario.querySelector("button.cancelar").addEventListener("click", manejadorCancelarFormulario);

    event.currentTarget.setAttribute("disabled", "");

    this.gastoEl.appendChild(plantillaFormulario);
  };
}

function EditarHandle() {
  this.handleEvent = function () {
    let descripcion = prompt("Introduzca descripción");
    let valor = Number(prompt("Introduzca valor"));
    let fecha = prompt("Introduzca fecha");
    let etiquetas = prompt("Introduzca etiquetas separas por commas");

    // Tener en cuenta el caso vacio
    etiquetas = etiquetas == "" ? [] : etiquetas.split(",");

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    repintar();
  };
}

function BorrarHandle() {
  this.handleEvent = function () {
    gestion.borrarGasto(this.gasto.id);
    repintar();
  };
}

function BorrarEtiquetasHandle() {
  this.handleEvent = function () {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  };
}

function filtrarGastosWeb(event) {
  event.preventDefault();

  let formulario = event.currentTarget;

  let descripcionContiene = formulario.elements["formulario-filtrado-descripcion"].value;
  let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
  let valorMaximo =formulario.elements["formulario-filtrado-valor-maximo"].value;
  let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
  let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
  let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

  let filtro = {};

  descripcionContiene != "" ? filtro.descripcionContiene = descripcionContiene : null,
  valorMinimo != "" ? filtro.valorMinimo = Number(valorMinimo) : null,
  valorMaximo != "" ? filtro.valorMaximo = Number(valorMaximo): null,
  fechaDesde != "" ? filtro.fechaDesde = fechaDesde : null,
  fechaHasta != "" ? filtro.fechaHasta = fechaHasta : null,
  etiquetasTiene != "" ? filtro.etiquetasTiene = etiquetasTiene : null

  let gastos = gestion.filtrarGastos(filtro);

  console.dir(filtro);
  console.dir(gastos);

  document.getElementById("listado-gastos-completo").innerHTML = "";

  for (let gasto of gastos) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

// Eventos
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};