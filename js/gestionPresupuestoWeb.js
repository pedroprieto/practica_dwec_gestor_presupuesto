import { actualizarPresupuesto, anyadirGasto, borrarGasto, calcularBalance, calcularTotalGastos, CrearGasto, listarGastos, mostrarPresupuesto } from "./gestionPresupuesto";


function mostrarDatoEnId(idElemento, valor){
    
    document.getElementById(idElemento).innerHTML = valor;

}
function mostrarGastoWeb(idElemento, gasto){
    
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";

    div1.className ="gasto-descripcion";
    div1.append(gasto.descripcion);
    
    div2.className ="gasto-fecha";
    div2.append(gasto.fecha);
    
    div3.className ="gasto-valor";
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);

    

    for (let etiqueta of gasto.etiquetas)
    {        
        let span = document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";
        span.append(etiqueta);
        div4.append(span);
    }

    div4.className ="gasto-etiquetas";
    
    
    div.append(div4);

    let botEditar = document.createElement('button');
    botEditar.className = "gasto-editar";
    botEditar.type = "button";

    let manejadorEdit = new EditarHandle();
    manejadorEdit.gasto = gasto;
    botEditar.addEventListener("click", manejadorEdit);
    div.append(botEditar);

    let botBorrar = document.createElement('button');
    botBorrar.className = "gasto-borrar";
    botBorrar.type = "button";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botEditar.addEventListener("click", manejadorBorrar);
    div.append(botBorrar);

    let raiz = document.getElementById(idElemento);

    raiz.append(div); 
}
function mostrarGastoAgrupadosWeb(idElemento, agrup, periodo){
        
    let div = document.createElement('div');
    div.className = "agrupacion";

    let h1 = document.createElement('h1');
    h1.append(`Gastos agrupados por ${periodo}`)
    div.append(h1);


    for (let [key, value] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        div1.className = "agrupacion-dato";

        let span1 = document.createElement('span');
        span1.className = "agrupacion-dato-clave";
        span1.append(key);
    
        let span2 = document.createElement('span');
        span2.className = "agrupacion-dato-valor";
        span2.append(value);
    
        div1.append(span1);
        div1.append(span2);
        div.append(div1);
    }

    let raiz = document.getElementById(idElemento);
    raiz.append(div);

}

function repintar(){

    mostrarDatoEnId(idElemento, mostrarPresupuesto());
    mostrarDatoEnId(idElemento, calcularTotalGastos());
    mostrarDatoEnId(idElemento, calcularBalance());

    mostrarGastoWeb(idElemento, listarGastos().innerHTML);
}

function EditarHandle(){
    this.handleEvent = function(e){

        let nuevadesc = prompt("Introduce nueva descripción");
        this.gasto.descripcion = nuevadesc;

        let nuevovalor = prompt("Introduce nuevo valor");
        this.gasto.valor = parseFloat(nuevovalor);

        let nuevafecha = prompt("Introduce nueva fecha");
        this.gasto.fecha = Date.parse(nuevafecha);

        let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
        this.gasto.etiquetas = nuevaetiqueta.split(', ');

        repintar();
        
    }
}

function BorrarHandle(){
    this.handleEvent = function(e){

        borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);

        repintar();
    }
}

function actualizarPresupuestoWeb(){

    let nuevoPresupuesto = prompt("Introduzca nuevo presupuesto");
    nuevoPresupuesto = parseFloat(nuevoPresupuesto);

    actualizarPresupuesto(nuevoPresupuesto);

    repintar();
}

document.getElementById("actualizarpresupuesto");
botActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){

    let nuevadesc = prompt("Introduce nueva descripción");
    let nuevovalor = prompt("Introduce nuevo valor");
    let nuevafecha = prompt("Introduce nueva fecha");
    let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
    
    nuevovalor = parseFloat(nuevovalor);
    let arrEtiquetas = nuevaetiqueta.split(', ');

    gasto = new CrearGasto(nuevadesc, nuevovalor, nuevafecha, arrEtiquetas);
    anyadirGasto(gasto);

    repintar();

}

let botAnaydir = document.getElementById("anyadirgasto");
botAnaydir.addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastoAgrupadosWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
}