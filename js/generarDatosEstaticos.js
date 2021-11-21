import * as gestPresupuesto from ("./gestionPresupuesto.js");
import * as gestPresWeb from ("./gestionPresupuestoWeb.js");

//Llamar a las funciones con el parametro gestPresupuesto.funcion del archivo
// o gestPresWeb.funcion de este archivo

//Actualizar presupuesto a 1.500
gestPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
gestPresWeb.mostrarDatoEnId("presupuesto", gestPresupuesto.mostrarPresupuesto())

