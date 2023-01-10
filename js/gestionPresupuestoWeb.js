//Importar librería js/gestionPresupuesto.js
import * as gestPresupuesto from "./gestionPresupuesto.js";
import * as gestEstatico from "./generarDatosEstaticos.js";

//Funciones

function mostrarDatoEnId (idElemento, valor) {

    let datosId = document.getElementById(idElemento);
    datosId.innerText = valor;
  
}

function mostrarGastoWeb (idElemento, gasto) {

    // div gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //div descripcion.
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;
    //div fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    let fechaString = new Date(gasto.fecha);
    divFecha.innerText = fechaString.toLocaleDateString();
    //div valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    //Div etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = eti;
        //Eventos para los span de etiquetas 
        //Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
        let objetoEtiqueta = new BorrarEtiquetasHandle();
        //Establecer la propiedad gasto del objeto creado
        objetoEtiqueta.gasto = gasto;
        //Establecer la propiedad etiqueta del objeto creado
        objetoEtiqueta.etiqueta = eti;
        //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
        spanEti.addEventListener('click', objetoEtiqueta);
        divEtiquetas.append(spanEti);
    }
    
    //componer el objeto+
    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);

    //Añadir gasto al div
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divGasto);
    //modificar la función mostrarGastoWeb Crear un botón con texto Editar de tipo
    let botonEditar = document.createElement("button");
    //clase gasto-editar.
    botonEditar.className = "gasto-editar";
    //de tipo button
    botonEditar.type = "button";
    //con texto Editar
    botonEditar.innerHTML ="Editar";
    //Crear un nuevo objeto a partir de la función constructora EditarHandle.
    let objetoEditar = new EditarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto
    objetoEditar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
    botonEditar.addEventListener("click", objetoEditar);
    //Añadir el botón al DOM a continuación de las etiquetas
    divGasto.append(botonEditar);
    //Botón borrar: 
    let botonBorrar = document.createElement("button");
    //con clase gasto-borrar.
    botonBorrar.className="gasto-borrar";
    //de tipo button (<button type="button">)
    botonBorrar.type = "button";
    // botón con texto Borrar 
    botonBorrar.innerText = "Borrar";
    //Crear un nuevo objeto a partir de la función constructora BorrarHandle.
    let objetoBorrar = new BorrarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto gasto
    objetoBorrar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Borrar recién creado.
    botonBorrar.addEventListener("click", objetoBorrar);
    //Añadir el botón al DOM a continuación del botón Editar.
    divGasto.append(botonBorrar);
    //Boton API
    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.className = "gasto-borrar-api";
    botonBorrarApi.type = "button";
    botonBorrarApi.innerHTML = "Borrar (API)";
    //Manejador
    let manejadorBotonBorrarApi = new BorrarApiHandle();
    manejadorBotonBorrarApi.gasto = gasto;
    botonBorrarApi.addEventListener("click", manejadorBotonBorrarApi);
    divGasto.append(botonBorrarApi);
     //botón editar formulario
     let botonEditarFormulario = document.createElement('button');
     botonEditarFormulario.className = 'gasto-editar-formulario';
     botonEditarFormulario.type = 'button';
     botonEditarFormulario.innerHTML = "Editar (Formulario)";
     let editarFormulario = new editarHandleFormulario();
     editarFormulario.gasto = gasto;
     botonEditarFormulario.addEventListener('click', editarFormulario);
     divGasto.append(botonEditarFormulario);

}

function mostrarGastosAgrupadosWeb ( IdElemento, agrup, periodo) {
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
        // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
        // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
        var divP = document.getElementById(IdElemento);
        // Borrar el contenido de la capa para que no se duplique el contenido al repintar
        divP.innerHTML = "";
    //div agrupacion 
    let divAgrupar = document.createElement("div");
    
    divAgrupar.className = "agrupacion";
    //crear texto h1
    let h1Periodo = document.createElement("h1");
    h1Periodo.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupar.append(h1Periodo);
    let agrupDatos = Object.entries(agrup);
    agrupDatos.map( (movimiento) => {
        let divAgrpGasto = document.createElement("div");
        divAgrpGasto.className ="agrupacion-dato";
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.append(movimiento[0]);
            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.append(movimiento[1]);
        divAgrpGasto.append(spanClave, spanValor);
        divAgrupar.append(divAgrpGasto);
        })
        
    let agrupacionPeriodo = document.getElementById(IdElemento);
    agrupacionPeriodo.append(divAgrupar);
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

//Crear una función repintar para actualizar la página
function repintar (){

    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId('presupuesto', gestPresupuesto.mostrarPresupuesto());
    
    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId('gastos-totales',gestPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId('balance-total', gestPresupuesto.calcularBalance());
    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById('listado-gastos-completo').innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let gastos of gestPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gastos);
    }
    
    //Prueba de limpieza de filtrado
    document.getElementById('listado-gastos-filtrado-1').innerHTML="";
    document.getElementById('listado-gastos-filtrado-2').innerHTML="";
    document.getElementById('listado-gastos-filtrado-3').innerHTML="";
    document.getElementById('listado-gastos-filtrado-4').innerHTML="";
    gestEstatico.filtradoEspecial();
    document.getElementById('agrupacion-dia').innerHTML = "";
    document.getElementById('agrupacion-mes').innerHTML = "";
    document.getElementById('agrupacion-anyo').innerHTML = "";
    //Esto no se si es lo que ya hice 
    //Modificar función repintar
    mostrarGastosAgrupadosWeb("agrupacion-dia", gestPresupuesto.agruparGastos("dia"), "Día");
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestPresupuesto.agruparGastos("mes"), "Mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestPresupuesto.agruparGastos("anyo"), "Año");
}
//Función actualizarPresupuestoWeb
function actualizarPresupuestoWeb () {
    //Pedir al usuario que introduzca un presupuesto mediante un prompt.
    let nuevoPresupuesto = Number(prompt("¿Cuál es tu nuevo presupuesto ?:"));
    //Actualicar el presupuesto (función actualizarPresupuesto)
    gestPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    //Llamar a la función repintar para que se muestre la información actualizada
    repintar();
}
//manejadora del evento click del botón actualizarpresupuesto mediante addEventListener
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);

//Función nuevoGastoWeb
function nuevoGastoWeb () {
    //Pedir al usuario la información necesaria para crear un nuevo gasto
    let descripcion = prompt("Descripcion del gasto: ");
    let valorGasto = Number (prompt("Valor del Gasto :"));
    let fechaGasto = prompt ("Fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt ("Introduzca etiquetas separadas por comas :").split(",");
    let nuevoGasto = new gestPresupuesto.CrearGasto(descripcion, valorGasto, fechaGasto, ...etiquetas);
    gestPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
//Una vez definida la función, se añadirá como manejadora del evento click
    document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);

//La función EditarHandle
function EditarHandle () {
    
    this.handleEvent = function(event){
        //Pedir al usuario la información necesaria para editar el gasto
        let descripcion = prompt("Descripción del gasto :");
        let valorGasto = Number (prompt("Valor del Gasto :"));
        let fechaGasto = prompt ("Fecha del gasto en formato yyyy-mm-dd");
        let etiquetas = prompt ("Introduzca etiquetas separadas por comas :");// modifico array
        let arrayEti = etiquetas.split(',');
        //Actualizar las propiedades del gasto
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valorGasto);
        this.gasto.actualizarFecha(fechaGasto);
        this.gasto.anyadirEtiquetas(...arrayEti);
        //Llamar a la función repintar
        repintar();
    }
}
    //Función BorrarHandle
    function BorrarHandle () {
        this.handleEvent = function (event) {
            //Borrar el gasto asociado
            gestPresupuesto.borrarGasto(this.gasto.id);
            //Llamar a la función repintar
            repintar();
        }

    }
    //Función BorrarEtiquetasHandle
    function BorrarEtiquetasHandle () {
        this.handleEvent = function (event) {
            //Borrar la etiqueta seleccionada del gasto asociado. 
            this.gasto.borrarEtiquetas(this.etiqueta);
            //Llamar a la función repintar
            repintar();

        }
    }
    //Funcion Api manejadora
    function BorrarApiHandle () {
        this.handleEvent = function (evento) 
    {
        let nombreUsuario = document.getElementById("nombre_usuario").value;
        console.log(nombreUsuario);
        let gastoBorrar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

        if (nombreUsuario != "")
        {
            fetch(gastoBorrar, {
                method: "DELETE",
                })
            .then(function (response) {
                if (response.ok) {
                    (cargarGastosApi())
                } else {
                    alert("Error-HTTP: " + response.status);
                }
            })
            .catch(function(error) {
                alert("Revisa los camopos introducidos para subsanar el error linea 323" + error.message); 
            });  
        }
        else
        {
            alert("Es obligatorio el nombre de usuario");
        }
        
    }
}

function cargarGastosApi() 
{
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    
    console.log(nombreUsuario);
    let cargarGastos = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

    if(nombreUsuario != "")
    {
    fetch(cargarGastos)
        .then(response => response.json())
        .then(result => {
            gestPresupuesto.cargarGastos(result);
            repintar();
        })
        .catch(function(error) {
            alert("Revisa los campos introducidos para subsanar el error linea 350 " + error.message); 
        });   
    }
    else
    {
        alert("Es obligatorio el nombre de usuario");
    }
    
}
let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);
    ///Formularios
    function nuevoGastoWebFormulario (event) {
        //Crear una copia del formulario web definido en la plantilla 
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        //Acceder al elemento <form> dentro de ese fragmento de documento
        var formulario = plantillaFormulario.querySelector("form");
        //evento submit en botón submit
        formulario.addEventListener('submit', submitFormulario);
        //desactivado al activar el formulario el boton añadir
        event.target.disabled = true;
        //Crear un manejador de evento para el evento click del botón Cancelar
        var botonCancelar = plantillaFormulario.querySelector("button.cancelar");
        //definir una función constructora que implemente handleEvent
        botonCancelar.addEventListener("click", cerrarFormulario);
        //Boton Api
        let botonEnviarApi = plantillaFormulario.querySelector("button.gasto-enviar-api");
        botonEnviarApi.addEventListener("click", enviarApiFormulario);
        //añadir el fragmento de documento
        let controles = document.getElementById("controlesprincipales");
        controles.append(plantillaFormulario);
    }
    let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
    botonAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

    //Deberás crear una función manejadora de este evento submitFormulario
    function submitFormulario (event) {
         //Prevenir el envío del formulario
         event.preventDefault();
         //Separamos el arrqy etiquetas
         let etiqueta = event.target.etiquetas.value;//Modifico Array
         let arrayEti = etiqueta.split(',');
         //Pasar valor
         let valorNumerico = event.target.valor.value;
         valorNumerico = parseFloat(valorNumerico);
          //creamos el gasto del los campos recojidos.
         let nuevoGastoFormulario = new gestPresupuesto.CrearGasto(event.target.descripcion.value, valorNumerico, event.target.fecha.value, ...arrayEti );
         //Añadir el gasto a la lista de gastos.
         gestPresupuesto.anyadirGasto(nuevoGastoFormulario);
         //Activar (eliminar atributo disabled) el botón anyadirgasto-formulario
         let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
         botonAnyadirFormulario.addEventListener('click', nuevoGastoWebFormulario);
         botonAnyadirFormulario.disabled = false;
          //Quitar formulario 
          event.target.remove();
          //Llamar a la función repintar.
          repintar();
    }
    //Crear un manejador de evento para el evento click del botón Cancelar
    function editarHandleFormulario () {
        this.handleEvent = function(event){ 
            //Crear una copia del formulario web definido en la plantilla 
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            //Acceder al elemento <form> dentro de ese fragmento de documento
            var formulario = plantillaFormulario.querySelector("form");
            //Mostrar los valores del gasto del formulario
            formulario.elements.descripcion.value = this.gasto.descripcion;
            formulario.elements.valor.value = this.gasto.valor;
            formulario.elements.fecha.value = this.gasto.fecha;
            formulario.elements.etiquetas.value = this.gasto.etiquetas;
            //añadir el formulario al final del botón editar
            event.currentTarget.after(formulario);
            //anular boton 
            let botonEditarFormulario = event.currentTarget;
            botonEditarFormulario.disabled = true;
             //botón submit
            let botonSubmitFormulario = new manejadorSubmitEditarFormulario();
            botonSubmitFormulario.gasto = this.gasto;
            formulario.addEventListener('submit', botonSubmitFormulario);
             //botón cancelar
            let botonCancelarFormulario = formulario.querySelector("button.cancelar");
            let cancelarFormulario = new manejadorBotonCancelarFormulario();
            cancelarFormulario.botonEditar = event.currentTarget; // Pasas una referencia al botón de editar
            cancelarFormulario.className = "button.cancelar"
            botonCancelarFormulario.addEventListener('click', cancelarFormulario);
            //Boton API
            let botonEditarApi = new EditarApiFormulario();
            botonEditarApi.gasto = this.gasto;
            let EditarApi = formulario.querySelector("button.gasto-enviar-api");
            EditarApi.addEventListener("click", botonEditarApi);
        }

    }
    //manejador boton borrar formulario
    function manejadorBotonCancelarFormulario() {
        this.handleEvent = function(event) {
            event.currentTarget.parentNode.remove(); 
            this.botonEditar.disabled = false; //Referencia que viene de la linea 286
        }
    }
    function manejadorSubmitEditarFormulario() {
        this.handleEvent = function(event) {
            //prevenir funcion por defecto
            event.preventDefault();
            //Limpiar el array de etiquetas
            this.gasto.etiquetas = [];
            
            let formulario = event.currentTarget;
            let descripcion = formulario.elements.descripcion.value;
            let valor = formulario.elements.valor.value;
            let fecha =  formulario.elements.fecha.value;
            let etiquetas = formulario.elements.etiquetas.value; //separar array
            let sepEtiquetas = etiquetas.split(',');
            //Actualizar los datos
            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.actualizarValor(parseFloat(valor));
            this.gasto.actualizarFecha(fecha);
            this.gasto.anyadirEtiquetas(...sepEtiquetas);
            
            repintar();
        }
    }
    function cerrarFormulario (event) {
            //cerrar formulario 
        var botonCancelar = event.currentTarget;
        botonCancelar.disabled = true;
        let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
        botonAnyadirFormulario.disabled = false;
        event.currentTarget.parentNode.remove();
    }
    //Filtrado formulario
    //Esta función se utilizará como manejadora de eventos del formulario
    function filtrarGastosWeb () {
        this.handleEvent = function(event) {
            //Prevenir el envío del formulario
            event.preventDefault();
            //Recoger los datos del formulario formulario-filtrado
            let formularioFiltrado = event.currentTarget;
                let descripcion = formularioFiltrado.elements['formulario-filtrado-descripcion'].value;
                let valorMinimo = formularioFiltrado.elements['formulario-filtrado-valor-minimo'].value;
                let valorMaximo = formularioFiltrado.elements['formulario-filtrado-valor-maximo'].value;
                let fechaDesde = formularioFiltrado.elements['formulario-filtrado-fecha-desde'].value;
                let fechaHasta = formularioFiltrado.elements['formulario-filtrado-fecha-hasta'].value;
                let etiquetas = formularioFiltrado.elements['formulario-filtrado-etiquetas-tiene'].value;
            //Valores para los strings pasarlos a numeros
            valorMinimo = parseFloat(valorMinimo);
            valorMaximo = parseFloat(valorMaximo);
            //Si etiquetas tiene datos, llamar a la función transformarListadoEtiquetas 
            if(etiquetas) {
                etiquetas = gestPresupuesto.transformarListadoEtiquetas(etiquetas);
            }
            //llamar a la función filtrarGastos del paquete gestionPresupuesto
            let gastosFiltradosForm = gestPresupuesto.filtrarGastos({fechaDesde: fechaDesde, fechaHasta: fechaHasta, 
                valorMinimo: valorMinimo, valorMaximo: valorMaximo, descripcionContiene: descripcion, etiquetasTiene: etiquetas,}); 
            //Actualizar la lista de gastos filtrados en la capa listado-gastos-completo mediante la función mostrarGastoWeb.
            document.getElementById('listado-gastos-completo').innerHTML = "";
            for (let gastos of gastosFiltradosForm) 
                {
                    mostrarGastoWeb('listado-gastos-completo', gastos);
                }   
        }
        //repintar();     
    }
    //añadirla como manejadora del evento submit del formulario formulario-filtrado.
    let gastosFiltradosForm = new filtrarGastosWeb();
    document.getElementById( "formulario-filtrado" ).addEventListener( "submit", gastosFiltradosForm );
    //Función guardarGastosWeb
    function guardarGastosWeb () {
        //Se encargará de guardar el listado de gastos
        this.handleEvent = function() {
            localStorage.GestorGastosDWEC = JSON.stringify(gestPresupuesto.listarGastos());
         }
    }
    //Dicha funcion se utilizará como manejadora de eventos del evento click del botón guardar-gastos.
    let guardarGastos = new guardarGastosWeb();
    document.getElementById("guardar-gastos").addEventListener("click", guardarGastos);
    //Función cargarGastosWeb
    function cargarGastoWeb () {
        //Se encargará de cargar el listado de gastos (función cargarGastos
        this.handleEvent = function () {
            let cargaGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
            //Si no existe la clave en el almacenamiento, llamará a cargarGastos con un array vacío.
            if(!cargaGastos) {
                gestPresupuesto.cargarGastos([]);
            }
            else {
                gestPresupuesto.cargarGastos(cargaGastos);
            }
            //Una vez cargados los gastos deberá llamar a la función repintar para que se muestren correctamente en el HTML.
            repintar();
        }
    }
    //Esta función se utilizará como manejadora de eventos del evento click del botón cargar-gastos.
    let cargarGastos = new cargarGastoWeb();
    document.getElementById("cargar-gastos").addEventListener("click", cargarGastos);

    //Funcion formulario api
    function enviarApiFormulario () {
        //Cargar formulario
        var formulario = document.querySelector("form");
        //Mostrar los valores del gasto del formulario
        let descripcionApi = formulario.elements.descripcion.value;
        let valorApi = formulario.elements.valor.value;
        let fechaApi = formulario.elements.fecha.value;
        let etiquetasApi = formulario.elements.etiquetas.value;
        valorApi = parseFloat(valorApi);
        let etiquetasApiSeparadas = etiquetasApi.split(',');
        let gastoNuevoApi = {
            descripcion : descripcionApi,
            valor : valorApi,
            fecha : fechaApi,
            etiquetas : etiquetasApiSeparadas,

        };
        let usuario =document.getElementById("nombre_usuario").value;
        console.log(usuario);
        let gastoEnviar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
        if (usuario != "")
        {
            fetch(gastoEnviar, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoNuevoApi)
            })
            .then(function (response) {
                if (response.ok) {
                    (cargarGastosApi())
                    //Quitar formulario 
                    formulario.remove();
                    //Activar boton Añadir gasto
                    let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
                    botonAnyadirFormulario.disabled = false;

                } else {
                    alert("Error-HTTP: " + response.status);
                }
            })
            .catch(function(error) {
                alert("Revisa los camopos introducidos para subsanar el error linea 584 "  + error.message); 
            }); 
        }
        else
        {
            alert("Es obligatorio el nombre de usuario");
        } 

    }

    //Funcion editar formulario api
    function EditarApiFormulario () {
        this.handleEvent = function (evento) 
        {
            var formulario = document.getElementById("plantillaFormulario");
            //Mostrar los valores del gasto del formulario
            console.log(formulario);
            let descripcionApi = formulario.elements.descripcion.value;
            let valorApi = formulario.elements.valor.value;
            let fechaApi = formulario.elements.fecha.value;
            let etiquetasApi = formulario.elements.etiquetas.value;
            valorApi = parseFloat(valorApi);
            let etiquetasApiSeparadas = etiquetasApi.split(',');
            let gastoNuevoApi = {
                descripcion : descripcionApi,
                valor : valorApi,
                fecha : fechaApi,
                etiquetas : etiquetasApiSeparadas,
    
            };
            let usuario =document.getElementById("nombre_usuario").value;
            console.log(usuario);
            let gastoEnviar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
            if (usuario != "")
            {
                fetch(gastoEnviar, {
                method: 'PUT',
                headers: {
                   'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoNuevoApi)
                })
                .then(function (response) {
                if (response.ok) {
                   (cargarGastosApi())
                } else {
                    alert("Error-HTTP: linea 629" + response.status);
                }
                })
                .catch(function(error) {
                    console.log("Revisa los camopos introducidos para subsanar el error linea 633 "  + error.message); 
                });   
            }
            else
            {
                alert("Es obligatorio el nombre de usuario");
            }
        }

    }

// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}