import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId( idElemento, valor ){
// Escribe el valor (texto) en el elemento HTML con id idElemento indicado
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto.innerHTML = `${valor}`;
}

//------------------------------------------------------------//
//------------BOTONES Y SUS MANEJADORES DE EVENTOS------------

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

let filtrado = new filtrarGastosWeb(); 
document.getElementById("formulario-filtrado").addEventListener("submit", filtrado);

let guardar = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener("click", guardar);

let cargar = new cargarGastosWeb();
document.getElementById("cargar-gastos").addEventListener("click", cargar);

//------------------------------------------------------------//
// -----------------ACTUALIZAR PRESUPUESTO---------------------
function actualizarPresupuestoWeb() {

    // Pedir al usuario que introduzca un presupuesto mediante un prompt
    let presupuestoString = prompt('Introduzca un presupuesto');

    // Convertir el valor a número
    let presupuestoNumber = parseInt(presupuestoString);

    // Actualicar el presupuesto  y llamar a la función repintar() 
    gestionPresupuesto.actualizarPresupuesto(presupuestoNumber);
    repintar();
}

//------------------------------------------------------------//
// ------------------------NUEVO GASTO------------------------
function nuevoGastoWeb() {

    // Pedir al usuario la información necesaria para crear un nuevo gasto
    let desc = prompt("Introduce una descripción");
    let valorString = prompt("Introduce un valor");
    let fecha = prompt("Introduce una fecha");
    let etiquetaString = prompt("Introduce una/s etiqueta/s");

    // Conversión de string a float
    let valorNumber = parseFloat(valorString);

    // Separo el string y guardo cada elemento en un array
    let arrayEtiquetas = etiquetaString.split(', ');

    // Crear el nuevo gasto
    let gasto = new gestionPresupuesto.CrearGasto( desc, valorNumber, fecha, arrayEtiquetas );
    gestionPresupuesto.anyadirGasto(gasto);

    // Llamar a la función repintar
    repintar();
}

//------------------------------------------------------------//
// --------------NUEVO GASTO FORMULARIO------------------------
function nuevoGastoWebFormulario(){

    // Crear una copia del formulario web definido en la plantilla HTML
    let template = document.getElementById("formulario-template").content.cloneNode(true);

    // Acceder al elemento <form> dentro de ese fragmento de documento
    let form = template.querySelector("form");

    let formTemplate = document.getElementById("controlesprincipales");
    formTemplate.append(form);

    // DESHABILITAR BOTÓN
        // Buscamos el botón mediante su id
        let botonanyadirform = document.getElementById("anyadirgasto-formulario");
        botonanyadirform.disabled = true;

    // BOTÓN SUBMIT
        // Crear un manejador de evento para el evento submit del formulario
        let SubmitNuevoHandle = new SubmitNuevoHandleForm();
        form.addEventListener("submit", SubmitNuevoHandle);

    // BOTÓN CANCELAR
        // Crear un manejador de evento para el evento click del botón Cancelar del formulario
        let handleCancel = new cancelHandleForm();        

        // Localizamos el botón 
        let btnCancelar = form.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", handleCancel);

    repintar();
}

//------------------------------------------------------------//
// ------------------MOSTRAR UN GASTO-------------------------
function mostrarGastoWeb( idElemento, gasto ){
// Añade dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro 

    //------------------------------------------------------------//
    // CREO LA ESTRUCTURA HTML DEL GASTO
        let body = document.getElementById(idElemento);
    
        // <div class="gasto">        
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";

            // <div  class="gasto-descripcion">
            let divDescripcion = document.createElement('div');
            divDescripcion.className = "gasto-descripcion";
            divDescripcion.innerHTML = `${gasto.descripcion}`;
            // </div>

            // <div  class="gasto-fecha">
            let divFecha = document.createElement('div');
            divFecha.className = "gasto-fecha";
            divFecha.innerHTML = `${gasto.fecha}`;
            // </div>

            // <div  class="gasto-valor">
            let divValor = document.createElement('div');
            divValor.className = "gasto-valor";
            divValor.innerHTML = `${gasto.valor}`;
            // </div>

            // <div  class="gasto-etiquetas">
            let divEtiquetas = document.createElement('div');
            divEtiquetas.className = "gasto-etiquetas";
            // </div>
        // </div>

        // Añadir hijos al padre <div class="gasto">
        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // MOSTRAR Y BORRAR ETIQUETAS 
    for (let e of gasto.etiquetas) {

        // Crear un elemento HTML <span></span> para las etiquetas
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";

        spanEtiqueta.innerHTML = `${e}`;     
           
        divEtiquetas.append(spanEtiqueta);

        // Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle
        let evBorrarEti = new BorrarEtiquetasHandle();

        // Establecer las propiedades gasto y etiqueta  
        evBorrarEti.gasto = gasto;
        evBorrarEti.etiqueta = e;

        // Añade el objeto al manejador del evento click del span de la etiqueta
        spanEtiqueta.addEventListener('click', evBorrarEti);
    }
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // BOTÓN EDITAR GASTO
        // Crear un botón con texto Editar de tipo button
        let botonEditar = document.createElement('button');        
        botonEditar.className = "gasto-editar";
        botonEditar.id = "gasto-editar";
        botonEditar.type = "button";
        botonEditar.innerHTML = "Editar gasto";

        // Crear un nuevo objeto a partir de la función constructora EditarHandle
        let evEditar = new EditarHandle();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evEditar.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Editar
        botonEditar.addEventListener("click", evEditar);

        // Añade al DOM
        divGasto.append(botonEditar);
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // BOTÓN BORRAR GASTO 
        // Crear un botón con texto Borrar de tipo button
        let botonBorrar = document.createElement('button');
        botonBorrar.className = "gasto-borrar";
        botonBorrar.id = "gasto-borrar";
        botonBorrar.type = "button";
        botonBorrar.innerHTML = "Borrar gasto";

        // Crear un nuevo objeto a partir de la función constructora BorrarHandle
        let evBorrar = new BorrarHandle();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evBorrar.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Borrar
        botonBorrar.addEventListener("click", evBorrar);

        // Añade al DOM
        divGasto.append(botonBorrar);
    //------------------------------------------------------------//    

    //------------------------------------------------------------//
    // BOTÓN EDITAR FORMULARIO 
        // Crear un botón con texto Editar Formulario de tipo button
        let botonEditarForm = document.createElement("button");
        botonEditarForm.type ="button";
        botonEditarForm.className = "gasto-editar-formulario";
        botonEditarForm.textContent = "Editar (formulario)";

        // Crear un nuevo objeto a partir de la función constructora EditarHandleForm
        let evEditarForm = new EditarHandleForm();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evEditarForm.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Borrar
        botonEditarForm.addEventListener("click", evEditarForm);

        // Añade al DOM
        divGasto.append(botonEditarForm);

    // Añado todo al DOM
    body.append(divGasto);
}

//------------------------------------------------------------//
// ---------------FUNCIONES CONSTRUCTORAS----------------------

// EVENTO <BOTÓN> ENVIAR NUEVO GASTO FORMULARIO
function SubmitNuevoHandleForm(){
    this.handleEvent = function(e){

        // Prevenir el envío del formulario
        e.preventDefault();

        // Acceso al formulario
        let actual = e.currentTarget;

        // Recojo las propiedades del gasto
        let newDesc = actual.elements.descripcion.value;
        let newValor = actual.elements.valor.value;
        let newFecha = actual.elements.fecha.value;
        let newEtiquetas = actual.elements.etiquetas.value;

        // Convertir el valor a número
        newValor = parseFloat(newValor);

        // Convertir string a array
        newEtiquetas = newEtiquetas.split(',');

        // Creo un nuevo gasto
        let gasto = new gestionPresupuesto.CrearGasto(newDesc, newValor, newFecha, newEtiquetas);
        gestionPresupuesto.anyadirGasto(gasto);

        // Habilito el botón 
        let anyadirGasto = document.getElementById("anyadirgasto-formulario");
        anyadirGasto.disabled = false;

        // Llamar a la función repintar
        repintar();
    }
}

//------------------------------------------------------------//
// EVENTO <BOTÓN> CANCELAR ENVÍO FORMULARIO
function cancelHandleForm(){
    this.handleEvent = function(event){

        // Borro los datos actuales del formulario
        event.currentTarget.parentNode.remove();

        // Habilito el botón
        document.getElementById("anyadirgasto-formulario").disabled = false;

        // Llamar a la función repintar
        repintar();
    }
}

//------------------------------------------------------------//
// EVENTO <BOTÓN> SUBMIT EDITAR GASTO FORMULARIO
function SubmitEditarHandleForm(){
    this.handleEvent = function(event){
        
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

//------------------------------------------------------------//
// EVENTO <BOTÓN> EDITAR GASTO FORMULARIO
function EditarHandleForm(){
    this.handleEvent = function(event){

        // Crear una copia del formulario web definido en la plantilla HTML
        let plantillaForm = document.getElementById('formulario-template').content.cloneNode(true);

        // Acceder al elemento <form> dentro de ese fragmento de documento
        let form = plantillaForm.querySelector('form');

        // Elemento que provoca el evento
        event.currentTarget.after(form);
        let botonEditar = event.currentTarget;
        botonEditar.disabled = true;

        // Actualizar los campos del formulario con la información del gasto que se está editando
        form.elements.descripcion.value = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

        //  Función constructora para acceder al gasto y actualizarlo
        let Submit = new SubmitEditarHandleForm();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        Submit.gasto = this.gasto;

        // Añade el objeto al manejador del evento click del botón Submit
        form.addEventListener('submit', Submit);

        //  Función constructora para cancelar la edición
        let handleCancel = new cancelHandleForm(); 

        // Busco en el formulario el botton cuya clase es cancelar 
        let btnCancelar = form.querySelector("button.cancelar");

        // Añade el objeto al manejador del evento click del botón Cancelar
        btnCancelar.addEventListener("click", handleCancel);
    }
}

//------------------------------------------------------------//
// EVENTO <BOTÓN> EDITAR GASTO
function EditarHandle(){
    this.handleEvent = function(e){

       // Pedir al usuario la información necesaria para editar el gasto
       let desc = prompt("Introduce una descripción", this.gasto.descripcion);
       let valor = prompt("Introduce un valor", this.gasto.valor);
       let fecha = prompt("Introduce una fecha", this.gasto.fecha);
       let etiq = prompt("Introduce una/s etiqueta/s", this.gasto.etiquetas);

       // Convertir el valor a número
       valor = parseFloat(valor);

       // Convertir string a array
       etiq = etiq.split(',');

       // Actualizar las propiedades del gasto
       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(valor);
       this.gasto.actualizarFecha(fecha);
       this.gasto.anyadirEtiquetas(...etiq);

       // Llamar a la función repintar
       repintar();
    }
}

//------------------------------------------------------------//
// EVENTO <BOTÓN> BORRAR GASTO
function BorrarHandle(){
    this.handleEvent = function(e){

        // Borrar el gasto asociado y llamar a la función repintar()
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

//------------------------------------------------------------//
// EVENTO <SPAN> BORRAR ETIQUETAS
function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        // Borrar la etiqueta seleccionada del gasto asociado y llamar a la función repintar() 
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//------------------------------------------------------------//
// --------------ACTUALIZAR LISTADO GASTOS---------------------
function repintar() {
// Vuelve a cargar los datos en el HTML reflejando los cambios

    // Mostrar el presupuesto en el div#presupuesto
    mostrarDatoEnId( "presupuesto", gestionPresupuesto.mostrarPresupuesto() );

    // Mostrar los gastos totales en div#gastos-totales
    mostrarDatoEnId( "gastos-totales", gestionPresupuesto.calcularTotalGastos() );

    // Mostrar el balance total en div#balance-total
    mostrarDatoEnId( "balance-total", gestionPresupuesto.calcularBalance() );

    // Borro el anterior listado completo de gastos de div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = '';

    // Mostrar el listado completo de gastos en div#listado-gastos-completo
    let gastos = gestionPresupuesto.listarGastos();

    for ( let gasto of gastos ){
        mostrarGastoWeb( "listado-gastos-completo", gasto );
    }
}

//------------------------------------------------------------//
// GASTOS AGRUPADOS SEGÚN CRITERIOS
function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){
    // Crea dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro
        
    let mostrarAgrupacion = document.getElementById(idElemento);
        let arrayAgrupacion = "";

        // Añado el array de los gastos agrupados por un periodo
        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }

        // Voy añadiendo la agrupacones de gastos
        mostrarAgrupacion.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;
}

function filtrarGastosWeb(){
    this.handleEvent = function(e)
    {
        e.preventDefault();
    
        //Cogemos los datos del formulario
        let form = e.currentTarget;

        let descripcion = form.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = form.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetas = form.elements['formulario-filtrado-etiquetas-tiene'].value;

        // Convertir el valor a número
        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);

        //Si tiene etiquetas
        if( etiquetas != null ){
            etiquetas = gestionPresupuesto.transformarListadoEtiquetas ( etiquetas );
        }

        // Pasandole los parametros para filtrar al objeto
        let gastosFiltro = gestionPresupuesto.filtrarGastos({
            etiquetasTiene: etiquetas,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta,
            valorMinimo: valorMinimo,
            valorMaximo: valorMaximo,
            descripcionContiene: descripcion,
        });

        // Limpiamos el listado de gastos
        let lista = document.getElementById('listado-gastos-completo');
        lista.innerHTML = '';

         // Mostrar el listado filtrado de gastos
        for(let gasto of gastosFiltro){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}

//------------------------------------------------------------//
// GUARDAR Y CARGAR GASTOS

function guardarGastosWeb(){ 
    this.handleEvent = function(e){

        localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
    }
}    

function cargarGastosWeb(){
    this.handleEvent = function(e){

        // Recoge el listado de gastos por medio de la clave
        let cargarGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));

        gestionPresupuesto.cargarGastos( cargarGastos );

        // Si no existe la clave, llama con un array vacio
        if( !cargarGastos )
        {
            gestionPresupuesto.cargarGastos([]);
        }

        // Lamamos a la función repintar
        repintar();
    }
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 