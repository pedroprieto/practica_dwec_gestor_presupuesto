import * as objGasto from '../js/gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    //Puede usarse innerHTML. El InnerText no interpretará si ponemos estiquetas ej: <b>Negrita</b> con innerHTML lo pone en negrita con Text solo lo leerá.
    elem.innerText = valor;            
}

function mostrarGastoWeb(idElemento, gasto) {
    
    // div gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //Div hijo descripcion:
    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;

      let divFecha = document.createElement("div");
    divFecha .className = "gasto-fecha";
    divFecha .innerText =gasto.fecha ;

      let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

        //Es una lista de etiquetas: 
    for (let eti of gasto.etiquetas) {
         let spanEtiquetas = document.createElement("span");
         spanEtiquetas.className = "gasto-etiquetas";
         spanEtiquetas.innerText = eti;
         divEtiquetas.append(spanEtiquetas);
    }
        //componer objeto gasto:
    divGasto.append(divDesc);
    divGasto.append(divFecha);
    divGasto.append(divValor);
    divGasto.append(divEtiquetas);

        // Añadir gasto a la capa contenedora: 
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb (){}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,

}