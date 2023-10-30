import * as pre from "./gestionPresupuesto.js";
import * as preweb from "./gestionPresupuestoWeb.js";

pre.actualizarPresupuesto(1500);

let presupuesto = pre.mostrarPresupuesto();
preweb.mostrarDatoEnId("presupuesto", presupuesto);

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

pre.anyadirGasto(gasto1);
pre.anyadirGasto(gasto2);
pre.anyadirGasto(gasto3);
pre.anyadirGasto(gasto4);
pre.anyadirGasto(gasto5);
pre.anyadirGasto(gasto6);