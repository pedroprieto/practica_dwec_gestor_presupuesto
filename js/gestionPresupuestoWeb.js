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

// Eventos
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};