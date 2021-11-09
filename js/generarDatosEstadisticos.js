import * as gespres from "./gestionPresupuesto";
import * as gespresweb from "./gestionPresupuestoWeb";

gespres.actualizarPresupuesto(1500);

//let presup = gespres.mostrarPresupuesto();
gespresweb.mostrarDatosEnId("presupuesto", gespres.mostrarPresupuesto());
//gespresweb.mostrarDatosEnId("presupuesto", presup);