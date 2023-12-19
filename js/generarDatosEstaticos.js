/* Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.*/
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

// Actualizar el presupuesto a 1500€ (función actualizarPresupuesto).
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

// Crear los siguientes gastos (función crearGasto) y Añadir los gastos creados (función anyadirGasto):  
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

// Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

// Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

// Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb).
let gasto = gestionPresupuesto.listarGastos();
for(let gt of gasto){
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gt);
}

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb).
let gastoFiltrado1 = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
for(let gf1 of gastoFiltrado1){
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastoFiltrado1);
}

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb).
let gastoFiltrado2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for(let gf2 of gastoFiltrado2){
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastoFiltrado2);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb).
let gastoFiltrado3 = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetasTiene:['seguros']});
for(let gt3 of gastoFiltrado3){
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastoFiltrado3);
}

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en 
// div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb).
let gastoFiltrado4 = gestionPresupuesto.filtrarGastos({etiquetasTiene:['comida', 'transporte'], valorMaximo:50});
for(let gt4 of gastoFiltrado4){
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastoFiltrado4);
}

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb).
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'día:');

// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb).
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos('mes'), 'mes:');

// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb).
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos('anyo'), 'año:');