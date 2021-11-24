import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{   
    document.getElementById(idElemento).innerHTML = valor;
}

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
tutoría 15 nov.
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}