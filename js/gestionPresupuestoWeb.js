// Javascript 4 - Interaccion con HTML

function mostrarDatosEnId(idElemento, valor){

}

function mostrarGastosWeb(idElemento, gasto){

    let contenedor = document.getElementById("aplicacion")

    let div_gasto = document.createElement("div");
    div_gasto.setAttribute("class", "gasto");
    contenedor.appendChild(div_gasto);
    
    let descripcion = document.createElement("div");
    div_gasto.appendChild(descripcion);
    descripcion.setAttribute("class", "gasto-descripcion");
    descripcion.append(gasto.descripcion);
    
    let valor = document.createElement("div");
    valor.setAttribute("class", "gasto-valor");
    div_gasto.appendChild(valor);
    valor.append(gasto.valor);
    
    let fecha = document.createElement("div");
    fecha.setAttribute("class", "gasto-fecha");
    div_gasto.appendChild(fecha);
    fecha.append(gasto.fecha);
    
    let etiqueta = document.createElement("div");
    etiqueta.setAttribute("class", "gasto-etiquetas");
    div_gasto.appendChild(etiqueta);
    
    let etiqs = document.createElement("span");
    etiqs.setAttribute("class", "gasto-etiquetas-etiqueta");
    etiqueta.appendChild(etiqs);
    etiqs.append(gasto.etiquetas);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}

// Exportamos las funciones del documento
export {
    mostrarDatosEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb
}