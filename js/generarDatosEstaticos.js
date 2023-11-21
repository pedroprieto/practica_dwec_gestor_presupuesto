
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';


gestionPresupuesto.actualizarPresupuesto(1500);                                                                               // Actualizar el presupuesto a 1500€


const presupuestoActual = gestionPresupuesto.mostrarPresupuesto();                                                           // Mostrar el presupuesto en el div#presupuesto
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuestoActual);


const gastos = [                                                                                                              // Crear los gastos
  new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
  new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
  new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
  new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
  new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
  new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];


gastos.forEach(gasto => gestionPresupuesto.anyadirGasto(gasto));                                                                  // Añadir los gastos creados


const totalGastos = gestionPresupuesto.calcularTotalGastos();                                                                             // Mostrar los gastos totales en div#gastos-totales
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);


const balanceTotal = gestionPresupuesto.calcularBalance();                                                                                // Mostrar el balance total en div#balance-total
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balanceTotal);


const listadoCompleto = gestionPresupuesto.listarGastos();                                                                               // Mostrar el listado completo de gastos en div#listado-gastos-completo
listadoCompleto.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto));


const filtradoSeptiembre2021 = gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });                  // Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
filtradoSeptiembre2021.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto));


const filtradoMas50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });                                                              // Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
filtradoMas50.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto));


const filtradoSeguros200 = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });                           // Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
filtradoSeguros200.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto));


const filtradoComidaTransporte50 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ["comida", "transporte"], valorMaximo: 50 });       // Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
filtradoComidaTransporte50.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto));


const agrupacionDia = gestionPresupuesto.agruparGastos("dia");                                                                            // Mostrar el total de gastos agrupados por día en div#agrupacion-dia
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupacionDia, "día");


const agrupacionMes = gestionPresupuesto.agruparGastos("mes");                                                                            // Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupacionMes, "mes");


const agrupacionAnyo = gestionPresupuesto.agruparGastos("anyo");                                                                          // Mostrar el total de gastos agrupados por año en div#agrupacion-anyo
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupacionAnyo, "año");
