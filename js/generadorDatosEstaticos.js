import * as gestionPresu from "./gestionPresupuesto.js";
import * as gestionPresuWeb from "./gestionPresupuestoWeb.js";


gestionPresu.actualizarPresupuesto(1500);


gestionPresuWeb.mostrarDatoEnId("presupuesto", gestionPresu.mostrarPresupuesto());