// Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

// Actualizar el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

// Crear los siguientes gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );
