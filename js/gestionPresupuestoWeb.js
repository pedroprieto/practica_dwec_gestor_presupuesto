import * as gesPres from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto){

    let divGasto = document.createElement('div');
    let divGasDescripcion = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor =  document.createElement('div');
    let divGasEtiqueta =  document.createElement('div');

    divGasto.className = "gasto";

    divGasDescripcion.className ="gasto-descripcion";
    divGasDescripcion.append(gasto.descripcion);
    
    divGasFecha.className ="gasto-fecha";
    let fechaRecorte = new Date(gasto.fecha).toLocaleString();
    fechaRecorte = fechaRecorte.substring(0,9);
    divGasFecha.append(fechaRecorte);
    
    divGasValor.className ="gasto-valor";
    divGasValor.append(gasto.valor);

    divGasto.append(divGasDescripcion);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);

    divGasEtiqueta.className = "gasto-etiquetas";

    for (let etiqueta of gasto.etiquetas)
    {        
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className="gasto-etiquetas-etiqueta";

        let handleBEtiqueta = new BorrarEtiquetasHandle();
        handleBEtiqueta.gasto = gasto;
        handleBEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener('click', handleBEtiqueta);

        spanEtiqueta.append(etiqueta);
        divGasEtiqueta.append(spanEtiqueta);
    }
    
    divGasto.append(divGasEtiqueta);

    let bEditar = document.createElement('button');
    bEditar.className = "gasto-editar";
    bEditar.type = "button";
    bEditar.textContent = "Editar";

    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    bEditar.addEventListener('click', handleEditar);
    divGasto.append(bEditar);

    let bBorrar = document.createElement('button');
    bBorrar.className = "gasto-borrar";
    bBorrar.type = "button";
    bBorrar.textContent = "Borrar";

    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    bBorrar.addEventListener('click', handleBorrar);
    divGasto.append(bBorrar);

    let bEditarForm = document.createElement('button');
    bEditarForm.className = "gasto-editar-formulario";
    bEditarForm.type = "button";
    bEditarForm.textContent = "Editar (formulario)";

    let handleEditarForm = new EditarHandleFormulario();
    handleEditarForm.gasto = gasto;
    bEditarForm.addEventListener("click", handleEditarForm);
    divGasto.append(bEditarForm);

    document.getElementById(idElemento).append(divGasto);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.append(`Gastos agrupados por ${periodo}`)
    divAgrupacion.append(h1);


    for(let [fecha, valor] of Object.entries(agrup)){
        let divAgrupado = document.createElement('div');
        divAgrupado.className = "agrupacion-dato";

        let spanDatoClave = document.createElement('span');
        spanDatoClave.className = "agrupacion-dato-clave";
        spanDatoClave.append(fecha);

        let spanValor = document.createElement('span');
        spanValor.className = "agrupacion-dato-valor";
        spanValor.append(valor);

        divAgrupado.append(spanDatoClave);
        divAgrupado.append(spanValor);
        divAgrupacion.append(divAgrupado);
    }
    document.getElementById(idElemento).append(divAgrupacion);

}

function repintar(){
    
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for(let gasto of listaGastos){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}

function actualizarPresupuestoWeb(){
    let presNuevo = prompt("Introduzca el nuevo presupuesto");
    presNuevo = parseFloat(presNuevo);

    gesPres.actualizarPresupuesto(presNuevo);

    repintar();
}

let bActualizar = document.getElementById("actualizarpresupuesto");
bActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descNueva = prompt("Introduce una nueva descripción");
    let valorNuevo = prompt("Introduce nuevo valor");
    let fechaNueva = prompt("Introduce nueva fecha");
    let etiNuevas = prompt("Introduce nuevas etiquetas");

    valorNuevo = parseFloat(valorNuevo);
    let etiquetas = etiNuevas.split(', ');
    

    let gasto = new gesPres.CrearGasto(descNueva, valorNuevo, fechaNueva, ...etiquetas);
    gesPres.anyadirGasto(gasto);
    repintar();
}

let bAnyadirGasto = document.getElementById("anyadirgasto");
bAnyadirGasto.addEventListener('click', nuevoGastoWeb); 


function EditarHandle(){
    this.handleEvent = function(e){

    let descNueva = prompt("Introduce una nueva descripción");
    this.gasto.actualizarDescripcion(descNueva);

    let valorNuevo = prompt("Introduce nuevo valor");
    valorNuevo = parseFloat(valorNuevo);
    this.gasto.actualizarValor(valorNuevo);

    let fechaNueva = prompt("Introduce nueva fecha");
    fechaNueva = Date.parse(fechaNueva);
    this.gasto.actualizarFecha(fechaNueva);

    let nuevaEtiqueta = prompt("Introduce nuevas etiquetas");
    nuevaEtiqueta = nuevaEtiqueta.split(', ');
    this.gasto.anyadirEtiquetas(...nuevaEtiqueta);

        repintar();
    }   
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
this.handleEvent = function(e){
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
}
}

function submitHandle(){
    this.handleEvent = function(e){
    e.preventDefault(); //evita recargar la página, evita el comportamiento por defecto de
    let form = e.currentTarget;

    let descNew = form.elements.descripcion.value;
    let valNew = form.elements.valor.value;
    let fechaNew = form.elements.fecha.value;
    let eticNew = form.elements.etiquetas.value;

    
    valNew = parseFloat(valNew);
    eticNew = eticNew.split(', ');

    let gasto = new gesPres.CrearGasto(descNew, valNew, fechaNew, ...eticNew);
    gesPres.anyadirGasto(gasto);
    repintar();
    
    document.getElementById("anyadirgasto-formulario").disabled = false;

    }
}

function submitHandleEditar(){
    this.handleEvent = function(e){
        e.preventDefault();
    let form = e.currentTarget;

    let descNew = form.elements.descripcion.value;
    let valNew = form.elements.valor.value;
    let fechaNew = form.elements.fecha.value;
    let eticNew = form.elements.etiquetas.value;
        
    valNew = parseFloat(valNew);
    eticNew = eticNew.split(', ');

    this.gasto.actualizarDescripcion(descNew);
    this.gasto.actualizarValor(valNew);
    this.gasto.actualizarFecha(fechaNew);
    this.gasto.anyadirEtiquetas(...eticNew);

    repintar();

    }

}




function cancelHandle(){
    this.handleEvent = function(e){
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;

        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let boton = e.currentTarget;
        boton.after(formulario);

        boton.disabled = true;

        let editarGasto = new submitHandleEditar();
        editarGasto.gasto = this.gasto; 

        let bEditarGasto = formulario;
        bEditarGasto.addEventListener("submit", editarGasto);

        let manejadorCancelar = new cancelHandle();
        let botonCancelar = formulario.querySelector("button[type = button]");
        botonCancelar.addEventListener("click", manejadorCancelar);
    }


}



function nuevoGastoWebFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        document.getElementById("controlesprincipales").append(formulario);
        document.getElementById("anyadirgasto-formulario").disabled =true;

        let manejadorEnviar = new submitHandle();
        let botonEnviar = formulario;
        botonEnviar.addEventListener("submit", manejadorEnviar);

        let manejadorCancelar = new cancelHandle();
        let botonCancelar = formulario.querySelector("button[type = button]");
        botonCancelar.addEventListener("click", manejadorCancelar);


    }
}


function filtrarGastosWeb(){

    this.handleEvent = function(e){
        e.preventDefault();

        let plantillaFormFiltrar = document.getElementById("filtrar-gastos");
        var datosForm = plantillaFormFiltrar.querySelector("form");


        let descripcionFiltro = datosForm.elements["formulario-filtrado-descripcion"].value;
        let valorMinimoFiltro = datosForm.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximoFiltro = datosForm.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesdeFiltro = datosForm.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHastaFiltro = datosForm.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetasFiltro = datosForm.elements["formulario-filtrado-etiquetas-tiene"].value;

        
        if(etiquetasFiltro != ""){
            etiquetasFiltro = gesPres.transformarListadoEtiquetas(etiquetasFiltro);
        }

        valorMinimoFiltro = parseFloat(valorMinimoFiltro);
        valorMaximoFiltro = parseFloat(valorMaximoFiltro);

        let gastosFiltrados = gesPres.filtrarGastos({fechaDesde: fechaDesdeFiltro, fechaHasta: fechaHastaFiltro, valorMinimo: valorMinimoFiltro, valorMaximo: valorMaximoFiltro, descripcionContiene: descripcionFiltro, etiquetasTiene: etiquetasFiltro});

        document.getElementById("listado-gastos-completo").innerHTML="";

        for(let filtro of gastosFiltrados){
            mostrarGastoWeb("listado-gastos-completo", filtro);
        }

    }
}

function guardarGastosWeb(){
    let liGastos = gesPres.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(liGastos));
    
}
function cargarGastosWeb(){
    
        let gastosGuardados = localStorage.getItem('GestorGastosDWEC');
        gastosGuardados = JSON.parse(gastosGuardados);
        
        
        if(gastosGuardados)
        {
           gesPres.cargarGastos(gastosGuardados);
        }else{
            gastosGuardados = [];
            gesPres.cargarGastos(gastosGuardados);
        }

        repintar();
    
}



let crearFormulario = new nuevoGastoWebFormulario();

let botonCrear = document.getElementById("anyadirgasto-formulario");
botonCrear.addEventListener("click", crearFormulario);

let gastosFiltradosWeb = new filtrarGastosWeb();

let botonFiltro = document.getElementById("formulario-filtrado");
botonFiltro.addEventListener("submit", gastosFiltradosWeb);


let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", guardarGastosWeb);


let botonCargar = document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", cargarGastosWeb);



export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}