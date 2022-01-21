import * as gesPres from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto){

    let divGasto = document.createElement('div');
    let divGasDescripcion = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor =  document.createElement('div');
    let divGasEtiqueta =  document.createElement('div');

    divGasto.className = "gasto";

    divGasDescripcion.className ="gasto-descripcion";
    divGasDescripcion.append(gasto.descripcion);
    
    divGasFecha.className ="gasto-fecha";
    let fechaRecorte = new Date(gasto.fecha).toLocaleString();
    fechaRecorte = fechaRecorte.substring(0,9);
    divGasFecha.append(fechaRecorte);
    
    divGasValor.className ="gasto-valor";
    divGasValor.append(gasto.valor);

    divGasto.append(divGasDescripcion);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);

    divGasEtiqueta.className = "gasto-etiquetas";

    for (let etiqueta of gasto.etiquetas)
    {        
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className="gasto-etiquetas-etiqueta";

        let handleBEtiqueta = new BorrarEtiquetasHandle();
        handleBEtiqueta.gasto = gasto;
        handleBEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener('click', handleBEtiqueta);

        spanEtiqueta.append(etiqueta);
        divGasEtiqueta.append(spanEtiqueta);
    }
    
    divGasto.append(divGasEtiqueta);

    let bEditar = document.createElement('button');
    bEditar.className = "gasto-editar";
    bEditar.type = "button";
    bEditar.textContent = "Editar";

    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    bEditar.addEventListener('click', handleEditar);
    divGasto.append(bEditar);

    let bBorrar = document.createElement('button');
    bBorrar.className = "gasto-borrar";
    bBorrar.type = "button";
    bBorrar.textContent = "Borrar";

    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    bBorrar.addEventListener('click', handleBorrar);
    divGasto.append(bBorrar);

    let bBorrarApi = document.createElement('button');
    bBorrarApi.className = "gasto-borrar-api";
    bBorrarApi.type = "button";
    bBorrarApi.textContent = "Borrar (API)";

    let handleBorrarApi = new borrarGastoApiHandle();
    handleBorrarApi.gasto = gasto;
    bBorrarApi.addEventListener("click", handleBorrarApi);
    divGasto.append(bBorrarApi);

    let bEditarForm = document.createElement('button');
    bEditarForm.className = "gasto-editar-formulario";
    bEditarForm.type = "button";
    bEditarForm.textContent = "Editar (formulario)";

    let handleEditarForm = new EditarHandleFormulario();
    handleEditarForm.gasto = gasto;
    bEditarForm.addEventListener("click", handleEditarForm);
    divGasto.append(bEditarForm);

    document.getElementById(idElemento).append(divGasto);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";
    
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.append(`Gastos agrupados por ${periodo}`)
    divAgrupacion.append(h1);


    for(let [fecha, valor] of Object.entries(agrup)){
        let divAgrupado = document.createElement('div');
        divAgrupado.className = "agrupacion-dato";

        let spanDatoClave = document.createElement('span');
        spanDatoClave.className = "agrupacion-dato-clave";
        spanDatoClave.append(fecha);

        let spanValor = document.createElement('span');
        spanValor.className = "agrupacion-dato-valor";
        spanValor.append(valor);

        divAgrupado.append(spanDatoClave);
        divAgrupado.append(spanValor);
        divAgrupacion.append(divAgrupado);
    }
    divP.append(divAgrupacion);

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

function repintar(){
    
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for(let gasto of listaGastos){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

    let periodoDia = "dia";
    let gastosDia = gesPres.agruparGastos(periodoDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

    let periodoMes = "mes";
    let gastosMes = gesPres.agruparGastos(periodoMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let periodoAnyo = "anyo";
    let gastosAnyo = gesPres.agruparGastos(periodoAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");


}

function actualizarPresupuestoWeb(){
    let presNuevo = prompt("Introduzca el nuevo presupuesto");
    presNuevo = parseFloat(presNuevo);

    gesPres.actualizarPresupuesto(presNuevo);

    repintar();
}

let bActualizar = document.getElementById("actualizarpresupuesto");
bActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descNueva = prompt("Introduce una nueva descripción");
    let valorNuevo = prompt("Introduce nuevo valor");
    let fechaNueva = prompt("Introduce nueva fecha");
    let etiNuevas = prompt("Introduce nuevas etiquetas");

    valorNuevo = parseFloat(valorNuevo);
    let etiquetas = etiNuevas.split(', ');
    

    let gasto = new gesPres.CrearGasto(descNueva, valorNuevo, fechaNueva, ...etiquetas);
    gesPres.anyadirGasto(gasto);
    repintar();
}

let bAnyadirGasto = document.getElementById("anyadirgasto");
bAnyadirGasto.addEventListener('click', nuevoGastoWeb); 


function EditarHandle(){
    this.handleEvent = function(e){

    let descNueva = prompt("Introduce una nueva descripción");
    this.gasto.actualizarDescripcion(descNueva);

    let valorNuevo = prompt("Introduce nuevo valor");
    valorNuevo = parseFloat(valorNuevo);
    this.gasto.actualizarValor(valorNuevo);

    let fechaNueva = prompt("Introduce nueva fecha");
    fechaNueva = Date.parse(fechaNueva);
    this.gasto.actualizarFecha(fechaNueva);

    let nuevaEtiqueta = prompt("Introduce nuevas etiquetas");
    nuevaEtiqueta = nuevaEtiqueta.split(', ');
    this.gasto.anyadirEtiquetas(...nuevaEtiqueta);

        repintar();
    }   
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
this.handleEvent = function(e){
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
}
}

function submitHandle(){
    this.handleEvent = function(e){
    e.preventDefault(); //evita recargar la página, evita el comportamiento por defecto de
    let form = e.currentTarget;

    let descNew = form.elements.descripcion.value;
    let valNew = form.elements.valor.value;
    let fechaNew = form.elements.fecha.value;
    let eticNew = form.elements.etiquetas.value;

    
    valNew = parseFloat(valNew);
    eticNew = eticNew.split(', ');

    let gasto = new gesPres.CrearGasto(descNew, valNew, fechaNew, ...eticNew);
    gesPres.anyadirGasto(gasto);
    repintar();
    
    document.getElementById("anyadirgasto-formulario").disabled = false;

    }
}

function submitHandleEditar(){
    this.handleEvent = function(e){
        e.preventDefault();
    let form = e.currentTarget;

    let descNew = form.elements.descripcion.value;
    let valNew = form.elements.valor.value;
    let fechaNew = form.elements.fecha.value;
    let eticNew = form.elements.etiquetas.value;
        
    valNew = parseFloat(valNew);
    eticNew = eticNew.split(', ');

    this.gasto.actualizarDescripcion(descNew);
    this.gasto.actualizarValor(valNew);
    this.gasto.actualizarFecha(fechaNew);
    this.gasto.anyadirEtiquetas(...eticNew);

    repintar();

    }

}




function cancelHandle(){
    this.handleEvent = function(e){
        e.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;

        repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let boton = e.currentTarget;
        boton.after(formulario);

        boton.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let editarGasto = new submitHandleEditar();
        editarGasto.gasto = this.gasto; 

        let bEditarGasto = formulario;
        bEditarGasto.addEventListener("submit", editarGasto);

        let manejadorCancelar = new cancelHandle();
        let botonCancelar = formulario.querySelector("button[type = button]");
        botonCancelar.addEventListener("click", manejadorCancelar);

        let editarGasApi = formulario.querySelector("button.gasto-enviar-api");
        let editarApi = new editarGastoApi();
        editarApi.gasto = this.gasto;
        editarGasApi.addEventListener("click", editarApi);
    }


}



function nuevoGastoWebFormulario(){
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        document.getElementById("controlesprincipales").append(formulario);
        document.getElementById("anyadirgasto-formulario").disabled =true;

        let manejadorEnviar = new submitHandle();
        let botonEnviar = formulario;
        botonEnviar.addEventListener("submit", manejadorEnviar);

        let manejadorCancelar = new cancelHandle();
        let botonCancelar = formulario.querySelector("button[type = button]");
        botonCancelar.addEventListener("click", manejadorCancelar);

        let enviarApi = formulario.querySelector("button.gasto-enviar-api");
        enviarApi.addEventListener("click", enviarGastoApi);
    }
}


function filtrarGastosWeb(){

    this.handleEvent = function(e){
        e.preventDefault();

        let form = e.currentTarget;
        
        let descripcionFiltro = form.elements["formulario-filtrado-descripcion"].value;
        let valorMinimoFiltro = form.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximoFiltro = form.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesdeFiltro = form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHastaFiltro = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetasFiltro = form.elements["formulario-filtrado-etiquetas-tiene"].value;

        
        if(etiquetasFiltro !== null){
            etiquetasFiltro = gesPres.transformarListadoEtiquetas(etiquetasFiltro);
        }

        valorMinimoFiltro = parseFloat(valorMinimoFiltro);
        valorMaximoFiltro = parseFloat(valorMaximoFiltro);

        let gastosFiltrados = gesPres.filtrarGastos({fechaDesde: fechaDesdeFiltro, fechaHasta: fechaHastaFiltro, valorMinimo: valorMinimoFiltro, valorMaximo: valorMaximoFiltro, descripcionContiene: descripcionFiltro, etiquetasTiene: etiquetasFiltro});

        let listaGastos = document.getElementById("listado-gastos-completo");
        listaGastos.innerHTML="";

        for(let gasto of gastosFiltrados){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

    }
}

function guardarGastosWeb(){
    let liGastos = gesPres.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(liGastos));
    
}
function cargarGastosWeb(){
    
        let gastosGuardados = localStorage.getItem('GestorGastosDWEC');
        gastosGuardados = JSON.parse(gastosGuardados);
        
        
        if(gastosGuardados)
        {
           gesPres.cargarGastos(gastosGuardados);
        }else{
            gastosGuardados = [];
            gesPres.cargarGastos(gastosGuardados);
        }

        repintar();
    
}

function cargarGastosApi(){
    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

    if(usuario == ""){
        console.log("Nombre de usuario no introducido");
    }else{
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then((result) => { 
        let resultado = result;
        if(resultado == ""){
            console.log("El usuario no ha introducido gastos")
        }else{
            gesPres.cargarGastos(resultado);
            repintar();
        }
        }); 
    }
}

function borrarGastoApiHandle(){
    this.handleEvent = function(e){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if(usuario == ""){
            console.log("Nombre de usuario no introducido")
        }else{
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then((result) => { 
            let resultado = result;
            if(!resultado.errorMessage){
            cargarGastosApi();
            }else{
            console.log(resultado.errorMessage);
            }
            });
        }
}
}

function enviarGastoApi(e){
    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

    let form = e.currentTarget.form;
    let descripcionApi = form.elements.descripcion.value;
    let valorApi = form.elements.valor.value;
    let fechaApi = form.elements.fecha.value;
    let etiquetasApi = form.elements.etiquetas.value;

    valorApi = parseFloat(valorApi);
    etiquetasApi = etiquetasApi.split(",");

    let objetoApi = {
        descripcion: descripcionApi,
        fecha: fechaApi,
        valor: valorApi,
        etiquetas: etiquetasApi
    }

    if(usuario == ""){
        console.log("Nombre de usuario no introducido")
    }else{

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(objetoApi),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            
            if(response.ok){
                console.log("La petición se ha añadido correctamente");
                cargarGastosApi();
            }else{
                console.log("No se ha podido añadir la petición");
            }
        });
    }
}



function editarGastoApi(){

    this.handleEvent = function(e){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

    let formu = e.currentTarget.form;
    let descripcionApi = formu.elements.descripcion.value;
    let valorApi = formu.elements.valor.value;
    let fechaApi = formu.elements.fecha.value;
    let etiquetasApi = formu.elements.etiquetas.value;

    valorApi = parseFloat(valorApi);
    etiquetasApi = etiquetasApi.split(",");

    let objetoApi = {
        descripcion: descripcionApi,
        fecha: fechaApi,
        valor: valorApi,
        etiquetas: etiquetasApi
    }

    if(usuario == ""){
        console.log("Nombre de usuario no introducido")
    }else{

        fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(objetoApi),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            
            if(response.ok){
                console.log("La petición de modificación se ha añadido correctamente");
                cargarGastosApi();
            }else{
                console.log("No se ha podido añadir la petición de modificación");
            }
        });
    }
}

}



let crearFormulario = new nuevoGastoWebFormulario();

let botonCrear = document.getElementById("anyadirgasto-formulario");
botonCrear.addEventListener("click", crearFormulario);

let gastosFiltradosWeb = new filtrarGastosWeb();

let botonFiltro = document.getElementById("formulario-filtrado");
botonFiltro.addEventListener("submit", gastosFiltradosWeb);


let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", guardarGastosWeb);


let botonCargar = document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", cargarGastosWeb);

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);





export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}