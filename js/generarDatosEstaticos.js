/*import * as gP from "./gestionPresupuesto.js";
import * as gPW from "./gestionPresupuestoWeb.js";

gP.actualizarPresupuesto(1500);
gPW.mostrarDatoEnId("presupuesto",gP.mostrarPresupuesto());

gP.anyadirGasto(new gP.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gP.anyadirGasto(new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gP.anyadirGasto(new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gP.anyadirGasto(new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gPW.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
gPW.mostrarDatoEnId("balance-total",gP.calcularBalance());

//Listado de Gastos
gPW.mostrarGastoWeb("listado-gastos-completo", gP.listarGastos())

//Listado de gastos filtrados
gPW.mostrarGastoWeb("listado-gastos-filtrado-1", gP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
gPW.mostrarGastoWeb("listado-gastos-filtrado-2", gP.filtrarGastos({valorMinimo:50}))
gPW.mostrarGastoWeb("listado-gastos-filtrado-3", gP.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
gPW.mostrarGastoWeb("listado-gastos-filtrado-4", gP.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));
//Listado de gastos por año,mes,dia

let gastoAgrupado1 = gP.agruparGastos("dia")
gPW.mostrarGastosAgrupadosWeb("agrupacion-dia",gastoAgrupado1,"día")
//=============================
let gastoAgrupado2 = gP.agruparGastos("mes")
gPW.mostrarGastosAgrupadosWeb("agrupacion-mes",gastoAgrupado2,"mes")
//=============================
let gastoAgrupado3 = gP.agruparGastos("anyo")
gPW.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastoAgrupado3,"año")*/


import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());


let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
             gesPres.anyadirGasto(g1);
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
             gesPres.anyadirGasto(g2);
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
             gesPres.anyadirGasto(g3);
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
             gesPres.anyadirGasto(g4);
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
             gesPres.anyadirGasto(g5);
let g6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
             gesPres.anyadirGasto(g6);

gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());


let fechaDesde= "2021-09-01";
let fechaHasta= "2021-09-30";


let gastos = gesPres.listarGastos();
for (let g of gastos)
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", g);

let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde, fechaHasta});
for (let g of gastosFiltrados1)
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g);

let gastosFiltrados2 = gesPres.filtrarGastos({valorMaximo: 50});
for (let g of gastosFiltrados2)
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", g);

let gastosFiltrados3 = gesPres.filtrarGastos({valorMinimo: 200, alfonso: ["seguros"]});
for (let g of gastosFiltrados3) 
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", g);

let gastosFiltrados4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let g of gastosFiltrados4)
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", g);


gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "día");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "año");