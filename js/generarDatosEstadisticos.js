import * as gespres from "./gestionPresupuesto.js";
import * as gespresweb from "./gestionPresupuestoWeb.js";

// Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
gespres.actualizarPresupuesto(1500);

// Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
gespresweb.mostrarDatoEnId("presupuesto", gespres.mostrarPresupuesto());

// Creamos los siguientes gastos
let gasto1 = new gespres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gespres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gespres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gespres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gespres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gespres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos creados (función anyadirGasto)
gespres.anyadirGasto(gasto1);
gespres.anyadirGasto(gasto2);
gespres.anyadirGasto(gasto3);
gespres.anyadirGasto(gasto4);
gespres.anyadirGasto(gasto5);
gespres.anyadirGasto(gasto6);

// Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
gespresweb.mostrarDatoEnId("gastos-totales", gespres.calcularTotalGastos());

// Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
gespresweb.mostrarDatoEnId("balance-total", gespres.calcularBalance());

// Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
gespresweb.mostrarGastosWeb("listado-gastos-completo", gespres.listarGastos());

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
gespresweb.mostrarGastosWeb("listado-gastos-filtrado-1", gespres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
gespresweb.mostrarGastosWeb("listado-gastos-filtrado-2", gespres.filtrarGastos({valorMinimo: 50}));

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
gespresweb.mostrarGastosWeb("listado-gastos-filtrado-3", gespres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}));

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
gespresweb.mostrarGastosWeb("listado-gastos-filtrado-4", gespres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]}));

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gespresweb.mostrarGastosAgrupadosWeb("agrupacion-dia", gespres.agruparGastos("dia"), "dia");

// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gespresweb.mostrarGastosAgrupadosWeb("agrupacion-mes", gespres.agruparGastos("mes"), "mes");

// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gespresweb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gespres.agruparGastos("anyo"), "anyo");