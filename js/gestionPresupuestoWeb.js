import * as gesPres from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let id = document.getElementById(idElemento);
    id.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.className = 'gasto';

    let div1 = document.createElement('div');
    div1.className = 'gasto-descripcion';
    div1.innerHTML = gasto.descripcion;

    let div2 = document.createElement('div');
    div2.className = 'gasto-fecha';
    let formato_fecha = new Date(gasto.fecha);
    let isoString = formato_fecha.toISOString();
    div2.innerHTML = isoString.substring(0,10);

    let div3 = document.createElement('div');
    div3.className = 'gasto-valor';
    div3.innerHTML = gasto.valor;
    
    let div4 = document.createElement('div');
    div4.className = 'gasto-etiquetas';

    if (gasto.etiquetas) {
        for (let etiqueta of gasto.etiquetas) {
            let span = document.createElement('span');
            span.className ='gasto-etiquetas-etiqueta';
            span.innerHTML = etiqueta;
            let obj_eti = new BorrarEtiquetasHandle();
            obj_eti.gasto = gasto;
            obj_eti.etiqueta = etiqueta;
            span.addEventListener('click', obj_eti)
            div4.append(span);
        }
    }

    //botón editar
    let boton1 = document.createElement('button');
    boton1.className = 'gasto-editar';
    boton1.type = 'button';
    boton1.innerHTML = "Editar";
    let editar = new EditarHandle();
    editar.gasto = gasto;
    boton1.addEventListener('click', editar);

    //botón borrar
    let boton2 = document.createElement('button');
    boton2.className = 'gasto-borrar';
    boton2.type = 'button';
    boton2.innerHTML = "Borrar";
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    boton2.addEventListener('click', borrar);
    
    //botón editar formulario
    let boton3 = document.createElement('button');
    boton3.className = 'gasto-editar-formulario';
    boton3.type = 'button';
    boton3.innerHTML = "Editar (Formulario)";
    let editarFormulario = new EditarHandleFormulario();
    editarFormulario.gasto = gasto;
    boton3.addEventListener('click', editarFormulario);

    divPadre.append(div1);
    divPadre.append(div2);
    divPadre.append(div3);
    divPadre.append(div4);
    divPadre.append(boton1);
    divPadre.append(boton2);
    divPadre.append(boton3);
    id.append(divPadre);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.innerHTML = 'Gastos agrupados por '+periodo;
    divPadre.append(titulo);

    for(let key in agrup) {
        let divAgrup = document.createElement('div');
        divAgrup.className = 'agrupacion-dato';
        
        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.innerHTML = key;
        divAgrup.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.innerHTML = agrup[key];
        divAgrup.append(spanValor);

        divPadre.append(divAgrup);
    }
    
    id.append(divPadre);
}

function repintar() {
    mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gesPres.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gesPres.calcularBalance());

    let id = document.getElementById('listado-gastos-completo');
    id.innerHTML = "";

    let listaCompleta = gesPres.listarGastos();
    for (let elemento of listaCompleta) {
    mostrarGastoWeb('listado-gastos-completo', elemento);
    }
}

/* BOTONES PRINCIPALES*/
//función para el evento click del botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    let introducir = prompt("Introduce un nuevo presupuesto");
    let convertir = parseFloat(introducir);
    gesPres.actualizarPresupuesto(convertir);
    repintar();
}

//evento click que hace funcionar el botón actualizarpresupuesto
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);

//función para el evento click del botón anyadir gasto
function nuevoGastoWeb() {
    let descripcion = prompt("Añade la descripción del gasto");
    let valor = prompt("Introduce el valor");
    let fecha = prompt("Introduce la fecha");
    let etiquetas = prompt("Introduce las etiquetas");

    //convertir valores
    let convertirValor = parseFloat(valor);
    let etiquetasArray = etiquetas.split(',');

    //crear el gasto
    let gastoNuevo = new gesPres.CrearGasto(descripcion, convertirValor, fecha, ...etiquetasArray);
    
    //añadir el gasto
    gesPres.anyadirGasto(gastoNuevo);
    repintar();
}

//evento click que hace funcionar el botón anyadirgasto
document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);

//función para el evento click del botón anyadirgasto-formulario
function nuevoGastoWebFormulario(evento) {
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector('form');

    //Desactivar botón formulario
    let botonEvento = evento.currentTarget;
    botonEvento.disabled = true;

    //añadir el formulario al final de controlesprincipales
    document.getElementById('controlesprincipales').append(formulario);

    //evento submit en botón submit
    formulario.addEventListener('submit', ManejadorSubmit);

    //botón cancelar
    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelar = new ManejadorCancelar();
    cancelar.botonEvento = botonEvento;
    botonCancelar.addEventListener('click', cancelar);
}
//evento click que hace funcionar el botón anyadirgasto-formulario
document.getElementById('anyadirgasto-formulario').addEventListener('click', nuevoGastoWebFormulario);

/* FUNCIONES PARA LOS BOTONES SECUNDARIOS DE LOS FORMULARIOS*/
//función para manejar el evento submit
function ManejadorSubmit(evento) {
    evento.preventDefault(); //para no abandonar la página al pulsar

    //acceder a los datos del formulario
    let accederFormulario = evento.currentTarget;
    let descripcion = accederFormulario.elements.descripcion.value;
    let valor = accederFormulario.elements.valor.value;
    let fecha = accederFormulario.elements.fecha.value;
    let etiquetas = accederFormulario.elements.etiquetas.value;

    //convertir valores
    let convertirValor = parseFloat(valor);
    let etiquetasArray = etiquetas.split(',');

    //crear el gasto
    let gastoNuevo = new gesPres.CrearGasto(descripcion, convertirValor, fecha, ...etiquetasArray);
    
    //añadir el gasto
    gesPres.anyadirGasto(gastoNuevo);
    repintar();
    document.getElementById('anyadirgasto-formulario').disabled = false;
}
function ManejadorCancelar() {
    this.handleEvent = function(evento) {
        evento.currentTarget.parentNode.remove();
        //accedo al boton del evento en el que use el objeto para poder usarlo en los dos botones sin problema
        this.botonEvento.removeAttribute('disabled');
    }
}

//FUNCIONES HANDLE PARA LOS BOTONES DEL FORMULARIO CREADO EN MOSTRARGASTOWEB
function EditarHandle() {
    this.handleEvent = function(evento) {
        let descripcion = prompt("Introduce una descripción", this.gasto.descripcion);
        let valor = prompt("Introduce un valor", this.gasto.valor);
        let fecha = prompt("Introduce una fecha", new Date(this.gasto.fecha).toISOString().substring(0,10));
        let etiquetas = prompt("Introduce las etiquetas", this.gasto.etiquetas);

        let convertirValor = parseFloat(valor);
        let etiquetasArray = etiquetas.split(',');

        this.gasto.actualizarValor(convertirValor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasArray);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(evento) {
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function(evento) {
        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
        let formulario = plantillaFormulario.querySelector('form');

        //Desactivar botón editar
        let botonEvento = evento.currentTarget;
        botonEvento.disabled = true;

        //asignarle por defecto los valores actuales
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //añadir el formulario al final del botón editar
        evento.currentTarget.after(formulario);

        //botón submit
        let botonSubmit = new ManejadorSubmitEditar();
        botonSubmit.gasto = this.gasto;
        formulario.addEventListener('submit', botonSubmit);

        //botón cancelar
        let botonCancelar = formulario.querySelector("button.cancelar");
        let cancelar = new ManejadorCancelar();
        //hago referencia al evento del boton porque con ClassName no me funcionaba el disabled
        cancelar.botonEvento = botonEvento;
        botonCancelar.addEventListener('click', cancelar);
    }
}

function ManejadorSubmitEditar() {
    this.handleEvent = function(evento) {
        evento.preventDefault();

        let formulario = evento.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = formulario.elements.valor.value;
        let fecha =  formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        let convertirValor = parseFloat(valor);
        let etiquetasArray = etiquetas.split(',');

        this.gasto.actualizarValor(convertirValor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasArray);
        repintar();
    }
}

function filtrarGastosWeb() {
    this.handleEvent = function(evento) {
        evento.preventDefault();

        //recoger datos del formulario
        let formularioFiltrado = document.getElementById('filtrar-gastos').querySelector('form');

        let descripcion = formularioFiltrado.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = formularioFiltrado.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = formularioFiltrado.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = formularioFiltrado.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = formularioFiltrado.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetas = formularioFiltrado.elements['formulario-filtrado-etiquetas-tiene'].value;

        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);

        if (etiquetas) {
            etiquetas = gesPres.transformarListadoEtiquetas(etiquetas);
        }

        let filtro = {
            fechaDesde : fechaDesde,
            fechaHasta : fechaHasta,
            valorMinimo : valorMinimo,
            valorMaximo : valorMaximo,
            descripcionContiene : descripcion,
            etiquetasTiene : etiquetas
        }

        let gastosFiltrados = gesPres.filtrarGastos(filtro);

        document.getElementById('listado-gastos-completo').innerHTML = "";

        for (let elemento of gastosFiltrados) {
            mostrarGastoWeb('listado-gastos-completo', elemento);
        }
    }
}

//botón de filtrado
let filtrado = document.getElementById('formulario-filtrado');
let objFiltrar = new filtrarGastosWeb();
filtrado.addEventListener('submit', objFiltrar);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}