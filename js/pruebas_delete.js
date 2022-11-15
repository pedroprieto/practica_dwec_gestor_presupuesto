import { CrearGasto, anyadirGasto, filtrarGastos, agruparGastos } from '../js/gestionPresupuesto.js';

let valor1 = 23.44,
    valor2 = 12.88,
    valor3 = 22.80,
    valor4 = 62.22,
    valor5 = 304.75,
    valor6 = 195.88;

let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros");
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

let agrup1 = agruparGastos("mes");

console.log(agrup1);