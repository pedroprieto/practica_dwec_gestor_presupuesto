

function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gastos){
    for (let gasto of gastos)
    {
        let div = document.createElement('div');

        div.className = "gasto";

        div.append('div', "gasto-descripcion", gasto.descripcion); 

    }
    document.getElementById(idElemento) = div;
    document.body.append(div);
}
function mostrarGastoAgrupadosWeb(){

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
}