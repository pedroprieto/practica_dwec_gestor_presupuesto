


function mostrarDatoEnId(idElemento, valor){
  let elemento = document.getElementById(idElemento);
  elemento.innerText(valor);
}

function mostrarGastoWeb(idElemento, gasto){
  let elementoTarget = document.getElementById(idElemento);
  let elementoGasto = elementoTarget.createElement(div.gasto);
  elementoTarget.append(elementoGasto);

  let gastoDescr = elementoGasto.createElement(div.gastoDescripcion);


}











export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}