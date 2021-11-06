// Javascript 4 - Interaccion con HTML

function mostrarDatosEnId(idElemento, valor){

}

function mostrarGastosWeb(idElemento, gasto){

    let contenedor = document.getElementById("container")

    let gasto = document.createElement("div");
    gasto.setAttribute("class", "gasto");
    contenedor.appendChild(gasto);
    
    let descripcion = document.createElement("div");
    gasto.appendChild(descripcion);
    descripcion.setAttribute("class", "gasto-descripcion");
    descripcion.append(gasto1.descripcion);
    
    let valor = document.createElement("div");
    valor.setAttribute("class", "gasto-valor");
    gasto.appendChild(valor);
    valor.append(gasto1.valor);
    
    let fecha = document.createElement("div");
    fecha.setAttribute("class", "gasto-fecha");
    gasto.appendChild(fecha);fecha.append(gasto1.fecha);
    
    let etiqueta = document.createElement("div");
    etiqueta.setAttribute("class", "gasto-etiquetas");
    gasto.appendChild(etiqueta);
    
    let etiqs = document.createElement("span");
    etiqs.setAttribute("class", "gasto-etiquetas-etiqueta");
    etiqueta.appendChild(etiqs);
    etiqs.append(gasto1.etiquetas);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}

// Exportamos las funciones del documento
export {
    mostrarDatosEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb
}