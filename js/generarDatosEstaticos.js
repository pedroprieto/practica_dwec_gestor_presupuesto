// Importamos los programas
import * as gestPresupuesto from './gestionPresupuesto.js';
import * as gestPresWeb from './gestionPresupuestoWeb.js';


//Actualizar presupuesto a 1.500
gestPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
gestPresWeb.mostrarDatoEnId('presupuesto', gestPresupuesto.mostrarPresupuesto());


//Crear gastos
let gasto1 = new gestPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
//Añadir los gastos creados
gestPresupuesto.anyadirGasto(gasto1);
gestPresupuesto.anyadirGasto(gasto2);
gestPresupuesto.anyadirGasto(gasto3);
gestPresupuesto.anyadirGasto(gasto4);
gestPresupuesto.anyadirGasto(gasto5);
gestPresupuesto.anyadirGasto(gasto6);

//Mostrar los gastos totales
gestPresWeb.mostrarDatoEnId('gastos-totales', gestPresupuesto.calcularTotalGastos());
//Mostrar el balance total
gestPresWeb.mostrarDatoEnId('balance-total', gestPresupuesto.calcularBalance());
//Array de gastos
for (let gst of gestPresupuesto.listarGastos()) {
    gestPresWeb.mostrarGastoWeb("listado-gastos-completo" , gst)
}
//Mostrar el listado de gastos realizados en septiembre de 2021
//gestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gestPresupuesto.filtrarGastos());
for (let gst of gestPresupuesto.filtrarGastos({fechaDesde:"2021-09-01" ,fechaHasta:"2021-09-30"}) ){
    gestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gst);
  }

//Mostrar el listado de gastos de más de 50€
for (let gst of gestPresupuesto.filtrarGastos({valorMinimo:50}) ) {
    gestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gst);
}
//Mostrar el listado de gastos de más de 200€ con etiqueta
for (let gst of gestPresupuesto.filtrarGastos({valorMinimo:200,etiqutasTiene:["seguros"]}) ) {
    gestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gst);
}
//Mostrar el listado de gastos que tengan las etiquetas
for (let etiq of gestPresupuesto.filtrarGastos({valorMaximo:50, etiqutasTiene: ["comida","transporte"]}) ){
    gestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-4', etiq);
}
//Mostrar el total de gastos agrupados por día en div#agrupacion-dia
gestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestPresupuesto.agruparGastos("dia"), "día");

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
gestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gestPresupuesto.agruparGastos("mes"), "mes");

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo
gestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestPresupuesto.agruparGastos("anyo"), "año");