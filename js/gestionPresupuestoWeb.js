function mostrarDatoEnId(idElemento, valor){

    let elem = document.getElementById(idElemento)

    elem.innerText = valor;

}

function mostrarGastoWeb(idElemento, gasto){

    //1er DIV (GASTO)
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor

    // Ver q onda   || poner bucle... || span...
    let divEti = document.createElement("div");
    divEti.className = "gasto-descripcion";

    divGasto.append(divDesc, divFecha, divValor, divEti);

    let divContenedor = document.getElementById(idElemento);
    divContenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(){

}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};