import * as gestionPresu from "./gestionPresupuesto.js";
import * as gestionPresuWeb from "./gestionPresupuestoWeb.js";


gestionPresu.actualizarPresupuesto(1500);


gestionPresuWeb.mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());

let gasto1 = gestionPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestion.Presu.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestion.Presu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestion.Presu.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestion.Presu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestorPresu.anyadirGasto(gasto1);
gestorPresu.anyadirGasto(gasto2);
gestorPresu.anyadirGasto(gasto3);
gestorPresu.anyadirGasto(gasto4);
gestorPresu.anyadirGasto(gasto5);
gestorPresu.anyadirGasto(gasto6);

gestionPresuWeb.mostrarDatoEnId("gastos-totales", gestionPresu.calcularTotalGastos);