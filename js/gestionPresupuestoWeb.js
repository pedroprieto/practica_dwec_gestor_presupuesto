import * as gesPres from "./gestionPresupuesto.js";




function mostrarDatoEnId (idElemento, valor) {

    document.getElementById(idElemento).innerHTML = valor;
    
}


function mostrarGastoWeb (idElemento, gasto) {

    let div = document.createElement('div');
    div.className = "gasto";

    let div1 = document.createElement('div');
    div1.className = "gasto-descripcion";
    div1.append(gasto.descripcion);

    let div2 = document.createElement('div');
    div2.className = "gasto-fecha";
    div2.append(gasto.fecha);

    let div3 = document.createElement('div');
    div3.className = "gasto-valor";
    div3.append(gasto.valor);

    let div4 = document.createElement('div');
    
    

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        
        span.append(etiqueta);
        div4.append(span);
        
    }

    div4.className = "gasto-etiquetas";
    
    
    let botonEditar = document.createElement('button');
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;
    botonEditar.addEventListener('click', evEditar);
    div.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;
    botonBorrar.addEventListener('click', evBorrar);
    div.append(botonBorrar);

    let id = document.getElementById(idElemento);
    id.append(div);


}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

    let id = document.getElementById(idElemento);
    id.innerHTML = "";

    let div = document.createElement('div');
    div.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.innerHTML = "Gastos agrupados por " + periodo;
    
    div.append(h1);


    for (let [clave, valor] of Object.entries(agrup))
    {

        let div1 = document.createElement('div');
        div1.className = "agrupacion-dato";

        let span = document.createElement('span');
        span.className = "agrupacion-dato-clave";
        span.append(clave);
        
        let span1 = document.createElement('span');
        span1.className = "agrupacion-dato-valor";
        span1.append(valor);

        div1.append(span);
        div1.append(span1);
        div.append(div1);
        id.append(div);
        
    } 

    
}

function repintar() {

    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos()); 
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    
    document.getElementById("listado-gastos-completo").innerHTML = "";
    let gastos = gesPres.listarGastos();

    for (let gasto of gastos)
    {
        mostrarGastoWeb("listado-gastos-completo", gasto);

    }

    mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "día");

    mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");

    mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "año");
}


function EditarHandle() {
    
    this.handleEvent = function () {

        let nDescripcion = prompt("Introduce la descripción");
        this.gasto.actualizarDescripcion(nDescripcion);

        let nValor = prompt("Introduce el valor");
        nValor = parseFloat(nValor);
        this.gasto.actualizarValor(nValor);

        let nFecha = prompt("Introduce la fecha");
        this.gasto.actualizarFecha(nFecha);

        let nEtiquetas = prompt("Introduce las etiquetas");
        let arrEtiquetas = nEtiquetas.split(',');
        this.gasto.anyadirEtiquetas(arrEtiquetas);
        
        
        
        repintar();
        

    }


}

function BorrarHandle() {

    this.handleEvent = function() {

        gesPres.borrarGasto(this.gasto.id);

        repintar();

    }
}

function actualizarPresupuestoWeb() {
        
    let presupuestoActualizado = prompt("Introduce el nuevo presupuesto");
    presupuestoActualizado = parseFloat(presupuestoActualizado);

    gesPres.actualizarPresupuesto(presupuestoActualizado);

    repintar();

}

let actualizar = document.getElementById("actualizarpresupuesto");
actualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {

    let nuevaDesc = prompt("Introduce una nueva descripción");
    let nuevoValor = prompt("Introduce un nuevo valor");
    let nuevaFecha = prompt("Introduce una nueva fecha");
    let nuevaEtiquetas = prompt("Introduce las nuevas etiquetas");

    nuevoValor = parseFloat(nuevoValor);

    let arrEtiquetas = nuevaEtiquetas.split(',');

    let gasto = new gesPres.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, arrEtiquetas);

    gesPres.anyadirGasto(gasto);

    repintar();

}

let anyadir = document.getElementById("anyadirgasto");
anyadir.addEventListener("click", nuevoGastoWeb);


export   {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}