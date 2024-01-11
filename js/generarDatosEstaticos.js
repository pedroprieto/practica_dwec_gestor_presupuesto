"use strict";

import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

//gestionPresupuesto.mostrarPresupuesto('presupuesto');

gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

// Crear gastos


let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");



// Añadir los gastos
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);




// Mostrar gastos totales en div#gastos-totales

gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());

// Mostrar balance total en div#balance-total

gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

// Mostrar listado completo de gastos en div#listado-gastos-completo
let listGastos = gestionPresupuesto.listarGastos();
for (let gasto of listGastos){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto)
}

//gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());

// Mostrar listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1

let gastosSeptiembre =  gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});


for (let gasto of gastosSeptiembre){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto)
}

// Mostrar listado de gastos de más de 50€ en div#listado-gastos-filtrado-2

let gastosMay50 = gestionPresupuesto.filtrarGastos({valorMinimo: "50"});

for (let gasto of gastosMay50){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gasto)
}

// Mostrar listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3

let segurosMay200 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ["seguros"], valorMinimo: 200 });
for (let gasto of segurosMay200){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gasto)
}
// Mostrar listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
 let comidaTransporte = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ["comida", "transporte"], valorMaximo: 50 });
 for (let gasto of comidaTransporte){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
}
 


// Mostrar total de gastos agrupados por día en div#agrupacion-dia

let agrup1 = gestionPresupuesto.agruparGastos("dia");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrup1, "día");


// Mostrar total de gastos agrupados por mes en div#agrupacion-mes

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos("mes"), 'mes');

// Mostrar total de gastos agrupados por año en div#agrupacion-anyo

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos("anyo"), 'año');

// Obtener el elemento botón correspondiente y añadir la manejadora de eventos
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', gestionPresupuestoWeb.actualizarPresupuestoWeb);


