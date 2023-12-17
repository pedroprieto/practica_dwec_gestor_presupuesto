import * as gesPresupuesto from "./gestionPresupuesto.js"
import * as gesPresupuestoWeb from "./gestionPresupuestoWeb.js"

gesPresupuesto.actualizarPresupuesto(1500);
gesPresupuestoWeb.mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto())

let gasto1=new gesPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2=new gesPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3=new gesPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4=new gesPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5=new gesPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6=new gesPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPresupuesto.anyadirGasto(gasto1);
gesPresupuesto.anyadirGasto(gasto2);
gesPresupuesto.anyadirGasto(gasto3);
gesPresupuesto.anyadirGasto(gasto4);
gesPresupuesto.anyadirGasto(gasto5);
gesPresupuesto.anyadirGasto(gasto6);
       

gesPresupuestoWeb.mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());

gesPresupuestoWeb.mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());
gesPresupuesto.listarGastos()
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto1);
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto2);
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto3);
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto4);
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto5);
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto6);