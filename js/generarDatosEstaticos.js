'use strict';

import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';


gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

let gastos = [];
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());



gastos = gestionPresupuesto.listarGastos();
for (const gasto of gastos) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}


let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
for (const gasto of gastosFiltrados) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:50});
for (const gasto of gastosFiltrados) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetas:"seguros"});
for (const gasto of gastosFiltrados) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMaximo:50, etiquetas:"comida, transporte"});
for (const gasto of gastosFiltrados) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let periodo="dia";
gastosFiltrados = gestionPresupuesto.agruparGastos(periodo);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosFiltrados, "día");

let periodo2="mes";
gastosFiltrados = gestionPresupuesto.agruparGastos(periodo2);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosFiltrados, "mes");

let periodo3="anyo";
gastosFiltrados = gestionPresupuesto.agruparGastos(periodo3);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosFiltrados, "año");

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", gestionPresupuestoWeb.actualizarPresupuestoWeb);

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", gestionPresupuestoWeb.nuevoGastoWeb);




