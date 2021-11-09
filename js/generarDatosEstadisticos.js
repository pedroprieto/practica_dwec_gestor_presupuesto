import * as gespres from "./gestionPresupuesto.js";
import * as gespresweb from "./gestionPresupuestoWeb.js";

gespres.actualizarPresupuesto(1500);

//let presup = gespres.mostrarPresupuesto();
gespresweb.mostrarDatoEnId("div#presupuesto", gespres.mostrarPresupuesto());
//gespresweb.mostrarDatosEnId("presupuesto", presup);