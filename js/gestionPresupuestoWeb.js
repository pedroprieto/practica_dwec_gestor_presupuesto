import * as gesPresupuesto from "./gestionPresupuesto.js"
function repintar()
{
    mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto())

    mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML="";
    
     
    let gastosListados=gesPresupuesto.listarGastos()
    for(let i=0;i<gastosListados.length;i++)
    {
         mostrarGastoWeb("listado-gastos-completo", gastosListados[i]);
    }

    mostrarGastosAgrupadosWeb("agrupacion-dia",gesPresupuesto.agruparGastos("dia") ,"día");
    mostrarGastosAgrupadosWeb("agrupacion-mes",gesPresupuesto.agruparGastos("mes") ,"mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo",gesPresupuesto.agruparGastos("anyo") ,"año");
}

function actualizarPresupuestoWeb(){

    let preguntarPresupuesto =prompt("Introduzca el presupuesto");
   let presuouestoPreguntado= parseInt(preguntarPresupuesto);
   gesPresupuesto.actualizarPresupuesto(presuouestoPreguntado);
   repintar();
   
   
}

function nuevoGastoWeb(){

    let preguntarDescripcion= prompt("Introduzca la descripción del gasto")

    let preguntarGasto =prompt("Introduzca el valor del gasto");
   
   let gastoPreguntado= parseFloat(preguntarGasto);

   let preguntarFecha = prompt("Introduzca la fecha del gasto (dia/mes/año)");
   let fecha =new Date(preguntarFecha);
   let dia= fecha.getDate();
   let mes= fecha.getMonth();
   let anyo= fecha.getFullYear();
   let fechaCompleta =`${dia + " "+ (mes +1 )+ " "+ anyo}`;

   let preguntarEtiquetas = prompt("Introduzca las etiquetas del gasto");
   let etiquetasArr= preguntarEtiquetas.split(',');



   let gastoPrueba=new gesPresupuesto.CrearGasto(preguntarDescripcion, gastoPreguntado, fechaCompleta, ...etiquetasArr);
   gesPresupuesto.anyadirGasto(gastoPrueba);
   repintar();
}

let EditarHandle={
handleEvent: function(evento){
    
    let preguntarDescripcion= prompt("Introduzca la descripción del gasto", this.gasto.descripcion)

    let preguntarGasto =prompt("Introduzca el valor del gasto", this.gasto.valor);
   let gastoPreguntado= parseFloat(preguntarGasto);


    let fechaParam = new Date(this.gasto.fecha)
    let dia1= fechaParam.getDate();
    let mes1= fechaParam.getMonth();
    let anyo1= fechaParam.getFullYear();
    let fechaCompletaParam =`${dia1 + " "+ (mes1 +1 )+ " "+ anyo1}`

   let preguntarFecha = prompt("Introduzca la fecha del gasto (dia/mes/año)",fechaCompletaParam);
   let fecha =new Date(preguntarFecha);
   let dia= fecha.getDate();
   let mes= fecha.getMonth();
   let anyo= fecha.getFullYear();
   let fechaCompleta =`${dia + " "+ (mes +1 )+ " "+ anyo}`;
   
   let preguntarEtiquetas = prompt("Introduzca las etiquetas del gasto ",this.gasto.etiquetas);
   let etiquetasArr= preguntarEtiquetas.split(',');



this.gasto.actualizarDescripcion(preguntarDescripcion);
this.gasto.actualizarValor(gastoPreguntado);
this.gasto.actualizarFecha(fechaCompleta);
this.gasto.etiquetas = [];
this.gasto.anyadirEtiquetas(...etiquetasArr);


repintar();

}
}

async function cargarGastosApi(event) {
    
        
        
            
               
                let usuario = document.getElementById("nombre_usuario").value;
                console.log("Usuario: "+ usuario)
                
                let urlObtenerApi = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
               
                
                console.log("URL: "+ urlObtenerApi,
                )
                let respuesta = await fetch(urlObtenerApi,{
                    method:`GET`,
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                });
        
                if (respuesta.ok) {
                    
                    let listaGastosApi = await respuesta.json();

                    gesPresupuesto.cargarGastos(listaGastosApi);

                    repintar();
                } else {
                    console.error("Error al obtener la lista de gastos desde la API:", respuesta.status, respuesta.statusText);
                }
            
        }
        
       
    

let gastoBorrarApi={
    handleEvent: function(event){
        event.preventDefault()
        let usuario = document.getElementById("nombre_usuario").value
        let gasto =this.gasto.id
        console.log("gasto gasto"+ gasto)
        let urlBorrar=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`
       console.log("gasto "+this.gasto.id)
        let respuesta=   fetch(urlBorrar, {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        })
        .then(function(respuesta){
            if(respuesta.ok)
            {
                console.log("Borrado con exito")
            }
        }).catch(function(error){
            console.log(`Error ${error.message}`)
        })
        
        cargarGastosApi();
    }

}

let BorrarHandle={
    handleEvent: function(evento){
        
        gesPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    } 
}

let BorrarEtiquetasHandle={
    handleEvent: function(evento){
        
        
       this.gasto.borrarEtiquetas(this.etiqueta)
       
        repintar();
    } 
}

function mostrarDatoEnId(idElemento,valor){
    
return document.getElementById(idElemento).innerText=valor;
    
}

function mostrarGastoWeb(idElemento,gasto){

    let fechaGasto =new Date(gasto.fecha)
    fechaGasto.toLocaleString()

    let contenedor = document.getElementById(idElemento);

    let divGasto =document.createElement("div");
    divGasto.className="gasto";
    contenedor.append(divGasto);

    let divDescripcion =document.createElement("div");
    divDescripcion.className="gasto-descripcion";
    divDescripcion.innerHTML=gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha =document.createElement("div");
    divFecha.className="gasto-fecha";
    divFecha.innerHTML=fechaGasto;
    divGasto.append(divFecha);

    let divValor =document.createElement("div");
    divValor.className="gasto-valor";
    divValor.innerHTML=gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas =document.createElement("div");
    divEtiquetas.className="gasto-etiquetas";
    
    divGasto.append(divEtiquetas);
   
    if(gasto.etiquetas)
    {
        for (let i = 0;i<gasto.etiquetas.length;i++)
        {
            let etiqueta=gasto.etiquetas[i];
            let spanEtiqueta=document.createElement("span");
            spanEtiqueta.className="gasto-etiquetas-etiqueta";
            spanEtiqueta.innerHTML=etiqueta;

            let borrarEtiquetasGasto =Object.create(BorrarEtiquetasHandle);
            borrarEtiquetasGasto.gasto= gasto;
            borrarEtiquetasGasto.etiqueta=gasto.etiquetas[i];
        
            spanEtiqueta.addEventListener("click", borrarEtiquetasGasto)
            
            
            divEtiquetas.append(spanEtiqueta);   
    
        }
    }
    else 
    {
        
        let spanEtiqueta=document.createElement("span");
        spanEtiqueta.className="gasto-etiquetas-etiqueta";
        spanEtiqueta.innerHTML=gasto.etiquetas;

        
        
            

        divEtiquetas.append(spanEtiqueta);   
    }
    
      let botonEditar = document.createElement("button");
      botonEditar.setAttribute("type", "button");
      botonEditar.className="gasto-editar";
      botonEditar.textContent="Editar";

      let editarGasto =Object.create(EditarHandle);
      editarGasto.gasto= gasto;
     
      botonEditar.addEventListener("click", editarGasto);
   // Añadimos el botón a la estructura HTML
    divGasto.append(botonEditar);
  
    let botonBorrar = document.createElement("button");
    botonBorrar.setAttribute("type", "button");
    botonBorrar.className="gasto-borrar";
    botonBorrar.textContent="Borrar";

    let borrarGasto =Object.create(BorrarHandle);
    borrarGasto.gasto= gasto;
   
    botonBorrar.addEventListener("click", borrarGasto);
 // Añadimos el botón a la estructura HTML
  divGasto.append(botonBorrar);

  let botonBorrarApi = document.createElement("button");
  botonBorrarApi.setAttribute("type", "button");
  botonBorrarApi.className="gasto-borrar-api";
  botonBorrarApi.textContent="Borrar (API)";
  
  let borrarGastoApi =Object.create(gastoBorrarApi);
  borrarGastoApi.gasto= gasto;
  
 botonBorrarApi.addEventListener("click", borrarGastoApi);

 divGasto.append(botonBorrarApi);

  let botonEditarFormulario = document.createElement("button");
  botonEditarFormulario.setAttribute("type", "button");
  botonEditarFormulario.className="gasto-editar-formulario";
  botonEditarFormulario.textContent="Editar (Formulario)";

  let editarGastoFormulario =new EditarHandleFormulario();
  editarGastoFormulario.gasto= gasto;
 
  botonEditarFormulario.addEventListener("click", editarGastoFormulario);
// Añadimos el botón a la estructura HTML
divGasto.append(botonEditarFormulario);


let enviar =document.getElementById("formulario-filtrado")
enviar.addEventListener("submit", filtrarGastosWeb)
        return contenedor;
}






let filtrarGastosWeb={
    handleEvent: function(event){
     event.preventDefault();
     let enviar = document.getElementById("formulario-filtrado");

     let descripcionGastoForm = enviar.elements["formulario-filtrado-descripcion"].value;
let valorGastoMinimo = enviar.elements["formulario-filtrado-valor-minimo"].value;
let valorGastoMaximo = enviar.elements["formulario-filtrado-valor-maximo"].value;
let fechaDesdeGastoForm = enviar.elements["formulario-filtrado-fecha-desde"].value;
let fechaHastaGastoForm = enviar.elements["formulario-filtrado-fecha-hasta"].value;
let etiquetasGastoForm = enviar.elements["formulario-filtrado-etiquetas-tiene"].value;

let valorGastoMinimoForm=parseFloat(valorGastoMinimo)

     
let valorGastoMaximoForm=parseFloat(valorGastoMaximo)

     
       let etiquetasArrForm= gesPresupuesto.transformarListadoEtiquetas(etiquetasGastoForm);
     

     let gastoPruebaForm=new gesPresupuesto.CrearGastoBuscadoFiltro(descripcionGastoForm, valorGastoMinimoForm,valorGastoMaximoForm, fechaDesdeGastoForm,fechaHastaGastoForm, etiquetasArrForm);

    

     let gastosFiltrados =  gesPresupuesto.filtrarGastos(gastoPruebaForm);

     
 
     document.getElementById("listado-gastos-completo").innerHTML = "";

     
     
     for(let i=0;i<gastosFiltrados.length;i++)
     {
          mostrarGastoWeb("listado-gastos-completo", gastosFiltrados[i]);
          
     }

     
     enviar.addEventListener("submit", filtrarGastosWeb);
    }
}








function EditarHandleFormulario(){
this.handleEvent= function(event){
    event.target.disabled=true;
    event.preventDefault();
   
    event.target.disabled=true;

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    formulario.elements.descripcion.value=this.gasto.descripcion
    formulario.elements.valor.value=this.gasto.valor
    
    formulario.elements.fecha.valueAsDate=new Date(this.gasto.fecha)
    formulario.elements.etiquetas.value=this.gasto.etiquetas

    event.target.parentElement.append(plantillaFormulario)
  
    
    let manejadorEnviar = new handleEnviarForm()
    manejadorEnviar.gasto=this.gasto;
    formulario.addEventListener("submit", manejadorEnviar);
    

    let botonCancelar = formulario.querySelector(".cancelar");
    let manejadorCerrar = new cerrarGastoEnviarForm()
    manejadorCerrar.botonEditarFormulario=event.target;
    botonCancelar.addEventListener("click", manejadorCerrar);

    let botonEnviarApi= formulario.querySelector(".gasto-enviar-api")
    let manejadorEnviarApiForm = new enviarGastoApiForm()
    manejadorEnviarApiForm.botonEnviarApi= event.target
    manejadorEnviarApiForm.gasto=this.gasto
    botonEnviarApi.addEventListener("click", manejadorEnviarApiForm)// investigar handleformedit y cerrar form tras enviar gasto api

}
}
 function enviarGastoApiForm(){
    this.handleEvent= async function(event){
        event.preventDefault();
        console.log("hola boton enviar")
        let descripcionGastoForm =document.getElementById("descripcion").value
        let valorGasto=document.getElementById("valor").value
        let valorGastoForm=parseFloat(valorGasto)
        let fechaGastoForm=document.getElementById("fecha").value
       
        let etiquetasGastoForm= document.getElementById("etiquetas").value
    
        let etiquetasArrForm= etiquetasGastoForm.split(',');
        let gastoPruebaFormApi = {
            descripcion: descripcionGastoForm,
            valor: valorGastoForm,
            fecha: fechaGastoForm,
            etiquetas: etiquetasArrForm  
        };
        console.log("Descripcion objeto "+ descripcion.value)
        
        let usuario = document.getElementById("nombre_usuario").value
        console.log(usuario)
        let urlEnviarApiForm = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`
       

        let respuesta = await fetch(urlEnviarApiForm, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json;charset=utf-8', 
            },
            body: JSON.stringify(gastoPruebaFormApi)     
        });
        if (respuesta.ok)
        {
            console.log ("Petición PUT realizada con exito")
        } else {
                console.error("Error al realizar la petición PUT:", respuesta.status, respuesta.statusText);
        }

        cargarGastosApi()
        event.target.form.remove()
    }
}

function handleEnviarForm(){
    this.handleEvent= function(event){
        
    event.preventDefault();
        let descripcionGastoForm =event.target.elements.descripcion.value
        let valorGasto=event.target.elements.valor.value
        let valorGastoForm=parseFloat(valorGasto)
        let fechaGastoForm=event.target.elements.fecha.value
        
        let etiquetasGastoForm= event.target.elements.etiquetas.value
    
        let etiquetasArrForm= etiquetasGastoForm.split(',');
    
        this.gasto.actualizarDescripcion(descripcionGastoForm);
        this.gasto.actualizarValor(valorGastoForm);
        this.gasto.actualizarFecha(fechaGastoForm);
        this.gasto.etiquetas = [];
        this.gasto.anyadirEtiquetas(...etiquetasArrForm);
        repintar()
        
        

        
    }
}
function cerrarGastoEnviarForm(){
    this.handleEvent=function(event){
         
    event.target.form.remove()
    this.botonEditarFormulario.disabled=false;
}
}

let btnGuardar=document.getElementById("guardar-gastos")
let manejadorGuardar = new guardarGastosWeb()
btnGuardar.addEventListener("click",manejadorGuardar)



function guardarGastosWeb(){
    this.handleEvent = function(event){

        localStorage.GestorGastosDWEC = JSON.stringify(gesPresupuesto.listarGastos())
   
    }
   } 

let btnCargar=document.getElementById("cargar-gastos")
let manejadorCargar = new cargarGastosWeb()
btnCargar.addEventListener("click", manejadorCargar)


function cargarGastosWeb(){
    this.handleEvent = function(event){
        let gastosAlmacenamiento = localStorage.getItem("GestorGastosDWEC");
        if(localStorage.GestorGastosDWEC!=null)
        {
            let gastosArray =  JSON.parse(gastosAlmacenamiento) ;

            
         gesPresupuesto.cargarGastos(gastosArray);
           
           
            
        }
        else{
            let cargarGastos=[]
            gesPresupuesto.cargarGastos(cargarGastos)
        }
        
       

        repintar()
    }
}



function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    let contenedor = document.getElementById(idElemento);
    contenedor.innerHTML = "";

    let divAgrup =document.createElement("div");
    divAgrup.className="agrupacion";
    contenedor.append(divAgrup);

    let h1 =document.createElement("h1");
    
    h1.innerHTML="Gastos agrupados por "+periodo;
    divAgrup.append(h1);
   
        for (let value of Object.entries(agrup))
        {   
            let divAgrupacion=document.createElement("div");
            divAgrupacion.className="agrupacion-dato";
            divAgrup.append(divAgrupacion); 
                   
            for(let k=0;k<value.length;k++)
            {
                if(k==0)
                {
                    let spanAgrupacion=document.createElement("span");
                    spanAgrupacion.className="agrupacion-dato-clave";
                    spanAgrupacion.innerHTML=value[k]+" ";
                     divAgrupacion.append(spanAgrupacion); 
                }
                
            else if(k==1)
          {
            let spanAgrupacionValor=document.createElement("span");
            spanAgrupacionValor.className="agrupacion-dato-valor";
            spanAgrupacionValor.innerHTML=" : "+value[k];
            divAgrupacion.append(spanAgrupacionValor); 
            }
        }  
        }
        
// Estilos
contenedor.style.width = "33%";
contenedor.style.display = "inline-block";
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
                data: agrup
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
contenedor.append(chart);
 return contenedor;   

}
function nuevoGastoWebFormulario(event){
    event.target.disabled=true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    let formulario = plantillaFormulario.querySelector("form");

    let controlesPrincipales = document.getElementById("controlesprincipales")
    controlesPrincipales.append(plantillaFormulario)

    formulario.addEventListener("submit", anyadirGastoEnviar);

    let botonCancelar = formulario.querySelector(".cancelar");
    botonCancelar.addEventListener("click", cerrarGastoEnviar);

    let botonEnviarApi= formulario.querySelector(".gasto-enviar-api")
    botonEnviarApi.addEventListener("click", enviarGastoApi)
    
}

async function  enviarGastoApi(event){
    
        event.preventDefault();
console.log("hola")

        let descripcionGastoForm =document.getElementById("descripcion").value
        let valorGasto=document.getElementById("valor").value
        let valorGastoForm=parseFloat(valorGasto)
        let fechaGastoForm=document.getElementById("fecha").value
       
        let etiquetasGastoForm= document.getElementById("etiquetas").value
    
        let etiquetasArrForm= etiquetasGastoForm.split(',');
        let gastoPruebaFormApi = {
            descripcion: descripcionGastoForm,
            valor: valorGastoForm,
            fecha: fechaGastoForm,
            etiquetas: etiquetasArrForm
        };
console.log("Descripcion objeto "+ descripcion.value)
        let usuario = document.getElementById("nombre_usuario").value
        console.log(usuario)
        let urlEnviarApi = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`
       

        let respuesta = await fetch(urlEnviarApi, {
            method:`POST`,
            headers:{
                'Content-Type': 'application/json;charset=utf-8', 
            },
            body: JSON.stringify(gastoPruebaFormApi)     
        });
        if (respuesta.ok)
        {
            console.log ("Petición POST realizada con exito")
        } else {
                console.error("Error al realizar la petición POST:", respuesta.status, respuesta.statusText);
        }

        cargarGastosApi()
        event.target.form.remove()
    }


function anyadirGastoEnviar(event){
   
    event.preventDefault();

    
    let descripcionGastoForm =event.target.elements.descripcion.value
    let valorGasto=event.target.elements.valor.value
    let valorGastoForm=parseFloat(valorGasto)
    let fechaGastoForm=event.target.elements.fecha.value
   
    let etiquetasGastoForm= event.target.elements.etiquetas.value

    let etiquetasArrForm= etiquetasGastoForm.split(',');

    let gastoPruebaForm=new gesPresupuesto.CrearGasto(descripcionGastoForm, valorGastoForm, fechaGastoForm, ...etiquetasArrForm);
    gesPresupuesto.anyadirGasto(gastoPruebaForm);
    repintar();
    event.target.remove()
    document.getElementById("anyadirgasto-formulario").disabled=false
}
function cerrarGastoEnviar(event){
  
    event.target.form.remove()
    document.getElementById("anyadirgasto-formulario").disabled=false;
}




        let botonActualizar= document.getElementById("actualizarpresupuesto")
        botonActualizar.addEventListener("click",actualizarPresupuestoWeb);

        let botonAnyadirGasto= document.getElementById("anyadirgasto")
        botonAnyadirGasto.addEventListener("click",nuevoGastoWeb);

       let botonAnyadirGastoFormulario= document.getElementById("anyadirgasto-formulario")
       botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario)

       let botonCargarGastoApi= document.getElementById("cargar-gastos-api")
       botonCargarGastoApi.addEventListener("click",cargarGastosApi )
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}