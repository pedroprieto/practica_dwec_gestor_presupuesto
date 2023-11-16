console.log("gestionPresupuestoWeb")




    
function mostrarDatoEnId(valor, id) {
    document.getElementById(id).innerText = valor;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};