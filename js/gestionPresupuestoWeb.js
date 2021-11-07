export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};


function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).append(valor);
}

function mostrarGastoWeb(idElemento, gasto){
    let divBloque = document.createElement('div'); 
    divBloque.className = 'gasto';

    let divDescr = document.createElement('div');
    divDescr.className = 'gasto-descripcion';
    divDescr.innerHTML = gasto.descipcion;
    
    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.innerHTML = gasto.fecha;

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.innerHTML = gasto.valor;
    
    divBloque.prepend(divDescr);
    divBloque.prepend(divFecha);
    divBloque.prepend(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    
    if(gasto.etiquetas){
        for (let etiqueta of gasto.etiquetas) {
            let span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.innerHTML = etiqueta;
            divEtiquetas.prepend(span);
        }
    }
    divBloque.prepend(divEtiquetas);
    mostrarDatoEnId(idElemento,divBloque);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    debugger;
    let divBloque = document.createElement('div');
    divBloque.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.innerHTML= `Gastos agrupados por ${periodo}`;
    divBloque.prepend(titulo);

    for (let grupo in agrup) {
        let divAgrupacion = document.createElement('div');
        divAgrupacion.className = 'agrupacion-dato';
        
        let span1 = document.createElement('span');
        span1.className = 'agrupacion-dato-clave';
        span1.innerHTML = grupo[0];
        divAgrupacion.prepend(span1);

        let span2 = document.createElement('span');
        span2.className = 'agrupacion-dato-valor';
        span2.innerHTML = grupo[1];
        divAgrupacion.prepend(span2);

        divBloque.prepend(divAgrupacion);
    }

    mostrarDatoEnId(idElemento,divBloque);
}

