
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){

let elemento = document.getElementById(idElemento);



if (elemento){
    elemento.textContent = valor;
} else {
    console.error('El elemento con el id '+ idElemento + 'no fue encontrado.' );
}

}

function mostrarGastoWeb(idElemento, gasto){

  // Obtener el elemento HTML por su id
  let container = document.getElementById(idElemento);

  // Verificar si el contenedor existe antes de intentar modificarlo, y seguiremos la estructura que nos marca el ejercicio.
  if (container) {
      // Crear un nuevo elemento div para representar el gasto
      let nuevoGastoDiv = document.createElement("div");
      nuevoGastoDiv.classList.add("gasto");
    
      // Añadir descripción del gasto
      let descripcionDiv = document.createElement("div");
      descripcionDiv.classList.add("gasto-descripcion");
      descripcionDiv.textContent = gasto.descripcion;
   

      // Añadir fecha del gasto
      let fechaDiv = document.createElement("div");
      fechaDiv.classList.add("gasto-fecha");
     
    
      let cadenaFecha = new Date(gasto.fecha).toLocaleDateString();

      fechaDiv.textContent = cadenaFecha;
     

      // Añadir valor del gasto
      let valorDiv = document.createElement("div");
      valorDiv.classList.add("gasto-valor");
      valorDiv.textContent = gasto.valor;
  

      // Añadir etiquetas del gasto
      let etiquetasDiv = document.createElement("div");
      etiquetasDiv.classList.add("gasto-etiquetas");
      for(let etiqueta of gasto.etiquetas) {
        let spanEtiquetas = document.createElement('span');
        spanEtiquetas.classList.add('gasto-etiquetas-etiqueta');
        spanEtiquetas.textContent = etiqueta;
        etiquetasDiv.appendChild(spanEtiquetas);

      }
      nuevoGastoDiv.appendChild(descripcionDiv);
      nuevoGastoDiv.appendChild(fechaDiv);
      nuevoGastoDiv.appendChild(valorDiv);
      nuevoGastoDiv.appendChild(etiquetasDiv);

     



      // Añadir el nuevo gasto al contenedor
      container.appendChild(nuevoGastoDiv);
  } else {
      console.error('El contenedor con el id ' + idElemento + ' no fue encontrado.');
  }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
        //buscamos el eelemento
    let elemento = document.getElementById(idElemento)
    //Creamos la estructura principal del HTMl
    let nuevaAgrupacion = document.createElement("div");
    nuevaAgrupacion.classList.add("agrupacion");
    //Creamos el título con el período
    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    nuevaAgrupacion.appendChild(titulo);

 for(let [clave, valor] of Object.entries(agrup)) {
             
                    let dato = document.createElement("div");
                    dato.classList.add("agrupacion-dato");

                    // Crear span para la clave
                    let claveSpan = document.createElement("span");
                    claveSpan.classList.add("agrupacion-dato-clave");
                    claveSpan.textContent =clave + ": ";
                    dato.appendChild(claveSpan);

                    // Crear span para el valor
                    let valorSpan = document.createElement("span");
                    valorSpan.classList.add("agrupacion-dato-valor");
                    valorSpan.textContent = valor;
                    dato.appendChild(valorSpan);

              
                    nuevaAgrupacion.appendChild(dato);
            }
       elemento.appendChild(nuevaAgrupacion);   
}

// Importar la librería js/gestionPresupuesto.js


// Función repintar para actualizar la página

function repintar() {
    // Mostrar el presupuesto en div#presupuesto
   gestionPresupuesto.mostrarPresupuesto();
   mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    
    // Mostrar los gastos totales en div#gastos-totales
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    
    // Mostrar el balance total en div#balance-total
    
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    
    // Borrar el contenido de div#listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = '';
    
    // Mostrar el listado completo de gastos en div#listado-gastos-completo
    let listGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listGastos){
    mostrarGastoWeb('listado-gastos-completo', gasto)
    }

}

// Función actualizarPresupuestoWeb y botón actualizarpresupuesto
function actualizarPresupuestoWeb() {
    // Pedir al usuario que introduzca un presupuesto mediante un prompt
    let nuevoPresupuestoStr = prompt('Introduce el nuevo presupuesto:');
    
    // Convertir el valor a número
    let nuevoPresupuesto = parseFloat(nuevoPresupuestoStr);
    
    // Actualizar el presupuesto
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    
    // Llamar a la función repintar para mostrar la información actualizada
    repintar();
}
//(descripcion, valor = 0, fecha, ...etiquetas)
function nuevoGastoWeb(){
    //introduccimos los campos
    let newDescripcion = prompt('Introduce la descripción del gasto:');
    let valorStr = prompt('Introduce el valor del gasto:');
    let newFecha = prompt('Introduce la fecha del gastos en formato: YYYY-MM-DD');
    let nombresEtiqueta = prompt('Introduce las etiquetas separadas por ,');
    let nuevoValor = parseFloat(valorStr);
    let arrayEtiquetas = nombresEtiqueta.split(', ');
    //let arrayEtiqueta = [];
    /*for (let etiqueta of arrayEtiqueta)
    {
        arrayEtiqueta.push(etiqueta);
    }*/
    // hay que crear y añadir el gasto
    let nuevoGasto = new gestionPresupuesto.CrearGasto (newDescripcion, nuevoValor, newFecha, arrayEtiquetas)
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
    
}



// Obtener el elemento botón correspondiente y añadir la manejadora de eventos
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);

// Llamar a repintar al cargar la página para mostrar la información inicial
repintar();






export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}
