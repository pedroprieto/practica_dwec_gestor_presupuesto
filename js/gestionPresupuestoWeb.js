import * as gestionPresupuesto from './gestionPresupuesto.js';

const apiUrl = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest";

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

    // Botón borrar gasto API
    const botonBorrarApiHTLM = document.createElement('button');
    botonBorrarApiHTLM.className = 'gasto-borrar-api';
    const botonBorrarApiText = document.createTextNode('Borrar (API)');
    botonBorrarApiHTLM.appendChild(botonBorrarApiText);
    gastoHTLM.appendChild(botonBorrarApiHTLM);

    const borrarApiHandler = new BorrarApiHandle();
    borrarApiHandler.gasto = gasto;
    botonBorrarApiHTLM.addEventListener('click', borrarApiHandler);

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

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

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

    divP.append(agrupacionHTLM);

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
        case "anyo":
            unit = "year";
            break;
        case "mes":
            unit = "month";
            break;
        case "dia":
        default:
            unit = "day";
            break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    divP.append(chart);
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

    // Creación del manejador y evento de enviar a API.
    const enviarGastoApiHandler = new EnviarGastoApiHandle();
    enviarGastoApiHandler.formulario = formulario;
    formulario.querySelector("button.gasto-enviar-api").addEventListener('click', enviarGastoApiHandler);

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

function cargarGastosApi() {
    const nombreUsuario = document.getElementById('nombre_usuario').value;
    fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario)
        .then(response => response.json())
        .then(gastos => {
            gestionPresupuesto.cargarGastos(gastos);
            repintar()
        })
}

function EnviarGastoApiHandle() {
    this.handleEvent = function (event) {
        const nombreUsuario = document.getElementById('nombre_usuario').value;

        const gastoJson = {
            "valor": this.formulario.valor.value,
            "descripcion": this.formulario.descripcion.value,
            "fecha": this.formulario.fecha.value,
            "etiquetas": this.formulario.etiquetas.value.split(","),
        }

        fetch(`${apiUrl}/${nombreUsuario}`, {
            method: "POST",
            body: JSON.stringify(gastoJson),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(cargarGastosApi)
    }
}

function EditarGastoApiHandle() {
    this.handleEvent = function (event) {
        const nombreUsuario = document.getElementById('nombre_usuario').value;

        const gastoJson = {
            "valor": this.formulario.valor.value,
            "descripcion": this.formulario.descripcion.value,
            "fecha": this.formulario.fecha.value,
            "etiquetas": this.formulario.etiquetas.value.split(","),
        }

        fetch(`${apiUrl}/${nombreUsuario}/${this.gasto.gastoId}`, {
            method: "PUT",
            body: JSON.stringify(gastoJson),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(cargarGastosApi)
    }
}

function EditarHandle() {
    this.handleEvent = function (event) {
        this.gasto.actualizarDescripcion(prompt('Descripcion', this.gasto.descripcion));
        this.gasto.actualizarValor(parseFloat(prompt('Valor', this.gasto.valor)));
        this.gasto.actualizarFecha(prompt('Fecha (yyyy-mm-dd)', new Date(this.gasto.fecha).toISOString().substr(0, 10)));
        this.gasto.anyadirEtiquetas(...prompt('Etiquetas (separadas por coma)', this.gasto.etiquetas).split(','));
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarApiHandle() {
    this.handleEvent = function (event) {
        const nombreUsuario = document.getElementById('nombre_usuario').value;
        fetch(`${apiUrl}/${nombreUsuario}/${this.gasto.gastoId}`, { method: 'DELETE' })
            .then(cargarGastosApi)
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
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
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0, 10);
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

        // Creación del manejador y evento de enviar a API.
        const editarGastoApiHandler = new EditarGastoApiHandle();
        editarGastoApiHandler.formulario = formulario;
        editarGastoApiHandler.gasto = this.gasto;
        formulario.querySelector("button.gasto-enviar-api").addEventListener('click', editarGastoApiHandler);

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
document.getElementById('cargar-gastos-api').addEventListener('click', cargarGastosApi);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
