import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

let gastosEntrada = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"],
]
gastosEntrada.forEach(gasto => gestion.anyadirGasto(new gestion.CrearGasto(...gasto)));

gestionWeb.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

gestionWeb.mostrarDatoEnId("balance-total", gestion.calcularBalance());