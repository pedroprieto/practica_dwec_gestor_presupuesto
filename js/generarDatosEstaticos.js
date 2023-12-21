import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500)
let mostrarPres = gestionPresupuesto.mostrarPresupuesto()
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", mostrarPres)

//Crear gasto 

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añysadri gasto

gestionPresupuesto.anyadirGasto(gasto1)
gestionPresupuesto.anyadirGasto(gasto2)
gestionPresupuesto.anyadirGasto(gasto3)
gestionPresupuesto.anyadirGasto(gasto4)
gestionPresupuesto.anyadirGasto(gasto5)
gestionPresupuesto.anyadirGasto(gasto6)

let calculoGastosTotasles = gestionPresupuesto.calcularTotalGastos()
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", calculoGastosTotasles)

let calculobalance = gestionPresupuesto.calcularBalance()
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", calculobalance)

let listarGast = gestionPresupuesto.listarGastos()

for (let gast of listarGast) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gast)
}

let fechaDesde = "2021-09-01";
let fechaHasta = "2021-09-30";

let gastosFiltrados1 = gestionPresupuesto.filtrarGastos({ fechaDesde, fechaHasta });

for (let gast of gastosFiltrados1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gast);
}

let gastosFiltrados2 = gestionPresupuesto.filtrarGastos({ valorMaximo: 50 });

for (let gast of gastosFiltrados2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gast);
}

let gastosFiltrados3 = gestionPresupuesto.filtrarGastos({ valorMaximo: 200, etiquetasTiene: ["seguros"] });

for (let gast of gastosFiltrados3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gast);
}

let gastosFiltrados4 = gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] });

for (let gast of gastosFiltrados4) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gast);
}

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "anyo");
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", "día")
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", "mes")
//gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", "año")

