// Funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0
let gastos = []
let idGasto = 0

// Función que actualiza el presupuesto y devuelve el nuevo valor comprobando que sea un número válido
function actualizarPresupuesto(nuevoPresupuesto) {
	if (nuevoPresupuesto >= 0 && !isNaN(nuevoPresupuesto)) {
		return (presupuesto = nuevoPresupuesto)
	} else {
		return -1
	}
}

// Función que devuelve el presupuesto actual
function mostrarPresupuesto() {
	return "Tu presupuesto actual es de " + presupuesto + " €"
}

// Función constructora de objetos Gasto que recibe una descripción, un valor, una fecha y una lista de etiquetas
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
	this.descripcion = descripcion

	if (valor > 0 && !isNaN(valor)) {
		this.valor = valor
	} else {
		this.valor = 0
	}

	this.mostrarGasto = function () {
		return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €"
	}

	this.actualizarDescripcion = function (nuevaDescripcion) {
		this.descripcion = nuevaDescripcion
	}

	this.actualizarValor = function (nuevoValor) {
		if (nuevoValor > 0 && !isNaN(nuevoValor)) {
			this.valor = nuevoValor
		}
	}

	// Transformamos la fecha con Date.parse para pasarla de string a timestamp
	fecha = Date.parse(fecha)

	// Comprobamos que la fecha sea válida, si no lo es, asignamos la fecha actual
	if (isNaN(fecha)) {
		this.fecha = Date.now()
	} else {
		this.fecha = fecha
	}

	// Función que actualiza la propiedad fecha recibiendo una fecha en formato string.
	this.actualizarFecha = function (nuevaFecha) {
		nuevaFecha = Date.parse(nuevaFecha)
		if (!isNaN(nuevaFecha)) {
			this.fecha = nuevaFecha
		}
	}

	// Inicializamos el array de etiquetas
	this.etiquetas = []
	// Añadimos las etiquetas recibidas como parámetro al array de etiquetas
	this.etiquetas = etiquetas

	// Función que recibe un número indeterminado de etiquetas y las añade al array de etiquetas del objeto comprobando que no estén duplicadas
	this.anyadirEtiquetas = function (...etiquetas) {
		for (let i = 0; i < etiquetas.length; i++) {
			const etiqueta = etiquetas[i]
			if (!this.etiquetas.includes(etiqueta)) {
				this.etiquetas.push(etiqueta)
			}
		}
	}

	// Función que recibe un número indeterminado de etiquetas y las elimina (si existen) de la propiedad etiquetas del objeto
	this.borrarEtiquetas = function (...etiquetas) {
		for (let i = 0; i < etiquetas.length; i++) {
			const etiqueta = etiquetas[i]
			const index = this.etiquetas.indexOf(etiqueta)
			if (index !== -1) {
				this.etiquetas.splice(index, 1)
			}
		}
	}

	// Función que devuelve un texto detallando las características de un gasto
	this.mostrarGastoCompleto = function () {
		let texto = ""
		const fechaString = new Date(this.fecha).toLocaleString()
		texto = this.mostrarGasto() + ".\nFecha: " + fechaString + "\nEtiquetas:\n"
		for (let i = 0; i < this.etiquetas.length; i++) {
			const etiqueta = this.etiquetas[i]
			texto += "- " + etiqueta + "\n"
		}
		return texto
	}

	this.obtenerPeriodoAgrupacion = function (periodo) {
		let fechaFormateada
		const fechaISO = new Date(this.fecha).toISOString()

		if (periodo === "dia") {
			fechaFormateada = fechaISO.slice(0, 10)
		} else if (periodo === "mes") {
			fechaFormateada = fechaISO.slice(0, 7)
		} else if (periodo === "anyo") {
			fechaFormateada = fechaISO.slice(0, 4)
		} else {
			return "Período no válido"
		}
		return fechaFormateada
	}
}

// Función sin parámetros que devolverá la variable global gastos
function listarGastos() {
	return gastos
}
// Función que recibe un objeto Gasto y le añade una propiedad id cuyo valor será el valor actual de la variable global idGasto
function anyadirGasto(gasto) {
	gasto.id = idGasto
	idGasto++
	gastos.push(gasto)
}

// Función que recibe un id y elimina el gasto asociado del array 'gastos'
function borrarGasto(id) {
	let i = 0
	while (i < gastos.length) {
		if (gastos[i].id == id) {
			gastos.splice(i, 1)
		} else {
			i++
		}
	}
}

// Función que devuelve la suma de los valores de todos los gastos del array 'gastos' usando el método reduce con una función flecha como callback
function calcularTotalGastos() {
	const totalGastos = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0)
	return totalGastos
}

// Función que devuelve la diferencia entre el presupuesto y el gasto total usando 'calcularTotalGastos'
function calcularBalance() {
	const totalBalance = presupuesto - calcularTotalGastos()
	return totalBalance
}

// Función que recibe un objeto con filtros y devuelve un array con los gastos filtrados
function filtrarGastos(filtros) {
	// Creamos una copia del array de gastos para no modificar el original
	let gastosFiltrados = gastos

	// Si el parámetro tiene una propiedad fechaDesde, filtramos los gastos que tengan una fecha mayor o igual a la fecha indicada
	if (filtros.fechaDesde) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.fecha >= Date.parse(filtros.fechaDesde))
	}

	// Si el parámetro tiene una propiedad fechaHasta, filtramos los gastos que tengan una fecha menor o igual a la fecha indicada
	if (filtros.fechaHasta) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.fecha <= Date.parse(filtros.fechaHasta))
	}

	// Si el parámetro tiene una propiedad valorMinimo, filtramos los gastos que tengan un valor mayor o igual al valor indicado
	if (filtros.valorMinimo) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.valor >= filtros.valorMinimo)
	}

	// Si el parámetro tiene una propiedad valorMaximo, filtramos los gastos que tengan un valor menor o igual al valor indicado
	if (filtros.valorMaximo) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.valor <= filtros.valorMaximo)
	}

	//
	if (filtros.descripcionContiene) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase()))
	}

	// Si el parámetro tiene una propiedad etiquetasTiene, filtramos los gastos que tengan al menos una de las etiquetas indicadas
	if (filtros.etiquetasTiene) {
		gastosFiltrados = gastosFiltrados.filter((gasto) => {
			let etiquetasCoincidentes = 0
			for (let i = 0; i < filtros.etiquetasTiene.length; i++) {
				const etiqueta = filtros.etiquetasTiene[i]
				if (gasto.etiquetas.includes(etiqueta)) {
					etiquetasCoincidentes++
				}
			}
			if (etiquetasCoincidentes > 0) {
				return true
			} else {
				return false
			}
		})
	}

	return gastosFiltrados
}

function agruparGastos() {}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, filtrarGastos, agruparGastos }
