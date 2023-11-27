import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
    }
    
function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento);

    let nuevoGastoDiv = document.createElement('div');
    nuevoGastoDiv.classList.add(`gasto`);

    let descripcionDiv = document.createElement(`div`);
    descripcionDiv.classList.add(`gasto-descripcion`);
    descripcionDiv.innerText = `Descripción del gasto: ${gasto.descripcion}`;
    nuevoGastoDiv.append(descripcionDiv);

    let fechaDiv = document.createElement(`div`);
    fechaDiv.classList.add(`gasto-fecha`);
    fechaDiv.innerText = `Fecha del gasto: ${new Date(gasto.fecha).toLocaleString()}`;
    nuevoGastoDiv.append(fechaDiv);

    let valorDiv = document.createElement('div');
    valorDiv.classList.add('gasto-valor');
    valorDiv.innerText = gasto.valor;
    nuevoGastoDiv.append(valorDiv);   

    let etiquetasDiv = document.createElement('div');
    etiquetasDiv.classList.add(`gasto-etiquetas`);

    //FOR para recorrer todas las etiquetas del gasto:
    gasto.etiquetas.forEach(etiqueta => {
        let etiquetaSpan = document.createElement(`span`);
        etiquetaSpan.classList.add(`gasto-etiquetas-etiqueta`);
        etiquetaSpan.innerText = etiqueta;
        //creamos <span> hijo del <div>
        etiquetasDiv.append(etiquetaSpan);

        nuevoGastoDiv.append(etiquetasDiv);
    });

    elemento.append(nuevoGastoDiv);


    //cree dos botones para editar y borrar el gasto y añada los manejadores de eventos
    //necesarios para realizar las acciones de edición y borrado de gastos y borrado de etiquetas.

    //botón editar
    let botonEditar = document.createElement(`button`);
    botonEditar.type = `button`;
    botonEditar.className = `gasto-editar`;
    botonEditar.innerText = `Editar Gasto`;
    //  nuevo objeto
    let eventEditar = new EditarHandle();
    
    eventEditar.gasto = gasto;
    botonEditar.addEventListener(`click`, eventEditar);
    nuevoGastoDiv.append(botonEditar);
    
    //botón borrar
    let botonBorrar = document.createElement(`button`);
    botonBorrar.type = `button`;
    botonBorrar.className = `gasto-borrar`;
    botonBorrar.innerText = `Borrar Gasto`;
    
    //  nuevo objeto
    /*
    let eventBorrar = new BorrarHandle();
    

    eventBorrar.gasto = gasto;
    botonBorrar.addEventListener(`click`, eventBorrar);
    nuevoGastoDiv.append(botonBorrar);
*/
}


    
function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {
    let elemento =document.getElementById(idElemento);

    let nuevoDiv = document.createElement(`div`);
    nuevoDiv.classList.add(`agrupacion`);

    let h1 = document.createElement(`h1`);
    h1.innerText = `Gastos agrupados por ${periodo}`;
    nuevoDiv.append(h1);

    //For para los objetos devueltos por agruparGastos
    //Object.entries devuelve un array [clave, valor]
    for (let [clave, valor] of Object.entries (agrup)){
        let datoDiv = document.createElement(`div`);
        datoDiv.classList.add(`agrupacion-dato`);

        let claveSpan = document.createElement(`span`);
        claveSpan.classList.add(`agrupacion-dato-clave`);
        claveSpan.innerText = `Clave es de ${clave}, `;
        datoDiv.append(claveSpan);
 
        let valorSpan = document.createElement(`span`);
        valorSpan.classList.add(`agrupacion-dato-valor`);
        valorSpan.innerText = `valor es de ${valor}`;
        datoDiv.append(valorSpan);

        nuevoDiv.append(datoDiv);
    }
    elemento.append(nuevoDiv);
}


function repintar(){

    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId(`presupuesto`,`Presupuesto: ${gesPres.mostrarPresupuesto()} €`);
    
    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId(`gastos-totales`,`Gastos totales: ${gesPres.calcularTotalGastos()} €`);
    
    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId(`balance-total`,`Balance total: ${gesPres.calcularBalance()} €`);
    
    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
    //Puedes utilizar innerHTML para borrar el contenido de dicha capa
    let listadoGastosCompleto = document.getElementById(`listado-gastos-completo`);
    listadoGastosCompleto.innerHTML = ` `;
    
    //Mostrar el listado completo de gastos en div#listado-gastos-completo
    //(funciones listarGastos y mostrarGastoWeb)
    gesPres.listarGastos().forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt('Introduce un nuevo presupuesto');
    nuevoPresupuesto = Number(nuevoPresupuesto); //convertimos a número
    gesPres.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

// evento click del botón actualizarpresupuesto mediante addEventListener
let buttonActualizarPresupuesto = document.getElementById(`actualizarpresupuesto`);
buttonActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcionNuevo = prompt (`introduce descripción`);
    let valorNuevo = prompt (`introduce valor`);
    let fechaNuevo = prompt (`introduce fecha en formato yyyy-mm-dd`);
    let etiquetasNuevo = prompt (`introduce etiquetas separadas por comas`);

    valorNuevo = Number(valorNuevo);
    let etiquetasArray = etiquetasNuevo.split(`,`);

    let nuevoGasto = {
        descripcion: descripcionNuevo,
        valor: valorNuevo,
        fecha: fechaNuevo,
        etiquetas: etiquetasArray
    }
    gesPres.anyadirGasto(nuevoGasto);
    repintar();
}
//evento click del botón anyadirgasto mediante addEventListener
let buttonAnyadirGasto = document.getElementById(`anyadirgasto`);
buttonAnyadirGasto.addEventListener(`click`,nuevoGastoWeb);

function EditarHandle() {
    //METODO
    this.handleEvent = function() {

    let descripcionNuevo = prompt (`introduce nueva descripción`, this.gasto.descripcion);
    let valorNuevo = prompt (`introduce valor`, this.gasto.valor);
    let fechaNuevo = prompt (`introduce fecha en formato yyyy-mm-dd`/*, this.gasto,fecha*/);
    let etiquetasNuevo = prompt (`introduce etiquetas separadas por comas`, this.gasto.etiquetas.join(','));

    valorNuevo = Number(valorNuevo);
    let etiquetasArray = etiquetasNuevo.split(`,`);
    
    this.gasto.actualizarDescripcion(descripcionNuevo);
    this.gasto.actualizarValor(valorNuevo);
    this.gasto.actualizarFecha(fechaNuevo);

    this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
    this.gasto.anyadirEtiquetas(...etiquetasArray);

    repintar();
    }
}

function BorrarHandle() {
    //METODO
    this.handleEvent = function() {
        gesPres.borrarGasto(this.gasto.idElemento);
        repintar();
    }

    //PROPIEDAD
    this.gasto=gasto;
}

function BorrarEtiquetasHandle() {
    //METODO
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();

    }
    //PROPIEDAD
    this.gasto=gasto;
    this.etiqueta=etiqueta;
}


export{
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}    