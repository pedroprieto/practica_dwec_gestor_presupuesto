import * as gesGasTos from "/js/gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    var p = document.createElement("p");
    var text= document.createTextNode(valor);
    p.appendChild(text);
    document.getElementById(idElemento).appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    const gastoElement = document.createElement('div');
    gastoElement.classList.add('gasto');        
    //descripcion
    const descripcionElement = document.createElement('div');
    descripcionElement.classList.add('gasto-descripcion');
    descripcionElement.textContent = gasto.descripcion;
    gastoElement.appendChild(descripcionElement);
    //fecha
    const fechaElement = document.createElement('div');
    fechaElement.classList.add('gasto-fecha');
    fechaElement.textContent = new Date(gasto.fecha).toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"});
    gastoElement.appendChild(fechaElement);
    //valor
    const valorElement = document.createElement('div');
    valorElement.classList.add('gasto-valor');
    valorElement.textContent = gasto.valor;
    gastoElement.appendChild(valorElement);
    //etiquetas
    var etiquetasElement = document.createElement('div');
    etiquetasElement.classList.add('gasto-etiquetas');
    for (var g of gasto.etiquetas){
        var etiquetaElement = document.createElement('span');
        etiquetaElement.classList.add('gasto-etiquetas-etiqueta');
        etiquetaElement.textContent = g;
        etiquetasElement.appendChild(etiquetaElement);
    }
    
    gastoElement.appendChild(etiquetasElement);
    
    var contenedor= document.getElementById(idElemento);
    contenedor.appendChild(gastoElement);
}
function mostrarGastosAgrupadosWeb(idElemento,id,agrup){}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}