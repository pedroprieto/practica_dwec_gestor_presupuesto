// Importar los módulos y agruparlos bajo un nombre de módulo
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

// Muestra el presupuesto en el elemento con ID "presupuesto"
const presupuesto = gestionPresupuesto.mostrarPresupuesto(); 
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuesto);