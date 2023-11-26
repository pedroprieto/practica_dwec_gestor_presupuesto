import * as gp from "/js/gestionPresupuesto.js";
import * as gpWeb from "/js/gestionPresupuestoWeb.js";

gp.actualizarPresupuesto(1500);
gpWeb.mostrarDatoEnId("presupuesto",gp.mostrarPresupuesto());

//Crear y añadir gastos
var gasto1= new gp.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida")
gp.anyadirGasto(gasto1);
gp.anyadirGasto(new gp.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida"));
gp.anyadirGasto(new gp.CrearGasto("Bonobús",18.60,"2020-05-26","transporte"));
gp.anyadirGasto(new gp.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina"));
gp.anyadirGasto(new gp.CrearGasto("Seguro Hogar",206.45,"2021-09-26","casa","seguros"));
gp.anyadirGasto(new gp.CrearGasto("Seguro Coche",195.78,"2021-10-06","transporte","seguros"));

gpWeb.mostrarDatoEnId("gastos-totales",gp.calcularTotalGastos());
gpWeb.mostrarDatoEnId("balance-total",gp.calcularBalance());
//listado todos los gastos
var gastos= gp.listarGastos();
gastos.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-completo",element);
});
//listado de septiembre 2021
var gastosFiltro1= gastos.filter(function(g){
    if(g.obtenerPeriodoAgrupacion("mes")=='2021-09'){
        return true;
    }else{
        return false;
    }
});
gastosFiltro1.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-filtrado-1",element);
    console.log(element);
});
//listado de mas de 50€
var gastosFiltro2= gastos.filter(function(g){
    if(g.valor >= 50){
        return true;
    }else{
        return false;
    }
});
gastosFiltro2.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-filtrado-2",element);
    console.log(element);
});
//listado de mas de 200€ y etiqueta seguros
var gastosFiltro3= gastos.filter(function(g){
    if(g.valor >= 200 && g.etiquetas.find(e=> e=="seguros")){
        return true;
    }else{
        return false;
    }
});
gastosFiltro3.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-filtrado-3",element);
    console.log(element);
});
//listado con etiqueta comida y transporte de menos de 50€
var gastosFiltro4= gastos.filter(function(g){
    if(g.valor < 50 && g.etiquetas.find(e=> e=="comida" || "transporte")){
        return true;
    }else{
        return false;
    }
});
gastosFiltro4.forEach(element => {
    gpWeb.mostrarGastoWeb("listado-gastos-filtrado-4",element);
    console.log(element);
});
//gastos agrupados por dia
gpWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gp.agruparGastos("dia",undefined,undefined,undefined),"día");

//gastos agrupados por mes
gpWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gp.agruparGastos("mes",undefined,undefined,undefined),"mes");

//gastos agrupados por año
gpWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gp.agruparGastos("anyo",undefined,undefined,undefined),"año");

let botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click",gpWeb.nuevoGastoWeb);

let botonActualizarPres = document.getElementById("actualizarpresupuesto");
botonActualizarPres.addEventListener("click",gpWeb.actualizarPresupuestoWeb);

