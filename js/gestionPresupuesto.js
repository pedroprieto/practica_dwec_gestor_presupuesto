// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0

/* Función de 1 parámetro que se encargará de actualizar la variable global presupuesto.
Esta función comprobará que el
valor introducido es un número no negativo: en caso de que sea un dato válido, actualizará
la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error
por pantalla y devolverá el valor -1.
*/
function actualizarPresupuesto (nuevoPresupuesto) {
  const presupuestoProvisional = presupuesto - nuevoPresupuesto

  if (presupuestoProvisional >= 0) {
    presupuesto = presupuestoProvisional
    return presupuestoProvisional
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
function CrearGasto (valor, descripcion) {
  this.valor = valor >= 0 ? valor : 0
  this.descripcion = descripcion
  this.mostrarGasto = () => {
    console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor}€`)
  }
  this.actualizarDescripcion = (nuevaDescripcion) => {
    this.descripcion = nuevaDescripcion
  }
  this.actualizarValor = (nuevoValor) => {
    if (nuevoValor >= 0) this.valor = nuevoValor
  }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto
}
