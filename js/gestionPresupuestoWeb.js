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

function mostrarGastosAgrupadosWeb(idElemento, gastosAgrupados, tipoAgrupacion) {
    let texto = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${tipoAgrupacion}</h1>
            ${Object.keys(gastosAgrupados).map(clave => `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${clave}</span>
                    <span class="agrupacion-dato-valor">${gastosAgrupados[clave]}</span>
                </div>
            `).join("\n")}
        </div>
    `;
    mostrarDatoEnId(idElemento, texto);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}