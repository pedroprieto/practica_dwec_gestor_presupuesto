
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

function create_element( element, attribute, attribute_value, text){
  let elemnt=document.createElement(element);
  elemnt.setAttribute(attribute,attribute_value);
  elemnt.innerHTML=text;
  return elemnt;
}

export {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb};
