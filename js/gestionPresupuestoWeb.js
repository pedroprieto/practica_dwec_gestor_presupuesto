import * as gestionPresupuesto from './gestionPresupuesto.js';
//import Chart from '/node_modules/chart.js/auto/auto.js';
//import 'chartjs-adapter-moment/dist/chartjs-adapter-moment.js';
//import Chart from 'chart.js/auto';
//import 'moment';
//import 'chartjs-adapter-moment';

let baseUrl = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/';

function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let element = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    element.appendChild(divGasto);

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divGasto.appendChild(divDescripcion);
    divDescripcion.innerHTML = gasto.descripcion;

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divGasto.appendChild(divValor);
    divValor.innerHTML = gasto.valor;

    let fechaFormateada = new Date(gasto.fecha).toISOString().substring(0,10);
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divGasto.appendChild(divFecha);
    divFecha.innerHTML = fechaFormateada;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

    for (let etiqueta of gasto.etiquetas) {
        let divEtiqueta = document.createElement("span");
        divEtiqueta.className = "gasto-etiquetas-etiqueta";
        divEtiquetas.appendChild(divEtiqueta);
        divEtiqueta.innerHTML = etiqueta;

        let borrarEtiqEvent = new BorrarEtiquetasHandle();
        borrarEtiqEvent.gasto = gasto;
        borrarEtiqEvent.etiqueta = etiqueta;
        divEtiqueta.addEventListener("click", borrarEtiqEvent);
    }

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar"
    botonEditar.innerHTML = "Editar";
    divGasto.append(botonEditar);
    let editarEvent = new EditarHandle();
    editarEvent.gasto = gasto;
    botonEditar.addEventListener("click", editarEvent);
    
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar"
    botonBorrar.innerHTML = "Borrar";
    divGasto.append(botonBorrar);
    let borrarEvent = new BorrarHandle();
    borrarEvent.gasto = gasto;
    botonBorrar.addEventListener("click", borrarEvent); 

    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.type = "button";
    botonBorrarApi.className = "gasto-borrar-api"
    botonBorrarApi.innerHTML = "Borrar (API)";
    divGasto.append(botonBorrarApi);
    let borrarApiEvent = new BorrarApiHandle();
    borrarApiEvent.gasto = gasto;
    botonBorrarApi.addEventListener("click", borrarApiEvent); 

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.className = "gasto-editar-formulario"
    botonEditarFormulario.innerHTML = "Editar (formulario)";
    divGasto.append(botonEditarFormulario);
    let editarFormularioEvent = new EditarHandleformulario();
    editarFormularioEvent.gasto = gasto;
    botonEditarFormulario.addEventListener("click", editarFormularioEvent);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let periodoText;
    if(periodo == 'dia') {
        periodoText = 'día';
    } else if(periodo == 'anyo') {
        periodoText = 'año';
    } else {
        periodoText = periodo;
    }

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
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    let element = document.getElementById('listado-gastos-completo');
    element.innerHTML = '';

    let listaGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listaGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }

    let gastosAgrupadosDia = gestionPresupuesto.agruparGastos('dia');
    mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosDia, 'dia');

    let gastosAgrupadosMes = gestionPresupuesto.agruparGastos('mes');
    mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosMes, 'mes');

    let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos('anyo');
    mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosAnyo, 'anyo');
}

function actualizarPresupuestoWeb() {
    let newPresupuesto = prompt('Introduzca el nuevo presupuesto');
    gestionPresupuesto.actualizarPresupuesto(parseFloat(newPresupuesto));
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = pedirDescripcionGasto();
    if(descripcion != null) {
        let valor = pedirValorGasto();
        if(valor != null) {
            let fechaStr = pedirFechaGasto();
            if(fechaStr != null) {
                let etiquetas = pedirEtiquetasGasto();
                if(etiquetas != null) {
                    let newGasto = etiquetas ? new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr, ...etiquetas) : new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr);
                    gestionPresupuesto.anyadirGasto(newGasto);
                }
            }
        }
    }
    repintar();
}

function EditarHandle() {
    this.handleEvent = function(e) {
        let descripcion = pedirDescripcionGasto(this.gasto.descripcion);
        if(descripcion != null) {
            let valor = pedirValorGasto(this.gasto.valor);
            if(valor != null) {
                let fechaStr = pedirFechaGasto(this.gasto.fecha);
                if(fechaStr != null) {
                    let etiquetas = pedirEtiquetasGasto();
                    if(etiquetas != null) {
                        this.gasto.actualizarDescripcion(descripcion);
                        this.gasto.actualizarFecha(fechaStr);
                        this.gasto.actualizarValor(valor);
                        this.gasto.anyadirEtiquetas(etiquetas);
                    }
                }
            }
        }

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarApiHandle() {
    this.handleEvent = async function(e) {
        let usuario = document.getElementById('nombre_usuario').value;
        let url = baseUrl + usuario + '/' + this.gasto.gastoId;
        let respuesta = await fetch(url, { method: 'DELETE' });
        if (respuesta.ok) { 
            cargarGastosApi();
        } else {
            alert("Error-HTTP: " + respuesta.status);
        }
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function pedirDescripcionGasto(datoActual = "") {
    let descripcion = prompt('Introduzca la descripción', datoActual);
    return descripcion;
}

function pedirValorGasto(datoActual = "") {
    let valorStr = prompt('Introduzca el valor', datoActual);
    if(valorStr == null) {
        return null;
    }
    let valor = parseFloat(valorStr);
    return valor;
}

function pedirFechaGasto(datoActual) {
    let fechaLocale = datoActual ? new Date(datoActual).toISOString().substring(0,10) : "";
    let fechaStr = prompt('Introduzca la fecha en formato yyyy-mm-dd', fechaLocale);
    return fechaStr;
}

function pedirEtiquetasGasto(datoActual = "") {
    let etiquetasStr = prompt('Introduzca las etiquetas separadas por comas', datoActual);
    let etiquetas;
    if(etiquetasStr != "") {
        etiquetas = etiquetasStr.split(',');
    }
    return etiquetas;
}

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    formulario.addEventListener("submit", submitGastoHandle);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelarGastoEvent = new CancelGastoHandle();
    cancelarGastoEvent.formulario = formulario;
    let botonAnyadirGastoFormulario = event.currentTarget;
    cancelarGastoEvent.botonAnyadir = botonAnyadirGastoFormulario;
    botonCancelar.addEventListener("click", cancelarGastoEvent);

    let botonEnviarGastoApi = formulario.querySelector("button.gasto-enviar-api");
    let enviarGastoApiEvent = new EnviarGastoApiHandle();
    enviarGastoApiEvent.formulario = formulario;
    botonEnviarGastoApi.addEventListener("click", enviarGastoApiEvent);

    botonAnyadirGastoFormulario.disabled = true;

    let controles = document.getElementById("controlesprincipales")
    controles.append(formulario);
}

function EnviarGastoApiHandle(){
    this.handleEvent = async function(e){
        let usuario = document.getElementById('nombre_usuario').value;
        let url = baseUrl + usuario;
        
        let newGasto = crearNuevoObjetoGasto(this.formulario);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newGasto)
          });

        if (response.ok) { 
            cargarGastosApi();
        } else {
            alert("Error-HTTP: " + response.status);
        }
    }
}

function ActualizarGastoApiHandle(){
    this.handleEvent = async function(e){
        let usuario = document.getElementById('nombre_usuario').value;
        let url = baseUrl + usuario + '/' + this.gasto.gastoId;
        
        let newGasto = crearNuevoObjetoGasto(this.formulario);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newGasto)
          });

        if (response.ok) { 
            cargarGastosApi();
        } else {
            alert("Error-HTTP: " + response.status);
        }
    }
}

function submitGastoHandle(e){
    e.preventDefault();

    let formulario = e.currentTarget;
    let newGasto = crearNuevoObjetoGasto(formulario);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();

    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

function crearNuevoObjetoGasto(formulario) {
    let descripcion = formulario.elements.descripcion.value;
    let valorStr = formulario.elements.valor.value;
    let valor = parseFloat(valorStr);
    let fechaStr = formulario.elements.fecha.value;
    let etiquetasStr = formulario.elements.etiquetas.value;

    let etiquetas;
    if(etiquetasStr != "") {
        etiquetas = etiquetasStr.split(',');
    }

    let newGasto = etiquetas ? new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr, ...etiquetas) : new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr);
    return newGasto;
}

function CancelGastoHandle(){
    this.handleEvent = function(e){
        this.botonAnyadir.removeAttribute("disabled");
        this.formulario.remove();
    }
}

function EditarHandleformulario() {
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let submitGastoEditEvent = new SubmitGastoEditHandle();
        submitGastoEditEvent.gasto = this.gasto;
        formulario.addEventListener("submit", submitGastoEditEvent);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let cancelarGastoEvent = new CancelGastoHandle();
        cancelarGastoEvent.formulario = formulario;
        let botonEditarFormulario = e.currentTarget;
        cancelarGastoEvent.botonAnyadir = botonEditarFormulario;
        botonCancelar.addEventListener("click", cancelarGastoEvent);

        let botonEnviarGastoApi = formulario.querySelector("button.gasto-enviar-api");
        let actualizarGastoApiEvent = new ActualizarGastoApiHandle();
        actualizarGastoApiEvent.gasto = this.gasto;
        actualizarGastoApiEvent.formulario = formulario;
        botonEnviarGastoApi.addEventListener("click", actualizarGastoApiEvent);

        botonEditarFormulario.after(formulario);
        botonEditarFormulario.disabled = true;
    }
}

function SubmitGastoEditHandle(e){
    this.handleEvent = function(e){
        e.preventDefault();

        let formulario = e.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valorStr = formulario.elements.valor.value;
        let valor = parseFloat(valorStr);
        let fechaStr = formulario.elements.fecha.value;
        let etiquetasStr = formulario.elements.etiquetas.value;

        let etiquetas;
        if(etiquetasStr != "") {
            etiquetas = etiquetasStr.split(',');
        }

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fechaStr);
        this.gasto.actualizarValor(valor);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function filtrarGastosWeb(event) {
    event.preventDefault();

    let formulario = event.currentTarget;
    let descripcion = formulario.elements['formulario-filtrado-descripcion'].value;
    let valorMinimoStr = formulario.elements['formulario-filtrado-valor-minimo'].value;
    let valorMaximoStr = formulario.elements['formulario-filtrado-valor-maximo'].value;
    let valorMinimo = (valorMinimoStr == "") ? null : parseFloat(valorMinimoStr);
    let valorMaximo = (valorMaximoStr == "") ? null : parseFloat(valorMaximoStr);
    let fechaDesdeStr = formulario.elements['formulario-filtrado-fecha-desde'].value;
    let fechaHastaStr = formulario.elements['formulario-filtrado-fecha-hasta'].value;

    let etiquetasStr = formulario.elements['formulario-filtrado-etiquetas-tiene'].value;
    let etiquetasArray;
    if(etiquetasStr != "") {
        etiquetasArray = gestionPresupuesto.transformarListadoEtiquetas(etiquetasStr);
    }

    let filtro = {fechaDesde: fechaDesdeStr, fechaHasta: fechaHastaStr, valorMinimo: valorMinimo, valorMaximo: valorMaximo, descripcionContiene: descripcion, etiquetasTiene: etiquetasArray};
    let listaGastos = gestionPresupuesto.filtrarGastos(filtro);
    let gastosCompleto = document.getElementById('listado-gastos-completo');
    gastosCompleto.innerHTML = '';
    let gastosFiltrado1 = document.getElementById('listado-gastos-filtrado-1');
    gastosFiltrado1.innerHTML = '';
    let gastosFiltrado2 = document.getElementById('listado-gastos-filtrado-2');
    gastosFiltrado2.innerHTML = '';
    let gastosFiltrado3 = document.getElementById('listado-gastos-filtrado-3');
    gastosFiltrado3.innerHTML = '';
    let gastosFiltrado4 = document.getElementById('listado-gastos-filtrado-4');
    gastosFiltrado4.innerHTML = '';
    for (let gasto of listaGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function limpiarFiltro() {
    document.getElementById('formulario-filtrado-descripcion').value = "";
    document.getElementById('formulario-filtrado-valor-minimo').value = "";
    document.getElementById('formulario-filtrado-valor-maximo').value = "";
    document.getElementById('formulario-filtrado-fecha-desde').value = "";
    document.getElementById('formulario-filtrado-fecha-hasta').value = "";
    document.getElementById('formulario-filtrado-etiquetas-tiene').value = "";
    repintar();
}

function guardarGastosWeb() {
    let listaGastos = gestionPresupuesto.listarGastos();
    let gastosString = JSON.stringify(listaGastos);
    localStorage.setItem('GestorGastosDWEC', gastosString);
}

function cargarGastoWeb() {
    if(localStorage.getItem('GestorGastosDWEC') === null) {
        gestionPresupuesto.cargarGastos([]);
    } else {
        let gastosGuardados = localStorage.getItem('GestorGastosDWEC');
        let gastosGuardadosObject = JSON.parse(gastosGuardados);
        gestionPresupuesto.cargarGastos(gastosGuardadosObject);
    }
    repintar();
}

async function cargarGastosApi() {
    let usuario = document.getElementById('nombre_usuario').value;
    let url = baseUrl + usuario;
    let response = await fetch(url);

    if (response.ok) { 
        let json = await response.json();
        gestionPresupuesto.cargarGastos(json);
        repintar();
    } else {
        alert("Error-HTTP: " + response.status);
    }
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadirGasto  = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", filtrarGastosWeb);
let botonLimpiarFiltro = document.getElementById("limpiarFiltroBtn");
botonLimpiarFiltro.addEventListener("click", limpiarFiltro);

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener("click", guardarGastosWeb);
let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener("click", cargarGastoWeb);

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}