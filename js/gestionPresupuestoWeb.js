import * as gestion from './gestionPresupuesto.js';

let  botonActualizarPres = document.getElementById('actualizarpresupuesto');
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
     

    for(let etiqueta of gasto.etiquetas){
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

    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.innerHTML= "Editar (formulario)";
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

function repintar(){
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());
    let gastosCompletos = document.getElementById("listado-gastos-completo");
    gastosCompletos.innerText = "";
    for (let gasto of gestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb () {
    let introValor = prompt("Introduce un presupuesto: ");
    introValor = parseFloat(introValor);
    gestion.actualizarPresupuesto(introValor);
    repintar();  
}

function nuevoGastoWeb (){
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

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function EditarHandleFormulario(){
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
    }
}

function EditarGastoHandle() {
    this.handleEvent = function (event){
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
}

function BorrarFormularioHandle() {
    this.handleEvent = function (event) {
        this.boton.removeAttribute('disabled', 'disabled');
        this.formulario.remove();
    }
}

function filtrarGastosWeb(event){
    event.preventDefault();
    let form = event.currentTarget;
    let divFiltrarGastos = document.getElementById('filtrar-gastos');
    divFiltrarGastos.append(form);
    let opciones = {};
    let descripcionContiene = form.elements.formulario-filtrado-descripcion.value;
    let valorMinimo = form.elements.formulario-filtrado-valor-minimo.value;
    let valorMaximo = form.elements.formulario-filtrado-valor-maximo.value;
    let fechaDesde = form.elements.formulario-filtrado-fecha-desde.value; 
    let fechaHasta = form.elements.formulario-filtrado-fecha-hasta.value; 
    let etiquetasTiene = form.elements.formulario-filtrado-etiquetas-tiene.value; 
    this.gasto.opciones.fechaDesde;
    this.gasto.opciones.fechaHasta;
    this.gasto.opciones.valorMinimo;
    this.gasto.opciones.valorMaximo;
    this.gasto.opciones.descripcionContiene;
    this.gasto.opciones.etiquetasTiene;
    gestion.filtrarGastos(opciones);
    gestion.mostrarGastoWeb(event);
}

let botonEnvioForm = document.getElementById("formulario-filtrado");
botonEnvioForm.addEventListener("submit", filtrarGastosWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}
