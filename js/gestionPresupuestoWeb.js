'use strict';

import * as gestionPresupuesto from "./gestionPresupuesto.js";

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

let eventoSubmitFiltrado = new filtrarGastosWeb();
let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", eventoSubmitFiltrado);

let botonGuardarGastosWeb = document.getElementById("guardar-gastos");
botonGuardarGastosWeb.addEventListener("click", guardarGastosWeb);

let botonCargarGastosWeb = document.getElementById("cargar-gastos");
botonCargarGastosWeb.addEventListener("click", cargarGastosWeb);

let botonGastosApi = document.getElementById("cargar-gastos-api");
botonGastosApi.addEventListener("click", cargarGastosApi);


function mostrarDatoEnId(idElemento, valor){

    let div = document.getElementById(idElemento);
    div.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){
    
    let cuerpo = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    divGasto.id = "gasto-editar";

    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = `${gasto.fecha}`;

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor}`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    
    // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.id = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar gasto";
    // evento del botonEditar
    let eventEditar = new EditarHandle();
    eventEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento boton borrar
    let eventBorrar = new BorrarHandle();
    eventBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventBorrar);
    
    // segundo boton editar form
    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.id = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.textContent = "Editar (formulario)";
    // evento editar form
    let eventEditarForm = new EditarHandleFormulario();
    eventEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", eventEditarForm);

    // boton gasto borrar api
    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.className = "gasto-borrar-api";
    botonBorrarApi.id = "gasto-borrar-api";
    botonBorrarApi.type = "button";
    botonBorrarApi.textContent = "Borrar (Api)";
    // evento borrar gasto api
    let eventBorrarGastoApi = new borrarGastoApiHandle();
    eventBorrarGastoApi.gasto = gasto;
    botonBorrarApi.addEventListener("click", eventBorrarGastoApi);


    /*if(botonEditar.addEventListener("click", eventEditar)){
        divGasto.id = "gasto-editar";
    }else if(botonBorrar.addEventListener("click", eventBorrar)){
        divGasto.id = "gasto-borrar";
    }*/

    for (let eti of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${eti}`;
        divEtiquetas.append(spanEtiqueta);

        let eventBorrarEti = new BorrarEtiquetasHandle();
        eventBorrarEti.gasto = gasto;
        eventBorrarEti.etiqueta = eti;
        spanEtiqueta.addEventListener('click', eventBorrarEti);
    }



        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonBorrarApi);
        divGasto.append(botonEditarForm);

        cuerpo.append(divGasto);
     

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let cuerpo = document.getElementById(idElemento);
    
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);



    for (const[key, value] of Object.entries(agrup)) {
        
        let divAgruDato = document.createElement('div');
        divAgruDato.className = "agrupacion-dato";

        let spanKey = document.createElement('span');
        spanKey.className = "agrupacion-dato-clave";
        spanKey.textContent = `${key}`;

        let spanValue = document.createElement('span');
        spanValue.className = "agrupacion-dato-valor";
        spanValue.textContent = `${value}`;

        divAgruDato.append(spanKey);
        divAgruDato.append(spanValue);
        divAgrupacion.append(divAgruDato);
    }   

    cuerpo.append(divAgrupacion);
 
}


function repintar(){
    
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestionPresupuesto.listarGastos();
    /*mostrarGastoWeb("listado-gastos-completo", listaGastos);*/
    for (const gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce tu presupuesto");
    let presupuestoNum = parseInt(presupuesto);

    gestionPresupuesto.actualizarPresupuesto(presupuestoNum);
    repintar();

}

function nuevoGastoWeb(){
    
    let descripcion = prompt("Introduce una descripción");
    let valor = prompt("Introduce un valor");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce una fecha tipo yyyy-mm-dd");
    let etiquetas = prompt("Introduce las etiquetas separadas por coma");
    etiquetas = etiquetas.split(',');

    let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPresupuesto.anyadirGasto(gastoNuevo);
    repintar();
}

function nuevoGastoWebFormulario(){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let formu = document.getElementById("controlesprincipales");
   
    formu.append(formulario);
    //document.body.append(formulario);
    let btnAnyadir = document.getElementById("anyadirgasto-formulario");
    btnAnyadir.disabled = true;

    let enviarGasto = new EnviarGastoHandle();
    //enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
    formulario.addEventListener("submit", enviarGasto);

    let cancelarFormBoton = formulario.querySelector("button.cancelar");
    let eventCancelar = new CancelarFormularioHandle();
    eventCancelar.botonAnyadir = btnAnyadir;
    cancelarFormBoton.addEventListener("click", eventCancelar);

    let enviarApi = formulario.querySelector("button.gasto-enviar-api");
    //let evenEnviarApi = new EnviarGastoApi();
    enviarApi.formulario = formulario;
    enviarApi.addEventListener("click", enviarGastoApi);
}



function EditarHandle(){

    this.handleEvent = function(e){
      let descripcion = prompt("Introduce una descripcion:", this.gasto.descripcion);
      this.gasto.actualizarDescripcion(descripcion);

      let valor = prompt("Introduce un valor:", this.gasto.valor);
      this.gasto.actualizarValor(parseFloat(valor));

      let fecha = prompt("Introduce una fecha", this.gasto.fecha);
      this.gasto.actualizarFecha(fecha);

      let etiquetas = prompt("Introduce las etiquetas:", this.gasto.etiquetas);
      etiquetas = etiquetas.split(',');
      this.gasto.anyadirEtiquetas(...etiquetas);

      repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){
        
        //this.etiqueta = this.etiqueta.split(',');
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function EnviarGastoHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
        
         let formulario = e.currentTarget;
         let descripcion = formulario.elements.descripcion.value;
         let valor = formulario.elements.valor.value;
         let fecha = formulario.elements.fecha.value;
         let etiquetas = formulario.elements.etiquetas.value;

         valor = parseFloat(valor);

        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function CancelarFormularioHandle(){ // manejador de eventos para cancelar del boton añadir gasto (formulario)

    this.handleEvent = function(e){
        
        this.botonAnyadir.disabled = false;
        e.currentTarget.parentNode.remove(); // con parentNode borramos el formulario que es el padre del boton
        //btnAnyadir.disabled = false;
        //e.currentTarget.setAttribute("disabled", "false");
        //e.target.setAttribute("disabled", "false");
        //this.gasto.botonEditarForm.disabled = false;
        //repintar();
    }
}

function CancelarFormularioIndividualHandle(){ // // manejador de eventos para cancelar del boton editar gasto (formulario)

    this.handleEvent = function(e){
        
        this.botonEditar.disabled = false;
        e.currentTarget.parentNode.remove(); // con parentNode borramos el formulario que es el padre del boton
        //e.currentTarget.setAttribute("disabled", "false");
        //e.target.setAttribute("disabled", "false")
        //repintar();
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function(e){
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        //let formu = document.getElementsByClassName("gasto");
    
        let btnEditarF = e.currentTarget;
        btnEditarF.after(formulario); // mete el formulario abajo del boton
        btnEditarF.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarGasto = new SubmitHandle();
        //enviarGasto.formulario = formulario; // le creamos una propiedad al manejador que se llame formulario y le asignamos el elemento formulario
        enviarGasto.gasto = this.gasto;
        formulario.addEventListener("submit", enviarGasto);

        let cancelarFormBoton = formulario.querySelector("button.cancelar");
        let eventCancelar = new CancelarFormularioIndividualHandle();
        eventCancelar.botonEditar = btnEditarF;
        cancelarFormBoton.addEventListener("click", eventCancelar);
    }
}

function SubmitHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
        
        let formulario = e.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = formulario.elements.valor.value;
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);

        //document.getElementsByClassName("gasto-editar-formulario").disabled = true;

        repintar();
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(e){
        e.preventDefault();

        let formulario = e.currentTarget;
        let descripcion = formulario.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = formulario.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = formulario.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = formulario.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = formulario.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetas = formulario.elements['formulario-filtrado-etiquetas-tiene'].value;

        if(etiquetas !== null){
           etiquetas = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }

        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);

        let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde: fechaDesde,fechaHasta: fechaHasta,valorMinimo: valorMinimo,valorMaximo: valorMaximo,descripcionContiene: descripcion,etiquetasTiene: etiquetas});

        //console.log(gastosFiltrados);
        //console.log(descripcion);

        /*let gastos = document.getElementsByClassName("gasto");
        for (const gasto of gastos) {
            gasto.remove();
        }*/

        //document.querySelectorAll(".gasto").forEach(gasto => gasto.remove());
        let listaGastos = document.getElementById("listado-gastos-completo");
        listaGastos.innerHTML = '';
        /*while(listaGastos.firstChild){
            listaGastos.removeChild(listaGastos.firstChild);
        }*/
        
        for (let gasto of gastosFiltrados) {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

        //repintar()
    }
}


// practica 8 almacenamiento
function guardarGastosWeb(){

    let listaGastos = gestionPresupuesto.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(listaGastos));
}

function cargarGastosWeb(){

    let listaGastosStorage = localStorage.getItem('GestorGastosDWEC');
    listaGastosStorage = JSON.parse(listaGastosStorage);

    if(listaGastosStorage){
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }else{
        listaGastosStorage = [];
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }
    repintar();
}

// practica 9 funciones asincronas

function cargarGastosApi(){

    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

    if(usuario == ""){
        console.log("El input del nombre de usuario esta vacio");
    }else{
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then((result) => { 
        let resultado = result;
        //debugger
        //console.log(result);
        if(resultado == ""){
            console.log("No existen gastos en la api para el usuario")
        }else{
            gestionPresupuesto.cargarGastos(resultado);
            repintar();
        }
        })
        .catch(err => console.error(err));
    }
}

/*async function cargarGastosApi(){

    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

    let response = await fetch(url, {method: 'GET'});

    //console.log(response);
    
    if(response.ok && response.status == 200){
        let resultado = await response.json();
        console.log(resultado);
        gestionPresupuesto.cargarGastos(resultado);
        repintar();
    }else{
        console.log(`Error: ${response.status}`);
    }
    
}*/

function borrarGastoApiHandle(){
    
    this.handleEvent = function(e){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(usuario == ""){
            console.log("El input del nombre de usuario esta vacio");
        }else{
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => {
                //console.log(datos);
                if(!datos.errorMessage){
                    cargarGastosApi();
                }else{
                    console.log(datos.errorMessage);
                }
            })
            .catch(err => console.error(err));
        }
    }
}

function enviarGastoApi(){

    //this.handleEvent = function(e){

        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
        
        let formulario = this.formulario; //document.querySelector("#controlesprincipales form");
        let descripcionN = formulario.elements.descripcion.value;
        let valorN = formulario.elements.valor.value;
        let fechaN = formulario.elements.fecha.value;
        let etiquetasN = formulario.elements.etiquetas.value;

        valorN = parseFloat(valorN);
        etiquetasN = etiquetasN.split(",");
    
        let nuevoObjeto = {
            descripcion: descripcionN,
            fecha: fechaN,
            valor: valorN,
            etiquetas: etiquetasN
        }
    
        console.log(nuevoObjeto);

        if(usuario == ""){
            console.log("El input del nombre de usuario esta vacio");
        }else{
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(nuevoObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                
                if(response.ok){
                    //response.JSON.stringify(nuevoObjeto);
                    cargarGastosApi();
                }else{
                    console.log("La peticion ha sido erronea");
                }
            })
            .catch(err => console.error(err));
            /*.then(datos => {
                //console.log(datos);
                if(!datos.errorMessage){
                    cargarGastosApi();
                }else{
                    console.log(datos.errorMessage);
                }
            })
            .catch(err => console.error(err));*/
        }
    //}
}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
    /*actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario*/
}