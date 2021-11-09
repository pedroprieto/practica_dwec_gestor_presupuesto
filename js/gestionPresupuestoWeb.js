

function mostrarDatoEnId(idElemento, valor){

    let mostrar = document.getElementById(idElemento);

    mostrar.innerHTML = valor;
    
       
};


function mostrarGastoWeb(idElemento, gasto){

    let divPrincipal = document.getElementById(idElemento);
    
    

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    
    
    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.append(gasto.descripcion);
    
    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.append(gasto.fecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className = "gasto-valor";
    divGastoValor.append(gasto.valor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = "gasto-etiquetas"

    for (let etiqueta of gasto.etiqueta) {
        
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(etiqueta);
        divGastoEtiquetas.append(span);        
    }

    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divGastoEtiquetas);
    
    divPrincipal.append(divGasto);

};

function mostrarGastosAgrupadosWeb(){


};

export {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}