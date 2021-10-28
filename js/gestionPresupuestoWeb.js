"use strict";

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.innerHTML = `${valor}€`;
    document.body.append(mostrar);
}

function mostrarGastoWeb(idElemento, gasto){
    let mostrar = document.getElementById(idElemento);
    mostrar.innerHTML = 
        `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
        `;

    for(let etiqueta of gasto.etiquetas){
        mostrar.innerHTML += `
        <span class="gasto-etiquetas-etiqueta">
            ${etiqueta}
        </span>       
        `;
    }

    mostrar.innerHTML += `
        </div> 
        </div>
    `;
    
    document.body.append(mostrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let mostrar = document.getElementById(idElemento);

    mostrar.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
    `;

    for(let agru of Object.entries(agrup)){
        mostrar.innerHTML += `
            <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${Object.keys(agru[0])}</span>
            <span class="agrupacion-dato-valor">${Object.keys(agru[1])}</span>
            </div>
        `;
    }

    mostrar.innerHTML += `
        </div>
    `;

    document.body.append(mostrar);
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}