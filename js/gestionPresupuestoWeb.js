console.log("gestionPresupuestoWeb")

// Importaciones de modulos
import * as gestorPresu from '/js/gestionPresupuesto.js';


//Texto
function mostrarDatoEnId(id, valor){
    document.getElementById(id).innerText = valor;
}

//HTML
function mostrarGastoWeb(idElement, gasto){

    let elementObjetive = document.getElementById(idElement);

    //PARA CREA UN ELEMENTO DIV
    let divGasto = document.createElement('div');
    let divGasDescripcion = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor =  document.createElement('div');
    let divGasEtiquetas =  document.createElement('div')
    
    //Para ponerle clase a ese elemento
    divGasto.className = "gasto"

    divGasDescripcion.className = "gasto-descripcion"
    divGasDescripcion.innerText = gasto.descripcion

    let fechaCorta = new Date(gasto.fecha).toLocaleDateString()
    divGasFecha.className = "gasto-fecha"
    divGasFecha.innerText = fechaCorta
    
    divGasValor.className = "gasto-valor"
    divGasValor.innerText = gasto.valor
    
    divGasEtiquetas.className = "gasto-etiquetas"

    divGasto.append(divGasDescripcion)
    divGasto.append(divGasFecha)
    divGasto.append(divGasValor)
    divGasto.append(divGasEtiquetas)
   
    elementObjetive.append(divGasto)

   
    for(let etiqueta of gasto.etiquetas){
        let divEtiqueta =  document.createElement('span')
        divEtiqueta.className="gasto-etiquetas-etiqueta"
        divEtiqueta.append(`${etiqueta},`)
       

        let borrarEtiquetas =  new BorrarEtiquetasHandle();

        borrarEtiquetas.gasto = gasto;

        borrarEtiquetas.etiqueta = etiqueta;

        divEtiqueta.addEventListener("click", borrarEtiquetas);

        divGasEtiquetas.append(divEtiqueta)
    }

    //Boton editar 

    let botoneditar = document.createElement('button')
    botoneditar.className = 'gasto-editar'
    botoneditar.type = 'button'
    botoneditar.innerText = 'Editar '

    let editar = new EditarHandle()
    editar.gasto = gasto;

    botoneditar.addEventListener('click', editar)

    divGasto.append(botoneditar)

    //Boton borrar

    let botonBorrar = document.createElement('button')
    botonBorrar.className = 'gasto-borrar'
    botonBorrar.type = 'button'
    botonBorrar.innerText = 'Borrar '

    let borrar = new BorrarHandle()

    borrar.gasto = gasto

    botonBorrar.addEventListener('click', borrar)

    divGasto.append(botonBorrar)

    let botonEditarForm = document.createElement( "button" );
    botonEditarForm.type = "button";
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.innerHTML = "Editar (formulario)";

    
    let eventEditarForm = new EditarHandleFormulario();

    eventEditarForm.gasto = gasto;

    botonEditarForm.addEventListener( "click", eventEditarForm );

    divGasto.append( botonEditarForm );

 

}

// let gasto = new CrearGasto("2 Compra fruta y verdura", 10, "2021-09-06", "supermercado", "comida" );

// console.log( gasto )

// mostrarGastoWeb('presupuesto', gasto)


function mostrarGastoAgrupadosWeb(id,periodo){

    let elementObjetive = document.getElementById(id)

    let divAgrupacion = document.createElement('div')
    let h1Agruparmes = document.createElement('h1')
 

    divAgrupacion.className = "agrupacion"
    h1Agruparmes.innerText = "Gastos agrupados por " + periodo
    
    divAgrupacion.append(h1Agruparmes)

    elementObjetive.append(divAgrupacion)

    let gastosAgrupados = gestorPresu.agruparGastos(periodo)
 
    for(let [fechaKey, valor] of Object.entries(gastosAgrupados)){

        let divagrupacionDatos = document.createElement('div')
        let divAgrupacionclave =  document.createElement('span')
        let divAgrupacioncvalor =  document.createElement('span')

        divagrupacionDatos.className = "agrupacion-dato"
        divAgrupacionclave.className = "agrupacion-dato-clave"
        divAgrupacioncvalor.className = "agrupacion-dato-valor"
        divAgrupacionclave.append("Fecha: " + fechaKey + " ")
        divAgrupacioncvalor.append("Valor: " + valor + " ")
        divagrupacionDatos.append(divAgrupacionclave)
        divagrupacionDatos.append(divAgrupacioncvalor)
        divAgrupacion.append(divagrupacionDatos)

    }
}

   
function repintar(){

    let mostrarPresupuesto = gestorPresu.mostrarPresupuesto()
    mostrarDatoEnId("presupuesto", mostrarPresupuesto)

    let gastoTotal = gestorPresu.calcularTotalGastos()
    mostrarDatoEnId("gastos-totales", gastoTotal)

    let blanceTotal = gestorPresu.calcularBalance()
    mostrarDatoEnId("balance-total", blanceTotal)

    let divlistadogastocompleto = document.getElementById("listado-gastos-completo")
    divlistadogastocompleto.innerHTML = " "

    let listarGast = gestorPresu.listarGastos()

    for(let gasto of listarGast){

        mostrarGastoWeb("listado-gastos-completo", gasto)

    }
    
} 



function actualizarPresupuestoWeb() {

    let promtpresupuesto = prompt("Introduzca nuevo presupuesto");
    promtpresupuesto = parseFloat(promtpresupuesto);
    let nuevopresupuesto = promtpresupuesto;
    gestorPresu.actualizarPresupuesto(nuevopresupuesto);
    repintar()
}
// Boton actualizarPresupeust
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){

    let promptDescripcion = prompt("Introduzca una Descripcion")
    let promptvalor = prompt("Introduzca un valor")
    let prompFecha = prompt("Introduzca una Fecha")
    let prompEtiquetas = prompt("Introduzca Etiquetas")

    promptvalor = parseFloat(promptvalor);

    let etiqueta =  prompEtiquetas.split(',');
     
    let gasto = new gestorPresu.CrearGasto(promptDescripcion,promptvalor,prompFecha,etiqueta)
    gestorPresu.anyadirGasto(gasto)

    repintar()
}
// Boton AyadirGasto
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb)

function EditarHandle(){
    
    this.handleEvent = function(event){

        let promptDescripcion = prompt("Introduzca una Descripcion")
        let promptvalor = prompt("Introduzca un valor")
        let prompFecha = prompt("Introduzca una Fecha")
        let prompEtiquetas = prompt("Introduzca Etiquetas")
   
        promptvalor = parseFloat(promptvalor);

        let etiqueta =  prompEtiquetas.split(',');


        this.gasto.actualizarDescripcion(promptDescripcion);
        this.gasto.actualizarValor(promptvalor);
        this.gasto.actualizarFecha(prompFecha);
        this.gasto.anyadirEtiquetas(etiqueta);

        repintar();

    }
    
}

function BorrarHandle(){
    
    this.handleEvent = function(event){
        
        gestorPresu.borrarGasto(this.gasto.id)

        repintar()
   
    }
    
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (event)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

////////////
function EditarHandleFormulario(){

    this.handleEvent = function(event){
  
    
      let plantillaForm = document.getElementById('formulario-template').content.cloneNode(true);
  
     
      let form = plantillaForm.querySelector('form');
  
      
      event.currentTarget.after(form);
      let botonEditar = event.currentTarget;
      botonEditar.disabled = true;
        
     
      form.elements.valor.value = this.gasto.valor;
      form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
      form.elements.etiquetas.value = this.gasto.etiquetas;
  
      let Submit = new SubmitEditarHandleForm();
  
      Submit.gasto = this.gasto;

      form.addEventListener('submit', Submit);

       let btnCancelar = form.querySelector( "button.cancelar" );

        btnCancelar.addEventListener( "click", function(event) {
            cancelarAnyadirGasto(event, botonEditar)
        });

    }
  }

function SubmitEditarHandleForm(){
    this.handleEvent = function( event ){

      event.preventDefault();
  
      let form = event.currentTarget;
  
      let ndescripcion = form.elements.descripcion.value;
      let nvalor = form.elements.valor.value;
      let nfecha =  form.elements.fecha.value;
      let netiquetas = form.elements.etiquetas.value;
  
      nvalor = parseFloat(nvalor);
  
      let netiquetasArray = netiquetas.split(',');
  
      this.gasto.actualizarDescripcion(ndescripcion);
      this.gasto.actualizarValor(nvalor);
      this.gasto.actualizarFecha(nfecha);
      this.gasto.anyadirEtiquetas(...netiquetasArray);

      repintar();
    }
  }

  //Función nuevoGastoWebFormulario
function nuevoGastoWebFormulario( event ){
   
    let plantillaFormulario = document.getElementById( "formulario-template" ).content.cloneNode( true );
  
    var formulario = plantillaFormulario.querySelector( "form" );

    formulario.addEventListener( "submit", anyadirElementoFormulario );

    
    var botonCancelarForm = plantillaFormulario.querySelector( "button.cancelar" );
    botonCancelarForm.addEventListener( "click",  function(event){
        let anyadirgasto = document.getElementById("anyadirgasto-formulario")
        cancelarAnyadirGasto(event, anyadirgasto)
    })

    event.currentTarget.disabled = true;

    
    let controles = document.getElementById( "controlesprincipales" );
    controles.append( plantillaFormulario );
  
  }
  //botón anyadirgasto-formulario
let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
botonAnyadirForm.addEventListener( "click", nuevoGastoWebFormulario );


function anyadirElementoFormulario( event ){
    
    event.preventDefault();
  
    let arrayEtiquetas = event.currentTarget.etiquetas.value.split( ", " );
    let valorNumero = parseFloat( event.currentTarget.valor.value );
    let nuevoGastoForm = new gestorPresu.CrearGasto( event.currentTarget.descripcion.value, valorNumero, event.currentTarget.fecha.value, ...arrayEtiquetas );
  
    gestorPresu.anyadirGasto( nuevoGastoForm );
  
    repintar();
  
    let botonAnyadirForm = document.getElementById( "anyadirgasto-formulario" );
    botonAnyadirForm.disabled = false;
  
    event.currentTarget.remove();
  }
 
function cancelarAnyadirGasto(event, botonEditar){

  var botonCancelar = event.currentTarget;
  botonCancelar.disabled = true;
  let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
  botonAnyadirFormulario.disabled = false;
  botonEditar.disabled = false;
  event.currentTarget.parentNode.remove()
}




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,

}
// let gasto0 = new CrearGasto("Seguro coche 1", 10, "2021-08-01", "supermercado", "comida" );
// let gasto1 = new CrearGasto("Seguro coche 2", 15, "2021-09-02", "supermercado", "comida" );
// // let gasto2 = new CrearGasto("Seguro coche 3", 20, "2021-10-03", "supermercado", "comida" );
// // let gasto3 = new CrearGasto("Seguro coche 4", 25, "2021-11-04", "supermercado", "comida" );
// let gasto4 = new CrearGasto("Seguro coche 5", 50, "2021-11-05", "supermercado", "comida" );
// let gasto5 = new CrearGasto("Seguro coche 6", 55, "2021-11-06", "supermercado", "comida" );

// anyadirGasto(gasto0)
// anyadirGasto(gasto1)
// // anyadirGasto(gasto2)
// anyadirGasto(gasto3)
// anyadirGasto(gasto4)
// anyadirGasto(gasto5)

// console.log(gasto0)

// let gastosAgrupados = agruparGastos("mes")
// console.log(gastosAgrupados)



// for(let fechaKey of Object.keys(gastosAgrupados)){

//     console.log(fechaKey, gastosAgrupados[fechaKey] )

// }

// // console.log( gasto )
// // console.log( gasto6 )


// 
