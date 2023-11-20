
function mostrarDatoEnId(idElemento, valor) {

    //obtengo el elemento HTML por su id
    let elemento = document.getElementById(idElemento);
    //propiedad texto visible dentro del elemento. Reemplazo el contexto de texto actual del elemento con el valor.
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    
}













export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}