import * as gestion from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500)
web.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

var gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
var gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
var gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
var gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
var gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
var gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

web.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
web.mostrarDatoEnId("balance-total", gestion.calcularBalance());

for (let gasto of gestion.listarGastos()) {
  web.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for (let gasto of gestion.filtrarGastos({
  fechaDesde: "2021-09-01",
  fechaHasta: "2021-09-30"
})) {
  web.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

for (let gasto of gestion.filtrarGastos({
  valorMinimo: 50
})) {
  web.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}