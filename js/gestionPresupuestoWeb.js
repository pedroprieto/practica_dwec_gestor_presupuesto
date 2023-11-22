
function mostrarDatoEnId(idElemento, valor) {

    //obtengo el elemento HTML por su id
    let elemento = document.getElementById(idElemento);
    //propiedad texto visible dentro del elemento. Reemplazo el contexto de texto actual del elemento con el valor.
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    
    //creo elemento div con la clase gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    //creo elemento div con la clase gasto-descripcion

    let divDesc =  document.createElement("div");
    divDesc.className = "gasto-descripcion";
    //con el innetText asigno el valor de la descripcion del gasto al div
    divDesc.innerText = gasto.descripcion; 

    //creo elemento div con la clase gasto-fecha
    let divfecha = document.createElement("div");
    divfecha.className = "gasto-fecha";
    //con el innetText asigno el valor de fecha al contenido del div
    divfecha.innerText = new Date(gasto.fecha).toLocaleDateString(); //convierte la fecha del objeto date en una cadena de texto, se representa en formato de fecha local 

    //creo div con la clase gasto-valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    //con el innetText le asigno el valor dle gasto al contenido del div
    divValor.innerText = gasto.valor;

    //creo div con la clase "gasto-etiqueta"
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";


    // Itero sobre las etiquetas y crear elementos span para ellas
    for (let etiqueta of gasto.etiquetas) {
      let spanEtiqueta = document.createElement("span");
      spanEtiqueta.className = "gasto-etiquetas-etiqueta";
      spanEtiqueta.innerText = etiqueta;

      // Añado el elemento span al div de etiquetas
      divEtiquetas.appendChild(spanEtiqueta);
    }

    //Añado los elementos creados "createElement" al div principal gasto
    divGasto.appendChild(divDesc);
    divGasto.appendChild(divfecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);

  // Obtengo el contenedor por su ID
  let contenedor = document.getElementById(idElemento);
  contenedor.appendChild(divGasto); //añado el div del gasto 


}

function mostrarGastoAgrupadosWeb(idElemento, agrup, periodo) {


  //creo el elemento div para agrup
  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";

  let periodo_texto = "mes";
  if (periodo == "dia") {
    periodo_texto = "día";
  } else if (periodo == "anyo") {
    periodo_texto = "año";
  }

  let h1Periodo = document.createElement("h1");
  h1Periodo.innerText = `Gastos agrupados por ${periodo_texto}`;
  

  //añado elmentos creados al div agrup
  divAgrupacion.appendChild(h1Periodo);
  
  //recorro las (clave)propiedades del objeto agrup
  for (let clave in agrup) {
    //creo un div para cada propiedad
    let divDato = document.createElement("div");
    divDato.className = "agrupacion-dato";
    divAgrupacion.appendChild(divDato); //agrupacion-dato es el hijo de divAgrupacion(padre)

    //creo un span agrupacion-dato clave
    let spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.innerText = clave; //lo relleno con la clave
    divDato.appendChild(spanClave); //añado los spans al div datos

    //creo un span para agrupacion-dato-valor
    let spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.innerText = agrup[clave]; //ya que un objeto almacena relaciones (clave-valor)
    divDato.appendChild(spanValor);

  }

  //busco el elemento idElemento y me lo devuelve 
  let element = document.getElementById(idElemento);
  element.appendChild(divAgrupacion); 
}



export{
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastoAgrupadosWeb,

}


