import * as gesPre from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gastos) {

    for (let gasto of gastos) {
        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';
        
        let divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.className = 'gasto-descripcion';
        divGastoDescripcion.textContent = gasto.descripcion;
        divGasto.append(divGastoDescripcion);

        let divGastoFecha = document.createElement('div');
        divGastoFecha.className = 'gasto-fecha';
        divGastoFecha.textContent = new Date(gasto.fecha).toISOString().slice(0, 10);
        divGasto.append(divGastoFecha);

        let divGastoValor = document.createElement('div');
        divGastoValor.className = 'gasto-valor';
        divGastoValor.textContent = gasto.valor;
        divGasto.append(divGastoValor);

        let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.className = 'gasto-etiquetas';
        
        for (let etiqueta of gasto.etiquetas) {
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
            spanEtiqueta.textContent = etiqueta;

            // Eliminación de Etiqueta de un Gasto -----------------
            let manejadorEventoBorrarEtiqueta = new BorrarEtiquetasHandle();
            manejadorEventoBorrarEtiqueta.gasto = gasto;
            manejadorEventoBorrarEtiqueta.etiqueta = etiqueta;

            spanEtiqueta.addEventListener('click', manejadorEventoBorrarEtiqueta);

            divGastoEtiquetas.append(spanEtiqueta);
        }

        divGasto.append(divGastoEtiquetas);

        // Botón Editar Gasto ---------------------------------------
        let botonEditarGasto = document.createElement('button');
        botonEditarGasto.type = 'button';
        botonEditarGasto.className = 'gasto-editar';
        botonEditarGasto.innerHTML = 'Editar';

        let manejadorEventoEditar = new EditarHandle();
        manejadorEventoEditar.gasto = gasto;
        botonEditarGasto.addEventListener('click', manejadorEventoEditar);

        divGasto.append(botonEditarGasto);

        // Botón Borrar Gasto ---------------------------------------
        let botonBorrarGasto = document.createElement('button');
        botonBorrarGasto.type = 'button';
        botonBorrarGasto.className = 'gasto-borrar';
        botonBorrarGasto.innerHTML = 'Borrar';

        let manejadorEventoBorrar = new BorrarHandle();
        manejadorEventoBorrar.gasto = gasto;
        botonBorrarGasto.addEventListener('click', manejadorEventoBorrar);

        divGasto.append(botonBorrarGasto);

        // Botón Editar Gasto (Formulario) --------------------------
        let botonEditarGastoFormulario = document.createElement('button');
        botonEditarGastoFormulario.type = 'button';
        botonEditarGastoFormulario.className = 'gasto-editar-formulario';
        botonEditarGastoFormulario.innerHTML = 'Editar (formulario)';

        let manejadorEventoEditarFormulario = new EditarHandleFormulario();
        manejadorEventoEditarFormulario.gasto = gasto;
        manejadorEventoEditarFormulario.divGasto = divGasto;
        botonEditarGastoFormulario.addEventListener('click', manejadorEventoEditarFormulario);

        divGasto.append(botonEditarGastoFormulario);


        document.getElementById(idElemento).append(divGasto);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';

    let h1Agrupacion = document.createElement('h1');
    h1Agrupacion.textContent = 'Gastos agrupados por ' + periodo;
    divAgrupacion.append(h1Agrupacion);

    for (const [key, value] of Object.entries(agrup)) {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.className = 'agrupacion-dato-clave';
        spanAgrupacionDatoClave.textContent = key;
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.className = 'agrupacion-dato-valor';
        spanAgrupacionDatoValor.textContent = value;
        divAgrupacionDato.append(spanAgrupacionDatoValor);

        divAgrupacion.append(divAgrupacionDato);
    }

    document.getElementById(idElemento).append(divAgrupacion);
}

function repintar() {
    mostrarDatoEnId('presupuesto', gesPre.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gesPre.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gesPre.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = '';
    mostrarGastoWeb('listado-gastos-completo', gesPre.listarGastos());
}

function actualizarPresupuestoWeb() {
    let presupuesto = Number(prompt('Introduzca el presupuesto', 0));
    gesPre.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt('Introduzca la descripción', '');
    let valor = Number(prompt('Introduzca el valor', 0));
    let fecha = prompt('Introduzca la fecha (YYYY-MM-DD)', '');
    let etiquetas = prompt('Introduzca las etiquetas separadas por comas', '').split(',');

    let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gesPre.anyadirGasto(gasto);

    repintar();
}

function EditarHandle() {

    this.handleEvent = function() {
        let descripcion = prompt('Introduzca la descripción', this.gasto.descripcion);
        let valor = Number(prompt('Introduzca el valor', this.gasto.valor));
        let fecha = prompt('Introduzca la fecha (YYYY-MM-DD)', new Date(this.gasto.fecha).toISOString().slice(0, 10));
        let etiquetas = (prompt('Introduzca las etiquetas separadas por comas', this.gasto.etiquetas.join(','))).split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }

}

function BorrarHandle() {

    this.handleEvent = function() {
        gesPre.borrarGasto(this.gasto.id);

        repintar();
    }

}

function BorrarEtiquetasHandle() {

    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }

}

function CancelarGastoWebHandle() {

    this.handleEvent = function(event) {
        this.formulario.remove();
        this.botonAnyadirGastoFormulario.disabled = false;
        
        if (this.botonEditar) {
            this.botonEditar.disabled = false;
        }
    }
}

// Evento al hacer 'click' en el botón "Añadir gasto (formulario)"
function nuevoGastoWebFormulario() {
    
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector('form');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        let descripcion = event.currentTarget.elements.descripcion.value;
        let valor = Number(event.currentTarget.elements.valor.value);
        let fecha = event.currentTarget.elements.fecha.value;
        let etiquetas = event.currentTarget.elements.etiquetas.value.split(',');
    
        let gasto = new gesPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gesPre.anyadirGasto(gasto);
    
        repintar();
    
        this.remove(); // Elimino el formulario porque, al activarse de nuevo el botón, si le damos se duplica el formulario
        botonAnyadirGastoFormulario.disabled = false;
    });

    let botonCancelar = formulario.querySelector('button.cancelar');
    let manejadorEventoCancelarGasto = new CancelarGastoWebHandle();
    manejadorEventoCancelarGasto.formulario = formulario;
    
    manejadorEventoCancelarGasto.botonAnyadirGastoFormulario = botonAnyadirGastoFormulario;

    botonCancelar.addEventListener('click', manejadorEventoCancelarGasto);

    botonAnyadirGastoFormulario.disabled = true;
    document.getElementById('controlesprincipales').append(plantillaFormulario);
}

function EditarHandleFormulario() {

    this.handleEvent = function(event) {

        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector('form');
    
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let manejadorEventoSubmitFormulario = new SubmitHandleFormulario();
        manejadorEventoSubmitFormulario.gasto = this.gasto;
        manejadorEventoSubmitFormulario.formulario = formulario;
        manejadorEventoSubmitFormulario.botonAnyadirGastoFormulario = botonAnyadirGastoFormulario;
        manejadorEventoSubmitFormulario.botonEditar = event.currentTarget;
        formulario.addEventListener('submit', manejadorEventoSubmitFormulario);
    
        let botonCancelar = formulario.querySelector('button.cancelar');
        let manejadorEventoCancelarGasto = new CancelarGastoWebHandle();
        manejadorEventoCancelarGasto.formulario = formulario;
        manejadorEventoCancelarGasto.botonAnyadirGastoFormulario = botonAnyadirGastoFormulario;
        manejadorEventoCancelarGasto.botonEditar = event.currentTarget;
        botonCancelar.addEventListener('click', manejadorEventoCancelarGasto);
    
        botonAnyadirGastoFormulario.disabled = true;
        event.currentTarget.disabled = true;
        this.divGasto.append(plantillaFormulario);
    }

}

function SubmitHandleFormulario() {

    this.handleEvent = function(event) {
        event.preventDefault();
    
        let descripcion = event.currentTarget.elements.descripcion.value;
        let valor = Number(event.currentTarget.elements.valor.value);
        let fecha = event.currentTarget.elements.fecha.value;
        let etiquetas = event.currentTarget.elements.etiquetas.value.split(',');
    
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    
        this.formulario.remove(); // Elimino el formulario porque, al activarse de nuevo el botón, si le damos se duplica el formulario
        this.botonAnyadirGastoFormulario.disabled = false;
        this.botonEditar.disabled = false;
    }
}

function filtrarGastosWeb() {

    this.handleEvent = function(event) {
        event.preventDefault();

        let descripcionContiene = event.currentTarget.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = Number(event.currentTarget.elements['formulario-filtrado-valor-minimo'].value);
        let valorMaximo = Number(event.currentTarget.elements['formulario-filtrado-valor-maximo'].value);
        let fechaDesde = event.currentTarget.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = event.currentTarget.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetasTiene = gesPre.transformarListadoEtiquetas(event.currentTarget.elements['formulario-filtrado-etiquetas-tiene'].value);

        let gastosFiltrados = gesPre.filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene});

        document.getElementById('listado-gastos-completo').innerHTML = "";
        mostrarGastoWeb('listado-gastos-completo', gastosFiltrados);
    }
}

function guardarGastosWeb() {

    this.handleEvent = function(event) {
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gesPre.listarGastos()));
    }
}

function cargarGastosWeb() {

    this.handleEvent = function(event) {
        let gastosAlmacenados = localStorage.getItem('GestorGastosDWEC') ?? "";

        gesPre.cargarGastos(JSON.parse(gastosAlmacenados));
        
        repintar();
    }
}

// Botón "Actualizar presupuesto"
let botonPresupuesto = document.getElementById('actualizarpresupuesto');
botonPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

// Botón "Añadir gasto"
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);

// Botón "Añadir gasto (formulario)"
let botonAnyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

// Botón "Filtrar gastos"
let manejadorFiltradoGastos = new filtrarGastosWeb();
let botonFiltrarGastosFormulario = document.getElementById('formulario-filtrado');
botonFiltrarGastosFormulario.addEventListener('submit', manejadorFiltradoGastos);

// Botón "Guardar gastos"
let manejadorGuardarGastos = new guardarGastosWeb();
let botonGuardarGastos = document.getElementById('guardar-gastos');
botonGuardarGastos.addEventListener('click', manejadorGuardarGastos);

// Botón "Cargar gastos"
let manejadorCargarGastos = new cargarGastosWeb();
let botonCargarGastos = document.getElementById('cargar-gastos');
botonCargarGastos.addEventListener('click', manejadorCargarGastos);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
