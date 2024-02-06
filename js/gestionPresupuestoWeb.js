import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){

let elemento = document.getElementById(idElemento);

    


if (elemento){
    elemento.textContent = valor;
} else {
    console.error('El elemento con el id '+ idElemento + 'no fue encontrado.' );
}

}

function mostrarGastoWeb(idElemento, gasto){

  // Obtener el elemento HTML por su id
  let container = document.getElementById(idElemento);

  // Verificar si el contenedor existe antes de intentar modificarlo, y seguiremos la estructura que nos marca el ejercicio.
  if (container) {
      // Crear un nuevo elemento div para representar el gasto
      let nuevoGastoDiv = document.createElement("div");
      nuevoGastoDiv.classList.add("gasto");
    
      // Añadir descripción del gasto
      let descripcionDiv = document.createElement("div");
      descripcionDiv.classList.add("gasto-descripcion");
      descripcionDiv.textContent = gasto.descripcion;
   

      // Añadir fecha del gasto
      let fechaDiv = document.createElement("div");
      fechaDiv.classList.add("gasto-fecha");
     
    
      let cadenaFecha = new Date(gasto.fecha).toLocaleDateString();

      fechaDiv.textContent = cadenaFecha;
     

      // Añadir valor del gasto
      let valorDiv = document.createElement("div");
      valorDiv.classList.add("gasto-valor");
      valorDiv.textContent = gasto.valor;
  

      // Añadir etiquetas del gasto
      let etiquetasDiv = document.createElement("div");
      etiquetasDiv.classList.add("gasto-etiquetas");
      for(let etiqueta of gasto.etiquetas) {
        let spanEtiquetas = document.createElement('span');
        spanEtiquetas.classList.add('gasto-etiquetas-etiqueta');
        spanEtiquetas.textContent = etiqueta +" ";
            // Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
       let borrarEtiquetasHandler = new BorrarEtiquetasHandle();
       borrarEtiquetasHandler.gasto = gasto;
       borrarEtiquetasHandler.etiqueta = etiqueta;

    // Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
      spanEtiquetas.addEventListener('click', borrarEtiquetasHandler);

    // Añadir el span al contenedor

        etiquetasDiv.appendChild(spanEtiquetas);

      }
      nuevoGastoDiv.appendChild(descripcionDiv);
      nuevoGastoDiv.appendChild(fechaDiv);
      nuevoGastoDiv.appendChild(valorDiv);
      nuevoGastoDiv.appendChild(etiquetasDiv);


      let botonEdit = document.createElement('button');
      botonEdit.type = 'button';
      botonEdit.className = 'gasto-editar';
      botonEdit.textContent = 'Editar';
      let manejadorEvEditar = new EditarHandle(gasto);
      botonEdit.addEventListener('click', manejadorEvEditar);
      nuevoGastoDiv.appendChild(botonEdit);
  
      let botonDelete = document.createElement('button');
      botonDelete.type = 'button';
      botonDelete.className = 'gasto-borrar';
      botonDelete.textContent = 'Borrar';
      let manejadorEvDelete = new BorrarHandle(gasto);
      botonDelete.addEventListener('click', manejadorEvDelete);
      nuevoGastoDiv.appendChild(botonDelete);
      
      let botonEditForm = document.createElement('button');
      botonEditForm.type = 'button';
      botonEditForm.className = "gasto-editar-formulario";
      botonEditForm.textContent = "Editar formulario";
      let eventEditForm = new EditarHandleFormulario();

      eventEditForm.gasto = gasto;
  
      botonEditForm.addEventListener( "click", eventEditForm );

      nuevoGastoDiv.appendChild(botonEditForm);



     
    // Añadir el nuevo gasto al contenedor
        container.append(nuevoGastoDiv);
      



  } else {
      console.error('El contenedor con el id ' + idElemento + ' no fue encontrado.');
  }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
        //buscamos el eelemento
    let elemento = document.getElementById(idElemento)
    //Creamos la estructura principal del HTMl
    let nuevaAgrupacion = document.createElement("div");
    nuevaAgrupacion.classList.add("agrupacion");
    //Creamos el título con el período
    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    nuevaAgrupacion.appendChild(titulo);

 for(let [clave, valor] of Object.entries(agrup)) {
             
                    let dato = document.createElement("div");
                    dato.classList.add("agrupacion-dato");

                    // Crear span para la clave
                    let claveSpan = document.createElement("span");
                    claveSpan.classList.add("agrupacion-dato-clave");
                    claveSpan.textContent =clave + ": ";
                    dato.appendChild(claveSpan);

                    // Crear span para el valor
                    let valorSpan = document.createElement("span");
                    valorSpan.classList.add("agrupacion-dato-valor");
                    valorSpan.textContent = valor;
                    dato.appendChild(valorSpan);

              
                    nuevaAgrupacion.appendChild(dato);
            }
       elemento.appendChild(nuevaAgrupacion);   
}

// Importar la librería js/gestionPresupuesto.js


// Función repintar para actualizar la página

function repintar() {
    // Mostrar el presupuesto en div#presupuesto
   gestionPresupuesto.mostrarPresupuesto();
   mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    
    // Mostrar los gastos totales en div#gastos-totales
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    
    // Mostrar el balance total en div#balance-total
    
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    
    // Borrar el contenido de div#listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = '';
    
    // Mostrar el listado completo de gastos en div#listado-gastos-completo
    let listGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listGastos){
    mostrarGastoWeb('listado-gastos-completo', gasto)
    }

}

// Función actualizarPresupuestoWeb y botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    // Pedir al usuario que introduzca un presupuesto mediante un prompt
    let nuevoPresupuestoStr = prompt('Introduce el nuevo presupuesto:');
    
    // Convertir el valor a número
    let nuevoPresupuesto = parseFloat(nuevoPresupuestoStr);
    
    // Actualizar el presupuesto
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    
    // Llamar a la función repintar para mostrar la información actualizada
    repintar();
}
// Obtener el elemento botón correspondiente y añadir la manejadora de eventos
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

//(descripcion, valor = 0, fecha, ...etiquetas)
function nuevoGastoWeb(){
    //introduccimos los campos
    let newDescripcion = prompt('Introduce la descripción del gasto:');
    let valorStr = prompt('Introduce el valor del gasto:');
    let newFecha = prompt('Introduce la fecha del gastos en formato: YYYY-MM-DD');
    let nombresEtiqueta = prompt('Introduce las etiquetas separadas por ,');
    let nuevoValor = parseFloat(valorStr);
    let arrayEtiquetas = nombresEtiqueta.split(', ');
    //let arrayEtiqueta = [];
    /*for (let etiqueta of arrayEtiqueta)
    {
        arrayEtiqueta.push(etiqueta);
    }*/
    // hay que crear y añadir el gasto
    let nuevoGasto = new gestionPresupuesto.CrearGasto (newDescripcion, nuevoValor, newFecha, arrayEtiquetas)
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
    
}




let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);

// Llamar a repintar al cargar la página para mostrar la información inicial
repintar();
// botón Editar Gasto



class EditarHandle {
    constructor(gasto) {
        this.gasto = gasto;
        this.handleEvent = function () {
            let newDescripcion = prompt(`Introduce la nueva descripción del gasto. para "${this.gasto.descripcion}"`);
            let valorStr = parseFloat(prompt('Intruduzca el nuevo valor'));
            let nuevoValor = parseFloat(valorStr);
            let newFecha = ('Introduce la fecha del gasto en formato: yyyy-mm-dd');
            let etiquetasNew = prompt('Introduce las etiquetas separadas por "," ');
            // let arrayEtiquetas = etiquetasNew.split(', ');
            // actualizar valores
            //ojo con las etiquetas que las hemos borrado
            this.gasto.etiquetas=[];
            this.gasto.actualizarDescripcion(newDescripcion);
            this.gasto.actualizarValor(nuevoValor);
            this.gasto.actualizarFecha(newFecha);
            this.gasto.anyadirEtiquetas(...etiquetasNew.split(', '));
            repintar();
        };
    }
}

function EditarHandleFormulario(gasto){
    this.gasto=gasto;
    this.handleEvent = function (event) {
        event.preventDefault();
    // Crear una copia del formulario
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    // Acceder al elemento <form> dentro de ese fragmento de documento
    let formulario = plantillaFormulario.querySelector("form");
        event.target.parentElement.append(plantillaFormulario);
        event.currentTarget.after(formulario);
        let botonEditForm = event.currentTarget;
        botonEditForm.disabled = true;

    /*información de los campos*/
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        //alert("'Introduce la fecha del gasto en formato: yyyy-mm-dd' ");
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleDateString();
        //alert('Introduce las etiquetas separadas por "," ');
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        //objeto manejador de eventos.
        let submitFormulario = new submitEditarHandleForm();
        submitFormulario.gasto = this.gasto;
        formulario.addEventListener('submit',submitFormulario);
        
        // Localizar el botón cancelar
        let botonCancelarGasto = formulario.querySelector(".cancelar");
         // Para que al pulsar se elimine el formulario.
        let eventoCancelar = new cancelarNuevoGasto();
        botonCancelarGasto.addEventListener("click",eventoCancelar);

    }


    
}
function submitEditarHandleForm(){
    this.handleEvent = function( event ){

      event.preventDefault();

      let form = event.currentTarget;

      let newDescripcion = form.elements.descripcion.value;
      let valorStr = parseFloat(form.elements.valor.value);
      let newFecha =  form.elements.fecha.value;
      //alert('Introduce las etiquetas separadas por ,');
      let etiquetasNew = form.elements.etiquetas.value;

      this.gasto.actualizarDescripcion(newDescripcion);
      this.gasto.actualizarValor(valorStr);
      this.gasto.actualizarFecha(newFecha);
      this.gasto.borrarEtiquetas();
      this.gasto.anyadirEtiquetas(etiquetasNew);

      repintar();
      document.getElementById("anyadirgasto-formulario").disabled = false;
    }
  }
class BorrarHandle{
    constructor(gasto){
        this.gasto = gasto;
        this.handleEvent = function(){
            gestionPresupuesto.borrarGasto(this.gasto.id);
            repintar();
        }
    }

}


// Función constructora BorrarEtiquetasHandle
class BorrarEtiquetasHandle {
    constructor(gasto, etiqueta) {
        this.gasto = gasto;
        this.etiqueta = etiqueta;

        // Método handleEvent
        this.handleEvent = function () {
            if (this.gasto && typeof this.gasto.borrarEtiquetas === 'function') {
                this.gasto.borrarEtiquetas(this.etiqueta);
                repintar();
              } else {
                console.error("Error: this.gasto o this.gasto.borrarEtiquetas no está definido correctamente.");
              }
     
        };
    }
}

function nuevoGastoWebFormulario() {
    // Crear una copia del formulario
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    // Acceder al elemento <form> dentro de ese fragmento de documento
    let formulario = plantillaFormulario.querySelector("form");
/*

Por último, añadir el fragmento de documento (variable plantillaFormulario) al final del <div id="controlesprincipales"> para que se muestre en la página.
*/
    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.append(plantillaFormulario);

    // Crear un manejador de evento para el evento submit del formulario
    formulario.addEventListener("submit", function (event) {
        // Prevenir el envío del formulario
        event.preventDefault();

        // Crear un nuevo gasto con la información del formulario
        let newDescripcion = event.currentTarget.querySelector("#descripcion").value;
        let nuevoValor = parseFloat(event.currentTarget.querySelector("#valor").value);
        let newFecha = event.currentTarget.querySelector("#fecha").value;    
        let arrayEtiquetas = event.currentTarget.querySelector("#etiquetas").value.split(",");
        // Añadir el gasto a la lista de gastos
        let nuevoGasto = new gestionPresupuesto.CrearGasto (newDescripcion, nuevoValor, newFecha, arrayEtiquetas)
        gestionPresupuesto.anyadirGasto(nuevoGasto);

        // Llamar a la función repintar
        repintar();

        // Activar el botón anyadirgasto-formulario
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        // Cerrar el formulario (puedes ocultarlo o eliminarlo del DOM según tu preferencia)
        formulario.parentElement.removeChild(formulario);
    });

    // Agregar el formulario a la página
    document.body.appendChild(plantillaFormulario);

    // Desactivar el botón anyadirgasto-formulario
    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "true");
    //localizar button cancelar
    let botonCancelarGasto = formulario.querySelector(".cancelar") ;

         // Para que al pulsar se elimine el formulario.
        let eventoCancelar = new cancelarNuevoGasto();
        botonCancelarGasto.addEventListener("click",eventoCancelar);

}



function cancelarNuevoGasto(event) {
    this.handleEvent = function(e){ 
        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove(); 
        repintar(); 
    }
  
}

function filtrarGastosWeb () {
this.handleEvent = function(e){
    e.preventDefault();
   // document.getElementById("formulario-filtrado");

    let filtradoFormulario = e.currentTarget;
    //recojo los datos
    let descripcionContiene = filtradoFormulario.elements['formulario-filtrado-descripcion'].value;
    let valorMinimo = filtradoFormulario.elements['formulario-filtrado-valor-minimo'].value;
    let valorMaximo = filtradoFormulario.elements['formulario-filtrado-valor-maximo'].value;
    let fechaDesde = filtradoFormulario.elements['formulario-filtrado-fecha-desde'].value;
    let fechaHasta = filtradoFormulario.elements['formulario-filtrado-fecha-hasta'].value;
    let etiquetasTiene = filtradoFormulario.elements['formulario-filtrado-etiquetas-tiene'].value;
    valorMinimo = parseFloat(valorMinimo);
    valorMaximo = parseFloat(valorMaximo);
    //Transformamos las etiquetas
    let etiquetasValidas =[];
    if (etiquetasTiene.trim() !== null){
        etiquetasValidas = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
    }
    //Crear el objeto necesario para llamar a la función filtrarGastos del paquete gestionPresupuesto.js
    //Llamar a la función filtrarGastos
    let filtroGastos = gestionPresupuesto.filtrarGastos({
     descripcionContiene,
     valorMinimo,
     valorMaximo,
     fechaDesde,
     fechaHasta,
     etiquetasTiene : etiquetasValidas

    }
    
    )
    console.log('filtroGastos:', filtroGastos);
    let listaFiltro = document.getElementById('listado-gastos-completo');
    //dejamos vacios
    listaFiltro.innerHTML = "";
   // Actualizar la lista de gastos filtrados en la capa listado-gastos-completo mediante la función mostrarGastoWeb
    for (let gasto of filtroGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }


}    

}

let botonFiltradoFormulGasto = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", botonFiltradoFormulGasto);


// Asociar la función nuevoGastoWebFormulario al evento click del botón anyadirgasto-formulario
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function guardarGastosWeb () {
    this.handleEvent = function ()
    {
        // Convertir el listado de gastos a formato JSON
        let gastosJSON = JSON.stringify(gestionPresupuesto.listarGastos());
        // Guardar el listado de gastos en localStorage
        localStorage.setItem('GestorGastosDWEC', gastosJSON);

    }

}



export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}

