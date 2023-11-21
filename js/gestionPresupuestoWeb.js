
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
    divfecha.innerText = gasto.fecha;

    //creo div con la clase gasto-valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    //con el innetText le asigno el valor dle gasto al contenido del div
    divValor.innerText = gasto.valor;

    //creo div con la clase "gasto-etiqueta"
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    //añado descripcion al gasto
    divGasto.appendChild(divDes);

    // Itero sobre las etiquetas y crear elementos span para ellas
    for (let etiqueta of gasto.etiquetas) {
      let spanEtiqueta = document.createElement("span");
      spanEtiqueta.className = "gasto-etiquetas-etiqueta";
      spanEtiqueta.innerText = etiqueta;

      // Añado el elemento span al div de etiquetas
      divEtiquetas.appendChild(spanEtiqueta);
    }

    //Añado los elementos creados "createElement" al div ppal gasto
    divGasto.appendChild(divDesc);
    divGasto.appendChild(divfecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);


    // Añadir el div de etiquetas al gasto
    divGasto.appendChild(divEtiquetas);
  

  // Obtengo el contenedor por su ID
  let contenedor = document.getElementById(idElemento);
  contenedor.appendChild(divGasto); //añado el div del gasto 


}



















export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}