import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
    }
    
function mostrarGastoWeb(idElemento, gasto) {
alert("mostrarGastoWeb");

let elemento = document.getElementById(idElemento);
let nuevoGastoDiv = document.createElement('div');
nuevoGastoDiv.classList.add(`gasto`);


elemento.append(nuevoGastoDiv);  //appendChild?

}

    
function mostrarGastosAgrupadosWeb () {
    
}

export{
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}    