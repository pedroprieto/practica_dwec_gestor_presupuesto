//Importar librería js/gestionPresupuesto.js
import * as gestPresupuesto from "./gestionPresupuesto.js";

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
    let fechaString = new Date(gasto.fecha);
    divFecha.innerText = fechaString.toLocaleDateString();
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
    let h1Periodo = document.createElement("h1");
    h1Periodo.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupar.append(h1Periodo);
    let agrupDatos = Object.entries(agrup);
    agrupDatos.map( (movimiento) => {
        let divAgrpGasto = document.createElement("div");
        divAgrpGasto.className ="agrupacion-dato";
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.append(movimiento[0]);
            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.append(movimiento[1]);
        divAgrpGasto.append(spanClave, spanValor);
        divAgrupar.append(divAgrpGasto);
        })
        
    let agrupacionPeriodo = document.getElementById(IdElemento);
    agrupacionPeriodo.append(divAgrupar);
}

//Crear una función repintar para actualizar la página
function repintar (){
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId('presupuesto', gestPresupuesto.mostrarPresupuesto());
    
    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId('gastos-totales',gestPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId('balance-total', gestPresupuesto.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById('listado-gastos-completo').innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let gastos of gestPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gastos);
    }
}


// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}