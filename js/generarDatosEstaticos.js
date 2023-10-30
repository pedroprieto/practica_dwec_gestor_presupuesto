// Se importan las librerias de los documentos js realizados hasta ahora
import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

// Actualizar presupuesto en 1500 euros
gesPres.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let presupuesto = gesPres.mostrarPresupuesto();
gesPresWeb.mostrarDatoEnId("presupuesto", presupuesto);

//Crear los siguientes gastos (función crearGasto):
let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados (función anyadirGasto)
gesPres.anyadirGasto(gasto1);
gesPres.anyadirGasto(gasto2);
gesPres.anyadirGasto(gasto3);
gesPres.anyadirGasto(gasto4);
gesPres.anyadirGasto(gasto5);
gesPres.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let gastosTotales = gesPres.calcularTotalGastos();
gesPresWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let balanceTotal = gesPres.calcularBalance();
gesPresWeb.mostrarDatoEnId("balance-total", balanceTotal);

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let gastos = gesPres.listarGastos();
// Se crea la estructura de divs por cada gasto listado
for (let gasto of gastos){
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gasto)
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
//mostrar estructura de div por cada gasto filtrado
for (let gasto of gastosFiltrados1){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados2 = gesPres.filtrarGastos({valorMinimo: 50});
for (let gasto of gastosFiltrados2){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let gasto of gastosFiltrados3){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let gasto of gastosFiltrados4){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupacionDia = gesPres.agruparGastos("dia");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "día");

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupacionMes = gesPres.agruparGastos("mes");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupacionAnyos = gesPres.agruparGastos("anyo");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyos, "año");