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

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};