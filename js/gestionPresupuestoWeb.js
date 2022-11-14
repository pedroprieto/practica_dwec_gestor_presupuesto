//Importamos para acceder a las funciones
//import * as gestPresupuesto from "./gestionPresupuesto.js";

//Funciones


function mostrarDatoEnId (idElemento, valor) {

    let datosId = document.getElementById(idElemento);
    datosId.innerText = valor;
    

}

function mostrarGastoWeb (idElemento, gasto) {

    // div gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //div descripcion.
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;
    //div fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = new Date(gasto.fecha);
    //div valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    //Div etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        //spanEti.innerText = gasto.etiquetas;
        spanEti.innerText = eti;
        divEtiquetas.append(spanEti);
    }
    


    //componer el objeto+
    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);

    //Añadir gasto al div
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb ( IdElemento, agrup, periodo) {
    //div agrupacion 
    let divAgrupar = document.createElement("div");
    divAgrupar.className = "agrupacion";
    //crear texto h1
    let h1Periodo = document.createElement("H1");
    h1Periodo.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupar.append(h1Periodo);
    let agrupDatos = Object.entries(agrup);
    agrupDatos.map( (gasto) => {
        let divAgrpGasto = document.createElement("div");
        divAgrpGasto.className ="agrupacion-dato";
        for ( let valores of Object.values (gasto)) {
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.append(agrup.fecha);
            let spanClaveValor = document.createElement("span");
            spanClave.className = "agrupacion-dato-valor";
            spanClave.append(agrup.valor);
        }
        divAgrupar.append(agrupDatos);
        
    })

}




// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}