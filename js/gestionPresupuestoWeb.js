import * as gesPresupuesto from "./gestionPresupuesto.js"
function repintar()
{
    mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto())

    mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML="";
 
    for(let i=0;i<gastosListados.length;i++)
    {
         gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gastosListados[i]);
    }
}

function actualizarPresupuestoWeb(){

    let preguntarPresupuesto =prompt("Introduzca el presupuesto");
   let presuouestoPreguntado= parseInt(preguntarPresupuesto);
   gesPresupuesto.actualizarPresupuesto(presuouestoPreguntado);
   repintar();
   
   
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
    
    
       
        
    
    return contenedor;
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

let botonActualizar= document.getElementById("actualizarpresupuesto")
        botonActualizar.addEventListener("click",actualizarPresupuestoWeb);
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}