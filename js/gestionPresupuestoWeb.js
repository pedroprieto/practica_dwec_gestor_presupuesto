import * as gesPres from "./gestionPresupuesto.js";


let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener('click', nuevoGastoWeb);

let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener('click', cargarGastosApi);



let nombreUsuario = document.getElementById('nombre_usuario');


let crearFormulario = new nuevoGastoWebFormulario();
let btnAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoFormulario.addEventListener('click', crearFormulario);


let filtrarGastos = new filtrarGastosWeb();
let btnFiltrar = document.getElementById("formulario-filtrado");
btnFiltrar.addEventListener('submit', filtrarGastos);

let guardarGastos = new guardarGastosWeb();
let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener('click', guardarGastos);


let cargarGastos = new cargarGastosWeb();
let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click', cargarGastos);





function repintar() {
    
    mostrarDatoEnId("presupuesto",gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());
    

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();

    for (let gasto of listaGastos) {

        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    
    mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "día");
    
    mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
    
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "año");

}

function actualizarPresupuestoWeb() {
    
    let newPresupuesto = prompt("Introduce un Presupuesto");
    newPresupuesto = parseInt(newPresupuesto, 10);
    gesPres.actualizarPresupuesto(newPresupuesto);
    repintar();
   
}

function nuevoGastoWeb() {
    
    let newDescripcion = prompt("Introduce una descripción");
    let newValor = prompt("Introduce un Valor");
    newValor = parseInt(newValor, 10);
    let newFecha = prompt("Introduce una fecha");
    let newEtiqueta = prompt("Introduce las etiquetas separadas por comas");

    let etiquetas = newEtiqueta.split(', ');

    let gastoNuevo = new gesPres.CrearGasto(newDescripcion, newValor, newFecha, etiquetas);
    
    gesPres.anyadirGasto(gastoNuevo);

    repintar();  
    
}



function EditarHandle(){

    this.handleEvent= function(e){

        let descripcion = prompt("Introduce una descripción");
        let valor = prompt("Introduce el gasto");        
        let fecha = prompt("Introduce la fecha");
        let etiqueta = prompt("Introduce las etiquetas");
        valor = parseFloat(valor);
        let etiquetasSueltas = etiqueta.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSueltas);

        repintar();
    }

}

function BorrarHandle() {
    
    this.handleEvent = function (e) {
        
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }

}

function BorrarEtiquetasHandle() {
    
    this.handleEvent = function (e) {
        
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }

    
}


function mostrarDatoEnId(idElemento, valor){

       
    document.getElementById(idElemento).innerHTML = valor;
       
};


function nuevoGastoWebFormulario() {
    
    this.handleEvent = function (e) {

        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        document.getElementById("controlesprincipales").append(formulario);
        document.getElementById("anyadirgasto-formulario").disabled = "true";

        let manejadorEnviar = new submitHandle();        
        
        let btnEnviar = formulario;
        btnEnviar.addEventListener('submit', manejadorEnviar);        
        
        let manejadorCancelar = new cancelHandle();
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener('click', manejadorCancelar);
                

        let manejadorEnviarApi = new EnviarHandleApiPost();
        let btnEnviarApi = document.getElementById("gasto-enviar-api");
        btnEnviarApi.addEventListener('click', manejadorEnviarApi);
        
    }    
    
}

function ActualizarHandleApiPut() {
    
    this.handleEvent = function (e) {

        //console.log("funcionaPut")        
        
        let nombreUsuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;


        let form = e.currentTarget.form;

        let newDescripcion = form.elements.descripcion.value;
        let newValor = form.elements.valor.value;
        let newFecha = form.elements.fecha.value;
        let newEtiqueta = form.elements.etiquetas.value;

        newValor = parseFloat(valor);
        newEtiqueta = newEtiqueta.split(",");

        let newObjeto = {
            desripcion: newDescripcion,
            valor: newValor,
            fecha: newFecha,
            etiquetas: newEtiqueta
        }

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(newObjeto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                cargarGastosApi();
            })

    }
    
}

function EnviarHandleApiPost() {

    this.handleEvent = function (e) {

        //console.log("funcionaPost");               
        let formulario = e.currentTarget.form;
        let nombreUsuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        
        let desripcion = formulario.elements.descripcion.value;
        let valor = formulario.elements.valor.value;
        valor = parseFloat(valor);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        etiquetas = etiquetas.split(",");

        let objeto = {
            descripcion: desripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json'
            }            
        })
            .then(res => {
                
                cargarGastosApi();
            })
        

    }

}

function BorrarHandleApi() {
    
    this.handleEvent = function (e) {
        
        let nombreUsuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;
       
        fetch(url , { 
            method: 'DELETE'
        })            
            .then(res => res.json())
            .then(data => {
                cargarGastosApi();                
        })                
    } 
    
}

function submitHandle(){

    this.handleEvent = function (e) {

        e.preventDefault();
        
        let formulario = e.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        let valor = formulario.elements.valor.value;
        valor = parseFloat(valor);        
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let etiquetasSueltas = etiquetas.split(', ');                      

        let gasto = new gesPres.CrearGasto(descripcion, valor, fecha, ...etiquetasSueltas);
        
        // aquí estaba el fallo, me faltaba anyadir el operador spread a las etiquetas.

        gesPres.anyadirGasto(gasto);   
        
        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;        


    }
}

function cancelHandle() {
    
    this.handleEvent = function (e) {
        

        e.currentTarget.form.remove();

        document.getElementById("anyadirgasto-formulario").disabled = false;

        repintar();

    }
}

function submitHandleEditar() {
    
    this.handleEvent = function (e) {
        
        e.preventDefault();
        let form = e.currentTarget;

        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        valor = parseFloat(valor);
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function EditarHandleFormulario() {
    
    this.handleEvent = function (e) {
    
        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let btnEditarForm = e.currentTarget;
        btnEditarForm.after(formulario);        

        btnEditarForm.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let editarGasto = new submitHandleEditar();
        editarGasto.gasto = this.gasto;

        let botonEditar = formulario;
        botonEditar.addEventListener('submit', editarGasto);

        let cancelarGasto = new cancelHandle();
        let botonCancelar = formulario.querySelector("button[type = button]");
        botonCancelar.addEventListener('click', cancelarGasto);
        
        let enviarApi = new ActualizarHandleApiPut();
        let btnEnviarApi = document.getElementById("gasto-enviar-api");
        btnEnviarApi.addEventListener('click', enviarApi);

    }

   
}

function filtrarGastosWeb() {
    
    this.handleEvent = function (e) {
        
        e.preventDefault();

        let plantillaFormulario = document.getElementById("filtrar-gastos");
        let formulario = plantillaFormulario.querySelector("form");
        
        let etiquetasFormulario = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if (etiquetasFormulario != "") {
            
            var etiquetasBuenas = gesPres.transformarListadoEtiquetas(etiquetasFormulario);
        }

        let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
        valorMinimo = parseFloat(valorMinimo);
        let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;
        valorMaximo = parseFloat(valorMaximo);
        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;

        let gastosFiltrados = gesPres.filtrarGastos({fechaDesde: fechaDesde, fechaHasta: fechaHasta, valorMinimo: valorMinimo, valorMaximo: valorMaximo, descripcionContiene: descripcion, etiquetasTiene: etiquetasBuenas});

        document.getElementById("listado-gastos-completo").innerHTML = "";

        for (let gasto of gastosFiltrados) {
            
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
        

    }

}

function guardarGastosWeb() {

    this.handleEvent = function (e) {

        localStorage.GestorGastosDWEC = JSON.stringify(gesPres.listarGastos());

    }
}

function cargarGastosWeb() {

    this.handleEvent = function (e) {

        let datosCargados = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        if (datosCargados){
            
            gesPres.cargarGastos(datosCargados);

        } else {
            
            gesPres.cargarGastos([]);
        }
        
        repintar();
    }   

}

function borrarGastoApi() {

    

}






function mostrarGastoWeb(idElemento, gasto){

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    let divPrincipal = document.getElementById(idElemento);   
    

    
    
    
    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.append(gasto.descripcion);
    
    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.append(gasto.fecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className = "gasto-valor";
    divGastoValor.append(gasto.valor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = "gasto-etiquetas"
    
    
    let btnEditar = document.createElement('button');
    btnEditar.type = "button";
    btnEditar.id = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.className = "gasto-editar";

    let eventoEditar = new EditarHandle();
    eventoEditar.gasto = gasto;
    btnEditar.addEventListener('click', eventoEditar);

   
    let btnBorrar = document.createElement('button');
    btnBorrar.type = "button";
    btnBorrar.id = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.className = "gasto-borrar";
   

    let eventoBorrar = new BorrarHandle();
    eventoBorrar.gasto = gasto;
    btnBorrar.addEventListener('click', eventoBorrar);

    let btnBorrarApi = document.createElement('button');
    btnBorrarApi.type = "button";
    btnBorrarApi.id = "gasto-borrar-api";
    btnBorrarApi.textContent = "Borrar ( API )";
    btnBorrarApi.className = "gasto-borrar-api";

    let eventoBorrarApi = new BorrarHandleApi();
    eventoBorrarApi.gasto = gasto;
    btnBorrarApi.addEventListener('click', eventoBorrarApi);
    

    let btnEditarFormulario = document.createElement('button');
    btnEditarFormulario.type = "button";
    btnEditarFormulario.id= "gasto-editar-formulario";
    btnEditarFormulario.textContent = "Editar (Formulario)";
    btnEditarFormulario.className = "gasto-editar-formulario";

    let eventoEditarFormulario = new EditarHandleFormulario();
    eventoEditarFormulario.gasto = gasto;
    btnEditarFormulario.addEventListener('click', eventoEditarFormulario);


    for (let etiqueta of gasto.etiquetas) {
        
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${etiqueta}`;
        divGastoEtiquetas.append(spanEtiqueta);

        let eventoBorrarEtiqueta = new BorrarEtiquetasHandle();
        eventoBorrarEtiqueta.gasto = gasto;
        eventoBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener('click', eventoBorrarEtiqueta);
    }

    
    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divGastoEtiquetas);
    divGasto.append(btnEditar);    
    divGasto.append(btnBorrar);
    divGasto.append(btnBorrarApi);
    divGasto.append(btnEditarFormulario);
    
    
    divPrincipal.append(divGasto);

};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
   
    let divP = document.getElementById(idElemento);
    divP.innerHTML = "";    
    
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    
    let h1Titulo = document.createElement('h1');
    
    h1Titulo.innerHTML = "Gastos agrupados por" + periodo;
    divAgrupacion.append(h1Titulo);

    for (let [key, value] of Object.entries(agrup)) {
        
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = "agrupacion-dato";

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
        spanAgrupacionDatoClave.append(key);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.className = "agrupacion-dato-valor";
        spanAgrupacionDatoValor.append(value);

        divAgrupacionDato.append(spanAgrupacionDatoClave);
        divAgrupacionDato.append(spanAgrupacionDatoValor);
        divAgrupacion.append(divAgrupacionDato);        

    }

    
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
        
    
    //divP.append(divAgrupacion);

    

};

/* let btnBorrarApi = document.getElementById("gasto-borrar-api");
btnBorrarApi.addEventListener('click', borrarGastoApi); */


function cargarGastosApi() {
        
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario.value}`;

    fetch(url)
        
        .then(res => res.json())
         .then((data) => {
             let datos = data;
             gesPres.cargarGastos(datos);
             console.log(datos);
             repintar();   
        
        })
    
    
        
}


export {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}