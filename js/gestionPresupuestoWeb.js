import * as gp from './gestionPresupuesto.js'

// TODO: al añadir gastos y repintar, el handle se pierde -> añadir eventos al repintar?

class EditarHandle {
  handleEvent (event) {
    const pDescripcion = globalThis.prompt('Introduce una descripción', this.gasto.descripcion)
    const pValor = Number(globalThis.prompt('Introduce un valor', this.gasto.valor))
    const pFecha = globalThis.prompt('Introduce una fecha (aaaa/mm/dd)', this.gasto.fecha)
    const pEtiquetas = globalThis.prompt('Introduce etiquetas separadas por coma', this.gasto.mostrarEtiquetas()).split(',')

    this.gasto.actualizarDescripcion(pDescripcion)
    this.gasto.actualizarValor(pValor)
    this.gasto.actualizarFecha(pFecha)
    this.gasto.borrarEtiquetas()
    this.gasto.anyadirEtiquetas(...pEtiquetas)

    repintar()
  }
}
class BorrarEtiquetasHandle {
  handleEvent (event) {
    this.gasto.borrarEtiquetas(this.etiqueta)
    repintar()
  }
}

class BorrarHandle {
  handleEvent (event) {
    gp.borrarGasto(this.gasto.id)
    repintar()
  }
}

function nuevoGastoWeb () {
  const pDescripcion = globalThis.prompt('Introduce una descripción')
  const pValor = Number(globalThis.prompt('Introduce un valor'))
  const pFecha = globalThis.prompt('Introduce una fecha (aaaa/mm/dd)')
  const pEtiquetas = globalThis.prompt('Introduce etiquetas separadas por coma').split(',')

  const gasto = new gp.CrearGasto(pDescripcion, pValor, pFecha, ...pEtiquetas)
  gp.anyadirGasto(gasto)

  repintar()
}

function actualizarPresupuestoWeb () {
  const nuevoPresupuesto = Number(globalThis.prompt('Introduce un presupuesto'))

  if (nuevoPresupuesto !== 0) {
    gp.actualizarPresupuesto(nuevoPresupuesto)
    repintar()
  }
}

function nuevoGastoWebFormulario () {
  const plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true)

  const botonAnyadirFormulario = document.getElementById('anyadirgasto-formulario')
  botonAnyadirFormulario.disabled = true

  document.getElementById('controlesprincipales').appendChild(plantillaFormulario)

  const formulario = document.body.querySelector('form')

  formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    const form = event.currentTarget

    const fDescripcion = form.elements.descripcion.value
    const fValor = Number(form.elements.valor.value)
    const fFecha = form.elements.fecha.value
    const fEtiquetas = form.elements.etiquetas.value.split(',')

    const gasto = new gp.CrearGasto(fDescripcion, fValor, fFecha, ...fEtiquetas)

    gp.anyadirGasto(gasto)
    console.log(gp.listarGastos())

    repintar()

    botonAnyadirFormulario.disabled = false

    document.getElementById('controlesprincipales').removeChild(formulario)
  })
}

function anyadirEventos () {
  const actualizar = document.getElementById('actualizarpresupuesto')
  actualizar.addEventListener('click', actualizarPresupuestoWeb)

  const anyadir = document.getElementById('anyadirgasto')
  anyadir.addEventListener('click', nuevoGastoWeb)

  const anyadirFormulario = document.getElementById('anyadirgasto-formulario')
  anyadirFormulario.addEventListener('click', nuevoGastoWebFormulario)

  // añadimos evento al botón Editar Gastos

  const bEditarGastos = document.getElementsByClassName('gasto-editar')

  for (const bEditar of bEditarGastos) {
    // Cada boton tiene que tener su instancia
    const objetoEditar = new EditarHandle()

    // Traemos el gasto del padre del boton, que es quien tiene la info
    objetoEditar.gasto = bEditar.parentNode.gasto

    bEditar.addEventListener('click', objetoEditar)
  }

  // Añadimos evento al botón Borrar Gastos

  const bBorrarGastos = document.getElementsByClassName('gasto-borrar')

  for (const bBorrar of bBorrarGastos) {
    // Cada boton tiene que tener su instancia
    const objetoBorrar = new BorrarHandle()

    // Traemos el gasto del padre del boton, que es quien tiene la info
    objetoBorrar.gasto = bBorrar.parentNode.gasto

    bBorrar.addEventListener('click', objetoBorrar)
  }

  // Añadimos evento al span de etiquetas

  const sEtiquetas = document.getElementsByClassName(
    'gasto-etiquetas-etiqueta'
  )

  for (const sEtiqueta of sEtiquetas) {
    const objBorrarEtiqueta = new BorrarEtiquetasHandle()

    objBorrarEtiqueta.gasto = sEtiqueta.parentNode.parentNode.gasto
    objBorrarEtiqueta.etiqueta = sEtiqueta.innerHTML

    sEtiqueta.addEventListener('click', objBorrarEtiqueta)
  }
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

  anyadirEventos()
}

function borrarContenido (idElemento) {
  const elemento = document.getElementById(idElemento)
  elemento.innerHTML = ''
}

function mostrarGastoWeb (idElemento, gasto) {
  const cGasto = document.createElement('div')
  cGasto.classList.add('gasto')
  cGasto.gasto = gasto

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

  const bEditar = document.createElement('button')
  bEditar.classList.add('gasto-editar')
  bEditar.innerHTML = 'Editar'
  bEditar.type = 'button'
  cGasto.append(bEditar)

  const bBorrar = document.createElement('button')
  bBorrar.classList.add('gasto-borrar')
  bBorrar.innerHTML = 'Borrar'
  bBorrar.type = 'button'
  cGasto.append(bBorrar)

  const elemento = document.getElementById(idElemento)
  elemento.append(cGasto)
}

// Borra el contenido y muestra sólo el valor
function mostrarDatoEnID (idElemento, valor) {
  const elemento = document.getElementById(idElemento)
  elemento.innerHTML = ''
  elemento.append(valor)
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
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
  anyadirEventos,
  nuevoGastoWeb,
  repintar,
  mostrarDatoEnID,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}
