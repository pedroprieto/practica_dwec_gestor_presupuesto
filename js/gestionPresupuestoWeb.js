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