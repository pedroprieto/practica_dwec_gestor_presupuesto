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
    gastoElement.classList.add(`gasto`);  
    gastoElement.setAttribute('id',`${gasto.id}`);     
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
        let eliminarEtiquetasManejador = new BorrarEtiquetasHandle;
        eliminarEtiquetasManejador.gasto= gasto;
        eliminarEtiquetasManejador.etiqueta= g;
        etiquetaElement.addEventListener("click",eliminarEtiquetasManejador);
        etiquetasElement.appendChild(etiquetaElement);
    }
    
    gastoElement.appendChild(etiquetasElement);
    //botones prompt
    let editElement = document.createElement("button");
    editElement.classList.add("gasto-editar")
    editElement.setAttribute("type","button");
    editElement.textContent = "Editar";
    let editarManejador = new EditarHandle;
    editarManejador.gasto= gasto;
    editElement.addEventListener("click",editarManejador);
    gastoElement.appendChild(editElement);

    let deleteElement = document.createElement("button");    
    deleteElement.classList.add("gasto-borrar")
    deleteElement.setAttribute("type","button");
    deleteElement.textContent = "Eliminar";
    let eliminarManejador = new BorrarHandle;
    eliminarManejador.gasto= gasto;
    deleteElement.addEventListener("click",eliminarManejador);
    gastoElement.appendChild(deleteElement);
    //boton editar formulario
    let editElementFORM = document.createElement("button");
    editElementFORM.classList.add("gasto-editar-formulario")
    editElementFORM.setAttribute("type","button");
    editElementFORM.textContent = "Editar (formulario)";
    let editarManejadorFORM = new EditarHandleFormulario;
    editarManejadorFORM.gasto = gasto;
    editarManejadorFORM.contenedor = editElementFORM;
    editElementFORM.addEventListener("click",editarManejadorFORM);
    gastoElement.appendChild(editElementFORM);
    
    let contenedor= document.getElementById(idElemento);
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
    document.getElementById("presupuesto").innerHTML='<div id="presupuesto"></div>';
    document.getElementById("gastos-totales").innerHTML='<div id="gastos-totales"></div>';
    document.getElementById("balance-total").innerHTML='<div id="balance-total"></div>';
    mostrarDatoEnId("presupuesto",gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales",gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total",gesPres.calcularBalance());
    let lG = document.getElementById("listado-gastos-completo");
    lG.innerHTML= '<div id="listado-gastos-completo"></div>';
    var gastos = gesPres.listarGastos();
    
    gastos.forEach(g => {
        mostrarGastoWeb("listado-gastos-completo",g);
    });
}
function actualizarPresupuestoWeb(){
    let pres = prompt("Introduce el nuevo presupuesto");
    gesPres.actualizarPresupuesto(parseFloat(pres));
    repintar();
}
function nuevoGastoWeb(){
    let desc = prompt("Introduce la descripción del gasto");
    let val = prompt("Introduce el valor");
    let fec = prompt("Introduce la fecha (yyyy-mm-dd");
    let eti = prompt("Introduce etiquetas (eti1,eti2,eti3,...)");
    let listEti= eti.split(",");
    let nuevoGasto = new gesPres.CrearGasto(desc,parseFloat(val),fec);
    listEti.forEach(e=> nuevoGasto.anyadirEtiquetas(e));
    gesPres.anyadirGasto(nuevoGasto);
    repintar();
}
function EditarHandle(){

    EditarHandle.prototype.handleEvent= function(){
        let descripcion = prompt("Ingrese la nueva descripción del gasto:", this.gasto.descripcion);
        let valor = parseFloat(prompt("Ingrese el nuevo valor del gasto:", this.gasto.valor));
        let fecha = prompt("Ingrese la nueva fecha del gasto (yyyy-mm-dd):", this.gasto.fecha);
        let etiquetas = prompt("Ingrese las nuevas etiquetas del gasto (separadas por comas):").split(',');
        
        this.gasto.actualizarValor(parseFloat(valor));
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        if(etiquetas.length >= 0 && etiquetas[0] != ""){
            console.log(etiquetas.length)
            this.gasto.anyadirEtiquetas(...etiquetas);
        }
       
        repintar();
    };
}
function BorrarHandle(){

    BorrarHandle.prototype.handleEvent= function(){
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    };
}
function BorrarEtiquetasHandle(){

    BorrarEtiquetasHandle.prototype.handleEvent= function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}
function EditarHandleFormulario(){
    EditarHandleFormulario.prototype.handleEvent= function(){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        this.contenedor.setAttribute("disabled","true");
        let contenedor = document.getElementById(this.gasto.id);
        contenedor.before(formulario);

        formulario.querySelector("#descripcion").value=this.gasto.descripcion;
        formulario.querySelector("#valor").value=this.gasto.valor;
        formulario.querySelector("#fecha").value=new Date(this.gasto.fecha).toISOString().slice(0,10);
        formulario.querySelector("#etiquetas").value=this.gasto.etiquetas;
        
        let botonEnviar = formulario.querySelector('button[type="submit"]');
        botonEnviar.addEventListener("click",new EnviarEditarFormulario(this.gasto));
       
        let botonCancelar= formulario.querySelector(".cancelar");
        botonCancelar.addEventListener("click",new CancelarFormulario);
        
    };
}
function EnviarEditarFormulario(gasto){
    EnviarEditarFormulario.prototype.handleEvent= function(){
        event.preventDefault();
        let desc = document.querySelector("#descripcion").value;
        let valor = document.querySelector("#valor").value;
        let fec = document.querySelector("#fecha").value;
        let etiquetasTexto = document.querySelector("#etiquetas").value;
        let etiquetas= etiquetasTexto.split(',');
        gasto.actualizarDescripcion(desc);
        gasto.actualizarValor(parseFloat(valor));
        gasto.actualizarFecha(fec);
        for ( var eti of etiquetas){
            if(eti!="") {
                gasto.anyadirEtiquetas(eti)
            }
        }
        repintar();
    };
}
function EnviarFormulario(){
    EnviarFormulario.prototype.handleEvent= function(){
        event.preventDefault();
        let desc = event.target.elements.descripcion.value;
        let valor = event.target.elements.valor.value;
        let fec = event.target.elements.fecha.value;
        let etiquetas = event.target.elements.etiquetas.value.split(',');

        let gastoNuevoForm= new gesPres.CrearGasto(desc,parseFloat(valor),fec, ...etiquetas);
        gesPres.anyadirGasto(gastoNuevoForm);

        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
        event.target.remove();
    };
}
function CancelarFormulario(){
    CancelarFormulario.prototype.handleEvent= function(){ 
        event.target.form.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;
        repintar();
    };
}
function nuevoGastoWebFormulario(){
    document.getElementById("anyadirgasto-formulario").disabled = true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let controlesPrincipales = document.getElementById("controlesprincipales");
    controlesPrincipales.append(formulario);

    formulario.addEventListener("submit",new EnviarFormulario);
    let botonCancelar= formulario.querySelector(".cancelar");
    botonCancelar.addEventListener("click",new CancelarFormulario);
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    nuevoGastoWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWebFormulario
}