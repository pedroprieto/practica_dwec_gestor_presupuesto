'use strict';



function mostrarDatoEnId(idElemento, valor){

    let div = document.getElementById(idElemento);
    div.innerHTML = valor;
}


function mostrarGastoWeb(idElemento, gasto){
    
    let cuerpo = document.getElementById(idElemento);
    let divEtiquetas = "";

    for (let eti of gasto.etiquetas) {
         divEtiquetas += `
        <div class="gasto-etiquetas-etiqueta">
            ${eti}
        </div>
     `
    }
    cuerpo.innerHTML += `
    <div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
        ${divEtiquetas}
        </div>
    </div>
    `;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let cuerpo = document.getElementById(idElemento);
    let divAgrupados = "";


    for (const[key, value] of Object.entries(agrup)) {
        
        divAgrupados += `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${value}</span>
            </div>
        `;
    }   

    cuerpo.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
            ${divAgrupados}
        </div>
    `;
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}