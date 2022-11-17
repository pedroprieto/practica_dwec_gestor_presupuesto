import * as presupuesto from './gestionPresupuesto.js';
import * as manipularDom from './gestionPresupuestoWeb.js';

presupuesto.actualizarPresupuesto(1500);
manipularDom.mostrarDatoEnId("presupuesto", presupuesto.mostrarPresupuesto());

let gasto1 = new presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
presupuesto.anyadirGasto(gasto1);
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
presupuesto.anyadirGasto(gasto2);
let gasto3 = new presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
presupuesto.anyadirGasto(gasto3);
let gasto4 = new presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
presupuesto.anyadirGasto(gasto4);
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
presupuesto.anyadirGasto(gasto5);
let gasto6 = new presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
presupuesto.anyadirGasto(gasto6);

manipularDom.mostrarDatoEnId("gastos-totales", presupuesto.calcularTotalGastos());
manipularDom.mostrarDatoEnId("balance-total", presupuesto.calcularBalance());

for (let gasto of presupuesto.listarGastos()){
    manipularDom.mostrarGastoWeb("listado-gastos-completo", gasto);
}

manipularDom.mostrarGastoWeb("listado-gastos-filtrado1", presupuesto.filtrarGastos(fechaDesde === "2021-09"));
manipularDom.mostrarGastoWeb("listado-gastos-filtrado2", presupuesto.filtrarGastos(valorMinimo > "50"));
manipularDom.mostrarGastoWeb("listado-gastos-filtrado3", presupuesto.filtrarGastos(valorMinimo > "200", etiquetasTiene === "seguros"));
manipularDom.mostrarGastoWeb("listado-gastos-filtrado4", presupuesto.filtrarGastos(valorMaximo < "50", etiquetasTiene === "comida" || etiquetasTiene === "transporte"));
manipularDom.mostrarGastosAgrupadosWeb("agrupacion-dia", presupuesto.agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta), periodo === "dia");
manipularDom.mostrarGastosAgrupadosWeb("agrupacion-mes", presupuesto.agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta), periodo === "mes");
manipularDom.mostrarGastosAgrupadosWeb("agrupacion-anyo", presupuesto.agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta), periodo === "anyo");












