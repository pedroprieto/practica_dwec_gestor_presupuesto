import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
    }
    
function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento);

    let nuevoGastoDiv = document.createElement('div');
    nuevoGastoDiv.classList.add(`gasto`);

    let descripcionDiv = document.createElement(`div`);
    descripcionDiv.classList.add(`gasto-descripcion`);
    descripcionDiv.innerText = `Descripción del gasto: ${gasto.descripcion}`;
    nuevoGastoDiv.append(descripcionDiv);

    let fechaDiv = document.createElement(`div`);
    fechaDiv.classList.add(`gasto-fecha`);
    fechaDiv.innerText = `Fecha del gasto: ${new Date(gasto.fecha).toLocaleString()}`;
    nuevoGastoDiv.append(fechaDiv);

    let valorDiv = document.createElement('div');
    valorDiv.classList.add('gasto-valor');
    valorDiv.innerText = `Valor del gasto: ${gasto.valor} €`;
    nuevoGastoDiv.append(valorDiv);   

    let etiquetasDiv = document.createElement('div');
    etiquetasDiv.classList.add(`gasto-etiquetas`);

    //FOR para recorrer todas las etiquetas del gasto:
    gasto.etiquetas.forEach(etiqueta => {
        let etiquetaSpan = document.createElement(`span`);
        etiquetaSpan.classList.add(`gasto-etiquetas-etiqueta`);
        etiquetaSpan.innerText = etiqueta;
        //creamos <span> hijo del <div>
        etiquetasDiv.append(etiquetaSpan);

        nuevoGastoDiv.append(etiquetasDiv);
    });

    elemento.append(nuevoGastoDiv);
}

    
function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
    let elemento =document.getElementById(idElemento);

    let nuevoDiv = document.createElement(`div`);
    nuevoDiv.classList.add(`agrupacion`);

    let h1 = document.createElement(`h1`);
    h1.innerText = `Gastos agrupados por ${periodo}`;
    nuevoDiv.append(h1);

    //For para los objetos devueltos por agruparGastos
    //Object.entries devuelve un array [clave, valor]
    for (let [clave, valor] of Object.entries (agrup)){
        let datoDiv = document.createElement(`div`);
        datoDiv.classList.add(`agrupacion-dato`);

        let claveSpan = document.createElement(`span`);
        claveSpan.classList.add(`agrupacion-dato-clave`);
        claveSpan.innerText = `Clave es de ${clave}, `;
        datoDiv.append(claveSpan);
 
        let valorSpan = document.createElement(`span`);
        valorSpan.classList.add(`agrupacion-dato-valor`);
        valorSpan.innerText = `valor es de ${valor}`;
        datoDiv.append(valorSpan);

        nuevoDiv.append(datoDiv);
    }
    elemento.append(nuevoDiv);
}

export{
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}    