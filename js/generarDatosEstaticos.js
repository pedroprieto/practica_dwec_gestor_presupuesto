import * as gestion from './gestionPresupuesto.js';
import * as manipularDom from './gestionPresupuestoWeb.js';

gestion.actualizarPresupuesto(1500);
manipularDom.mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestion.anyadirGasto(gasto1);
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestion.anyadirGasto(gasto2);
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestion.anyadirGasto(gasto3);
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestion.anyadirGasto(gasto4);
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestion.anyadirGasto(gasto5);
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gestion.anyadirGasto(gasto6);

manipularDom.mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
manipularDom.mostrarDatoEnId("balance-total", gestion.calcularBalance());

for (let gasto of gestion.listarGastos()){
    manipularDom.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for (let gasto of gestion.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})){
    manipularDom.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);    
}

for (let gasto of gestion.filtrarGastos({valorMinimo: 50})){
    manipularDom.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);  
}

for (let gasto of gestion.filtrarGastos({valorMinimo: 200, etiquetas: "seguros"})){
    manipularDom.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);  
}

for (let gasto of gestion.filtrarGastos({valorMaximo: 50, etiquetas: "comida", etiquetas: "transporte"})){
    manipularDom.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);  
}

for (let gasto of gestion.agruparGastos("dia")){
    manipularDom.mostrarGastosAgrupadosWeb("agrupacion-dia", gasto);
}
for (let gasto of gestion.agruparGastos("mes")){
    manipularDom.mostrarGastosAgrupadosWeb("agrupacion-mes", gasto);
}
for (let gasto of gestion.agruparGastos("anyo")){
    manipularDom.mostrarGastosAgrupadosWeb("agrupacion-anyo", gasto);
}












