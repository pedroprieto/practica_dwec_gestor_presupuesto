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

manipulaDopm.mostrarDatoEnId("presupuesto", gesPres.calcularTotalGastos());// !FALTA
manipulaDopm.mostrarDatoEnId("presupuesto", gesPres.calcularBalance());//! Falta

for (let g of gesPres.listarGastos()) {
    manipulaDopm.mostrarGastoWeb("listado-gastos-completo", g);
}