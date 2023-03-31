
function mostrarDatoEnId(idElemento, valor) {   
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let idElement = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
        divGasto.className = "gasto";

    let divDesc = document.createElement('div');
        divDesc.className = "gasto-descripcion";
        divDesc.append(gasto.descripcion);

    let divDate = document.createElement('div');
        divDate.className = "gasto-fecha";
        divDate.append(gasto.fecha);

    let divVal = document.createElement('div');
        divVal.className = "gasto-valor";
        divVal.append(gasto.valor);

    let divTag = document.createElement('div');
        divTag.className = "gasto-etiquetas";

        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className="gasto-etiquetas-etiqueta";
            span.textContent = etiqueta + " ";

            divTag.append(span);
        });
       
    divGasto.append(divDesc, divDate, divVal, divTag);

    idElement.append(divGasto);      
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const element = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };

    element.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}