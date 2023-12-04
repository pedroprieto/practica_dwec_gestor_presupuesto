let presupuesto = 0
let gastos = []
let idGasto = 0

/**
 * Actualiza el presupuesto con un nuevo valor, pero devuelve -1 y
 * registra un mensaje de error si el nuevo presupuesto es negativo.
 * @param nuevoPresupuesto - El parámetro "nuevoPresupuesto" representa el nuevo valor del presupuesto
 * que se desea actualizar.
 * @returns el valor actualizado del presupuesto si el nuevo valor del presupuesto es
 * mayor o igual a 0. Si el nuevo valor del presupuesto es negativo, devuelve -1 y un mensaje
 * de error.
 */
function actualizarPresupuesto (nuevoPresupuesto) {
  if (nuevoPresupuesto >= 0) {
    presupuesto = nuevoPresupuesto
    return presupuesto
  } else {
    console.error('El presupuesto no puede ser negativo')
    return -1
  }
}

/**
 * Devuelve una cadena que muestra el presupuesto actual.
 * @returns una cadena que incluye el importe del presupuesto actual.
 */
function mostrarPresupuesto () {
  return `Tu presupuesto actual es de ${presupuesto} €`
}

/**
 * Función constructora en JavaScript que crea un objeto que representa
 * un gasto con varias propiedades y métodos.
 * @param descripcion - Una cadena que describe el gasto.
 * @param valor - Valor o importe del gasto. Debe ser un número y
 * puede ser positivo o negativo. Si se proporciona un valor negativo, se convertirá a 0.
 * @param fecha - Se puede proporcionar en cualquier formato que
 * pueda analizarse mediante el método JavaScript Date.parse(). Si no se
 * proporciona una fecha válida, se utilizará la fecha actual.
 * @param etiquetas - Array que representa las etiquetas o etiquetas
 * asociadas al gasto. Es un parámetro opcional.
 */
function CrearGasto (descripcion, valor, fecha, ...etiquetas) {
  this.descripcion = descripcion
  this.valor = valor >= 0 ? valor : 0
  // valido la fecha: primero intento date parse y si da un numero es el numero de milisegundos, si da NaN ha fallado al parear a fecha
  this.fecha = !isNaN(Date.parse(fecha)) ? Date.parse(fecha) : Date.now()
  this.etiquetas = etiquetas ?? []

  this.mostrarGasto = () => {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
  }

  /**
   *  Muestra las etiquetas separadas por comas
   * @returns {string} etiquetas separadas por coma
   */
  this.mostrarEtiquetas = () => {
    let salida = ''

    for (const etiqueta of this.etiquetas) { salida += `${etiqueta},` }

    return salida.slice(0, salida.length - 1)
  }

  /**
   *  Actualiza la descripcion por la del argumento de entrada
   * @param {string} nuevaDescripcion
   */
  this.actualizarDescripcion = (nuevaDescripcion) => {
    this.descripcion = nuevaDescripcion
  }

  /**
   * Actualiza el valor por el del argumento de entrada
   * @param {number} nuevoValor
   */
  this.actualizarValor = (nuevoValor) => {
    if (nuevoValor >= 0) this.valor = nuevoValor
  }

  /**
   * Devuelve el gasto y toda su info en modo texto
   * @returns {string} Gasto en modo string
   */
  this.mostrarGastoCompleto = () => {
    let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

    for (const etiqueta of this.etiquetas) {
      res += `- ${etiqueta}\n`
    }
    return res
  }

  /**
   * Actualiza la fecha por la del argumento de entrada
   * @param {Date} nuevaFecha
   */
  this.actualizarFecha = (nuevaFecha) => {
    if (!isNaN(Date.parse(nuevaFecha))) this.fecha = Date.parse(nuevaFecha)
  }

  /**
   * Anyade las etiquetas argumento de entrada
   * @param  {...string} etiquetasNuevas
   */
  this.anyadirEtiquetas = (...etiquetasNuevas) => {
    const etiquetasCorregidas = etiquetasNuevas.filter(e => !this.etiquetas.includes(e))
    this.etiquetas.push(...etiquetasCorregidas)
  }

  /**
   * Borra las etiquetas del argumento de entrada
   * @param  {...string} etiquetasBorrar
   */
  this.borrarEtiquetas = (...etiquetasBorrar) => {
    for (const etiqueta of etiquetasBorrar) {
      this.etiquetas = this.etiquetas.filter(e => e !== etiqueta)
    }
  }

  /**
 * Obtiene el periodo de agrupación según el parámetro proporcionado.
 * @param {string} periodo - El periodo de agrupación ('dia', 'mes' o 'anyo').
 * @returns {string} - La fecha en el formato correspondiente al periodo.
 */
  this.obtenerPeriodoAgrupacion = (periodo) => {
    const f = new Date(this.fecha)
    const year = f.getFullYear()
    const month = String(f.getMonth() + 1).padStart(2, '0')
    const day = String(f.getDate()).padStart(2, '0')

    if (periodo === 'dia') {
      return `${year}-${month}-${day}`
    } else if (periodo === 'mes') {
      return `${year}-${month}`
    } else if (periodo === 'anyo') {
      return `${year}`
    }
  }
}

function listarGastos () {
  return gastos
}

/**
 * Agrega un nuevo gasto a una serie de gastos y le asigna una identificación
 * @param gastoNuevo - Gasto que debe agregarse a la lista de gastos
 */
function anyadirGasto (gastoNuevo) {
  gastoNuevo.id = idGasto++
  gastos.push(gastoNuevo)
}

/**
 * Elimina un gasto específico según su ID.
 * @param id - Identificador del gasto que debe eliminarse.
 */
function borrarGasto (id) {
  gastos = (gastos.filter(gasto => gasto.id !== id))
}

/**
 * Calcula el valor total de los gastos.
 * @returns el valor total de todos los gastos.
 */
function calcularTotalGastos () {
  let total = 0
  for (const gasto of gastos) { total += gasto.valor }
  return total
}

/**
 * LClcula el saldo restante
 * @returns el saldo, que se calcula restando los gastos totales del presupuesto.
 */
function calcularBalance () {
  const balance = presupuesto - calcularTotalGastos()
  return balance
}

/**
 * Toma un período, una lista de etiquetas, una fecha de inicio o una fecha
 * de finalización, y devuelve los gastos totales agrupados.
 * @param periodo - Periodo de tiempo para agrupar los
 * gastos. Tiene un valor predeterminado de 'mes', pero puedes proporcionar otros valores como
 * 'semana' o 'anyo
 * @param etiquetas - Filtrar los gastos según estas etiquetas.
 * @param fechaDesde - La fecha de inicio para filtrar los gastos.
 * @param fechaHasta - La fecha de finalización del periodo de filtrado de gastos.
 * @returns Objeto que representa los gastos agrupados.
 */
function agruparGastos (periodo = 'mes', etiquetas = [], fechaDesde, fechaHasta) {
  let resultado = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene: etiquetas })

  resultado = resultado.reduce((acc, cur) => {
    const periodoAgrupacion = cur.obtenerPeriodoAgrupacion(periodo)

    if (!(periodoAgrupacion in acc)) {
      acc[periodoAgrupacion] = 0
    }

    acc[periodoAgrupacion] += cur.valor
    return acc
  }, {})

  return resultado
}

/**
 * Filtra una serie de gastos basándose en los criterios especificados en
 * el objeto `filtros`.
 * @param filtros - Las posibles propiedades del objeto `filtros` son: ´fechaDesde´, ´fechaHasta´, ´valorMinimo´, ´valorMaximo´, ´etiquetasTiene´ y ´descripcionContiene´
 * @returns  Array filtrado de `gastos` basado en los `filtros`
 * proporcionados.
 */
function filtrarGastos (filtros) {
  let resultado = [...gastos]

  // filter se queda con lo que coincide, por lo que devuelve true si no se añaden filtros o si coincide
  resultado = resultado.filter(gasto => {
    if ('fechaDesde' in filtros && filtros.fechaDesde !== undefined) {
      const fechaDesde = Date.parse(filtros.fechaDesde)
      if (gasto.fecha < fechaDesde) return false
    }

    if ('fechaHasta' in filtros && filtros.fechaHasta !== undefined) {
      const fechaHasta = Date.parse(filtros.fechaHasta)
      if (gasto.fecha > fechaHasta) return false
    }

    if ('valorMinimo' in filtros && filtros.valorMinimo !== undefined) {
      if (gasto.valor < filtros.valorMinimo) return false
    }

    if ('valorMaximo' in filtros && filtros.valorMaximo !== undefined) {
      if (gasto.valor > filtros.valorMaximo) return false
    }

    if ('descripcionContiene' in filtros && filtros.descripcionContiene !== undefined) {
      if (!gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
        return false
      }
    }

    if ('etiquetasTiene' in filtros && filtros.etiquetasTiene.length !== 0) {
      if (!filtros.etiquetasTiene.some(etiqueta => gasto.etiquetas.includes(etiqueta.toLowerCase()))) {
        return false
      }
    }

    return true
  })

  return resultado
}

/**
 * Transforma una lista de etiquetas en un array de etiquetas. *
 * @param {string} cadenaEtiquetas - Etiquetas separadas por ~,~, ., :, ; y espacio
 * @returns {string[]} - Array de etiquetas.
 */
function transformarListadoEtiquetas (cadenaEtiquetas) {
  const separadores = /[~.:;, ]+/

  const arrayEtiquetas = cadenaEtiquetas.split(separadores)

  return arrayEtiquetas
}

function cargarGastos () {
  // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  transformarListadoEtiquetas,
  cargarGastos,
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance,
  agruparGastos,
  filtrarGastos

}
