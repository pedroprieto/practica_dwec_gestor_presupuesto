import {mostrarDatoEnId, mostrarGastoWeb,mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';

import {mostrarPresupuesto}    from './gestionPresupuesto.js';
import {CrearGasto} from './gestionPresupuesto.js';
import {listarGastos} from './gestionPresupuesto.js';
import {anyadirGasto} from './gestionPresupuesto.js';
import {borrarGasto} from './gestionPresupuesto.js';
import {calcularTotalGastos} from './gestionPresupuesto.js';
import {calcularBalance} from './gestionPresupuesto.js';
import {filtrarGastos} from './gestionPresupuesto.js';
import {agruparGastos} from './gestionPresupuesto.js';
import {actualizarPresupuesto} from './gestionPresupuesto.js';
import {gastos} from './gestionPresupuesto.js';

actualizarPresupuesto(1500);
let valor1 = 23.44,
    valor2 = 14.25,
    valor3 = 18.60,
    valor4 = 60.42,
    valor5 = 206.45,
    valor6 = 195.78;

let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida" );
let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte" );
let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros" );
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);






let node=document.getElementById('gastos-totales');
let balance=document.getElementById('balance-total');
let listadogastos=document.getElementById('listado-gastos-completo');
let gastosfiltrados1=document.getElementById('listado-gastos-filtrado-1');
let gastosfiltrados2=document.getElementById('listado-gastos-filtrado-2');
let gastosfiltrados3=document.getElementById('listado-gastos-filtrado-3');
let gastosfiltrados4=document.getElementById('listado-gastos-filtrado-4');
let gastosagrupadosdia=document.getElementById('agrupacion-dia');
let gastosagrupadosmes=document.getElementById('agrupacion-mes');
let gastosagrupadosyear=document.getElementById('agrupacion-anyo');


mostrarDatoEnId(presupuesto,mostrarPresupuesto());
mostrarDatoEnId(node,Math.floor(calcularTotalGastos()));
mostrarDatoEnId(balance,Math.floor(calcularBalance()));


IterarGastos(listadogastos,listarGastos());
IterarGastos(gastosfiltrados1,filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"}));
IterarGastos(gastosfiltrados2,filtrarGastos({valorMinimo:50}));
IterarGastos(gastosfiltrados3,filtrarGastos({valorMaximo:200,etiquetasTiene:["seguros"]}));
IterarGastos(gastosfiltrados4,filtrarGastos({valorMaximo:50, etiquetasTiene:["comida","transporte"]}));


mostrarGastosAgrupadosWeb(gastosagrupadosdia,agruparGastos("dia"),"día");
mostrarGastosAgrupadosWeb(gastosagrupadosmes,agruparGastos("mes"),"mes");
mostrarGastosAgrupadosWeb(gastosagrupadosyear,agruparGastos("anyo"),"año");

function IterarGastos(elemento,arraygastos){
    for(let gasto of arraygastos ){
        mostrarGastoWeb(elemento,gasto);
    }
}
