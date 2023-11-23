import * as gestionPresu from "./gestionPresupuesto.js";
import * as gestionPresuWeb from "./gestionPresupuestoWeb.js";


gestionPresu.actualizarPresupuesto(1500);


gestionPresuWeb.mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());

let gasto1 = new gestionPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresu.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresu.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresu.anyadirGasto(gasto1);
gestionPresu.anyadirGasto(gasto2);
gestionPresu.anyadirGasto(gasto3);
gestionPresu.anyadirGasto(gasto4);
gestionPresu.anyadirGasto(gasto5);
gestionPresu.anyadirGasto(gasto6);

gestionPresuWeb.mostrarDatoEnId("gastos-totales", gestionPresu.calcularTotalGastos());

gestionPresuWeb.mostrarDatoEnId("balance-total", gestionPresu.calcularBalance());

for (let gasto of gestionPresu.listarGastos()){
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}
const filtro1 = {valorMinimo: 50};


for (let gasto of gestionPresu.filtrarGastos({"fechaDesde": "2021-9-01", "fechaHasta" : "2021-9-30"})){
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


for (let gasto of gestionPresu.filtrarGastos({"valorMinimo": 50})){
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

for (let gasto of gestionPresu.filtrarGastos({"valorMinimo": 200, "etiquetas": ["seguros"]})){
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

for (let gasto of gestionPresu.filtrarGastos({"valorMaximo": 50, "etiquetas": ["comida", "transportes"]})){
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}


