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
    botonEditar.className = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar";

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;
    botonEditar.addEventListener('click', evEditar);
    div.append(botonEditar);

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

        let descripcion = prompt("Introduce la descripción");
        this.gasto.actualizarDescripcion(descripcion);

        let valor = prompt("Introduce el valor");
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = prompt("Introduce la fecha");
        this.gasto.actualizarFecha(fecha);

        let etiquetas = prompt("Introduce las etiquetas");
        this.gasto.actualizarEtiquetas(etiquetas);
        
        
        repintar();
        

    }

    function actualizarPresupuestoWeb() {
        
        let presupuestoActualizado = prompt("Introduce el nuevo presupuesto");
        presupuestoActualizado = parseFloat(presupuestoActualizado);

        gesPres.actualizarPresupuesto(presupuestoActualizado);

        repintar();

    }

    let actualizar = document.getElementById("actualizarpresupuesto");
    actualizar.addEventListener("click", actualizarPresupuestoWeb);



}



export   {
    
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}