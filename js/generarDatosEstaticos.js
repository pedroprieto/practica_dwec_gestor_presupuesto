import { listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, mostrarPresupuesto, actualizarPresupuesto, filtrarGastos, agruparGastos, CrearGasto } from "./gestionPresupuesto.js";
import { mostrarDatoEnID, mostrarGastoWeb, mostrarGastosAgrupadosWeb } from "./gestionPresupuestoWeb.js";


actualizarPresupuesto(1500);

let presupuesto=mostrarPresupuesto();

mostrarDatoEnID("presupuesto",presupuesto);

const gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

const totalGastos = calcularTotalGastos();
mostrarDatoEnID("gastos-totales", totalGastos);

const balance = calcularBalance();
mostrarDatoEnID("balance-total", balance);

const listaGastosBien = listarGastos();
listaGastosBien.forEach((gasto)=>{
mostrarGastoWeb("listado-gastos-completo",gasto);
});

const gastos1Filtrado=filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"})
gastos1Filtrado.forEach((gasto)=>{
    mostrarGastoWeb("listado-gastos-filtrado-1",gasto);

})

const gasto2Filtrado=filtrarGastos({valorMinimo:50});
gasto2Filtrado.forEach((gasto)=>{
    mostrarGastoWeb("listado-gastos-filtrado-2",gasto);
})

const gasto3Filtrado=filtrarGastos({valorMinimo:200,etiquetasTiene:["seguros"]});
gasto3Filtrado.forEach((gasto)=>{
    mostrarGastoWeb("listado-gastos-filtrado-3",gasto);
})

const gasto4Filtrado=filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
gasto4Filtrado.forEach((gasto)=>{
    mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
})

const gastosAgrupadosPorDia = agruparGastos("dia");
mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosPorDia,"dia");

const gastosAgrupadosPorMes = agruparGastos();
mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosPorMes,"mes");

const gastosAgrupadosPorAnyo = agruparGastos("anyo");
mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosPorAnyo,"anyo");

