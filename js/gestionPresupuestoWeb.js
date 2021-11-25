import * as gestionPresupuesto from './gestionPresupuesto.js';

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

function mostrarGastosAgrupadosWeb(idElemento, agrupacion, periodo) {
    // Elemento raiz de la agrupación
    const agrupacionHTLM = document.createElement('div');
    agrupacionHTLM.className = 'agrupacion';

    // Titulo
    const tituloHTML = document.createElement('h1');
    const tituloText = document.createTextNode(`Gastos agrupados por ${periodo}`);
    tituloHTML.appendChild(tituloText);
    agrupacionHTLM.appendChild(tituloHTML);

    // Agrupación
    for (const agrupacionDato in agrupacion) {

        // Elemento raiz del dato de la agrupación
        const agrupacionDatoHTML = document.createElement('div');
        agrupacionDatoHTML.className = 'agrupacion-dato';

        // Clave dato agrupación
        const agrupacionDatoClaveHTML = document.createElement('span');
        agrupacionDatoClaveHTML.className = 'agrupacion-dato-clave';
        const agrupacionDatoClaveText = document.createTextNode(agrupacionDato);
        agrupacionDatoClaveHTML.appendChild(agrupacionDatoClaveText);
        agrupacionDatoHTML.appendChild(agrupacionDatoClaveHTML);

        // Valor dato agrupación
        const agrupacionDatoValorHTML = document.createElement('span');
        agrupacionDatoValorHTML.className = 'agrupacion-dato-valor';
        const agrupacionDatoValorText = document.createTextNode(agrupacion[agrupacionDato]);
        agrupacionDatoValorHTML.appendChild(agrupacionDatoValorText);
        agrupacionDatoHTML.appendChild(agrupacionDatoValorHTML);

        // Añadir dato agrupación al elemento raiz.
        agrupacionHTLM.appendChild(agrupacionDatoHTML);
    }
    
    document.getElementById(idElemento).append(agrupacionHTLM);
}

function repintar() {
    // Actualizar datos.
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    // Limpiar listado de gastos.
    document.getElementById('listado-gastos-completo').innerHTML = '';

    // Listado completo de gastos.
    const listadoGastos = gestionPresupuesto.listarGastos();
    listadoGastos.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}

function actualizarPresupuestoWeb() {
    gestionPresupuesto.actualizarPresupuesto(parseInt(prompt('Nuevo presupuesto:', gestionPresupuesto.presupuesto)));
    repintar();
}

// Eventos
const botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', () => actualizarPresupuestoWeb());

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}