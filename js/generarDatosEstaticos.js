import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";


gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId('presupuesto',gp.mostrarPresupuesto());

let gastoValor1 = 23.44
let gastoValor2 = 14.25
let gastoValor3 = 18.60
let gastoValor4 = 60.42
let gastoValor5 = 206.45
let gastoValor6 = 195.78

let gasto1 = new gp.CrearGasto("Compra carne", gastoValor1, "2021-10-06", "casa", "comida" );
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", gastoValor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gp.CrearGasto("Bonobús", gastoValor3, "2020-05-26", "transporte" );
let gasto4 = new gp.CrearGasto("Gasolina", gastoValor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gp.CrearGasto("Seguro hogar", gastoValor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new gp.CrearGasto("Seguro coche", gastoValor6, "2021-10-06", "transporte", "seguros" );

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpw.mostrarDatoEnId('gastos-totales',Math.floor(gp.calcularTotalGastos()));
gpw.mostrarDatoEnId('balance-total',Math.floor(gp.calcularBalance()));

for (let gasto of gp.listarGastos())
    {
        gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
    }

    for (let gasto of gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
    {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
    }

    for (let gasto of gp.filtrarGastos({valorMinimo: 50}))
    {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
    }

    for (let gasto of  gp.filtrarGastos({valorMinimo: 200, etiquetas:"seguros"}))
    {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
    }

    for (let gasto of gp.filtrarGastos({valorMaximo: 50, etiquetas:"comida, transporte"}))
    {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
    }

    gpw.mostrarGastosAgrupadosWeb('agrupacion-dia',gp.agruparGastos("dia"),"día");

    gpw.mostrarGastosAgrupadosWeb('agrupacion-mes',gp.agruparGastos("mes"),"mes");
    
    gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo',gp.agruparGastos("anyo"),"año");

