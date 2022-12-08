let presupuesto=0;
let gastos = [];
let idGasto=0;



/*********************************************/
/*    FUNCION ACTUALIZAR_PRESUPUESTO         */
/*===========================================*/
function actualizarPresupuesto(cantidad){
/*===========================================*/
  if (! isNaN(cantidad) ){
    if ( cantidad >= 0 ){
      presupuesto =   cantidad;
      return presupuesto;
    }
    else{
      return -1;
    }
  }
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




/***********************************************************************************************************************************/

/*                                                FUNCION FILTRARGASTO                                                             */

/*=================================================================================================================================*/
function filtrarGastos(objGastos){
/*=================================================================================================================================*/
  let param_name = Object.keys(objGastos).filter( (item) => objGastos[item] !== undefined );
  if (param_name.length === 0) return gastos;
  return gastos.filter( (item) => {
    return param_name.every( (key) => {
      if ( key.includes("fechaDesde") ){
        return item.fecha >= Date.parse(objGastos.fechaDesde);
      }
      if ( key.includes("fechaHasta") ){
        return item.fecha <= Date.parse(objGastos.fechaHasta);
      }
      if ( key.includes("valorMinimo") ){
        return item.valor >= objGastos.valorMinimo;
      }
      if ( key.includes("valorMaximo") ){
        return item.valor <= objGastos.valorMaximo;
      }
      if ( key.includes("descripcionContiene") ){
        return item.descripcion.includes(objGastos.descripcionContiene);
      }
      if ( key.includes("etiquetasTiene") ){
        return item.etiquetas.find( (item) => objGastos.etiquetasTiene !== undefined && objGastos.etiquetasTiene.includes(item) );
      }
    });
  }); 
}
/*=================================================================================================================================*/



/*********************************************/
/*    FUNCION AGRUPARGASTOS                  */
/*===========================================*/
function agruparGastos(periodo,etiquetas, fechaDesde, fechaHasta){
  let objGastos={}; 
    objGastos.fechaDesde = fechaDesde;
    objGastos.fechaHasta= fechaHasta;
    objGastos.etiquetasTiene = etiquetas;
  return filtrarGastos(objGastos)
         .reduce((acumulado_por_fecha,gasto) => {
            let fecha_clave=gasto.obtenerPeriodoAgrupacion(periodo);
            if ( !acumulado_por_fecha[fecha_clave] ){
             acumulado_por_fecha[fecha_clave]=0;
            }
            
            acumulado_por_fecha[fecha_clave]+=gasto.valor;
            return acumulado_por_fecha;
         },{});
}
/*===========================================*/


/*********************************************/
/*    FUNCION TRANSFORMARLISTADOETIQUETAS    */
/*===========================================*/
function transformarListadoEtiquetas(etiquetas){
  return etiquetas.split(/[:,.; ]/ig).filter( elem => elem != "");
}


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
  
  //--------------------------------------------
  //  METODO OBTENER PERIODO AGRUPACIÓN
  //--------------------------------------------
  this.obtenerPeriodoAgrupacion = function(periodo="mes"){
    let fecha_periodo=new Date(this.fecha).toISOString().split("T")[0];
    let mes=fecha_periodo.substr(0,fecha_periodo.lastIndexOf("-"));
    let anyo = fecha_periodo.substr(0,4);
    return (periodo == "mes") ? mes : (periodo == "anyo") ? anyo : fecha_periodo; 
      
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
  calcularBalance,
  filtrarGastos,
  gastos,
  transformarListadoEtiquetas,
  agruparGastos
}


