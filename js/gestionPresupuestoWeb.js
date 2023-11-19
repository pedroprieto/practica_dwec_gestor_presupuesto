import * as gestPres from "./gestionPresupuesto.js"

//-----------------------------   Interaccion con HTML   ---------------------------------------------

function mostrarDatoEnId(idElemento, valor){
    // se busca el elemnto con el id indicado y muestra el valor en dicho elemnto
    return document.getElementById(idElemento).innerText = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);
    
    // crear Div .gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    // div gasto irá dentro del elemento con el id que se le indique
    contenedor.append(divGasto);

    // Crear div .gasto-descripcion
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    // añadir el contenido de descripcion
    divDescripcion.innerText = gasto.descripcion;
    // Div .descripcion va dentro de divGasto
    divGasto.append(divDescripcion);

    // Crear div .gasto-fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;
    divGasto.append(divFecha);

    // Crear div .gasto-valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    divGasto.append(divValor);

    // Crear div .gasto-etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.append(divEtiquetas);

    //---- Agregar las etiquetas al div .gasto-etiquetas
    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.innerText = etiqueta;
        divEtiquetas.append(spanEtiqueta);

         // Eventos para los span
        // las etiquetas se borran si se hace click sobre ellas
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", borrarEtiqueta); // se añade sobre cada etiqueta el evento
    }

    // Crear div de los botones

    //Boton Editar
    let btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.innerText = "Editar"; 
    let editar = new EditarHandle();
    editar.gasto = gasto; // Establecer la propiedad gasto del objeto creado al objeto gasto
    btnEditar.addEventListener('click', editar);
    divGasto.append(btnEditar);

    //Boton Borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.innerText = "Borrar";
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    btnBorrar.addEventListener("click", borrar)
    divGasto.append(btnBorrar);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);
    
    // div .agrupacion
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion"
    contenedor.append(divAgrupacion);

    // se crea el h1
    let contH1 = document.createElement("h1");
    contH1.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(contH1);
    
    //crear un div.agrupacion-dato para cada propiedad del objeto agrup:
    for(let [clave, valor] of Object.entries(agrup)){
        // se crea el div de cada agrupacion
        let divGrupo = document.createElement("div");
        divGrupo.className = "agrupacion-dato";
        divAgrupacion.append(divGrupo);
        // span con el nombre del grupo
        let spanGrupo = document.createElement("span");
        spanGrupo.className = "agrupacion-dato-clave";
        spanGrupo.innerHTML = clave;
        divGrupo.append(spanGrupo);
        // span con el valor del grupo
        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = valor;
        divGrupo.append(spanValor);
    }
}

// -------------------------------------    EVENTOS EN JAVASCRIPT    ---------------------------------------
function repintar(){
    // mostrar presupuesto
    let presupuesto = gestPres.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    // mostrar gastos totales
    let gastosTotales = gestPres.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    // mostrar el balance total
    let balanceTotal = gestPres.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    // borar el contenido de div#listado-gastos-completo
    let contenidoBorrar = document.getElementById("listado-gastos-completo");
    contenidoBorrar.innerHTML = "";

    // Mostrar listado completo de gastos
    let gastos = gestPres.listarGastos();
    for (let gasto of gastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Indica el nuevo Presupuesto: ");
    // pasar de sting a numero
    parseFloat(nuevoPresupuesto);
    gestPres.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}
// Asociar la funcion al boton
let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb (){
    let descripcion = prompt("Cúal es la descripción?");
    let valor = prompt("Indica el valor");
    let fecha = prompt("Indica la fecha en formato yyyy-mm-dd");
    let etiquetas = prompt("Indica las etiquetas separadas por comas");

    let valorNumerico = parseFloat(valor);
    let etiquetasArray = etiquetas.split(",");

    let gasto = new gestPres.CrearGasto(descripcion, valorNumerico, fecha, ...etiquetasArray);
    gestPres.anyadirGasto(gasto);

    repintar();
}
// Asocial la funcion al boton
let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(event){
        let descripcion = prompt("Cúal es la descripción?");
        let valor = prompt("Indica el valor");
        let fecha = prompt("Indica la fecha en formato yyyy-mm-dd");
        let etiquetas = prompt("Indica las etiquetas separadas por comas");

        let valorNumerico = parseFloat(valor);
        let etiquetasArray = etiquetas.split(",");

        // los metodos de actualizar vienen de gestionPresupuesto
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valorNumerico);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(event){
        gestPres.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}