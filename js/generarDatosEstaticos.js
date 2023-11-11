import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
