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
    divFecha.innerText = new Date(gasto.fecha).toISOString().substring(0,10);
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

            let borrarEti = new BorrarEtiquetasHandle();
            borrarEti.gasto = gasto;
            borrarEti.eti = eti;
            spanEti.addEventListener('click', borrarEti);
            

        }
    }
    divGasto.append(divEti);

    let btnEditar = document.createElement('button');
    btnEditar.innerText = "Editar";
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    let editar = new EditarHandle();
    editar.gasto = gasto;
    btnEditar.addEventListener("click", editar);
    divGasto.append(btnEditar);

    let btnBorrar = document.createElement('button');
    btnBorrar.innerText = "Borrar";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    btnBorrar.addEventListener('click', borrar);
    divGasto.append(btnBorrar);

    let btnEditarForm = document.createElement('button');
    btnEditarForm.innerText = "Editar (formulario)";
    btnEditarForm.className = "gasto-editar-formulario";
    btnEditarForm.type = "button";
    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    btnEditarForm.addEventListener('click', editarForm);
    divGasto.append(btnEditarForm);


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
    let presu = Number(prompt("Introduzca un nuevo presupuesto"));
    
    gesPres.actualizarPresupuesto(presu);
    
    repintar();

}


let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca descripcion");
    let valor = Number(prompt("Introduzaca valor"));
    let fecha = prompt("Introduzca fecha");
    let etiquetas = prompt("Introduzca etiquetas");

    let arrEtiquetas = etiquetas.split(', ');

    let gasto = new gesPres.CrearGasto(descripcion, valor, fecha, ...arrEtiquetas);

    gesPres.anyadirGasto(gasto);

    repintar();
}

function EditarHandle(){                                            // Meter 2º valor del prompt
    
    this.handleEvent = function(event) {         
        let nuevaDescripcion = prompt("Introduzca la nueva descripcion");
        let nuevoValor = Number(prompt("Introduzaca el nuevo valor"));
        let nuevaFecha = prompt("Introduzca la nueva fecha");
        let nuevaEtiquetas = prompt("Introduzca nuevas etiquetas");
    
        let arrEtiquetas = nuevaEtiquetas.split(', ');
        
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(arrEtiquetas);

        repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function(event){
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.eti);
        repintar();
    }
}

function submitFormulario(event){ 
    event.preventDefault();

    let arrEti = event.target.etiquetas.value.split(", ");
    let gasto = new gesPres.CrearGasto(event.target.descripcion.value, 
        Number(event.target.valor.value), event.target.fecha.value, ...arrEti);

    gesPres.anyadirGasto(gasto);

    repintar();
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");

    btnAnyadirGastoForm.disabled = false;
    event.target.remove();
    
}

function CancelarFormulario(){

    this.handleEvent = function(event){
        this.formulario.remove();
        this.boton.disabled = false;

    }

    /* ver xq en uno form y otro plantilla L234
        ver bn (en esta funcion x ej) 
        event.target.remove() <-- aca borra el boton cancelar
        ver q onda */
}

function EditarHandleFormulario(){
    
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        e.currentTarget.after(formulario);
        e.target.disabled = true;

        // Botones || Submit
        let submitEditar = new SubmitBtnEditarForm();
        submitEditar.gasto = this.gasto;
        formulario.addEventListener("submit", submitEditar);
        
        // Botones || Cancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarFormEditar = new CancelarFormulario();
        cancelarFormEditar.formulario = formulario;
        cancelarFormEditar.boton = e.currentTarget;
        btnCancelar.addEventListener('click', cancelarFormEditar);

    }
}

function SubmitBtnEditarForm(){

    this.handleEvent = function(e){
        e.preventDefault();
        
        let form = e.currentTarget;
        this.gasto.actualizarDescripcion(form.elements.descripcion.value)
        this.gasto.actualizarValor(Number(form.elements.valor.value));
        this.gasto.actualizarFecha(form.elements.fecha.value);
        
        let etis = form.elements.etiquetas.value;
        let arrEti = etis.split(',');
        this.gasto.anyadirEtiquetas(...arrEti);
        
        repintar();
    }
}


let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoForm.addEventListener('click', nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(event){
    // Creamos copia form
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    
    // Accedemos al <form> || Manejadores
    let formulario = plantillaFormulario.querySelector("form"); // ver xq en uno form y otro
    formulario.addEventListener('submit', submitFormulario);

    let btnCancelar = plantillaFormulario.querySelector("button.cancelar");
    let borrarForm = new CancelarFormulario();
    borrarForm.formulario = formulario;
    borrarForm.boton = event.currentTarget;

    btnCancelar.addEventListener("click", borrarForm);

    //mostramos/añadimos form + boton
    event.target.disabled = true;
    let controles = document.getElementById("controlesprincipales");
    controles.append(plantillaFormulario);
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};