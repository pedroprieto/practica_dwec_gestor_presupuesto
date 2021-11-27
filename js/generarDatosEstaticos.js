import * as gestion from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500)
web.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());