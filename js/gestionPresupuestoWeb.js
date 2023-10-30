export function mostrarDatoEnID(idElemento,valor){
    let element= document.getElementById(idElemento);
    element.textContent=valor;
}

export function mostrarGastoWeb(idElemento,gasto){
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

export function mostrarGastosAgrupadosWeb(idElemento,objeto,periodo){

    let element = document.getElementById(idElemento);

    let divAgrupar = document.createElement("div");
    divAgrupar.classList.add("agrupacion");
    element.appendChild(divAgrupar);

    let divTitulo = document.createElement("h1");
    divTitulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupar.appendChild(divTitulo);

    for (let clave in objeto) {
        if (objeto.hasOwnProperty(clave)) {
            let divAgrupacionDato = document.createElement("div");
            divAgrupacionDato.classList.add("agrupacion-dato");

            let spanClave = document.createElement("span");
            spanClave.classList.add("agrupacion-dato-clave");
            spanClave.textContent = clave;
            divAgrupacionDato.appendChild(spanClave);

            let spanAgrupacion = document.createElement("span");
            spanAgrupacion.classList.add("agrupacion-dato-valor");
            spanAgrupacion.textContent = objeto[clave];
            divAgrupacionDato.appendChild(spanAgrupacion);

            divAgrupar.appendChild(divAgrupacionDato);
        }
    }
    
}