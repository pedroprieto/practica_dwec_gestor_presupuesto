
  import * as gesPresWeb from "./gestionPresupuestoWeb.js";

  import * as gesPres from "./gestionPresupuesto.js";

  gesPres.actualizarPresupuesto(1500);

  gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

  


  let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "supermercado", "comida");
  let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
  let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
  let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
  let g5 = new gesPres.CrearGasto("Seguro Hogar", 206.45, "2021-09-26", "casa", "seguros");
  let g6 = new gesPres.CrearGasto("Seguro Coche", 195.78, "2021-10-06", "Transporte", "seguros");

  gesPres.anyadirGasto(g1);
  gesPres.anyadirGasto(g2);
  gesPres.anyadirGasto(g3);
  gesPres.anyadirGasto(g4);
  gesPres.anyadirGasto(g5);
  gesPres.anyadirGasto(g6);

  gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
  gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

  gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gesPres.listarGastos());