function mostrarDatoEnId( idElemento, valor ){
// Escribe el valor (texto) en el elemento HTML con id idElemento indicado
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto.innerHTML = `${valor}`;
}

function mostrarGastoWeb( idElemento, gasto ){
// Añade dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro 

    let mostrarGasto = document.getElementById( idElemento );
    let arrayEtiquetas = "";

    // Recorro el array etiquetas y las voy añadiendo
    for ( let etiqueta of gasto.etiquetas ) {
        arrayEtiquetas += `
            <span class="gasto-etiquetas-etiqueta">${etiqueta}</span>
        `;
    }

    // Voy añadiendo las propiedades del gasto
    mostrarGasto.innerHTML += `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">${arrayEtiquetas}</div>
        </div><br>
    `;

}

function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){
// Crea dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro

    let mostrarAgrupacion = document.getElementById(idElemento);
    let arrayAgrupacion = "";

    // Añado el array de los gastos agrupados por un periodo
    for( let [nombre, valor] of Object.entries( agrup ) ){
        arrayAgrupacion += `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${nombre}</span>
                <span class="agrupacion-dato-valor">${valor}</span>
            </div>
        `;
    }

    // Voy añadiendo la agrupacones de gastos
    mostrarAgrupacion.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
            ${arrayAgrupacion}
        </div>
    `;
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 