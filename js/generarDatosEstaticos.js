// Importa los módulos necesarios
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Actualiza el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto(1500);

// Muestra el presupuesto en el elemento con ID "presupuesto"
const presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('#presupuesto', presupuesto);

// Crea gastos
gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añade los gastos creados
gestionPresupuesto.anyadirGasto();

// Calcula los totales de gastos y el balance total
const totalGastos = gestionPresupuesto.calcularTotalGastos();
const balanceTotal = gestionPresupuesto.calcularBalance();

// Muestra los totales en elementos HTML
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balanceTotal);

// Muestra el listado completo de gastos
const listadoGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', listadoGastos);

// Filtra y muestra los gastos según diferentes criterios
const gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({ fechaDesde: '2021-09-01', fechaHasta: '2021-09-30' });
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastosSeptiembre2021);

const gastosMasDe50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastosMasDe50);

const gastosSegurosMasDe200 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ['seguros'], valorMinimo: 200 });
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastosSegurosMasDe200);

const gastosComidaTransporteMenosDe50 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ['comida', 'transporte'], valorMaximo: 50 });
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastosComidaTransporteMenosDe50);

// Agrupa y muestra los totales de gastos por día, mes y año
const gastosAgrupadosPorDia = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosPorDia, 'día');

const gastosAgrupadosPorMes = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosPorMes, 'mes');

const gastosAgrupadosPorAnio = gestionPresupuesto.agruparGastos('anio');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosPorAnio, 'año');

export * from './generarDatosEstaticos.js';
