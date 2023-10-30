function mostrarDatoEnID(idElemento,valor){
    let element= document.getElementById(idElemento);
    element.textContent=valor;
}

function mostrarGastoWeb(idElemento,gasto){
    let element =document.getElementById(idElemento);
    
    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");
    element.appendChild(divGasto);
    
    let divDescripcion=document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent=gasto.descripcion;
    divGasto.appendChild(divDescripcion);
    
    
    let divGastoFecha= document.createElement("div");
    divGastoFecha.classList.add("gasto-fecha");
    divGastoFecha.textContent=gasto.fecha;
    divGasto.appendChild(divGastoFecha);
    
    let divValor= document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent=gasto.valor;
    divGasto.appendChild(divValor);
    
    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    divGasto.appendChild(divEtiquetas);
    
    gasto.etiquetas.forEach(etiqueta=>{
    let etiquetaSpan= document.createElement("span");
    etiquetaSpan.classList.add("gasto-etiquetas-etiqueta");
    etiquetaSpan.textContent=etiqueta;
    divEtiquetas.appendChild(etiquetaSpan);
    })
}

function mostrarGastosAgrupadosWeb(){

}