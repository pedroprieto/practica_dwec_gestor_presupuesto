import * as pre from "./gestionPresupuesto.js";
import * as preweb from "./gestionPresupuestoWeb.js";

pre.actualizarPresupuesto(1500);

let presupuesto = pre.mostrarPresupuesto();
preweb.mostrarDatoEnId("presupuesto", presupuesto);

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

pre.anyadirGasto(gasto1);
pre.anyadirGasto(gasto2);
pre.anyadirGasto(gasto3);
pre.anyadirGasto(gasto4);
pre.anyadirGasto(gasto5);
pre.anyadirGasto(gasto6);

let totalGastos = pre.calcularTotalGastos();
preweb.mostrarDatoEnId(totalGastos);

let balance = pre.calcularBalance();
preweb.mostrarDatoEnId(balance);

let mostrarGastos = pre.listarGastos();
mostrarGastos.forEach((gasto) => {
    preweb.mostrarGastoWeb("listado-gastos-completo", gasto);
});

let filtroGastos1 = pre.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })
filtroGastos1.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
})

let filtroGastos2 = pre.filtrarGastos({ valorMinimo: 50 })
filtroGastos2.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
})

let filtroGastos3 = pre.filtrarGastos({ valorMinimo: 200, etiquetasTiene: "seguros" })
filtroGastos3.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
})

let filtroGastos4 = pre.filtrarGastos({ etiquetasTiene: ["comida", "transporte"] })
filtroGastos4.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
})

let gastosXDia = pre.agruparGastos("dia");
preweb.mostrarDatosAgrupadosWeb("agrupacion-dia", gastosXDia, "dia");

let gastosXMes = pre.agruparGastos("mes");
preweb.mostrarDatosAgrupadosWeb("agrupacion-mes", gastosXMes, "mes");

let gastosXAnyo = pre.agruparGastos("anyo");
preweb.mostrarDatosAgrupadosWeb("agrupacion-anyo", gastosXAnyo, "anyo");
