import * as objGasto from '../js/gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    //Puede usarse innerText no interpretará si ponemos estiquetas ej: <b>Negrita</b> con innerHTML lo pone en negrita con Text solo lo leerá.
    elem.innerHTML = valor;            
    
}

function mostrarGastoWeb(idElemento, gasto) {
    
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //Div hijo descripcion:
    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;

      let divFecha = document.createElement("div");
    divFecha .className = "gasto-fecha";
    divFecha .innerText = gasto.fecha ;

      let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

        //Es una lista de etiquetas: 
    for (let eti of gasto.etiquetas) {
         let spanEtiquetas = document.createElement("span");
         spanEtiquetas.className = "gasto-etiquetas";
         spanEtiquetas.innerText = gasto.etiquetas;
         divEtiquetas.append(spanEtiquetas);
    }
      
    

        //componer objeto gasto:
    divGasto.append(divDesc);
    divFecha.append(divFecha);
    divValor.append(divValor);
    divEtiquetas.append(divEtiquetas);

        // Añadir gasto a la capa contenedora: 
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divDesc);
}


function mostrarGastosAgrupadosWeb (){}






export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,

}