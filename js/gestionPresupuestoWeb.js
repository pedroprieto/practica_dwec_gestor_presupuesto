"use strict";
import * as gesPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId (idElemento, valor) {
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    //Creo los elementos
    //Primero creo los div    
    
    let divGasto = document.createElement("div");
    let divGastoDescripcion = document.createElement("div");
    let divGastoValor = document.createElement("div");
    let divGastoFecha = document.createElement("div");    
    let divGastoEtiquetas = document.createElement("div");
    
    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);


    //Asigno clase a los div
    divGasto.classList.add ("gasto");
    divGastoDescripcion.classList.add ("gasto-descripcion");
    divGastoValor.classList.add ("gasto-valor");
    divGastoFecha.classList.add ("gasto-fecha");    
    divGastoEtiquetas.classList.add ("gasto-etiquetas");
    
    let mesString = (parseInt (new Date(gasto.fecha).getMonth()) < 10) ? "0" + new Date(gasto.fecha).getMonth() : new Date(gasto.fecha).getMonth();
    let diaString = (parseInt (new Date(gasto.fecha).getDate()) <10) ? "0" + new Date(gasto.fecha).getDate() : new Date(gasto.fecha).getDate();
    let fechaString = new Date(gasto.fecha).getFullYear() + "-" + mesString + "-" + diaString;  

    divGastoDescripcion.textContent = gasto.descripcion;
    divGastoFecha.textContent = fechaString;
    divGastoValor.textContent = gasto.valor;
    
    

    divGasto.append (divGastoDescripcion);
    divGasto.append (divGastoValor);
    divGasto.append (divGastoFecha);    
    divGasto.append (divGastoEtiquetas);

    
    
    elementoInsertar.append (divGasto); 
    //Creo los span
    for (let item of gasto.etiquetas) {
        let spanGastoEtiqueta = document.createElement ("span");
        spanGastoEtiqueta.classList.add ("gasto-etiquetas-etiqueta");
        spanGastoEtiqueta.textContent = item;
        divGastoEtiquetas.append (spanGastoEtiqueta);        

        //Genero nuevo objeto BorrarEtiquetasHandle
        let accionBorrarEtiqueta = new BorrarEtiquetasHandle();
        //Asigno objeto gasto a accionBorrarEtiqueta
        accionBorrarEtiqueta.gasto = gasto;
        //Añado el eventListener para asociar la etiqueta con el evento BorrarEtiquetasHandle
        spanGastoEtiqueta.addEventListener ("click", accionBorrarEtiqueta);        
    }

    //Creo los botones Editar y Borrar respectivamente
    let botonEditar = document.createElement ("button");
    botonEditar.classList.add ("gasto-editar");
    botonEditar.innerText = "Editar";

    let botonBorrar = document.createElement ("button");
    botonBorrar.classList.add ("gasto-borrar");
    botonBorrar.innerText = "Borrar";

    let botonEditarForm = document.createElement ("button");
    botonEditarForm.classList.add ("gasto-editar-formulario");
    botonEditarForm.innerText = "EditarForm";

    divGasto.append (botonEditar);
    divGasto.append (botonBorrar);
    divGasto.append (botonEditarForm);

    //Genero nuevo objeto EditarHandle
    let accionEditar = new EditarHandle();
    //Le asigno nueva propiedad gasto, apuntando a gasto
    accionEditar.gasto = gasto;

    //Asocio el click del botón Editar, con eventListener, al objeto EditHandler
    botonEditar.addEventListener ("click", accionEditar);

    //Genero nuevo objeto BorrarHandle
    let accionBorrar = new BorrarHandle();
    //Le asigno nueva propiedad gasto, apuntando a gasto
    accionBorrar.gasto = gasto;

    //Asocio el click del botón Borrar, con eventListener, al objeto BorrarHandler
    botonBorrar.addEventListener ("click", accionBorrar); 
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    //Creo elementos
    let divAgrupacion = document.createElement ("div");
    let h1Periodo = document.createElement ("h1");    

    //Asigno clases
    divAgrupacion.classList.add ("agrupacion");


    h1Periodo.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append (h1Periodo);


    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);
    
    for (let item in agrup) {
        let propiedad = item;
        let valor = agrup[item];

        //Creo elementos
        let divAgrupacionDato = document.createElement ("div");    
        let spanAgrupacionDatoClave = document.createElement ("span");
        let spanAgrupacionDatoValor = document.createElement ("span");
        
        //Asigno clases
        divAgrupacionDato.classList.add ("agrupacion-dato");
        spanAgrupacionDatoClave.classList.add ("agrupacion-dato-clave");
        spanAgrupacionDatoValor.classList.add ("agrupacion-dato-valor");
    
        spanAgrupacionDatoClave.textContent = propiedad;
        spanAgrupacionDatoValor.textContent = valor;
        
        divAgrupacionDato.append (spanAgrupacionDatoClave);
        divAgrupacionDato.append (spanAgrupacionDatoValor);
        divAgrupacion.append (divAgrupacionDato);
    }

    
    elementoInsertar.append (divAgrupacion);
}

function repintar() {
    //Creo variables con elementos a utilizar

    let divPresupuesto = document.getElementById ("presupuesto");
    let divGastosTotales = document.getElementById ("gastos-totales");
    let divBalanceTotal = document.getElementById ("balance-total");

    let divListadoGastosCompleto = document.getElementById ("listado-gastos-completo");

    mostrarDatoEnId (divPresupuesto.id, gesPresupuesto.mostrarPresupuesto ());
    mostrarDatoEnId (divGastosTotales.id, gesPresupuesto.calcularTotalGastos());
    mostrarDatoEnId (divBalanceTotal.id, gesPresupuesto.calcularBalance());

    //Borro contenido
    divListadoGastosCompleto.innerHTML = "";

    let gastos = gesPresupuesto.listarGastos();

    for (let item of gastos) {
        mostrarGastoWeb(divListadoGastosCompleto.id, item);
    }  

}

/*

let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");

botonActualizoPresupuesto.addEventListener ("click", function (e) {
    console.log (e);
    
    let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));

    gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);
    repintar();
});
*/

/*let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");

botonActualizoPresupuesto.addEventListener ("click", function (e) {
    console.log (e);
    e.preventDefault();
    let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));
    gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);
    repintar();
});*/




//Manejadora de eventos para el botón 'Actualizar presupuesto'
function actualizarPresupuestoWeb () {
        let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));
        gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);

        repintar();

}

let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");    

botonActualizoPresupuesto.addEventListener ("click", actualizarPresupuestoWeb);

//Manejadora de eventos para el botón 'Añadir gasto'
function nuevoGastoWeb () {
    let descripcionGasto = prompt ("Descripción del gasto");
    let valorGasto = parseFloat(prompt ("Valor del gasto"));
    let fechaGasto = prompt ("Fecha del gasto (formato 'yyyy-mm-dd'");
    let etiquetasGasto =  prompt ("Etiquetas (separadas por ,");

    //Separo el string de etiquetas por , y lo meto en un arrayEtiquetasGasto
    let arrayEtiquetasGasto = etiquetasGasto.split(",");

    //El array arrayEtiquetasGasto es de tipo rest, por eso pongo los ..., para que meta cada elemento del array como un parámetro
    let gastoAnyadir = new gesPresupuesto.CrearGasto (descripcionGasto, valorGasto, fechaGasto, ...arrayEtiquetasGasto);
        
    gesPresupuesto.anyadirGasto (gastoAnyadir);

    repintar();

}

//Manejadora de eventos para el botón 'Añadir gasto'
function nuevoGastoWebFormulario (event) {
    //Clono la plantilla
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    //Obtengo el formulario (sólo hayt uno)
    let formulario = plantillaFormulario.querySelector("form");

    //Obtengo 'controlesprincipales', donde añadiré el formulario
    let controlesPrincipales = document.getElementById("controlesprincipales");

    //Añado el formulario a 'controlesprincipales'
    controlesPrincipales.append (formulario);

    //Inhabilito el botón 'anyadirgasto-formulario' para no ir abriendo un formulario tras otro indefinidamente
    let botonAñadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
    botonAñadirGastoFormulario.disabled = true;
    
    //Asocio el submit (click en el botóin 'Enviar' o ulsar 'Enter') del formulario a la función manejadora 'cargarNuevoGasto'
    formulario.addEventListener ("submit", cargarNuevoGastoFormulario);

    //Asocio el botón 'Cancelar'a la función manejadora 'cancelarCargarNuevoGasto'
    let botonCancelar = formulario.querySelector (".cancelar");
    botonCancelar.addEventListener ("click", cancelarCargarNuevoGastoFormulario);

}

function cargarNuevoGastoFormulario(event) {
    event.preventDefault();
    let descripcionGasto = event.currentTarget.querySelector("#descripcion").value;
    let valorGasto = event.currentTarget.querySelector("#valor").value;
    let fechaGasto = event.currentTarget.querySelector("#fecha").value;    
    let etiquetasGasto = event.currentTarget.querySelector("#etiquetas").value.split(",");
    
    let gastoAnyadir = new gesPresupuesto.CrearGasto (descripcionGasto, valorGasto, fechaGasto, ...etiquetasGasto);
    gesPresupuesto.anyadirGasto (gastoAnyadir);

    repintar();
}

function cancelarCargarNuevoGastoFormulario (event) {
    alert ("Cancelando envío de nuevo gasto");
}

let anyadirGastoBoton = document.getElementById("anyadirgasto-formulario");
anyadirGastoBoton.addEventListener ("click", nuevoGastoWebFormulario);

let botonAnyadirGasto = document.getElementById ("anyadirgasto");
botonAnyadirGasto.addEventListener ("click", nuevoGastoWeb);



//Manejadora de eventos para editar un gasto
function EditarHandle () {
    this.handleEvent = function (event) {
        
        let nuevaDescripcion = prompt ("Escribe la nueva descripción", this.gasto.descripcion);
        let nuevoValor = parseFloat (prompt ("Escribe el nuevo valor",this.gasto.valor));
        let nuevaFecha = prompt ("Escribe la nueva fecha (yyyy-mm-dd", this.gasto.fecha);
        let nuevasEtiquetas = prompt ("Escribe las nuevas etiquetas separadas por ',' sí es más de una.", this.gasto.etiquetas);
        let arrayNuevasEtiquetas = nuevasEtiquetas.split (",");

        this.gasto.actualizarDescripcion (nuevaDescripcion);
        this.gasto.actualizarValor (nuevoValor);
        this.gasto.actualizarFecha (nuevaFecha);        
        this.gasto.anyadirEtiquetas (...arrayNuevasEtiquetas);

        repintar();
    }
}

function BorrarHandle () {
    this.handleEvent = function (event) {
        gesPresupuesto.borrarGasto (this.gasto.id);        
        repintar();
    }    
}

function BorrarEtiquetasHandle () {
    this.handleEvent = function (event) {
        //Busco la etiqueta por el nombre pues es lo que utilizo para luego poder borrarla
        this.gasto.borrarEtiquetas (event.target.innerHTML);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    EditarHandle
}