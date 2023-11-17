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
    divGasDesc.className = "gastoDescripcion";
    divGasFecha.className = "gastoFecha"
    divGasValor.className = "gastoValor"
    divGasEtiquetas.className = "gastosEtiquetas"
    
    //Le asigno valor
    divGasDesc.innerText = gasto.descripcion
    divGasValor.innerText = gasto.valor
    divGasFecha.innerText = "PENDIENTE DE HACER";
    divGasEtiquetas.innerText = "PENDIENTE DE HACER";

}
 
function mostrarGastosAgrupadosWeb() { }

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};