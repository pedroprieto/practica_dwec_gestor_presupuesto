import * as gesPres from "./gestionPresupuesto.js";
import * as modDom from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);

modDom.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPres.anyadirGasto(g1);

modDom.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
modDom.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

// mostrar listado completo de gastos
for (let g of gesPres.listarGastos()){
    modDom.mostrarGastoWeb("listado-gastos-completo", g);
}
//Gasto filtrado 1
for (let gFiltrado of gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-31"})){
    modDom.mostrarGastoWeb("listado-gastos-filtrado-1", gFiltrado);
}
//Gasto filtrado 2
for (let gFiltrado of gesPres.filtrarGastos({valorMinimo: 50})){
    modDom.mostrarGastoWeb("listado-gastos-filtrado-2", gFiltrado);
}
//Gasto filtrado 3
for (let gFiltrado of gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["Seguros"]})){
    modDom.mostrarGastoWeb("listado-gastos-filtrado-3", gFiltrado);
}
//Gasto filtrado 4
for (let gFiltrado of gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})){
    modDom.mostrarGastoWeb("listado-gastos-filtrado-4", gFiltrado);
}