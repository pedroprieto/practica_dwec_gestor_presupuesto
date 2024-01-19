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

  let botonEditarFormulario = document.createElement("button");
  botonEditarFormulario.setAttribute("type", "button");
  botonEditarFormulario.className="gasto-editar-formulario";
  botonEditarFormulario.textContent="Editar (Formulario)";

  let editarGastoFormulario =Object.create(EditarHandleFormulario);
  editarGastoFormulario.gasto= gasto;
 
  botonEditarFormulario.addEventListener("click", editarGastoFormulario);
// Añadimos el botón a la estructura HTML

        return contenedor;
}

let EditarHandleFormulario={
handleEvent: function(event){

    
}
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    let contenedor = document.getElementById(idElemento);

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
        

 return contenedor;   

}
function nuevoGastoWebFormulario(event){
    event.target.disabled=true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

    let controlesPrincipales = document.getElementById("controlesprincipales")
    controlesPrincipales.append(plantillaFormulario)

    formulario.addEventListener("submit", anyadirGastoEnviar);

    let botonCancelar = formulario.querySelector(".cancelar");
    botonCancelar.addEventListener("click", cerrarGastoEnviar);




    
}

function anyadirGastoEnviar(event){
    alert("enviando")
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

    document.getElementById("anyadirgasto-formulario").disabled=false
}
function cerrarGastoEnviar(event){
    alert("cerrando")
    event.target.form.remove()
    document.getElementById("anyadirgasto-formulario").disabled=false;
}

        let botonActualizar= document.getElementById("actualizarpresupuesto")
        botonActualizar.addEventListener("click",actualizarPresupuestoWeb);

        let botonAnyadirGasto= document.getElementById("anyadirgasto")
        botonAnyadirGasto.addEventListener("click",nuevoGastoWeb);

       let botonAnyadirGastoFormulario= document.getElementById("anyadirgasto-formulario")
       botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario)
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}