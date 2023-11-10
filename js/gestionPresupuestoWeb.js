import * as GesPrest from './gestionPresupuesto.js'

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

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento 
//indicado una estructura HTML para el gasto que se pase como parámetro
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
    divValor.textContent = `${gasto.valor}`;

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

//Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento
//indicado una estructura HTML para el objeto agrup que se pase como parámetro:
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  // Buscar el elemento HTML por su ID
  const contenedor = document.getElementById(idElemento);   
  
  if (contenedor){
    // Crear un div con la clase "agrupacion"
    const divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    // Crear un título h1 basado en el período
    const h1Titulo = document.createElement("h1");
    h1Titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Titulo);

    // Recorrer las propiedades del objeto agrup
    for (const clave in agrup) {
      //Verificamos que el objeto tiene la propiedad
      if (agrup.hasOwnProperty(clave)) {
        // Crear un div con la clase "agrupacion-dato"
        const divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        // Crear spans para clave y valor
        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave + " - ";

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = agrup[clave].toFixed(2); //Formateo para que aparezcan dos decimales

        // Agregar spans al divDato
        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);

        // Agregar divDato al divAgrupacion
        divAgrupacion.appendChild(divDato);
      }
    }

    // Agregar divAgrupacion al contenedor
    contenedor.appendChild(divAgrupacion);
}
  else {
    console.error("Elemento no encontrado.");
  }

}
//Función que vuelve a crear toda la estructura HTML y refleja los cambios realizados
function repintar(){
  //Mostrar el presupuesto en div#presupuesto
  mostrarDatoEnId('presupuesto', GesPrest.mostrarPresupuesto())

  //Mostrar los gastos totales en div#gastos-totales 
  mostrarDatoEnId('gastos-totales', GesPrest.calcularTotalGastos())

  //Mostrar el balance total en div#balance-total
  mostrarDatoEnId('balance-total', GesPrest.calcularBalance())

  //Borrar el contenido de div#listado-gastos-completo
  const listadoGastosCompleto = document.getElementById('listado-gastos-completo');
  listadoGastosCompleto.innerHTML = '';

  //Mostrar el listado completo de gastos en div#listado-gastos-completo
  mostrarGastoWeb('listadoGastosCompleto', GesPrest.listarGastos())
}

export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
} 