function mostrarGastoWeb (idElemento, gasto) {
  const cGasto = document.createElement('div')
  cGasto.classList.add('gasto')

  const cGastoDesc = document.createElement('div')
  cGastoDesc.classList.add('gasto-descripcion')
  cGastoDesc.innerHTML = gasto.descripcion
  cGasto.append(cGastoDesc)

  const cGastoFecha = document.createElement('div')
  cGastoFecha.classList.add('gasto-fecha')
  cGastoFecha.innerHTML = gasto.fecha
  cGasto.append(cGastoFecha)

  const cGastoValor = document.createElement('div')
  cGastoValor.classList.add('gasto-valor')
  cGastoValor.innerHTML = gasto.valor
  cGasto.append(cGastoValor)

  const cGastoEtiquetas = document.createElement('div')
  cGastoEtiquetas.classList.add('gasto-etiquetas')

  for (const etiqueta of gasto.etiquetas) {
    const cEtiqueta = document.createElement('span')
    cEtiqueta.classList.add('gasto-etiquetas-etiqueta')
    cEtiqueta.innerHTML = etiqueta
    cGastoEtiquetas.append(cEtiqueta)
  }

  cGasto.append(cGastoEtiquetas)

  mostrarDatoEnID(idElemento, cGasto)
}

function mostrarDatoEnID (idElemento, valor) {
  const dato = document.getElementById(idElemento)
  dato.append(valor)
}

function mostrarGastosAgrupadosWeb () {
  // TODO
}

export {
  mostrarDatoEnID,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}
