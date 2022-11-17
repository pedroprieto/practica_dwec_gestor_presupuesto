function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento, valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let html = "";
    html += `<div class="gasto">`;
    html += `  <div class="gasto-descripcion">${gasto.descripcion}</div>`;
    html += `   <div class="gasto-fecha">${gasto.fecha}</div> `;
    html += `   <div class="gasto-valor">${gasto.valor}</div> `;
    html += `   <div class="gasto-etiquetas">`;
    for(let etiqueta of gasto.etiquetas){
        html += `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`;
    }
    html += `   </div>`;
    html += `</div>`;
    mostrarDatoEnId(idElemento, html);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let html = "";
     html +=  `<div class="agrupacion">`;     
     html +=  ` <h1>Gastos agrupados por ${periodo}</h1>`;   
     for (let [key, value] of agrup) {             
        html +=  `<div class="agrupacion-dato">`;                 
        html +=  `<span class="agrupacion-dato-clave">${key}</span>`;                 
        html +=  `<span class="agrupacion-dato-valor">${value}</span>`;                 
        html +=  `</div>`;        
     }              
     html +=  `</div>`;  
     mostrarDatoEnId(idElemento, html);               
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
