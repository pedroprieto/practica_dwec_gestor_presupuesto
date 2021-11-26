"use strict";
import * as gestionPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let mostrar = document.getElementById(idElemento);

    mostrar.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{

    let botonEditar = new EditarHandle();
    botonEditar.gasto = gasto;

    
    let botonBorrar = new BorrarHandle();
    botonBorrar.gasto = gasto;

    let mostrar = document.getElementById(idElemento);

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

    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";

        span.append(etiqueta);
        div5.append(span);

        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        span.addEventListener("click", borrarEtiqueta);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", botonEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", botonBorrar);

    let btnEditarForm = document.createElement("button");
    btnEditarForm.className ="gasto-editar-formulario";
    btnEditarForm.type = "button";
    btnEditarForm.textContent = "Editar (formulario)";
    

    let editarGastoForm = new editarHandleFormulario();
    editarGastoForm.gastoActual = gasto;
    btnEditarForm.addEventListener("click", editarGastoForm);
    
    div1.append(div5);
    div1.append(btnEditar);
    div1.append(btnBorrar);
    mostrar.append(div1); 
    div5.append(btnEditarForm); 
    
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
function repintar(){

    let presupuesto = gestionPres.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastosTotales = gestionPres.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPres.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = '';
    let listagastos = gestionPres.listarGastos();

    for(let gasto of listagastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}
function actualizarPresupuestoWeb(){

    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gestionPres.actualizarPresupuesto(presupuesto);

    repintar();
}
function nuevoGastoWeb(){

    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto');
    let fecha = prompt('Introduce la fecha del gasto');
    let etiquetas = prompt('Introduce las etiquetas');

    valor = parseFloat(valor);
    etiquetas = etiquetas.split(',');
    let gasto1 = new gestionPres.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPres.anyadirGasto(gasto1);
    repintar();

}
function EditarHandle(){

    this.handleEvent = function(e){

       
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let valor = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fecha = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       valor = parseFloat(valor);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(valor);
       this.gasto.actualizarFecha(fecha);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}
function editarHandleFormulario() {
    this.handleEvent = function(e) {
        let plantillaFormularioEditarGasto = document.getElementById("formulario-template");
        let formularioEditarGasto = plantillaFormularioEditarGasto.content.cloneNode("true");
        
        e.target.disabled = "disabled";
        
        let manejadorEditarGasto = new editarGastoHandle();
        manejadorEditarGasto.botonCrearFormulario = e.target;
        
        manejadorEditarGasto.gastoActual = this.gastoActual;
        let botonEditarGasto = formularioEditarGasto.querySelector("form");
        botonEditarGasto.addEventListener("submit", manejadorEditarGasto);
        
        let manejadorCancelar = new manejadorCancelarNuevoGastoWeb();
        
        manejadorCancelar.botonCrearFormulario = e.target;
        let botonCancelar = formularioEditarGasto.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manejadorCancelar);
       
        formularioEditarGasto.getElementById("descripcion").value = this.gastoActual.descripcion;
        formularioEditarGasto.getElementById("valor").value = this.gastoActual.valor;
        let fecha = new Date(this.gastoActual.fecha);
        formularioEditarGasto.getElementById("fecha").value = fecha.toISOString().substr(0,10);
        
        formularioEditarGasto.getElementById("etiquetas").value = this.gastoActual.etiquetas;
        
        e.target.parentNode.append(formularioEditarGasto);
        
        
    }
}
function editarGastoHandle() {
    this.handleEvent = function(e) {
        
        e.preventDefault();
        if (e.target.elements.descripcion.value != this.gastoActual.descripcion || 
            e.target.elements.descripcion.value != "") {
                this.gastoActual.actualizarDescripcion(e.target.elements.descripcion.value);
        }
        
        if (parseFloat(e.target.elements.valor.value) != this.gastoActual.valor || 
            parseFloat(e.target.elements.valor.value) != "") {
                this.gastoActual.actualizarValor(parseFloat(e.target.elements.valor.value));
            }
        
        if (e.target.elements.fecha.value != this.gastoActual.fecha || 
            e.target.elements.fecha.value != "") {
                this.gastoActual.actualizarFecha(e.target.elements.fecha.value);
            }
                
        let nuevasEtiq = e.target.elements.etiquetas.value;
        nuevasEtiq = nuevasEtiq.split(",");
        
        if (e.target.elements.etiquetas.value != "") {
            this.gastoActual.anyadirEtiquetas(nuevasEtiq);
            this.gastoActual.anyadirEtiquetas(...nuevasEtiq);
        }
                
        repintar();
        e.target.remove();
        
    }
}
function BorrarHandle(){
    this.handleEvent = function(e){

        gestionPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        this.etiqueta = this.etiqueta.split(',');

        this.gasto.borrarEtiquetas(...this.etiqueta);
        repintar();
    }
}
function nuevoGastoWebFormulario() {

    this.handleEvent = function(e) {
        
        let plantillaFormulario = document.getElementById("formulario-template");
        let formularioNuevoGasto = plantillaFormulario.content.cloneNode("true");
        
        let manejadorEnvio = new manejadorEnvioNuevoGastoWeb();
        manejadorEnvio.botonCrearFormulario = e.target;
        
        let botonEnvio = formularioNuevoGasto.querySelector("form");
        botonEnvio.addEventListener("submit", manejadorEnvio);
        
        let manejadorCancelar = new manejadorCancelarNuevoGastoWeb();
        
        manejadorCancelar.botonCrearFormulario = e.target;
        let botonCancelar = formularioNuevoGasto.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manejadorCancelar);
        
        e.target.disabled = "disabled";
        
        document.getElementById("controlesprincipales").append(formularioNuevoGasto);
        
    }
}
function manejadorEnvioNuevoGastoWeb() {
    this.handleEvent = function(e) {
        
        e.preventDefault();
               
        let descripcion = document.getElementById("descripcion").value;
        let valor = parseInt(document.getElementById("valor").value);
        let fecha = document.getElementById("fecha").value;
        let etiquetas = document.getElementById("etiquetas").value;
        let gasto = new gestionPres.CrearGasto(descripcion,valor, fecha, etiquetas);
        
        gestionPres.anyadirGasto(gasto);
        
   
        repintar();
        
        e.target.remove();
        
        this.botonCrearFormulario.disabled = "";
    }
}
function manejadorCancelarNuevoGastoWeb() {
    this.handleEvent = function(e) {
        
        e.target.form.remove();
        
        this.botonCrearFormulario.disabled = "";
    }
}
let botonNuevoGastoWebFormulario = document.getElementById("anyadirgasto-formulario");
let manejadorBotonFormularioNuevoGastoWeb = new nuevoGastoWebFormulario();
botonNuevoGastoWebFormulario.addEventListener("click", manejadorBotonFormularioNuevoGastoWeb);


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
}
