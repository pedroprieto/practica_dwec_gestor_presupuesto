// Importar módulos
import * as gestionPresupuesto from "./gestionPresupuesto.js";

//-------------------------------------------> FUNCIONES <-------------------------------------//
//
/* Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con 
  id idElemento indicado:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato
      texto.
    - valor - El valor a mostrar.*/
function mostrarDatoEnId (idElemento, valor){
  // Asigna el elemento a una variable
  let elemento = document.getElementById(idElemento);
  // Inserta el valor en el elemento
  elemento.innerText = valor;
}
//
/* Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento
  indicado una estructura HTML para el gasto que se pase como parámetro:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de
      estructuras HTML que se crearán para cada gasto.
    - gasto - Objeto gasto*/
function mostrarGastoWeb (idElemento, gasto){
  // Asigna el elemento a una variable
  let elemento = document.getElementById(idElemento);
  // Estructura HTML
  if (elemento) {
    let estructuraHTML = `
      <div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleDateString()}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">`;
    // Agrega las etiquetas del gasto si existen
    if (gasto.etiquetas && gasto.etiquetas.length > 0) {
      for (let e in gasto.etiquetas){
        estructuraHTML += `
          <span class="gasto-etiquetas-etiqueta">
            ${gasto.etiquetas}
          </span>`;
      }
    }
    estructuraHTML += `
        </div>
      </div>`;
    // Agregar la estructura HTML al elemento
    elemento.innerHTML += estructuraHTML;
  }
}
//
/*Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento
  indicado una estructura HTML para el objeto agrup que se pase como parámetro:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de
      estructuras HTML que se creará para cada gasto.
    - agrup - Objeto que contendrá el resultado de agrupar el total de gastos por período temporal
      (ejecución de la función agruparGastos desarrollada en la práctica anterior).
    - periodo - Período temporal por el que se habrá realizado la agrupación (mes, dia o anyo)*/
   function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    // Asigna el elemento a una variable
    let elemento = document.getElementById(idElemento);
    // Estructura HTML
    if (elemento) {
      let estructuraHTML = `
        <div class="agrupacion">
          <h1>Gastos agrupados por ${periodo}</h1>`;
      // Recorre el objeto 'agrup' y crear la estructura para cada propiedad
      for (let a in agrup){
        estructuraHTML += `
          <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${a}:</span>
            <span class="agrupacion-dato-valor">${(agrup[a]).toFixed(2)} €</span>
          </div>`;
      }
      estructuraHTML += `
        <div>
        </div>`;
  
      // Agregar la estructura HTML al elemento
      elemento.innerHTML += estructuraHTML;
    }
   }

// Exportar funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}