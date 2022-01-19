import * as gesPres from "./gestionPresupuesto.js";

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let filtrado = new filtrarGastosWeb(); 
document.getElementById("formulario-filtrado").addEventListener("submit", filtrado); //recordar crear el objeto para poder asociar despues el evento
let guardar = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener("click", guardar);
let cargar = new cargarGastosWeb();
document.getElementById("cargar-gastos").addEventListener("click", cargar);

function mostrarDatoEnId(idElemento, valor)
{
    let contenedor = document.getElementById(idElemento);
    
    contenedor.textContent = `${valor}`;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(id);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let div1 = document.createElement("div");
    let h1 = document.createElement("h1");
    
    div1.className = "agrupacion";

    h1.innerHTML = `Gastos agrupados por ${periodo}`;

    div1.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div = document.createElement("div");
        div.className = "agrupacion-dato";

        let span1 = document.createElement("span");
        let span2 = document.createElement("span");

        span1.className = "agrupacion-dato-clave";
        span1.append(`Clave: ${clave}`);
        div.append(span1);

        span2.className = "agrupacion-dato-valor";
        span2.append(`Valor: ${valor}`);
        div.append(span2);

        div1.append(div);
    }

    let contenido = document.getElementById(idElemento);

    contenido.append(div1);

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

function mostrarGastoWeb(idElemento, gasto)
{
    let contenido = document.getElementById(idElemento);

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;

    let evEditarForm = new EditarHandleformulario();
    evEditarForm.gasto = gasto;

    let div1 = document.createElement("div"); //div gasto global
    let div2 = document.createElement("div"); //div descripcion
    let div3 = document.createElement("div"); //fecha
    let div4 = document.createElement("div"); //valor
    let div5 = document.createElement("div"); //etiquetas

    div1.className = "gasto";

    div2.className = "gasto-descripcion";
    div2.append(gasto.descripcion);

    div3.className = "gasto-fecha";
    div3.append(gasto.fecha);

    div4.className = "gasto-valor";
    div4.append(gasto.valor);

    div1.append(div2);
    div1.append(div3);
    div1.append(div4);

    div5.className = "gasto-etiquetas";

    for (let e of gasto.etiquetas)
    {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = `${e}`; //para que haya un span de cada

        div5.append(span);

        //Borrado etiquetas
        let evEtiquetas = new BorrarEtiquetasHandle();
        evEtiquetas.gasto = gasto;
        evEtiquetas.etiqueta = e;

        span.addEventListener("click", evEtiquetas);
    }

    div1.append(div5);

    //Boton Editar
    let btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", evEditar);

    //Boton borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", evBorrar);

    

    //Boton Borrar2 API
    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.type = "button";
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.textContent = "Borrar (API)";

    //API
    let evBorrarAPI = new BorrarApiHandle(); //--------------------//
    evBorrarAPI.gasto = gasto;

    btnBorrarAPI.addEventListener("click", evBorrarAPI); //----------------------------//
    div1.append(btnBorrarAPI);


    //Boton editar formulario
    let btnEditarForm = document.createElement("button");
    btnEditarForm.type = "button";
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.textContent = "Editar (formulario)";

    btnEditarForm.addEventListener("click", evEditarForm);

    div1.append(btnEditar);
    div1.append(btnBorrar);
    div1.append(btnEditarForm);
    contenido.append(div1);
}

//Manejadora de eventos
function actualizarPresupuestoWeb()
{
    let presu = prompt("Introduzca un presupuesto");

    let presuNum = parseFloat(presu);

    gesPres.actualizarPresupuesto(presuNum);

    repintar();
}


//Manejadora de eventos
function nuevoGastoWeb()
{
    let desc = prompt("Introduce una descripcion");
    let valor = parseFloat(prompt("Introduce un valor"));
    let fecha = prompt("introduce una fecha");
    let etiqs = prompt("introduce las etiquetas");

    etiqs = etiqs.split(",");

    let g1 = new gesPres.CrearGasto(desc, valor, fecha, etiqs);

    gesPres.anyadirGasto(g1);

    repintar();
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }

    //Actualizamos datos mostrandolos por agrupación para las tablas
    mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "día");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "anyo");
}

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    //añadimos el documento
    let finalContenido = document.getElementById("controlesprincipales");
    finalContenido.append(formulario);

    //desactivar el boton formulario
    let botonFormulario = document.getElementById("anyadirgasto-formulario");
    botonFormulario.disabled = true;

    //Boton de enviar
    let manejadorEnvio = new enviarGastoHandle();
    formulario.addEventListener("submit", manejadorEnvio);

    //Boton de enviar2 API
    let envioApi = formulario.querySelector("button.gasto-enviar-api"); //-----------------------//
    envioApi.addEventListener("click", enviarGastoApiHandle);

    //boton cancelar
    let manejadorCancelar = new cancelarGastoHandle();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manejadorCancelar);
}

function guardarGastosWeb()
{
    this.handleEvent = function(e)
    {
        let gastosGuardados = gesPres.listarGastos();

        localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastosGuardados));
    }
}

function cargarGastosWeb()
{
    this.handleEvent = function(e)
    {
        let listaGuardados = localStorage.getItem("GestorGastosDWEC"); //obtenemos los valores guardados a través de la clave
        listaGuardados = JSON.parse(listaGuardados); //convertimos los valores a array, porque los guardamos antes en strings

        let array = [];

        if(listaGuardados == null)
        {
            gesPres.cargarGastos(array);
        }
        else
        {
            gesPres.cargarGastos(listaGuardados);
        }

        repintar();
    }
}

//Manejadores de eventos
function filtrarGastosWeb()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();

        //Cogemos los datos del formulario
        let actual = e.currentTarget;
        
        let descFilt = actual.elements["formulario-filtrado-descripcion"].value;
        let valMinFilt = actual.elements["formulario-filtrado-valor-minimo"].value;
        let valMaxFilt = actual.elements["formulario-filtrado-valor-maximo"].value;
        let fechaInicialFilt = actual.elements["formulario-filtrado-fecha-desde"].value;
        let fechaFinalFilt = actual.elements["formulario-filtrado-fecha-hasta"].value;
        let etiqFilt = actual.elements["formulario-filtrado-etiquetas-tiene"].value;

        valMinFilt = parseFloat(valMinFilt);
        valMaxFilt = parseFloat(valMaxFilt);

        //Si tiene etiquetas
        if(etiqFilt != null) //no puedo decir que sea distinto de 0 sino que este vacio o no, una etiqueta no son numeros
        {
            etiqFilt = gesPres.transformarListadoEtiquetas(etiqFilt);
        }

        //pasandole los parametros para filtrar al objeto
        let objetoFiltrado = gesPres.filtrarGastos({fechaDesde: fechaInicialFilt, fechaHasta: fechaFinalFilt, valorMinimo: valMinFilt, valorMaximo: valMaxFilt, descripcionContiene: descFilt, etiquetasTiene: etiqFilt});

        //gesPres.filtrarGastos();
        //Actualizamos la lista. Primero la dejamos vacia y luego los vamos mostrando
        document.getElementById("listado-gastos-completo").innerHTML = "";

        for (let g of objetoFiltrado)
        {
            mostrarGastoWeb("listado-gastos-completo", g);
        }
    }
}

function enviarGastoHandle()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
        let actual = e.currentTarget;

        let nuevaDesc = actual.elements.descripcion.value;
        let nuevoValor = actual.elements.valor.value;
        let nuevaFecha = actual.elements.fecha.value;
        let nuevasEtiquetas = actual.elements.etiquetas.value;

        nuevoValor = parseFloat(nuevoValor);
        //nuevasEtiquetas = nuevasEtiquetas.split(",");

        //creamos el nuevo gasto
        let gasto1 = new gesPres.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, nuevasEtiquetas);
        gesPres.anyadirGasto(gasto1);

        let anyadirGasto = document.getElementById("anyadirgasto-formulario");

        anyadirGasto.disabled = false;

        repintar();
    }
}

function cancelarGastoHandle()
{
    this.handleEvent = function(e)
    {
        //eliminar formulario
        e.currentTarget.parentNode.remove();

        //activar boton crear
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

function EditarHandle()
{
    this.handleEvent = function(e){
       //Pedir datos al usuario
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let val = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fech = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       this.gasto.anyadirEtiquetas(...etiq);

       repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function(e)
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function(e)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}


function EditarHandleformulario()
{
    this.handleEvent = function(e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        var formulario = plantillaFormulario.querySelector("form");

        //Boton de editar(formulario)
        let btnActual = e.currentTarget;
        btnActual.after(formulario);
        btnActual.disabled = true;

        //Mostramos los valores
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        //Boton de enviar
        let enviar = new EditarHandleGasto();
        enviar.gasto = this.gasto;

        formulario.addEventListener("submit", enviar);

        //Boton de enviar2 API
        let editarApi = formulario.querySelector("button.gasto-enviar-api"); //-----------------------//
        editarApi.gasto = this.gasto;
        editarApi.addEventListener("click", editarGastoApiHandle);

        //boton cancelar
        let manCancelar = new cancelarGastoHandle();
        
        let btnCancelar = formulario.querySelector("button.cancelar");
        btnCancelar.addEventListener("click", manCancelar);
    }
}

function EditarHandleGasto()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
        let actual = e.currentTarget;

        let nDesc = actual.elements.descripcion.value;
        let nValor = actual.elements.valor.value;
        let nFecha = actual.elements.fecha.value;
        let nEtiquetas = actual.elements.etiquetas.value;

        nValor = parseFloat(nValor);
        //nEtiquetas.split(",");

        //actualizamos los nuevos valores
        this.gasto.actualizarDescripcion(nDesc);
        this.gasto.actualizarValor(nValor);
        this.gasto.actualizarFecha(nFecha);
        this.gasto.anyadirEtiquetas(...nEtiquetas);

        repintar();
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------//

document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);


async function cargarGastosApi()
{
    let usuario = document.getElementById("nombre_usuario").value; //Usuario del textbox

    let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + usuario; //URL del usuario introducido

    try
    {
        let datos = await fetch(url);

        if(datos.ok) //Si todo esta correcto
        {
            let json = await datos.json(); //obtenemos los gastos
            gesPres.cargarGastos(json); //llamamos a la funcion para actualizar los gastos

            repintar();
        }
        else
        {
            alert("Error-HTTP: " + datos.status);
        }
    }
    catch(e)
    {
        console.log(e);
    }
}

function BorrarApiHandle()
{
    this.handleEvent = async function(e)
    {
        let usuario = document.getElementById("nombre_usuario").value; //Usuario del textbox

        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`; //URL del usuario introducido + id gasto

        fetch(url, {method: "DELETE"}) //metodo delete
        .then(Response => {
                if(Response)
                {
                    cargarGastosApi();
                }
            })
    }
}

function enviarGastoApiHandle(e)
{
    let usuario = document.getElementById("nombre_usuario").value; //Usuario del textbox

    let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + usuario; //URL del usuario introducido

    let actual = e.currentTarget.form; //nos situamos en el formulario actual

    //contenido de la peticion del formulario
    let descripcion = actual.elements.descripcion.value;
    let valor = actual.elements.valor.value;
    let fecha = actual.elements.fecha.value;
    let etiquetas = actual.elements.etiquetas.value;
    let listaetiquetas = etiquetas.split(",");

    valor = parseFloat(valor);

    //creamos el nuevo gasto
    let gastoAPI = new gesPres.CrearGasto(descripcion, valor, fecha, ...listaetiquetas);
        
    //Peticion POST
     fetch( url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(gastoAPI)
        })
    .then(Response => {
        if(Response)
        {
            cargarGastosApi();
        }
        else
        {
            alert("Error");
        }
    })
}

function editarGastoApiHandle(e)
{
    let usuario = document.getElementById("nombre_usuario").value; //Usuario del textbox

    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`; //URL del usuario introducido + id gasto

    let actual = e.currentTarget.form;

    let descN = actual.elements.descripcion.value;
    let valorN = actual.elements.valor.value;
    let fechaN = actual.elements.fecha.value;
    let etiquetasN = actual.elements.etiquetas.value;
    let etiquetas = etiquetasN.split(",");

    valorN = parseFloat(valorN);

    let gastoNApi = new gesPres.CrearGasto(descN, valorN, fechaN, ...etiquetas);

    //Peticion PUT
    fetch( url, {
            method: "PUT",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(gastoNApi)
        })
    .then(Response => {
        if(Response)
        {
            cargarGastosApi();
        }
    })
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}