import * as GesPrest from './gestionPresupuesto.js';

const btnAnyadir = document.getElementById('anyadirgasto-formulario');
const controlesPrincipales = document.getElementById('controlesprincipales');
const botonPresu = document.getElementById('actualizarpresupuesto');
const botonGasto = document.getElementById('anyadirgasto');

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
    const fechaFormateada = new Date(gasto.fecha).toISOString().split('T')[0];
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

  // Crear una instancia de BorrarEtiquetasHandle y asignar el manejador de eventos al span
  const borrarEtiquetaHandler = new BorrarEtiquetasHandle(gasto, etiqueta);

  // Utilizar una función de flecha para mantener el contexto de 'this'
  spanEtiqueta.addEventListener('click', () => borrarEtiquetaHandler.handleEvent());
}

    // Crear botón para editar gastos
    const bEditar = document.createElement('button');
    bEditar.classList = 'gasto-editar'; 
    bEditar.innerHTML = 'Editar';
    bEditar.type = 'button';
    bEditar.addEventListener('click', new EditarHandle(gasto));

    // Crear botón para borrar gastos
    const bBorrar = document.createElement('button');
    bBorrar.classList = 'gasto-borrar'; 
    bBorrar.innerHTML = 'Borrar';
    bBorrar.type = 'button';
    bBorrar.addEventListener('click', new BorrarHandle(gasto));

    // Crear botón para editar gastos (formulario)
    const bEditarForm = document.createElement('button');
    bEditarForm.classList = 'gasto-editar-formulario';
    bEditarForm.innerHTML = 'Editar (form)';
    bEditarForm.type = 'button';
    bEditarForm.addEventListener('click', new EditarHandleformulario(gasto, divGasto))

    // Agregar todos los elementos al divGasto
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
    divGasto.appendChild(bEditar); 
    divGasto.appendChild(bBorrar);
    divGasto.appendChild(bEditarForm);
    


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
botonPresu.addEventListener('click', ()=>{
    const presu = parseFloat(prompt('Introduce el presupuesto'));
    GesPrest.actualizarPresupuesto(presu);
    repintar();

})

//Evento botón añadir gasto
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

// Función constructora BorrarHandle
function BorrarHandle(gasto) {
  this.gasto = gasto;

  // Método handleEvent de BorrarHandle
  this.handleEvent = function(){
    // Borrar el gasto asociado
    GesPrest.borrarGasto(this.gasto.id)

    repintar();
  };
}

// Función constructora BorrarEtiquetasHandle
function BorrarEtiquetasHandle(gasto, etiqueta){
  this.gasto = gasto;
  this.etiqueta = etiqueta;

  this.handleEvent = function(){
    this.gasto.borrarEtiquetas(this.etiqueta)

    repintar();
  }

}

// Función constructora CancelarHandle, se le pasa el botón a desactivar
function CancelarHandle(form, btn) {

  this.form = form;
  this.btn = btn;
  
  
  // Método handleEvent de la función CancelarHandle
  this.handleEvent = function(){ 

      // Borrar contenido del form
      this.form.remove();

      // Habilitar botón
      btn.removeAttribute('disabled')
     
  };
}

// Objeto manejador de eventos para editar un gasto a través de un formulario
function EditarHandleformulario(gasto, divGasto) {
  this.gasto = gasto;
  this.divGasto = divGasto;

  this.handleEvent = function () {
    // Clonar la plantilla del formulario
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    // Obtener el formulario del fragmento clonado
    let formulario = plantillaFormulario.querySelector("form");

    // Añadir el fragmento de documento al final del <div>
    this.divGasto.appendChild(plantillaFormulario);

    // Deshabilitar boton de anyadir gasto al formulario
    btnAnyadir.disabled = true;

    // Rellenar formulario
    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().split('T')[0];
    formulario.elements.etiquetas.value = this.gasto.etiquetas;

    // Accedemos y deshabilitamos bontón de editar formulario
    const btnEditForm = divGasto.querySelector("button.gasto-editar-formulario");
    btnEditForm.disabled = true;

    // Accedemos y añadimos evento click al botón cancelar
    const btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener('click', new CancelarHandle(formulario, btnEditForm));
   

    // Evento submit del formulario
    formulario.addEventListener('submit', new SubmitHandler(gasto));
        
    };
}

// Objeto manejador del evento submit
function SubmitHandler(gasto){

  this.gasto = gasto;
  
  this.handleEvent = function (event) {
      // Evitar que el formulario se envíe de forma predeterminada
      event.preventDefault();
      // Acceder al formulario actual (el que disparó el evento submit)
      const form = event.currentTarget;

      // Acceder a los valores del formulario
      const descripcion = form.elements.descripcion.value;
      const valor = Number(form.elements.valor.value);
      let fecha = form.elements.fecha.value;
      const etiquetasRaw = form.elements.etiquetas.value;
      const etiquetas = etiquetasRaw.split(',').map(etiqueta => etiqueta.trim());

      // Actualizar valores del objeto gasto
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarValor(valor);
      this.gasto.actualizarFecha(fecha);
      this.gasto.borrarEtiquetas();
      this.gasto.anyadirEtiquetas(...etiquetas);


      repintar();

      btnAnyadir.removeAttribute('disabled'); // Otra opción: btnAnyadir.disabled = false;

  }
  
}

btnAnyadir.addEventListener('click', nuevoGastoWebFormulario)


function nuevoGastoWebFormulario(){

  // Clonar la plantilla del formulario
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  // Obtener el formulario del fragmento clonado
  let formulario = plantillaFormulario.querySelector("form");

  // Añadir el fragmento de documento al final del <div>
  controlesPrincipales.appendChild(plantillaFormulario);

  // Deshabilitar boton de anyadir gasto al formulario
  btnAnyadir.disabled = true;

    
   // Crear un manejador de evento para el evento submit del formulario
  formulario.addEventListener('submit', function (event) {
    
      // Evitar que el formulario se envíe de forma predeterminada
      event.preventDefault();
      // Acceder al formulario actual (el que disparó el evento submit)
      const form = event.currentTarget;

      
      // Acceder a los valores del formulario
      const descripcion = form.elements.descripcion.value;
      const valor = Number(form.elements.valor.value);
      const fecha = form.elements.fecha.value;
      const etiquetas = form.elements.etiquetas.value;

      const gasto = new GesPrest.CrearGasto(descripcion, valor, fecha, etiquetas);
      GesPrest.anyadirGasto(gasto);


      repintar();
      
      btnAnyadir.removeAttribute('disabled');//Otra opción: btnAnyadir.disabled = false;


    })
    const btnCancelar = formulario.querySelector("button.cancelar")
    btnCancelar.addEventListener('click', new CancelarHandle(formulario, btnAnyadir));

}
const formFiltrado = document.getElementById("formulario-filtrado");

function filtrarGastosWeb(){
  
  this.handleEvent = function(event) {
  
    event.preventDefault();

  const form = event.currentTarget;

  let descripcionContiene = form.elements["formulario-filtrado-descripcion"].value;
  let valorMinimo = Number(form.elements["formulario-filtrado-valor-minimo"].value);
  let valorMaximo = Number(form.elements["formulario-filtrado-valor-maximo"].value);
  let fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
  let fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
  let etiquetasTiene = form.elements['formulario-filtrado-etiquetas-tiene'].value;
  // Si el campo formulario-filtrado-etiquetas-tiene tiene datos, llamar a transformarListadoEtiquetas
  if (etiquetasTiene) {
    etiquetasTiene = GesPrest.transformarListadoEtiquetas(etiquetasTiene);
  } else {
    etiquetasTiene = undefined;
  }
  // Construir el objeto con los parámetros necesarios
  const filtros = {
    descripcionContiene,
    valorMinimo,
    valorMaximo,
    fechaDesde,
    fechaHasta,
    etiquetasTiene,
  };

  document.getElementById('listado-gastos-completo').innerHTML = "";

  // Llamar a la función filtrarGastos con los filtros
  const gastosFiltrados = GesPrest.filtrarGastos(filtros);

  // Actualizar la lista de gastos filtrados en la capa listado-gastos-completo mediante la función mostrarGastoWeb.
  gastosFiltrados.forEach(gasto => {
    mostrarGastoWeb('listado-gastos-completo', gasto);
  });
}
}
formFiltrado.addEventListener("submit", new filtrarGastosWeb());



export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
} 