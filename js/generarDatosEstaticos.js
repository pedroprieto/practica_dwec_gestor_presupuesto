import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());



let g1 = new gesPres.CrearGasto("Compra Carne", 23.44, "2021-05-06", "casa", "comida");

gesPres.anyadirGasto(g1);


gesPresWeb.mostrarGastoWeb("aplicacion",g1);