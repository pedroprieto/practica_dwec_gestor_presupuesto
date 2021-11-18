import { actualizarPresupuesto, anyadirGasto, borrarGasto, calcularBalance, calcularTotalGastos, CrearGasto, listarGastos, mostrarPresupuesto } from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gasto){
    
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";

    div1.className ="gasto-descripcion";
    div1.append(gasto.descripcion);
    
    div2.className ="gasto-fecha";
    div2.append(gasto.fecha);
    
    div3.className ="gasto-valor";
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);

    

    for (let etiqueta of gasto.etiquetas)
    {        
        let span = document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";

        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiqueta;
        span.addEventListener("click", manejadorBorrarEtiqueta);

        span.append(etiqueta);
        div4.append(span);
    }

    div4.className ="gasto-etiquetas";
    
    
    div.append(div4);

    let botEditar = document.createElement('button');
    botEditar.className = "gasto-editar";
    botEditar.type = "button";
    botEditar.textContent = "Editar";

    let manejadorEdit = new EditarHandle();
    manejadorEdit.gasto = gasto;
    botEditar.addEventListener("click", manejadorEdit);
    div.append(botEditar);

    let botBorrar = document.createElement('button');
    botBorrar.className = "gasto-borrar";
    botBorrar.type = "button";
    botBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botBorrar.addEventListener("click", manejadorBorrar);
    div.append(botBorrar);

    /*let botEditForm = document.createElement('button');
    botEditForm.className = "gasto-editar-formulario";
    botEditForm.type = "button";
    botEditForm.textContent = "Editar (formulario)";

    let manEditForm = new EditarHandleFormulario();
    manEditForm.gasto = gasto;
    botEditForm.addEventListener("click", manEditForm);
    div.append(botEditForm);*/

    let raiz = document.getElementById(idElemento);

    raiz.append(div); 
}
function mostrarGastoAgrupadosWeb(idElemento, agrup, periodo){
        
    let div = document.createElement('div');
    div.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.append(`Gastos agrupados por ${periodo}`)
    div.append(h1);


    for (let [key, value] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        div1.className = "agrupacion-dato";

        let span1 = document.createElement('span');
        span1.className = "agrupacion-dato-clave";
        span1.append(key);
    
        let span2 = document.createElement('span');
        span2.className = "agrupacion-dato-valor";
        span2.append(value);
    
        div1.append(span1);
        div1.append(span2);
        div.append(div1);
    }

    let raiz = document.getElementById(idElemento);
    raiz.append(div);

}

function repintar(){

    mostrarDatoEnId("presupuesto", mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", calcularTotalGastos());
    mostrarDatoEnId("balance-total", calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listagastos = listarGastos();

    for (let lista of listagastos)
    {
        mostrarGastoWeb("listado-gastos-completo", lista);
    }
}

function EditarHandle(){
    this.handleEvent = function(e){

        let nuevadesc = prompt("Introduce nueva descripción");
        this.gasto.actualizarDescripcion(nuevadesc);

        let nuevovalor = prompt("Introduce nuevo valor");
        nuevovalor = parseFloat(nuevovalor);
        this.gasto.actualizarValor(nuevovalor);

        let nuevafecha = prompt("Introduce nueva fecha");
        nuevafecha = Date.parse(nuevafecha);
        this.gasto.actualizarFecha(nuevafecha);

        let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
        nuevaetiqueta = nuevaetiqueta.split(', ');
        this.gasto.anyadirEtiquetas(nuevaetiqueta);

        repintar();
        
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){
       
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function actualizarPresupuestoWeb(){

    let nuevoPresupuesto = prompt("Introduzca nuevo presupuesto");
    nuevoPresupuesto = parseFloat(nuevoPresupuesto);

    actualizarPresupuesto(nuevoPresupuesto);

    repintar();
}

let botActualizar = document.getElementById("actualizarpresupuesto");
botActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){

    let nuevadesc = prompt("Introduce nueva descripción");
    let nuevovalor = prompt("Introduce nuevo valor");
    let nuevafecha = prompt("Introduce nueva fecha");
    let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
    
    nuevovalor = parseFloat(nuevovalor);
    let arrEtiquetas = nuevaetiqueta.split(', ');

    let gasto = new CrearGasto(nuevadesc, nuevovalor, nuevafecha, arrEtiquetas);
    anyadirGasto(gasto);
    repintar();

}

let botAnaydir = document.getElementById("anyadirgasto");
botAnaydir.addEventListener("click", nuevoGastoWeb);


function submitHandle() {
    this.handleEvent = function(e){

        e.preventDefault();
        let form = e.currentTarget;

        let nuevadesc = form.elements.descripcion.value;
        let nuevovalor = form.elements.valor.value;
        let nuevafecha = form.elements.fecha.value;
        let nuevaetiqueta = form.elements.etiquetas.value;

        nuevovalor = parseFloat(nuevovalor);
        let gasto = new CrearGasto(nuevadesc, nuevovalor, nuevafecha, nuevaetiqueta);
        anyadirGasto(gasto);
        repintar();
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function cancelarHandle(){
    this.handleEvent = function(e){

        e.currentTarget.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;
        
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(e){

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        /*let editarGasto = new submitHandle();
        let botonCrear = document.querySelector("button[type = submit");
        botonCrear.addEventListener("click", editarGasto);

        let cancelarGasto = new cancelarHandle();
        let botonCancelar = document.querySelector("button[type = button]");
        botonCancelar.addEventListener("click", cancelarGasto);*/

    }
}

function nuevoGastoWebFormulario(){

    this.handleEvent = function(e){
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        
        document.getElementById("controlesprincipales").append(formulario);
        document.getElementById("anyadirgasto-formulario").disabled = true;

        let manEnviar = new submitHandle();
        let botonEnviar = formulario;
        botonEnviar.addEventListener("submit", manEnviar);

        let manCancelar = new cancelarHandle();
        let botCancelar = formulario.querySelector("button[type = button]");
        botCancelar.addEventListener("click", manCancelar);

    }
}

let crearFormulario = new nuevoGastoWebFormulario();

let botonCrear = document.getElementById("anyadirgasto-formulario");
botonCrear.addEventListener("click", crearFormulario);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
}