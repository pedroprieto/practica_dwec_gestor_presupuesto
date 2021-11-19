import * as gesPres from "./gestionPresupuesto.js";


let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener('click',nuevoGastoWeb);

function repintar() {
    
    mostrarDatoEnId("presupuesto",gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    for (let gasto of gesPres.listarGastos()) {

        mostrarGastoWeb("listado-gastos-completo", gasto);

    }    

}

function actualizarPresupuestoWeb() {
    
    let newPresupuesto = prompt("Introduce un Presupuesto");
    newPresupuesto = parseInt(newPresupuesto, 10);
    gesPres.actualizarPresupuesto(newPresupuesto);
    repintar();
   
}

function nuevoGastoWeb() {
    
    let newDescripcion = prompt("Introduce una descripción");
    let newValor = prompt("Introduce un Valor");
    newValor = parseInt(newValor, 10);
    let newFecha = prompt("Introduce una fecha");
    let newEtiqueta = prompt("Introduce las etiquetas separadas por comas");

    let etiquetasSueltas = newEtiqueta.split(', ');

    let gastoNuevo = new gesPres.CrearGasto(newDescripcion, newValor, newFecha, etiquetasSueltas);
    
    gesPres.anyadirGasto(gastoNuevo);

    repintar();  
    
}


function EditarHandle(){

    this.handleEvent= function(e){

        let descripcion = prompt("Introduce una descripción");
        let valor = prompt("Introduce el gasto");        
        let fecha = prompt("Introduce la fecha");
        let etiqueta = prompt("Introduce las etiquetas");
        valor = parseFloat(valor);
        let etiquetasSueltas = etiqueta.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSueltas);

        repintar();
    }

}

function BorrarHandle() {
    
    this.handleEvent = function (e) {
        
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }

}

function BorrarEtiquetasHandle() {
    
    this.handleEvent = function (e) {
        
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }

    
}


function mostrarDatoEnId(idElemento, valor){

       
    document.getElementById(idElemento).innerHTML = valor;
       
};


function mostrarGastoWeb(idElemento, gasto){

    let divPrincipal = document.getElementById(idElemento);   
    

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    
    
    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.append(gasto.descripcion);
    
    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.append(gasto.fecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className = "gasto-valor";
    divGastoValor.append(gasto.valor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = "gasto-etiquetas"
    
    
    let btnEditar = document.createElement('button');
    btnEditar.type = "button";
    btnEditar.id = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.className = "gasto-editar";

    let eventoEditar = new EditarHandle();
    eventoEditar.gasto = gasto;
    btnEditar.addEventListener('click', eventoEditar);



    let btnBorrar = document.createElement('button');
    btnBorrar.type = "button";
    btnBorrar.id = "gasto-bprrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.className = "gasto-borrar";

    let eventoBorrar = new BorrarHandle();
    eventoBorrar.gasto = gasto;
    btnBorrar.addEventListener('click', eventoBorrar);

    

    for (let etiqueta of gasto.etiquetas) {
        
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta + ", ";
        divGastoEtiquetas.append(spanEtiqueta);

        let eventoBorrarEtiqueta = new BorrarEtiquetasHandle();
        eventoBorrarEtiqueta.gasto = gasto;
        eventoBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener('click', eventoBorrarEtiqueta);
    }

    
    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divGastoEtiquetas);
    divGasto.append(btnEditar);
    divGasto.append(btnBorrar);
    
    divPrincipal.append(divGasto);

};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
   
    let divPrincipal = document.getElementById(idElemento);


    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    
    let h1Titulo = document.createElement('h1');
    
    h1Titulo.innerHTML = "Gastos agrupados por" + periodo;
    divAgrupacion.append(h1Titulo);

    for (let [key, value] of Object.entries(agrup)) {
        
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = "agrupacion-dato";

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
        spanAgrupacionDatoClave.append(key);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.className = "agrupacion-dato-valor";
        spanAgrupacionDatoValor.append(value);

        divAgrupacionDato.append(spanAgrupacionDatoClave);
        divAgrupacionDato.append(spanAgrupacionDatoValor);
        divAgrupacion.append(divAgrupacionDato);        

    }    

    divPrincipal.append(divAgrupacion);

};

export {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}