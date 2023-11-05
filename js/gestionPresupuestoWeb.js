//Función de dos parámetros que se encargará de escribir el valor (texto)
//en el elemento HTML con id idElemento indicado
function mostrarDatoEnId(idElemento, valor){
  // Buscar el elemento HTML por su ID
  const elemento = document.getElementById(idElemento);

  // Verificar si se encontró el elemento
  if (elemento) {
    // Asignar el valor al contenido del elemento
    elemento.textContent = valor;
  } 
  else {
    console.error("Elemento no encontrado.");
  }
}

function mostrarGastoWeb(idElemento, gasto){
  // Buscar el elemento HTML por su ID
  const contenedor = document.getElementById(idElemento);   
  
  if (contenedor){
    // Crear un elemento div con la clase "gasto"
    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    // Crear elementos div para descripción, fecha y valor del gasto
    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;

    const divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    const fechaFormateada = new Date(gasto.fecha).toLocaleString();
    divFecha.textContent = fechaFormateada;

    const divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = `${gasto.valor} €`;

    // Crear un elemento div con la clase "gasto-etiquetas" para las etiquetas del gasto
    const divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    // Recorrer las etiquetas y crear elementos span para cada una
    for (const etiqueta of gasto.etiquetas) {
        const spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.appendChild(spanEtiqueta);
    }

    // Agregar todos los elementos al divGasto
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);

    // Agregar el divGasto al contenedor
    contenedor.appendChild(divGasto);
    }
    else {
      console.error("Elemento no encontrado.");
    }
  
}