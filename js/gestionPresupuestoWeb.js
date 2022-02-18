import * as gestionPresupuesto from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function crearElementoConTextoYClase(tipo ,clase, texto, atributos = {}) {
    let elemento = document.createElement(tipo);
    elemento.className = clase;
    elemento.innerHTML = texto;

    for (const atributo in atributos) {
        elemento.setAttribute(atributo, atributos[atributo]);
    }

    return elemento;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divPadre = document.createElement("div");
    divPadre.className = "gasto";
    
    let divGDescripcion = crearElementoConTextoYClase("div", "gasto-descripcion", gasto.descripcion);
    divPadre.append(divGDescripcion);
    
    let fechaFormato = new Date(gasto.fecha)
    let divGFecha = crearElementoConTextoYClase("div", "gasto-fecha", fechaFormato.toLocaleString());
    divPadre.append(divGFecha);

    let divGValor = crearElementoConTextoYClase("div", "gasto-valor", gasto.valor);
    divPadre.append(divGValor);
    
    let divGEtiquetas = document.createElement("div");
    divGEtiquetas.className = "gasto-etiquetas";
    divPadre.append(divGEtiquetas);

    for (const etiqueta of gasto.etiquetas) {
        let spanEtiqueta = crearElementoConTextoYClase("span", "gasto-etiquetas-etiqueta", etiqueta);
        divGEtiquetas.append(spanEtiqueta);
        
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", borrarEtiqueta);
    }

    let btnEditar = crearElementoConTextoYClase("button", "gasto-editar", "Editar", {"type": "button"});
    let editarGasto = new EditarHandle();
    editarGasto.gasto = gasto;
    btnEditar.addEventListener("click", editarGasto);
    divPadre.append(btnEditar);

    let btnBorrar = crearElementoConTextoYClase("button", "gasto-borrar", "Borrar", {"type": "button"});
    let borrarGasto = new BorrarHandle();
    borrarGasto.gasto = gasto;
    btnBorrar.addEventListener("click", borrarGasto);
    divPadre.append(btnBorrar);

    let btnBorrarGastoApi = crearElementoConTextoYClase("button", "gasto-borrar-api", "Borrar (API)", {"type": "button"});
    let borrarGastoApi = new BorrarGastoApiHandle();
    borrarGastoApi.gasto = gasto;
    btnBorrarGastoApi.addEventListener("click", borrarGastoApi);
    divPadre.append(btnBorrarGastoApi);

    let btnEditarFormulario = crearElementoConTextoYClase("button", "gasto-editar-formulario", "Editar", {"type": "button"});
    let editarGastoFormulario = new EditarHandleFormulario();
    editarGastoFormulario.gasto = gasto;
    btnEditarFormulario.addEventListener("click", editarGastoFormulario);
    divPadre.append(btnEditarFormulario);

    let espacio = document.createElement("br");
    elemento.append(espacio);

    elemento.append(divPadre);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let elemento = document.getElementById(idElemento);
    let divPadre = document.createElement("div");
    divPadre.className = "agrupacion";

    let h1grupo = document.createElement("h1");
    h1grupo.innerHTML = `Gastos agrupados por ${periodo}`;
    divPadre.append(h1grupo);

    for (const [clave, valor] of Object.entries(agrup)) {
        let divGEtiquetas = document.createElement("div");
        divGEtiquetas.className = "agrupacion-dato";
        divPadre.append(divGEtiquetas);

        let spanGClave = crearElementoConTextoYClase("span", "agrupacion-dato-clave", clave);
        let spanGValor = crearElementoConTextoYClase("span", "agrupacion-dato-valor", valor);
        divGEtiquetas.append(spanGClave);
        divGEtiquetas.append(spanGValor);
    }

    elemento.append(divPadre);

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
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    gestionPresupuesto.listarGastos().forEach(function(gasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });

    let grupoGastosDia = gestionPresupuesto.agruparGastos("dia");
    let grupoGastosMes = gestionPresupuesto.agruparGastos();
    let grupoGastosAnyo = gestionPresupuesto.agruparGastos("anyo");

    mostrarGastosAgrupadosWeb("agrupacion-dia", grupoGastosDia, "día");
    mostrarGastosAgrupadosWeb("agrupacion-mes", grupoGastosMes, "mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", grupoGastosAnyo, "año");
}

function actualizarPresupuestoWeb() {
    let valor = prompt("Introduce un nuevo valor de presupuesto:");

    valor = Number(valor);

    gestionPresupuesto.actualizarPresupuesto(valor);
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Nuevo gasto: introduce una descripción:", "alquiler");
    let valor = prompt("Nuevo gasto: valor:", "650.00");
    let fecha = prompt("Nuevo gasto: fecha:", "2021-01-01");
    let etiquetas = prompt("Nuevo gasto: etiquetas", "fijo,casa");
    valor = Number(valor);
    let arrayEtiquetas = etiquetas.split(",");

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);

    repintar();
}

function nuevoGastoWebFormulario(evento) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let btnAnyadirGasto = evento.currentTarget;
    btnAnyadirGasto.disabled = true;

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        let descripcion = formulario.descripcion.value;
        let valor = Number(formulario.valor.value);
        let fecha = formulario.fecha.value;
        let etiquetas = formulario.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(",");

        let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

        gestionPresupuesto.anyadirGasto(gasto);

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    });

    let cancelarNuevoGasto = new CancelarNuevoGastoHandle();
    cancelarNuevoGasto.formulario = formulario;
    cancelarNuevoGasto.btnAnyadirGasto = btnAnyadirGasto;
    formulario.querySelector("button.cancelar").addEventListener("click", cancelarNuevoGasto);

    document.getElementById("controlesprincipales").append(formulario);

    let enviarGastoApi = new EnviarGastoApiHandle();
    enviarGastoApi.formulario = formulario;
    formulario.querySelector("button.gasto-enviar-api").addEventListener("click", enviarGastoApi);
}

function filtrarGastosWeb(evento) {
    evento.preventDefault();

    let filtro = {
        fechaDesde: document.getElementById("formulario-filtrado-fecha-desde").value,
        fechaHasta: document.getElementById("formulario-filtrado-fecha-hasta").value,
        valorMinimo: document.getElementById("formulario-filtrado-valor-minimo").value,
        valorMaximo: document.getElementById("formulario-filtrado-valor-maximo").value,
        descripcionContiene: document.getElementById("formulario-filtrado-descripcion").value,
    }

    let etiquetasFiltro = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

    if (etiquetasFiltro) {
        filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasFiltro);
    }

    let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtro);
    console.log(gastosFiltrados);
    console.log(etiquetasFiltro);

    document.getElementById("listado-gastos-completo").innerHTML = "";

    gastosFiltrados.forEach(function(gasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });    
}

function guardarGastosWeb() {
    let jsonGastos = JSON.stringify(gestionPresupuesto.listarGastos());
    localStorage.setItem("GestorGastosDWEC", jsonGastos);
}

function cargarGastosWeb() {
    let gastos = localStorage.getItem("GestorGastosDWEC");

    if (gastos) {
        gastos = JSON.parse(gastos);
    }
    else {
        gastos = [];
    }
    
    gestionPresupuesto.cargarGastos(gastos);

    repintar();
}

function EditarHandle() {
    this.handleEvent = function() {
        let descripcion = prompt("Nuevo gasto: introduce una descripción:", this.gasto["descripcion"]);
        let valor = prompt("Nuevo gasto: valor:", this.gasto["valor"]);
        valor = Number(valor);
        
        let fechaGasto = new Date(this.gasto["fecha"]);
        fechaGasto = fechaGasto.toISOString();
        let fecha = prompt("Nuevo gasto: fecha:", fechaGasto);
        
        let etiquetas = prompt("Nuevo gasto: etiquetas", this.gasto["etiquetas"].join(", "));
        let arrayEtiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        
        repintar();
    };
}

function CancelarNuevoGastoHandle() {
    this.handleEvent = function() {
        this.formulario.remove();
        this.btnAnyadirGasto.disabled = false;
    };
}

function EditarHandleFormulario() {
    this.handleEvent = function(evento) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let btnEditar = evento.currentTarget;
        btnEditar.disabled = true;

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.etiquetas.value = this.gasto["etiquetas"].join(", ");

        btnEditar.after(formulario);

        let enviarFormulario = new EnviarEditarHandleFormulario();
        enviarFormulario.gasto = this.gasto;
        enviarFormulario.formulario = formulario;
        formulario.addEventListener("submit", enviarFormulario);

        let cancelarFormulario = new CancelarNuevoGastoHandle();
        cancelarFormulario.formulario = formulario;
        cancelarFormulario.btnAnyadirGasto = btnEditar;
        formulario.querySelector("button.cancelar").addEventListener("click", cancelarFormulario);

        let enviarFormularioApi = new EnviarEditarApiHandleFormulario();
        enviarFormularioApi.gasto = this.gasto;
        enviarFormularioApi.formulario = formulario;
        formulario.querySelector("button.gasto-enviar-api").addEventListener("click", enviarFormularioApi);
    };
}

function EnviarEditarHandleFormulario() {
    this.handleEvent = function() {
        this.gasto.actualizarDescripcion(this.formulario.descripcion.value);
        this.gasto.actualizarValor(Number(this.formulario.valor.value));
        this.gasto.actualizarFecha(this.formulario.fecha.value);

        let etiquetas = this.formulario.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(",");
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();
    }
}

const URL_API = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";

function cargarGastosApi() {
    async function obtenerDatosApi() {
        let respuestaApi = await fetch(URL_API + document.getElementById("nombre_usuario").value);
        
        if (respuestaApi.ok) {
            return respuestaApi.json()
                .then(function(resultado) {
                    gestionPresupuesto.cargarGastos(resultado);
                })
                .then(repintar);
        } else {
            alert("Error-Http: " + respuestaApi.status);
        }        
    }

    obtenerDatosApi();
}

function BorrarGastoApiHandle() {
    this.handleEvent = function() {
        let promiseBorrarGasto = fetch(URL_API + document.getElementById("nombre_usuario").value + "/" + this.gasto.gastoId, {
            method: 'DELETE',
        })
        .then(respuesta => respuesta.json())
        .then(cargarGastosApi);
    }
}

function EnviarGastoApiHandle() {
    this.handleEvent = async function() {
        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: Number(this.formulario.valor.value),
            fecha: this.formulario.fecha.value,
            etiquetas: this.formulario.etiquetas.value.split(","),
        };

        let promiseEnviarGasto = await fetch(URL_API + document.getElementById("nombre_usuario").value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gasto),
        })
        .then(cargarGastosApi);
    }
}

function EnviarEditarApiHandleFormulario() {
    this.handleEvent = async function() {
        this.gasto.descripcion = this.formulario.descripcion.value;
        this.gasto.valor = Number(this.formulario.valor.value);
        this.gasto.fecha = this.formulario.fecha.value;
        this.gasto.etiquetas = this.formulario.etiquetas.value.split(",");

        let promiseEditarGasto = await fetch(URL_API + 
            this.gasto.usuario + "/" + this.gasto.gastoId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.gasto),
        })
        .then(cargarGastosApi);
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}