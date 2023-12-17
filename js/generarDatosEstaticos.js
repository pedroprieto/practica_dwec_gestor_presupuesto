import * as gesPresupuesto from "./gestionPresupuesto.js"
import * as gesPresupuestoWeb from "./gestionPresupuestoWeb.js"

gesPresupuesto.actualizarPresupuesto(1500);
gesPresupuestoWeb.mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto())

let gasto1=new gesPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2=new gesPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3=new gesPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4=new gesPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5=new gesPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6=new gesPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPresupuesto.anyadirGasto(gasto1);
gesPresupuesto.anyadirGasto(gasto2);
gesPresupuesto.anyadirGasto(gasto3);
gesPresupuesto.anyadirGasto(gasto4);
gesPresupuesto.anyadirGasto(gasto5);
gesPresupuesto.anyadirGasto(gasto6);
       

gesPresupuestoWeb.mostrarDatoEnId("gastos-totales", gesPresupuesto.calcularTotalGastos());

gesPresupuestoWeb.mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

let gastosListados=gesPresupuesto.listarGastos()
for(let i=0;i<gastosListados.length;i++)
{
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gastosListados[i]);
}


let gastosFiltrados1=gesPresupuesto.filtrarGastos({fechaDesde: "2021-09-1", fechaHasta: "2021-9-30"})
for(let i=0;i<gastosFiltrados1.length;i++)
{
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados1[i]);
}

let gastosFiltrados2=gesPresupuesto.filtrarGastos({valorMinimo:50})
for(let j=0;j<gastosFiltrados2.length;j++)
{
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados2[j]);
}

let gastosFiltrados3=gesPresupuesto.filtrarGastos({etiquetasTiene: ["seguros"], valorMinimo:200})
for(let k=0;k<gastosFiltrados3.length;k++)
{
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados3[k]);
}

let gastosFiltrados4=gesPresupuesto.filtrarGastos({etiquetasTiene: ["comida","transporte"], valorMaximo:50})
for(let q=0;q<gastosFiltrados4.length;q++)
{
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados4[q]);
}

let agrup1 = gesPresupuesto.agruparGastos("dia");
gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrup1,"día");

let agrup2 = gesPresupuesto.agruparGastos("mes");
gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrup2,"mes");

let agrup3 = gesPresupuesto.agruparGastos("anyo");
gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrup3,"año")
