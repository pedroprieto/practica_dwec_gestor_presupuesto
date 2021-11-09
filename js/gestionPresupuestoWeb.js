// Javascript 4 - Interaccion con HTML

function mostrarDatoEnId(idElemento, valor){

    let contenedor = document.getElementById("presupuesto");

    let presupuesto = document.createElement("div");
    presupuesto.setAttribute("class", "presupuesto");
    contenedor.appendChild(presupuesto);
    presupuesto.append(prespuesto);
}

function mostrarGastosWeb(idElemento, gasto){

    let contenedor = document.getElementById("aplicacion");

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

    let contenedor = document.getElementById("aplicacion");

    let agrupacion = document.createElement("div");
    agrupacion.setAttribute("class", "agrupacion");
    contenedor.appendChild(agrupacion);

    let periodo = document.createElement("h1");
    //periodo.setAttribute("class", "periodo");
    periodo.append("Gastos agrupados por " + periodo);
    agrupacion.appendChild(periodo);

    let agrupacion_dato = document.createElement("div");
    agrupacion_dato.setAttribute("class", "agrupacion-dato");
    agrupacion.appendChild(agrupacion_dato);

    let agrupacion_dato_clave = document.createElement("span");
    agrupacion_dato_clave.setAttribute("class", "agrupacion-dato-clave");
    agrupacion.appendChild(agrupacion_dato_clave);
    agrupacion_dato_clave.append(acum.periodo);

    let agrupacion_dato_valor = document.createElement("span");
    agrupacion_dato_valor.setAttribute("class", "agrupacion-dato-valor");
    agrupacion.appendChild(agrupacion_dato_valor);
    agrupacion_dato_clave.append(acum.valor);

}

// Exportamos las funciones del documento
export {
    mostrarDatosEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb
}