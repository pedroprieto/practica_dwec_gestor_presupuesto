import * as gesPres from ("./gestionPresupuesto.js"); 
import * as gesPresWeb from ("./gestionPresupuestoWeb.js"); 

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());


let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPres.anyadirGasto(g1);
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPres.anyadirGasto(g2);
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPres.anyadirGasto(g3);
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPres.anyadirGasto(g4);
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPres.anyadirGasto(g5);
let g6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPres.anyadirGasto(g6);


