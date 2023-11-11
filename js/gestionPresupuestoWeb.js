function mostrarDatoEnId(idElemento, valor) {
    const elem = document.querySelector(`#${idElemento}`);
    if (elem) {
        elem.innerHTML = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    const elem = document.querySelector(`#${idElemento}`);
    if (!elem)
        return;
    elem.innerHTML += `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
            <div class="gasto-valor">${gasto.valor.toFixed(2)} €</div> 
            <div class="gasto-etiquetas">
            ${
                gasto.etiquetas.map(etiqueta => `
                <span class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </span>
                `).join("\n")
            }
            </div> 
        </div>
    `;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
}