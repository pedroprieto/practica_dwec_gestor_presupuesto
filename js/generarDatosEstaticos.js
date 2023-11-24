import * as gp from "/js/gestionPresupuesto.js";
import * as gpWeb from "/js/gestionPresupuestoWeb.js";

gp.actualizarPresupuesto(1500);
gpWeb.mostrarDatoEnId("presupuesto",gp.mostrarPresupuesto());

//Crear y añadir gastos
var gasto1 = new gp.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida");
gp.anyadirGasto(gasto1);
gp.anyadirGasto(new gp.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida"));
gp.anyadirGasto(new gp.CrearGasto("Bonobús",18.60,"2021-05-26","transporte"));
gp.anyadirGasto(new gp.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina"));
gp.anyadirGasto(new gp.CrearGasto("Seguro Hogar",209.45,"2021-09-26","casa","seguros"));
gp.anyadirGasto(new gp.CrearGasto("Seguro Coche",195.78,"2021-10-06","transporte","seguros"));

gpWeb.mostrarDatoEnId("gastos-totales",gp.calcularTotalGastos());
gpWeb.mostrarDatoEnId("listado-gastos-completo",gp.calcularBalance());

var gastos= gp.listarGastos();
gastos.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-completo",element);
});

gpWeb