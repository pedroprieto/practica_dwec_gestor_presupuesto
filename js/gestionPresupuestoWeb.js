//-----------------------------   Interaccion con HTML   ---------------------------------------------

function mostrarDatoEnId(idElemento, valor){
    // se busca el elemnto con el id indicado y muestra el valor en dicho elemnto
    return document.getElementById(idElemento).innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);
    
    // crear Div .gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    // div gasto irá dentro del elemento con el id que se le indique
    contenedor.append(divGasto);

    // Crear div .gasto-descripcion
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    // añadir el contenido de descripcion
    divDescripcion.innerText = gasto.descripcion;
    // Div .descripcion va dentro de divGasto
    divGasto.append(divDescripcion);

    // Crear div .gasto-fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    divGasto.append(divFecha);

    // Crear div .gasto-valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

    // Crear div .gasto-etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.append(divEtiquetas);

    //---- Agregar las etiquetas al div .gasto-etiquetas
    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.innerText = etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }
    
}

function mostrarGastosAgrupadosWeb(){
    
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}