function mostrarDatoEnId(idElemento, valor){

    let elem = document.getElementById(idElemento);

    elem.innerText = valor;

}

function mostrarGastoWeb(idElemento, gasto){

    //1er DIV (GASTO)
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    let divDesc = document.createElement('div');
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;
    divGasto.append(divDesc);

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

   //divGasto.append(divDesc, divFecha, divValor);      <-- tmb se puede

    let divEti = document.createElement("div");
    divEti.className = "gasto-etiquetas";

    if (gasto.etiquetas){
        for (let eti of gasto.etiquetas){
            let spanEti = document.createElement('span');
            spanEti.className = "gasto-etiquetas-etiqueta";
            spanEti.innerText = eti;
            divEti.append(spanEti);
        }
    }
    divGasto.append(divEti);
    

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