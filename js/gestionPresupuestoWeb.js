

function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gasto){
    
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";

    div1.className ="gasto-descripcion";
    div1.append(gasto.descripcion);
    
    div2.className ="gasto-fecha";
    div2.append(gasto.fecha);
    
    div3.className ="gasto-valor";
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);

    

    for (let etiqueta of gasto.etiquetas)
    {        
        let span = document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";
        span.append(etiqueta);
        div4.append(span);
    }

    div4.className ="gasto-etiquetas";
    
    
    div.append(div4);

    let raiz = document.getElementById(idElemento);

    raiz.append(div); 
}
function mostrarGastoAgrupadosWeb(idElemento, agrup, periodo){
    for (let agr of agrup)
    {
        let div = document.createElement('div');
        div.className = "agrupacion";
    
        let h1 = document.createElement('h1');
        h1.append(`Gastos agrupados por ${periodo}`)
        div.append(h1);

        let div1 = document.createElement('div');
        div1.className = "agrupacion-dato";
        
        let span1 = document.createElement('span');
        span1.className = "agrupacion-dato-clave";
        span1.append(agr[0]);

        let span2 = document.createElement('span');
        span2.className = "agrupacion-dato-valor";
        span2.append(agr[1]);

        div1.append(span1);
        div1.append(span2);

        div.append(div1);
        let raiz = document.getElementById(idElemento);
        raiz.append(div);
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
}