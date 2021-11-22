import * as gesPres from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento, valor)
{
    let contenedor = document.getElementById(idElemento);
    
    contenedor.textContent = `${valor}`;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let div1 = document.createElement("div");
    let h1 = document.createElement("h1");
    
    div1.className = "agrupacion";

    h1.innerHTML = `Gastos agrupados por ${periodo}`;

    div1.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div = document.createElement("div");
        div.className = "agrupacion-dato";

        let span1 = document.createElement("span");
        let span2 = document.createElement("span");

        span1.className = "agrupacion-dato-clave";
        span1.append(`Clave: ${clave}`);
        div.append(span1);

        span2.className = "agrupacion-dato-valor";
        span2.append(`Valor: ${valor}`);
        div.append(span2);

        div1.append(div);
    }

    let contenido = document.getElementById(idElemento);

    contenido.append(div1);
}

function mostrarGastoWeb(idElemento, gasto)
{
    let contenido = document.getElementById(idElemento);

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    let evEditarForm = new EditarHandleformulario();
    evEditarForm.gasto = gasto;

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let div5 = document.createElement("div");

    div1.className = "gasto";

    div2.className = "gasto-descripcion";
    div2.append(gasto.descripcion);

    div3.className = "gasto-fecha";
    div3.append(gasto.fecha);

    div4.className = "gasto-valor";
    div4.append(gasto.valor);

    div1.append(div2);
    div1.append(div3);
    div1.append(div4);

    div5.className = "gasto-etiquetas";

    for (let e of gasto.etiquetas)
    {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.append(gasto.etiquetas);

        div5.append(span);

        //Borrado etiquetas
        let evEtiquetas = new BorrarEtiquetasHandle();
        evEtiquetas.gasto = gasto;
        evEtiquetas.etiqueta = e;

        span.addEventListener("click", evEtiquetas);
    }

    div1.append(div5);

    //Boton Editar
    let btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    //Boton borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    //Boton editar formulario
    let btnEditarForm = document.createElement("button");
    btnEditarForm.type = "button";
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.textContent = "Editar (formulario)";

    btnEditarForm.addEventListener("click", evEditarForm);

    div1.append(btnEditar);
    div1.append(btnBorrar);
    div1.append(btnEditarForm);
    contenido.append(div1);
}

//Manejadora de eventos
function actualizarPresupuestoWeb()
{
    let presu = prompt("Introduzca un presupuesto");

    let presuNum = parseFloat(presu);

    gesPres.actualizarPresupuesto(presuNum);

    repintar();
}


//Manejadora de eventos
function nuevoGastoWeb()
{
    let desc = prompt("Introduce una descripcion");
    let valor = parseFloat(prompt("Introduce un valor"));
    let fecha = prompt("introduce una fecha");
    let etiqs = prompt("introduce las etiquetas");

    etiqs = etiqs.split(",");

    let g1 = new gesPres.CrearGasto(desc, valor, fecha, etiqs);

    gesPres.anyadirGasto(g1);

    repintar();
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    //añadimos el documento
    let finalContenido = document.getElementById("controlesprincipales");
    finalContenido.append(formulario);

    //desactivar el boton formulario
    let botonFormulario = document.getElementById("anyadirgasto-formulario");
    botonFormulario.disabled = true;

    //Boton de enviar
    let manejadorEnvio = new enviarGastoHandle();
    formulario.addEventListener("submit", manejadorEnvio);

    //boton cancelar
    let manejadorCancelar = new cancelarGastoHandle();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manejadorCancelar);
}

//Manejadores de eventos

function enviarGastoHandle()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
        let actual = e.currentTarget;

        let nuevaDesc = actual.elements.descripcion.value;
        let nuevoValor = actual.elements.valor.value;
        let nuevaFecha = actual.elements.fecha.value;
        let nuevasEtiquetas = actual.elements.etiquetas.value;

        nuevoValor = parseFloat(nuevoValor);
        nuevasEtiquetas = nuevasEtiquetas.split(",");

        //creamos el nuevo gasto
        let gasto1 = new gesPres.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, nuevasEtiquetas);
        gesPres.anyadirGasto(gasto1);

        let anyadirGasto = document.getElementById("anyadirgasto-formulario");

        anyadirGasto.disabled = false;

        repintar();
    }
}

function cancelarGastoHandle()
{
    this.handleEvent = function(e)
    {
        //eliminar formulario
        e.currentTarget.parentNode.remove();

        //activar boton crear
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

function EditarHandle()
{
    this.handleEvent = function(e){
       //Pedir datos al usuario
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let val = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fech = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function(e)
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function(e)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function EditarHandleformulario()
{
    this.handleEvent = function(e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        var formulario = plantillaFormulario.querySelector("form");

        let btnActual = e.currentTarget;
        btnActual.after(formulario);
        btnActual.disabled = true;

        //Mostramos los valores
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviar = new EditarHandleGasto();
        enviar.gasto = this.gasto;

        //Boton de editar
        formulario.addEventListener("submit", enviar);

        //boton cancelar
        let manCancelar = new cancelarGastoHandle();
        
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", manCancelar);
    }
}

function EditarHandleGasto()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
        let actual = e.currentTarget;

        let nDesc = actual.elements.descripcion.value;
        let nValor = actual.elements.valor.value;
        let nFecha = actual.elements.fecha.value;
        let nEtiquetas = actual.elements.etiquetas.value;

        nValor = parseFloat(nValor);
        nEtiquetas.split(",");

        //actualizamos los nuevos valores
        this.gasto.actualizarDescripcion(nDesc);
        this.gasto.actualizarValor(nValor);
        this.gasto.actualizarFecha(nFecha);
        this.gasto.anyadirEtiquetas(...nEtiquetas);

        repintar();
    }
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}