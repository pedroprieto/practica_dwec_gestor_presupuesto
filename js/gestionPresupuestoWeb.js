import * as gestionPresupuesto from './gestionPresupuesto.js';

let listadoGastos = []; 
function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
      return elemento.textContent = valor;
  }
}

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
        const divEtiquetas = document.createElement('div');
        divEtiquetas.classList.add('gasto-etiquetas');
      
        gasto.etiquetas.forEach(etiqueta => {
          const spanEtiqueta = document.createElement('span');
          spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
          spanEtiqueta.textContent = etiqueta;
          console.log(etiqueta); 
      
          spanEtiqueta.addEventListener('click', function () {
            BorrarEtiquetasHandle(gasto, etiqueta);
          });
          divEtiquetas.appendChild(spanEtiqueta);
        });
      
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
      botonEditarFormulario.classList.add('gasto-editar-formulario'); 
      botonEditarFormulario.textContent = "Editar formulario"; 
      botonEditarFormulario.addEventListener('click', new EditarHandleFormulario(gasto, divGasto));  
      divGasto.appendChild(botonEditarFormulario);
      elemento.appendChild(divGasto);
  }
}

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

  const presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId('presupuesto', presupuesto);

  const totalGastos = gestionPresupuesto.calcularTotalGastos();
  const balanceTotal = gestionPresupuesto.calcularBalance();

  mostrarDatoEnId('gastos-totales', totalGastos);
  mostrarDatoEnId('balance-total', balanceTotal);

  let listado = document.getElementById('listado-gastos-completo'); 

  listado.innerHTML = ""; 
  const listadoGastos = gestionPresupuesto.listarGastos();
 
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
this.gasto = gasto;

this.handleEvent = function () {
  const nuevaDescripcion = prompt('Editar descripción:', this.gasto.descripcion);
  const nuevoValor = parseFloat(prompt('Editar valor:', this.gasto.valor));
  const nuevaFecha = prompt('Editar fecha (yyyy-mm-dd):', this.gasto.fecha);
  const etiquetasTexto = prompt('Editar etiquetas (separadas por comas):', this.gasto.etiquetas.join(', '));

  this.gasto.actualizarDescripcion(nuevaDescripcion);
  this.gasto.actualizarValor(nuevoValor);
  this.gasto.actualizarFecha(nuevaFecha);
  this.gasto.etiquetas = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());

  repintar();
  };
 
}

function EditarHandleFormulario(gasto, divGasto) {
  const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  const formulario = plantillaFormulario.querySelector("form");
  this.gasto = gasto;
 
 
  

  this.handleEvent =  () => {
    const botonEditar = divGasto.querySelector("button.gasto-editar-formulario");
    const botonCancelar = formulario.querySelector("button.cancelar");
    const cancelarHandler = new CancelarHandler(formulario, botonEditar);
    botonCancelar.addEventListener("click", cancelarHandler);
    botonEditar.setAttribute("disabled", "true"); 
 
    formulario.querySelector("#descripcion").value = this.gasto.descripcion;
    formulario.querySelector("#valor").value = this.gasto.valor;
    formulario.querySelector("#fecha").value = this.gasto.fecha;
    formulario.querySelector("#etiquetas").value = this.gasto.etiquetas.join(', ');

    const submitHandler =  (event) => {

      event.preventDefault();
      let descripcion = formulario.querySelector("#descripcion").value;
      let valor = formulario.querySelector("#valor").value;
      let fecha = formulario.querySelector("#fecha").value;
      let etiquetasTexto = formulario.querySelector("#etiquetas").value;
      let etiquetasArr = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());

      let valorNum = parseFloat(valor); 

      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarValor(valorNum);
      this.gasto.actualizarFecha(fecha);
      this.gasto.anyadirEtiquetas(...etiquetasArr);

      repintar();
    };

    formulario.addEventListener('submit', submitHandler);

    divGasto.appendChild(plantillaFormulario);
  };
}
function CancelarHandler(formulario, botonAnyadir) {
  this.formulario = formulario;
  this.botonAnyadir = botonAnyadir;

  this.handleEvent = function () {
    this.formulario.remove();
    this.botonAnyadir.removeAttribute("disabled");
  };
}

function submitHandler(event) {
  event.preventDefault();
  const formulario = event.currentTarget;

  
    const descripcion = formulario.querySelector("#descripcion").value; 
    const valor = formulario.querySelector("#valor").value; 
    const valorFloat = parseFloat(valor); 
    const fecha =  formulario.querySelector("#fecha").value; 
    const etiquetasTexto = formulario.querySelector("#etiquetas").value; 
    const etiquetasArr = etiquetasTexto.split(',').map(etiqueta => etiqueta.trim());

   const gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valorFloat, fecha); 
   gastoNuevo.anyadirEtiquetas(...etiquetasArr); 
   
   gestionPresupuesto.anyadirGasto(gastoNuevo);

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
}

function BorrarHandle(gasto) {

  this.gasto = gasto;

  this.handleEvent = function () {

    gestionPresupuesto.borrarGasto(this.gasto.id);
    repintar();
  };
}


function BorrarEtiquetasHandle(gasto, etiqueta) {
  if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
    const etiquetaIndex = gasto.etiquetas.indexOf(etiqueta);
    if (etiquetaIndex !== -1) {
      gasto.etiquetas.splice(etiquetaIndex, 1);
      repintar(); 
    }
  }
}

function filtrarGastosWeb() {
  this.handleEvent = function (event) {
      event.preventDefault();
      let formularioFiltrado = event.currentTarget;
      let descripcionContiene = formularioFiltrado.elements['formulario-filtrado-descripcion'].value;
      let valorMinimo = formularioFiltrado.elements['formulario-filtrado-valor-minimo'].value;
      let valorMaximo = formularioFiltrado.elements['formulario-filtrado-valor-maximo'].value;
      let fechaDesde = formularioFiltrado.elements['formulario-filtrado-fecha-desde'].value;
      let fechaHasta = formularioFiltrado.elements['formulario-filtrado-fecha-hasta'].value;
      let etiquetasTiene = formularioFiltrado.elements['formulario-filtrado-etiquetas-tiene'].value;

      valorMinimo = parseFloat(valorMinimo);
      valorMaximo = parseFloat(valorMaximo);

      if (etiquetasTiene != null) {
          etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
      }

      let gastosFiltrados = gestionPresupuesto.filtrarGastos({descripcionContiene: descripcionContiene, valorMinimo: valorMinimo,
      valorMaximo: valorMaximo, fechaDesde: fechaDesde, fechaHasta: fechaHasta,
      etiquetasTiene: etiquetasTiene});

      let listaFiltrada = document.getElementById('listado-gastos-completo');
      listaFiltrada.innerHTML = "";

      for (let gasto of gastosFiltrados) {
          mostrarGastoWeb('listado-gastos-completo', gasto);
      }    
  }
}

let botonEnvioFormGastoFiltrado = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", botonEnvioFormGastoFiltrado);

function guardarGastosWeb(){
  this.handleEvent = function(){
    localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
}
}

let botonGuardarGastos = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener("click", botonGuardarGastos);

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
  EditarHandleFormulario,
  filtrarGastosWeb,
  cargarGastosWeb,
  guardarGastosWeb,
};