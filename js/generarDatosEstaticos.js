/* Fichero que contendrá un programa de ejemplo para generar un conjunto de gastos y
 mostrar la información relacionada con estos en la página */

 //Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb.
 import * as gestPresupuesto from './gestionPresupuesto.js';
 import * as gestPresupuestoWeb from './gestionPresupuestoWeb.js';

 //Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
 gestPresupuesto.actualizarPresupuesto(1500);
 //Mostrar el presupuesto en div#presupuesto (mostrarPresupuesto y mostrarDatoEnId)
 gestPresupuestoWeb.mostrarDatoEnId("presupuesto" , gestPresupuesto.mostrarPresupuesto());

 //Crear los siguientes gastos (función crearGasto): 
 let gasto1 = new gestPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
 let gasto2 = new gestPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
 let gasto3 = new gestPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
 let gasto4 = new gestPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
 let gasto5 = new gestPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
 let gasto6 = new gestPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

 //Añadir los gastos creados (función anyadirGasto)
 gestPresupuesto.anyadirGasto(gasto1);
 gestPresupuesto.anyadirGasto(gasto2);
 gestPresupuesto.anyadirGasto(gasto3);
 gestPresupuesto.anyadirGasto(gasto4);
 gestPresupuesto.anyadirGasto(gasto5);
 gestPresupuesto.anyadirGasto(gasto6);

 //Mostrar los gastos totales en div#gastos-totales
 gestPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestPresupuesto.calcularTotalGastos());

 //Mostrar el balance total en div#balance-total
 gestPresupuestoWeb.mostrarDatoEnId('balance-total', gestPresupuesto.calcularBalance());

 //Mostrar el listado completo de gastos en div#listado-gastos-completo
 for ( let gst of gestPresupuesto.listarGastos()) {
    gestPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo' , gst);
 }

 //Mostrar el listado de gastos realizados en septiembre de 2021
 function filtroSeptiembre() {
   for ( let gst of gestPresupuesto.filtrarGastos({fechaDesde:"2021-09-01" ,fechaHasta:"2021-09-30"}) )
   {
      gestPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gst)
   }
 }
 filtroSeptiembre();
 //Mostrar el listado de gastos de más de 50€ en
 function filtroMas50 () {
   for ( let gst of gestPresupuesto.filtrarGastos({valorMinimo:50})) {
      gestPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gst)
   }
 }
 filtroMas50();
 //Mostrar el listado de gastos de más de 200€ con etiqueta seguros
 function filtroMas200Eti () {
   for (let gst of gestPresupuesto.filtrarGastos({valorMinimo:200, etiquetaTiene:["seguros"]})) {
      gestPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gst)
   }
 }
 filtroMas200Eti();
 //Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€
 function filtrado50Eti () {
   for (let gst of gestPresupuesto.filtrarGastos({valorMaximo:50, etiquetaTiene:["comida" , "transporte"]})) {
      gestPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4" , gst);
   }
 }
 filtrado50Eti();
//Mostrar el total de gastos agrupados por día
gestPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestPresupuesto.agruparGastos("dia"), "día");
//Mostrar el total de gastos agrupados por mes
gestPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gestPresupuesto.agruparGastos('mes'),"mes" );
//Mostrar el total de gastos agrupados por año
gestPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestPresupuesto.agruparGastos("anyo") , 'año');




