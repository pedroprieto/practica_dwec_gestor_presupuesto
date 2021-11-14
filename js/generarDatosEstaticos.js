import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
let gasto1 = gestionPresupuesto.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida');
let gasto2 = gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let gasto3 = gestionPresupuesto.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let gasto4 = gestionPresupuesto.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let gasto5 = gestionPresupuesto.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let gasto6 = gestionPresupuesto.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let totalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);

let balance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balance);

let listaGastos = gestionPresupuesto.listarGastos();
for (let gasto of listaGastos) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

let gastosSeptiembre = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let gasto of gastosSeptiembre) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

let gastosMinimo50 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (let gasto of gastosMinimo50) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

let gastosMinimo200Seguros = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let gasto of gastosMinimo200Seguros) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

let gastosMax50ComidaTransporte = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let gasto of gastosMax50ComidaTransporte) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}

let gastosAgrupadosDia = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosDia, 'dia');

let gastosAgrupadosMes = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosMes, 'mes');

let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosAnyo, 'anyo');
