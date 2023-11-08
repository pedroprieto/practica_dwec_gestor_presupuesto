import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

gp.actualizarPresupuesto(1500);

let valor = gp.mostrarPresupuesto();
gpw.mostrarDatoEnId("presupuesto", valor);