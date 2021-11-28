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
    let etiquetas = etiNuevas.split(' ');

    let gasto = new gesPres.CrearGasto(descNueva, valorNuevo, fechaNueva, etiquetas);
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
    nuevaEtiqueta = nuevaEtiqueta.split(' ');
    this.gasto.anyadirEtiquetas(nuevaEtiqueta);

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










export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}