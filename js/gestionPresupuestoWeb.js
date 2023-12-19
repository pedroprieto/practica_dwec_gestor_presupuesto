import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId(valor, idElemento) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    //Creamos el contenedor <div class="gasto">
    let contenedor_gasto = document.createElement("div");
    contenedor_gasto.className = "gasto";
    elemento.append(contenedor_gasto); //Insertamos este div al contenedor principal
    //Creamos el contenedor <div class="gasto-descripcion">
    let descripcion = document.createElement("div");
    descripcion.className = "gasto-descripcion";
    descripcion.textContent = gasto.descripcion;
    contenedor_gasto.append(descripcion);
    //Creamos el contenedor <div class="gasto-fecha">
    let fecha = document.createElement("div");
    fecha.className = "gasto-fecha";
    fecha.textContent = gasto.fecha.getTime();
    contenedor_gasto.append(fecha);
    //Creamos el contenedor <div class="gasto-valor">
    let valor = document.createElement("div");
    valor.className = "gasto-valor";
    valor.textContent = gasto.valor;
    contenedor_gasto.append(valor);
    //Creamos el contenedor <div class="gasto-etiquetas">
    let etiquetas = document.createElement("div");
    etiquetas.className = "gasto-etiquetas";
    contenedor_gasto.append(etiquetas);
    for (let e of gasto.etiquetas) { //*Creamos un contenedor para cada etiqueta
        let etiqueta = document.createElement("span");
        etiqueta.className = "gasto-etiquetas-etiqueta";
        etiqueta.textContent = e.value;
        etiquetas.append(etiqueta);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}