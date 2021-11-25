import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

