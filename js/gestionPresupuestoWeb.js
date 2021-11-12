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

    let descripcionN = prompt("Introduce la descripción del gasto, por favor");
    let valorN = prompt("Introduce el importe del gasto, por favor");
    valorN = parseFloat(valor);
    let fechaN = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor");
    let etiquetasN = prompt("Introduce las etiquetas del gasto separadas por comas, por favor");

    etiquetasN = etiquetasN.split(',');

    let gasto = new gp.CrearGasto(descripcionN,valorN,fechaN,etiquetasN);
    gp.anyadirGasto(gasto);

    repintar();
}
let botonNuevoGasto  = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){

    this.handleEvent = function(e){

        let descripcionNueva = prompt("Introduce una descripción del gasto, por favor : ",this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descripcionNueva);

        let valorNuevo = prompt("Introduce el importe del gasto, por favor",this.gasto.valor);
        this.gasto.actualizarValor(valorNuevo);

        let fechaNueva = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor",this.gasto.fecha);
        this.gasto.actualizarFecha(fechaNueva);

        let etiquetasNuevas = prompt("Introduce las etiquetas del gasto separadas por comas, por favor",this.gasto.etiquetas);
        etiquetasNuevas =etiquetas.split(',');
        this.gasto.anyadirEtiquetas(...etiquetasNuevas);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}


export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};