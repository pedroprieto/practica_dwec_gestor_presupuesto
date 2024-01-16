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
  // Crea una estructura HTML (crea elementos, asigna nombre de calse y texto, y se añade a la estructura).
  if (elemento) {
    // <div class="gasto">
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elemento.append(divGasto); // divGasto dentro de elemento
    //<div class="gasto-descripcion">${gasto.descripcion}</div>
    let divGastoDesc = document.createElement("div");
    divGastoDesc.className = "gasto-descripcion";
    divGastoDesc.append(`${gasto.descripcion}`);
    divGasto.append(divGastoDesc); // divGastoDesc dentro de divGasto
    // <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleDateString()}</div>
    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.append(`${new Date(gasto.fecha).toLocaleDateString()}`);
    divGasto.append(divGastoFecha); // divGastoFecha dentro de divGasto
    //<div class="gasto-valor">${gasto.valor}</div>
    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.append(`${gasto.valor}`);
    divGasto.append(divGastoValor); // divGastoValor dentro de divGasto
    // <div class="gasto-etiquetas">
    let divGastoEtiqueta = document.createElement("div");
    divGastoEtiqueta.className = "gasto-etiquetas";
    divGasto.append(divGastoEtiqueta);
    if (gasto.etiquetas && gasto.etiquetas.length > 0) {
      for (let e of gasto.etiquetas){
        // Crea elemento span, añade clase y el texto de la etiqueta.
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${e}`);
        divGastoEtiqueta.append(span); // span dentro de divGastoEtiqueta
        // Eventos para los span de etiquetas (no crearemos botón de borrar: se producirá si el usuario hace clic encima de una etiqueta): 
        // Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
        let borrarEtiquetasHandle = new BorrarEtiquetasHandle(gasto, e);
        // Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb).
        borrarEtiquetasHandle.gasto = gasto;
        // Establecer la propiedad etiqueta del objeto creado al texto de la etiqueta que se esté procesando (seguramente este valor lo tendrás disponible dentro del bucle que se encarga de pintar un elemento span para cada etiqueta).
        borrarEtiquetasHandle.etiqueta = e;
        //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
        span.addEventListener("click", borrarEtiquetasHandle);
      }
    }
    // Crear Botones
    // <button class="gasto-editar" type="button">Editar</button>
    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.append("Editar");
    divGasto.append(btnEditar);
    // <button class="gasto-borrar" type="button">Borrar</button>
    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.append("Borrar");
    divGasto.append(btnBorrar);
    // Crear manejador de eventos para los botones:
    // Crear un nuevo objeto a partir de la función constructora EditarHandle y BorrarHandle.
    let editarHandle = new EditarHandle(gasto);
    let borrarHandle = new BorrarHandle(gasto);
    // Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb).
    editarHandle.gasto = gasto;
    borrarHandle.gasto = gasto;
    // Añadir el objeto recién creado como objeto manejador del evento click al botón creados.
    btnEditar.addEventListener("click", editarHandle);
    btnBorrar.addEventListener("click", borrarHandle);
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
  document.getElementById("listado-gastos-completo").innerHTML = "";
  // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  let listargasto = gestionPresupuesto.listarGastos();
  for(let gasto of listargasto){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
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
  gestionPresupuesto.actualizarPresupuesto(parseFloat(presupuestoActualizado));
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
  let val = parseFloat(valor);
  // Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
  let etiq = [etiquetas];
  // Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
  let gasto = new gestionPresupuesto.CrearGasto(descripcion, val, fecha.toLocaleDateString, ...etiq);
  // Añadir el gasto a la lista (función anyadirGasto).
  gestionPresupuesto.anyadirGasto(gasto);
  // Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
  repintar();
}
/* Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener.
   Para ello habrá que obtener el elemento botón correspondiente previamente.*/
let btnanyadirgasto = document.getElementById("anyadirgasto");
btnanyadirgasto.addEventListener("click", nuevoGastoWeb);
//
/* Esta función se utilizará como objeto manejador de eventos para editar un gasto.
   La función EditarHandle será una función constructora que definirá exclusivamente un método llamado handleEvent.
   Cuando creemos un objeto basado en su prototipo, asignaremos a dicho objeto una propiedad llamada gasto, que será una
   referencia al gasto que estemos editando.*/
function EditarHandle (gasto){
  this.gasto = gasto;
  // El código de la función handleEvent podrá hacer referencia a dicho gasto a través de this.gasto, 
  // ya que es una propiedad del objeto. Esta función realizará las siguientes tareas:
  this.handleEvent = function () {
    // Pedir al usuario la información necesaria para editar el gasto mediante sucesivas preguntas con prompt. 
    // Por simplicidad, de momento no se comprobará la validez de dichos datos. La fecha vendrá dada en formato
    // internacional (yyyy-mm-dd) y las etiquetas se introducirán en un único cuadro de texto como una lista separada
    // por comas (por ejemplo, etiqueta1,etiqueta2,etiqueta3). Recuerda que prompt admite como segundo parámetro el valor
    // por defecto del cuadro de diálogo, por lo que puedes proporcionar el valor actual de cada propiedad del gasto.
    let descripcion = prompt("Introduzca la nueva descripción:", this.gasto.descripcion);
    let valor = prompt("Introduzca el nuevo valor:", this.gasto.valor);
    let fecha = prompt("Introduzca la nueva fecha:", this.gasto.fecha);
    let etiquetas = prompt("Introduzca las nuevas categorías, separadas por comas:", this.gasto.etiquetas);
    // Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    let val = parseFloat(valor);
    // Actualizar las propiedades del gasto (disponible mediante this.gasto), mediante las funciones actualizarValor,
    // actualizarDescripcion, actualizarFecha y anyadirEtiquetas.
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(val);
    this.gasto.actualizarFecha(new Date(fecha));
    this.gasto.anyadirEtiquetas(etiquetas.split(','));// Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
    // Llamar a la función repintar para que se muestre la lista de gastos con los datos actualizados de la edición.
    repintar();
  }
}
//
/* Función BorrarHandle. Esta función se utilizará como objeto manejador de eventos para borrar un gasto.
La función BorrarHandle será una función constructora que definirá exclusivamente un método llamado handleEvent.
Cuando creemos un objeto basado en su prototipo, asignaremos a dicho objeto una propiedad llamada gasto,
que será una referencia al gasto que estemos editando. El código de la función handleEvent podrá hacer referencia
a dicho gasto a través de this.gasto, ya que es una propiedad del objeto. Esta función realizará las siguientes tareas:*/
function BorrarHandle(gasto){
  this.gasto = gasto;
  // Borrar el gasto asociado. Para ello utilizará la función borrarGasto y como parámetro utilizará el id del gasto seleccionado,
  // disponible en this.gasto.
  this.handleEvent = function(){
    gestionPresupuesto.borrarGasto(this.gasto.id);
    // Llamar a la función repintar para que se muestre la lista actualizada de gastos.
    repintar();
  }
}
//
/* Función BorrarEtiquetasHandle. Esta función se utilizará como objeto manejador de eventos para borrar etiquetas de un gasto.
El funcionamiento de esta función es muy parecido a la anterior, con la excepción de su funcionamiento interno.
La función BorrarEtiquetasHandle será una función constructora que definirá exclusivamente un método llamado handleEvent. 
Cuando creemos un objeto basado en su prototipo, asignaremos a dicho objeto una propiedad llamada gasto, que será una referencia
al gasto que estemos editando y una propiedad llamada etiqueta, que hará referencia a la etiqueta que se pretenda eliminar. 
El código de la función handleEvent podrá hacer referencia a dicho gasto a través de this.gasto y a this.etiqueta, ya que 
son propiedades del objeto. Esta función realizará las siguientes tareas:*/
function BorrarEtiquetasHandle (gasto, etiqueta){
  this.gasto = gasto;
  this.etiqueta = etiqueta;
  // Borrar la etiqueta seleccionada del gasto asociado. Para ello utilizará la función borrarEtiquetas del gasto asociado 
  // (this.gasto) y como parámetro utilizará la etiqueta seleccionada, disponible en this.etiqueta.
  this.handleEvent = function(){
    this.gasto.borrarEtiquetas(this.etiqueta);
    //gestionPresupuesto.borrarEtiquetas(this.gasto.etiquetas);
    // Llamar a la función repintar para que se muestre la lista actualizada de gastos.
    repintar();
  }
}
//
// Exportar funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}