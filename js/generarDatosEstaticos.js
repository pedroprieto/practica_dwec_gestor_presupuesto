import * as gestionpresupuesto    from './gestionPresupuesto.js';
import * as presupuestoWeb from './gestionPresupuestoWeb.js';

gestionpresupuesto.actualizarPresupuesto(1500);

let valor1 = 23.44,
    valor2 = 14.25,
    valor3 = 18.60,
    valor4 = 60.42,
    valor5 = 206.45,
    valor6 = 195.78;

let gasto1 = new gestionpresupuesto.CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionpresupuesto.CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionpresupuesto.CrearGasto("Bonobús", valor3, "2020-05-26", "transporte" );
let gasto4 = new gestionpresupuesto.CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionpresupuesto.CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionpresupuesto.CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros" );
gestionpresupuesto.anyadirGasto(gasto1);
gestionpresupuesto.anyadirGasto(gasto2);
gestionpresupuesto.anyadirGasto(gasto3);
gestionpresupuesto.anyadirGasto(gasto4);
gestionpresupuesto.anyadirGasto(gasto5);
gestionpresupuesto.anyadirGasto(gasto6);



export { 
  mostrarPresupuesto,
  CrearGasto,
  calcularTotalGastos,
  calcularBalance,
  filtrarGastos,
  agruparGastos} from './gestionPresupuesto.js';

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb } from './gestionPresupuestoWeb.js';



