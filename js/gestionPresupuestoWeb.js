"use strict";



function mostrarDatoEnId(idElemento, valor){
    idElemento.append(valor);
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrarGasto = document.getElementById(idElemento);
    let arrayEtiquetas = "";

    for ( let etiqueta of gasto.etiquetas ) {
        arrayEtiquetas += `
            <span class="gasto-etiquetas-etiqueta">${etiqueta}</span>
        `
    }

    mostrarGasto.innerHTML += `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">${arrayEtiquetas}</div>
        </div>
    `;

}


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb
} 