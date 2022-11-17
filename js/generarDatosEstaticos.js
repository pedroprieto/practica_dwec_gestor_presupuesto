import * as presupuesto from './gestionPresupuesto.js';
import {mostrarDatoEnId} from './gestionPresupuestoWeb.js';

presupuesto.actualizarPresupuesto(1500);
mostrarDatoEnId("presupuesto", presupuesto.mostrarPresupuesto());

let gasto1 = new presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

presupuesto.anyadirGasto(gasto1);
presupuesto.anyadirGasto(gasto2);
presupuesto.anyadirGasto(gasto3);
presupuesto.anyadirGasto(gasto4);
presupuesto.anyadirGasto(gasto5);
presupuesto.anyadirGasto(gasto6);

