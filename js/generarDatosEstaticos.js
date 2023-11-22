

import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
let mostrarPres = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", mostrarPres);

//creo los gastos 
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//añado los gastos 

gestionPresupuesto.anyadirGasto(gasto1)
gestionPresupuesto.anyadirGasto(gasto2)
gestionPresupuesto.anyadirGasto(gasto3)
gestionPresupuesto.anyadirGasto(gasto4)
gestionPresupuesto.anyadirGasto(gasto5)
gestionPresupuesto.anyadirGasto(gasto6)

//mostrar los gastos totales
let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

//mostrar el balance total
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

//mostrar el listado de gastos completo
let listadoGastos = gestionPresupuesto.listarGastos();

for (let gasto of listadoGastos) { //itero array listadoGastos

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 (filtro la fecha)
listadoGastos = gestionPresupuesto.filtrarGastos({"fechaDesde": "2021-09-01" ,"fechaHasta": "2021-09-31" });

for (let gasto of listadoGastos) { //itero array listadoGastos

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
//Mostrar el listado de gastos realizados de más de 50e (filtro el gasto)

listadoGastos = gestionPresupuesto.filtrarGastos({"valorMinimo": 50});

for (let gasto of listadoGastos) { //itero array listadoGastos

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

//Mostrar el listado de gastos realizados de más de 200e con etiqueta seguros (filtro el gasto)

listadoGastos = gestionPresupuesto.filtrarGastos({"valorMinimo": 200 , "etiquetasTiene" : ["seguros"]});

for (let gasto of listadoGastos) { //itero array listadoGastos

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

//Mostrar el listado de gastos realizados de menos de 50e con etiqueta comida o transporte(filtro el gasto)

listadoGastos = gestionPresupuesto.filtrarGastos({"valorMaximo": 50 , "etiquetasTiene" : ["comida" , "transporte"]});

for (let gasto of listadoGastos) { //itero array listadoGastos

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

//Mostrar el total de gastos agrupados por día
let agrupadoDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-dia", agrupadoDia, "dia");

//Mostrar el total de gastos agrupados por mes
let agrupadoMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-mes", agrupadoMes, "mes");

//Mostrar el total de gastos agrupados por año
let agrupadoAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastoAgrupadosWeb("agrupacion-anyo", agrupadoAnyo, "anyo");