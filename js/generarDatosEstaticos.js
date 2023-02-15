import * as gesPres from "./gestionPresupuesto";
import * as modDom from "./gestionPresupuestoWeb";

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

for (g of gesPres.listarGastos()){
    modDom.mostrarGastoWeb("listado-gastos-completo", g);
}