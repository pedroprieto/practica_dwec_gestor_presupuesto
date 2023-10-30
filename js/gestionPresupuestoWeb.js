import * as gestPres from "./gestionPresupuesto.js";

function mostrarDatoEnID(idElemento, valor){
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
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);
    
    // div .agrupacion
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion"
    contenedor.append(divAgrupacion);

    // se crea el h1
    let contH1 = document.createElement("h1");
    contH1.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(contH1);
    
    //crear un div.agrupacion-dato para cada propiedad del objeto agrup:
    for(let [clave, valor] of Object.entries(agrup)){
        // se crea el div de cada agrupacion
        let divGrupo = document.createElement("div");
        divGrupo.className = "agrupacion-dato";
        divAgrupacion.append(divGrupo);
        // span con el nombre del grupo
        let spanGrupo = document.createElement("span");
        spanGrupo.className = "agrupacion-dato-clave";
        spanGrupo.innerHTML = clave;
        divGrupo.append(spanGrupo);
        // span con el valor del grupo
        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = valor;
        divGrupo.append(spanValor);
    }
}