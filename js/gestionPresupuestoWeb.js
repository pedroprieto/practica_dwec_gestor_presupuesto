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
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

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

    // BOTÓN ENVIAR API
        // Localizamos el botón 
        let enviarApi = form.querySelector("button.gasto-enviar-api");
        enviarApi.addEventListener("click", enviarHandlerGastoApi);

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
    // BOTÓN BORRAR API 
        // Crear un botón con texto Borrar (API) de tipo button
        let botonBorrarAPI = document.createElement("button");
        botonBorrarAPI.type ="button";
        botonBorrarAPI.className = "gasto-borrar-api";
        botonBorrarAPI.textContent = "Borrar (API)";

        // Crear un nuevo objeto a partir de la función constructora BorrarHandleAPI
        let evBorrarAPI = new BorrarHandleAPI();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evBorrarAPI.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Borrar
        botonBorrarAPI.addEventListener("click", evBorrarAPI);

        // Añade al DOM
        divGasto.append(botonBorrarAPI);

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
    //------------------------------------------------------------//    

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

        // Busco en el formulario el botton cuya clase es gasto-enviar-api 
        let editarFormApi = form.querySelector("button.gasto-enviar-api");

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        editarFormApi.gasto = this.gasto;

        // Añade el objeto al manejador del evento click del botón editarFormApi
        editarFormApi.addEventListener("click", handleEnviarEditarAPI);
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
    document.getElementById("listado-gastos-completo").innerHTML = ``;

    // Mostrar el listado completo de gastos en div#listado-gastos-completo
    let gastos = gestionPresupuesto.listarGastos();

    for ( let gasto of gastos ){
        mostrarGastoWeb( "listado-gastos-completo", gasto );
    }

    // Librerías externas
    let periodoDia = "dia";
    let gastosDia = gestionPresupuesto.agruparGastos(periodoDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

    let periodoMes = "mes";
    let gastosMes = gestionPresupuesto.agruparGastos(periodoMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let periodoAnyo = "anyo";
    let gastosAnyo = gestionPresupuesto.agruparGastos(periodoAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");
}

//------------------------------------------------------------//
// GASTOS AGRUPADOS SEGÚN CRITERIOS
function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){
    // Crea dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
        
    //let mostrarAgrupacion = document.getElementById(idElemento);
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
        divP.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    divP.append(chart);
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

        // Si no existe la clave, llama con un array vacio
        if( !cargarGastos )
        {
            gestionPresupuesto.cargarGastos([]);
        }
        else {
            gestionPresupuesto.cargarGastos( cargarGastos );
        }

        // Lamamos a la función repintar
        repintar();
    }
}

//------------------------------------------------------------//
// API

async function cargarGastosApi(){

    // Obtener el usuario
    let usuario = document.getElementById('nombre_usuario').value;

    // Creo la URL con el usuario introducido en el control input#nombre_usuario
    let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;

    // LISTA DE GASTOS DE LA API
    try 
    {
        // Obtengo mediante fetch el listado de gastos a través de la API de servidor
        let datos = await fetch(url);

        // Una vez obtenida la lista de gastos de la API
            // llamo a cargarGastos para actualizar el array de gastos
        if( datos.ok ){
            let json = await datos.json();            
            gestionPresupuesto.cargarGastos(json);

            // Una vez cargados los gastos llamo a repintar
            repintar()
        }
        else {
            alert("Error-HTTP: "+ datos.status);
        }
    }  
    catch(e) {
        console.log(e);
    }
}

function BorrarHandleAPI(){
    this.handleEvent = async function(e){

        // Obtener el usuario
        let usuario = document.getElementById('nombre_usuario').value;

        // Creo la URL con el usuario introducido en el control input#nombre_usuario y el id del gasto actual
        let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario + `/${this.gasto.gastoId}`;

        // Realiza mediante fectch una solicitud Delete a la url de la API
        fetch( url, {
            method: "DELETE"
        })
        .then( Response => {
            // .then -> Debo esperar a que termine el fetch pata que la lista se actualice correctamente
            if( Response ){
                // Llamar a la función cargarGastosApi para actualizar la lista en la página
                cargarGastosApi();
            }
        })
    }
}

function enviarHandlerGastoApi(event){

    // Obtener el usuario
    let usuario = document.getElementById("nombre_usuario").value;

    // Creo la URL con el usuario introducido en el control input#nombre_usuario
    let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;

    //------------------------------------------------------------//
    // El contenido de la petición POST se obtiene a partir del formulario de creación
        // Acceso al formulario
        let form = event.currentTarget.form;

        // Recojo las propiedades del gasto
        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;    

        // Convertir el valor a número
        valor = parseFloat(valor);

        // Recojo las etiquetas
        let arrayetiquetas = etiquetas.split(",");

        // Crear un nuevo gasto API
        let gastoAPI = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...arrayetiquetas);

    //------------------------------------------------------------//
    // Realiza mediente fetch una solicitud POST a la url correspondiente de la API
    fetch( url, {
        method: 'POST', 
        body: JSON.stringify(gastoAPI),
        headers:{'Content-Type': 'application/json'}
    })
    .then( Response => {
        // .then -> Debo esperar a que termine el fetch pata que la lista se actualice correctamente
        if( Response ){
            // Llamar a la función cargarGastosApi para actualizar la lista en la página
            cargarGastosApi();
        }
        else{
            alert("Error al actualizar los gastos");
        }
    })
}

function handleEnviarEditarAPI(event){
    
    // Obtener el usuario
    let usuario = document.getElementById("nombre_usuario").value;

    // Creo la URL con el usuario introducido en el control input#nombre_usuario y el id del gasto actual
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

    //------------------------------------------------------------//
    // El contenido de la petición PUT se obtiene a partir del formulario de edición
        // Acceso al formulario
        let form = event.currentTarget.form;

        // Recojo las propiedades del gasto
        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;    

        // Convertir el valor a número
        valor = parseFloat(valor);

        // Recojo las etiquetas
        let arrayetiquetas = etiquetas.split(",");

        // Crear un nuevo gasto API
        let gastoAPI = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...arrayetiquetas);

    // Realiza mediente fetch una solicitud PUT a la url correspondiente de la API
    fetch( url, {
        method: 'PUT', 
        body: JSON.stringify(gastoAPI),
        headers:{'Content-Type': 'application/json'}
    })
    .then( Response => {
        // .then -> Debo esperar a que termine el fetch pata que la lista se actualice correctamente
        if( Response ){
            // Llamar a la función cargarGastosApi para actualizar la lista en la página
            cargarGastosApi();
        }
        else{
            alert("Error al actualizar los gastos");
        }
    })
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 