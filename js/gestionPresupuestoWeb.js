import * as gestionPre from './gestionPresupuesto.js';

// función mostrarDatoEnId
function mostrarDatoEnId(idElemento, valor){
    let mostrarDato = document.getElementById(idElemento);
    mostrarDato.innerText = valor;
}

//función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto){

    let contenedor = document.getElementById(idElemento);

  //<div class="gasto">
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
      let divDescripcion = document.createElement('div');
      divDescripcion.className = "gasto-descripcion";
      divDescripcion.innerText = gasto.descripcion;

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
      let divFecha = document.createElement('div');
      divFecha.className = "gasto-fecha";
      divFecha.innerText = gasto.fecha;

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
      let divValor = document.createElement('div');
      divValor.className = "gasto-valor";
      divValor.innerHTML = `${gasto.valor}`;

    //<div class="gasto-etiquetas">
      let divEtiquetas = document.createElement('div');
      divEtiquetas.className = "gasto-etiquetas";

     // Añadir hijos al padre <div class="gasto">
     divGasto.append(divDescripcion);
     divGasto.append(divFecha);
     divGasto.append(divValor);
     divGasto.append(divEtiquetas);


        //<span class="gasto-etiquetas-etiqueta">ETIQUETA 1</span>
        //<span class="gasto-etiquetas-etiqueta">ETIQUETA 2</span>
    
        for (let e of gasto.etiquetas) {
          let spanEtiqueta = document.createElement('span');
          spanEtiqueta.className = "gasto-etiquetas-etiqueta";
          spanEtiqueta.innerHTML = `${e}`;

          divEtiquetas.append(spanEtiqueta);

          //Eventos para los span de etiquetas
          //Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
          let eventBorrarEtiquetas = new BorrarEtiquetasHandle();

          //Establecer la propiedad gasto del objeto creado al objeto gasto
          eventBorrarEtiquetas.gasto = gasto;

          //Establecer la propiedad etiqueta del objeto creado al texto de la etiqueta que se esté procesando
          eventBorrarEtiquetas.etiqueta = e;

          //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
          spanEtiqueta.addEventListener( 'click', eventBorrarEtiquetas);

        }

        //Modificación de la función mostrarGastoWeb
        //Botón editar
          //Crear un botón con texto Editar de tipo button (<button type="button">) con clase gasto-editar.
          let botonEditar = document.createElement( 'button' );
          botonEditar.className = "gasto-editar";
          botonEditar.type = "button";
          botonEditar.innerHTML = "Editar gasto";

          //Crear un nuevo objeto a partir de la función constructora EditarHandle.
          let eventEditar = new EditarHandle();

          //Establecer la propiedad gasto del objeto creado al objeto gasto
          eventEditar.gasto = gasto;

          //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
          botonEditar.addEventListener( "click", eventEditar );

          //Añadir el botón al DOM a continuación de las etiquetas
          divGasto.append( botonEditar );

        //Botón borrar
          //Crear un botón con texto Borrar de tipo button (<button type="button">) con clase gasto-borrar.
          let botonBorrar = document.createElement ( 'button' );
          botonBorrar.className = "gasto-borrar";
          botonBorrar.type = "button";
          botonBorrar.innerHTML = "Borrar gasto";

          //Crear un nuevo objeto a partir de la función constructora BorrarHandle.
          let eventBorrar = new BorrarHandle();

          //Establecer la propiedad gasto del objeto creado al objeto gasto
          eventBorrar.gasto = gasto;

          //Añadir el objeto recién creado como objeto manejador del evento click al botón Borrar recién creado.
          botonBorrar.addEventListener( "click", eventBorrar );

          //Añadir el botón al DOM a continuación del botón Editar.
          divGasto.append (botonBorrar);

        //Añade un segundo botón de edición a la estructura HTML de cada gasto.
        let botonEditarForm = document.createElement( "button" );
        botonEditarForm.type = "button";
        botonEditarForm.className = "gasto-editar-formulario";
        botonEditarForm.innerHTML = "Editar (formulario)";

        // Crear un nuevo objeto a partir de la función constructora EditarHandleForm
        let eventEditarForm = new EditarHandleFormulario();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        eventEditarForm.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Editar
        botonEditarForm.addEventListener( "click", eventEditarForm );

        divGasto.append( botonEditarForm );

        
    //Añado todo al documento
    contenedor.append(divGasto);
}

//función constructora EditarHandleformulario
function EditarHandleFormulario(){
  this.handleEvent = function(event){

    // Crear una copia del formulario web definido en la plantilla HTML
    let plantillaForm = document.getElementById('formulario-template').content.cloneNode(true);

    // Acceder al elemento <form> dentro de ese fragmento de documento
    let form = plantillaForm.querySelector('form');

    // Elemento que provoca el evento
    event.currentTarget.after(form);
    let botonEditar = event.currentTarget;
    botonEditar.disabled = true;

    //actualizar los campos del formulario con la información del gasto que se está editando
    form.elements.descripcion.value = this.gasto.descripcion;
    form.elements.valor.value = this.gasto.valor;
    form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
    form.elements.etiquetas.value = this.gasto.etiquetas;

    //El manejador de eventos del evento submit del formulario no será una función, sino un objeto manejador de Eventos
    let Submit = new SubmitEditarHandleForm();

    //Establecer la propiedad gasto del objeto creado al objeto gasto
    Submit.gasto = this.gasto;

     //Añade el objeto al manejador del evento click del botón Submit
     form.addEventListener('submit', Submit);

     //  Función constructora para cancelar la edición
     let cancelarEdicionForm = new cancelarAnyadirGasto(); 

     // Busco en el formulario el botton cuya clase es cancelar 
     let btnCancelar = form.querySelector( "button.cancelar" );

     // Añade el objeto al manejador del evento click del botón Cancelar
     btnCancelar.addEventListener( "click", cancelarEdicionForm );
  }
}

function SubmitEditarHandleForm(){
  this.handleEvent = function( event ){
    // Prevenir el envío del formulario
    event.preventDefault();

    // Acceso al formulario
    let form = event.currentTarget;

    // Recojo las propiedades del gasto
    let ndescripcion = form.elements.descripcion.value;
    let nvalor = form.elements.valor.value;
    let nfecha =  form.elements.fecha.value;
    let netiquetas = form.elements.etiquetas.value;

    // Convertir el valor a número
    nvalor = parseFloat(nvalor);

    // Actualizo el gasto
    let netiquetasArray = netiquetas.split(',');

    this.gasto.actualizarDescripcion(ndescripcion);
    this.gasto.actualizarValor(nvalor);
    this.gasto.actualizarFecha(nfecha);
    this.gasto.anyadirEtiquetas(...netiquetasArray);

    // Llamar a la función repintar
    repintar();
  }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  
    var divAgrup = document.getElementById(idElemento);
    divAgrup.innerHTML = "";
        
        let arrayAgrupacion = "";

        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }

        divAgrup.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;
}

function repintar(){
  //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
  mostrarDatoEnId( "presupuesto", gestionPre.mostrarPresupuesto() );

  //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
  mostrarDatoEnId( "gastos-totales", gestionPre.calcularTotalGastos() );

  //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
  mostrarDatoEnId( "balance-total", gestionPre.calcularBalance() );

  //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
  document.getElementById( "listado-gastos-completo" ).innerHTML= '';

  //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  let gastos = gestionPre.listarGastos();
  for ( let gasto of gastos){
    mostrarGastoWeb ("listado-gastos-completo", gasto);
  }
}

function actualizarPresupuestoWeb(){
  //Pedir al usuario que introduzca un presupuesto mediante un prompt.
  //para que las indicaciones se vean bien en IE, recomendamos siempre proporcionar el segundo argumento:
  let presupuestoUsuario = prompt( 'Introduzca un presupuesto', '');

  //Convertir el valor a número (recuerda que prompt siempre devuelve un string)..
  let presupuestoNumero = parseInt( presupuestoUsuario);

  //Actualicar el presupuesto (función actualizarPresupuesto)
  gestionPre.actualizarPresupuesto( presupuestoNumero );

  //Llamar a la función repintar para que se muestre la información actualizada en el archivo HTML. 
  repintar();
}

//botón actualizarpresupuesto
//document.getElementById(id) + element.addEventListener(event, handler, [options]);
document.getElementById( "actualizarpresupuesto" ).addEventListener( "click", actualizarPresupuestoWeb );

function nuevoGastoWeb(){
  //Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt (por orden: descripción, valor, fecha y etiquetas). 
  let desc = prompt( "Introduzca una descripción", "" );
  let valorUsuario = prompt( "Introduzca un valor", "" );
  let fecha = prompt( "Introduzca una fecha con formato aaaa/mm/dd", "" );
  let etiquetasUsuario = prompt( "Introduzca unas etiquetas separadas por comas", "" );

  let valorNumero = parseFloat( valorUsuario );

  let arrayEtiquetas = etiquetasUsuario.split(', ');

  //Crear un nuevo gasto (función crearGasto)
  let gasto = new gestionPre.CrearGasto( desc, valorNumero, fecha, ...arrayEtiquetas );

  //Añadir el gasto a la lista (función anyadirGasto).
  gestionPre.anyadirGasto( gasto );

  //Llamar a la función repintar
  repintar();
}

//botón anyadirgasto
document.getElementById( "anyadirgasto" ).addEventListener( "click", nuevoGastoWeb );

function EditarHandle(){
  //método llamado handleEvent
  this.handleEvent = function(){

     //Pedir al usuario la información necesaria para editar el gasto mediante sucesivas preguntas con prompt. 
     let desc = prompt( "Introduzca una descripción", this.gasto.descripcion );
     let valor = prompt( "Introduzca un valor", this.gasto.valor );
     let fecha = prompt( "Introduzca una fecha con formato aaaa/mm/dd", this.gasto.fecha );
     let etiquetas = prompt( "Introduzca unas etiquetas separadas por comas", this.gasto.etiquetas );
   
     valor = parseFloat( valor );
   
     etiquetas = etiquetas.split(', ');

     //Actualizar las propiedades del gasto (disponible mediante this.gasto)
     this.gasto.actualizarDescripcion( desc );
     this.gasto.actualizarValor( valor );
     this.gasto.actualizarFecha( fecha );
     this.gasto.anyadirEtiquetas( ...etiquetas );

     //Llamar a la función repintar
     repintar();
  }
}

function BorrarHandle(){
  //método llamado handleEvent
  this.handleEvent = function(){

    //Borrar el gasto asociado
    gestionPre.borrarGasto( this.gasto.id );

    //Llamar a la función repintar
    repintar();
  }

}

function BorrarEtiquetasHandle(){
  //un método llamado handleEvent
  this.handleEvent = function(){

      //Borrar la etiqueta seleccionada del gasto asociado
    this.gasto.borrarEtiquetas(this.etiqueta);

      //Llamar a la función repintar
      repintar();
  }
}

//Función nuevoGastoWebFormulario
function nuevoGastoWebFormulario( event ){
  //Crear una copia del formulario web definido en la plantilla HTML. 
  let plantillaFormulario = document.getElementById( "formulario-template" ).content.cloneNode( true );

  //Acceder al elemento <form> dentro de ese fragmento de documento.
  var formulario = plantillaFormulario.querySelector( "form" );

 //Crear un manejador de evento para el evento submit del formulario
      formulario.addEventListener( "submit", anyadirElementoFormulario );

      //Crear un manejador de evento para el evento click del botón Cancelar del formulario. 
      let cancelar = new cancelarAnyadirGasto();
      var botonCancelarForm = plantillaFormulario.querySelector( "button.cancelar" );
      botonCancelarForm.addEventListener( "click", cancelar );

      //La variable formulario, para que al pulsar en cancelar se elimine el formulario.
      event.currentTarget.disabled = true;

      //añadir el fragmento de documento (variable plantillaFormulario) al final del <div id="controlesprincipales">
      let controles = document.getElementById( "controlesprincipales" );
      controles.append( plantillaFormulario );

}

//botón anyadirgasto-formulario
let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
botonAnyadirForm.addEventListener( "click", nuevoGastoWebFormulario );

//crear una función manejadora de este evento (con un único parámetro, el evento a procesar)
function anyadirElementoFormulario( event ){
  //Prevenir el envío del formulario (comportamiento por defecto) mediante event.preventDefault()
  event.preventDefault();

  //Crear un nuevo gasto con la información de los campos del formulario
  let arrayEtiquetas = event.currentTarget.etiquetas.value.split( ", " );
  let valorNumero = parseFloat( event.currentTarget.valor.value );
  let nuevoGastoForm = new gestionPre.CrearGasto( event.currentTarget.descripcion.value, valorNumero, event.currentTarget.fecha.value, ...arrayEtiquetas );

  //Añadir el gasto a la lista de gastos.
  gestionPre.anyadirGasto( nuevoGastoForm );

  //Llamar a la función repintar
  repintar();

  //Activar (eliminar atributo disabled) el botón anyadirgasto-formulario
  let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
  botonAnyadirForm.disabled = false;

  event.currentTarget.remove();
}

// función constructora que implemente handleEvent para botonCancelarForm
function cancelarAnyadirGasto(){
  //definir una función constructora que implemente handleEvent
  this.handleEvent = function(event){

    //La variable formulario, para que al pulsar en cancelar se elimine el formulario.
    event.currentTarget.remove();

    //La referencia al botón anyadirgasto-formulario, para que al pulsar en cancelar se vuelva a activar dicho botón
    document.getElementById("anyadirgasto-formulario").disabled = false;

    repintar();
  }
}

// Función filtrarGastosWeb
// manejadora de eventos del formulario formulario-filtrado
function filtrarGastosWeb(){
  this.handleEvent = function( ev ){

  //Prevenir el envío del formulario
    ev.preventDefault();

    //Recoger los datos del formulario formulario-filtrado
    let formfilt = ev.currentTarget;
    let descripcion = formfilt.elements['formulario-filtrado-descripcion'].value;
    let valorMin = formfilt.elements['formulario-filtrado-valor-minimo'].value;
    let valorMax = formfilt.elements['formulario-filtrado-valor-maximo'].value;
    let fechaDesde = formfilt.elements['formulario-filtrado-fecha-desde'].value;
    let fechaHasta = formfilt.elements['formulario-filtrado-fecha-hasta'].value;
    let etiquetas = formfilt.elements['formulario-filtrado-etiquetas-tiene'].value;

    valorMin = parseFloat( valorMin );
    valorMax = parseFloat( valorMax );

    //Si el campo formulario-filtrado-etiquetas-tiene tiene datos, llamar a la función transformarListadoEtiquetas
    if ( etiquetas =!null ){
      etiquetas = gestionPre.transformarListadoEtiquetas( etiquetas );
    }

    // Crear el objeto necesario para llamar a la función filtrarGastos del paquete gestionPresupuesto.js
    let gastosFiltro = new gestionPre.filtrarGastos ({fechaDesde: fechaDesde, fechaHasta: fechaHasta, valorMinimo: valorMin, valorMaximo: valorMax, descripcionContiene: descripcion, etiquetasTiene: etiquetas});

    // Llamar a la función filtrarGastos
    
    // Actualizar la lista de gastos filtrados en la capa listado-gastos-completo mediante la función mostrarGastoWeb
    let lista = document.getElementById('listado-gastos-completo');
        lista.innerHTML = '';

    for ( let gastos of gastosFiltro ){
      mostrarGastoWeb( "listado-gastos-completo", gastos );
    }
  }
}

//Una vez definida la función deberás añadirla como manejadora del evento submit del formulario formulario-filtrado
let gastosfiltrados = new filtrarGastosWeb();
document.getElementById( "formulario-filtrado" ).addEventListener( "submit", gastosfiltrados );


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 
//CCC