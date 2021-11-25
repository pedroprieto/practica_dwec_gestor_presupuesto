function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    // Elemento raiz del gasto
    const gastoHTLM = document.createElement('div');
    gastoHTLM.className = 'gasto';

    // Descripción
    const descripcionHTML = document.createElement('div');
    descripcionHTML.className = 'gasto-descripcion';
    const descripcionText = document.createTextNode(gasto.descripcion);
    descripcionHTML.appendChild(descripcionText);
    gastoHTLM.appendChild(descripcionHTML);

    // Fecha
    const fechaHTML = document.createElement('div');
    fechaHTML.className = 'gasto-fecha';
    const fechaText = document.createTextNode(new Date(gasto.fecha).toLocaleString());
    fechaHTML.appendChild(fechaText);
    gastoHTLM.appendChild(fechaHTML);

    // Valor
    const valorHTML = document.createElement('div');
    valorHTML.className = 'gasto-valor';
    const valorText = document.createTextNode(gasto.valor);
    valorHTML.appendChild(valorText);
    gastoHTLM.appendChild(valorHTML);

    // Etitquetas
    const etiquetasHTML = document.createElement('div');
    etiquetasHTML.className = 'gasto-etiquetas';
    const etiquetas = gasto.etiquetas;
    etiquetas.forEach(etiqueta => {
        const etiquetaHTML = document.createElement('span');
        etiquetaHTML.className = 'gasto-etiquetas-etiqueta';
        const etiquetaText = document.createTextNode(etiqueta);
        etiquetaHTML.appendChild(etiquetaText);
        etiquetasHTML.appendChild(etiquetaHTML);
    });
    gastoHTLM.appendChild(etiquetasHTML);

    document.getElementById(idElemento).append(gastoHTLM);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, agrupacion) {
    let agrupacionHTLM = document.createElement('div', {class: 'agrupacion'});
    document.getElementById(idElemento).innerHTML = agrupacionHTLM;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}