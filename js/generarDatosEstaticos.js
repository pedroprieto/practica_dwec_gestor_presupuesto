import * as gesPreWeb from './gestionPresupuestoWeb.js';
import * as gesPre from './gestionPresupuesto.js';

gesPre.actualizarPresupuesto(1500);

gesPreWeb.mostrarDatoEnId('presupuesto', gesPre.mostrarPresupuesto());

let gasto1 = new gesPre.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida');
let gasto2 = new gesPre.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let gasto3 = new gesPre.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let gasto4 = new gesPre.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let gasto5 = new gesPre.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let gasto6 = new gesPre.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');

gesPre.anyadirGasto(gasto1);
gesPre.anyadirGasto(gasto2);
gesPre.anyadirGasto(gasto3);
gesPre.anyadirGasto(gasto4);
gesPre.anyadirGasto(gasto5);
gesPre.anyadirGasto(gasto6);

gesPreWeb.mostrarDatoEnId('gastos-totales', gesPre.calcularTotalGastos());

gesPreWeb.mostrarDatoEnId('balance-total', gesPre.calcularBalance());

gesPreWeb.mostrarGastoWeb('listado-gastos-completo', gesPre.listarGastos());

gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gesPre.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'}));
gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gesPre.filtrarGastos({valorMinimo: 50}));
gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gesPre.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']}));
gesPreWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gesPre.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida', 'transporte']}));

gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gesPre.agruparGastos('dia'));
gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gesPre.agruparGastos('mes'));
gesPreWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gesPre.agruparGastos('anyo'));
