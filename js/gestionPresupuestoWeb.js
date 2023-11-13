import * as gp from "./gestionPresupuesto.js";

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
        </div>`;
    elemento.innerHTML += texto;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.querySelector(`#${idElemento}`);
    let texto = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
                ${Object.entries(agrup).map(propiedad => `
                    <div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${propiedad[0]}</span>
                        <span class="agrupacion-dato-valor">${propiedad[1]}</span>
                    </div>
                `).join("\n")}     
        </div>`;
    elemento.innerHTML += texto;
}

function repintar() {    
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos().toFixed(2));

    mostrarDatoEnId("balance-total", gp.calcularBalance().toFixed(2));

    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (const gasto of gp.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}