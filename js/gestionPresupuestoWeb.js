import * as gestorPresu from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Obtén el elemento objetivo
    let elementoObj = document.getElementById(idElemento);

    // Crea los elementos div
    let divGasto = document.createElement('div');
    let divGasDesc = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor = document.createElement('div');
    let divGasEtiquetas = document.createElement('div');
    // Asigna las clases
    divGasto.className = "gasto";
    divGasDesc.className = "gasto-descripcion";
    divGasFecha.className = "gasto-fecha";
    divGasValor.className = "gasto-valor";
    divGasEtiquetas.className = "gasto-etiquetas";
    // Asigna los valores
    divGasDesc.innerText = gasto.descripcion;
    divGasValor.innerText = gasto.valor;
    // Formatea la fecha (si gasto.fecha es un objeto Date)
    let fechaFormateada = new Date(gasto.fecha).toLocaleDateString()
    //let fechaFormateada = gasto.fecha;
    divGasFecha.innerText = fechaFormateada;
    // Agrega etiquetas
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.append(`${etiqueta},`)

        spanEtiqueta.addEventListener('click', function () { //No se si funciona
            BorrarEtiquetasHandle(gasto, etiqueta);         //igual
        });
        divGasEtiquetas.append(spanEtiqueta);
    }
    // Agrega los elementos al divGasto
    divGasto.append(divGasDesc);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);
    divGasto.append(divGasEtiquetas);
    // Agrega el divGasto al elemento objetivo
    elementoObj.append(divGasto);
    //Botón Editar
    let botonEditar = document.createElement('button');
    botonEditar.className='gasto-editar';
    botonEditar.innerTextent = 'Editar';
    botonEditar.addEventListener('click', new EditarHandle(gasto) );
    divGasto.append(botonEditar) ;  
    elementoObj.append(divGasto);
    //Botón Borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className ='gasto-borrar';
    botonBorrar.innerText = 'Borrar';
    botonBorrar.addEventListener('click' , new BorrarHandle(gasto)); 
    divGasto.append(botonBorrar);
    elementoObj.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtén el elemento objetivo
    let elementoObjetivo = document.getElementById(idElemento);

    // Creo elemento div para la agrupación
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";

    // Creo elemento h1 para mostrar el periodo
    let periodo1 = "mes";
    if (periodo == "dia") {
        periodo1 = "día";
    } else if (periodo == "anyo") {
        periodo1 = "año";
    }

    let h1Periodo = document.createElement("h1");
    h1Periodo.innerText = `Gastos agrupados por ${periodo1}`;
    divAgrupacion.append(h1Periodo);

    // Itera sobre las propiedades del objeto agrup
    for (let clave in agrup) {
        if (Object.prototype.hasOwnProperty.call(agrup, clave)) {
            // Crea el elemento div para cada propiedad
            let divAgrupacionDato = document.createElement("div");
            divAgrupacionDato.className = "agrupacion-dato";

            // Crea el elemento span para la clave (nombre de la propiedad)
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerText = clave;

            // Crea el elemento span para el valor (cantidad)
            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.innerText = agrup[clave];

            // Agrega los elementos al divAgrupacionDato
            divAgrupacionDato.append(spanClave);
            divAgrupacionDato.append(spanValor);

            // Agrega el divAgrupacionDato al divAgrupacion
            divAgrupacion.append(divAgrupacionDato);
        }
    }
    
    // Agrega el divAgrupacion al elemento objetivo
    elementoObjetivo.append(divAgrupacion);
}

function repintar() { 
    let mostrarPresupuesto = gestorPresu.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", mostrarPresupuesto);
    let totalGasto = gestorPresu.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGasto);
    let blanceTotal = gestorPresu.calcularBalance();
    mostrarDatoEnId("balance-total", blanceTotal);
    let divlistado = document.getElementById("listado-gastos-completo");
    divlistado.innerHTML = " ";
    let listarGasto = gestorPresu.listarGastos();

    for (let gasto of listarGasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let presuWeb = prompt('Actualiza el presupuesto: '); 

    presuWeb = parseFloat(presuWeb); 
    gestorPresu.actualizarPresupuesto(presuWeb); 

    repintar(); 
}

function nuevoGastoWeb() { 
    //Pedir al usuario la información necesaria para crear un nuevo gasto
    let descripcion = prompt('Introduce la descripción del gasto: ');
    let valorStr = prompt('Introduce la cantidad: ');
    let fecha = prompt('Introduce una fecha en formato año-mes-día (yyyy-mm-dd, 2024-1-05):  ');
    let etiqueta = prompt('Introduce las etiquetas separadas por comas: comida, casa ');
    let arrayEtiquetas = etiqueta.split(', ');
    valorStr = parseFloat(valorStr);

    let nuevoGasto = new gestorPresu.CrearGasto(descripcion, valorStr, fecha, arrayEtiquetas);
    gestorPresu.anyadirGasto(nuevoGasto);

    repintar();
}

function EditarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function (event) {

    let nuevaDescripcion = prompt("Introduce la descripción del gasto", this.gasto.descripcion);
    let valor = prompt("Introduce el valor del gasto", this.gasto.valor);
    let nuevaFecha = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd", new Date(this.gasto.fecha).toISOString().slice(0, 10));
    let strEtiquetas = prompt("Introduce las etiquetas separadas por comas (,)", this.gasto.etiquetas.join(", "));

     valor = parseFloat(valor);
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.etiquetas = strEtiquetas.split(',').map(etiqueta => etiqueta.trim());

     repintar();
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function (event) {

     gestorPresu.borrarGasto(this.gasto.id);
     repintar();
    }
} 
 
function BorrarEtiquetasHandle(gasto, etiqueta) {
    
    /*BorrarEtiquetasHandle.prototype.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();*/
     if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
            let etiqResultado = gasto.etiquetas.indexOf(etiqueta);    
        if (etiqResultado !== -1) {
            gasto.etiquetas.splice(etiqResultado, 1);
     
                 repintar();
             }
         }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
};
