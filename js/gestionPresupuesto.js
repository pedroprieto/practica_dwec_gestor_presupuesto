let presupuesto=0;



/*********************************************/
/*    FUNCION ACTUALIZAR_PRESUPUESTO         */
/*===========================================*/
function actualizarPresupuesto(cantidad){
/*===========================================*/
  let suma_cantidad_presupuesto = cantidad;
  if (! isNaN(suma_cantidad_presupuesto) ){
    if ( suma_cantidad_presupuesto >= 0 ){
      presupuesto =   suma_cantidad_presupuesto;
      return presupuesto;
    }
    else{
      console.log("Error: la cantidad para añadir al presupuesto no puede ser negativa");
      return -1;
    }
  }
  console.log("Error: la cantidad tiene que ser un valor numerico real");
  return -1;
}
/*===========================================*/






/*********************************************/
/*    FUNCION MOSTRARPRESUPUESTOS            */
/*===========================================*/
function mostrarPresupuesto(){
/*===========================================*/
  return `Tu presupuesto actual es de ${presupuesto} €`;
}
/*===========================================*/





/*********************************************/
/*    FUNCION CONSTRUCTORA CREARGASTO        */
/*===========================================*/
function CrearGasto(descripcion,valor){ 
/*===========================================*/
  this.descripcion = descripcion;
  this.valor = ( (valor < 0 || isNaN(valor) ) ? 0: valor);
  console.log("El valor de: " + this.valor);

  //--------------------------------------------
  // METODO ACTUALIZARVALOR 
  //--------------------------------------------
  this.actualizarValor = function (cantidad){
    if ( !isNaN(cantidad) ){ this.valor= ( cantidad > 0 ) ? cantidad : this.valor; }
  }
  //--------------------------------------------


  //--------------------------------------------
  //  METODO ACTULIZARDESCRIPCION 
  //--------------------------------------------
  this.actualizarDescripcion=function (descripcion){
    this.descripcion = descripcion;
  }
  //--------------------------------------------


  //--------------------------------------------
  //  METODO MOSTRARGASTOS  
  //--------------------------------------------
  this.mostrarGasto=function(){
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  }
  //--------------------------------------------


}
/*===========================================*/



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto
}


