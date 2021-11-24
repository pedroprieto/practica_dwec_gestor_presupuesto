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

    let butEditForm = document.createElement("button");
    butEditForm.className = "gasto-editar-formulario";
    butEditForm.type = "button";
    butEditForm.innerHTML = "Editar (formulario)";

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

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;

    var formulario = plantillaFormulario.querySelector("form");

    let manEnvio1 = new manejadorEnvioForm();
    formulario.addEventListener("submit", manEnvio1);

    let manBorrar1 = new manejadorCancelForm();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manBorrar1);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    document.getElementById("controlesprincipales").append(formulario);
}

let butNuevoGastoForm = document.getElementById("anyadirgasto-formulario");
butNuevoGastoForm.addEventListener("click", nuevoGastoWebFormulario);

function manejadorEnvioForm()
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

        let gastoNuevo = new gesPres.CrearGasto(desc, valor, fecha, etiquetasSeparadasSplit);

        gesPres.anyadirGasto(gastoNuevo);

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function manejadorCancelForm()
{
    this.handleEvent = function (e)
    {
        e.target.form.remove();  
        document.getElementById("anyadirgasto-formulario").disabled = "";

        repintar();   
    }
}

function EditarHandleFormulario()
{
    this.handleEvent = function (e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;

        var formulario = plantillaFormulario.querySelector("form");
        
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        let form = e.currentTarget;
        form.disabled = true;
        e.currentTarget.after(formulario);

        let gastoForm = new EditarHandleCopiaForm();
        gastoForm.gasto = this.gasto;

        formulario.addEventListener("submit", gastoForm);

        let manBorrar1 = new manejadorCancelForm();
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manBorrar1);
    }
}

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