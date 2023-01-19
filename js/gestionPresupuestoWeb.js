import * as gestion from './gestionPresupuesto.js';

let botonActualizarPres = document.getElementById('actualizarpresupuesto');
botonActualizarPres.addEventListener("click", actualizarPresupuestoWeb);

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

let botonformAnyadir = document.getElementById("anyadirgasto-formulario");
botonformAnyadir.addEventListener("click", nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let listadoGastos = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    listadoGastos.append(divGasto);

    let divDesc = document.createElement('div');
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;
    divGasto.append(divDesc);

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor"
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

    let divEti = document.createElement('div');
    divEti.className = "gasto-etiquetas";
    divGasto.append(divEti);


    for (let etiqueta of gasto.etiquetas) {
        let spanEti = document.createElement('span');
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = etiqueta;

        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEti.addEventListener('click', borrarEtiqueta);
        divEti.append(spanEti);
    }

    let botoneditar = document.createElement('button');
    botoneditar.className = "gasto-editar";
    botoneditar.type = "button";
    botoneditar.innerHTML = "Editar";
    let editar = new EditarHandle();
    editar.gasto = gasto;
    botoneditar.addEventListener("click", editar);
    divGasto.append(botoneditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.innerHTML = "Borrar";
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);

    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.className = "gasto-borrar-api";
    botonBorrarApi.type = "button";
    botonBorrarApi.innerHTML = "Borrar (API)";
    let borrarApi = new BorrarGastosApi();
    borrarApi.gasto = gasto;
    botonBorrarApi.addEventListener('click', borrarApi);
    divGasto.append(botonBorrarApi);

    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.innerHTML = "Editar (formulario)";
    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    botonEditarForm.addEventListener('click', editarForm);
    divGasto.append(botonEditarForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let gastosAgrup = document.getElementById(idElemento);
    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";
    let h1Agrup = document.createElement("h1");
    h1Agrup.innerText = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1Agrup);
    for (let [key, value] of Object.entries(agrup)) {
        let divAgrudato = document.createElement('div');
        divAgrudato.className = "agrupacion-dato";
        let spanAgrupClave = document.createElement('span')
        spanAgrupClave.className = "agrupacion-dato-clave";
        spanAgrupClave.innerText = `${key}`;
        let spanAgrupValor = document.createElement('span')
        spanAgrupValor.className = "agrupacion-dato-valor";
        spanAgrupValor.innerText = `${value}`;
        divAgrudato.append(spanAgrupClave);
        divAgrudato.append(spanAgrupValor);
        divAgrup.append(divAgrudato);
    }
    gastosAgrup.append(divAgrup);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());
    let gastosCompletos = document.getElementById("listado-gastos-completo");
    gastosCompletos.innerText = "";
    for (let gasto of gestion.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let introValor = prompt("Introduce un presupuesto: ");
    introValor = parseFloat(introValor);
    gestion.actualizarPresupuesto(introValor);
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción: ");
    let valor = prompt("Introduzca el valor: ");
    let fecha = prompt("Introduzca la fecha:");
    let etiquetas = prompt("Introduzca las etiquetas: ");
    valor = parseFloat(valor);
    etiquetas = etiquetas.split(",");
    let gasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestion.anyadirGasto(gasto);
    repintar();
}

function EditarHandle() {
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduzca la descripción: ");
        let valor = prompt("Introduzca el valor: ");
        let fecha = prompt("Introduzca la fecha:");
        let etiquetas = prompt("Introduzca las etiquetas: ");
        valor = parseFloat(valor);
        etiquetas = etiquetas.split(",");
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        gestion.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarGastosApi(){
    this.handleEvent = function(event){
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let gastoBorrar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;    
        if(nombreUsuario != null){
            fetch(gastoBorrar, {
                method: "DELETE",
            }).then(function(respuesta){
                if(respuesta.ok){
                    cargaGastosApi();
                }
             });
        }
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function (event) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        formulario.descripcion.value = this.gasto.descripcion;;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = this.gasto.fecha;
        formulario.etiquetas.value = this.gasto.etiquetas;
        event.currentTarget.after(formulario);
        let editarGasto = new EditarGastoHandle();
        editarGasto.gasto = this.gasto;
        formulario.addEventListener('submit', editarGasto);
        event.currentTarget.setAttribute('disabled', 'disabled');
        let borrarFormulario = new BorrarFormularioHandle();
        borrarFormulario.formulario = formulario;
        borrarFormulario.boton = event.currentTarget;
        formulario.querySelector('button.cancelar').addEventListener('click', borrarFormulario);
        let botonEditarGastoApi = new editarApiFormulario;
        botonEditarGastoApi.formulario = this.gasto;
        botonEditarGastoApi.boton = event.currentTarget;
        formulario.querySelector('button.gasto-enviar-api').addEventListener('click', botonEditarGastoApi);
        event.currentTarget.setAttribute('disabled', 'disabled');
    }
}

function editarApiFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let boton = event.currentTarget;
        let form = boton.parentElement;
        let descripcion = form.elements.descripcion.value;
        let valor = Number(form.elements.valor.value);
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(',');
        let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let gastoEditar =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.idGasto }`;    
        if(nombreUsuario != null){
            fetch(gastoEditar, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(nuevoGasto)
            }).then(function(respuesta){
                if(respuesta.ok){
                    cargaGastosApi();
                    form.remove();
                }
            });
        }
    }
   
}

function EditarGastoHandle() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let formulario = event.currentTarget;
        this.gasto.actualizarDescripcion(formulario.elements.descripcion.value);
        this.gasto.actualizarFecha(formulario.elements.fecha.value);
        this.gasto.actualizarValor(Number(formulario.elements.valor.value));
        let etiquetas = formulario.elements.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(',');
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);
        formulario.remove();
        repintar();
    }
}

function AnyadirElemFormulario(event) {
    event.preventDefault();
    let form = event.currentTarget;
    let descripcion = form.elements.descripcion.value;
    let valor = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;
    let arrayEtiquetas = etiquetas.split(',');
    let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
    gestion.anyadirGasto(nuevoGasto);
    repintar();
    document.getElementById('anyadirgasto-formulario').removeAttribute('disabled', 'disabled');
    form.remove();
}

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let divControles = document.getElementById('controlesprincipales');
    divControles.append(formulario);
    event.currentTarget.setAttribute('disabled', 'disabled');
    formulario.addEventListener('submit', AnyadirElemFormulario);
    let borrarFormulario = new BorrarFormularioHandle();
    borrarFormulario.formulario = formulario;
    borrarFormulario.boton = event.currentTarget;
    formulario.querySelector('button.cancelar').addEventListener('click', borrarFormulario);
    let botonEnviarGastoApi = formulario.querySelector('button.gasto-enviar-api');
    botonEnviarGastoApi.addEventListener('click', submitApiFormulario);
}

function submitApiFormulario(event){
    event.preventDefault();
    let boton = event.currentTarget;
    let form = boton.parentElement;
    let descripcion = form.elements.descripcion.value;
    let valor = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;
    let arrayEtiquetas = etiquetas.split(',');
    let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let gastoEnviar =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
    if(nombreUsuario != null){
        fetch(gastoEnviar, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(nuevoGasto)
        }).then(function(respuesta){
            if(respuesta.ok){
                cargaGastosApi(); 
            }
        });
    }
}

function BorrarFormularioHandle() {
    this.handleEvent = function (event) {
        this.boton.removeAttribute('disabled', 'disabled');
        this.formulario.remove();
    }
}

function filtrarGastosWeb() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let formularioFiltrado = event.currentTarget;
        let descripcionContiene = formularioFiltrado.elements['formulario-filtrado-descripcion'].value;
        let valorMinimo = formularioFiltrado.elements['formulario-filtrado-valor-minimo'].value;
        let valorMaximo = formularioFiltrado.elements['formulario-filtrado-valor-maximo'].value;
        let fechaDesde = formularioFiltrado.elements['formulario-filtrado-fecha-desde'].value;
        let fechaHasta = formularioFiltrado.elements['formulario-filtrado-fecha-hasta'].value;
        let etiquetasTiene = formularioFiltrado.elements['formulario-filtrado-etiquetas-tiene'].value;
        valorMinimo = parseFloat(valorMinimo);
        valorMaximo = parseFloat(valorMaximo);
        if (etiquetasTiene != null) {
            etiquetasTiene = gestion.transformarListadoEtiquetas(etiquetasTiene);
        }
        let gastosFiltrados = gestion.filtrarGastos({descripcionContiene: descripcionContiene, valorMinimo: valorMinimo,
        valorMaximo: valorMaximo, fechaDesde: fechaDesde, fechaHasta: fechaHasta,
        etiquetasTiene: etiquetasTiene});
        let listaFiltrada = document.getElementById('listado-gastos-completo');
        listaFiltrada.innerHTML = "";
        for (let gasto of gastosFiltrados) {
            mostrarGastoWeb('listado-gastos-completo', gasto);
        }    
    }
}


let botonEnvioFormGastoFiltrado = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", botonEnvioFormGastoFiltrado);

function guardarGastosWeb(){
    this.handleEvent = function(){
        localStorage.GestorGastosDWEC = JSON.stringify(gestion.listarGastos());
    }
}

let botonGuardarGastos = new guardarGastosWeb();
document.getElementById('guardar-gastos').addEventListener("click", botonGuardarGastos);

function cargarGastosWeb(){
    this.handleEvent = function(){
        let cargoGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if (!cargoGastos){
            gestion.cargarGastos([]);
        }
        else{
            gestion.cargarGastos(cargoGastos);
        }
        repintar();
    }
}

let botonCargarGastos = new cargarGastosWeb();
document.getElementById('cargar-gastos').addEventListener("click", botonCargarGastos);

function cargaGastosApi(){
        let nombreUsuario = document.getElementById("nombre-usuario").value;
        let cargoGasto = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
        if(nombreUsuario!=null){
            fetch(cargoGasto)
            .then(function(respuesta){
                return respuesta.json(); 
            }).then(function(datos){
                gestion.cargarGastos(datos); 
                repintar(); 
            })     
        }
        else{
            gestion.cargarGastos([]);
        }
    
}

document.getElementById('cargar-gastos-api').addEventListener("click", cargaGastosApi);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}
