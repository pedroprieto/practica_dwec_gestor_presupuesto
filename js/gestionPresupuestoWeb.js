

function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gastos){
    for (let gasto of gastos)
    {
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
}
function mostrarGastoAgrupadosWeb(){
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
}