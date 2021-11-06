import * as gestion from './gestionPresupuesto'
import * as gestionWeb from './gestionPresupuestoWeb'

// Actualización presupuesto.
gestion.actualizarPresupuesto(1500);

//Mostrar presupuesto en el div correspondiente.
gestion.gestionWeb('div#presupuesto',gestion.mostrarPresupuesto());



