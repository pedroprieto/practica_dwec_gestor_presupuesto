//Importar librerías
import * as gestionPresWeb from './gestionPresupuestoWeb';
import * as gestionPre from './gestionPresupuesto';

// Actualizar el presupuesto a 1500€
gestionPre.actualizarPresupuesto( 1500 );

// Mostrar el presupuesto en el div#presupuesto
gestionPresWeb.mostrarDatoEnId( "presupuesto", gestionPre.mostrarPresupuesto() );

// Crear los siguientes gastos
let gasto1 = new gestionPre.CrearGasto( "Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionPre.CrearGasto( "Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionPre.CrearGasto( "Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gestionPre.CrearGasto( "Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionPre.CrearGasto( "Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionPre.CrearGasto( "Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );

// Añadir los gastos creados
gestionPre.anyadirGasto( gasto1 );
gestionPre.anyadirGasto( gasto2 );
gestionPre.anyadirGasto( gasto3 );
gestionPre.anyadirGasto( gasto4 );
gestionPre.anyadirGasto( gasto5 );
gestionPre.anyadirGasto( gasto6 );

// Mostrar los gastos totales en div#gastos-totales
gestionPresWeb.mostrarDatoEnId( "gastos-totales", gestionPre.calcularTotalGastos() );

// Mostrar el balance total en div#balance-total
gestionPresWeb.mostrarDatoEnId( "balance-total", gestionPre.calcularBalance() );

// Mostrar el listado completo de gastos en div#listado-gastos-completo
let gastos = gestionPre.listarGastos();
for ( let gasto of gastos ){
    gestionPresWeb.mostrarGastoWeb( "listado-gastos-completo", gasto );
}

// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
let gastosFiltrados = gestionPre.filtrarGastos( {fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"} );

// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
gastosFiltrados = gestionPre.filtrarGastos( {valorMinimo:50} );
for ( let gasto of gastosFiltrados ){
    gestionPresWeb.mostrarGastoWeb( "listado-gastos-filtrado-2", gasto );
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
gastosFiltrados = gestionPre.filtrarGastos( {valorMinimo:200, etiquetas:"seguros"} );
for ( let gasto of gastosFiltrados ){
    gestionPresWeb.mostrarGastoWeb( "listado-gastos-filtrado-3", gasto);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
gastosFiltrados = gestionPre.filtrarGastos( {etiquetas:"comida, transporte", valorMaximo:50} );
for ( let gasto of gastosFiltrados ){
    gestionPre.mostrarGastoWeb( "listado-gastos-filtrado-4", gasto );
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia
gastosFiltrados.agruparGastos( "dia");
gestionPresWeb.mostrarGastosAgrupadosWeb( "agrupacion-dia", gastosFiltrados, "día" );

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
gastosFiltrados.agruparGastos( "mes");
gestionPresWeb.mostrarGastosAgrupadosWeb( "agrupacion-mes", gastosFiltrados, "mes" );

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo 
gastosFiltrados.agruparGastos( "anyo" );
gestionPresWeb.mostrarGastosAgrupadosWeb( "agrupacion-anyo", gastosFiltrados, "año");