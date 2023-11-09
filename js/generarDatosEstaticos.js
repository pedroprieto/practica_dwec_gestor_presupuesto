import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Actualizar presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div
let presupuesto=gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto);

//Crear los siguientes gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//mostrar gastos en div
let gastosTotales=gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

//mostrar balance
let balanceTotal =gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

//Mostrar el listado completo de gastos en div#listado-gastos-completo
let gastos =gestionPresupuesto.listarGastos();
for (const gasto of gastos) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 
//(funciones filtrarGastos y mostrarGastoWeb)
let filtro1 =gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
 for (const gasto of filtro1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto);
 }

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtro2=gestionPresupuesto.filtrarGastos({valorMinimo:50 }) ;
for (const gasto of filtro2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtro3=gestionPresupuesto.filtrarGastos({valorMaximo:200 , etiquetasTiene: ["seguros"]}) ;
for (const gasto of filtro3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)

let filtro4 =gestionPresupuesto.filtrarGastos({valorMaximo :50 ,etiquetasTiene:["comida","transporte" ]});
for (const gasto of filtro4) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", "día")

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", "mes")

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", "año")
