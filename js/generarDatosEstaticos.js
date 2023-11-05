// Importar los módulos y agruparlos bajo un nombre de módulo
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

// Muestra el presupuesto en el elemento con ID "presupuesto"
const presupuesto = gestionPresupuesto.mostrarPresupuesto(); 
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuesto);

// Crear los gastos
const gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Los añadimos a la lista de gastos
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//Mostrar gastos totales en el elemnto con ID "gastos-totales"
const totalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);

//Mostrar el balance total en el elemento con ID "balance-total"
const balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balanceTotal);

//Mostrar listado de gastos completo
const listadoGastos = gestionPresupuesto.listarGastos();
listadoGastos.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto)
});

//Mostrar el listado de gastos realizados en septiembre de 2021
let filtros ={
    fechaDesde: '2021-09-01',
    fechaHasta: '2021-09-30'
}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);
gastosFiltrados.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto)
});

//Mostrar listado de gastos de más de 50$
filtros = {
    valorMinimo: '50'
}
gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);
gastosFiltrados.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto)
});

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros
filtros = {
    valorMinimo: '200',
    etiquetasTiene: ["seguros"]
}
gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);
gastosFiltrados.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto)
});

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€
filtros = {
    valorMaximo: '50',
    etiquetasTiene: ["comida", "transporte"]
}
gastosFiltrados = gestionPresupuesto.filtrarGastos(filtros);
gastosFiltrados.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto)
});

//Mostrar el total de gastos agrupados por día
let gastosAgrupados = gestionPresupuesto.agruparGastos('dia')

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupados, 'día' )

//Mostrar el total de gastos agrupados por mes
gastosAgrupados = gestionPresupuesto.agruparGastos('mes')

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupados, 'mes' )

//Mostrar el total de gastos agrupados por año
gastosAgrupados = gestionPresupuesto.agruparGastos('anyo')

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupados, 'año' )