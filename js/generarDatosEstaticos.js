import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";


gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());



let g1 = new gesPres.CrearGasto("Compra Carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gesPres.CrearGasto("Compra Fruta y verdura", 14.25, "2021-09-06","supermercado","comida");
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gesPres.CrearGasto("Seguro Hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gesPres.CrearGasto("Seguro Coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);
gesPres.anyadirGasto(g4);
gesPres.anyadirGasto(g5);
gesPres.anyadirGasto(g6);


gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

//let gastos = gesPres.listarGastos();

for (let gasto of gesPres.listarGastos()) {
    
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
} 



let gastosFiltrados1 = gesPres.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-31" });

for (let gasto of gastosFiltrados1) {
    
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let gastosFiltrados2 = gesPres.filtrarGastos({ valorMaximo: 50 });

for (let gasto of gastosFiltrados2) {
    
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let gastosFiltrados3 = gesPres.filtrarGastos({ valorMinimo: 200 , etiquetasTiene:["seguros"]});

for (let gasto of gastosFiltrados3) {

   gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let gastosFiltrados4 = gesPres.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] });

for (let gasto of gastosFiltrados4) {
    
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
    
}

//let agrupacionDia = gesPres.agruparGastos("dia");
    
//gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion", agrupacionDia, "dia");


gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), " día");

gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), " mes");

gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), " año");

