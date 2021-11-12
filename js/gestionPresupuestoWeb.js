import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    document.getElementById(idElemento).append(valor);
}

function auxCrearElemento(tagHTML,clase,contenido){
    let etiqueta=document.createElement(tagHTML);
    etiqueta.className=clase;
    etiqueta.innerHTML=contenido;
    return etiqueta;
}

function mostrarGastoWeb(idElemento,gasto){

    let tag = document.createElement('div');
    tag.className="gasto";

    tag.prepend(auxCrearElemento('div',"gasto-descripcion", gasto.descripcion));
    tag.prepend(auxCrearElemento('div',"gasto-fecha", gasto.fecha));
    tag.prepend(auxCrearElemento('div',"gasto-valor", gasto.valor));

    let etiquetas=document.createElement('div');
    etiquetas.className="gasto-etiquetas";

    if ( gasto.etiquetas ){

        for(let etiqueta of gasto["etiquetas"]){
            let span=document.createElement('span');
            span.className="gasto-etiquetas-etiqueta"
            span.innerHTML=etiqueta;
            etiquetas.prepend(span);
        }
    }
    tag.prepend(etiquetas);
    document.getElementById(idElemento).append(tag);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    let elemento = document.createElement('div');
    elemento.className='agrupacion';
    let h1=document.createElement('h1');
    h1.innerHTML=`Gastos agrupados por ${periodo}`;
    elemento.prepend(h1);
    
    for(let gasto in agrup){
        let agrupa=auxCrearElemento('div','agrupacion-dato',"");
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-clave',gasto[0]));
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-valor',gasto[1]));
        elemento.prepend(agrupa);

    }
    document.getElementById(idElemento).append(elemento);
}

function repintar(){
    
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let balanceT = gp.calcularBalance();
    mostrarDatoEnId("balance-total",balanceT);

    let gastosT = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales",gastosT);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let gastoslistados = gp.listarGastos();

    for (let gasto of gastoslistados){

        mostrarDatoEnId("listado-gastos-completo",gasto)
    }
}

function actualizarPresupuestoWeb(){

    let nuevoPresupuesto = parseFloat(prompt("Introduce tu presupuesto, por favor"));
    gp.actualizarPresupuesto(nuevoPresupuesto)
    repintar();
}
let botonActualizarPresupuestoWeb = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuestoWeb.addEventListener("click", actualizarPresupuestoWeb);
function nuevoGastoWeb(){

    let descripcion = prompt("Introduce la descripción del gasto, por favor");
    let valor = parseFloat(prompt("Introduce el importe del gasto, por favor"));
    let fecha = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor");
    let etiquetas = prompt("Introduce las etiquetas del gasto separadas por comas, por favor");

    etiquetas = etiquetas.split(",");

    let nuevoGasto = new gp.CrearGasto(descripcion,valor,fecha,etiquetas);
    gp.anyadirGasto(nuevoGasto);

    repintar();
}

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};