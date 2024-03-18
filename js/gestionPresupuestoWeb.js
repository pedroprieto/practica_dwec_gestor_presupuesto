import * as gestionPresupuesto from './gestionPresupuesto.js';

let listadoGastos = []; 
// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
      return elemento.textContent = valor;
  }
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
  const elemento = document.getElementById(idElemento);
  
  if (elemento) {
    //const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
   // const formulario = plantillaFormulario.querySelector("form");
      const divGasto = document.createElement('div');
      divGasto.classList.add('gasto');
      
      const divDescripcion = document.createElement('div');
      divDescripcion.classList.add('gasto-descripcion');
      divDescripcion.textContent = gasto.descripcion;
      divGasto.appendChild(divDescripcion);

      const divFecha = document.createElement('div');
      divFecha.classList.add('gasto-fecha');
      divFecha.textContent = gasto.fecha;
      divGasto.appendChild(divFecha);

      const divValor = document.createElement('div');
      divValor.classList.add('gasto-valor');
      divValor.textContent = gasto.valor;
      divGasto.appendChild(divValor);

      if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
        // Crear un contenedor div para las etiquetas
        const divEtiquetas = document.createElement('div');
        divEtiquetas.classList.add('gasto-etiquetas');
      
        // Iterar sobre cada etiqueta y crear un span para cada una
        gasto.etiquetas.forEach(etiqueta => {
          const spanEtiqueta = document.createElement('span');
          spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
          spanEtiqueta.textContent = etiqueta;
          //console.log(etiqueta); 
          let borrarEti = new BorrarEtiquetasHandle(); 
          borrarEti.gasto = gasto; 
          borrarEti.etiqueta = etiqueta; 
          // Agregar un evento de clic para manejar la eliminación de etiquetas
          spanEtiqueta.addEventListener('click', borrarEti);
      
          // Agregar el span al contenedor de etiquetas
          divEtiquetas.appendChild(spanEtiqueta);
        });
      
        // Agregar el contenedor de etiquetas al contenedor principal del gasto
        divGasto.appendChild(divEtiquetas);
      }


      const botonEditar = document.createElement('button');
      botonEditar.classList.add('gasto-editar');
      botonEditar.textContent = 'Editar';
      botonEditar.addEventListener('click', new EditarHandle(gasto));
      divGasto.appendChild(botonEditar);
      elemento.appendChild(divGasto);

      const botonBorrar = document.createElement('button');
      botonBorrar.classList.add('gasto-borrar');
      botonBorrar.textContent = 'Borrar';
      botonBorrar.addEventListener('click', new BorrarHandle(gasto)); // Asigna BorrarHandle con el gasto correspondiente
      divGasto.appendChild(botonBorrar);
      elemento.appendChild(divGasto);

      const botonBorrarAPI = document.createElement('button'); 
      botonBorrarAPI.classList.add('gasto-borrar-api'); 
      botonBorrarAPI.textContent = 'Borrar (API)'; 
      botonBorrarAPI.addEventListener('click', new borrarGastoApi(gasto));
      divGasto.appendChild(botonBorrarAPI); 
      elemento.appendChild(divGasto); 
     

      const botonEditarFormulario = document.createElement('button'); 
      botonEditarFormulario.classList.add('gasto-editar-formulario'); 
      botonEditarFormulario.textContent = "Editar formulario"; 
      let editarElemento = new editarHandleFormulario(); 
      editarElemento.gasto = gasto; 
      botonEditarFormulario.addEventListener('click', editarElemento);  
      divGasto.appendChild(botonEditarFormulario);
      elemento.appendChild(divGasto);
  }
}

// Función para mostrar gastos agrupados en un elemento HTML por su ID
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
      const divAgrupacion = document.createElement('div');
      divAgrupacion.classList.add('agrupacion');

      const h1Periodo = document.createElement('h1');
      h1Periodo.textContent = 'Gastos agrupados por ' + periodo;
      divAgrupacion.appendChild(h1Periodo);

      for (const clave in agrup) {
          if (agrup.hasOwnProperty(clave)) {
              const divDato = document.createElement('div');
              divDato.classList.add('agrupacion-dato');

              const spanClave = document.createElement('span');
              spanClave.classList.add('agrupacion-dato-clave');
              spanClave.textContent = clave;
              divDato.appendChild(spanClave);

              const spanValor = document.createElement('span');
              spanValor.classList.add('agrupacion-dato-valor');
              spanValor.textContent = agrup[clave];
              divDato.appendChild(spanValor);

              divAgrupacion.appendChild(divDato);
          }
      }

      elemento.appendChild(divAgrupacion);
  }
}

function repintar(){

  // Muestra el presupuesto en el elemento con ID "presupuesto"
  const presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId('presupuesto', presupuesto);

  // Calcula los totales de gastos y el balance total
  const totalGastos = gestionPresupuesto.calcularTotalGastos();
  const balanceTotal = gestionPresupuesto.calcularBalance();
  // Muestra los totales en elementos HTML
  mostrarDatoEnId('gastos-totales', totalGastos);
  mostrarDatoEnId('balance-total', balanceTotal);

  let listado = document.getElementById('listado-gastos-completo'); 

  //Se limpia el contenido de listado

  listado.innerHTML = ""; 
  // Muestra el listado completo de gastos
   // Muestra el listado completo de gastos
  const listadoGastos = gestionPresupuesto.listarGastos(); // Declaración e inicialización de listadoGastos
   //console.log(listadoGastos); 
  // console.log(listado); 
 
   listadoGastos.forEach((gasto) => {
      mostrarGastoWeb('listado-gastos-completo', gasto);
      //console.log('repintando gastos'); 
   });

  
}

function repintarFiltrados(gastosFiltrados) {
  // Muestra el presupuesto en el elemento con ID "presupuesto"
  const presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId('presupuesto', presupuesto);

  // Calcula los totales de gastos y el balance total
  const totalGastos = gestionPresupuesto.calcularTotalGastos();
  const balanceTotal = gestionPresupuesto.calcularBalance();
  // Muestra los totales en elementos HTML
  mostrarDatoEnId('gastos-totales', totalGastos);
  mostrarDatoEnId('balance-total', balanceTotal);

  let listado = document.getElementById('listado-gastos-completo');

  // Se limpia el contenido de listado
  listado.innerHTML = "";

  // Muestra solo los gastos filtrados
  gastosFiltrados.forEach((gasto) => {
    mostrarGastoWeb('listado-gastos-completo', gasto);
    //console.log('Repintando gastos filtrados');
  });
}

function actualizarPresupuestoWeb(){
    let presupuestoWeb = prompt('Actualiza el presupuesto: ', ''); 
    parseFloat(presupuestoWeb); 
    gestionPresupuesto.actualizarPresupuesto(presupuestoWeb); 
    repintar(); 
    

}


function EditarHandle(gasto) {
// Asignamos el gasto al objeto manejador
this.gasto = gasto;

// Método para manejar el evento de edición
this.handleEvent = function () {
  // Pedir al usuario la información necesaria para editar el gasto
  const nuevaDescripcion = prompt('Editar descripción:', this.gasto.descripcion);
  const nuevoValor = parseFloat(prompt('Editar valor:', this.gasto.valor));
  const nuevaFecha = prompt('Editar fecha (yyyy-mm-dd):', this.gasto.fecha);
  const etiquetasTexto = prompt('Editar etiquetas (separadas por comas):', this.gasto.etiquetas.join(', '));

  // Actualizar las propiedades del gasto
  this.gasto.actualizarDescripcion(nuevaDescripcion);
  this.gasto.actualizarValor(nuevoValor);
  this.gasto.actualizarFecha(nuevaFecha);
  this.gasto.etiquetas = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());

  // Llamar a la función repintar para mostrar los datos actualizados
  repintar();
  };
 
}


function editarHandleFormulario(){

  this.handleEvent = function(event){
    const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    const formulario = plantillaFormulario.querySelector("form");

    event.target.parentElement.append(plantillaFormulario); 
    event.target.disabled = true; 
    formulario.elements.descripcion.value = this.gasto.descripcion; 
    formulario.elements.valor.value = this.gasto.valor; 
    formulario.elements.fecha.value = this.gasto.fecha; 
    formulario.elements.etiquetas.value = this.gasto.etiquetas.join(', '); 

    let manejadorEditar = new submitHandlerGasto(); 
    let manejadorEditarAPI = new submitHanlerGastoAPI(); 
    manejadorEditarAPI.gasto = this.gasto; 
    manejadorEditar.gasto = this.gasto; 
    //manejadorEditar.formulario = formulario; 
    formulario.addEventListener('submit', manejadorEditar);
    let botonCancelar = formulario.querySelector('.cancelar'); 
    let manejadorCerrar = new cerrarActualizarGasto(); 
    let botonEditarAPI = formulario.querySelector('.gasto-enviar-api'); 
    manejadorEditarAPI.botonEditarAPI = event.target; 
    botonEditarAPI.addEventListener('click', manejadorEditarAPI); 
    manejadorCerrar.botonEditar = event.target; 
    botonCancelar.addEventListener('click', manejadorCerrar);  

  }

  

}

function cerrarActualizarGasto(){
  this.handleEvent = function(event){
    event.target.form.remove(); 
    this.botonEditar.disabled = false; 
    //console.log('h'); 
  }
}

function submitHandlerGasto(){
  this.handleEvent = function(event){
    event.preventDefault();  
    let descripcion = event.target.elements.descripcion.value; 
    let valor = event.target.elements.valor.value; 
    let valorNum = parseFloat(valor); 
    let fecha = event.target.elements.fecha.value; 
    let etiquetas = event.target.elements.fecha.value; 
    let etiquetasArr = etiquetas.split(', ').map(etiqueta => etiqueta.trim()); 
  
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valorNum);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetasArr);
  
    //this.botonEditar.disabled = false; 
    //onsole.log('h'); 
    repintar();
  }
 
}

function nuevoGastoWebFormulario(event){
  event.target.disabled = true; 
  const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  const formulario = plantillaFormulario.querySelector("form");

  //Aparece el formulario al llamar a la funcion en el div de los controles
  let controlesPrincipales = document.getElementById('controlesprincipales'); 
  controlesPrincipales.append(plantillaFormulario); 

  //Eventos del formulario 
  formulario.addEventListener('submit', enviarAnyadirGasto);
  
  let botonCancelar = formulario.querySelector('.cancelar'); 

  botonCancelar.addEventListener('click', cerrarAnyadirGasto); 

  let botonEnviarApi = formulario.querySelector('.gasto-enviar-api'); 
  botonEnviarApi.addEventListener('click', enviarGastoApi); 

  repintar(); 


}

function enviarAnyadirGasto(event){
  event.preventDefault(); 
  
  let descripcion = event.target.elements.descripcion.value; 
  let valor = event.target.elements.valor.value; 
  let valorNum = parseFloat(valor); 
  let fecha = event.target.elements.fecha.value; 
  let etiquetas = event.target.elements.etiquetas.value; 
  let etiquetasArr = etiquetas.split(', ').map(etiqueta => etiqueta.trim()); 

  const nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valorNum, fecha); 
  nuevoGasto.anyadirEtiquetas(...etiquetasArr); 

  gestionPresupuesto.anyadirGasto(nuevoGasto);
  //console.log(nuevoGasto); 
  event.target.remove(); 
 
  
  repintar(); 

}

function cerrarAnyadirGasto(event){
  
  let formulario = event.target.form; 
  formulario.remove(); 
  let botonAnyadir = document.getElementById('anyadirgasto-formulario'); 
  botonAnyadir.disabled = false; 
  
}



// Definición de la función constructora para el manejador de eventos del botón Cancelar
function CancelarHandler(formulario, botonAnyadir) {
  this.formulario = formulario;
  this.botonAnyadir = botonAnyadir;

  // Implementación del método handleEvent para el manejador de eventos del botón Cancelar
  this.handleEvent = function () {
    this.formulario.remove();
    this.botonAnyadir.removeAttribute("disabled");
  };
}

function submitHandler(event) {
  // Prevenir el envío del formulario por defecto
  event.preventDefault();

  // Acceder al formulario desde el evento
  const formulario = event.currentTarget;

  // Crear un nuevo gasto con la información del formulario
  
    const descripcion = formulario.querySelector("#descripcion").value; 
    const valor = formulario.querySelector("#valor").value; 
    const valorFloat = parseFloat(valor); 
    const fecha =  formulario.querySelector("#fecha").value; 
    const etiquetasTexto = formulario.querySelector("#etiquetas").value; 
    const etiquetasArr = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());
   // Actualizar las propiedades del gasto
   const nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valorFloat, fecha); 
   nuevoGasto.anyadirEtiquetas(...etiquetasArr); 
   
   gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();

  const botonAnyadir = document.getElementById("anyadirgasto-formulario");
  botonAnyadir.removeAttribute("disabled");

}




function nuevoGastoWeb(){
  let descripcion = prompt('Añade la descripción del gasto: ', ''); 
  let cantidad = prompt('Añade la cantidad: ', 100); 
  cantidad = parseFloat(cantidad); 
  let fecha = prompt ('Añade una fecha en el formato yyyy-mm-dd: ', '2023-11-08'); 
  let etiquetas = prompt('Añade las etiquetas separadas por , : ', 'casa, seguro'); 
  let arrEtiquetas = etiquetas.split(', '); 
  let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, cantidad, fecha, arrEtiquetas); 
  gestionPresupuesto.anyadirGasto(nuevoGasto); 

  repintar(); 
  //console.log(nuevoGasto); 
 // console.log(gestionPresupuesto.listarGastos()); 
}

function BorrarHandle(gasto) {
  // Asignamos el gasto al objeto manejador
  this.gasto = gasto;

  // Método para manejar el evento de borrado
  this.handleEvent = function () {
    // Borrar el gasto asociado
    gestionPresupuesto.borrarGasto(this.gasto.id);
    console.log(this.gasto.id); 
    // Llamar a la función repintar para mostrar la lista actualizada de gastos
    repintar();
  };
}

// Función para eliminar una etiqueta de un gasto
function BorrarEtiquetasHandle() {
  this.handleEvent = function(){
    if (this.gasto.etiquetas && Array.isArray(this.gasto.etiquetas)) {
      const etiquetaIndex = this.gasto.etiquetas.indexOf(this.etiqueta);
      if (etiquetaIndex !== -1) {
        this.gasto.etiquetas.splice(etiquetaIndex, 1);
        repintar(); 
      }
    }
  }
 
}

function filtrarGastosWeb(event) {
  event.preventDefault();
  let formulario = event.target;
  let descripcion = formulario.elements['formulario-filtrado-descripcion'].value || '';
  let valorMinimo = formulario.elements['formulario-filtrado-valor-minimo'].value.trim();
  let valorMaximo = formulario.elements['formulario-filtrado-valor-maximo'].value.trim();
  let fechaDesde = formulario.elements['formulario-filtrado-fecha-desde'].value || '';
  let fechaHasta = formulario.elements['formulario-filtrado-fecha-hasta'].value || '';
  let etiquetasTiene = formulario.elements['formulario-filtrado-etiquetas-tiene'].value || '';

  // Convertir valorMinimo y valorMaximo a números o dejar como null si están vacíos
  valorMinimo = valorMinimo === '' ? null : parseFloat(valorMinimo);
  valorMaximo = valorMaximo === '' ? null : parseFloat(valorMaximo);

  let arrEtiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);

  let filtros = {
    descripcion,
    valorMinimo,
    valorMaximo,
    fechaDesde,
    fechaHasta,
    etiquetasTiene: arrEtiquetasTiene
  };

  let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);
  repintarFiltrados(gastosFiltrados);
  /*gastosFiltrados.forEach((gasto) => {
    const elementoID = 'listado-gastos-completos';
    mostrarGastoWeb(elementoID, gasto);
    console.log(gasto);
    
  });*/
}

const formulario = document.getElementById('formulario-filtrado');

formulario.addEventListener('submit', function (event) {
  event.preventDefault();  // Evitar que el formulario se envíe de manera convencional
  filtrarGastosWeb(event);
});

const btnGuardar = document.getElementById('guardar-gastos'); 

btnGuardar.addEventListener('click', function () {

  let gastosListados = gestionPresupuesto.listarGastos(); 

   // Convertir el listado de gastos a formato de cadena JSON
   let gastosListadosString = JSON.stringify(gastosListados);

   // Guardar la cadena JSON en el localstorage con la clave 'GestorGastosDWEC'
   localStorage.setItem('GestorGastosDWEC', gastosListadosString);

} ); 



const btnCargar = document.getElementById('cargar-gastos'); 

btnCargar.addEventListener('click', function (event) {

   // Obtener la cadena JSON almacenada en el localstorage con la clave 'GestorGastosDWEC'
   const gastosString = localStorage.getItem('GestorGastosDWEC');

   // Verificar si la cadena JSON existe en el localstorage
   if (gastosString) {
     // Convertir la cadena JSON a un array de gastos
     const gastos = JSON.parse(gastosString);
 
     // Cargar los gastos utilizando la función cargarGastos
     gestionPresupuesto.cargarGastos(gastos);
 
     // Repintar la interfaz gráfica con los gastos cargados
     repintar();
   } else {
     // Si no existe la clave en el almacenamiento, llamar a cargarGastos con un array vacío
     gestionPresupuesto.cargarGastos([]);
 
     // Repintar la interfaz gráfica con el array vacío
     repintar();
   }

} ); 

async function cargarGastosApi(){
  const nombreUsuario = document.getElementById('nombre_usuario').value;

  try {
    const response = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`);
    const data = await response.json();

    // Actualizar el array de gastos y repintar la página
    gestionPresupuesto.cargarGastos(data);
    repintar();
    gestionPresupuesto.listarGastos(); 
    console.log(data); 
  } catch (error) {
    console.error('Error al cargar gastos desde la API:', error);
  }
}

const btnCargarGastosAPI = document.getElementById('cargar-gastos-api'); 
btnCargarGastosAPI.addEventListener('click', cargarGastosApi); 

function borrarGastoApi(gasto) {
  this.gasto = gasto;
  //console.log(this.gasto); 
  // Método para manejar el evento de borrado
  this.handleEvent = async function () {
    const nombreUsuario = document.getElementById('nombre_usuario').value;
    const gastoId = this.gasto.gastoId;
    console.log(this.gasto.gastoId); 
    try {
      await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${gastoId}`, {
        method: 'DELETE',
      });

      // Llamar a la función cargarGastosApi para actualizar la lista desde la API
      cargarGastosApi();
    } catch (error) {
      console.error('Error al borrar el gasto desde la API:', error);
    }
  };
}

//const botonEnviarApi = document.querySelector('.gasto-enviar-api');
//botonEnviarApi.addEventListener('click', enviarGastoApi);

async function enviarGastoApi(event) {
  event.preventDefault();
  let nombreUsuario = document.getElementById('nombre_usuario').value;
  let formulario = event.target.form; 
  // Obtener datos del formulario (código no proporcionado, debe adaptarse a tu formulario)
  //let formulario = document.getElementById('formulario'); 
  let descripcion = formulario.elements.descripcion.value; 
  let valor =  formulario.elements.valor.value; 
  let valorNum = parseFloat(valor); 
  let fecha = formulario.elements.fecha.value; 
  let etiquetas = formulario.elements.etiquetas.value; 
  let etiquetasArr = etiquetas.split(', ').map(etiqueta => etiqueta.trim()); 

  let nuevoGastoAPI = new gestionPresupuesto.CrearGasto(descripcion, valorNum, fecha); 
  nuevoGastoAPI.anyadirEtiquetas(...etiquetasArr); 
 
  gestionPresupuesto.anyadirGasto(nuevoGastoAPI);
  try {
    await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        descripcion: nuevoGastoAPI.descripcion,
        valor: nuevoGastoAPI.valor,
        fecha: nuevoGastoAPI.fecha,
        etiquetas: nuevoGastoAPI.etiquetas,
      }),
    });

    // Actualizar la lista de gastos desde la API
    cargarGastosApi();
  } catch (error) {
    console.error('Error al enviar el gasto a la API:', error);
  }
  formulario.remove(); 
  let botonAnyadir = document.getElementById('anyadirgasto-formulario'); 
  botonAnyadir.disabled = false; 
 
}

function submitHanlerGastoAPI(){
  this.handleEvent = async function (event) {
    event.preventDefault();

    // Acceder al formulario desde el evento 
    const formulario = event.currentTarget.form;
    const nombreUsuario = document.getElementById('nombre_usuario').value;

    // Obtener datos del formulario
    const descripcion = formulario.querySelector("#descripcion").value;
    const valor = formulario.querySelector("#valor").value;
    const valorFloat = parseFloat(valor);
    const fecha = formulario.querySelector("#fecha").value;
    const etiquetasTexto = formulario.querySelector("#etiquetas").value;
    const etiquetasArr = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());

    // Actualizar las propiedades del gasto
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valorFloat); 
    this.gasto.actualizarFecha(fecha); 
    this.gasto.anyadirEtiquetas(...etiquetasArr);
    let gastoId = this.gasto.gastoId; 
    console.log(gastoId); 
    // Llamar a la función cargarGastosApi para actualizar la lista desde la API
    try {
      await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${gastoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: this.gasto.descripcion,
          valor: this.gasto.valor,
          fecha: this.gasto.fecha,
          etiquetas: this.gasto.etiquetas,
        }),
      });

      // Actualizar la lista de gastos desde la API
      cargarGastosApi();
    } catch (error) {
      console.error('Error al enviar el gasto a la API:', error);
      console.log('Response:', error.response);
    }

  }
  }


export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb, 
  repintar, 
  actualizarPresupuestoWeb, 
  nuevoGastoWeb, 
  EditarHandle, 
  BorrarHandle, 
  BorrarEtiquetasHandle, 
  nuevoGastoWebFormulario, 
  editarHandleFormulario, 
  enviarAnyadirGasto, 
  filtrarGastosWeb, 
  
};