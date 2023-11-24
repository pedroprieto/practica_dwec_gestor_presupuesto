
import * as gestionPresu from "./gestionPresupuesto.js";


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