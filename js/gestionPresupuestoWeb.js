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

let botonPresupuesto = document.getElementById('actualizarpresupuesto');
botonPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
