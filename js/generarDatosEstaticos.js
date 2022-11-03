// Importamos los programas
import * as gestPresupuesto from './gestionPresupuesto.js';
import * as gestPresWeb from './gestionPresupuestoWeb.js';


//Actualizar presupuesto a 1.500
gestPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
gestPresWeb.mostrarDatoEnId("presupuesto", gestPresupuesto.mostrarPresupuesto());

document.presuesto = gestPresupuesto.actualizarPresupuesto();

//Crear gastos
let gasto1 = new gestPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
//Añadir los gastos creados
gestPresupuesto.anyadirGasto(gasto1);
gestPresupuesto.anyadirGasto(gasto2);
gestPresupuesto.anyadirGasto(gasto3);
gestPresupuesto.anyadirGasto(gasto4);
gestPresupuesto.anyadirGasto(gasto5);
gestPresupuesto.anyadirGasto(gasto6);
