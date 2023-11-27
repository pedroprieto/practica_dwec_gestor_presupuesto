"use strict";

//Importo módulos
import * as gesGastosWeb from "./gestionPresupuestoWeb.js";
import * as gesGastos from "./gestionPresupuesto.js";

//Actualizo presupuesto a 1500
gesGastos.actualizarPresupuesto (1500);

//Muestro presupuesto en el id 'presupuesto'
gesGastosWeb.mostrarDatoEnId ("presupuesto",gesGastos.mostrarPresupuesto());

//Creo nuevos gastos
let gasto1 = new gesGastos.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesGastos.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesGastos.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesGastos.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesGastos.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesGastos.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añado los gastos
gesGastos.anyadirGasto (gasto1);
gesGastos.anyadirGasto (gasto2);
gesGastos.anyadirGasto (gasto3);
gesGastos.anyadirGasto (gasto4);
gesGastos.anyadirGasto (gasto5);
gesGastos.anyadirGasto (gasto6);

//Muestro los gastos totales en div#gastos-totales
gesGastosWeb.mostrarDatoEnId ("gastos-totales",gesGastos.calcularTotalGastos());

//Muestro el balance total en div#balance-total
gesGastosWeb.mostrarDatoEnId ("balance-total",gesGastos.calcularBalance());



