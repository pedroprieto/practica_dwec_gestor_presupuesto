// Importamos los programas
import * as gestPresupuesto from './gestionPresupuesto.js';
import * as gestPresWeb from './gestionPresupuestoWeb.js';

//Actualizar presupuesto a 1.500
gestPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
gestPresWeb.mostrarDatoEnId("presupuesto", gestPresupuesto.mostrarPresupuesto());
document.presuesto = gestPresupuesto.actualizarPresupuesto();