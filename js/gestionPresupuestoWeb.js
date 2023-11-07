import * as gp from './gestionPresupuesto.js'

function actualizarPresupuestoWeb () {
  const nuevoPresupuesto = Number(globalThis.prompt('Introduce un presupuesto.'))
  gp.actualizarPresupuesto(nuevoPresupuesto)
  repintar()
}

function repintar () {
  // Mostrar el presupuesto en #presupuesto
  mostrarDatoEnID('presupuesto', gp.mostrarPresupuesto())

  // Mostrar los gastos totales en #gastos-totales
  mostrarDatoEnID('gastos-totales', gp.calcularTotalGastos())

  // Mostrar el balance total en #balance-total
  mostrarDatoEnID('balance-total', gp.calcularBalance())

  // Borrar el contenido de #listado-gastos-completo
  borrarContenido('listado-gastos-completo')

  // Mostrar el listado completo de gastos en div#listado-gastos-completo
  for (const gasto of gp.listarGastos()) {
    mostrarGastoWeb('listado-gastos-completo', gasto)
  }
}

function borrarContenido (idElemento) {
  const elemento = document.getElementById(idElemento)
  elemento.innerHTML = ''
}

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
  dato.innerHTML = valor
}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
  const dAgrupacion = document.createElement('div')
  dAgrupacion.classList.add('agrupacion')

  const header1 = document.createElement('h1')
  header1.innerHTML = `Gastos agrupados por ${periodo}`
  dAgrupacion.append(header1)

  for (const [key, value] of Object.entries(agrup)) {
    const dAgrupacionDato = document.createElement('div')
    dAgrupacionDato.classList.add('agrupacion-dato')

    const dAgrupacionClave = document.createElement('span')
    dAgrupacionClave.classList.add('agrupacion-dato-clave')
    dAgrupacionClave.innerHTML = key
    dAgrupacionDato.append(dAgrupacionClave)

    const dAgrupacionValor = document.createElement('span')
    dAgrupacionValor.classList.add('agrupacion-dato-valor')
    dAgrupacionValor.innerHTML = value
    dAgrupacionDato.append(dAgrupacionValor)

    dAgrupacion.append(dAgrupacionDato)
  }

  const elemento = document.getElementById(idElemento)
  elemento.append(dAgrupacion)
}

export {
  actualizarPresupuestoWeb,
  repintar,
  mostrarDatoEnID,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}
