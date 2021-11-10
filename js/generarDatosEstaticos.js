import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";


gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId('presupuesto',gp.mostrarPresupuesto());

let gastoValor1 = 23.44
let gastoValor2 = 14.25
let gastoValor3 = 18.60
let gastoValor4 = 60.42
let gastoValor5 = 206.45
let gastoValor6 = 195.78

let gasto1 = new gp.CrearGasto("Compra carne", gastoValor1, "2021-10-06", "casa", "comida" );
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", gastoValor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gp.CrearGasto("Bonobús", gastoValor3, "2020-05-26", "transporte" );
let gasto4 = new gp.CrearGasto("Gasolina", gastoValor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gp.CrearGasto("Seguro hogar", gastoValor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new gp.CrearGasto("Seguro coche", gastoValor6, "2021-10-06", "transporte", "seguros" );
