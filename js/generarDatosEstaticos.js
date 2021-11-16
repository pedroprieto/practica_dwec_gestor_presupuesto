import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

//Creamos gastos
let g1 = new gesPres.CrearGasto("compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gesPres.CrearGasto("compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gesPres.CrearGasto("bonobus", 18.60, "2020-05-26", "transporte");
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gesPres.CrearGasto("seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);
gesPres.anyadirGasto(g4);
gesPres.anyadirGasto(g5);
gesPres.anyadirGasto(g6);

gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

let gastos = gesPes.listarGastos();
for(let g of gastos)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", g);
}

//Listado septiembre 2021
let fechaDesde = "2021-09-01";
let fechaHasta = "2021-09-30";
let gastosFiltrados = gesPres.filtrarGastos(fechaDesde, fechaHasta);
for(let g of gastosFiltrados)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g);
}

//Listado mas de 50€
let gastosFiltrados2 = gesPres.filtrarGastos({valorMinimo: 50});
for (let g of gastosFiltrados2)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", g);
}

//Listado +200€ y etiqueta seguros
let gastosFiltrados3 = gesPres.filtrarGastos({valorMaximo: 200, etiquetasTiene: "seguros"});
for (let g of gastosFiltrados3)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", g);
}

//etiquetas comido O transporte -50€
let gastosFiltrados4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: "comida, transporte"});
for (let g of gastosFiltrados4)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", g);
}

gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "día");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "anyo");