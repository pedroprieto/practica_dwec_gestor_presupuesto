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

        //Modificación de la función mostrarGastoWeb
        //Botón editar
          //Crear un botón con texto Editar de tipo button (<button type="button">) con clase gasto-editar.
          let botonEditar = document.createElement( 'button' );
          botonEditar.className = "gasto-editar";
          botonEditar.type = "button";
          botonEditar.innerHTML = "Editar gasto";

          //Crear un nuevo objeto a partir de la función constructora EditarHandle.
          let eventEditar = new EditarHandle();

          //Establecer la propiedad gasto del objeto creado al objeto gasto
          eventEditar.gasto = gasto;

          //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
          botonEditar.addEventListener( "click", eventEditar );

          //Añadir el botón al DOM a continuación de las etiquetas
          divGasto.append( botonEditar );

        //Botón borrar
          //Crear un botón con texto Borrar de tipo button (<button type="button">) con clase gasto-borrar.
        
        //Eventos para los span de etiquetas

    //Añado todo al documento
    contenedor.append(divGasto);
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

  //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
  document.getElementById( "listado-gastos-completo" ).innerHTML= '';

  //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  let gastos = gestionPre.listarGastos();
  for ( let gasto of gastos){
    mostrarGastoWeb ("listado-gastos-completo", gasto);
  }
}

function actualizarPresupuestoWeb(){
  //Pedir al usuario que introduzca un presupuesto mediante un prompt.
  //para que las indicaciones se vean bien en IE, recomendamos siempre proporcionar el segundo argumento:
  let presupuestoUsuario = prompt( 'Introduzca un presupuesto', '');

  //Convertir el valor a número (recuerda que prompt siempre devuelve un string)..
  let presupuestoNumero = parseInt( presupuestoUsuario);

  //Actualicar el presupuesto (función actualizarPresupuesto)
  gestionPre.actualizarPresupuesto( presupuestoNumero );

  //Llamar a la función repintar para que se muestre la información actualizada en el archivo HTML. 
  repintar();
}

//botón actualizarpresupuesto
//document.getElementById(id) + element.addEventListener(event, handler, [options]);
document.getElementById( "actualizarpresupuesto" ).addEventListener( "click", actualizarPresupuestoWeb() );

function nuevoGastoWeb(){
  //Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt (por orden: descripción, valor, fecha y etiquetas). 
  let desc = prompt( "Introduzca una descripción", "" );
  let valorUsuario = prompt( "Introduzca un valor", "" );
  let fecha = prompt( "Introduzca una fecha con formato aaaa/mm/dd", "" );
  let etiquetasUsuario = prompt( "Introduzca unas etiquetas separadas por comas", "" );

  let valorNumero = parseFloat( valorUsuario );

  let arrayEtiquetas = etiquetasUsuario.split(', ');

  //Crear un nuevo gasto (función crearGasto)
  let gasto = new gestionPre.CrearGasto( desc, valorNumero, fecha, ...arrayEtiquetas );

  //Añadir el gasto a la lista (función anyadirGasto).
  gestionPre.anyadirGasto( gasto );

  //Llamar a la función repintar
  repintar;
}

//botón anyadirgasto
document.getElementById( "anyadirgasto" ).addEventListener( "click", nuevoGastoWeb() );

function EditarHandle(){
  //método llamado handleEvent
  this.handleEvent = function(){

     //Pedir al usuario la información necesaria para editar el gasto mediante sucesivas preguntas con prompt. 
     let desc = prompt( "Introduzca una descripción", this.gasto.descripcion );
     let valor = prompt( "Introduzca un valor", this.gasto.valor );
     let fecha = prompt( "Introduzca una fecha con formato aaaa/mm/dd", this.gasto.fecha );
     let etiquetas = prompt( "Introduzca unas etiquetas separadas por comas", this.gasto.etiquetas );
   
     valor = parseFloat( valor );
   
     etiquetas = etiquetas.split(', ');

     //Actualizar las propiedades del gasto (disponible mediante this.gasto)
     this.gasto.actualizarDescripción( desc );
     this.gasto.actualizaValor( valor );
     this.gasto.actualizarFecha( fecha );
     this.gasto.anyadirEtiquetas( ...etiquetas );

     //Llamar a la función repintar
     repintar();
  }
}

function BorrarHandle(){
  //método llamado handleEvent
  this.handleEvent = function(){

    //Borrar el gasto asociado
    gestionPre.borrarGasto( this.gasto.id );

    //Llamar a la función repintar
    repintar();
  }

}

function BorrarEtiquetasHandle(){
  //un método llamado handleEvent
  this.handleEvent = function(){

      //Borrar la etiqueta seleccionada del gasto asociado
    this.gasto.borrarEtiquetas(this.etiqueta);

      //Llamar a la función repintar
      repintar();
  }
}


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 
//CCC