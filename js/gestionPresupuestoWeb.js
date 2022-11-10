//Importamos para acceder a las funciones
//import * as gestPresupuesto from "./gestionPresupuesto.js";

//Funciones


function mostrarDatoEnId (idElemento, valor) {

    let datosId = document.getElementById(idElemento);
    datosId.innerText = valor;
    

}

function mostrarGastoWeb (idElemento, gasto) {

    // div gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //div descripcion.
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;
    //div fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    //div valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    //Div etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = gasto.etiquetas;
        divEtiquetas.append(spanEti);
    }
    


    //componer el objeto+
    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);

    //Añadir gasto al div
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb ( IdElemento, agrup, periodo) {

}




// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}