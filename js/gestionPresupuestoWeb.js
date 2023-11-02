//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación

//Funciones
//Función de dos parámetros que se encargará de añadir dentro del elemento HTML 
function mostrarDatoEnId (idElemento , gasto ) {
    // Buscar el elemento
    let elemento = document.getElementById(idElemento);
    //Insertar el valor delemento buscado
    elemento.innerText = valor;

}

//Función de tres parámetros que se encargará de crear una estructura HTML
function mostrarGastoWeb (idElemento , agrup , periodo) {
    //Formato <div class="gasto">
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.innerText = gasto.fecha;

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;

    //<div class="gasto-etiquetas">
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    //<span class="gasto-etiquetas-etiqueta">
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = eti;
    }

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}