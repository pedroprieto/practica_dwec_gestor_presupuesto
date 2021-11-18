import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento,valor){
    document.getElementById(idElemento).append(valor);
}

function auxCrearElemento(tagHTML,clase,contenido){
    let etiqueta=document.createElement(tagHTML);
    etiqueta.className=clase;
    etiqueta.innerHTML=contenido;
    return etiqueta;
}

function mostrarGastoWeb(idElemento,gasto){

    let tag = document.createElement('div');
    tag.className="gasto";

    tag.prepend(auxCrearElemento('div',"gasto-descripcion", gasto.descripcion));
    tag.prepend(auxCrearElemento('div',"gasto-fecha", gasto.fecha));
    tag.prepend(auxCrearElemento('div',"gasto-valor", gasto.valor));

    let etiquetas=document.createElement('div');
    etiquetas.className="gasto-etiquetas";

 

    if ( gasto.etiquetas ){

        for(let etiqueta of gasto["etiquetas"]){
            let span=document.createElement('span');
            span.className="gasto-etiquetas-etiqueta"

            let handleEtiqueta = new BorrarEtiquetasHandle();
            handleEtiqueta.gasto = gasto;
            handleEtiqueta.etiqueta = etiqueta;
            span.addEventListener("click", handleEtiqueta);

        span.append(etiqueta);
        etiquetas.append(span);
        }
    }
    tag.prepend(etiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.type = "button";

    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    botonEditar.addEventListener("click", handleEditar);
    tag.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.type = "button";

    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", handleBorrar);

    tag.append(botonBorrar);

    let botonEditarFormulario = document.createElement('button');
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.type = "button";
    botonEditarFormulario.content= "Editar (formulario)";

    let manejadorEventoformulario = new EditarHandleFormulario();
    manejadorEventoformulario.gasto = gasto;
    botonEditarFormulario.addEventListener("click",manejadorEventoformulario);

    tag.append(botonEditarFormulario);
    document.getElementById(idElemento).append(tag);

    

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    let elemento = document.createElement('div');
    elemento.className='agrupacion';
    let h1=document.createElement('h1');
    h1.innerHTML=`Gastos agrupados por ${periodo}`;
    elemento.prepend(h1);
    
    for(let gasto in agrup){
        let agrupa=auxCrearElemento('div','agrupacion-dato',"");
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-clave',gasto[0]));
        agrupa.prepend(auxCrearElemento('span','agrupacion-dato-valor',gasto[1]));
        elemento.prepend(agrupa);

    }
    document.getElementById(idElemento).append(elemento);
}

function repintar(){
    
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let balanceT = gp.calcularBalance();
    mostrarDatoEnId("balance-total",balanceT);

    let gastosT = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales",gastosT);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let gastoslistados = gp.listarGastos();

    for (let gasto of gastoslistados){

        mostrarGastoWeb("listado-gastos-completo",gasto)
    }
}

function actualizarPresupuestoWeb(){

    let nuevoPresupuesto = parseFloat(prompt("Introduce tu presupuesto, por favor"));
    gp.actualizarPresupuesto(nuevoPresupuesto)
    repintar();
}

let botonActualizarPresupuestoWeb = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuestoWeb.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){

    let descripcionN = prompt("Introduce la descripción del gasto, por favor");

    let valorN = prompt("Introduce el importe del gasto, por favor");
    valorN = parseFloat(valorN);

    let fechaN = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor");

    let etiquetasN = prompt("Introduce las etiquetas del gasto separadas por comas, por favor");
    etiquetasN = etiquetasN.split(',');

    let gasto = new gp.CrearGasto(descripcionN,valorN,fechaN,...etiquetasN);
    gp.anyadirGasto(gasto);

    repintar();
}
let botonNuevoGasto  = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){

    this.handleEvent = function(e){

        let descripcionNueva = prompt("Introduce una descripción del gasto, por favor : ",this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descripcionNueva);

        let valorNuevo = prompt("Introduce el importe del gasto, por favor",this.gasto.valor);
        valorNuevo = parseFloat(valorNuevo);
        this.gasto.actualizarValor(valorNuevo);

        let fechaNueva = prompt("Introduce la fecha del gasto con formato YYYY-MM-DD, por favor",this.gasto.fecha);
        this.gasto.actualizarFecha(fechaNueva);

        let etiquetasNuevas = prompt("Introduce las etiquetas del gasto separadas por comas, por favor",this.gasto.etiquetas);
        etiquetasNuevas =etiquetasNuevas.split(',');
        this.gasto.anyadirEtiquetas(...etiquetasNuevas);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){

    this.handleEvent = function(e){

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        let controlesPrincipales = document.getElementById("controlesprincipales");

        controlesPrincipales.append(formulario);

        // let botonEnviar = formulario.querySelector("submit");
        let enviarHandle = new En
        enviarHandle.gasto = this.gasto;
        enviarHandle.formulario = formulario;
        botonEnviar.addEventListener("click",enviarHandle);

        let botonCancelar =formulario.querySelector("button.cancelar");
        let cancelarEvento = new cancelarHandle();
        cancelarEvento.botonAnyadirGastoFormulario = e.target;
        botonCancelar.addEventListener("click",cancelarEvento);

        //let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
        e.target.disabled = "disabled";

        document.getElementById("componentes").append(formulario)
    }
}

function submitHandler(){
    this.handleEvent = function(e){

        e.preventDefault()

        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = formulario.elements.valor.value;
        valor= parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.etiquetas.value;
        etiquetas = etiquetas.split(',');
        this.gasto.anyadirEtiquetas(...etiquetas);

        let gasto = new gp.CrearGasto(descripcion,valor,fecha, ...etiquetas)
        gp.anyadirGasto(gasto);

        repintar();

        botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
        botonAnyadirGastoFormulario.disabled = "";
    }
} 
function cancelarHandle(){
    this.handleEvent = function(e){ 
        //document.getElementById("formulario-template").remove();

        e.target.form.remove();
        this.botonAnyadirGastoFormulario.disabled="";
    }
}

function EnviarGastoHandle(){

    this.handleEditar = function(e){

        this.preventDefault();

        let descripcion = this.formulario.elements.descripcion.value;
        let valor = this.formulario.elements.valor.value;
        let fecha = this.formulario.elements.fecha.value;
        let etiquetas = this.formulario.elements.etiquetas.value;

        valor = parseFloat(valor);

        let gastoEnviar = new gp.CrearGasto(descripcion,valor,fecha,etiquetas);
        gp.anyadirGasto(gastoEnviar);
        
        repintar();
        document.getElementById("anyadirgasto-formulario").disabled = false;
    }

}


function EditarHandleFormulario(){

    this.handleEvent = function(e){

        let plantillaFormulario = document.getElementById("formlario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let botonEditarFormulario = e.currentTarget;
        botonEditarFormulario.append(formulario);
        botonEditarFormulario.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.value;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let submitGasto = new submitHandler();
        submitGasto.formulario = formulario;
        submitGasto.gasto = this.gasto;
        formulario.addEventListener("click",submitGasto);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let eventoCancelar = new cancelarHandle();
        botonCancelar.addEventListener("click", eventoCancelar);
    }

}

export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
    
}