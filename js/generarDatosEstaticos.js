import * as gesPres from "./gestionPresupuesto.js"
import * as gesPresWeb from "./gestionPresupuestoWeb.js"

gesPres.actualizarPresupuesto(1500)
let textoPresupuesto = gesPres.mostrarPresupuesto()
gesPresWeb.mostrarDatoEnId("presupuesto", textoPresupuesto)
