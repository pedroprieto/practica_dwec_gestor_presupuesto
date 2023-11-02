/* Fichero que contendrá un programa de ejemplo para generar un conjunto de gastos y
 mostrar la información relacionada con estos en la página */

 //Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb.
 import * as gestPresupuesto from ' ./js/gestionPresupuesto.js';
 import * as gestPresupuestoWeb from './js/gestionPresupuestoWeb.js';

 //Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
 gestPresupuesto.actualizarPresupuesto(1500);

 //Mostrar el presupuesto en div#presupuesto (mostrarPresupuesto y mostrarDatoEnId)
 gestPresupuestoWeb.mostrarDatoEnId("presupuesto" , gestPresupuesto.mostrarPresupuesto());

 //Crear los siguientes gastos (función crearGasto): 
 let gasto1 = new gestPresupuesto.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
 let gasto2 = new gestPresupuesto.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
 let gasto3 = new gestPresupuesto.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
 let gasto4 = new gestPresupuesto.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
 let gasto5 = new gestPresupuesto.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
 let gasto6 = new gestPresupuesto.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

 //Añadir los gastos creados (función anyadirGasto)
 gestPresupuesto.anyadirGato(gasto1);
 gestPresupuesto.anyadirGato(gasto2);
 gestPresupuesto.anyadirGato(gasto3);
 gestPresupuesto.anyadirGato(gasto4);
 gestPresupuesto.anyadirGato(gasto5);
 gestPresupuesto.anyadirGato(gasto6);

 //Mostrar los gastos totales en div#gastos-totales
 




