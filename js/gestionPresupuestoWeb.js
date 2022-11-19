import * as gestion from './gestionPresupuesto.js';

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
    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let h1Agrup = document.createElement("h1");
    h1Agrup.innerText = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1Agrup);

     for (let [key, value] of Object.entries(agrup)) {   
        let divAgrudato = document.createElement("div");
        divAgrudato.className = "agrupacion-dato";
        let spanAgrupClave = document.createElement("span")  
        spanAgrupClave.className = "agrupacion-dato-clave";
        spanAgrupClave.innerText = `${key}`; 
        let spanAgrupValor = document.createElement("span")  
        spanAgrupValor.className = "agrupacion-dato-valor";
        spanAgrupValor.innerText = `${value}`;   
        divAgrudato.append(spanAgrupClave);
        divAgrudato.append(spanAgrupValor);  
        divAgrup.append(divAgrudato);         
     }              
   
    let gastosAgrup = document.getElementById(idElemento);
    gastosAgrup.append(divAgrup);     
}

function repintar(){
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (let gasto of gestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb () {
    let introValor = prompt("Introduce un presupuesto: ");
    gestion.actualizarPresupuesto(parseFloat(introValor));
    repintar();   
}

function nuevoGastoWeb (){
    let pregDescripcion = prompt("Introduzca la descripción: ");
    let pregValor = prompt("Introduzca el valor: ");
    let pregFecha = prompt("Introduzca la fecha:");
    let pregEtiquetas = prompt("Introduzca las etiquetas: ");
    let gasto = new gestion.CrearGasto(pregDescripcion, parseFloat(pregValor), pregFecha, pregEtiquetas.split(","));
    gestion.anyadirGasto(gasto);
    repintar();
}


let botonAnyadirPresupuesto = document.getElementById("actualizarpresupuesto");
botonAnyadirPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

let botonanyadirGasto = document.getElementById("anyadirgasto");
botonanyadirGasto.addEventListener('click', nuevoGastoWeb);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}
