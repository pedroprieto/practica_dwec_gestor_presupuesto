export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};


function mostrarDatoEnId(idElemento,valor){
    console.log("hola");
    document.getElementById(idElemento).append(valor);
}

function mostrarGastoWeb(idElemento,gasto){
        let div = document.createElement('div');
        div.className="gasto";
        div.prepend(CrearElement('div',"gasto-descripcion", gasto.descripcion));
        div.prepend(CrearElement('div',"gasto-fecha", gasto.fecha));
        div.prepend(CrearElement('div',"gasto-valor", gasto.valor));
        let etiquetas=document.createElement('div');
        etiquetas.className="gasto-etiquetas";
        if ( gasto.etiquetas ){
            for(let et of gasto["etiquetas"]){
                let span=document.createElement('span');
                span.className="gasto-etiquetas-etiqueta"
                span.innerHTML=et;
                etiquetas.prepend(span);
            }
        }

        // g.mostrarGastoCompleto()
        div.prepend(etiquetas);
        document.getElementById(idElemento).append(div);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let div = document.createElement('div');
    div.className='agrupacion';
    let h1=document.createElement('h1');
    h1.innerHTML=`Gastos agrupados por ${periodo}`;
    div.prepend(h1);

    for(let obj in agrup){
        let div_agrupar=CrearElement('div','agrupacion-dato',"");
        div_agrupar.prepend(CrearElement('span','agrupacion-dato-clave',obj[0]));
        div_agrupar.prepend(CrearElement('span','agrupacion-dato-valor',obj[1]));
        div.prepend(div_agrupar);
    }

    document.getElementById(idElemento).append(div);
}

function CrearElement(element,clase,texto){
    let elemento=document.createElement(element);
    elemento.className=clase;
    elemento.innerHTML=texto;
    return elemento;
}
