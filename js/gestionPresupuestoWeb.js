import * as gesPres from "./gestionPresupuesto.js";

//variable global
let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest`;

function mostrarDatoEnId(idElemento, valor)
{   
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";   
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas";

    div1.append(gasto.descripcion);
    div2.append(gasto.fecha);
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${etiqueta},`);
        div4.append(span);
        
        let manejadorBorrarEtiq =  new BorrarEtiquetasHandle();

        manejadorBorrarEtiq.gasto = gasto;

        manejadorBorrarEtiq.etiqueta = etiqueta;

        span.addEventListener("click", manejadorBorrarEtiq);
    }   

    let contenido = document.getElementById(idElemento);
    
    contenido.append(div);  

    let butEdit = document.createElement("button");
    butEdit.className = "gasto-editar";
    butEdit.type = "button";
    butEdit.innerHTML = "Editar";

    let manejadorEdit = new EditarHandle();
    
    manejadorEdit.gasto = gasto;

    butEdit.addEventListener("click", manejadorEdit);
    div.append(butEdit);

    let butBorrar = document.createElement("button");
    butBorrar.className = "gasto-borrar";
    butBorrar.type = "button";
    butBorrar.innerHTML = "Borrar";

    let manejadorBorrar = new BorrarHandle();

    manejadorBorrar.gasto = gasto;

    butBorrar.addEventListener("click", manejadorBorrar);

    div.append(butBorrar);

    /*
    Modificación de la función mostrarGastoWeb
    Añade un segundo botón de borrado a la estructura HTML de cada gasto.
    La estructura HTML final que debe quedar para cada gasto es la siguiente:
    <!-- Este botón tendrá un manejador de eventos -->
    <button class="gasto-borrar-api" type="button">Borrar (API)</button>
    Este botón se utilizará para borrar el gasto seleccionado a través de la API de servidor.
    */
    let butBorrarApi = document.createElement("button");
    butBorrarApi.className = "gasto-borrar-api";
    butBorrarApi.type = "button";
    butBorrarApi.innerHTML = "Borrar (API)";

    let manejadorBorrarApi = new BorrarApiHandle();
    manejadorBorrarApi.gasto = gasto;
    butBorrarApi.addEventListener("click", manejadorBorrarApi);

    div.append(butBorrarApi);

    let butEditForm = document.createElement("button");
    butEditForm.className = "gasto-editar-formulario";
    butEditForm.type = "button";
    butEditForm.innerHTML = "Editar (formulario)";

    let manejadorEditarForm = new EditarHandleFormulario();
    manejadorEditarForm.gasto = gasto;
    butEditForm.addEventListener("click", manejadorEditarForm);  

    div.append(butEditForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;
 
    div.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        span.append("Clave: " + clave);
        span1.append(" Valor: " + valor);
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    let contenido = document.getElementById(idElemento);

    contenido.append(div);
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let gastos = gesPres.listarGastos();

    for (let g of gastos) {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuestoActualizado = prompt("Introduce un nuevo presupuesto");

    presupuestoActualizado = parseFloat(presupuestoActualizado);

    gesPres.actualizarPresupuesto(presupuestoActualizado);

    repintar(); 
}

let butActualizar = document.getElementById("actualizarpresupuesto");
butActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcionGastoNuevo = prompt("Introduce la descripción");
    let valorGastoNuevo = prompt("Introduce el gasto");
    let fechaGastoNuevo = prompt("Introduce la fecha");
    let etiquetasGastoNuevo = prompt("Introduce la etiqueta");

    valorGastoNuevo = parseFloat(valorGastoNuevo);

    let etiquetasSeparadasSplit = etiquetasGastoNuevo.split(',');

    let gastoNuevo = new gesPres.CrearGasto(descripcionGastoNuevo, valorGastoNuevo, fechaGastoNuevo, etiquetasSeparadasSplit);

    gesPres.anyadirGasto(gastoNuevo);

    repintar();
}

let butAnyadirGasto = document.getElementById("anyadirgasto");
butAnyadirGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function(e)
    {
        let desc = prompt("Por favor, introduce la descripción");
        let valor = prompt("Por favor, introduce el gasto");
        let fecha = prompt("Por favor, introduce la fecha");
        let etiqueta = prompt("Por favor, introduce la etiqueta");

        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSeparadasSplit);

        repintar();
    }
}

function BorrarHandle() 
{
    this.handleEvent = function (e) 
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (e)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;

    var formulario = plantillaFormulario.querySelector("form");

    let manEnvio1 = new manejadorEnvioForm();
    formulario.addEventListener("submit", manEnvio1);

    let manBorrar1 = new manejadorCancelForm();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manBorrar1);

    document.getElementById("anyadirgasto-formulario").disabled = true;

    document.getElementById("controlesprincipales").append(formulario);
}

let butNuevoGastoForm = document.getElementById("anyadirgasto-formulario");
butNuevoGastoForm.addEventListener("click", nuevoGastoWebFormulario);

function manejadorEnvioForm()
{
    this.handleEvent = function (e) 
    {
        e.preventDefault();

        let form = e.currentTarget;

        let desc = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiqueta = form.elements.etiquetas.value;

        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        let gastoNuevo = new gesPres.CrearGasto(desc, valor, fecha, etiquetasSeparadasSplit);

        gesPres.anyadirGasto(gastoNuevo);

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function manejadorCancelForm()
{
    this.handleEvent = function (e)
    {
        e.target.form.remove();  
        document.getElementById("anyadirgasto-formulario").disabled = "";

        repintar();   
    }
}

function EditarHandleFormulario()
{
    this.handleEvent = function (e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;

        var formulario = plantillaFormulario.querySelector("form");
        
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        let form = e.currentTarget;
        form.disabled = true;
        e.currentTarget.after(formulario);

        let gastoForm = new EditarHandleCopiaForm();
        gastoForm.gasto = this.gasto;

        formulario.addEventListener("submit", gastoForm);

        let manBorrar1 = new manejadorCancelForm();
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manBorrar1);
    }
}

function EditarHandleCopiaForm() 
{
    this.handleEvent = function (e) 
    {
        e.preventDefault();
        let form = e.currentTarget;

        let desc = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiqueta = form.elements.etiquetas.value;

        valor = parseFloat(valor);

        let etiquetasSeparadasSplit = etiqueta.split(',');

        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetasSeparadasSplit);

        repintar();
    }
}

function filtrarGastoWeb() 
{
    this.handleEvent = function(e)
    {
        e.preventDefault();

        let plantillaFormulario = document.getElementById("filtrar-gastos");
        var formulario = plantillaFormulario.querySelector("form");

        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;  
        let descripcionContiene = formulario.elements["formulario-filtrado-descripcion"].value;    
        let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if (etiquetasTiene != "")
        {
            etiquetasTiene = gesPres.transformarListadoEtiquetas(etiquetasTiene);
        }

        let opciones = ({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene});

        document.getElementById("listado-gastos-completo").innerHTML = "";

        let gastosFiltrados = gesPres.filtrarGastos(opciones);

        for (let g of gastosFiltrados)
        {   
            mostrarGastoWeb("listado-gastos-completo", g);
        }
    }   
}

let manejadorFiltrado = new filtrarGastoWeb();
let butFiltrado = document.getElementById("formulario-filtrado");
butFiltrado.addEventListener("submit", manejadorFiltrado);

function guardarGastosWeb()
{
    this.handleEvent = function(e)
    {
        localStorage.GestorGastosDWEC = JSON.stringify(gesPres.listarGastos());
    }
}

let manejadorGuardar = new guardarGastosWeb();
let butGuardar = document.getElementById("guardar-gastos");
butGuardar.addEventListener("click", manejadorGuardar);

function cargarGastoWeb()
{
    this.handleEvent = function(e)
    {

        let cargarListado = localStorage.getItem("GestorGastosDWEC");
        cargarListado = JSON.parse(cargarListado);

        if(cargarListado)
        {
            gesPres.cargarGastos(cargarListado);
        }
        else
        {
            gesPres.cargarGastos([]);
        }

        repintar();
    }
}

let manejadorCargar = new cargarGastoWeb();
let butCargar = document.getElementById("cargar-gastos");
butCargar.addEventListener("click", manejadorCargar);

/*
Tutoria 13 de diciembre
informacion relevante

let url ="https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/pedroprieto/";

fetch (url)
    .then(function(response) {
        return response.json();
    })
    .then(function(dataJson) {
        console.log(`Nombre de usuario: ${dataJson[0].usuario}`);
        console.log(`Descripción: ${dataJson[0].descripcion}`);
    })
    .catch(function(error) {
        console.log("Ha habido un error");
    });

---

let response = await fetch(url);
let datos = await response.json();

async function programa() {
    try{
        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/pedroprieto/";
        let response = await fetch (url);
        if (response.ok {
            let datos = await response.json();
            console.log(datos[0].usuario);
        } else {
            alert("Error-HTTP: " + response.status);
        }
    } catch (error) {
        alert("Error-HTTP: " + response.status);
        }
    }

    programa();
}
*/

/*
tutoria 20 diciembre
    fetch('flores.jpg').then(function(response) {
  if(response.ok) {
    response.blob().then(function(miBlob) {
      var objectURL = URL.createObjectURL(miBlob);
      miImagen.src = objectURL;
    });
  } else {
    console.log('Respuesta de red OK pero respuesta HTTP no OK');
  }
})
.catch(function(error) {
  console.log('Hubo un problema con la petición Fetch:' + error.message);
});

---

fetch (".../latest/pedroprieto").then(function(response)
{
    return response.json();
}).then(function(data)
{
    //return data;
    //trabajar con data
}).catch(function(error)
{
    //Aquí si que procesas el error!!!
});

//Mientras tanto, otras cosas...
//El codigo que venga aqui se ejecuta antes de que termine fetch.
//Aqui datos no existe!!


---
LAS DOS FORMAS DE TRABAJAR (sin duda Betis y sin duda Barça jeje)
async function cargarDatos(){
    try{
        var datos = await fetch ("...latest/pedroprieto").then(function(response)
        {
            return response.json();
        }).then(function(data)
        {
            return data;
        });
    }

    // NO se ejecuta hasta que termine fetch y json()

    // trabajar con datos
} catch (error)
{
    //Si que captura el error!!!
}

Promise.all([
    fetch("url2"),
    fetch("url1")
]).then(function(arrayRespuestas){
    //Aqui han terminado las 2 promesas
})

tutoria 10 de enero
Utilizar una variable global URL para no tener que ir copiando todo el "troncho" de enlace que se repite.
*/

//Nueva función cargarGastosApi
function cargarGastosApi() 
{
    //Se encargará de obtener mediante fetch el listado de gastos a través de la API de servidor. Para ello tendrá que hacer una solicitud GET 
    //a la URL correspondiente de la API. Se deberá crear la URL correspondiente utilizando el nombre de usuario que se haya introducido 
    //en el control input#nombre_usuario. 
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    //Podemos sustituir todo el enlace por la suma del enlace "generico" y el nombre de usuario que deseemos.
    //let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
    let urlcargar = `${url}/${nombreUsuario}`;

    /*Info manual
    fetch(url, options)
    .then(response => response.json())
    .then(result => procesa resultado )*/

    //fetch(url, {method: "GET",})
    //Si no especificamos ningún options, se ejecutará una simple petición GET, la cual descargará el contenido de lo especificado en el url.
    fetch(urlcargar)
        .then(response => response.json())
        .then(result => {
            //Una vez obtenida la lista de gastos de la API deberá llamar a la función cargarGastos del 
            //paquete js/gestionPresupuesto.js para actualizar el array de gastos.
            gesPres.cargarGastos(result)

            //Por último, una vez cargados los gastos deberá llamar a la función repintar para que se muestren correctamente en el HTML.
            repintar();
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });

}

//Esta función se utilizará como manejadora de eventos del evento click del botón cargar-gastos-api.
let butCargarGastosApi = document.getElementById("cargar-gastos-api");
butCargarGastosApi.addEventListener("click", cargarGastosApi);


//Este botón se utilizará para borrar el gasto seleccionado a través de la API de servidor.
//Añade un objeto manejador de eventos necesario para gestionar el evento click de los botones .gasto-borrar-api. Lo hacemos en mostrarGastoWeb como el que tenemos
//de editar.
function BorrarApiHandle() 
{
    this.handleEvent = function (e) 
    {
        //Se deberá crear la URL correspondiente utilizando el nombre de usuario que se haya introducido en el control input#nombre_usuario y el id del gasto actual.
        let nombreUsuario = document.getElementById("nombre_usuario").value;
        //DELETE /{USUARIO}/{GASTOID} - La API borrará el gasto indicado en GASTOID.
        //ejemplo de "gastoId": "533f038b-b0ea-4253-a159-2452648b8a2e", estamos cogiendo este gasto y no el idGasto del local.
        //let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoID}`;
        let urlBorrar = `${url}/${nombreUsuario}/${this.gasto.gastoId}`;

        //Se encargará de realizar mediante fetch una solicitud DELETE a la URL correspondiente de la API. 
        fetch(urlBorrar, {
            method: "DELETE",
        })
            /* Guia videotutorial
            if (response.ok {
                let datos = await response.json();
                console.log(datos[0].usuario);
            } else {
                alert("Error-HTTP: " + response.status);
            }
            } catch (error) {
            alert("Error-HTTP: " + response.status);
            }
            */
            .then(function (response) {
                if (response.ok) {
                    //Una vez completada la petición, se deberá llamar a la función cargarGastosApi para actualizar la lista en la página.
                    (cargarGastosApi())
                } else {
                    //Si solo dejamos /${this.gastoId}` en la url, nos dará este error y mostrará 401
                    alert("Error-HTTP: " + response.status);
                }
            })
            .catch(function (error) {
                alert("Error-HTTP: " + response.status);
            });
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}