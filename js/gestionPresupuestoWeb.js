import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){

    let elem = document.getElementById(idElemento);

    elem.innerText = valor;

}

function mostrarGastoWeb(idElemento, gasto){

    //1er DIV (GASTO)
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    let divDesc = document.createElement('div');
    divDesc.className = "gasto-descripcion";
    divDesc.innerText = gasto.descripcion;
    divGasto.append(divDesc);

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

   //divGasto.append(divDesc, divFecha, divValor);      <-- tmb se puede

    let divEti = document.createElement("div");
    divEti.className = "gasto-etiquetas";

    if (gasto.etiquetas){
        for (let eti of gasto.etiquetas){
            let spanEti = document.createElement('span');
            spanEti.className = "gasto-etiquetas-etiqueta";
            spanEti.innerText = eti;
            divEti.append(spanEti);
        }
    }
    divGasto.append(divEti);
    

    let divContenedor = document.getElementById(idElemento);
    divContenedor.append(divGasto);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    //Contenedor
    let divContAgrup = document.createElement('div');
    divContAgrup.className = "agrupacion";
    
    //Titulo
    let hAgrup = document.createElement('h1');
    hAgrup.innerText = `Gastos agrupados por ${periodo}`;
    divContAgrup.append(hAgrup);

    //Porpiedades Obj-agrup
    
    let valorAgrup = Object.entries(agrup)
    for (let a of valorAgrup){

        let divDatoAgrup = document.createElement('div');
        divDatoAgrup.className = "agrupacion-dato";

        //Spans
        let nPropiedad = document.createElement('span');
        nPropiedad.className = "agrupacion-dato-clave";
        nPropiedad.innerText = a[0];
        divDatoAgrup.append(nPropiedad);

        let vPropiedad = document.createElement('span');
        vPropiedad.className = "agrupacion-dato-valor";
        vPropiedad.innerText = a[1];
        divDatoAgrup.append(vPropiedad);

        divContAgrup.append(divDatoAgrup);
    }
    

    let divContenedor = document.getElementById(idElemento);
    divContenedor.append(divContAgrup);

}

function repintar(){
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique 
        //la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    let listadoGastosCompleto = document.getElementById("listado-gastos-completo");
    listadoGastosCompleto.innerText = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let gasto of gesPres.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
    
}

let btnActPre = document.getElementById("actualizarpresupuesto");
btnActPre.addEventListener("click", actualizarPresupuestoWeb);

function actualizarPresupuestoWeb(){
    let presu = prompt("Introduzca un nuevo presupuesto");

    parseInt(presu);
    
    gesPres.actualizarPresupuesto(presu);
    
    repintar();

}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca descripcion");
    let valor = prompt("Introduzaca valor");
    let fecha = prompt("Introduzca fecha");
    let etiquetas = prompt("Introduzca etiquetas");

    parseInt(valor);

    let arrEtiquetas = etiquetas.split(', ');

    let gasto = new gesPres.CrearGasto(descripcion, valor, fecha, ...arrEtiquetas);

    gesPres.anyadirGasto(gasto);

    repintar();
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};