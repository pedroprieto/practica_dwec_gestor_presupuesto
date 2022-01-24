import * as gesPres from "./gestionPresupuesto.js";



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

    let id = document.getElementById(idElemento);
    id.innerHTML = "";

    let div = document.createElement('div');
    div.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.innerHTML = "Gastos agrupados por " + periodo;
    
    div.append(h1);


    for (let [clave, valor] of Object.entries(agrup))
    {

        let div1 = document.createElement('div');
        div1.className = "agrupacion-dato";

        let span = document.createElement('span');
        span.className = "agrupacion-dato-clave";
        span.append(clave);
        
        let span1 = document.createElement('span');
        span1.className = "agrupacion-dato-valor";
        span1.append(valor);

        div1.append(span);
        div1.append(span1);
        div.append(div1);
        id.append(div);
        
    } 

    
}




export   {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}