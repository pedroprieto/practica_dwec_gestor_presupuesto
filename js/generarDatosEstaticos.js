import * as gstionPresupuesto from './gestionPresupuesto.js';
import * as gstionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Actualizar presupuesto
gstionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div
let presupuesto=gstionPresupuesto.mostrarPresupuesto();
gstionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto);

//Crear los siguientes gastos
let gasto1 = new gstionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gstionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gstionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gstionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gstionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gstionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados

gstionPresupuesto.anyadirGasto(gasto1);
gstionPresupuesto.anyadirGasto(gasto2);
gstionPresupuesto.anyadirGasto(gasto3);
gstionPresupuesto.anyadirGasto(gasto4);
gstionPresupuesto.anyadirGasto(gasto5);
gstionPresupuesto.anyadirGasto(gasto6);

//mostrar gastos en div
let gastosTotales=gstionPresupuesto.calcularTotalGastos();
gstionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

//mostrar balance
let balanceTotal =gstionPresupuesto.calcularBalance();
gstionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

//Mostrar el listado completo de gastos en div#listado-gastos-completo
let gasto =gstionPresupuesto.listarGastos();
gstionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 
//(funciones filtrarGastos y mostrarGastoWeb)
let filtro1 =gstionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
 for (const gasto of filtro1) {
    gstionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto);
 }

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtro2=gstionPresupuesto.filtrarGastos({valorMinimo:50 }) ;
for (const gasto of filtro2) {
    gstionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtro3=gstionPresupuesto.filtrarGastos({valorMaximo:200 , etiquetasTiene: ["seguros"]}) ;
for (const gasto of filtro3) {
    gstionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)

let filtro4 =gstionPresupuesto.filtrarGastos({valorMaximo :50 ,etiquetasTiene:["comida","trasporte" ]});
for (const gasto of filtro4) {
    gstionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)

gstionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-anyo", "dia")

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)

gstionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-anyo", "mes")

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gstionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-anyo", "año")
