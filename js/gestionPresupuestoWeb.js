import * as oprcpre from './gestionPresupuesto.js';


/*********************************************/
/*    FUNCION MOSTRARDATOENID                */
/*===========================================*/
function mostrarDatoEnId(idElemento, valor){
  document.getElementById(idElemento).append(valor);
}
/*===========================================*/



/*********************************************/
/*    FUNCION MOSTRARGASTOWEB                */
/*===========================================*/
function mostrarGastoWeb(idElemento, objgasto){
  let div_gasto=document.createElement('div');
  let div_gasto_etiquetas=create_element('div','class','gasto-etiquetas','');
  div_gasto.setAttribute('class','gasto');
  div_gasto.append(create_element('div','class','gasto-descripcion',objgasto.descripcion));
  div_gasto.append(create_element('div','class','gasto-fecha',formatearFecha(objgasto.fecha)));
  div_gasto.append(create_element('div','class','gasto-valor',objgasto.valor));
  if (objgasto.etiquetas){
    for ( let etiqueta of objgasto.etiquetas){
      div_gasto_etiquetas.append(create_element('span','class','gasto-etiquetas-etiqueta',etiqueta));
    }
  }
  let handler_button_editar=new EditarHandle();
  handler_button_editar.gasto=objgasto;

  let handler_button_borrar=new BorrarHandle();
  handler_button_borrar.gasto=objgasto;
  
  let handler_etiquetas=new BorrarEtiquetasHandel();
  handler_etiquetas.gasto=objgasto;

  console.log(div_gasto_etiquetas);
  for ( let span of  div_gasto_etiquetas.childNodes){
      span.addEventListener('click',handler_etiquetas); 
  }

  
  let button_editar=createButton('gasto-editar','Editar');
  button_editar.addEventListener('click',handler_button_editar);
  let button_borrar=createButton('gasto-borrar','Borrar');
  button_borrar.addEventListener('click', handler_button_borrar);
  div_gasto.append(div_gasto_etiquetas);
  div_gasto.append(button_editar);
  div_gasto.append(button_borrar);
  document.getElementById(idElemento).append(div_gasto);
}
/*===========================================*/



/*********************************************/
/*    FUNCION CREATEBUTTON                   */
/*===========================================*/
function createButton(classname, text){
  let button=document.createElement('button');
  button.setAttribute('type','button');
  button.setAttribute('class',classname);
  button.innerHTML=text;
  return button; 
}
/*===========================================*/



/*********************************************/
/*    FUNCION MOSTRARGASTOSAGRUPADOS         */
/*===========================================*/
function mostrarGastosAgrupadosWeb(idElemento, arr_agrup, periodo){
  let div_agrup=create_element('div','class','agrupacion','');
  let htitulo=document.createElement('h1');
  htitulo.innerHTML=`Gastos agrupados por ${periodo}`;
  div_agrup.append(htitulo);
  let key_value_group=Object.entries(arr_agrup);
  key_value_group.map ( (gasto) => {
    let div_agrupacion_dato=create_element('div','class','agrupacion-dato','')
    div_agrupacion_dato.append( create_element('span','class','agrupacion-dato-clave',gasto[0]));
    div_agrupacion_dato.append( create_element('span','class','agrupacion-dato-valor',gasto[1]));
    div_agrup.append(div_agrupacion_dato) });
  document.getElementById(idElemento).append(div_agrup);
}
/*===========================================*/

/*********************************************/
/*    FUNCION CREATE ELEMENT                 */
/*===========================================*/
function create_element( element, attribute, attribute_value, text){
  let elemnt=document.createElement(element);
  elemnt.setAttribute(attribute,attribute_value);
  elemnt.innerHTML=text;
  return elemnt;
}
/*===========================================*/


/*********************************************/
/*    FUNCION ACTUALIZAR PRESUPUESTO WEB     */
/*===========================================*/
function actualizarPresupuestoWeb(){
  let valor_presupuesto = Number(prompt("Introduzca cantidad para ingresar: "));
  while (isNaN(valor_presupuesto) ){
    valor_presupuesto = Number(prompt("Ingrese cantidad (Valor, un número decimal): ")); 
  }
  oprcpre.actualizarPresupuesto(valor_presupuesto);
  BorradoZonasGasto();
  repintar();
}
/*===========================================*/





/*********************************************/
/*    FUNCION NUEVO GASTO WEB                */
/*===========================================*/
function nuevoGastoWeb(){
  let descripcion=prompt("Introduzca la descripcion del gasto ");
  let valor = Number(prompt("Introduzca el valor del gasto (decimal): "));
  while ( isNaN(valor) ){
    valor=Number(prompt("Debe introducir un valor en decimal para el gasto: "));    
  }
  let fecha_gasto=prompt("Introduzca la fecha del gasto ");
  let etiquetas=prompt("Insertar etiquetas (Puede insertar varias separadas por ,) :").split(',');
  oprcpre.anyadirGasto(new oprcpre.CrearGasto(descripcion,valor,fecha_gasto,...etiquetas)); 
  BorradoZonasGasto();
  repintar();
}
/*===========================================*/

/*********************************************/
/*    FUNCION HANDLER EVENT  BORRAR          */
/*===========================================*/
function BorrarHandle(){
  this.gasto=undefined;
  this.handleEvent=function(event){
    oprcpre.borrarGasto(this.gasto.id);
    BorradoZonasGasto();
    repintar()
  }
  this.setGasto= function(objgasto){
    this.gasto=objgasto;
  }
  this.getGasto=function(){
    return this.gasto;
  }

  
}
/*===========================================*/

/*********************************************/
/*    FUNCION HANDLER EVENT                  */
/*===========================================*/
function EditarHandle(){

  this.gasto=undefined;

  this.handleEvent= function(event){
    this.modificarPropiedadesGasto();
    BorradoZonasGasto();
    repintar();
  }

  this.modificarPropiedadesGasto= function (){

    let descripcion=prompt("Introduzca descripción: ", this.gasto.descripcion);
    let valor = Number(prompt("Introduzca valor del gasto: ", this.gasto.valor));
    while ( isNaN(valor) ){
      valor = Number(prompt("Tiene que introducir un decimal: ", this.gasto.valor));
    }
    let fecha_gasto=prompt("Introduzca la fecha del gasto ", formatearFecha(this.gasto.fecha));
    let etiquetas=prompt("Insertar etiquetas (Puede insertar varias separadas por ,) :", this.gasto.etiquetas).split(',');

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha_gasto);
    this.gasto.etiquetas=[...etiquetas];
  
  }

  this.setGastoNuevo= function (objgasto){
    this.gasto=objgasto;
  }

  this.getGastoNuevo= function (){
    return this.gasto;
  }

}
/*===========================================*/


/*********************************************/
/*    FUNCION HANDLER EVENT BORRAR ETIQUETA  */
/*===========================================*/
function BorrarEtiquetasHandel(){
  this.gasto=undefined;

  this.handleEvent = function(event){
    console.log(event.currentTarget.outerText);
    let etiqueta=event.currentTarget.outerText;
    this.gasto.borrarEtiquetas(etiqueta);
    BorradoZonasGasto();
    repintar();
  }

  this.setGastoNuevo=function (objgasto){
    this.gasto=objgasto;
  }

  this.getGasto=function (){
    return this.gasto;
  }

}
/*===========================================*/



/*********************************************/
/*    FUNCION FORMATEAR FECHA                */
/*===========================================*/
function formatearFecha(fecha){
  return  new Date(fecha).toISOString().substr(0,10);
}
/*===========================================*/




/*********************************************/
/*    FUNCION REPINTAR                       */
/*===========================================*/
function repintar(){
  mostrarDatoEnId('presupuesto', oprcpre.mostrarPresupuesto());
  mostrarDatoEnId('gastos-totales',oprcpre.calcularTotalGastos());
  mostrarDatoEnId('balance-total',oprcpre.calcularBalance());
  for ( let gasto of oprcpre.listarGastos() ){
    mostrarGastoWeb('listado-gastos-completo',gasto);
  }
}
/*===========================================*/


/*********************************************/
/*    FUNCION CLEARELEMENT                   */
/*===========================================*/
function clearElement(idElemento){
  document.getElementById(idElemento).innerHTML='';
}
/*===========================================*/



/*********************************************/
/*    FUNCION BORRADOZONASGASTO              */
/*===========================================*/
function BorradoZonasGasto(){
  clearElement('presupuesto');
  clearElement('gastos-totales');
  clearElement('balance-total');
  clearElement('listado-gastos-completo');
}
/*===========================================*/
export {mostrarDatoEnId,
        mostrarGastoWeb, 
  mostrarGastosAgrupadosWeb,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  repintar};
