function mostrarDatoEnId (idElemento, valor) {

    document.getElementById(idElemento).innerHTML = valor;
    
}


function mostrarGastoWeb (idElemento, gasto) {

    let div = document.createElement('div');
    div.className = "gasto";

    let div1 = document.createElement('div');
    div1.className = "gasto-descripcion";
    div1.append(gasto.descripcion);

    let div2 = document.createElement('div');
    div2.className = "gasto-fecha";
    div2.append(gasto.fecha);

    let div3 = document.createElement('div');
    div3.className = "gasto-valor";
    div3.append(gasto.valor);

    let div4 = document.createElement('div');
    div4.className = "gasto-etiquetas";
    

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    for (let etiqueta in gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        
        span.append(etiqueta);
        div4.append(span);
        
    }


    let id = document.getElementById(idElemento);

    id.append(div);

}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

    
}




export   {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}