import * as gestion from './gestionPresupuesto.js'
import * as gestionWeb from './gestionPresupuestoWeb.js'

// Actualización presupuesto.
gestion.actualizarPresupuesto(1500);

//Mostrar presupuesto en el div correspondiente.
gestionWeb.mostrarDatoEnId("presupuesto",gestion.mostrarPresupuesto());

// Creación gastos.
let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Anyadir los gastos.
gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

// Calcular gastos totales.
gestionWeb.mostrarDatoEnId("gastos-totales",gestion.calcularTotalGastos());

// Calcular balance total.
gestionWeb.mostrarDatoEnId("balance-total",gestion.calcularBalance());

// Mostrar el listado completo de gastos.
for (let gasto of gestion.listarGastos()) {
    gestionWeb.mostrarGastoWeb("listado-gastos-completo",gasto);   
}

// Mostrar listado de gastos Sept 2021.
for (let gasto1 of gestion.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta:"2021-09-30"})) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto1);
}

// Mostrar listado de gastos de mas de 50 €
for (let gasto2 of gestion.filtrarGastos({valorMinimo: 50})) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gasto2);    
}

// Mostrar listado de más de 200 y con etiqueta seguros.
for (let gasto3 of gestion.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]})) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gasto3);   
}

// Mostrar listado con etiquetas comida o transporte y menos de 50 euros.
for (let gasto4 of gestion.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]})) {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4",gasto4);
}


// Mostrar Total gastos agrupados por día.
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gestion.agruparGastos("dia"),"día");

// Mostrar Total gastos agrupados por mes.
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gestion.agruparGastos("mes"),"mes");

// Mostrar Total gastos agrupados por anyo.
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gestion.agruparGastos("anyo"),"año");

