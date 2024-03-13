
//importacion de funciones exportadas
import * as gestorPresupuesto from './gestionPresupuesto.js'


function mostrarDatoEnId(idElemento, valor) {

    //obtengo el elemento HTML por su id
    let elemento = document.getElementById(idElemento);
    //propiedad texto visible dentro del elemento. Reemplazo el contexto de texto actual del elemento con el valor.
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    
    //creo elemento div con la clase gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    //creo elemento div con la clase gasto-descripcion

    let divDesc =  document.createElement("div");
    divDesc.className = "gasto-descripcion";
    //con el innetText asigno el valor de la descripcion del gasto al div
    divDesc.innerText = gasto.descripcion; 

    //creo elemento div con la clase gasto-fecha
    let divfecha = document.createElement("div");
    divfecha.className = "gasto-fecha";
    //con el innetText asigno el valor de fecha al contenido del div
    divfecha.innerText = new Date(gasto.fecha).toLocaleDateString(); //convierte la fecha del objeto date en una cadena de texto, se representa en formato de fecha local 

    //creo div con la clase gasto-valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    //con el innetText le asigno el valor dle gasto al contenido del div
    divValor.innerText = gasto.valor;

    //creo div con la clase "gasto-etiqueta"
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";


    // Itero sobre las etiquetas y crear elementos span para ellas
    for (let etiqueta of gasto.etiquetas) {
      let spanEtiqueta = document.createElement("span");
      spanEtiqueta.className = "gasto-etiquetas-etiqueta";
      spanEtiqueta.innerText = etiqueta;

      
      let borrarEtiquetas =  new BorrarEtiquetasHandle();
      borrarEtiquetas.gasto = gasto;

      borrarEtiquetas.etiqueta = etiqueta;

      spanEtiqueta.addEventListener("click", borrarEtiquetas);

      // Añado el elemento span al div de etiquetas
      divEtiquetas.appendChild(spanEtiqueta);
    }

    //Añado los elementos creados "createElement" al div principal gasto
    divGasto.appendChild(divDesc);
    divGasto.appendChild(divfecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);

  // Obtengo el contenedor por su ID
  let contenedor = document.getElementById(idElemento);
  contenedor.appendChild(divGasto); //añado el div del gasto 


  //Boton editar 

  let botonEditar = document.createElement('button');
  botonEditar.className = 'gasto-editar';
  botonEditar.type = 'button';
  botonEditar.innerText = 'Editar ';

  let editarhand = new EditarHandle()
  editarhand.gasto = gasto;

  botonEditar.addEventListener('click', editarhand);

  divGasto.append(botonEditar);

  // Creo objeto Editar y pongo como manejador del evento click a botonEditar
  let editar = new EditarHandle();
  editar.gasto = gasto;
  botonEditar.addEventListener('click', editar);

  //añado botonEditar al DOM
  divGasto.appendChild(botonEditar);

  //Boton borrar

  let botonBorrar = document.createElement('button');
  botonBorrar.className = 'gasto-borrar';
  botonBorrar.type = 'button';
  botonBorrar.innerText = 'Borrar ';

  // Creo objeto Borrar asignar como manejador del evento click a botonBorrar
  let borrar = new BorrarHandle();
  borrar.gasto = gasto;
  botonBorrar.addEventListener('click', borrar);

    // Añadir el botonBorrar al DOM
  divGasto.appendChild(botonBorrar);


  let botonEditarForm = document.createElement( "button" );
  botonEditarForm.type = "button";
  botonEditarForm.className = "gasto-editar-formulario";
  botonEditarForm.innerHTML = "Editar (formulario)";

  
  let eventEditarForm = new EditarHandleFormulario();

  eventEditarForm.gasto = gasto;

  botonEditarForm.addEventListener( "click", eventEditarForm );

  divGasto.append( botonEditarForm );

  //segundo botón de borrado API

  let buttonBorrarApi = document.createElement("button");
  buttonBorrarApi.className += `gasto-borrar-api`;
  buttonBorrarApi.type = "button";
  buttonBorrarApi.textContent = "Borrar (API)";
/* 
  let eventoBorrarApi = new BorrarGastoApiHandle();
  eventoBorrarApi.gasto = gastos;
  buttonBorrarApi.addEventListener("click",eventoBorrarApi); */

}

function mostrarGastoAgrupadosWeb(idElemento, agrup, periodo) {


  //creo el elemento div para agrup
  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";

  let periodo_texto = "mes";
  if (periodo == "dia") {
    periodo_texto = "día";
  } else if (periodo == "anyo") {
    periodo_texto = "año";
  }

  let h1Periodo = document.createElement("h1");
  h1Periodo.innerText = `Gastos agrupados por ${periodo_texto}`;
  

  //añado elmentos creados al div agrup
  divAgrupacion.appendChild(h1Periodo);
  
  //recorro las (clave)propiedades del objeto agrup
  for (let clave in agrup) {
    //creo un div para cada propiedad
    let divDato = document.createElement("div");
    divDato.className = "agrupacion-dato";
    divAgrupacion.appendChild(divDato); //agrupacion-dato es el hijo de divAgrupacion(padre)

    //creo un span agrupacion-dato clave
    let spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.innerText = clave; //lo relleno con la clave
    divDato.appendChild(spanClave); //añado los spans al div datos

    //creo un span para agrupacion-dato-valor
    let spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.innerText = agrup[clave]; //ya que un objeto almacena relaciones (clave-valor)
    divDato.appendChild(spanValor);

  }

  //busco el elemento idElemento y me lo devuelve 
  let element = document.getElementById(idElemento);
  element.appendChild(divAgrupacion); 
}

function repintar(){

  let mostrarPresupuesto = gestorPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", mostrarPresupuesto);

  let gastoTotal = gestorPresupuesto.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastoTotal);

  let balanceTotal = gestorPresupuesto.calcularBalance();
  mostrarDatoEnId("balance-total", balanceTotal);

  //se borra el contenido de div litado-gastos-completo
  let divListadoGastosCompleto = document.getElementById("listado-gastos-completo");
  divListadoGastosCompleto.innerHTML = " ";

  let listarGasto = gestorPresupuesto.listarGastos();

  //muestro el listado de gastos completo
  for(let gasto of listarGasto){

      mostrarGastoWeb("listado-gastos-completo", gasto);

  }
}

  function actualizarPresupuestoWeb() {
    
    let promptPresupuestoStr = prompt("Introduzca el nuevo presupuesto");
    promptPresupuestoStr = parseFloat(promptPresupuestoStr); //convierto el valor a num
    let nuevoPresupuesto = promptPresupuestoStr;
    gestorPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar() //llamo a la funcion repintar para mostrar la info actualizada
  }

  // botón actualizarpresupuesto
  document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {

  //pido informacion al usuario 
  let promptDescripcion = prompt("Introduzca la descripcion del gasto: ");
  let promptValorStr = prompt("Introduzca el valor del gasto: ");
  let promptFecha = prompt("Introduzca la fecha del gasto:");
  let promptEtiquetasStr = prompt("Introduzca las etiquetas del gasto:");
  //convierto el valor a numero
  promptValorStr = parseFloat(promptValorStr);
  //convierto el string de etiquetas a un array
  let etiquetas = [];

  if (!promptEtiquetasStr == null) {
    etiquetas =  promptEtiquetasStr.split(',');
  }
  
  //creo un nuevo gasto
  let gasto = new gestorPresupuesto.CrearGasto(promptDescripcion,promptValorStr,promptFecha,etiquetas);
  gestorPresupuesto.anyadirGasto(gasto);//añado el gasto a la lista

  repintar();//llamo a la funcion repintar
  
}

//botón anyadirgasto
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

//Función EditarHandle constructora

function EditarHandle() {
  
  //metodo handleEvent para manejar el evento
  this.handleEvent = function (e) {

    //pido informacion al usuario 
  let promptDescripcion = prompt("Introduzca la descripcion del gasto: ");
  let promptValorStr = prompt("Introduzca el valor del gasto: ");
  let promptFecha = prompt("Introduzca la fecha del gasto:");
  let promptEtiquetasStr = prompt("Introduzca las etiquetas del gasto:");
  //convierto el valor a numero
  promptValorStr = parseFloat(promptValorStr);
  //convierto el string de etiquetas a un array
  let etiquetas =  promptEtiquetasStr.split(',');

  //actualizo las propiedades del gasto
  this.gasto.actualizarDescripcion(promptDescripcion);
  this.gasto.actualizarValor(promptValorStr);
  this.gasto.actualizarFecha(promptFecha);
  this.gasto.anyadirEtiquetas(etiquetas);

  repintar();

    
  }

}

function BorrarHandle(){
    
  this.handleEvent = function(e){ //handleEvent metodo para manejar el evento de borrado
      console.log(this.gasto.id);
      gestorPresupuesto.borrarGasto(this.gasto.id);//se borra el gasto utilizando la f(x) borrarGasto

      repintar();
 
  }
  
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (e) // handleEvent maneja el event de borrado de etiquetas
    {
        this.gasto.borrarEtiquetas(this.etiqueta); //borra la etiqueta seleccionada del gasto asociado

        repintar();
    }
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
          console.log("El usuario no ha introducido gastos");
      }else{
          gestorPresupuesto.cargarGastos(resultado);
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

function enviarGastoApi(){
  this.handleEvent = function (e) {
    
 
  let usuario = document.getElementById("nombre_usuario").value;
  let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

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


/* let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", guardarGastosWeb); 



let botonCargar = document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", cargarGastosWeb);*/

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);


//FORMULARIOS

// función constructora del manejador de eventos para el submit del formulario
function SubmitEditarHandleForm(){
  //Método handleEvent para manejar el evento submit
  this.handleEvent = function( event ){
    //Se prevee el comportamiento por defecto del formulario (envío a una URL)
    event.preventDefault();

    // Obtener el form desde el evento
    let formulario = event.currentTarget;

    //Obtengo los nuevos valores del form
    let ndescripcion = formulario.elements.descripcion.value;
    let nvalor = formulario.elements.valor.value;
    let nfecha =  formulario.elements.fecha.value;
    let netiquetas = formulario.elements.etiquetas.value;

    nvalor = parseFloat(nvalor); //convierto el nuevo valor a num

    let netiquetasArray = netiquetas.split(','); //convierto cadena de etiquetas en un array

    // Actualizo el gasto con los nuevos valores del form
    this.gasto.actualizarDescripcion(ndescripcion);
    this.gasto.actualizarValor(nvalor);
    this.gasto.actualizarFecha(nfecha);
    this.gasto.anyadirEtiquetas(...netiquetasArray);

    repintar();
  }
}

function EditarHandleFormulario(){
  //método handleEvent para manejar el evento click
  this.handleEvent = function(event){

    //creo copia del formulario 
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);

   //accedo al elemento form dentro del document(html)
    let formulario = plantillaFormulario.querySelector('form');

    
    event.currentTarget.after(formulario); //inserto el form en el boton
    //desactivo el botonEditar 
    let botonEditar = event.currentTarget;
    botonEditar.disabled = true;
      
   //actualizo el gasto con la informacion de los campos del form
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
    formulario.elements.etiquetas.value = this.gasto.etiquetas;

    //Creo un objeto handleEvent para el evento submit del form // (Creo un objeto basado en la función constructora)
    let SubmitEditar = new SubmitEditarHandleForm();

    // Asigno el gasto que se está editando al objeto manejador de eventos
    SubmitEditar.gasto = this.gasto;
    //agrego el handleEvent al form para el event submit
    formulario.addEventListener('submit', SubmitEditar);
     // Obtengo el botón cancelar dentro del form y agrego un handleEvent
     let botonCancelar = formulario.querySelector( "button.cancelar" );
     botonCancelar.addEventListener( "click", function(event) {
          cancelarAnyadirGasto(event, botonEditar) //llamo a la funcion cancelarAnyadirGasto al hacer click en cancelar
      });

  }
}




 //Función nuevoGastoWebFormulario

 function nuevoGastoWebFormulario( event ){
    // Creo una copia del formulario web
    let plantillaFormulario = document.getElementById( "formulario-template" ).content.cloneNode( true );

    // Accedo al elem <form> dentro del fragmento de documento
    var formulario = plantillaFormulario.querySelector( "form" );

    // Creo un handleEvent para el evento submit del formulario
    formulario.addEventListener( "submit", anyadirElementoFormulario );

    //Se añade manejador de click para botón Cancelar
    var botonCancelarForm = plantillaFormulario.querySelector( "button.cancelar" );
    botonCancelarForm.addEventListener( "click",  function(event){
        let anyadirgasto = document.getElementById("anyadirgasto-formulario")
        cancelarAnyadirGasto(event, anyadirgasto)
    })
    //Se deshabilita el botón que inició el evento
   
    if (!event == undefined ) {
      event.currentTarget.disabled = true;
    }
   
    
    //se agrega el formulario al DOM
    let controles = document.getElementById( "controlesprincipales" );
    controles.append( plantillaFormulario );

}

 //Botón anyadirgasto-formulario
 let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
 botonAnyadirForm.addEventListener( "click", nuevoGastoWebFormulario );
 

 function anyadirElementoFormulario( event ){
    
  event.preventDefault();

  let arrayEtiquetas = event.currentTarget.etiquetas.value.split( ", " );
  let valorNumero = parseFloat( event.currentTarget.valor.value );
  let nuevoGastoForm = new gestorPresupuesto.CrearGasto( event.currentTarget.descripcion.value, valorNumero, event.currentTarget.fecha.value, ...arrayEtiquetas );

  gestorPresupuesto.anyadirGasto( nuevoGastoForm );

  repintar();

  let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
  botonAnyadirForm.disabled = false;

  event.currentTarget.remove();
}
 
function cancelarAnyadirGasto(event, botonEditar){
  //almaceno el elemento actual en una variable
  var botonCancelar = event.currentTarget;
  botonCancelar.disabled = true;
  let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
  botonAnyadirFormulario.disabled = false;
  botonEditar.disabled = false;
  event.currentTarget.parentNode.remove()
}

//Función filtrarGastosWeb

function filtrarGastosWeb() 
{
    this.handleEvent = function(e)
    {
        e.preventDefault(); //prevenir el envio de formulario

        //se recogen los datos del formulario

        let plantillaFormulario = document.getElementById("filtrar-gastos");
        var formulario = plantillaFormulario.querySelector("form");

        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let valorMinimo = formulario.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = formulario.elements["formulario-filtrado-valor-maximo"].value;  
        let descripcionContiene = formulario.elements["formulario-filtrado-descripcion"].value;    
        let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        //transformo las etiquetas si existen
        if (etiquetasTiene != "")
        {
            etiquetasTiene = gestorPresupuesto.transformarListadoEtiquetas(etiquetasTiene); //llamo f(x) del objeto gestorPresupuesto para convertir las etiq en formato valido
        }

        let opciones = ({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}); //se crea objeto opciones

        document.getElementById("listado-gastos-completo").innerHTML = ""; //limpio contenido del elemento 

        let gastosFiltrados = gestorPresupuesto.filtrarGastos(opciones);

        for (let g of gastosFiltrados)
        {   
            mostrarGastoWeb("listado-gastos-completo", g);
        }
    }   
}

//añado la f(x) como manejadora del evento submit del form 
let manejadorFiltrado = new filtrarGastosWeb();
let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", manejadorFiltrado);


export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastoAgrupadosWeb,

}


