
function mostrarDatoEnId(idElemento, valor){
  // Buscar el elemento HTML por su ID
  const elemento = document.getElementById(idElemento);

  // Verificar si se encontró el elemento
  if (elemento) {
    // Asignar el valor al contenido del elemento
    elemento.textContent = valor;
  } else {
    console.error(`Elemento no encontrado.`);
  }
}