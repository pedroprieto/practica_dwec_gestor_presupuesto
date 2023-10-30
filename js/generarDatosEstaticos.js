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