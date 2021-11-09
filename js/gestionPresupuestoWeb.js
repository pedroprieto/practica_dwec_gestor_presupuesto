"use strict";
import * as datosPresupuesto from "./gestionPresupuesto.js";



function mostrarDatoEnId(idElemento, valor) {
  let identificador = document.getElementById(idElemento);
  let textoValor = (identificador.innerHTML = valor);

  return textoValor;
}





function mostrarGastoWeb(idElemento, gasto) {
  let identificador = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className = "gasto";
  identificador.append(divGasto);

  let gastoDescripcion = document.createElement("div");
  gastoDescripcion.className = "gasto-descripcion";
  gastoDescripcion.innerHTML = gasto.descripcion;
  divGasto.append(gastoDescripcion);

  let gastoFecha = document.createElement("div");
  gastoFecha.className = "gasto-fecha";
  let fechaNueva = new Date(gasto.fecha);
  gastoFecha.innerHTML = fechaNueva.toLocaleString();
  divGasto.append(gastoFecha);

  let gastoValor = document.createElement("div");
  gastoValor.className = "gasto-valor";
  gastoValor.innerHTML = gasto.valor;
  divGasto.append(gastoValor);

  let gastoEtiquetas = document.createElement("div");
  gastoEtiquetas.className = "gasto-etiquetas";
  divGasto.append(gastoEtiquetas);

 

  for (let x of gasto.etiquetas) {
    let gastoEtiqueta = document.createElement("span");
    gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiqueta.innerHTML = x + "<br>";
    gastoEtiquetas.append(gastoEtiqueta);

  }

  
  let button = document.createElement('button'); 
  button.type = 'button'; 
  button.innerText = 'Editar';
  button.className = "gasto-editar";
  divGasto.append(button);

  let nuevoObj = new EditarHandle(); 
  nuevoObj.gasto = gasto;
  //nuevoObj.handleEvent();


  let elemento = document.getElementsByClassName("gasto-editar");
  for(let x of elemento){ 
    x.addEventListener('click',nuevoObj);
  }


  
  let buttonBorrar = document.createElement('button'); 
  buttonBorrar.type = 'button'; 
  buttonBorrar.innerText = 'Borrar';
  buttonBorrar.className = "gasto-borrar";
  divGasto.append(buttonBorrar);

  

 }

 





function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let identificador = document.getElementById(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";
  identificador.append(divAgrupacion);

  let tituloAgrupacion = document.createElement("h1");
  tituloAgrupacion.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(tituloAgrupacion);

  for (let x in agrup) {
    let agrupacionDato = document.createElement("div");
    agrupacionDato.className = "agrupacion-dato";
    divAgrupacion.append(agrupacionDato);

    let agrupacionClave = document.createElement("span");
    agrupacionClave.className = "agrupacion-dato-clave";
    agrupacionClave.innerHTML = x + "<br>";
    agrupacionDato.append(agrupacionClave);

    let agrupacionValor = document.createElement("span");
    agrupacionValor.className = "agrupacion-dato-valor";
    let valorDecimal = agrup[x];
    agrupacionValor.innerHTML = valorDecimal.toFixed(2) + "<br>";
    agrupacionDato.append(agrupacionValor);
  }
}



function repintar(){
  let mostrar = datosPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId( "presupuesto",mostrar);
  
  let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
  mostrarDatoEnId( "gastos-totales",gastoTotal);
  
  let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
  mostrarDatoEnId("balance-total",balanceTotal);
  
  let borrarDatos = document.getElementById("listado-gastos-completo").innerHTML = "";
  
  let matrizGasto = datosPresupuesto.listarGastos();
  for (const x of matrizGasto) {
    mostrarGastoWeb("listado-gastos-completo", x);
  }
  
  }




  function actualizarPresupuestoWeb (){
    let cambioPresupuesto = parseInt(prompt("Cual es el valor del presupuesto actualmente"));
    datosPresupuesto.actualizarPresupuesto(cambioPresupuesto);
    repintar();
  }


  let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
  botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);


  function nuevoGastoWeb(){
    let descripcion = prompt("Escribe la descripción del gasto");
    let valor = parseInt(prompt("Escribe el valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    
    let arrEtiquetas= etiquetas.split(',');
    
    
     let gastoAnyadido = new datosPresupuesto.CrearGasto(descripcion,valor,fecha,...arrEtiquetas);

    datosPresupuesto.anyadirGasto(gastoAnyadido);
    repintar();

  }




  let botonGasto = document.getElementById("anyadirgasto");
  botonGasto.addEventListener("click",nuevoGastoWeb);



  function EditarHandle() {
    
    this.handleEvent = function (){
    
    let descripcion = prompt("Escribe la nueva descripción del gasto");
    let valor = parseInt(prompt("Escribe la nueva valor del gasto"));
    let fecha = prompt("Escribe la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("Escribe las etiquetas del gasto separadas por ,");
    
    let arrEditar = etiquetas.split(',');

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...arrEditar);
    
    repintar();
   }

  }


  function BorrarHandle() {
    
    this.handleEvent = function (e){
    
      let number = this.gasto.id;
    
      this.gasto.borrarGasto(number);
    
      repintar();
    }

  }

  function BorrarEtiquetasHandle() {
    
    this.handleEvent = function (e){
    
    this.gasto.borrarEtiquetas(this.etiqueta);
    
    repintar();
   }

  }
 

 


export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
