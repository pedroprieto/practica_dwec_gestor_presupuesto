import * as GesPrest from './gestionPresupuesto.js';

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

    // Crear botón para editar gastos
    const bEditar = document.createElement('button');
    bEditar.classList = 'gasto-editar'; 
    bEditar.innerHTML = 'Editar';
    bEditar.type = 'button';
    bEditar.addEventListener('click', new EditarHandle(gasto));

    // Agregar todos los elementos al divGasto
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
    divGasto.appendChild(bEditar); 


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
  const gastos = GesPrest.listarGastos();

  for (const gasto of gastos) {
    mostrarGastoWeb('listado-gastos-completo', gasto);
  }
}
//Evento click boton actualizarpresupuesto
const botonPresu = document.getElementById('actualizarpresupuesto')
botonPresu.addEventListener('click', ()=>{
    const presu = parseFloat(prompt('Introduce el presupuesto'));
    GesPrest.actualizarPresupuesto(presu);
    repintar();

})

//Evento botón añadir gasto
const botonGasto = document.getElementById('anyadirgasto');
botonGasto.addEventListener('click', nuevoGastoWeb);

function nuevoGastoWeb(){
  // Pedir al usuario la información del nuevo gasto
  const descripcion = prompt('Introduce la descripción del gasto:');
  const valor = Number(prompt('Introduce el valor del gasto:'));
  const fecha = prompt('Introduce la fecha del gasto (yyyy-mm-dd):');
  const etiquetasInput = prompt('Introduce las etiquetas del gasto separadas por comas:');
  // Divide la cadena etiquetasInput en un array utilizando la coma como delimitador,
  // utiliza map para aplicar trim() a cada elemento (elimina espacios en blanco al principio y al final)
  const etiquetas = etiquetasInput.split(',').map(etiqueta => etiqueta.trim());
  //Creación objeto gasto con la función constructora
  const gasto = new GesPrest.CrearGasto(descripcion, valor, fecha, ...etiquetas)
  GesPrest.anyadirGasto(gasto);

  repintar();
}

// Función constructora EditarHandle
function EditarHandle(gasto) {
  this.gasto = gasto; 

  // Método handleEvent de EditarHandle
  this.handleEvent = function () {
    // Pedir al usuario la información necesaria para editar el gasto
    const nuevaDescripcion = prompt('Introduce la nueva descripción:', this.gasto.descripcion);
    const nuevoValor = parseFloat(prompt('Introduce el nuevo valor:', this.gasto.valor));
    const nuevaFecha = prompt('Introduce la nueva fecha (formato yyyy-mm-dd):', this.gasto.fecha);
    const nuevasEtiquetasString = prompt('Introduce las nuevas etiquetas separadas por comas:', this.gasto.etiquetas.join(','));
    const nuevasEtiquetas = nuevasEtiquetasString.split(',');

    // Actualizar las propiedades del gasto
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(nuevasEtiquetas);

    repintar();
  };
}





export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
} 