import * as gestion from "./gestionPresupuesto.js";

function repintar() {
  document.getElementById("presupuesto").innerHTML = "";
  web.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

  document.getElementById("gastos-totales").innerHTML = "";
  web.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

  document.getElementById("balance-total").innerHTML = "";
  web.mostrarDatoEnId("balance-total", gestion.calcularBalance());

  document.getElementById("listado-gastos-completo").innerHTML = "";
  for (let gasto of gestion.listarGastos()) {
    web.mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto) {
  var etiquetasText = ``;

  for (let etiqueta of gasto.etiquetas) {
    etiquetasText += `
      <span class="gasto-etiquetas-etiqueta">
        ${etiqueta}
      </span>
    `;
  }

  mostrarDatoEnId(idElemento, `
  <div class="gasto">
  <div class="gasto-descripcion">${gasto.descripcion}</div>
  <div class="gasto-fecha">${gasto.obtenerPeriodoAgrupacion("dia")}</div> 
  <div class="gasto-valor">${gasto.valor}</div> 
  <div class="gasto-etiquetas">
    ${etiquetasText}
  </div> 
  </div>`);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let agrupaciones = ``;

  for (let agrupacion in agrup) {
    agrupaciones += `
    <div class="agrupacion-dato">
      <span class="agrupacion-dato-clave">${agrupacion}</span>
      <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
    </div>
    `;
  }

  mostrarDatoEnId(idElemento, `
  <div class="agrupacion">
  <h1>Gastos agrupados por ${periodo}</h1>
  ${agrupaciones}
  </div>`);
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};