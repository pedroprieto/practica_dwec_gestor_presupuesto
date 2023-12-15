import * as gesPresupuesto from "./gestionPresupuesto.js"
import * as gesPresupuestoWeb from "./gestionPresupuestoWeb.js"

gesPresupuesto.actualizarPresupuesto(1500);
gesPresupuestoWeb.mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto())