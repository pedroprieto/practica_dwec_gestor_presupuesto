import { mostrarPresupuesto } from "./gestionPresupuesto";

function mostrarDatoEnId(idElemento, valor){

    let mostrar = document.getElementById(idElemento);

    mostrar.textContent = valor;

    
};

function mostrarGastoWeb(){


};

function mostrarGastosAgrupadosWeb(){


};

export {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}