

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
    
    divPrincipal.append(gasto);

};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let divPrincipal = getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    
    let h1 = document.createElement('h1');
    h1.append(`Gastos agrupados por ${periodo}`);
    divAgrupacion.append(h1);

    for (let [key, value] of Object.entries(agrup)) {
        
         
    }


};

export {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}