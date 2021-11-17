import * as gesPres from "./gestionPresupuesto.js";


let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);



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
    parseInt(newPresupuesto, 10);
    gesPres.actualizarPresupuesto(newPresupuesto);
    repintar();
    calcularBalance();  
    
}

function nuevoGastoWeb() {
    
    let newDescripcion = prompt("Introduce una descripción");
    let newValor = prompt("Introduce un Valor");
    parseInt(newValor, 10);
    let newFecha = prompt("Introduce una fecha");
    let newEtiqueta = prompt("Introduce las etiquetas separadas por comas");
    
    


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
    
    for (let etiqueta of gasto.etiquetas) {
        
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${etiqueta}, `);
        divGastoEtiquetas.append(span);        
    }

    
    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divGastoEtiquetas);
    
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