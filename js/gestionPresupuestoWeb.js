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

        const borrarEtiquetasHandler = new BorrarEtiquetasHandle();
        borrarEtiquetasHandler.gasto = gasto;
        borrarEtiquetasHandler.etiqueta = etiqueta;
        etiquetaHTML.addEventListener('click', borrarEtiquetasHandler);
    });
    gastoHTLM.appendChild(etiquetasHTML);



    // Botón editar
    const botonEditarHTLM = document.createElement('button');
    botonEditarHTLM.className = 'gasto-editar';
    const botonEditarText = document.createTextNode('Editar');
    botonEditarHTLM.appendChild(botonEditarText);
    gastoHTLM.appendChild(botonEditarHTLM);

    const editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;
    botonEditarHTLM.addEventListener('click', editarHandler);

    // Botón borrar
    const botonBorrarHTLM = document.createElement('button');
    botonBorrarHTLM.className = 'gasto-borrar';
    const botonBorrarText = document.createTextNode('Borrar');
    botonBorrarHTLM.appendChild(botonBorrarText);
    gastoHTLM.appendChild(botonBorrarHTLM);

    const borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;
    botonBorrarHTLM.addEventListener('click', borrarHandler);

    // Agregar el elemento gasto al ID objetivo
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

function nuevoGastoWeb() {
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(
        prompt('Descripción'),
        parseFloat(prompt('Valor')),
        prompt('Fecha (yyyy-mm-dd)'),
        prompt('Etiquetas (separadas por coma)', '').split(',')
    ));

    repintar();
}

function EditarHandle() {
    this.handleEvent = function(event) {
        this.gasto.actualizarDescripcion(prompt('Descripcion', this.gasto.descripcion));
        this.gasto.actualizarValor(parseFloat(prompt('Valor', this.gasto.valor)));
        this.gasto.actualizarFecha(prompt('Fecha (yyyy-mm-dd)', new Date(this.gasto.fecha).toLocaleString()));
        this.gasto.anyadirEtiquetas(prompt('Etiquetas (separadas por coma)', '').split(','));

        //const etiquetas = this.gasto.etiquetas;
        //this.gasto.borrarEtiquetas();
        //this.gasto.anyadirEtiquetas(prompt('Etiquetas (separadas por coma)', etiquetas.join(',')).split(','));

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(event) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

// Eventos
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}