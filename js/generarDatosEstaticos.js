"use strict";

import * as gestionPres from "./gestionPresupuesto.js";
import * as gestionPresWeb from "./gestionPresupuestoWeb.js";

gestionPres.actualizarPresupuesto(1500);

gestionPresWeb.mostrarDatoEnId("presupuesto", gestionPres.mostrarPresupuesto());

//Creamos gastos
let gasto1 = new gestionPres.CrearGasto("compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPres.CrearGasto("compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPres.CrearGasto("bonobus", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPres.CrearGasto("seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPres.anyadirGasto(gasto1);
gestionPres.anyadirGasto(gasto2);
gestionPres.anyadirGasto(gasto3);
gestionPres.anyadirGasto(gasto4);
gestionPres.anyadirGasto(gasto5);
gestionPres.anyadirGasto(gasto6); 

gestionPresWeb.mostrarDatoEnId("gastos-totales", gestionPres.calcularTotalGastos());
gestionPresWeb.mostrarDatoEnId("balance-total", gestionPres.calcularBalance());

let gastos = gestionPres.listarGastos(); 
for(let g of gastos)
{
    gestionPresWeb.mostrarGastoWeb("listado-gastos-completo", g);
}


let gastosFil = gestionPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for(let g of gastosFil)
{
    gestionPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g);
}


let gastosFil2 = gestionPres.filtrarGastos({valorMinimo: 50});
for (let g of gastosFil2)
{
    gestionPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", g);
}


let gastosFil3 = gestionPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let g of gastosFil3)
{
    gestionPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", g);
}


let gastosFil4 = gestionPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let g of gastosFil4)
{
    gestionPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", g);
}

gestionPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPres.agruparGastos("dia"), "día");
gestionPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPres.agruparGastos("mes"), "mes");
gestionPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPres.agruparGastos("anyo"), "año"); 

document.getElementById("actualizarpresupuesto").addEventListener("click", gestionPresWeb.actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", gestionPresWeb.nuevoGastoWeb);




