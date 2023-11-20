import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

const presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuesto);

const gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

const gasto = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gasto);

const balance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balance);

const listGasto = gestionPresupuesto.listarGastos();
listGasto.forEach((gasto) => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
});

const listarFecha = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechasHasta: '2021-09-30'});
listarFecha.forEach((fecha) => {
    const fechaId = 'listado-gastos-filtrado-1';
    gestionPresupuestoWeb.mostrarGastoWeb(fechaId, fecha);
});

/*const gastosMasDe50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
gastosMasDe50.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-2';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto);
  }); */



  const listarValor = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });

  listarValor.forEach((valor) => {
    const valorId = 'listado-gastos-filtrado-2';
    gestionPresupuestoWeb.mostrarGastoWeb(valorId, valor);
  });

/* Mostrar el listado de gastos de más de 200€ con etiqueta seguros 
   en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)*/ 

   const gastosSegurosMasDe200 = gestionPresupuesto.filtrarGastos({ etiquetasTiene: ['seguros'], valorMinimo: 200 });
gastosSegurosMasDe200.forEach((gasto) => {
    const elementoId = 'listado-gastos-filtrado-3';
    gestionPresupuestoWeb.mostrarGastoWeb(elementoId, gasto ); 
});

    /* Mostrar el listado de gastos que tengan las etiquetas comida o transporte de 
       menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb) */

       const listadoEtiquetas = gestionPresupuesto.filtrarGastos({etiquetasTiene: ['comida', 'transporte'], valorMaximo: 50});
                listadoEtiquetas.forEach((elemnt) => {
                    const valorId = 'listado-gastos-filtrado-4';
                    gestionPresupuestoWeb.mostrarGastoWeb(valorId, elemnt);
                });

    //Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)

    const listadoPorDia = gestionPresupuesto.agruparGastos('dia');
                gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', listadoPorDia, 'día');

    const listadoPorMes = gestionPresupuesto.agruparGastos('mes');
                gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', listadoPorMes, 'mes');

    const listadoPorAño = gestionPresupuesto.agruparGastos('anyo');
                gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', listadoPorAño , 'año');

                export * from './generarDatosEstaticos.js';

                