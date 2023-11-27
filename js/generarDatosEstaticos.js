"use strict";
import * as gesGastosWeb from "./gestionPresupuestoWeb.js";
import * as gesGastos from "./gestionPresupuesto.js";

//Actualizo presupuesto
gesGastos.actualizarPresupuesto(1500);

//Muestro presupuesto en el id 'presupuesto'
gesGastosWeb.mostrarDatoEnId("presupuesto",gesGastos.mostrarPresupuesto());





