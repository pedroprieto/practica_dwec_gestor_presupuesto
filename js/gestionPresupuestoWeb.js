import * as oprcpre from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
  document.getElementById(idElemento).append(valor);
}

function mostrarGastoWeb(idElemento, objgasto){
  let div_gasto=document.createElement('div');
  let div_gasto_etiquetas=create_element('div','class','gasto-etiquetas','');
  div_gasto.setAttribute('class','gasto');
  div_gasto.append(create_element('div','class','gasto-descripcion',objgasto.descripcion));
  div_gasto.append(create_element('div','class','gasto-fecha',objgasto.fecha));
  div_gasto.append(create_element('div','class','gasto-valor',objgasto.valor));
  if (objgasto.etiquetas){
    for ( let etiqueta of objgasto.etiquetas){
      div_gasto_etiquetas.append(create_element('span','class','gasto-etiquetas-etiqueta',etiqueta));
    }
  }
  div_gasto.append(div_gasto_etiquetas);
  document.getElementById(idElemento).append(div_gasto);
}

function mostrarGastosAgrupadosWeb(idElemento, arr_agrup, periodo){
  let div_agrup=create_element('div','class','agrupacion','');
  let htitulo=document.createElement('h1');
  htitulo.innerHTML=`Gastos agrupados por ${periodo}`;
  div_agrup.append(htitulo);
  let key_value_group=Object.entries(arr_agrup);
  key_value_group.map ( (gasto) => {
    console.log(gasto);
    let div_agrupacion_dato=create_element('div','class','agrupacion-dato','')
    div_agrupacion_dato.append( create_element('span','class','agrupacion-dato-clave',gasto[0]));
    div_agrupacion_dato.append( create_element('span','class','agrupacion-dato-valor',gasto[1]));
    div_agrup.append(div_agrupacion_dato) });
  document.getElementById(idElemento).append(div_agrup);
}

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
  BorradoZonasGasto();
  oprcpre.actualizarPresupuesto(valor_presupuesto);
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
  oprcpre.anyadirGasto(new oprcpre.CrearGasto(descripcion,valor,fecha_gasto,etiquetas)); 
  BorradoZonasGasto();
  repintar();
}
/*===========================================*/




/*********************************************/
/*    FUNCION REPINTAR                       */
/*===========================================*/
function repintar(){
  mostrarDatoEnId('presupuesto', oprcpre.mostrarPresupuesto());
  mostrarDatoEnId('gastos-totales',oprcpre.calcularTotalGastos());
  mostrarDatoEnId('balance-total',oprcpre.calcularBalance());
  for ( let gasto of oprcpre.filtrarGastos({}) ){
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
