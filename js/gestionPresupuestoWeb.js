// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
// idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

/*
function mostrarDatoEnId(idElemento, valor) {
	let elemento = document.getElementById(idElemento)
	elemento.innerText = valor
}

//
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
	// Usamos for of
    // La consola marca gestionPresupuestoWeb.js:47 Uncaught TypeError: gasto.etiquetas is not iterable
    // Hipótesis: gasto.etiquetas no es un array
    // Comprobamos en gestionPresupuesto.js y vemos que sí es un array
    // Hipótesis: el problema está en la función mostrarGastoWeb
    // Comprobamos en gestionPresupuestoWeb.js y vemos que el problema está en la línea 47
	for (const etiqueta of gasto.etiquetas) {
		let spanEtiqueta = document.createElement("span")
		spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
		spanEtiqueta.textContent = etiqueta
		divEtiquetas.appendChild(spanEtiqueta)
	}

	// Agregamos al contenedor el div gasto creado con todos sus elementos
	contenedor.appendChild(divGasto)
}

 */

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

export { mostrarDatoEnId, mostrarGastoWeb }
