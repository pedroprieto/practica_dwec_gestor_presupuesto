let presupuesto=0;
let gastos = [];
let idGasto=0;



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
/*    FUNCION LISTARGASTOS                   */
/*===========================================*/
function listarGastos(){
/*===========================================*/
  return gastos;
}
/*===========================================*/


/*********************************************/
/*    FUNCION ANYADIRGASTOS                   */
/*===========================================*/
function anyadirGasto(gasto){
/*===========================================*/
  gasto.id=idGasto;
  idGasto +=1;
  gastos.push(gasto);

}
/*===========================================*/

/*********************************************/
/*    FUNCION BORRARGASTOS                   */
/*===========================================*/
function borrarGasto(idGasto){
/*===========================================*/
  let indice=0;
  for (let item of gastos ){
    if ( item.id == idGasto ){
      gastos.splice(indice,1)
    }
    indice ++;
  }
}
/*===========================================*/


/*********************************************/
/*    FUNCION CALCULARTOTALGASTOS            */
/*===========================================*/
function calcularTotalGastos(){
/*===========================================*/
  let total=0;
  for (let gasto of gastos){
    total += gasto.valor;
  }
  return total;
}
/*===========================================*/


/*********************************************/
/*    FUNCION calcularBalance                   */
/*===========================================*/
function calcularBalance(){
/*===========================================*/
  return presupuesto - calcularTotalGastos(gastos); 
}
/*===========================================*/



/*********************************************/
/*    FUNCION CONSTRUCTORA CREARGASTO        */
/*===========================================*/
function CrearGasto(descripcion,valor, fecha=Date.parse(new Date().toLocaleString()), ...etiquetas){ 
/*===========================================*/
  this.descripcion = descripcion;
  this.valor = ( (valor < 0 || isNaN(valor) ) ? 0: valor);
  this.fecha = ( isNaN(Date.parse(fecha)) ) ? Date.parse(new Date()) : ( isNaN(fecha) ) ? Date.parse(fecha.toLocaleString()): fecha;
  this.etiquetas=etiquetas;
  
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
  
  
  //--------------------------------------------
  //  METODO MOSTRARGASTOS  
  //--------------------------------------------
  this.mostrarGastoCompleto= function(){
    let fgasto=`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
    `Fecha: ${new Date(this.fecha).toLocaleString()}\n`+
    "Etiquetas:\n"
    for (let i=0; i<this.etiquetas.length; i++){
      fgasto +="- " + this.etiquetas[i] +  "\n";
    }
    return fgasto;
  }
  //-------------------------------------------
  
  
  
  
  //--------------------------------------------
  //  METODO ACTUALIZAR FECHA
  //--------------------------------------------
  this.actualizarFecha= function(fecha){
    if ( !isNaN( Date.parse(fecha.toLocaleString()) ) ){
      this.fecha = Date.parse(fecha.toLocaleString());
    }
  }
  //--------------------------------------------

  //--------------------------------------------
  //  METODO AÑADIR ETIQUETAS
  //--------------------------------------------
  this.anyadirEtiquetas= function (...etiquetas){
    for (let etiqueta of etiquetas ){
      if ( this.etiquetas.includes(etiqueta) == false ){
        this.etiquetas.push(etiqueta);
      }
    }
  }
  //--------------------------------------------


  //--------------------------------------------
  //  METODO AÑADIR BORRAR ETIQUETAS  
  //--------------------------------------------
  this.borrarEtiquetas= function(...etiquetas){
    this.etiquetas=this.etiquetas.filter( (item) => etiquetas.includes(item) == false )
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
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance
}


