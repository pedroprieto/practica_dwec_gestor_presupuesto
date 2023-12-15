/* Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.*/
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

// Actualizar el presupuesto a 1500€ (función actualizarPresupuesto).
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

// Crear los siguientes gastos (función crearGasto):
let gastos = [
    { descripcion: "Compra carne", valor: 23.44, fecha: "2021-10-06", etiquetas: ["casa", "comida"] },
    { descripcion: "Compra fruta y verdura", valor: 14.25, fecha: "2021-09-06", etiquetas: ["supermercado", "comida"] },
    { descripcion: "Bonobús", valor: 18.60, fecha: "2020-05-26", etiquetas: ["transporte"] },
    { descripcion: "Gasolina", valor: 60.42, fecha: "2021-10-08", etiquetas: ["transporte", "gasolina"] },
    { descripcion: "Seguro hogar", valor: 206.45, fecha: "2021-09-26", etiquetas: ["casa", "seguros"] },
    { descripcion: "Seguro coche", valor: 195.78, fecha: "2021-10-06", etiquetas: ["transporte", "seguros"] }
  ];

// Añadir los gastos creados (función anyadirGasto).
gestionPresupuesto.anyadirGasto(gastos);

// Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

// Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId).
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

// Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb).
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb).
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gestionPresupuesto.filtrarGastos("fechaDesde: 2021-09-01, fechaHasta: 2021-09-30"));

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb).
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gestionPresupuesto.filtrarGastos("valorMinimo: 50"));

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb).
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gestionPresupuesto.filtrarGastos('valorMinimo: 200'));

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en 
// div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb).
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gestionPresupuesto.filtrarGastos('valorMaximo: 50, etiquetasTiene: comida, transporte'));

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb).
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"));

// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb).
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"));

// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb).
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"));