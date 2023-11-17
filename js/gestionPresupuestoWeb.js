function mostrarDatoEnId(id, valor) {
    let elem = document.getElementById(id).innerText = valor;
}


function mostrarGastoWeb(idElemento, gasto) {

    let elementObj = document.getElementById(idElement);
   //Creo Elemento div
    let divGasto = document.createElement('div');
    let divGasDesc = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor = document.createElement('div');
    let divGasEtiquetas = document.createElement('div');

    //Le asigno una clase
    divGasto.className = "gasto";
    divGasDesc.className = "gasto-descripcion";   //cambio nombre más facil de ver
    divGasFecha.className = "gasto-fecha";
    divGasValor.className = "gasto-valor";
    divGasEtiquetas.className = "gastos-etiquetas";
    
    //Le asigno valor
    divGasDesc.innerText = gasto.descripcion;
    divGasValor.innerText = gasto.valor;
    divGasFecha.innerText = new Date(gasto.fecha).toLocaleDateString();
    divGasEtiquetas.innerText = "PENDIENTE DE HACER";

    for (let etiqueta of gasto.etiquetas) {
        let divEtiqueta = document.createElement('span');             // Crear un nuevo elem. <span>
        divEtiqueta.className = "gasto-etiquetas-etiqueta";           // Asigna la clase al nuevo elem. <span> como "gasto-etiquetas-etiqueta"
        divEtiqueta.append(`${etiqueta},`);                           // Agrega el contenido de la etiqueta al elem. <span>
        divGasEtiquetas.append(divEtiqueta);                          // Agrega el nuevo elem. <span> al contenedor divGasEtiquetas
    }
    // Crea los elem.
    divGasto.append(divGasDescripcion);
    divGasto.append(divGasFecha);
    divGasto.append(divGasValor);
    divGasto.append(divGasEtiquetas);

    // Agrega el elem. del gasto completo al elem. objetivo. Todos los elementos que representan la info. de gasto, estarán dentro de elementObjetive en el documento HTML.
    elementObjetive.append(divGasto);
}
 
function mostrarGastosAgrupadosWeb() { }

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};