import * as gesGasTos from "/js/gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    var p = document.createElement("p");
    var text= document.createTextNode(valor);
    p.appendChild(text);
    document.getElementById(idElemento).appendChild(p);
}

function mostrarGastoWeb(){}
function mostrarGastosAgrupadosWeb(){}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}