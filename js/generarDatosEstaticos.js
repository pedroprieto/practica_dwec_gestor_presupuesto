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


let gastos = gesPres.listarGastos();

for (let gasto of gastos)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}


let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

for (let gasto of gastosFiltrados1)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let gastosFiltrados2 = gesPres.filtrarGastos({valorMinimo: 50});

for (let gasto of gastosFiltrados2)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let gastosFiltrados3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetas: "seguro" });

for (let gasto of gastosFiltrados3)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);  
}

let gastosFiltrados4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetas: "comida, transporte" });

for (let gasto of gastosFiltrados4)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);  
}

