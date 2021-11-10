

function mostrarDatoEnId(idElemento,valor){
    document.getElementById(idElemento).append(valor);
}

function auxCrearElemento(tagHTML,clase,contenido){
    let etiqueta=document.createElement(tagHTML);
    etiqueta.className=clase;
    etiqueta.innerHTML=contenido;
    return etiqueta;
}

function mostrarGastoWeb(idElemento,gasto){

    let tag = document.createElement('div');
    tag.className="gasto";

    tag.prepend(auxCrearElemento('div',"gasto-descripcion", gasto.descripcion));
    tag.prepend(auxCrearElemento('div',"gasto-fecha", gasto.fecha));
    tag.prepend(auxCrearElemento('div',"gasto-valor", gasto.valor));

    let etiquetas=document.createElement('div');
    etiquetas.className="gasto-etiquetas";

    if ( gasto.etiquetas ){

        for(let etiqueta of gasto["etiquetas"]){
            let span=document.createElement('span');
            span.className="gasto-etiquetas-etiqueta"
            span.innerHTML=etiqueta;
            etiquetas.prepend(span);
        }
    }
    tag.prepend(etiquetas);
    document.getElementById(idElemento).append(tag);
}

function mostrarGastosAgrupadosWeb(idElemento,agrupacionGasto,periodo){}

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};