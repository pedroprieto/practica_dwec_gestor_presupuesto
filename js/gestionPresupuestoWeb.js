"use strict";

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.innerHTML = `${valor}€`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);
    let txtEtiquetas = "";

    for(let etiqueta of gasto.etiquetas){
        txtEtiquetas += `
                <span class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </span>       
        `;
    }

    mostrar.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
            ${txtEtiquetas}
            </div>
            </div>
        `;
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let mostrar = document.getElementById(idElemento);
    let txtEtiquetas = "";

    for(const [key, value] of Object.entries(agrup)){
        txtEtiquetas += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>  
        </div>
        `;
    }

    mostrar.innerHTML = `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${txtEtiquetas}
    </div>
`;

}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}