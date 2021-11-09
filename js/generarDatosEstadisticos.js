import * as gespres from "./gestionPresupuesto.js";
import * as gespresweb from "./gestionPresupuestoWeb.js";

gespres.actualizarPresupuesto(1500);

//let presup = gespres.mostrarPresupuesto();
gespresweb.mostrarDatoEnId("presupuesto", gespres.mostrarPresupuesto());
//gespresweb.mostrarDatosEnId("presupuesto", presup);

// Creamos los siguientes gastos
let gasto1 = new gespres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gespres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gespres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gespres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gespres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gespres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
// Añadimos los gastos
gespres.anyadirGasto(gasto1);
gespres.anyadirGasto(gasto2);
gespres.anyadirGasto(gasto3);
gespres.anyadirGasto(gasto4);
gespres.anyadirGasto(gasto5);
gespres.anyadirGasto(gasto6);

gespresweb.mostrarDatoEnId("gastos-totales", gespres.calcularTotalGastos());

gespresweb.mostrarDatoEnId("balance-total", gespres.calcularBalance());