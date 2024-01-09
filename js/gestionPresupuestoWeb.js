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
//
/* Función repintar que realizará las siguientes tareas:*/
function repintar(){
  // Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
  mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
  // Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
  mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
  // Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
  mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
  // Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
  // Puedes utilizar innerHTML para borrar el contenido de dicha capa.
  document.getElementById("listado-gastos.completo").innerHTML = "";
  // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());
}
//
/* Función actualizarPresupuestoWeb y botón actualizarpresupuesto. 
   Esta función se utilizará como manejadora de eventos del botón actualizarpresupuesto del código HTML.
   Realizará las siguientes tareas:*/
function actualizarPresupuestoWeb (){
  // Pedir al usuario que introduzca un presupuesto mediante un prompt.
  let presupuestoActualizado = prompt("Introduzca su presupuesto:");
  // Convertir el valor a número (recuerda que prompt siempre devuelve un string).
  // Actualicar el presupuesto (función actualizarPresupuesto)
  gestionPresupuesto.actualizarPresupuesto(Number(presupuestoActualizado));
  // Llamar a la función repintar para que se muestre la información actualizada en el archivo HTML. 
  // Recuerda que actualizar el presupuesto provoca cambios en el balance, por lo que al ejecutar repintar se actualizarán ambos campos.
  repintar();
}
/* Una vez definida la función, se añadirá como manejadora del evento click del botón actualizarpresupuesto mediante
   addEventListener. Para ello habrá que obtener el elemento botón correspondiente previamente.*/
let btnactualizarpresupuesto = document.getElementById("actualizarpresupuesto");
btnactualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);
//
/* Función nuevoGastoWeb y botón anyadirgasto.
   Esta función se utilizará como manejadora de eventos del botón anyadirgasto del código HTML. 
   Realizará las siguientes tareas:*/
function nuevoGastoWeb (){
  // Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt
  // (por orden: descripción, valor, fecha y etiquetas). Por simplicidad, de momento no se comprobará la validez de dichos datos.
  // La fecha vendrá dada en formato internacional (yyyy-mm-dd) y las etiquetas se introducirán en un único cuadro de texto como
  // una lista separada por comas (por ejemplo, etiqueta1,etiqueta2,etiqueta3).
  let descripcion = prompt("Introduzca la descripción:");
  let valor = prompt("Introduzca el valor:");
  let fecha = prompt("Introduzca la fecha:");
  let etiquetas = prompt("Introduzca las categorías, separadas por comas:");
  // Convertir el valor a número (recuerda que prompt siempre devuelve un string).
  let val = Number(valor);
  // Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
  let etiq = [etiquetas];
  // Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
  let gasto = gestionPresupuesto.CrearGasto(descripcion, val, fecha.toLocaleDateString, etiq);
  // Añadir el gasto a la lista (función anyadirGasto).
  gestionPresupuesto.anyadirGasto(gasto);//.......................................................................!!!!!!
  // Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
  repintar();
}
/* Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener.
   Para ello habrá que obtener el elemento botón correspondiente previamente.*/
let btnanyadirgasto = document.getElementById("anyadirgasto");
btnanyadirgasto.addEventListener("click", nuevoGastoWeb);

//
// Exportar funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}