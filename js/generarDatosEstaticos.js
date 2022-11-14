//Importar librerías
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb';
import * as gestionPresupuesto from './gestionPresupuesto';

// Actualizar el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto( 1500 );

// Mostrar el presupuesto en el div#presupuesto
gestionPresupuestoWeb.mostrarDatoEnId( "presupuesto", gestionPresupuesto.mostrarPresupuesto() );