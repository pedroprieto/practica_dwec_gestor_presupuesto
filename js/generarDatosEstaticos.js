import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

gp.actualizarPresupuesto(1500);

let valor = gp.mostrarPresupuesto();
gpw.mostrarDatoEnId("presupuesto", valor);

let gastos = [
    new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];

for (const gasto of gastos) {
    gp.anyadirGasto(gasto);
}

let gTotales = gp.calcularTotalGastos();
gpw.mostrarDatoEnId("gastos-totales", gTotales.toFixed(2));

let balance = gp.calcularBalance();
gpw.mostrarDatoEnId("balance-total", balance.toFixed(2));

let listaDeGastos = gp.listarGastos();  
for (const gasto of listaDeGastos) {
    gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
}