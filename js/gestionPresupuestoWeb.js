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
      
          // Agregar un evento de clic para manejar la eliminación de etiquetas
          spanEtiqueta.addEventListener('click', function () {
            BorrarEtiquetasHandle(gasto, etiqueta);
          });
      
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

      const botonEditarFormulario = document.createElement('button'); 
      botonEditarFormulario.classList.add('gasto-editar'); 
      botonEditarFormulario.textContent = "Editar formulario"; 
      botonEditarFormulario.addEventListener('click', function () {
        document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
      });
      //botonEditarFormulario.addEventListener('click', new EditarHandleFormulario(gasto)); 
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
   console.log(listadoGastos); 
   console.log(listado); 
 
   listadoGastos.forEach((gasto) => {
      mostrarGastoWeb('listado-gastos-completo', gasto);
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

function EditarHandleFormulario(gasto){
  this.gasto = gasto; 
  const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  const formulario = plantillaFormulario.querySelector("form");

  // Asignar valores por defecto
  formulario.querySelector("#descripcion").value = this.gasto.descripcion;
  formulario.querySelector("#valor").value = this.gasto.valor;
  formulario.querySelector("#fecha").value = this.gasto.fecha;
  formulario.querySelector("#etiquetas").value = this.gasto.etiquetas.join(', ');

 
  this.handleEvent = function (){
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);

    const descripcion = formulario.querySelector("#descripcion").value; 
    
    const valor = formulario.querySelector("#valor").value; 
   
    const valorFloat = parseFloat(valor); 
    const fecha =  formulario.querySelector("#fecha").value; 
  
    const etiquetasTexto = formulario.querySelector("#etiquetas").value; 
    
    const etiquetasArr = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());
  
    this.gasto.actualizarDescripcion(descripcion); 
    this.gasto.actualizarValor(valor); 
    this.gasto.actualizarFecha(fecha); 
    this.gasto.anyadirEtiquetas(etiquetasArr); 

    repintar(); 
  }

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
   nuevoGasto.anyadirEtiquetas(etiquetasArr); 
   
   gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();

  const botonAnyadir = document.getElementById("anyadirgasto-formulario");
  botonAnyadir.removeAttribute("disabled");

}


function nuevoGastoWebFormulario(){
  const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  const formulario = plantillaFormulario.querySelector("form");

  formulario.addEventListener('submit', submitHandler); 
 
  const botonAnyadir = document.getElementById("anyadirgasto-formulario"); 
  const botonCancelar = formulario.querySelector("button.cancelar"); 
  const cancelarHandler = new CancelarHandler(formulario, botonAnyadir); 

  botonCancelar.addEventListener("click", cancelarHandler);
  
  botonAnyadir.setAttribute("disabled", "true"); 

  document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
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
  console.log(nuevoGasto); 
  console.log(gestionPresupuesto.listarGastos()); 
}

function BorrarHandle(gasto) {
  // Asignamos el gasto al objeto manejador
  this.gasto = gasto;

  // Método para manejar el evento de borrado
  this.handleEvent = function () {
    // Borrar el gasto asociado
    gestionPresupuesto.borrarGasto(this.gasto.id);

    // Llamar a la función repintar para mostrar la lista actualizada de gastos
    repintar();
  };
}

// Función para eliminar una etiqueta de un gasto
function BorrarEtiquetasHandle(gasto, etiqueta) {
  if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
    const etiquetaIndex = gasto.etiquetas.indexOf(etiqueta);
    if (etiquetaIndex !== -1) {
      gasto.etiquetas.splice(etiquetaIndex, 1);
      repintar(); 
    }
  }
}
// Exporta las funciones
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
  EditarHandleFormulario
};