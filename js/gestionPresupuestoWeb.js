import *  as gestion from "./gestionPresupuesto";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor"
    divValor.innerText = gasto.valor;

    let divEti = document.createElement("div");
    divEti.className = "gasto-etiquetas";
    for(let etiqueta of gasto.etiquetas){
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = etiqueta;
        divEti.append(spanEti);
    }

    divGasto.append(divDesc);
    divGasto.append(divFecha);
    divGasto.append(divValor);
    divGasto.append(divEti);

   let listadoGastos = document.getElementById(idElemento);
   listadoGastos.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    agrup = agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta);
    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let h1Agrup = document.createElement("h1");
    h1Agrup.innerText = periodo;

    let divAgrudato = document.createElement("div");
    divAgrudato.className = "agrupacion-dato";

     for (let [key, value] of Odject.entries(agrup)) {   
        let spanAgrupClave = document.createElement("span")  
        spanAgrupClave.className = "agrupacion-dato-clave";
        spanAgrupClave.innerText = `${key}`; 
        let spanAgrupValor = document.createElement("span")  
        spanAgrupValor.className = "agrupacion-dato-valor";
        spanAgrupValor.innerText = `${value}`;   
        divAgrudato.append(spanAgrupClave);
        divAgrudato.append(spanAgrupValor);           
     }              
   
    divAgrup.append(h1Agrup);
    divAgrup.append(divAgrudato);

    let gastosAgrup = document.getElementById(idElemento);
    gastosAgrup.append(divAgrup);     
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
