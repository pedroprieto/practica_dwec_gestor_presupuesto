// Importa los módulos necesarios
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//let gastos = []; 
// Actualiza el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto(1500);
//let gastos = []; 
//let idGasto = 0; 

// Muestra el presupuesto en el elemento con ID "presupuesto"
const presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuesto);

// Crea gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"); 
let gasto3 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"); 
let gasto4 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"); 
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"); 


// Añade los gastos creados
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6); 



// Calcula los totales de gastos y el balance total
const totalGastos = gestionPresupuesto.calcularTotalGastos();
const balanceTotal = gestionPresupuesto.calcularBalance();

// Muestra los totales en elementos HTML
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', totalGastos);
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balanceTotal);

// Muestra el listado completo de gastos
const listadoGastos = gestionPresupuesto.listarGastos();
//console.log(listadoGastos); 
listadoGastos.forEach((gasto) =>{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto); 
})
//gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', listadoGastos);

// Filtra y muestra los gastos según diferentes criterios
const gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({ fechaDesde: '2021-09-01', fechaHasta: '2021-09-30' });
gastosSeptiembre2021.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-1';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto);
  });

const gastosMasDe50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
//gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastosMasDe50);
gastosMasDe50.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-2';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto);
  });

console.log(gastosMasDe50); 

const gastosSegurosMasDe200 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ['seguros'], valorMinimo: 200 });
//gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastosSegurosMasDe200);
gastosSegurosMasDe200.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-3';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto ); 
}); 
const gastosComidaTransporteMenosDe50 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ['comida', 'transporte'], valorMaximo: 50 });
//gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastosComidaTransporteMenosDe50);
gastosComidaTransporteMenosDe50.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-4';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto ); 
}); 
// Agrupa y muestra los totales de gastos por día, mes y año
const gastosAgrupadosPorDia = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosPorDia, 'día');

const gastosAgrupadosPorMes = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosPorMes, 'mes');

const gastosAgrupadosPorAnio = gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosPorAnio, 'año');

//Botón actualizar
const btnActualizar = document.getElementById('actualizarpresupuesto'); 

btnActualizar.onclick = () => gestionPresupuestoWeb.actualizarPresupuestoWeb(); 

const btnAnyadirGasto = document.getElementById('anyadirgasto'); 

btnAnyadirGasto.onclick = () => gestionPresupuestoWeb.nuevoGastoWeb(); 



export * from './generarDatosEstaticos.js';
