function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.querySelector(`#${idElemento}`);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.querySelector(`#${idElemento}`);
    let texto = `
  <div class="gasto">
    <div class="gasto-descripcion">${gasto.descripcion}</div>
    <div class="gasto-fecha">${(new Date(gasto.fecha)).toLocaleString()}</div> 
    <div class="gasto-valor">${gasto.valor} €</div> 
    <div class="gasto-etiquetas">
        ${gasto.etiquetas.map(etiqueta => `
            <span class="gasto-etiquetas-etiqueta">
                ${etiqueta}
            </span>
        `).join("\n")}
    </div> 
  </div>`
  elemento.innerHTML += texto;
}

function mostrarGastosAgrupadosWeb() {

}

export {    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}