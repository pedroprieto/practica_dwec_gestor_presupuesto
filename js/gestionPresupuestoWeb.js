import * as gp from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento,valor){
    document.getElementById(idElemento).append(valor);
}

function auxCrearElemento(tagHTML,clase,contenido){
    let etiqueta=document.createElement(tagHTML);
    etiqueta.className=clase;
    etiqueta.innerHTML=contenido;
    return etiqueta;
}

function mostrarGastoWeb(idElemento,gasto){

    let tag = document.createElement('div');
    tag.className="gasto";

    tag.prepend(auxCrearElemento('div',"gasto-descripcion", `${gasto.descripcion}`));
    tag.prepend(auxCrearElemento('div',"gasto-fecha", `${gasto.fecha}`));
    tag.prepend(auxCrearElemento('div',"gasto-valor",  `${gasto.valor}`));
    
    
    let etiquetas=document.createElement('div');
    etiquetas.className="gasto-etiquetas";
    
    if ( gasto.etiquetas ){
        
        for(let etiqueta of gasto["etiquetas"]){
            let span=document.createElement('span');
            span.className="gasto-etiquetas-etiqueta"
            
            let handleEtiqueta = new BorrarEtiquetasHandle();
            handleEtiqueta.gasto = gasto;
            handleEtiqueta.etiqueta = etiqueta;
            span.addEventListener("click", handleEtiqueta);
            
            span.append(etiqueta);
            etiquetas.append(span);
        }
    }
    tag.prepend(etiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar"; 
    
    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    botonEditar.addEventListener("click", handleEditar);
    tag.append(botonEditar);
    
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar"; 
    
    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", handleBorrar);
    tag.append(botonBorrar);

    let botonEditarFormulario = document.createElement('button');
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.type = "button";
    botonEditarFormulario.textContent = "Editar (formulario)";
    
    let manejadorEventoformulario = new EditarHandleFormulario();
    manejadorEventoformulario.gasto = gasto;
    botonEditarFormulario.addEventListener("click",manejadorEventoformulario);
    tag.append(botonEditarFormulario);
    
    document.getElementById(idElemento).append(tag);
    
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    let elemento = document.createElement('div');
    elemento.className='agrupacion';
    let h1=document.createElement('h1');
    h1.innerHTML=`Gastos agrupados por ${periodo}`;
    elemento.prepend(h1);
    
    for(let gasto in agrup){
        let agrupa=auxCrearElemento('div','agrupacion-dato',"");
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-clave',gasto[0]));
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-valor',gasto[1]));
        elemento.prepend(agrupa);

    }
    document.getElementById(idElemento).append(elemento);

        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(id);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
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
    
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let balanceT = gp.calcularBalance();
    mostrarDatoEnId("balance-total",balanceT);

    let gastosT = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales",gastosT);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let gastoslistados = gp.listarGastos();

    for (let gasto of gastoslistados){

        mostrarGastoWeb("listado-gastos-completo",gasto)
    }

    let periodoDia = "dia";
    let gastosDia = gp.agruparGastos(periodoDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

    let periodoMes = "mes";
    let gastosMes = gp.agruparGastos(periodoMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

    let periodoYear = "anyo";
    let gastosAnyo = gp.agruparGastos(periodoYear);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");
}

function actualizarPresupuestoWeb(){

    let nuevoPresupuesto = parseFloat(prompt("Introduce tu presupuesto, por favor"));
    gp.actualizarPresupuesto(nuevoPresupuesto)
    repintar();
}


function nuevoGastoWeb(){

    let descripcionN = prompt("Introduce la descripción del gasto, por favor");

    let valorN = prompt("Introduce el importe del gasto, por favor");
    valorN = parseFloat(valorN);

    let fechaN = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor");

    let etiquetasN = prompt("Introduce las etiquetas del gasto separadas por comas, por favor");
    etiquetasN = etiquetasN.split(',');

    let gasto = new gp.CrearGasto(descripcionN,valorN,fechaN,etiquetasN);
    gp.anyadirGasto(gasto);

    repintar();
}


function EditarHandle(){

    this.handleEvent = function(e){

        let descripcionNueva = prompt("Introduce una descripción del gasto, por favor : ",this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descripcionNueva);

        let valorNuevo = prompt("Introduce el importe del gasto, por favor",this.gasto.valor);
        valorNuevo = parseFloat(valorNuevo);
        this.gasto.actualizarValor(valorNuevo);

        let fechaNueva = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor",this.gasto.fecha);
        this.gasto.actualizarFecha(fechaNueva);

        let etiquetasNuevas = prompt("Introduce las etiquetas del gasto separadas por comas, por favor",this.gasto.etiquetas);
        etiquetasNuevas =etiquetasNuevas.split(',');
        this.gasto.anyadirEtiquetas(...etiquetasNuevas);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){

    this.handleEvent = function(e){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        let controlesPrincipales = document.getElementById("controlesprincipales");

        controlesPrincipales.append(formulario);

        document.getElementById("anyadirgasto-formulario").disabled = true;

        let enviarHandle = new EnviarGastoHandle();
        enviarHandle.formulario = formulario;
        formulario.addEventListener("submit", enviarHandle);

        let botonCancelar =formulario.querySelector("button.cancelar");
        let cancelarEvento = new cancelarHandle();
        botonCancelar.addEventListener("click",cancelarEvento);

        let enviarApi = form.querySelector("button.gasto-enviar-api");

        enviarApi.addEventListener("click", enviarhandlerGastoApi);
    }
}

function submitHandler(){
    this.handleEvent = function(e){

        e.preventDefault()

        let formulario = e.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = formulario.elements.valor.value;
        valor= parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);


        repintar();

    }
} 
function cancelarHandle(){
    this.handleEvent = function(e){ 

        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove(); 
        repintar(); 
    }
}

function EnviarGastoHandle(){

    this.handleEvent = function(e){
        e.preventDefault();

        
        let formulario = e.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = formulario.elements.valor.value;
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        valor = parseFloat(valor);

        let nuevoGasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);
        gp.anyadirGasto(nuevoGasto);
        repintar();
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function(e){

        let plantillaFormulario = document.getElementById("formlario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let botonEditarFormulario = e.currentTarget;
        botonEditarFormulario.after(formulario);
        botonEditarFormulario.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let submitGasto = new submitHandler();
        submitGasto.formulario = formulario;
        submitGasto.gasto = this.gasto;
        formulario.addEventListener("submit",submitGasto);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let eventoCancelar = new cancelarHandle();
        botonCancelar.addEventListener("click", eventoCancelar);

        let editarApiFormulario = form.querySelector("button.gasto-enviar-api");
        editarApiFormulario.gasto = this.gasto;
        editarApiFormulario.addEventListener("click", handleenviareditadoaAPI);
    }
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonNuevoGasto  = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);;

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

let botoncargargastosAPI = document.getElementById("cargar-gastos-api");
botoncargargastosAPI.addEventListener("click", cargarGastosApi);

async function cargarGastosApi(){
        let usuario = document.getElementById('nombre_usuario').value;
        
        let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;
        try{let datos = await fetch(url);
        if(datos.ok){
        let json = await datos.json();
            gp.cargarGastos(json)
            repintar()
        }
        else {
            alert("Error-HTTP: "+ datos.status);
        }}  
        catch(e) {
        console.log(e);
        
    } 
}

function enviarhandlerGastoApi(e){

    let usuario = document.getElementById("nombre_usuario").value;
    let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario;

    let form = e.currentTarget.form;
    let descripcion = form.elements.descripcion.value;
    let valor = form.elements.valor.value;
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;
    arrayetiquetas = etiquetas.split(",");

}
function BorrarHandleAPI(){
    this.handleEvent = async function(e){
        let usuario = document.getElementById('nombre_usuario').value;
        let url = 'https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + usuario + `/${this.gasto.gastoId}` ;
        fetch(url, {
            method: "DELETE",
        })
        cargarGastosApi();
    }
}

let gastoAPI = new gp.CrearGasto(descripcion,valor,fecha,...arrayetiquetas)        
fetch(url, {method: 'POST', body: JSON.stringify(gastoAPI),headers:{'Content-Type': 'application/json'}})


cargarGastosApi();

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
    
}