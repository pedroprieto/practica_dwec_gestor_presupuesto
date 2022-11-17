import * as gestionPresupuesto from '/gestionPresupuesto';
import * as gestionPresupuestoWeb from '/gestionPresupuestoWeb';


let presupuesto = 1500;
gestionPresupuesto.actualizarPresupuesto(presupuesto);
let textoPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', textoPresupuesto);

