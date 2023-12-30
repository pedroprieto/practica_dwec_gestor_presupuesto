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
            <div class="gasto-fecha">${(new Date(gasto.fecha)).toLocaleDateString()}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${gasto.etiquetas.map(etiqueta => `
                    <span class="gasto-etiquetas-etiqueta" id="${idElemento}-borraretiqueta-${gasto.id}-${etiqueta}">
                        ${etiqueta}
                    </span>
                `).join("\n")}
            </div> 
            <button type="button" class="gasto-editar" id="${idElemento}-editargasto-${gasto.id}">
                Editar
            </button>
            <button type="button" class="gasto-borrar" id="${idElemento}-borrargasto-${gasto.id}">
                Borrar
            </button>
            <button class="gasto-borrar-api" type="button" id="${idElemento}-borrargastoapi-${gasto.id}">Borrar (API)</button>
            <button class="gasto-editar-formulario" type="button" id="${idElemento}-editargastoform-${gasto.id}">Editar (formulario)</button>
        </div>`;

    elemento.insertAdjacentHTML('beforeend', texto);

    let botonEditar = document.getElementById(`${idElemento}-editargasto-${gasto.id}`);
    botonEditar.addEventListener("click", new EditarHandle(gasto));

    let botonBorrar = document.getElementById(`${idElemento}-borrargasto-${gasto.id}`);
    botonBorrar.addEventListener("click", new BorrarHandle(gasto));

    for (const etiqueta of gasto.etiquetas) {
        let etiquetaABorrar = document.getElementById(`${idElemento}-borraretiqueta-${gasto.id}-${etiqueta}`);
        etiquetaABorrar.addEventListener("click", new BorrarEtiquetasHandle(gasto, etiqueta));
    }

    let botonEditarForm = document.getElementById(`${idElemento}-editargastoform-${gasto.id}`);
    botonEditarForm.addEventListener("click", new EditarHandleFormulario(gasto));

    let botonBorrarGastoApi = document.getElementById(`${idElemento}-borrargastoapi-${gasto.id}`);
    botonBorrarGastoApi.addEventListener("click", new BorrarHandleApi(gasto));
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

function actualizarPresupuestoWeb() {
    let presupuesto = Number(prompt("Introduzca presupuesto: "));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

let boton1 = document.getElementById("actualizarpresupuesto");
boton1.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca una descripción: ");
    let valor = Number(prompt("Introduzca valor: "));
    let fecha = prompt("Introduzca fecha en formato yyyy-mm-dd: ");
    let etiquetas = prompt("Introduzca etiquetas separadas por comas: ");
    etiquetas = etiquetas.split(",");
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gp.anyadirGasto(gasto);
    repintar();
}

let boton2 = document.getElementById("anyadirgasto");
boton2.addEventListener("click", nuevoGastoWeb);

function EditarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        let descripcion = prompt("Introduzca una descripción: ", this.gasto.descripcion);
        let valor = Number(prompt("Introduzca valor: ", this.gasto.valor));
        let fecha = prompt("Introduzca fecha en formato yyyy-mm-dd: ", this.gasto.obtenerPeriodoAgrupacion("dia"));
        let etiquetas = prompt("Introduzca etiquetas separadas por comas: ", this.gasto.etiquetas.join(","));
        etiquetas = etiquetas.split(",");
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(e) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");

    function enviarForm(e) {
        e.preventDefault();
        let formulario = e.currentTarget;
        let { descripcion, valor, fecha, etiquetas } = extraerDatosForm(formulario);

        let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gp.anyadirGasto(gasto);
        repintar();
        let botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
        botonAnyadirGastoForm.removeAttribute("disabled");
    }

    formulario.addEventListener("submit", enviarForm);

    function extraerDatosForm(formulario) {
        let descripcion = formulario.elements.descripcion.value;
        let valor = Number(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        etiquetas = etiquetas.split(",");
        return { descripcion, valor, fecha, etiquetas };
    }

    async function enviarFormApi() {
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(extraerDatosForm(formulario)),
        });
        cargarGastosApi();
    }

    let botonGastoEnviarApi = formulario.querySelector(".gasto-enviar-api");
    botonGastoEnviarApi.addEventListener("click", enviarFormApi);

    function CancelarHandle(formulario, botonAnyadirGastoForm) {
        this.formulario = formulario;
        this.botonAnyadirGastoForm = botonAnyadirGastoForm;
        this.handleEvent = function () {
            this.formulario.remove();
            this.botonAnyadirGastoForm.removeAttribute("disabled");
        }
    }

    let botonCancelar = formulario.querySelector("button.cancelar");
    let botonAnyadirGastoForm = e.currentTarget;
    botonCancelar.addEventListener("click", new CancelarHandle(formulario, botonAnyadirGastoForm));

    botonAnyadirGastoForm.setAttribute("disabled", "");
    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.appendChild(plantillaFormulario);
}

let botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandleFormulario(gasto) {
    this.gasto = gasto;
    this.handleEvent = function (e) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.obtenerPeriodoAgrupacion("dia");
        formulario.elements.etiquetas.value = this.gasto.etiquetas.join(",");

        function enviarForm(e) {
            e.preventDefault();
            let formulario = e.currentTarget;
            let descripcion = formulario.elements.descripcion.value;
            let valor = Number(formulario.elements.valor.value);
            let fecha = formulario.elements.fecha.value;
            let etiquetas = formulario.elements.etiquetas.value;
            etiquetas = etiquetas.split(",");
            this.gasto.actualizarValor(valor);
            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.actualizarFecha(fecha);
            this.gasto.anyadirEtiquetas(...etiquetas);
            repintar();
        }

        formulario.addEventListener("submit", enviarForm.bind(this));

        function CancelarHandle(formulario, botonEditarGastoForm) {
            this.formulario = formulario;
            this.botonAnyadirGastoForm = botonEditarGastoForm;
            this.handleEvent = function () {
                this.formulario.remove();
                this.botonAnyadirGastoForm.removeAttribute("disabled");
            }
        }

        let botonCancelar = formulario.querySelector("button.cancelar");
        let botonEditarGastoForm = e.currentTarget;
        botonCancelar.addEventListener("click", new CancelarHandle(formulario, botonEditarGastoForm));

        botonEditarGastoForm.setAttribute("disabled", "");
        botonEditarGastoForm.after(plantillaFormulario);
    }
}

function filtrarGastosWeb(e) {
    e.preventDefault();
    let formFiltrado = e.currentTarget;
    let descripcion = formFiltrado.elements["formulario-filtrado-descripcion"].value;
    let vMin = formFiltrado.elements["formulario-filtrado-valor-minimo"].value;
    let vMax = formFiltrado.elements["formulario-filtrado-valor-maximo"].value;
    let fDesde = formFiltrado.elements["formulario-filtrado-fecha-desde"].value;
    let fHasta = formFiltrado.elements["formulario-filtrado-fecha-hasta"].value;
    let etiquetas = formFiltrado.elements["formulario-filtrado-etiquetas-tiene"].value;

    if (etiquetas) {
        etiquetas = gp.transformarListadoEtiquetas(etiquetas);
    }

    let filtros = {
        fechaDesde: fDesde,
        fechaHasta: fHasta,
        valorMinimo: vMin,
        valorMaximo: vMax,
        descripcionContiene: descripcion,
        etiquetasTiene: etiquetas
    };

    let listadoCompleto = document.getElementById("listado-gastos-completo");
    listadoCompleto.innerHTML = "";
    let gastos = gp.filtrarGastos(filtros);
    for (const gasto of gastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

let formFiltrado = document.getElementById("formulario-filtrado");

formFiltrado.addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb() {
    let listadoGastos = gp.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(listadoGastos));
}

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb() {
    let gastosAlmacenamiento = JSON.parse(localStorage.getItem('GestorGastosDWEC'));
    if (gastosAlmacenamiento === null) {
        gastosAlmacenamiento = [];
    }
    gp.cargarGastos(gastosAlmacenamiento);
    repintar();
}

let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener("click", cargarGastosWeb);

async function cargarGastosApi() {
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
    let respuesta = await fetch(url);
    let gastos = await respuesta.json();
    gp.cargarGastos(gastos);
    repintar();
}

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);

function BorrarHandleApi(gasto) {
    this.gasto = gasto;

    this.handleEvent = async function () {
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;
        await fetch(url, {method: "DELETE"});
        cargarGastosApi();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}