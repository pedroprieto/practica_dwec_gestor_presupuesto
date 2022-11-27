import * as gesPres from '../js/gestionPresupuesto.js';
import * as manipulaDopm from '../js/gestionPresupuestoWeb.js';

/* Opción 2 para importar: 
import {
    mostrarPresupuesto,
            actualizarPresupuesto,
            CrearGasto,
            listarGastos,
            anyadirGasto,
            borrarGasto,
            calcularTotalGastos,
            calcularBalance,
            filtrarGastos,
            agruparGastos,
}from '../js/gestionPresupuesto.js';

import {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}from '../js/gestionPresupuesto.js';*/

gesPres.actualizarPresupuesto(1500);
manipulaDopm.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

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

manipulaDopm.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
manipulaDopm.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

for (let g of gesPres.listarGastos()) {
    manipulaDopm.mostrarGastoWeb("listado-gastos-completo", g);
    
}

let gastosFiltrados = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-10-01" });

for (let g of gastosFiltrados) {
     manipulaDopm.mostrarGastoWeb("listado-gastos-filtrado-1",g);
 }

let gastosFiltrados2 = gesPres.filtrarGastos({valorMinimo: 50});

for (let g of gastosFiltrados2) {
     manipulaDopm.mostrarGastoWeb("listado-gastos-filtrado-2",g);
}
 let gastosFiltrados3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});

for (let g of gastosFiltrados3) {
     manipulaDopm.mostrarGastoWeb("listado-gastos-filtrado-3",g);
}
 let gastosFiltrados4 = gesPres.filtrarGastos({etiquetasTiene: ["transporte", "comida"],  valorMaximo: 50});

for (let g of gastosFiltrados4) {
     manipulaDopm.mostrarGastoWeb("listado-gastos-filtrado-4",g);
}
 