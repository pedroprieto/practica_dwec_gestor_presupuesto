import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

// Crear los siguientes gastos (función crearGasto):

let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos creados (función anyadirGasto)
gesPres.anyadirGasto(gasto1);
gesPres.anyadirGasto(gasto2);
gesPres.anyadirGasto(gasto3);
gesPres.anyadirGasto(gasto4);
gesPres.anyadirGasto(gasto5);
gesPres.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId(`gastos-totales`,`Gastos totales: ${gesPres.calcularTotalGastos()} €`);

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId(`balance-total`,`Balance total: ${gesPres.calcularBalance()} €`);

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
gesPres.listarGastos().forEach(gasto => {
    gesPresWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
});

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
gesPres.filtrarGastos()



