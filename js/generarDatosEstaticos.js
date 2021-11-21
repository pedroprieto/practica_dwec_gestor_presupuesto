import * as gesPres from './gestionPresupuesto.js';
import * as gesPresWeb from './gestionPresupuestoWeb.js';

gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());

let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPres.anyadirGasto(gasto1);
gesPres.anyadirGasto(gasto2);
gesPres.anyadirGasto(gasto3);
gesPres.anyadirGasto(gasto4);
gesPres.anyadirGasto(gasto5);
gesPres.anyadirGasto(gasto6);

gesPresWeb.mostrarDatoEnId('gastos-totales', gesPres.calcularTotalGastos());

gesPresWeb.mostrarDatoEnId('balance-total', gesPres.calcularBalance());

let listaCompleta = gesPres.listarGastos();
for (let elemento of listaCompleta) {
    gesPresWeb.mostrarGastoWeb('listado-gastos-completo', elemento);
}

let filtrado1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let elemento of filtrado1) {
    gesPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1', elemento);
}