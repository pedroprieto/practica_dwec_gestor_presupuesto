
import * as gestionPresu from "./gestionPresupuesto.js";


let id;

function repintar(){  //volvemos a rellenar la página con todos los datos nuevos
  mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", gestionPresu.calcularTotalGastos());
  mostrarDatoEnId("balance-total", gestionPresu.calcularBalance());
  let elementTarget = document.getElementById("listado-gastos-completo");
  elementTarget.innerHTML = ``;

  for (let gasto of gestionPresu.listarGastos()){ //Haciamos lo mismo en rellenar datos estaticos, simplemente listar los gastos pero esta vez pudiendo haber más además de los estáticos
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

}

function actualizarPresupuestoWeb(){ //Sencillo, actualizamos el presupuesto (ojalá tan facil en la vida real)
  let presupuesto = prompt("Introduce un nuevo presupuesto", 0);
  gestionPresu.actualizarPresupuesto(presupuesto);
  repintar();
}

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb); //Con esto, añadimos el manejador de eventos al boton de actualizar

function nuevoGastoWeb(){ //Funcion para ir preguntando los datos para un nuevo gasto
  let descripcion = prompt("Introduce una descripción", "factura luz");
  let valor = parseFloat(prompt("Introduce un valor", "0").replace(`,`,`.`));
  let fecha = prompt("Introduce una fecha YYYY-MM-DD", "2023-1-1");
  let etiquetas = prompt("Introduce las etiquetas separadas por comas", "recibos,hogar").split(",");
  let gasto = new gestionPresu.CrearGasto(descripcion, valor, fecha,...etiquetas);

  gestionPresu.anyadirGasto(gasto);
  repintar();
}

let botonAnyadir = document.getElementById("anyadirgasto"); //Igual que con el boton de actualizar, aqui añadimos el manejador de añadir, valga la redundancia...
botonAnyadir.addEventListener("click", nuevoGastoWeb);


botonAnyadir = document.getElementById("anyadirgasto-formulario"); //Ponemos el foco en el nuevo boton de anyadir mediante formulario
botonAnyadir.addEventListener("click", nuevoGastoWebFormulario); //Con esto, utilizamos la funcion nuevoGastoWebFormulario como la manejadora del evento click, en el formulario que hemos señalado

function nuevoGastoWebFormulario(){ //Funcion principal
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  
  let target = document.getElementById("controlesprincipales");
  target.append(plantillaFormulario);


  let botonAnyadir = document.querySelectorAll("#anyadirgasto-formulario");
  botonAnyadir.forEach(function(bot){
    bot.disabled = true;
  })
  
  var formulario = document.body.querySelector("form");

  formulario.addEventListener("submit", new ManejadorEnviarGasto)  

  let botonCancelar = formulario.querySelector("button.cancelar");

  botonCancelar.addEventListener("click", new ManejadorCancelarFormulario(botonAnyadir));

  let botonEnviarApi = document.querySelector(".gasto-enviar-api");

  botonEnviarApi.addEventListener("click", new EnviarGastoApi);

}


function ManejadorEnviarGasto(){
  this.handleEvent = function(e){
    e.preventDefault();


    let gasto = e.currentTarget;

    let descripcion = gasto.elements.descripcion.value;
    let valor = parseFloat(gasto.elements.valor.value);
    let fecha = gasto.elements.fecha.value;
    let etiquetas = gasto.elements.etiquetas.value.split(",");

    let gastoNuevo = new gestionPresu.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gestionPresu.anyadirGasto(gastoNuevo);

    let botonAnyadir = document.getElementById("anyadirgasto-formulario");
    botonAnyadir.removeAttribute("disabled");
    repintar();
  }

}


function ManejadorCancelarFormulario(boton){  //Funcioon manejadora diseñada para el boton de cancelar, encargado de volver a activar todos los botones que le pasemos.

  this.handleEvent = function(){
    let eliminado = document.querySelectorAll("form");

    for (let form of eliminado){
      if (form.getAttribute("id") != "formulario-filtrado"){
        form.remove();
      }
    }
    
    boton.forEach(function(bot){
      bot.removeAttribute("disabled");
    })
  }
  
}



function EditarHandle(){
  this.handleEvent = function(){
    let descripcion = prompt("Introduce una descripción", this.gasto.descripcion);
    let valor = parseFloat(prompt("Introduce un valor", "0").replace(`,`,`.`)); //Esto ha sido un autentico calvario, desde luego la de metodos que puede haber por ahi... no somos nadie
    let fecha = prompt("Introduce una fecha YYYY-MM-DD", this.gasto.fecha);
    let etiquetas = prompt("Introduce las etiquetas separadas por comas", this.gasto.etiquetas.join()).split(",");
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    repintar();
  } 
}

function BorrarHandle(){ //Objeto manejador para borrar
  this.handleEvent = function(){
    gestionPresu.borrarGasto(this.gasto.id);
    repintar();
  }
}

function BorrarEtiquetasHandle(){ //Objeto manejador para borrar etiquetas
  this.handleEvent = function(){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  }
}



function mostrarDatoEnId(idElemento, valor){  //Función sencilla en la a la etiqueta que apuntamos con "targetElement", le insertamos el valor correspondiente en "valor"
  let targetElement = document.getElementById(idElemento);
  targetElement.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){ //Función en la que tambien apuntamos a un target, pero en este caso, creamos un arbol de etiquetas algo más complejo
  
  


  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto");
  targetElement.append(gastoTag);
  

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`); //Creo que seria muy redundante repetir cada paso que damos, mas siendo tan "poco a poco", 
  gastoTag = document.createElement("div");                                  //tan solo comentar la importancia de elegir correctamente los selectores, realmente hay que pensarlo muy bien...
  gastoTag.classList.add("gasto-descripcion");                              //y respecto al procedimiento, el tipico: seleccionar objetivo, crear elemento, añadir clase, texto y append...
  gastoTag.textContent = gasto.descripcion;
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-fecha");
  gastoTag.textContent = new Date(gasto.fecha).toLocaleString("es-ES", {year: "numeric", month: "long", day: "numeric"});
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-valor");
  gastoTag.textContent = gasto.valor;
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-etiquetas");
  targetElement.append(gastoTag);

  targetElement = targetElement.querySelector(".gasto-etiquetas");
  
  
  for (let eti in gasto.etiquetas){
    gastoTag = document.createElement("span");
    gastoTag.classList.add("gasto-etiquetas-etiqueta");
    gastoTag.textContent = gasto.etiquetas[eti];
    let manejadorEtiquetas = new BorrarEtiquetasHandle();  //Tambien muy dificil el conseguir que todas las etiquetas se puedan borrar, por mas que leia el enunciado no entendia...
    manejadorEtiquetas.gasto = gasto;
    manejadorEtiquetas.etiqueta = gastoTag.textContent;
    gastoTag.addEventListener("click", manejadorEtiquetas);
    targetElement.append(gastoTag);
  }

  
  let boton = document.createElement("button");
  boton.setAttribute("type", "button");
  boton.textContent= "Editar";
  boton.classList.add("gasto-editar");
  
  let manejadorEditar = new EditarHandle();
  manejadorEditar.gasto = gasto;
  boton.addEventListener("click", manejadorEditar);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`)  //Quizás todo muy apelotonoado y pudiendo tener mas orden y limpieza, pero entre que soy novato 
  targetElement.append(boton);                                                 //Y que ya se me ha hecho de dia, creo que el resultado esta mejor de lo que me esperaba incluso...

  boton = document.createElement("button");
  boton.setAttribute("type", "button");
  boton.textContent = "Borrar";
  boton.classList.add("gasto-borrar");

  let manejadorBorrar = new BorrarHandle();

  manejadorBorrar.gasto = gasto;
  boton.addEventListener("click", manejadorBorrar);


  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  targetElement.append(boton);

  boton = document.createElement("button");
  boton.setAttribute("type", "button");
  boton.textContent = "Borrar (API)";
  boton.classList.add("gasto-borrar-api");

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  targetElement.append(boton);


  if (gasto.id)
  {
    id = gasto.id;
  }
  else{
    id = gasto.gastoId
  }
  console.log(id);

  boton.addEventListener("click", new BorrarGastoApi(id));

  boton = document.createElement("button");
  boton.setAttribute("type", "button");
  boton.textContent = "Editar (formulario)";
  boton.classList.add("gasto-editar-formulario");

  let manejadorEditarFormulario = new EditarHandleFormulario(id);

  manejadorEditarFormulario.gasto = gasto;
  
  boton.addEventListener("click", manejadorEditarFormulario);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  targetElement.append(boton);
  
}


function formatoFecha(fecha){
  let fechaFormateada;
  let anyo = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();

  fechaFormateada = `${anyo}/${mes}/${dia}`;

  return fechaFormateada;
}

function EditarHandleFormulario(id){ //Manejador del boton editar, con el cual a su vez nos encargamos de añadir los eventos correespondientes al boton cancelar y al submit del formulario generado
  this.handleEvent = function(e){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let target = e.target;
    let formulario = plantillaFormulario.querySelector("form");
    let descripcion = formulario.elements.descripcion;
    let valor = formulario.elements.valor;
    let fecha = formulario.elements.fecha;
    let etiquetas = formulario.elements.etiquetas;
    descripcion.value = this.gasto.descripcion;
    valor.value = this.gasto.valor;
    fecha.value = formatoFecha(new Date(this.gasto.fecha));
    etiquetas.value = this.gasto.etiquetas.join(",");
    target.after(formulario);
    let manejadorSubmit = new SubmitHandleFormulario();
    manejadorSubmit.gasto = this.gasto;
    formulario.addEventListener("submit", manejadorSubmit)
    let boton = document.querySelectorAll(".gasto-editar-formulario");
    boton.forEach(function(bot){
      bot.disabled = true;
    })
    boton = document.querySelector(".cancelar");
    let botonesEditar = document.querySelectorAll(".gasto-editar-formulario");
    let manejadorCancelar = new ManejadorCancelarFormulario(botonesEditar);
    boton.addEventListener("click", manejadorCancelar);
    let botonEditarApi = document.querySelector(".gasto-enviar-api");
    botonEditarApi.addEventListener("click", new SubmitHandleFormularioApi(id))
  }
}

function SubmitHandleFormulario(){ //Manejador del boton submit generado a la hora de editar
  this.handleEvent = function(e){
    console.log("A");
    e.preventDefault();
    this.gasto.descripcion = descripcion.value;
    this.gasto.valor = parseFloat(valor.value);
    this.gasto.fecha = new Date(fecha.value).toLocaleString("es-ES", {year: "numeric", month: "long", day: "numeric"});
    this.gasto.etiquetas = etiquetas.value.split(",");
    repintar();
  }

}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){


  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("agrupacion");
  targetElement.append(gastoTag);

  gastoTag = document.createElement("h1");
  gastoTag.textContent = `Gastos agrupados por ${periodo}`
  targetElement = document.querySelector(`#${idElemento} > .agrupacion:last-child`);
  targetElement.append(gastoTag);
 

    for (let grupo in agrup){
    gastoTag = document.createElement("div");
    gastoTag.classList.add("agrupacion-dato");
    targetElement = document.querySelector(`#${idElemento} > div`);
    targetElement.append(gastoTag);

    gastoTag = document.createElement("span");
    gastoTag.classList.add("agrupacion-dato-clave");
    targetElement = document.querySelector(`#${idElemento} > .agrupacion > div.agrupacion-dato:last-child`);
    gastoTag.textContent = grupo;
    targetElement.append(gastoTag);

    gastoTag = document.createElement("span");
    gastoTag.classList.add("agrupacion-dato-valor");
    targetElement = document.querySelector(`#${idElemento} > .agrupacion > div.agrupacion-dato:last-child`);
    gastoTag.textContent = agrup[grupo];
    targetElement.append(gastoTag);

  } 

}


function FiltrarGastosWeb(){
  this.handleEvent = function(e){
    e.preventDefault();
    let formDescripcion = document.getElementById("formulario-filtrado-descripcion").value;
    let formValorMin = document.getElementById("formulario-filtrado-valor-minimo").value;
    let formValorMax = document.getElementById("formulario-filtrado-valor-maximo").value;
    let formFechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
    let formFechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
    let formEtiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

    if (formEtiquetas != ""){
      formEtiquetas = gestionPresu.transformarListadoEtiquetas(formEtiquetas);
    }


    let objetoFiltro = {"valorMinimo": formValorMin, "valorMaximo": formValorMax, "descripcionContiene": formDescripcion, "etiquetasTiene": formEtiquetas, "fechaDesde": formFechaDesde, "fechaHasta": formFechaHasta};

    console.log(objetoFiltro);
    if (objetoFiltro.valorMinimo == "" && objetoFiltro.valorMaximo == "" && objetoFiltro.descripcionContiene == "" && objetoFiltro.etiquetasTiene == "" && objetoFiltro.fechaDesde == "" && objetoFiltro.fechaHasta == ""){
       repintar();
    }
    else{
      let gastosFiltrados = gestionPresu.filtrarGastos(objetoFiltro);
      let target = document.getElementById("listado-gastos-completo");
      target.innerHTML = "";
    
      for (let gasto of gastosFiltrados){
       mostrarGastoWeb("listado-gastos-completo", gasto);
     }
    }
  
  }
}

let filtroDeGastos = document.getElementById("formulario-filtrado");

filtroDeGastos.addEventListener("submit", new FiltrarGastosWeb)


function guardarGastosWeb(){ //Tenemos que convertir a string los datos del objeto devuelto por listar gastos ( a su vez compuesto por gastos ), para poder almacenarlo en local
  localStorage.GestorGastosDWEC = JSON.stringify(gestionPresu.listarGastos());

}

let target = document.getElementById("guardar-gastos"); //Simplemente asignamos el manejador con el clásico addEventListener...

target.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb(){ //En este caso, cargamos los datos, esta vez convirtiendo a JSON las cadena recuperadas, para que puedan ser usados y rehidratados los objetos gasto que incluye
  if(localStorage.GestorGastosDWEC){
    let datosCargados = JSON.parse(localStorage.GestorGastosDWEC);
    gestionPresu.cargarGastos(datosCargados);
  }
  else{ //El else en caso de que no exista la variable local...
    let array = [];
    gestionPresu.cargarGastos(array);
  }
  repintar(); //Simplemente repintamos la página...
}

target = document.getElementById("cargar-gastos"); //Misma filosofía de siempre a la hora de asigar eventos a botones

target.addEventListener("click", cargarGastosWeb);


function crearUrl(){
  let recuadro = document.getElementById("nombre-usuario");
  let nombre = recuadro.value.replace(/\s/,"").toLowerCase();
  let url = new URL(` https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}`);

  return url;
}

async function cargarGastosApi(){

  let url = crearUrl();

  let respuesta = await fetch(url);

  let objetoGastosApi = await respuesta.json();

  console.log(objetoGastosApi);


  gestionPresu.cargarGastos(objetoGastosApi);

  repintar();
}

target = document.getElementById("cargar-gastos-api");

target.addEventListener("click", cargarGastosApi)


async function programaBorrarGastoApi(url){
  let respuesta = await fetch(
    url,
    {
      method: "DELETE"
    });

  if (respuesta.ok){
    console.log("Eliminado");
    cargarGastosApi(crearUrl());
  }
  else{
    console.log("Fallo de red.")
  }
}


function BorrarGastoApi(idGasto){
  this.handleEvent = function(e){
    let url = crearUrl() + `/${idGasto}`

    console.log(url);

    programaBorrarGastoApi(url);

  }
}


//NOS QUEDAMOS AQUÍ, para enviar el gasto a la API, página 7 del apartado AJAX.
async function programaEnviarGastoApi(url){

  let formulario = document.querySelector("form");

  console.log(formulario);

  let objetoDatos = {};

  objetoDatos.descripcion = formulario.elements.descripcion.value;
  objetoDatos.valor = parseFloat(formulario.elements.valor.value);
  objetoDatos.fecha = formulario.elements.fecha.value;
  objetoDatos.etiquetas = formulario.elements.etiquetas.value.split(",");

  let respuesta = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json;charset=utf-8"
      },
      body: JSON.stringify(objetoDatos)

    });

  if(respuesta.ok){
    console.log("Peticion POST realizada con éxito");
    cargarGastosApi(url);

  }

}
function EnviarGastoApi(){
  this.handleEvent = function(e){
    e.preventDefault();
    
    let url = crearUrl();

    console.log(url);
  
    programaEnviarGastoApi(url);

    let boton = document.getElementById("anyadirgasto-formulario");
    boton.disabled = false;

  }
}

async function programaEditarFormularioApi(id){
  
  let url = crearUrl() + `/${id}`;

  let formulario = document.getElementById("formulario-editar");

  let objetoDatos = {};

  objetoDatos.descripcion = formulario.elements.descripcion.value;
  objetoDatos.valor = parseFloat(formulario.elements.valor.value);
  objetoDatos.fecha = formulario.elements.fecha.value;
  objetoDatos.etiquetas = formulario.elements.etiquetas.value.split(",");

  console.log(url);
  let respuesta = await fetch(url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },

      body: JSON.stringify(objetoDatos)

    });

  if(respuesta.ok){
    console.log("Datos actualizados");
    cargarGastosApi(crearUrl());
    let botones = document.querySelectorAll(".gasto-editar-formulario");

    for(let boton of botones){
      boton.disabled = false;
    }
  }
  else{
    console.log("Error de red");
  }

}

function SubmitHandleFormularioApi(id){
  this.handleEvent = function(e) {
    e.preventDefault();

    programaEditarFormularioApi(id);
  }
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}