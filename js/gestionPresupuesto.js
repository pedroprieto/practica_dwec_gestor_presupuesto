// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0
let gastos = []
let idGasto = 0

/* Función de 1 parámetro que se encargará de actualizar la variable global presupuesto.
Esta función comprobará que el
valor introducido es un número no negativo: en caso de que sea un dato válido, actualizará
la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error
por pantalla y devolverá el valor -1.
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

/*
Función sin parámetros que se encargará de devolver el texto siguiente: Tu presupuesto actual
es de X €, siendo X el valor de la variable global presupuesto.
*/
function mostrarPresupuesto () {
  return `Tu presupuesto actual es de ${presupuesto} €`
}

/*
Función constructora que se encargará de crear un objeto gasto.
Esta función devolverá un objeto de tipo gasto. Deberá comprobar que el valor introducido
sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
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

  this.actualizarDescripcion = (nuevaDescripcion) => {
    this.descripcion = nuevaDescripcion
  }

  this.actualizarValor = (nuevoValor) => {
    if (nuevoValor >= 0) this.valor = nuevoValor
  }

  this.mostrarGastoCompleto = () => {
    let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

    for (const etiqueta of this.etiquetas) {
      res += `- ${etiqueta}\n`
    }
    return res
  }

  this.actualizarFecha = (nuevaFecha) => {
    if (!isNaN(Date.parse(nuevaFecha))) this.fecha = Date.parse(nuevaFecha)
  }

  this.anyadirEtiquetas = (...etiquetasNuevas) => {
    const etiquetasCorregidas = etiquetasNuevas.filter(e => !this.etiquetas.includes(e))
    this.etiquetas.push(...etiquetasCorregidas)
  }

  this.borrarEtiquetas = (...etiquetasBorrar) => {
    for (const etiqueta of etiquetasBorrar) {
      this.etiquetas = Object.assign(this.etiquetas.filter(e => e !== etiqueta))
    }
  }

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

function anyadirGasto (gastoNuevo) {
  gastoNuevo.id = idGasto++
  gastos.push(gastoNuevo)
}

function borrarGasto (id) {
  gastos = Object.assign(gastos.filter(gasto => gasto.id !== id))
}

function calcularTotalGastos () {
  let total = 0
  for (const gasto of gastos) { total += gasto.valor }
  return total
}

function calcularBalance () {
  return presupuesto - calcularTotalGastos()
}

function agruparGastos () {

}

function filtrarGastos (o) {
  return gastos.filter(gasto => {
    if (o.fechaDesde) {
      const fechaDesde = new Date(o.fechaDesde)
      if (gasto.fecha <= fechaDesde) {
        return false
      }
    }

    if (o.fechaHasta) {
      const fechaHasta = new Date(o.fechaHasta)
      if (gasto.fecha >= fechaHasta) {
        return false
      }
    }

    if (o.valorMinimo !== undefined) {
      if (gasto.valor > o.valorMinimo) {
        return false
      }
    }

    if (o.valorMaximo !== undefined) {
      if (gasto.valor < o.valorMaximo) {
        return false
      }
    }

    if (o.descripcionContiene !== undefined) {
      return gasto.descripcion.includes(o.descripcionContiene)
    }

    // por defecto devuelve todo
    return true
  })
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
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
