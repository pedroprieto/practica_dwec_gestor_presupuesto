import * as gesPres from "/js/gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    var p = document.createElement("p");
    var text;
    if(isNaN(valor)){
        text= document.createTextNode(valor);
    }else{
        text= document.createTextNode(Math.floor(valor));
    }
    
    p.appendChild(text);
    document.getElementById(idElemento).appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    var gastoElement = document.createElement('div');
    gastoElement.classList.add('gasto');        
    //descripcion
    var descripcionElement = document.createElement('div');
    descripcionElement.classList.add('gasto-descripcion');
    descripcionElement.textContent = gasto.descripcion;
    gastoElement.appendChild(descripcionElement);
    //fecha
    var fechaElement = document.createElement('div');
    fechaElement.classList.add('gasto-fecha');
    fechaElement.textContent = new Date(gasto.fecha).toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"});
    gastoElement.appendChild(fechaElement);
    //valor
    var valorElement = document.createElement('div');
    valorElement.classList.add('gasto-valor');
    valorElement.textContent = gasto.valor;
    gastoElement.appendChild(valorElement);
    //etiquetas
    var etiquetasElement = document.createElement('div');
    etiquetasElement.classList.add('gasto-etiquetas');
    for (var g of gasto.etiquetas){
        var etiquetaElement = document.createElement('span');
        etiquetaElement.classList.add('gasto-etiquetas-etiqueta');
        etiquetaElement.textContent = g;
        etiquetasElement.appendChild(etiquetaElement);
    }
    
    gastoElement.appendChild(etiquetasElement);
    
    var contenedor= document.getElementById(idElemento);
    contenedor.appendChild(gastoElement);
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    var agrupacionElement = document.createElement('div');
    agrupacionElement.classList.add('agrupacion');
    
    var tituloElement = document.createElement('h1');
    tituloElement.textContent = `Gastos agrupados por ${periodo} `;
    agrupacionElement.appendChild(tituloElement);

    /*var agrupacionDatoElement = document.createElement('div');
    agrupacionDatoElement.classList.add('agrupacion-dato');*/

    for (const propiedad in agrup){
    var agrupacionDatoElement = document.createElement('div');
    agrupacionDatoElement.classList.add('agrupacion-dato');
    var agrupacionDatoClave = document.createElement('span');
    agrupacionDatoClave.classList.add('agrupacion-dato-clave');
    agrupacionDatoClave.textContent = propiedad;
    agrupacionDatoElement.appendChild(agrupacionDatoClave);
    var agrupacionDatoValor = document.createElement('span');
    agrupacionDatoValor.classList.add('agrupacion-dato-valor');
    agrupacionDatoValor.textContent = agrup[propiedad];
    agrupacionDatoElement.appendChild(agrupacionDatoValor);
    agrupacionElement.appendChild(agrupacionDatoElement);
    }
    

    var contenedor= document.getElementById(idElemento);
    contenedor.appendChild(agrupacionElement);
}

function repintar(){
    mostrarDatoEnId("presupuesto",gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total",gesPres.calcularBalance());
    var gastos = gesPres.listarGastos();
    document.getElementById("listado-gastos-completo").innerHTML="";
    gastos.forEach(g => {
        mostrarGastoWeb("listado-gastos-completo",g);
    });
}
function actualizarPresupuestoWeb(){
    let pres = prompt("Introduce el nuevo presupuesto");
    gesPres.actualizarPresupuesto(parseInt(pres));
    repintar();
}
function nuevoGastoWeb(){
    let desc = prompt("Introduce la descripción del gasto");
    let val = prompt("Introduce el valor");
    let fec = prompt("Introduce la fecha (yyyy-mm-dd");
    let eti = prompt("Introduce etiquetas (eti1,eti2,eti3,...)");

    gesPres.anyadirGasto(new gesPres.CrearGasto(desc,parseInt(val),fec,eti.split(",")))
    repintar();
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    nuevoGastoWeb,
    actualizarPresupuestoWeb
}