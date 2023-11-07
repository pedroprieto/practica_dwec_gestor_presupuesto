import * as gestionPresupuesto from "./gestionPresupuesto.js";

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
  return document.getElementById(idElemento).innerText = valor;
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
  let elemento = document.getElementById(idElemento);

 
    // crear Div .gasto
    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');
    elemento.appendChild(divGasto);

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = "DESCRIPCIÓN DEL GASTO :"+ gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
    let divFecha= document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent='FECHA DEL GASTO :' + gasto.fecha;
    divGasto.appendChild(divFecha);

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
    let divValor=document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent= 'VALOR DEL GASTO :' + gasto.valor;
    divGasto.appendChild(divValor);

    //<div class="gasto-etiquetas">
    let divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    divGasto.appendChild(divEtiquetas);

    //<span class="gasto-etiquetas-etiqueta"> en bucle 
    for (const item of gasto) {     //!for (const item of gasto.etiquetas)
    let spanEtiquetas = document.createElement('span');
    spanEtiquetas.classList.add('gasto-etiquetas-etiqueta');
    spanEtiquetas.innerText= 'Etiqueta :'+ gasto.etiqueta + ' ;\n';
    divEtiquetas.appendChild(spanEtiquetas);
    }   
  
}


// Función para mostrar gastos agrupados en un elemento HTML por su ID
function mostrarGastosAgrupadosWeb(idElemento, periodo) {

  let divContenedor = document.getElementById(idElemento);

 
    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");
    divContenedor.append(divAgrupacion);

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);

    let gstosAgrupados = agruparGastos(periodo);
    for (let item of Object.entries(gstosAgrupados)) { //! gstosAgrupados es un objeto 
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
      divAgrupacion.append(agrupacionDato);

        // span con el nombre del grupo
      let spanDatoClave = document.createElement("span");
      spanDatoClave.classList.add("agrupacion-dato-clave");
      spanDatoClave.textContent = clave; // agrup.clave
      agrupacionDato.append(spanDatoClave);

      // span con el valordel grupo
      let spanDatoValor = document.createElement("span");
      spanDatoValor.classList.add("agrupacion-dato-valor");
      spanDatoValor.textContent = valor; 
      agrupacionDato.append(spanDatoValor);
    }
}

export { 
  mostrarDatoEnId, 
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb 
  }
