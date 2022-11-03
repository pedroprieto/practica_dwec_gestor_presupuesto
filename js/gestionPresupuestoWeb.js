//Importamos para acceder a las funciones
import * as gestPresupuesto from ("./gestionPresupuesto.js");

//Funciones


function mostrarDatoEnId (idElemento, valor) {

    let datosId = document.getElementById(idElemento);
    datosId.innerHTML = (valor);
    document.presupuesto.append(datosId);
    

}

function mostrarGastoWeb (idElemento, gasto) {

    let datosId = document.getElementById(idElemento);
    //Recorrer las etiquetas.


}

function mostrarGastosAgrupadosWeb ( IdElemento, agrup, periodo) {

}




// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}