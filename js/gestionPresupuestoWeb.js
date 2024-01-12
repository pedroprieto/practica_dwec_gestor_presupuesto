import * as gp from './gestionPresupuesto.js'

const API_URL = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'

/**
 * Controlador de eventos que solicita al usuario que edite las
 * propiedades de un objeto `gasto` y luego actualiza el objeto y vuelve a pintar la interfaz de
 * usuario.
 * @param gasto - Objeto que contiene información sobre un gasto.
 */
function EditarHandle (gasto) {
  this.handleEvent = (event) => {
    const pDescripcion = globalThis.prompt('Introduce una descripción', gasto.descripcion)
    const pValor = Number(globalThis.prompt('Introduce un valor', gasto.valor))
    const pFecha = globalThis.prompt('Introduce una fecha (aaaa/mm/dd)', gasto.fecha)
    const pEtiquetas = globalThis.prompt('Introduce etiquetas separadas por coma', gasto.mostrarEtiquetas()).split(',')

    gasto.actualizarDescripcion(pDescripcion)
    gasto.actualizarValor(pValor)
    gasto.actualizarFecha(pFecha)
    gasto.borrarEtiquetas()
    gasto.anyadirEtiquetas(...pEtiquetas)

    repintar()
  }
}

/**
 * Maneja la edición de un formulario para un gasto.
 * @param gasto - Objeto que contiene información sobre un gasto.
 */
function EditarHandleFormulario (gasto) {
  this.handleEvent = function (event) {
    // DECLARACIONES E INICIALIZACIONES
    const plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true)
    const bEditarFormulario = event.currentTarget.closest('.gasto-editar-formulario')

    bEditarFormulario.disabled = true
    bEditarFormulario.after(plantillaFormulario)

    // INICIALIZACION DE LOS VALORES DEL FORMULARIO
    const formulario = event.currentTarget.parentNode.querySelector('form')

    formulario.descripcion.value = gasto.descripcion
    formulario.valor.value = gasto.valor
    formulario.fecha.value = new Date(gasto.fecha).toISOString().substring(0, 10)
    formulario.etiquetas.value = gasto.etiquetas

    formulario.addEventListener('submit', event => {
      event.preventDefault()

      const form = event.currentTarget

      const fDescripcion = form.elements.descripcion.value
      const fValor = Number(form.elements.valor.value)
      const fFecha = form.elements.fecha.value
      const fEtiquetas = form.elements.etiquetas.value.split(',')

      gasto.actualizarDescripcion(fDescripcion)
      gasto.actualizarValor(fValor)
      gasto.actualizarFecha(fFecha)
      gasto.borrarEtiquetas()
      gasto.anyadirEtiquetas(...fEtiquetas)

      repintar()
    })

    // EVENTO EDITAR API -> actualiza el gasto en la API
    formulario
      .querySelector('.gasto-enviar-api')
      .addEventListener('click', editarGastoApi.bind(gasto))

    // EVENTO CANCELAR -> borra el formulario y reactiva el botón Editar
    formulario.querySelector('button.cancelar').addEventListener('click', new EventoCancelar(bEditarFormulario))
  }
}

async function editarGastoApi (e) {
  const usuario = document.getElementById('nombre_usuario').value

  const form = e.target.closest('form')

  const fDescripcion = form.elements.descripcion.value
  const fValor = Number(form.elements.valor.value)
  const fFecha = form.elements.fecha.value
  const fEtiquetas = form.elements.etiquetas.value.split(',')

  const gastoEditado = new gp.CrearGasto(fDescripcion, fValor, fFecha, ...fEtiquetas)

  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }

  const response = await fetch(API_URL + usuario + '/' + this.gastoId, {
    method: 'PUT',
    body: JSON.stringify(gastoEditado),
    headers: headersList
  })

  if (response.ok) { // si el HTTP-status es 200-299
    cargarGastosApi()
  } else {
    globalThis.alert('ErrorHTTP: ' + response.status)
  }
}

/**
 * Controlador de eventos que elimina una
 * etiqueta específica de un gasto y luego vuelve a pintar la interfaz de usuario.
 * @param gasto - Gasto del cual borrar la etiqueta.
 * @param etiqueta - Etiqueta que se desea eliminar del objeto
 */
function BorrarEtiquetasHandle (gasto, etiqueta) {
  this.handleEvent = (event) => {
    gasto.borrarEtiquetas(etiqueta)
    repintar()
  }
}

/**
 * Evento de eliminar un gasto específico.
 * @param gasto - Gasto a eliminar
 */
function BorrarHandle (gasto) {
  this.handleEvent = (event) => {
    gp.borrarGasto(gasto.id)
    repintar()
  }
}

function BorrarApiHandle (gasto) {
  this.handleEvent = async (event) => {
    const usuario = document.getElementById('nombre_usuario').value

    const response = await fetch(API_URL + usuario + '/' + gasto.gastoId, {
      method: 'DELETE'
    })

    if (response.ok) {
      cargarGastosApi()
    } else {
      globalThis.alert('ErrorHTTP: ' + response.status)
    }
  }
}

/**
 * Solicita al usuario que ingrese una descripción, valor, fecha y etiquetas
 * para un nuevo gasto, crea un nuevo objeto de gasto usando los valores ingresados, agrega el gasto a
 * una lista de gastos y luego vuelve a pintar la interfaz.
 */
function nuevoGastoWeb () {
  const pDescripcion = globalThis.prompt('Introduce una descripción')
  const pValor = Number(globalThis.prompt('Introduce un valor'))
  const pFecha = globalThis.prompt('Introduce una fecha (aaaa/mm/dd)')
  const pEtiquetas = globalThis.prompt('Introduce etiquetas separadas por coma').split(',')

  const gasto = new gp.CrearGasto(pDescripcion, pValor, pFecha, ...pEtiquetas)
  gp.anyadirGasto(gasto)

  repintar()
}

/**
 * Solicita al usuario que ingrese un nuevo presupuesto,
 * lo actualiza y luego vuelve a pintar la interfaz
 */
function actualizarPresupuestoWeb () {
  const nuevoPresupuesto = Number(globalThis.prompt('Introduce un presupuesto'))

  if (nuevoPresupuesto !== 0) {
    gp.actualizarPresupuesto(nuevoPresupuesto)
    repintar()
  }
}

/**
 * Borra el formulario más cercano que le llama y reactiva el botón pasado por parámetro
 * @param boton - Botón a reactivar al borrar el formulario
 */
function EventoCancelar (boton) {
  this.handleEvent = (event) => {
    const formulario = event.currentTarget.closest('form')

    boton.disabled = false

    // Forma 2 de eliminar formulario
    formulario.remove()
  }
}

/**
 * Crea un nuevo formulario para crear un gasto y lo añade a la lista de gastos
 */
function nuevoGastoWebFormulario () {
  const plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true)

  const botonAnyadirFormulario = document.getElementById('anyadirgasto-formulario')
  botonAnyadirFormulario.disabled = true

  document.getElementById('controlesprincipales').appendChild(plantillaFormulario)

  const formulario = document.body.querySelector('form')

  // EVENTO SUBMIT -> añade el gasto a la lista de gastos y vuelve a pintar la interfaz
  formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    const form = event.currentTarget

    const fDescripcion = form.elements.descripcion.value
    const fValor = Number(form.elements.valor.value)
    const fFecha = form.elements.fecha.value
    const fEtiquetas = form.elements.etiquetas.value.split(',')

    const gasto = new gp.CrearGasto(fDescripcion, fValor, fFecha, ...fEtiquetas)

    gp.anyadirGasto(gasto)

    repintar()

    botonAnyadirFormulario.disabled = false

    // Forma 1 de eliminar el formulario
    document.getElementById('controlesprincipales').removeChild(formulario)
  })

  // EVENTO CREAR GASTO API -> crea el gasto y lo envia a la api
  formulario
    .querySelector('.gasto-enviar-api')
    .addEventListener('click', enviarGastoApi)

  // EVENTO CANCELAR -> borra el formulario y reactiva el botón Añadir
  formulario.querySelector('button.cancelar').addEventListener('click', new EventoCancelar(botonAnyadirFormulario))
}

async function enviarGastoApi (e) {
  const usuario = document.getElementById('nombre_usuario').value

  const form = e.target.closest('form')

  const fDescripcion = form.elements.descripcion.value
  const fValor = Number(form.elements.valor.value)
  const fFecha = form.elements.fecha.value
  const fEtiquetas = form.elements.etiquetas.value.split(',')

  const gasto = new gp.CrearGasto(fDescripcion, fValor, fFecha, ...fEtiquetas)

  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }

  const response = await fetch(API_URL + usuario, {
    method: 'POST',
    body: JSON.stringify(gasto),
    headers: headersList
  })

  console.log(response)

  if (response.ok) { // si el HTTP-status es 200-299
    cargarGastosApi()
  } else {
    globalThis.alert('ErrorHTTP: ' + response.status)
  }
}

/**
 * Actualiza la visualización del presupuesto, gastos totales, balance total  y la lista
 * completa de gastos
 */
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

/**
 * Borrar el contenido de un elemento HTML
 * @param idElemento - ID del elemento HTML cuyo contenido se desea borrar.
 */
function borrarContenido (idElemento) {
  const elemento = document.getElementById(idElemento)
  elemento.innerHTML = ''
}

/**
 * Crea y agrega elementos HTML y eventos para mostrar el gasto
 * @param idElemento - ID del elemento donde se hará append del gasto
 * @param gasto - Gasto a representar
 */
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
  cGastoFecha.innerHTML = (gasto.fecha)
  cGasto.append(cGastoFecha)

  const cGastoValor = document.createElement('div')
  cGastoValor.classList.add('gasto-valor')
  cGastoValor.innerHTML = gasto.valor
  cGasto.append(cGastoValor)

  const cGastoEtiquetas = document.createElement('div')
  cGastoEtiquetas.classList.add('gasto-etiquetas')

  for (const etiqueta of gasto.etiquetas) {
    const objetoBorrarEtiqueta = new BorrarEtiquetasHandle(gasto, etiqueta)
    const cEtiqueta = document.createElement('span')
    cEtiqueta.addEventListener('click', objetoBorrarEtiqueta)
    cEtiqueta.classList.add('gasto-etiquetas-etiqueta')
    cEtiqueta.innerHTML = etiqueta
    cGastoEtiquetas.append(cEtiqueta)
  }

  cGasto.append(cGastoEtiquetas)

  // Botón editar gasto
  const objetoEditar = new EditarHandle(gasto)
  const bEditar = document.createElement('button')
  bEditar.addEventListener('click', objetoEditar)
  bEditar.classList.add('gasto-editar')
  bEditar.innerHTML = 'Editar'
  bEditar.type = 'button'
  cGasto.append(bEditar)

  // Botón borrar gasto
  const objetoBorrar = new BorrarHandle(gasto)
  const bBorrar = document.createElement('button')
  bBorrar.addEventListener('click', objetoBorrar)
  bBorrar.classList.add('gasto-borrar')
  bBorrar.innerHTML = 'Borrar'
  bBorrar.type = 'button'
  cGasto.append(bBorrar)

  // Botón borrar gasto API
  const objetoBorrarApi = new BorrarApiHandle(gasto)
  const bBorrarApi = document.createElement('button')
  bBorrarApi.addEventListener('click', objetoBorrarApi)
  bBorrarApi.classList.add('gasto-borrar-api')
  bBorrarApi.innerHTML = 'Borrar (API)'
  bBorrarApi.type = 'button'
  cGasto.append(bBorrarApi)

  // Botón editar gasto en formulario
  const objetoEditarFormulario = new EditarHandleFormulario(gasto)
  const bEditarFormulario = document.createElement('button')
  bEditarFormulario.addEventListener('click', objetoEditarFormulario)
  bEditarFormulario.classList.add('gasto-editar-formulario')
  bEditarFormulario.innerHTML = 'Editar (formulario)'
  bEditarFormulario.type = 'button'
  cGasto.append(bEditarFormulario)

  const elemento = document.getElementById(idElemento)
  elemento.append(cGasto)
}

/**
 * Actualiza el innerHTML del elemento con el ID dado para mostrar el valor.
 * @param idElemento - ID HTML donde desea mostrar el valor.
 * @param valor - Valor que desea mostrar
 */
function mostrarDatoEnID (idElemento, valor) {
  const elemento = document.getElementById(idElemento)
  elemento.innerHTML = ''
  elemento.append(valor)
}

/**
 * Crea y agrega elementos HTML para mostrar gastos agrupados por dia, mes o año
 * @param idElemento - Donde se mostrarán los gastos agrupados.
 * @param agrup - Objeto que contiene los gastos agrupados
 * @param periodo - Periodo de agrupación: dia, mes o año
 */
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

function filtrarGastosWeb (e) {
  e.preventDefault()

  // Recogemos datos del formulario
  const form = e.target

  const descripcionContiene = form.elements['formulario-filtrado-descripcion'].value
  const valorMinimo = form.elements['formulario-filtrado-valor-minimo'].value
  const valorMaximo = form.elements['formulario-filtrado-valor-maximo'].value
  const fechaDesde = form.elements['formulario-filtrado-fecha-desde'].value
  const fechaHasta = form.elements['formulario-filtrado-fecha-hasta'].value
  const etiquetasTiene = form.elements['formulario-filtrado-etiquetas-tiene'].value

  // Creamos filtro
  const objetoFiltro = {}

  if (descripcionContiene !== '') { objetoFiltro.descripcionContiene = descripcionContiene }
  if (valorMinimo !== '') { objetoFiltro.valorMinimo = valorMinimo }
  if (valorMaximo !== '') { objetoFiltro.valorMaximo = valorMaximo }
  if (fechaDesde !== '') { objetoFiltro.fechaDesde = fechaDesde }
  if (fechaHasta !== '') { objetoFiltro.fechaHasta = fechaHasta }
  if (etiquetasTiene !== '') { objetoFiltro.etiquetasTiene = gp.transformarListadoEtiquetas(etiquetasTiene) }

  // Filtramos
  const gastosFiltrados = gp.filtrarGastos(objetoFiltro)

  // Borramos la lista de gastos y mostramos sólo los filtrados
  document.getElementById('listado-gastos-completo').innerHTML = ''

  for (const gasto of gastosFiltrados) {
    mostrarGastoWeb('listado-gastos-completo', gasto)
  }
}

function guardarGastosWeb (e) {
  globalThis.localStorage.GestorGastosDWEC = JSON.stringify(gp.listarGastos())
}

function cargarGastosWeb (e) {
  const gMemoria = globalThis.localStorage.GestorGastosDWEC ?? '[]'
  const gastos = JSON.parse(gMemoria)

  gp.cargarGastos(gastos)

  repintar()
}

async function cargarGastosApi (e) {
  const usuario = document.getElementById('nombre_usuario').value

  const response = await fetch(API_URL + usuario)

  if (response.ok) { // si el HTTP-status es 200-299
    const json = await response.json()
    gp.cargarGastos(json)
    repintar()
  } else {
    globalThis.alert('ErrorHTTP: ' + response.status)
  }
}

export {
  actualizarPresupuestoWeb,
  nuevoGastoWebFormulario,
  EditarHandle,
  BorrarHandle,
  BorrarEtiquetasHandle,
  nuevoGastoWeb,
  repintar,
  mostrarDatoEnID,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  filtrarGastosWeb,
  guardarGastosWeb,
  cargarGastosWeb,
  cargarGastosApi,
  enviarGastoApi
}
