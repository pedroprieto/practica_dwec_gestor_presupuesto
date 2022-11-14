import * as gestionPresupuesto from './gestionPresupuesto';

// función mostrarDatoEnId
function mostrarDatoEnId(idElemento, valor){
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto.innerHTML = `${valor}`;
}

//función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto){

    let body = document.getElementById(idElemento);

  //<div class="gasto">
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
      let divDescripcion = document.createElement('div');
      divDescripcion.className = "gasto-descripcion";
      divDescripcion.innerHTML = `${gasto.descripcion}`;

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
      let divFecha = document.createElement('div');
      divFecha.className = "gasto-fecha";
      divFecha.innerHTML = `${gasto.fecha}`;

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
      let divValor = document.createElement('div');
      divValor.className = "gasto-valor";
      divValor.innerHTML = `${gasto.valor}`;

    //<div class="gasto-etiquetas">
      let divEtiquetas = document.createElement('div');
      divEtiquetas.className = "gasto-etiquetas";

     // Añadir hijos al padre <div class="gasto">
     divGasto.append(divDescripcion);
     divGasto.append(divFecha);
     divGasto.append(divValor);
     divGasto.append(divEtiquetas);


        //<span class="gasto-etiquetas-etiqueta">ETIQUETA 1</span>
        //<span class="gasto-etiquetas-etiqueta">ETIQUETA 2</span>
    
        for (let e of gasto.etiquetas) {
          let spanEtiqueta = document.createElement("span");
          spanEtiqueta.className = "gasto-etiquetas-etiqueta";
          spanEtiqueta.innerHTML = `${e}`;

          divEtiquetas.append(spanEtiqueta);
        }
    //Añado todo al documento
    body.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
  let mostrarAgrupacion = document.getElementById(idElemento);

  /*<div class="agrupacion">
  <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
       de la función es "mes", "dia" o "anyo" respectivamente -->
  <h1>Gastos agrupados por PERIODO</h1>*/
  let divAgrup = document.createElement('div');
  divAgrup.className = "agrupación";
  divAgrup.innerHTML = "";

  let arrayAgrupacion = "";

  divAgrup.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;
  

  /*Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:
       https://es.javascript.info/keys-values-entries#object-keys-values-entries -->
       
  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>

  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>
</div>*/
  for( let [nombre, valor] of Object.entries( agrup ) ){
    arrayAgrupacion += `
      <div class="agrupacion-dato">
          <span class="agrupacion-dato-clave">${nombre}</span>
          <span class="agrupacion-dato-valor">${valor}</span>
      </div>
    `;
  }
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 
//CCC