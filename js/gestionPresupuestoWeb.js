// Javascript 4 - Interaccion con HTML

function mostrarDatoEnId(idElemento, valor){

    let contenedor = document.getElementById(idElemento);

    //let elemento = document.createElement("div");
    //presupuesto.setAttribute("class", "presupuesto");
    //contenedor.appendChild(elemento);
    //elemento.append(valor);
    //contenedor.innerHTML = valor;
    contenedor.append(valor);
}

function mostrarGastosWeb(idElemento, gasto){

    let contenedor = document.getElementById(idElemento);

    for (let g of gasto){

        let div_gasto = document.createElement("div");
        div_gasto.className = "gasto";
        // div_gasto.setAttribute("class", "gasto");
        contenedor.appendChild(div_gasto);
        
        let div_descripcion = document.createElement("div");
        div_descripcion.className = "gasto-descripcion";
        div_gasto.appendChild(div_descripcion);
        // div_descripcion.setAttribute("class", "gasto-descripcion");
        div_descripcion.append(g.descripcion);
        
        let div_valor = document.createElement("div");
        // div_valor.setAttribute("class", "gasto-valor");
        div_valor.className = "gasto-valor";
        div_gasto.appendChild(div_valor);
        div_valor.append(g.valor);
        
        let div_fecha = document.createElement("div");
        // div_fecha.setAttribute("class", "gasto-fecha");
        div_fecha.className = "gasto-fecha";
        div_gasto.appendChild(div_fecha);
        div_fecha.append(g.fecha);
        
        let div_etiqueta = document.createElement("div");
        // div_etiqueta.setAttribute("class", "gasto-etiquetas");
        div_etiqueta.className = "gasto-etiqueta";
        div_gasto.appendChild(div_etiqueta);
        
        //let listado_etiquetas = g.etiquetas.split(",");

        for (let etiq of g.etiquetas) {

            let div_etiqs = document.createElement("span");
            // div_etiqs.setAttribute("class", "gasto-etiquetas-etiqueta");
            div_etiqs.className = "gasto-etiquetas-etiqueta";
            div_etiqueta.appendChild(div_etiqs);
            div_etiqs.append(etiq);

        }
        

    }
    

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let contenedor = document.getElementById(idElemento);

    let div_agrupacion = document.createElement("div");
    // div_agrupacion.setAttribute("class", "agrupacion");
    div_agrupacion.className = "agrupacion;"
    contenedor.appendChild(div_agrupacion);

    let div_period = document.createElement("h1");
    // periodo.setAttribute("class", "periodo");
    // div_period.append("Gastos agrupados por " + periodo);
    div_period.innerHTML = "Gastos agrupados por " + periodo;
    div_agrupacion.appendChild(div_period);

    for (let value of agrup.acum) {

        let div_agrupacion_dato = document.createElement("div");
        div_agrupacion_dato.setAttribute("class", "agrupacion-dato");
        div_agrupacion.appendChild(div_agrupacion_dato);

        for (let valores of Object.values(value)) {

            let div_agrupacion_dato_clave = document.createElement("span");
            div_agrupacion_dato_clave.setAttribute("class", "agrupacion-dato-clave");
            div_agrupacion.appendChild(div_agrupacion_dato_clave);
            div_agrupacion_dato_clave.append(valores);

            let div_agrupacion_dato_valor = document.createElement("span");
            div_agrupacion_dato_valor.setAttribute("class", "agrupacion-dato-valor");
            div_agrupacion.appendChild(div_agrupacion_dato_valor);
            div_agrupacion_dato_clave.append(valores);

        }

        

        

    }
    

}

// Exportamos las funciones del documento
export {
    mostrarDatoEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb
}