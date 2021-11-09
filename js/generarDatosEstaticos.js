// Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

// Actualizar el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto( 1500 );

// Mostrar el presupuesto en el div#presupuesto
gestionPresupuestoWeb.mostrarDatoEnId( "presupuesto", gestionPresupuesto.mostrarPresupuesto() );

// Crear los siguientes gastos
let gasto1 = new gestionPresupuesto.CrearGasto( "Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionPresupuesto.CrearGasto( "Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionPresupuesto.CrearGasto( "Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gestionPresupuesto.CrearGasto( "Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionPresupuesto.CrearGasto( "Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionPresupuesto.CrearGasto( "Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );

// Añadir los gastos creados
gestionPresupuesto.anyadirGasto( gasto1 );
gestionPresupuesto.anyadirGasto( gasto2 );
gestionPresupuesto.anyadirGasto( gasto3 );
gestionPresupuesto.anyadirGasto( gasto4 );
gestionPresupuesto.anyadirGasto( gasto5 );
gestionPresupuesto.anyadirGasto( gasto6 );

// Mostrar los gastos totales en div#gastos-totales
gestionPresupuestoWeb.mostrarDatoEnId( "gastos-totales", gestionPresupuesto.calcularTotalGastos() );

// Mostrar el balance total en div#balance-total
gestionPresupuestoWeb.mostrarDatoEnId( "balance-total", gestionPresupuesto.calcularBalance() );

// Mostrar el listado completo de gastos en div#listado-gastos-completo
gastos = gestionPresupuesto.listarGastos();

for ( let gasto of gastos ){
    gestionPresupuestoWeb.mostrarGastoWeb( "listado-gastos-completo", gasto );
}

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
let gastosFiltrados = gestionPresupuesto.filtrarGastos( {fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"} );

for ( let gasto of gastosFiltrados ){
    gestionPresupuestoWeb.mostrarGastoWeb( "listado-gastos-filtrado-1", gasto );
}

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
gastosFiltrados = gestionPresupuesto.filtrarGastos( {valorMinimo:50} );

for ( let gasto of gastosFiltrados ){
    gestionPresupuestoWeb.mostrarGastoWeb( "listado-gastos-filtrado-2", gasto );
}

// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
gastosFiltrados = gestionPresupuesto.filtrarGastos( {valorMinimo:200, etiquetas:"seguros"} );

for ( let gasto of gastosFiltrados ){
    gestionPresupuestoWeb.mostrarGastoWeb( "listado-gastos-filtrado-3", gasto );
}

// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
gastosFiltrados = gestionPresupuesto.filtrarGastos( {valorMaximo:50, etiquetas:"comida, transporte"} );

for ( let gasto of gastosFiltrados ){
    gestionPresupuestoWeb.mostrarGastoWeb( "listado-gastos-filtrado-4", gasto );
}

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia
gastosFiltrados = gestionPresupuesto.agruparGastos( "dia" );
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb( "agrupacion-dia", gastosFiltrados, "día" );

// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
gastosFiltrados = gestionPresupuesto.agruparGastos( "mes" );
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb( "agrupacion-mes", gastosFiltrados, "mes" );

// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo
gastosFiltrados = gestionPresupuesto.agruparGastos( "anyo" );
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb( "agrupacion-anyo", gastosFiltrados, "año" );