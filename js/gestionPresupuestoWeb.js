

function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gastos){
    for (let gasto of gastos)
    {
        let div = document.createElement('div');

        div.className = "gasto";

        div.append("gasto-descripcion", gasto.descripcion);
        div.append("gasto-fecha", gasto.fecha);
        div.append("gasto-valor", gasto.valor);

        let etiquetas = gasto.etiquetas;

        for (let etiqueta of etiquetas)
        {            
            div.append("gasto-etiquetas", etiqueta);
        }
        
        document.body.append(div);   
    }
}
function mostrarGastoAgrupadosWeb(){
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
}