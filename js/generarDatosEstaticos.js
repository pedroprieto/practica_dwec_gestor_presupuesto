import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

let gastosEntrada = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"],
]
gastosEntrada.forEach(gasto => gestion.anyadirGasto(new gestion.CrearGasto(...gasto)));

gestionWeb.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

gestionWeb.mostrarDatoEnId("balance-total", gestion.calcularBalance());

gestion.listarGastos().forEach(gasto =>
    gestionWeb.mostrarGastoWeb("listado-gastos-completo", gasto)
);

gestion.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(
    gasto => gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto)
);

gestion.filtrarGastos({valorMinimo: 50}).forEach(
    gasto => gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
);

gestion.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(
    gasto => gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
);

gestion.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]}).forEach(
    gasto => gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
);

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestion.agruparGastos("dia"), "día");

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestion.agruparGastos("mes"), "mes");

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestion.agruparGastos("anyo"), "año");