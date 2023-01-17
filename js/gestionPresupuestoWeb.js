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
  
  let handler_button_borrar_Api=new BorrarHandleApi();
  handler_button_borrar_Api.gasto=objgasto;
  
  let handler_etiquetas=new BorrarEtiquetasHandel();
  handler_etiquetas.gasto=objgasto;

  for ( let span of  div_gasto_etiquetas.childNodes){
      span.addEventListener('click',handler_etiquetas); 
  }

  let handler_button_editar_formulario=new EditarHandleFormulario();
  handler_button_editar_formulario.gasto=objgasto;

  let button_editar=createButton('gasto-editar','Editar');
  button_editar.addEventListener('click',handler_button_editar);
  let button_borrar=createButton('gasto-borrar','Borrar');
  button_borrar.addEventListener('click', handler_button_borrar);
  let button_borrarApi=createButton('gasto-borrar-api','Borrar Api');
  button_borrarApi.addEventListener('click', handler_button_borrar_Api);
  let button_editar_formulario=createButton('gasto-editar-formulario', 'Edit Form');
  button_editar_formulario.addEventListener('click', handler_button_editar_formulario);

  div_gasto.append(div_gasto_etiquetas);
  div_gasto.append(button_editar);
  div_gasto.append(button_borrar);
  div_gasto.append(button_borrarApi);
  div_gasto.append(button_editar_formulario);
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
  var divP=document.getElementById(idElemento);
  divP.innerHTML="";
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
  divP.style.width = "33%";
  divP.style.display = "inline-block";
  // Crear elemento <canvas> necesario para crear la gráfica
  // https://www.chartjs.org/docs/latest/getting-started/
  let chart = document.createElement("canvas");
  // Variable para indicar a la gráfica el período temporal del eje X
  // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
  let unit = "";
  switch (periodo) {
  case "anyo":
      unit = "year";
      break;
  case "mes":
      unit = "month";
      break;
  case "dia":
  default:
      unit = "day";
      break;
  }

  // Creación de la gráfica
  // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
  const myChart = new Chart(chart.getContext("2d"), {
      // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
      type: 'bar',
      data: {
          datasets: [
              {
                  // Título de la gráfica
                  label: `Gastos por ${periodo}`,
                  // Color de fondo
                  backgroundColor: "#555555",
                  // Datos de la gráfica
                  // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                  data: arr_agrup
              }
          ],
      },
      options: {
          scales: {
              x: {
                  // El eje X es de tipo temporal
                  type: 'time',
                  time: {
                      // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                      unit: unit
                  }
              },
              y: {
                  // Para que el eje Y empieza en 0
                  beginAtZero: true
              }
          }
      }
  });
  // Añadimos la gráfica a la capa
  divP.append(chart);
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
/*    FUNCION NUEVO GASTO WEB FORMULARIO     */
/*===========================================*/
function nuevoGastoWebFormulario(event){
  //if ( document.getElementById('controlesprincipales').contains(document.querySelector('form') ))
    //document.getElementById('controlesprincipales').querySelector('form').remove();
  let button=undefined;
  let button_api=undefined;
  document.getElementById('anyadirgasto-formulario').disabled=true;
  let plantillaformulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario=plantillaformulario.querySelector("form");
  document.getElementById('controlesprincipales').append(plantillaformulario);
  formulario.addEventListener('submit', CrearGastoForm);
  button=formulario.querySelector('button.cancelar');
  button_api=formulario.querySelector('button.gasto-enviar-api');
  button_api.addEventListener('click',CrearNuevoGastoFromFormToApi);

  let handle_button_cancelar=new ButtonHandlerCancelar();
  handle_button_cancelar.form=formulario;
  button.addEventListener('click', handle_button_cancelar);
  
}
/*===========================================*/

/*********************************************/
/*    FUNCION NUEVO GASTO FORMULARIO - API   */
/*===========================================*/
async function CrearNuevoGastoFromFormToApi(event){
  let user_name= document.getElementById('nombre_usuario').value;
  let user=ValidateNameUser(user_name); 
  let url='https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + user;
  let gasto=GetNuevoGastoForApi(event);
  console.log(gasto);
  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type':'application/json;charset=utf-8' },
    body: JSON.stringify(gasto)
  }).then(cargarGastosApi()).catch(err => console.log("ERROR CONSULTA: " + err));
}
/*===========================================*/

/*********************************************/
/*    FUNCION NUEVO GASTO PARA API           */
/*===========================================*/
function GetNuevoGastoForApi(event){
  let descripcion = document.getElementById('descripcion').value;
  let valor =Number(document.getElementById('valor').value);
  let fecha_gasto=document.getElementById('fecha').value;
  let etiquetas=document.getElementById('etiquetas').value.split(',');
  return new oprcpre.CrearGasto(descripcion,valor,fecha_gasto,...etiquetas);
}
/*===========================================*/




/*********************************************/
/*    FUNCION  VALIDAR ENTRADA USUARIO       */
/*===========================================*/
function ValidateNameUser(name_user){
  let default_user="luisgilabert";
  if (name_user){
    default_user=name_user;
  }
  else{
    alert("Hola. Olvidaste colocar el nombre del usuario en la entrada de datos\n " +
          " Dejaremos un usuario por defecto si deseas cambiarlo puedes hacerlo en cualquier momento");
    document.getElementById('nombre_usuario').value=default_user;    
  }
  return default_user;
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
    repintar();
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
/*    FUNCION HANDLER EVENT  BORRAR          */
/*===========================================*/
function BorrarHandleApi(){
  this.gasto=undefined;
  this.handleEvent=function(event){
    this.BorrarGastoApiById();
  }
  this.setGasto= function(objgasto){
    this.gasto=objgasto;
  }

  this.getGasto=function(){
    return this.gasto;
  }

  this.BorrarGastoApiById= async function(){
    let user_name= document.getElementById('nombre_usuario').value;
    let user=ValidateNameUser(user_name) + `/${this.gasto.gastoid}`;
    let url='https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + user;
    console.log(url);
    let response = await fetch(url,{
      method: 'DELETE',
      headers: {'Content-Type':'application/json;charset=utf-8' }
    }).then( cargarGastosApi()).catch(err => console.log("ERROR CONSULTA: " +  err));
  }
}


/*===========================================*/



/*********************************************/
/*    FUNCION GUARDARGASTOSWEB               */
/*===========================================*/
function guardarGastosWeb(){
  let gastos_save_file=oprcpre.listarGastos();
  localStorage.GestorGastosDWEC = JSON.stringify(gastos_save_file);
}
/*===========================================*/


/*********************************************/
/*    FUNCION GUARDARGASTOSWEB               */
/*===========================================*/
function cargarGastosWeb(){
  try{
    let gastos_from_storage=JSON.parse(localStorage.GestorGastosDWEC);
    oprcpre.cargarGastos(gastos_from_storage);
    repintar();
  }
  catch(err){
    oprcpre.cargarGastos([]);
    console.log(err.message);
    BorradoZonasGasto();
    repintar();
  }
}
/*===========================================*/




/*********************************************/
/*    FUNCION HANDLER EDITAR FORM            */
/*===========================================*/
function EditarHandleFormulario(){
  this.gasto=undefined;
  this.plantillaformulario= document.getElementById("formulario-template").content.cloneNode(true);
  this.formulario=this.plantillaformulario.querySelector("form");

  this.handleEvent = function (event){
    this.showFormEdit(event);
  }

  this.showFormEdit= function (event){
    if ( this.formulario.hidden )
      this.formulario.hidden = false;
    this.valuesFormEdit();
    //document.getElementById("controlesprincipales").append(this.plantillaformulario);
    event.currentTarget.parentElement.append(this.plantillaformulario);
    event.currentTarget.disabled=true;
    this.cancelForm(event);
    this.submitForm(event);
    this.PressButtonForUpdateGastoApi(event);
    console.log(event.currentTarget);
  }

  
  this.valuesFormEdit= function (){
    this.formulario.descripcion.value=this.gasto.descripcion;
    this.formulario.valor.value=this.gasto.valor;
    this.formulario.fecha.value=formatearFecha(this.gasto.fecha);
    this.formulario.etiquetas.value=this.gasto.etiquetas;
  }
  
  this.cancelForm = function (event){
    let handle_button_cancelar=new ButtonHandlerCancelar();
    let button=this.formulario.querySelector('button.cancelar');
    handle_button_cancelar.form_hide=this.formulario;
    handle_button_cancelar.button_parent_event=event.currentTarget;
    button.addEventListener('click', handle_button_cancelar);
  }

  this.submitForm = function(event){
    let submit_handle_form=new UpdateHandlerFormulario();
    submit_handle_form.gasto=this.gasto;
    submit_handle_form.formulario=this.formulario;
    this.formulario.addEventListener('submit', submit_handle_form);
  }

  this.PressButtonForUpdateGastoApi = function(event){
    let update_api_handle_form=new UpdateHandlerFormApi();
    update_api_handle_form.gasto=this.gasto;
    update_api_handle_form.formulario=this.formulario;
    let button=this.formulario.querySelector('button.gasto-enviar-api');
    button.addEventListener('click',update_api_handle_form);
  }
  
}
/*===========================================*/



/*********************************************/
/*    FUNCION HANDLER UPDATE FORM            */
/*===========================================*/
function UpdateHandlerFormulario(){
  this.gasto=undefined;
  this.formulario=undefined;

  this.handleEvent = function (event){
    this.editForm();
    BorradoZonasGasto();
    repintar();
    event.preventDefault();
    this.formulario.hidden=true;
  }
  
  
  this.editForm = function (event){
    let descripcion = this.formulario.descripcion.value;
    let valor = Number(this.formulario.valor.value);
    let fecha_gasto=this.formulario.fecha.value;
    let etiquetas=this.formulario.etiquetas.value.split(',');
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha_gasto);
    this.gasto.etiquetas=[...etiquetas];
  }
}
/*===========================================*/




/*********************************************/
/*    FUNCION HANDLER UPDATE FORM            */
/*===========================================*/
function UpdateHandlerFormApi(){
  this.gasto=undefined;
  this.formulario=undefined;

  this.handleEvent = function (event){
    this.editForm();
    this.UpdateGastoFromApi();
    if( this.formulario !=  undefined )
      this.formulario.hidden=true;
    event.preventDefault();
  }

  this.editForm = function (event){
    let descripcion = this.formulario.descripcion.value;
    let valor = Number(this.formulario.valor.value);
    let fecha_gasto=this.formulario.fecha.value;
    let etiquetas=this.formulario.etiquetas.value.split(',');
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha_gasto);
    this.gasto.etiquetas=[...etiquetas];
  }

  this.UpdateGastoFromApi= async function(){
    let user_name= document.getElementById('nombre_usuario').value;
    let user=ValidateNameUser(user_name) + `/${this.gasto.gastoid}`;
    let url='https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + user;
    let response = await fetch(url, { method: 'PUT', headers: { 'Content-Type':'application/json;charset=utf-8' },
      body: JSON.stringify(this.gasto)
    }).then(cargarGastosApi()).catch(err => console.log("ERROR CONSULTA: " + err));
    
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
/*    FUNCION HANDLER BUTTON CANCELAR        */
/*===========================================*/
function ButtonHandlerCancelar(){
  this.form=undefined;
  this.form_hide=undefined;
  this.button_parent_event=undefined;

  this.handleEvent = function (event){
    if ( this.form != undefined )
    this.form.remove();
    if ( this.form_hide != undefined )
    this.form_hide.hidden=true;
    document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
    if ( this.button_parent_event != undefined )
      this.button_parent_event.disabled=false;
  }
}
/*===========================================*/





/*********************************************/
/*    FUNCION HANDLER EVENT CREAR GASTO FORM */
/*===========================================*/
function CrearGastoForm(event){
  let descripcion = event.currentTarget.descripcion.value;
  let valor = Number(event.currentTarget.valor.value);
  let fecha_gasto=event.currentTarget.fecha.value;
  let etiquetas=event.currentTarget.etiquetas.value.split(',');
  oprcpre.anyadirGasto(new oprcpre.CrearGasto(descripcion,valor,fecha_gasto,...etiquetas)); 
  document.getElementById('presupuesto').innerHTML='';
  document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
  if ( document.getElementById('controlesprincipales').contains(document.querySelector('form') ))
    document.getElementById('controlesprincipales').querySelector('form').remove();
  BorradoZonasGasto();
  repintar();  
  event.preventDefault();
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
/*    FUNCION FILTARGASTOWEB                 */
/*===========================================*/
function filtrarGastosWeb(event){
  let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
  let valor_minimo = document.getElementById("formulario-filtrado-valor-minimo").value;
  let valor_maximo = document.getElementById("formulario-filtrado-valor-maximo").value;
  let fecha_desde = document.getElementById("formulario-filtrado-fecha-desde").value;
  let fecha_hasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
  let etiquetas_tiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
  let opciones=[];
  if ( etiquetas_tiene ){
    opciones = oprcpre.transformarListadoEtiquetas(etiquetas_tiene);
  } 
  let gasto = {};
  if ( descripcion !== "")
    gasto.descripcionContiene= descripcion;
  if ( valor_minimo !== "")
    gasto.valorMinimo=valor_minimo;
  if ( valor_maximo !== "")
    gasto.valorMaximo=valor_maximo;
  if ( fecha_desde !== "")
    gasto.fechaDesde = fecha_desde;
  if ( fecha_hasta !== "")
    gasto.fechaHasta = fecha_hasta;
  if ( etiquetas_tiene !== "")
    gasto.etiquetasTiene = opciones;
  console.log("gasto: " + gasto.valorMinimo);
  console.log("gasto maximo: " + gasto.valorMaximo);
  BorradoZonasGasto();
  let total_gastos=oprcpre.filtrarGastos(gasto);
  console.log(total_gastos);
  for (let gasto of total_gastos)
    mostrarGastoWeb('listado-gastos-completo',gasto);
  
  event.preventDefault();
}
/*===========================================*/



/*********************************************/
/*    FUNCION REPINTAR                       */
/*===========================================*/
function repintar(){
 // console.log(oprcpre.gastos);
 // console.log(oprcpre.calcularTotalGastos());
 // console.log(oprcpre.calcularBalance());
  mostrarDatoEnId('presupuesto', oprcpre.mostrarPresupuesto());
  mostrarDatoEnId('gastos-totales',oprcpre.calcularTotalGastos());
  mostrarDatoEnId('balance-total',oprcpre.calcularBalance());
  for ( let gasto of oprcpre.listarGastos() ){
    mostrarGastoWeb('listado-gastos-completo',gasto);
  }
}
/*===========================================*/




/*********************************************/
/*    FUNCION CARGARGASTOAPI*/
/*===========================================*/
async function cargarGastosApi(){
  let user_name= document.getElementById('nombre_usuario').value;
  let user=ValidateNameUser(user_name); 
  console.log("Usuario " + user)
  let url='https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/' + user;
  let response = await fetch(url,{
    method:'GET',
    headers: { 'Content-Type': 'application/json;charset=utf-8'}
  }).catch(err => console.log("ERROR CONSULTA: " + err));
  let gastos = await response.json();
  console.log(gastos);
  oprcpre.cargarGastos(gastos);
  BorradoZonasGasto();
  repintar();
  console.log("----------------------------------------------------------");
  
}

/*===========================================*/



/*********************************************/
/*    FUNCION CLEARELEMENT                   */
/*===========================================*/
function clearElement(idElemento){
  document.getElementById(idElemento).innerHTML='';
}
/*===========================================*/

function BorrarValueInput(event){
  event.currentTarget.descripcion.value='';
  event.currentTarget.valor.value='';
  event.currentTarget.fecha.value='';
  event.currentTarget.etiquetas.value='';
  event.currentTarget.descripcion.value='';
}



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
  nuevoGastoWebFormulario,
  CrearGastoForm,
  filtrarGastosWeb,
  guardarGastosWeb,
  cargarGastosWeb,
  cargarGastosApi,
  repintar};
