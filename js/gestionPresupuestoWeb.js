import * as gestion from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let listadoGastos = document.getElementById(idElemento);
   
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
    divValor.className = "gasto-valor"
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

    let divEti = document.createElement('div');
    divEti.className = "gasto-etiquetas";
    divGasto.append(divEti);
    listadoGastos.append(divGasto); 

    for(let etiqueta of gasto.etiquetas){
        let spanEti = document.createElement('span');
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = etiqueta;
        
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEti.addEventListener('click', borrarEtiqueta);
        divEti.append(spanEti);
    }
    
    let botoneditar = document.createElement('button');
    botoneditar.className = "gasto-editar";
    botoneditar.type = "button";
    botoneditar.innerHTML = "Editar";
    let editar = new EditarHandle();
    editar.gasto = gasto;
    botoneditar.addEventListener("click", editar);
    listadoGastos.append(botoneditar);
    
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.innerHTML = "Borrar";
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    listadoGastos.append(botonBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let gastosAgrup = document.getElementById(idElemento);

    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let h1Agrup = document.createElement("h1");
    h1Agrup.innerText = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1Agrup);

     for (let [key, value] of Object.entries(agrup)) {   
        let divAgrudato = document.createElement('div');
        divAgrudato.className = "agrupacion-dato";
        let spanAgrupClave = document.createElement('span')  
        spanAgrupClave.className = "agrupacion-dato-clave";
        spanAgrupClave.innerText = `${key}`; 
        let spanAgrupValor = document.createElement('span')  
        spanAgrupValor.className = "agrupacion-dato-valor";
        spanAgrupValor.innerText = `${value}`;   
        divAgrudato.append(spanAgrupClave);
        divAgrudato.append(spanAgrupValor);  
        divAgrup.append(divAgrudato);         
     }              
    gastosAgrup.append(divAgrup);     
}

function repintar(){
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());
    let gastosCompletos = document.getElementById("listado-gastos-completo");
    gastosCompletos.innerText = "";
    for (let gasto of gestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb () {
    let introValor = prompt("Introduce un presupuesto: ");
    parseFloat(introValor);
    gestion.actualizarPresupuesto(parseFloat(introValor));
    repintar();  
}

let  botonActualizarPres = document.getElementById('actualizarpresupuesto');
botonActualizarPres.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb (){
    let descripcion = prompt("Introduzca la descripción: ");
    let valor = prompt("Introduzca el valor: ");
    let fecha = prompt("Introduzca la fecha:");
    let etiquetas = prompt("Introduzca las etiquetas: ");
    let gasto = new gestion.CrearGasto(descripcion, parseFloat(valor), fecha, etiquetas.split(","));
    gestion.anyadirGasto(gasto);
    repintar();   
}

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduzca la descripcion: ");
        let valor = Number(prompt("Introduzca el valor: "));
        let fecha = prompt("Introduzca la fecha: ");
        let etiquetas = prompt("Introduzca las etiquetas: " );
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas.split(","));
        repintar();
    }
}


function BorrarHandle() {

    this.handleEvent = function (event) {
        gestion.borrarGasto(this.gasto.id);
        repintar();
    }

}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb
}
