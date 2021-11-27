import * as gestion from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500)
web.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

var gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
var gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
var gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
var gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
var gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
var gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");