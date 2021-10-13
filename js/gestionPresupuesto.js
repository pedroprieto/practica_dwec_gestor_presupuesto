// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos;
let idGastos = 0;

// TODO: Variable global


function actualizarPresupuesto(pre) {

    
    
    if (pre >= 0)
    {
        pre = presupuesto;
    }    

    else
    {
        presupuesto = -1;
        console.log('Error, presupuesto negativo, valor convertido a' + presupuesto);
    }

    return presupuesto;
    // TODO
   /* Función de 1 parámetro que se encargará
    de actualizar la variable global presupuesto
    . Esta función comprobará que el valor introducido es un número
     no negativo: en caso de que sea un dato válido, actualizará la 
     variable presupuesto y devolverá el valor del mismo; en caso contrario,
      mostrará un error por pantalla y devolverá el valor -1. */
}

function mostrarPresupuesto() {
    // TODO
    /*Función sin parámetros que se encargará de devolver el texto siguiente:
     Tu presupuesto actual es de X €, siendo X el valor de la variable global presupuesto.*/
     let x = presupuesto;
     //hola//
     return('Tu presupuesto actual es de ' + x +' €') ;
}


        
   

 

function CrearGasto(valor, fecha, tipo) {

    this.fecha = fecha;
    this.tipo = tipo;
    this.valor = valor;

    this.mostrarGastoCompleto = function(){

        return
        //Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas)
          //Gasto correspondiente a DESCRIPCION con valor VALOR €.
        //Fecha: FECHA_EN_FORMATO_LOCALIZADO
        //Etiquetas:
        //- ETIQUETA 1
        //- ETIQUETA 2
        //- ETIQUETA 3  
    }
    this.actualizarFecha = function(fecha){

        //Función de 1 parámetro que actualizará la propiedad fecha del objeto. Deberá recibir la fecha en formato string que sea entendible por la función Date.parse. Si la fecha no es válida, se dejará sin modificar.
    }
    this.anyadirEtiquetas = function(){

        // Función de un número indeterminado de parámetros que añadirá las etiquetas pasadas como parámetro a la propiedad etiquetas del objeto. Deberá comprobar que no se creen duplicados.
    }
    this.borrarEtiquetas = function(){

        //Función de un número indeterminado de parámetros que recibirá uno o varios nombres de etiquetas y procederá a eliminarlas (si existen) de la propiedad etiquetas del objeto.
     }
    /*if ( valor >= 0){
         this.valor = valor;
         }
           else{
          this.valor = 0;
        }*/

   
    
     

 fecha://Almacenará la fecha en que se crea el gasto en forma de timestamp
 etiquetas:// Almacenará en un array el listado de etiquetas (categorías) asociadas al gasto.

    // TODO
    /*Función constructora que se encargará de crear un objeto gasto.
     Esta función devolverá un objeto de tipo gasto.
     Deberá comprobar que el valor introducido sea un núḿero  no negativo;
      en caso contrario, asignará a la propiedad valor el valor 0.
     */

      let gasto = new CrearGasto(50);
   
    
    return gasto;


   
}


function listarGastos(){

    return gastos;
}
function anyadirGasto(gasto){

  //  Función de 1 parámetro que realizará tres tareas:

    //Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
    //Incrementar el valor de la variable global idGasto.
     //Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.
}
function borrarGasto(id){

//Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado, no hará nada.

}
function calcularTotalGastos(){

    let suma;

    return suma;

    //Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos. De momento no los agruparemos por período temporal (lo haremos en sucesivas prácticas).
}
function calcularBalance(){

    let balancetotal;
    return balancetotal;

    //Función sin paràmetros que devuelva el balance (presupuesto - gastos totales) disponible. De momento no lo obtendremos por período temporal (lo haremos en sucesivas prácticas). Puede utilizar a su vez la función calcularTotalGastos.
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
