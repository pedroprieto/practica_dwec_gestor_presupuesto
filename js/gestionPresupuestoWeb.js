import * as gestionPresupuesto from "./gestionPresupuesto.js";

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
  return (document.getElementById(idElemento).innerText = valor);
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
  let elemento = document.getElementById(idElemento);

  // crear Div .gasto
  let divGasto = document.createElement("div");
  divGasto.classList.add("gasto");
  elemento.appendChild(divGasto);

  //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
  let divDescripcion = document.createElement("div");
  divDescripcion.classList.add("gasto-descripcion");
  divDescripcion.textContent = "DESCRIPCIÓN DEL GASTO :" + gasto.descripcion;
  divGasto.appendChild(divDescripcion);

  //<div class="gasto-fecha">FECHA DEL GASTO</div>
  let divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  let fecha = new Date(gasto.fecha).toLocaleDateString(); // parse de timestamp a fecha corta
  divFecha.textContent = "FECHA DEL GASTO: " + fecha;
  divGasto.appendChild(divFecha);

  //<div class="gasto-valor">VALOR DEL GASTO</div>
  let divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent =  gasto.valor;
  divGasto.appendChild(divValor);

  //<div class="gasto-etiquetas">
  let divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");
  divGasto.appendChild(divEtiquetas);

  //<span class="gasto-etiquetas-etiqueta"> en bucle
  for (let etiqueta of gasto.etiquetas) { //!for (const item of )
    
    let spanEtiquetas = document.createElement("span");
    spanEtiquetas.classList.add("gasto-etiquetas-etiqueta");
    spanEtiquetas.innerText = "Etiqueta :" + etiqueta;
    spanEtiquetas.addEventListener(`click`, new BorrarEtiquetasHandle(gasto, etiqueta))
    divEtiquetas.appendChild(spanEtiquetas);
    //divGasto.appendChild(divEtiquetas);
  }
  elemento.appendChild(divGasto);


//Botón editar

let btnEditar = document.createElement(`button`);
btnEditar.classList.add(`gasto-editar`);
btnEditar.innerText=`Editar`;

btnEditar.addEventListener(`click`,new EditarHandle(gasto))  // Asigna EditarHandle con el gasto correspondiente

divGasto.appendChild(btnEditar); // agrego bton
elemento.appendChild(divGasto);//agrego div

//Botón borrar
let btnBorrar= document.createElement(`button`);
btnBorrar.classList=`gasto-borrar`;
btnBorrar.innerText=`Borrar`;

btnBorrar.addEventListener(`click`,new BorrarHandle(gasto)) ;// Asigna BorrarHandle con el gasto correspondiente

divGasto.appendChild(btnBorrar); // agrego bton
elemento.appendChild(divGasto);//agrego div


}

// Función para mostrar gastos agrupados en un elemento HTML por su ID
function mostrarGastosAgrupadosWeb(idElemento, periodo) {
  let agrup = gestionPresupuesto.agruparGastos(periodo); // resultado de agrupar el total de gastos por período temporal (ejecución de la función agruparGastos
  let divContenedor = document.getElementById(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");
  divContenedor.appendChild(divAgrupacion);

  let h1 = document.createElement("h1");
  h1.textContent = `Gastos agrupados por ${periodo}`;
  divAgrupacion.appendChild(h1);

  for (let item of Object.entries(agrup)) { //! gstosAgrupados es un objeto
    /* 
     1- (let item in agrup)
     2- for (let item of Object.entries(agrup)) { // Utilizar Object.entries para obtener pares clave-valor
         let [clave, valor] = item; // Desestructurar el par clave-valor
          spanDatoClave.textContent = clave;
          spanDatoValor.textContent = valor;

    */
    let [clave, valor] = item; // Desestructurar el par clave-valor en un array

    //div de cada agrupacion
    let agrupacionDato = document.createElement("div");
    agrupacionDato.classList.add("agrupacion-dato");
    divAgrupacion.appendChild(agrupacionDato);

    // span con el nombre del grupo
    let spanDatoClave = document.createElement("span");
    spanDatoClave.classList.add("agrupacion-dato-clave");
    spanDatoClave.textContent = clave + " = "; // agrup.clave
    agrupacionDato.appendChild(spanDatoClave);

    // span con el valor del grupo
    let spanDatoValor = document.createElement("span");
    spanDatoValor.classList.add("agrupacion-dato-valor");
    spanDatoValor.textContent = valor;
    agrupacionDato.appendChild(spanDatoValor);

    divContenedor.appendChild(divAgrupacion);
  }
  divContenedor.appendChild(divAgrupacion);
}

//crear toda la estructura HTML que refleje los cambios realizados en el modelo de datos.
function repintar() {
  let presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  let gastosTotales = gestionPresupuesto.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastosTotales);

  let calcularBalance = gestionPresupuesto.calcularBalance();
  mostrarDatoEnId("balance-total", calcularBalance);

  let listadoGastosCompletos = document.getElementById(
    "listado-gastos-completo"
  );
  listadoGastosCompletos.innerHTML = ""; //borro el listado

  let listGastos = gestionPresupuesto.listarGastos();
  listGastos.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  });
}

// manejadora de eventos del botón actualizarpresupuesto del código HTML.
function actualizarPresupuestoWeb() {
  let presupuesto = prompt(" Introduzca el nuevo  presupuesto");
  presupuesto = Number(presupuesto);

  gestionPresupuesto.actualizarPresupuesto(presupuesto);

  repintar();
}


function nuevoGastoWeb() {
  let descripcion = prompt("Añade la descripción del gasto:");

  let valor = prompt("Introduzca nuevo valor");
  valor = Number(valor);

  let fecha = prompt(" Introduzca nueva Fecha Año/Mes/Dia");
  fecha = Date.parse(fecha);

  let Etiquetas = prompt( "Introduzca nueva Etiqueta.Si son varias separa por Coma" );
  let arrrayEtiquetas = Etiquetas.split(", "); //dividir la cadena de texto por una coma

  let nuevoGasto = new gestionPresupuesto.CrearGasto(
    descripcion,
    valor,
    fecha,
    arrrayEtiquetas
  ); // creo nuevogasto con array etiq
  gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();
}


// funcion  objeto manejador de eventos para editar un gasto.basado en su prototipo, y referenciado al gasto que stamos editando
function EditarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    // Pedir al usuario la información
    let nuevaDescripcion = prompt(
      "Añade la descripción del gasto:",
      this.gasto.descripcion
    );

    let nuevoValor = prompt("Introduzca nuevo valor", this.gasto.valor);
    nuevoValor = Number(nuevoValor);

    let nuevaFecha = prompt(
      " Introduzca nueva Fecha aaaa/mm/dd ",
      this.gasto.fecha
    );
    nuevaFecha = Date.parse(nuevaFecha);

    let nuevasEtiquetas = prompt(
      "Introduzca nueva Etiqueta.Si son varias separadas por , Comas",
      this.gasto.etiquetas
    );
    let arrrayEtiquetas = nuevasEtiquetas.split(","); //dividir la cadena de texto por una coma

    // actualizar datos
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(arrrayEtiquetas);

    repintar();
  };
}
function BorrarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    gestionPresupuesto.borrarGasto(this.gasto.id);
   

    repintar();
  };
}


function BorrarEtiquetasHandle(gasto, etiqueta) {
this.gasto= gasto;
this.etiqueta=etiqueta;

this.handleEvent= function(event){

  this.gasto.borrarEtiquetas(this.etiqueta);

  repintar();
  
  }
}
export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
};
