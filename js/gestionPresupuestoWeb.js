
import * as gestionPresu from "./gestionPresupuesto.js";


function repintar(){
  mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", gestionPresu.calcularTotalGastos());
  mostrarDatoEnId("balance-total", gestionPresu.calcularBalance());
  let elementTarget = document.getElementById("listado-gastos-completo");
  elementTarget.innerHTML = ``;

  for (let gasto of gestionPresu.listarGastos()){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }

}

function actualizarPresupuestoWeb(){
  let presupuesto = prompt("Introduce un nuevo presupuesto", 0);
  gestionPresu.actualizarPresupuesto(presupuesto);
  repintar();
}

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
  let descripcion = prompt("Introduce una descripción", "factura luz");
  let valor = parseFloat(prompt("Introduce un valor", "0").replace(`,`,`.`));
  alert(valor);
  let fecha = prompt("Introduce una fecha YYYY-MM-DD", "2023-1-1");
  let etiquetas = prompt("Introduce las etiquetas separadas por comas", "recibos,hogar").split(",");
  let gasto = new gestionPresu.CrearGasto(descripcion, valor, fecha,...etiquetas);

  gestionPresu.anyadirGasto(gasto);
  repintar();
}

let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
  this.handleEvent = function(){
    let descripcion = prompt("Introduce una descripción", this.gasto.descripcion);
    let valor = parseFloat(prompt("Introduce un valor", "0").replace(`,`,`.`));
    let fecha = prompt("Introduce una fecha YYYY-MM-DD", this.gasto.fecha);
    let etiquetas = prompt("Introduce las etiquetas separadas por comas", this.gasto.etiquetas.join()).split(",");
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    repintar();
  } 
}

function BorrarHandle(){
  this.handleEvent = function(){
    gestionPresu.borrarGasto(this.gasto.id);
    repintar();
  }
}

function BorrarEtiquetasHandle(){
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
  gastoTag.textContent = gasto.valor.toLocaleString("es-ES");
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
    let manejadorEtiquetas = new BorrarEtiquetasHandle();
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

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`)
  targetElement.append(boton);

  boton = document.createElement("button");
  boton.setAttribute("type", "button");
  boton.textContent = "Borrar";
  boton.classList.add("gasto-borrar");

  let manejadorBorrar = new BorrarHandle();

  manejadorBorrar.gasto = gasto;
  boton.addEventListener("click", manejadorBorrar);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  targetElement.append(boton);

  
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




export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}