import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

/* Crear gastos */ 
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

/* Actualizar presupuesto */
gestionPresupuesto.actualizarPresupuesto(1500);

/* Mostrar datos */
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

gestionPresupuesto.listarGastos().forEach(function(gasto) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
});

/* Datos filtrados */
let filtro1 = { fechaDesde: "2021-08-31", fechaHasta: "2021-10-01", };
let filtro2 = { valorMinimo: 50 };
let filtro3 = { valorMinimo: 200, etiquetasTiene: ["seguros"], };
let filtro4 = { valorMaximo: 50, etiquetasTiene: ["comida", "transporte"], };

let gastosFiltro1 = gestionPresupuesto.filtrarGastos(filtro1);
let gastosFiltro2 = gestionPresupuesto.filtrarGastos(filtro2);
let gastosFiltro3 = gestionPresupuesto.filtrarGastos(filtro3);
let gastosFiltro4 = gestionPresupuesto.filtrarGastos(filtro4);

gastosFiltro1.forEach(function(gasto) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
});
gastosFiltro2.forEach(function(gasto) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
})
;gastosFiltro3.forEach(function(gasto) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
});
gastosFiltro4.forEach(function(gasto) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
});

/* Datos agrupados */

gestionPresupuestoWeb.mostrarDatoEnId("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"));
gestionPresupuestoWeb.mostrarDatoEnId("agrupacion-mes", gestionPresupuesto.agruparGastos());
gestionPresupuestoWeb.mostrarDatoEnId("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"));
