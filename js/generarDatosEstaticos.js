//Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. 
//Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.
import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";
//En la tutoría del 3 de noviembre muestras como hacer el import pero utilizas parentesis en from y se muestra rojo:
//("./gestionPresupuesto.js"); He intentado ejecutarlo y me dice que hay error en '(', de ahí que los he eliminado y ha funcionado. 

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
//Resuelto en tutoría 3 NOV. 
gesPres.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
//Resuelto en tutoría 3 NOV. 
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

//Crear los siguientes gastos (función crearGasto)
//let g1 = new gesPres.CrearGasto("Desc", 44, "2021-10-27", "eti1", "eti2"); ejemplo de la tutoría 3 nov. 
let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados (función anyadirGasto)
//Resuelto en tutoría 3 NOV. 
gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);
gesPres.anyadirGasto(g4);
gesPres.anyadirGasto(g5);
gesPres.anyadirGasto(g6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

/*
gesPresWeb.mostrarGastoWeb();
gesPresWeb.mostrarGastosAgrupadosWeb();
*/