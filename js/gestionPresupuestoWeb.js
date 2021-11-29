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

    // Botón editar (Formulario)
    const botonEditarFormularioHTLM = document.createElement('button');
    botonEditarFormularioHTLM.className = 'gasto-editar-formulario';
    const botonEditarFormularioText = document.createTextNode('Editar (Formulario)');
    botonEditarFormularioHTLM.appendChild(botonEditarFormularioText);
    gastoHTLM.appendChild(botonEditarFormularioHTLM);

    const editarHandlerformulario = new EditarHandleformulario();
    editarHandlerformulario.gasto = gasto;
    botonEditarFormularioHTLM.addEventListener('click', editarHandlerformulario);

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

function nuevoGastoWebFormulario(event) {

    // Identificamos y desactivamos el botón 
    const botonAnyadirGasto = event.currentTarget;
    botonAnyadirGasto.disabled = true;

    // Clonamos la plantilla
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    // Evento de envío
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log(formulario.valor);

        const gasto = new gestionPresupuesto.CrearGasto(
            formulario.descripcion.value,
            parseInt(formulario.valor.value),
            formulario.fecha.value,
            formulario.etiquetas.value.split(',')
        );

        gestionPresupuesto.anyadirGasto(gasto);
        botonAnyadirGasto.disabled = false;
        repintar();
    });

    // Creación del manejador y evento de cancelación.
    const cerrarFormularioHandler = new CerrarFormularioHandle();
    cerrarFormularioHandler.formulario = formulario;
    cerrarFormularioHandler.botonActivar = botonAnyadirGasto;
    formulario.querySelector("button.cancelar").addEventListener('click', cerrarFormularioHandler);

    // Añadimos el formulario al dom.
    document.getElementById('controlesprincipales').appendChild(plantillaFormulario);
}

function filtrarGastosWeb(event) {
    event.preventDefault();

    const elementosFormulario = event.currentTarget.elements;
    const etiquetas = elementosFormulario['formulario-filtrado-etiquetas-tiene'].value;

    // Objeto filtro.
    const filtros = {
        descripcionContiene: elementosFormulario['formulario-filtrado-descripcion'].value || undefined,
        valorMinimo: elementosFormulario['formulario-filtrado-valor-minimo'].value || undefined,
        valorMaximo: elementosFormulario['formulario-filtrado-valor-maximo'].value || undefined,
        fechaDesde: elementosFormulario['formulario-filtrado-fecha-desde'].value || undefined,
        fechaHasta: elementosFormulario['formulario-filtrado-fecha-hasta'].value || undefined,
        etiquetasTiene: gestionPresupuesto.transformarListadoEtiquetas(etiquetas) || undefined
    }

    console.log(filtros);

    // Borramos listado actual.
    document.getElementById('listado-gastos-completo').innerHTML = '';

    // Filtramos los gastos.
    const gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);

    // Pintamos los gastos filtrados.
    gastosFiltrados.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
    
}

function guardarGastosWeb() {
    const gastos = gestionPresupuesto.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(gastos));
}

function cargarGastosWeb() {
    const gastos = JSON.parse(localStorage.getItem('GestorGastosDWEC')) || [];
    gestionPresupuesto.cargarGastos(gastos);
    repintar();
}

function EditarHandle() {
    this.handleEvent = function(event) {
        this.gasto.actualizarDescripcion(prompt('Descripcion', this.gasto.descripcion));
        this.gasto.actualizarValor(parseFloat(prompt('Valor', this.gasto.valor)));
        this.gasto.actualizarFecha(prompt('Fecha (yyyy-mm-dd)', new Date(this.gasto.fecha).toISOString().substr(0,10)));
        this.gasto.anyadirEtiquetas(...prompt('Etiquetas (separadas por coma)', this.gasto.etiquetas).split(','));
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

function CerrarFormularioHandle() {
    this.handleEvent = event => {
        this.formulario.remove();
        this.botonActivar.disabled = false;
    }
}

function EditarHandleformulario() {
    this.handleEvent = event => {
        // Identificamos y desactivamos el botón 
        const botonEditarGasto = event.currentTarget;
        botonEditarGasto.disabled = true;

        // Clonamos la plantilla
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        // Valores actuales del gasto
        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.etiquetas.value = this.gasto.etiquetas;

        // Creación del manejador y evento de envío.
        const enviarEditarHandler = new EnviarEditarHandle();
        enviarEditarHandler.gasto = this.gasto;
        formulario.addEventListener('submit', enviarEditarHandler);

        // Creación del manejador y evento de cancelación.
        const cerrarFormularioHandler = new CerrarFormularioHandle();
        cerrarFormularioHandler.formulario = formulario;
        cerrarFormularioHandler.botonActivar = botonEditarGasto;
        formulario.querySelector("button.cancelar").addEventListener('click', cerrarFormularioHandler);

        // Añadimos el formulario como último elemento del gasto.
        event.currentTarget.after(formulario);
    }
}

function EnviarEditarHandle() {
    this.handleEvent = event => {
        event.preventDefault();
        let formulario = event.currentTarget;

        this.gasto.actualizarDescripcion(formulario.descripcion.value);
        this.gasto.actualizarValor(parseFloat(formulario.valor.value));
        this.gasto.actualizarFecha(formulario.fecha.value);
        this.gasto.anyadirEtiquetas(...formulario.etiquetas.value.split(','));

        repintar();
    }
}

// Eventos
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);
document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario);
document.getElementById('formulario-filtrado').addEventListener('submit', filtrarGastosWeb);
document.getElementById('guardar-gastos').addEventListener('click', guardarGastosWeb);
document.getElementById('cargar-gastos').addEventListener('click', cargarGastosWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}