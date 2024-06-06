
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    // Acceder al elemento donde se insertará el gasto
    let elemento = document.getElementById(idElemento);

    // Crear el contenedor principal del gasto
    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';

    // Añadir descripción del gasto
    let divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    
    divGasto.appendChild(divDescripcion);

    // Añadir fecha del gasto
    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = gasto.fecha;
    
    divGasto.appendChild(divFecha);

    // Añadir valor del gasto
    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    
    divGasto.appendChild(divValor);

    // Añadir etiquetas del gasto
    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    gasto.etiquetas.forEach(etiqueta => {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.appendChild(spanEtiqueta);
    });
    
    divGasto.appendChild(divEtiquetas);

    // Añadir el gasto al elemento padre
    elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Acceder al elemento donde se insertará el gasto agrupado
    let elemento = document.getElementById(idElemento);

    // Crear el contenedor principal del gasto
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';

    // Agregar encabezado
    let encabezado = document.createElement('h1');
    encabezado.innerText = 'Gastos agrupados por ' + periodo;
    
    divAgrupacion.appendChild(encabezado);

    for (let [clave, valor] of Object.entries(agrup)) {
        // Crear el contenedor para gasto
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';

        divAgrupacion.appendChild(divAgrupacionDato);
        
        // Añadir nombre propiedad objeto agrup
        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = agrup.clave;
        
        divAgrupacionDato.appendChild(spanClave);
        
        // Añadir valor propiedad objeto agrup
        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = agrup.valor;
        
        divAgrupacionDato.appendChild(spanValor);
    }
} 

export {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb};