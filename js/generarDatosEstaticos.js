import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Actualizar y mostrar presupuesto
let presupuesto = 1500;
gestionPresupuesto.actualizarPresupuesto(presupuesto);
let textoPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', textoPresupuesto);

//Crear gastos, añadirlos, mostrar los gastos totales y el balance total.
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

let totalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);
let totalBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', totalBalance);

//Listar gastos y mostrarlos en la web
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());
//Filtrar gastos y mostrarlos
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" }));
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gestionPresupuesto.filtrarGastos({ valorMinimo: 50 }));
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gestionPresupuesto.filtrarGastos({ valorMinimo: 200 }));
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gestionPresupuesto.filtrarGastos({ etiquetasTiene: ["comida","transporte"], valorMaximo: 50}));
