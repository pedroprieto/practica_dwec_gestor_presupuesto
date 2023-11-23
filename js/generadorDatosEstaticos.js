import * as gestionPresu from "./gestionPresupuesto.js";  //Las importaciones...
import * as gestionPresuWeb from "./gestionPresupuestoWeb.js";


gestionPresu.actualizarPresupuesto(1500); //Actualizamos el presupuesto


gestionPresuWeb.mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());   //Aqui lo añadimos al div#presupuesto

let gasto1 = new gestionPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"); //Aqui añadimos los 6 objetos gasto que se nos ha planteado
let gasto2 = new gestionPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresu.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresu.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresu.anyadirGasto(gasto1); //Añadimos los gastos...
gestionPresu.anyadirGasto(gasto2);
gestionPresu.anyadirGasto(gasto3);
gestionPresu.anyadirGasto(gasto4);
gestionPresu.anyadirGasto(gasto5);
gestionPresu.anyadirGasto(gasto6);

gestionPresuWeb.mostrarDatoEnId("gastos-totales", gestionPresu.calcularTotalGastos()); //Añadimos gastos totales a #gastos-totales

gestionPresuWeb.mostrarDatoEnId("balance-total", gestionPresu.calcularBalance()); //Añadimos todo el balance a #balance-total

for (let gasto of gestionPresu.listarGastos()){ //Para todos los gastos listados con la funcion correspondiente, vamos a añadirlos al listado
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}


for (let gasto of gestionPresu.filtrarGastos({"fechaDesde": "2021-9-01", "fechaHasta" : "2021-9-30"})){ //Lo mismo, pero haciendo un filtro
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


for (let gasto of gestionPresu.filtrarGastos({"valorMinimo": 50})){ //Idem
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

for (let gasto of gestionPresu.filtrarGastos({"valorMinimo": 200, "etiquetas": ["seguros"]})){ //Idem...
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

for (let gasto of gestionPresu.filtrarGastos({"valorMaximo": 50, "etiquetas": ["comida", "transportes"]})){ //Vamos que regalamos filtros...
  gestionPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}
let agrupacionDia = gestionPresu.agruparGastos("dia");  //En todas estas lineas, lo que hacemos es generar las agrupaciones correspondientes, por dia mes o año, para luego agregarlas al # 
                                                        //correspondiente en el html...

gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "día");

let agrupacionMes = gestionPresu.agruparGastos("mes");

gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

let agrupacionAnyo = gestionPresu.agruparGastos("anyo");

gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyo, "año");

