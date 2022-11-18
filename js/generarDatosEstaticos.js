import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';


let presupuesto = 1500;
gestionPresupuesto.actualizarPresupuesto(presupuesto);
let textoPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', textoPresupuesto);

