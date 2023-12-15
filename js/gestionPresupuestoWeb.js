import * as gestionPresupuesto from "./gestionPresupuesto.js";

//-------------------------------------------> FUNCIONES <-------------------------------------
/*Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con 
  id idElemento indicado:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato
      texto.
    - valor - El valor a mostrar.*/
function mostrarDatoEnId (idElemento, valor){
  let elemento = document.getElementById(idElemento);
  elemento.innerText = valor;
}

/*Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento
  indicado una estructura HTML para el gasto que se pase como parámetro:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de
      estructuras HTML que se crearán para cada gasto.
    - gasto - Objeto gasto*/
function mostrarGastoWeb (idElemento, gasto){
let elemento =document.getElementById(idElemento);

}
/*Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento
  indicado una estructura HTML para el objeto agrup que se pase como parámetro:
    - idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de
      estructuras HTML que se creará para cada gasto.
    - agrup - Objeto que contendrá el resultado de agrupar el total de gastos por período temporal
      (ejecución de la función agruparGastos desarrollada en la práctica anterior).
                          (((((agrup = {"2021-09": 5, "2021-10": 39})))))
    - periodo - Período temporal por el que se habrá realizado la agrupación (mes, dia o anyo)*/
   function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
   }

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}