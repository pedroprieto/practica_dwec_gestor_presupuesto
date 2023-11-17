import * as gestionPresupuesto from "./gestionPresupuesto.js"

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
	return (document.getElementById(idElemento).innerText = valor)
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
	// Creamos una variable que hará referencia al elemento HTML donde se insertará el resultado
	let contenedor = document.getElementById(idElemento)

	// Creamos un div con la clase gasto y lo añadimos al contenedor
	let divGasto = document.createElement("div")
	divGasto.classList.add("gasto")
	contenedor.appendChild(divGasto)

	// Creamos un div con la clase gasto-descripcion y lo añadimos al div gasto
	let divDescripcion = document.createElement("div")
	divDescripcion.classList.add("gasto-descripcion")
	divDescripcion.textContent = "DESCRIPCIÓN DEL GASTO :" + gasto.descripcion
	divGasto.appendChild(divDescripcion)

	// Creamos un div con la clase gasto-fecha y lo añadimos al div gasto
	let divFecha = document.createElement("div")
	divFecha.classList.add("gasto-fecha")
	let fecha = new Date(gasto.fecha).toLocaleDateString() // parse de timestamp a fecha corta
	divFecha.textContent = "FECHA DEL GASTO: " + fecha
	divGasto.appendChild(divFecha)

	// Creamos un div con la clase gasto-valor y lo añadimos al div gasto
	let divValor = document.createElement("div")
	divValor.classList.add("gasto-valor")
	divValor.textContent = "VALOR DEL GASTO :" + gasto.valor
	divGasto.appendChild(divValor)

	// Creamos un div con la clase gasto-etiquetas y lo añadimos al div gasto
	let divEtiquetas = document.createElement("div")
	divEtiquetas.classList.add("gasto-etiquetas")
	divGasto.appendChild(divEtiquetas)

	// Creamos un span con la clase gasto-etiquetas-etiqueta por cada etiqueta del gasto y lo añadimos al div gasto-etiquetas
	for (let etiqueta of gasto.etiquetas) {
		let spanEtiquetas = document.createElement("span")
		spanEtiquetas.classList.add("gasto-etiquetas-etiqueta")
		spanEtiquetas.textContent = "Etiqueta :" + etiqueta
		divEtiquetas.appendChild(spanEtiquetas)
	}
	// Agregamos al contenedor el div gasto creado con todos sus elementos
	contenedor.appendChild(divGasto)
}

// Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro
function mostrarGastosAgrupadosWeb(idElemento, periodo, agrup) {
	// Creamos una variable que hará referencia al elemento HTML donde se insertará el resultado
	let contenedor = document.createElement("div")
	contenedor.classList.add("agrupacion")

	// Creamos un h1 con el texto "Gastos agrupados por Periodo" y lo añadimos al contenedor
	let h1 = document.createElement("h1")
	h1.textContent = "Gastos agrupados por " + periodo
	contenedor.appendChild(h1)

	// Para cada dato del objeto agrup se crea un div
	for (let a of Object.keys(agrup)) {
		// Creamos un div con la clase agrupacion-dato y lo añadimos al contenedor
		let divAgrupacion = document.createElement("div")
		divAgrupacion.classList.add("agrupacion-dato")

		// Creamos un span con la clase agrupacion-dato-clave
		let spanPropiedad = document.createElement("span")
		spanPropiedad.classList.add("agrupacion-dato-clave")
		// El texto del span será la propiedad del objeto agrup
		spanPropiedad.textContent = a
		// Agregamos al div agrupacion el span agrupacion-dato-clave
		divAgrupacion.appendChild(spanPropiedad)

		// Creamos un span con la clase agrupacion-dato-valor
		let spanValor = document.createElement("span")
		spanValor.classList.add("agrupacion-dato-valor")
		// El texto del span será el valor de la propiedad del objeto agrup que se accede con agrup[a]
		spanValor.textContent = agrup[a]
		// Agregamos al div agrupacion el span agrupacion-dato-valor
		divAgrupacion.appendChild(spanValor)

		// Agregamos al contenedor el div agrupacion creado con todos sus elementos
		contenedor.appendChild(divAgrupacion)
	}

	// Agregamos al elemento deseado el contenedor creado con todos sus elementos
	let elemento = document.getElementById(idElemento)
	elemento.appendChild(contenedor)
}

// Función repintar que vuelve a crear toda la estructura HTML, reflejando los cambios en el modelo de datos
function repintar() {
	// Mostramos el presupuesto en div#presupuesto
	let presupuesto = gestionPresupuesto.mostrarPresupuesto()
	mostrarDatoEnId("presupuesto", presupuesto)

	// Mostramos los gastos totales en div#gastos-totales
	let gastosTotales = gestionPresupuesto.calcularTotalGastos()
	mostrarDatoEnId("gastos-totales", gastosTotales)

	// Mostramos el balance total en div#balance-total
	let balanceTotal = gestionPresupuesto.calcularBalance()
	mostrarDatoEnId("balance-total", balanceTotal)

	// Borramos el contenido de div#listado-gastos-completo usando innetHTML
	let listadoGastosCompleto = document.getElementById("listado-gastos-completo")
	listadoGastosCompleto.innerHTML = ""

	// Mostramos el listado completo de gastos en div#listado-gastos-completo
	let listaGastos = gestionPresupuesto.listarGastos()
	mostrarGastoWeb("listado-gastos-completo", listaGastos)
}

// Función nuevoGastoWeb manejadora de eventos del botón 'actualizarpresupuesto'
function actualizarPresupuestoWeb() {
	// Recogemos el valor del nuevo presupuesto con un prompt
	let presupuesto = prompt("Introduce el nuevo presupuesto", 0)

	// Transformamos la variable presupuesto de string a número
	presupuesto = parseInt(presupuesto)

	// Actualizamos el presupuesto con el nuevo valor
	gestionPresupuesto.actualizarPresupuesto(presupuesto)

	// Llamos a la función repintar para mostrar la información actualizada en el HTML
	repintar()
}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb, actualizarPresupuestoWeb }
