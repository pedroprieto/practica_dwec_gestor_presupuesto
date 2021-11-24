import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{   
    document.getElementById(idElemento).innerHTML = valor;
}

//Modificación de la función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto)
{
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";   
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas";

    div1.append(gasto.descripcion);
    div2.append(gasto.fecha);
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${etiqueta},`);
        div4.append(span);
        
        let manejadorBorrarEtiq =  new BorrarEtiquetasHandle();

        manejadorBorrarEtiq.gasto = gasto;

        manejadorBorrarEtiq.etiqueta = etiqueta;

        span.addEventListener("click", manejadorBorrarEtiq);
    }   

    let contenido = document.getElementById(idElemento);
    
    contenido.append(div);  

    let butEdit = document.createElement("button");
    butEdit.className = "gasto-editar";
    butEdit.type = "button";
    butEdit.innerHTML = "Editar";

    let manejadorEdit = new EditarHandle();
    
    manejadorEdit.gasto = gasto;

    butEdit.addEventListener("click", manejadorEdit);
    div.append(butEdit);

    let butBorrar = document.createElement("button");
    butBorrar.className = "gasto-borrar";
    butBorrar.type = "button";
    butBorrar.innerHTML = "Borrar";

    let manejadorBorrar = new BorrarHandle();

    manejadorBorrar.gasto = gasto;

    butBorrar.addEventListener("click", manejadorBorrar);

    div.append(butBorrar);

    //Añade un segundo botón de edición a la estructura HTML de cada gasto. 
    let butEditForm = document.createElement("button");
    butEditForm.className = "gasto-editar-formulario";
    butEditForm.type = "button";
    butEditForm.innerHTML = "Editar (formulario)";

    //Este botón deberá asociarse a un evento click asociado a un objeto 
    //manejador de eventos basado en la función constructora EditarHandleFormulario siguiendo la técnica indicada en la práctica anterior.
    let manejadorEditarForm = new EditarHandleFormulario();
    manejadorEditarForm.gasto = gasto;
    butEditForm.addEventListener("click", manejadorEditarForm);  

    div.append(butEditForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;
 
    div.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        span.append("Clave: " + clave);
        span1.append(" Valor: " + valor);
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    let contenido = document.getElementById(idElemento);

    contenido.append(div);
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let gastos = gesPres.listarGastos();

    for (let g of gastos) {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuestoActualizado = prompt("Introduce un nuevo presupuesto");

    presupuestoActualizado = parseFloat(presupuestoActualizado);

    gesPres.actualizarPresupuesto(presupuestoActualizado);

    repintar(); 
}

let butActualizar = document.getElementById("actualizarpresupuesto");
butActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcionGastoNuevo = prompt("Introduce la descripción");
    let valorGastoNuevo = prompt("Introduce el gasto");
    let fechaGastoNuevo = prompt("Introduce la fecha");
    let etiquetasGastoNuevo = prompt("Introduce la etiqueta");

    valorGastoNuevo = parseFloat(valorGastoNuevo);

    let etiquetasSeparadasSplit = etiquetasGastoNuevo.split(',');

    let gastoNuevo = new gesPres.CrearGasto(descripcionGastoNuevo, valorGastoNuevo, fechaGastoNuevo, etiquetasSeparadasSplit);

    gesPres.anyadirGasto(gastoNuevo);

    repintar();
}

let butAnyadirGasto = document.getElementById("anyadirgasto");
butAnyadirGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function(e)
    {
        let desc = prompt("Por favor, introduce la descripción");
        let valor = prompt("Por favor, introduce el gasto");
        let fecha = prompt("Por favor, introduce la fecha");
        let etiqueta = prompt("Por favor, introduce la etiqueta");

        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSeparadasSplit);

        repintar();
    }
}

function BorrarHandle() 
{
    this.handleEvent = function (e) 
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (e)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

/* 
tutoría 15 nov. Todo lo que se menciona de interés.
en html 
<body>
<h1> hola mundo </h1>

<div id="componentes">
</div>

<template id="tmpl">
    <div class="message">Plantilla</div>
</template>

en javascript:

    let plantilla = document.getElementById("tmpl");

    let nuevoEl = plantilla.content.cloneNode(true);

    en el HTML, dentro de body: <div id="componentes"> </div>

    document.getElementById("componentes").append(nuevoEl);

    (Ahora ya nos saldría Plantilla escrito en el HTML.

    //nuevoEl.getElementById("valor").value = 54;

function manejadorBoton(){
    this.handleEvent = function (e)
    //Accede a la plantilla
        let plantilla = document.getElementById("tmpl");
    //Copia la plantilla
        let nuevoEl = plantilla.content.cloneNode(true);

    //Personalizar el formulario: añadir
    let manEnvio1 = new manejadorEnvioForm();
    //Paso la información necesaria y se lo asigno al botón.
    // manEnvio1.gasto = this.gasto;
    //eventos para envío y cancelación
    let botonEnvio = nuevoEl.querySelector("button[type=submit]");
    botEnvio.AddEventListener("click", manEnvio1);

    La práctica pide que encontremos el formulario y controlar el submit, por lo que no es el click si no el enviar.
    let form = nuevoEl.querySelector("form");
    form.AddEventListener("submit", manEnvio1);

    //También podemos hacer que se desactive el botón. 
        e.target.disabled ="disabled";

    //Insértala
        document.getElementById("componentes").append(nuevoEl);
    //Donde? en componentes o donde elijamos.

    //boton cancelar
    let manBorrar1 = new manejadorCancelForm();
    
    manBorrar1.botonCrearFormulario = e.target;

    let botonCancelar = nuevoEl.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manBorrar1);

    }
}
function manejadorEnvioForm(){
    this.handleEvent = function (e)
    //Para que no se recarga la pagina usamos:
    e.preventDefault();

    alert("envio formulario");

function manejadorCancelForm(){
    this.handleEvent = function (e){
        //borrarmos el formulario
        e.target.form.remove();
        //volvemos a activar el boton 
        this.botonCrearFormulario.disabled ="";
    }

let boton = document.getElementById("crearForm");

let manejadorboton1 = new manejadorBoton();
manejadorboton1.gasto = gasto;

boton.addEvenListener("click", manejadorboton1);
*/

//Esta función se utilizará como manejadora de eventos del botón anyadirgasto-formulario del código HTML. Realizará las siguientes tareas:
function nuevoGastoWebFormulario() {
    //Crear una copia del formulario web definido en la plantilla HTML. El código a utilizar es el siguiente:
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    //Desde este momento, la variable plantillaFormulario almacena un nuevo fragmento de documento correspondiente al elemento <template>. 
    //Posteriormente lo añadiremos a la página y se insertará su contenido (el elemento <form> que hay en su interior).

    //Acceder al elemento <form> dentro de ese fragmento de documento. Para ello podemos utilizar por ejemplo:
    var formulario = plantillaFormulario.querySelector("form");
    //Desde este momento, la variable formulario almacena el nodo formulario que vamos a crear.

    //Crear un manejador de evento para el evento submit del formulario. Utilizaremos addEventListener.
    let manEnvio1 = new manejadorEnvioForm();
    formulario.addEventListener("submit", manEnvio1);

    //Crear un manejador de evento para el evento click del botón Cancelar del formulario. Para ello deberemos localizar dicho botón 
    //(por ejemplo, mediante formulario.querySelector("button.cancelar")). Utilizaremos addEventListener junto con un objeto manejador 
    //de eventos siguiendo la técnica de la práctica anterior
    //Ejemplo tutoria: let botonCancelar = nuevoEl.querySelector("button.cancelar");
    let manBorrar1 = new manejadorCancelForm();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manBorrar1);

    //Desactivar (añadir atributo disabled) el botón anyadirgasto-formulario.
    //Probando el porque no iba, he probado a darle la propiedad disabled directamente. Seguía sin ir, pero es más "limpio".
    document.getElementById("anyadirgasto-formulario").disabled = true;

    //Por último, añadir el fragmento de documento (variable plantillaFormulario) al final del 
    //<div id="controlesprincipales"> para que se muestre en la página.
    //Ejemplo tutoria: document.getElementById("componentes").append(nuevoEl);
    document.getElementById("controlesprincipales").append(formulario);
}

//Esta función se utilizará como manejadora de eventos del botón anyadirgasto-formulario
let butNuevoGastoForm = document.getElementById("anyadirgasto-formulario");
butNuevoGastoForm.addEventListener("click", nuevoGastoWebFormulario);

//Cojo los dos ejemplos del vídeo para los manejadores y les añado cosas que pide la práctica.
//Deberás crear una función manejadora de este evento (con un único parámetro, el evento a procesar) que realice las siguientes tareas:
function manejadorEnvioForm()
{
    this.handleEvent = function (e) 
    {
        //Prevenir el envío del formulario (comportamiento por defecto) mediante event.preventDefault()
        //Para que no se recarga la pagina usamos:
        e.preventDefault();

        //Crear un nuevo gasto con la información de los campos del formulario. Recuerda que la función manejadora tiene acceso al evento, 
        //que a su vez tiene acceso al elemento que lo ha provocado (el formulario) desde event.currentTarget. Una vez tenemos acceso al formulario,
        //podemos acceder a sus campos y sus valores
        let form = e.currentTarget;

        //Igual que haciamos con prompt pero esta vez accediendo a través del formulario como se muestra en el manual.
        let desc = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiqueta = form.elements.etiquetas.value;

        //El error del primer test es que me he dejado el float de valor y por eso no pasaba la primera prueba. 
        //Además, añado también las etiquetas.split,que no suma pero tampoco resta.
        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        //Crear un nuevo gasto con la información de los campos del formulario. 
        let gastoNuevo = new gesPres.CrearGasto(desc, valor, fecha, etiquetasSeparadasSplit);

        //Añadir el gasto a la lista de gastos.
        gesPres.anyadirGasto(gastoNuevo);

        //Llamar a la función repintar.
        repintar();

        //Activar (eliminar atributo disabled) el botón anyadirgasto-formulario (lo habremos desactivado al activar el formulario)
        //Lo buscaremos por su id mediante document.getElementById.
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

//El ejemplo de la tutoría tal cual, modificado para desactivar el boton de añadir gasto (formulario).
function manejadorCancelForm()
{
    this.handleEvent = function (e)
    {
        //borrarmos el formulario
        e.target.form.remove();  
        //volvemos a activar el boton añadir gasto (formulario).
        document.getElementById("anyadirgasto-formulario").disabled = "";

        //El último test estaba dando error porque no lo estamos habilitando después de cancelar. 
        //Podemos devolverlo a su estado por defecto que será activo después de repintar.
        //En la tutoría del 15 hablas de que lo ideal sería hacer una función global para el estado normal o estado editando 
        //y que los manejadores sólo cambien el estado y se encargue el repintar para componer la interfaz en función del estado.
        repintar();   
    }
}

//La función EditarHandleFormulario será una función constructora que definirá exclusivamente un método llamado handleEvent.
//Esta técnica es la misma que utilizamos en la práctica anterior, pero sin usar prompt, sino que pintará un formulario para que el usuario introduzca datos.
function EditarHandleFormulario()
{
    //Esta función (handleEvent) realizará las mismas tareas que nuevoGastoWebFormulario, con las siguientes diferencias:
    this.handleEvent = function (e)
    {
        //Crear una copia del formulario web definido en la plantilla HTML. El código a utilizar es el siguiente:
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        //Desde este momento, la variable plantillaFormulario almacena un nuevo fragmento de documento correspondiente al elemento <template>. 
        //Posteriormente lo añadiremos a la página y se insertará su contenido (el elemento <form> que hay en su interior).

        //Acceder al elemento <form> dentro de ese fragmento de documento. Para ello podemos utilizar por ejemplo:
        var formulario = plantillaFormulario.querySelector("form");
        //Desde este momento, la variable formulario almacena el nodo formulario que vamos a crear.
        
        //A la hora de crear el formulario, deberá actualizar los campos del formulario con la información del gasto que se está editando. 
        //El formulario debe quedar con los campos rellenos al abrirse. Recuerda que esta función tendrá acceso a los datos del gasto que se esté editando en this.gasto.
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //Esta función se utilizará para crear el objeto manejador de eventos para editar un gasto a través de un formulario. 
        //Como en el ejemplo, abrimos el editar formulario, lo mostramos y lo deshabilitamos para no volver a pulsar.
        let form = e.currentTarget;
        form.disabled = true;
        e.currentTarget.after(formulario);

        //El manejador de eventos del evento submit del formulario no será una función, sino un objeto manejador de eventos, ya que necesita acceder al gasto para actualizarlo.
        //Por tanto, debe utilizarse la misma técnica utilizada en la práctica anterior: definir una función constructora que implemente handleEvent, 
        //crear un objeto basado en ese constructor y añadir el gasto como propiedad adicional de dicho objeto.
        let gastoForm = new EditarHandleCopiaForm();
        gastoForm.gasto = this.gasto;

        //El manejador de eventos del evento submit no tendrá que volver a habilitar el botón de Editar, ya que la función repintar se encarga de volver a mostrar el listado de 
        //gastos creando la estructura nueva (botones de Editar y Borrar incluidos, sin ningún atributo disabled).
        formulario.addEventListener("submit", gastoForm);

        //Puedes utilizar la misma función constructora que has creado para el botón Cancelar de nuevoGastoWebFormulario: la funcionalidad es la misma, así que solo tendrás 
        //que crear un objeto basado en ese constructor y pasar las referencias correspondientes al formulario y al botón del gasto que estés editando.
        let manBorrar1 = new manejadorCancelForm();
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manBorrar1);
    }
}

//Copiamos el EditarHandle que teniamos creado y lo modificamos para acceder desde form.
function EditarHandleCopiaForm() 
{
    this.handleEvent = function (e) 
    {
        e.preventDefault();
        let form = e.currentTarget;

        let desc = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiqueta = form.elements.etiquetas.value;

        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSeparadasSplit);

        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}