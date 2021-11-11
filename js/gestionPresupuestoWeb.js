"use strict";

import * as gp from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.textContent = `${valor}`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);

    //Botón editar gasto
    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    //Botón borrar gasto
    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    //Botón editar gasto formulario
    let evEditarFormulario = new EditarHandleFormulario();
    evEditarFormulario.gasto = gasto;

    let div = document.createElement("div");
    div.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = `${gasto.descripcion}`;

    let divFech = document.createElement("div");
    divFech.className = "gasto-fecha";
    divFech.textContent = `${gasto.fecha}`;

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = `${gasto.valor}`;

    let divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);
        //Borrar etiqueta
        let evEtiqueta = new BorrarEtiquetasHandle();
        evEtiqueta.gasto = gasto;
        evEtiqueta.etiqueta = etiqueta;
        spanEtiq.addEventListener("click", evEtiqueta);
    }

    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    let btnEditaFormulario = document.createElement("button");
    btnEditaFormulario.className = "gasto-editar-formulario";
    btnEditaFormulario.type = "button";
    btnEditaFormulario.textContent = "Editar (formulario)";
    btnEditaFormulario.addEventListener("click", evEditarFormulario);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(btnEditar);
    div.append(btnBorrar);
    div.append(btnEditaFormulario);
    mostrar.append(div);  

    //prueba
    /*document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
    document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
    document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);*/
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let mostrar = document.getElementById(idElemento);

    let div = document.createElement("div");
    div.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;

    div.append(h1);

    for(const [key, value] of Object.entries(agrup)){
        let divAgrupacion = document.createElement("div");
        divAgrupacion.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${value}`;

        divAgrupacion.append(spanClave);
        divAgrupacion.append(spanValor);

        div.append(divAgrupacion);
    }

    mostrar.append(div);

}

function repintar(){
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gTotales);

    let bTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", bTotal);

    document.getElementById("listado-gastos-completo").innerHTML = '';

    let lgastos = gp.listarGastos();

    for(let gasto of lgastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gp.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto');
    let fecha = prompt('Introduce la fecha del gasto');
    let etiquetas = prompt('Introduce las etiquetas');

    valor = parseFloat(valor);
    etiquetas = etiquetas.split(',');

    let gasto1 = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

    gp.anyadirGasto(gasto1);

    repintar();
}

// FORMULARIO

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let final = document.getElementById("controlesprincipales");

    final.append(formulario);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    let enviar = new enviarGastoHandle();
    //enviar.formulario = formulario;

    formulario.addEventListener("submit", enviar);

    let cancelar = new cancelarGastoHandle();
    //cancelar.formulario = formulario;

    let btnCancelar = formulario.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", cancelar);
}

function enviarGastoHandle(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        /*let form = document.forms[0];*/
        //let form = this.formulario;
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       let gasto1 = new gp.CrearGasto(desc, val, fech, etiq);

       gp.anyadirGasto(gasto1);

       document.getElementById("anyadirgasto-formulario").disabled = false;

       repintar();
    }
}

function cancelarGastoHandle(){
    this.handleEvent = function(e){
        //this.formulario.remove();
        //e.currentTarget.remove();
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute('disabled');

        repintar();
        /***/
        //e.currentTarget.disabled = false;
        //e.currentTarget.setAttribute('disabled', false);
        //let des = e.currentTarget;
        //des.removeAttribute('disabled');
        //des.disabled = true;
        
    }
}

function EditarHandle(){

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

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);

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

function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
    
        //let final = document.getElementsByClassName("gasto");

        let final = e.currentTarget; //el botón pulsado
    
        //final.append(formulario);

        final.after(formulario);
    
        //document.getElementsByClassName("gasto-editar-formulario").disabled = true;

        final.disabled = true;

        /***** Valores formulario por defecto ****/
        //document.getElementById("descripcion").content = this.gasto.descripcion;
        /*formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;*/
    
        //let enviar = new enviarGastoHandle();
        //enviar.formulario = formulario;
        let enviar = new SubmitHandleGasto();
        enviar.gasto = this.gasto;
    
        formulario.addEventListener("submit", enviar);
    
        let cancelar = new cancelarGastoHandle();
        //cancelar.formulario = formulario;
    
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", cancelar);
    }
}

function SubmitHandleGasto(){
    this.handleEvent = function(e){
        e.preventDefault();
        
        /*let form = document.forms[0];*/
        //let form = this.formulario;
        let form = e.currentTarget;
        let desc = form.elements.descripcion.value;
       let val = form.elements.valor.value;
       let fech = form.elements.fecha.value;
       let etiq = form.elements.etiquetas.value;

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       //document.getElementById("anyadirgasto-formulario").disabled = false;
       //e.currentTarget.disabled = false


       repintar();
    }
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    /*repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,*/
}