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
    agruparGastos
} from "./gestionPresupuesto.js";
import {
    mostrarDatosAgrupadosWeb,
    mostrarDatoEnId,
    mostrarGastoWeb
} from "./gestionPresupuestoWeb.js";

actualizarPresupuesto(1500);

let presupuesto = mostrarPresupuesto();
mostrarDatoEnId("presupuesto", presupuesto);

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

let totalGastos = calcularTotalGastos();
mostrarDatoEnId("gastos-totales", totalGastos);

let balance = calcularBalance();
mostrarDatoEnId("balance-total", balance);

let mostrarGastos = listarGastos();
mostrarGastos.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
});

let filtroGastos1 = filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })
filtroGastos1.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
})

let filtroGastos2 = filtrarGastos({ valorMinimo: 50 })
filtroGastos2.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
})

let filtroGastos3 = filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })
filtroGastos3.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
})

let filtroGastos4 = filtrarGastos({ valorMaximo:50, etiquetasTiene: ["comida", "transporte"] })
filtroGastos4.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
})

let gastosXDia = agruparGastos("dia");
mostrarDatosAgrupadosWeb("agrupacion-dia", gastosXDia, "día");

let gastosXMes = agruparGastos("mes");
mostrarDatosAgrupadosWeb("agrupacion-mes", gastosXMes, "mes");

let gastosXAnyo = agruparGastos("anyo");
mostrarDatosAgrupadosWeb("agrupacion-anyo", gastosXAnyo, "año");
