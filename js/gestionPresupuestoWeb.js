function mostrarDatoEnId(idElemento, valor) {
    let id = document.getElementById(idElemento);
    id.innerHTML(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.classList.add('gasto')
    id.append(divPadre);

    let div1 = document.createElement('div');
    div1.classList.add('gasto-descripcion');
    div1.createTextNode(gasto.descripcion);
    divPadre.append(div1);

    let div2 = document.createElement('div');
    div1.classList.add('gasto-fecha');
    div1.createTextNode(gasto.fecha);
    divPadre.append(div2);

    let div3 = document.createElement('div');
    div1.classList.add('gasto-valor');
    div1.createTextNode(gasto.valor);
    divPadre.append(div3);

    let div4 = document.createElement('div');
    div1.classList.add('gasto-etiquetas');
    for (let etiqueta of gasto.etiquetas) {
        let span = document.createElement('span');
        span.classList.add('gasto-etiquetas-etiqueta');
        span.createTextNode(etiqueta);
        div4.append(span);
    }
    divPadre.append(div4);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let id = document.getElementById(idElemento);

    let divPadre = document.createElement('div');
    divPadre.classList.add('agrupación');
    id.append(divPadre);

    let titulo = document.createElement('h1');
    titulo.createTextNode('Gastos agrupados por '+periodo);
    divPadre.append(titulo);

    for(let key in agrup) {
        let divAgrup = document.createElement('div');
        divAgrup.classList.add('agrupacion-dato');
        
        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.createTextNode(key);
        divAgrup.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.classList.add('agrupacion-dato-valor');
        spanValor.createTextNode(agrup[key]);
        divAgrup.append(spanValor);
    }

    divPadre.append(divAgrup);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}