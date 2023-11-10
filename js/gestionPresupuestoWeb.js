// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
// idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

//
function mostrarDatoEnId(idElemento, valor) {
	let elemento = document.getElementById(idElemento)
	elemento.innerText = valor
}

export { mostrarDatoEnId }
