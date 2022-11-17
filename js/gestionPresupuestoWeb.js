import * as gestionPre from './gestionPresupuesto.js';

// función mostrarDatoEnId
function mostrarDatoEnId(idElemento, valor){
    let mostrarDato = document.getElementById(idElemento);
    mostrarDato.innerText = valor;
}

//función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto){

    let contenedor = document.getElementById(idElemento);

  //<div class="gasto">
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
      let divDescripcion = document.createElement('div');
      divDescripcion.className = "gasto-descripcion";
      divDescripcion.innerText = gasto.descripcion;

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
      let divFecha = document.createElement('div');
      divFecha.className = "gasto-fecha";
      divFecha.innerText = gasto.fecha;

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
      let divValor = document.createElement('div');
      divValor.className = "gasto-valor";
      divValor.innerText = gasto.valor;

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
          let spanEtiqueta = document.createElement('span');
          spanEtiqueta.className = "gasto-etiquetas-etiqueta";
          spanEtiqueta.innerHTML = `${e}`;

          divEtiquetas.append(spanEtiqueta);
        }
    //Añado todo al documento
    contenedor.append(divGasto);

    //Modificación de la función mostrarGastoWeb
        //Botón editar
        //Botón borrar
        //Eventos para los span de etiquetas
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  
    var divAgrup = document.getElementById(idElemento);
    divAgrup.innerHTML = "";
        
        let arrayAgrupacion = "";

        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }

        divAgrup.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;
}

function repintar(){
  //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
  mostrarDatoEnId( "presupuesto", gestionPre.mostrarPresupuesto() );

  //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
  mostrarDatoEnId( "gastos-totales", gestionPre.calcularTotalGastos() );

  //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
  mostrarDatoEnId( "balance-total", gestionPre.calcularBalance() );

  //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
  document.getElementById( "listado-gastos-completo" ).innerHTML="";

  //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  let gastos = gestionPre.listarGastos();
  for ( let gasto of gastos){
    mostrarGastoWeb ("listado-gastos-completo", gasto);
  }
}

function actualizarPresupuestoWeb(){

}

//botón actualizarpresupuesto
//element.addEventListener(event, handler, [options]);

function nuevoGastoWeb(){

}

//Botón anyadirgasto

function EditarHandle(){
//método llamado handleEvent
}

function BorrarHandle(){

}

function BorrarEtiquetasHandle(){

}


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 
//CCC