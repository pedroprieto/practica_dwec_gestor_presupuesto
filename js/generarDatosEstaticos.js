//Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. 
//Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.
import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";
//En la tutoría del 3 de noviembre muestras como hacer el import pero utilizas parentesis en from y se muestra rojo:
//("./gestionPresupuesto.js"); He intentado ejecutarlo y me dice que hay error en '(', de ahí que los he eliminado y ha funcionado. 

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
//Resuelto en tutoría 3 NOV. 
gesPres.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
//Resuelto en tutoría 3 NOV. 
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

//Crear los siguientes gastos (función crearGasto)
//let g1 = new gesPres.CrearGasto("Desc", 44, "2021-10-27", "eti1", "eti2"); ejemplo de la tutoría 3 nov. 
let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados (función anyadirGasto)
//Resuelto en tutoría 3 NOV. 
gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);
gesPres.anyadirGasto(g4);
gesPres.anyadirGasto(g5);
gesPres.anyadirGasto(g6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let gastos = gesPres.listarGastos();

for (let g of gastos)
{    
    //gesPresWeb.mostrarGastoWeb(g); Ejemplo tutoria
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", g);
}

/*
let fechaDesde= "2021-09-01";
let fechaHasta= "2021-09-30";
let gastosFiltrados1 = gesPres.filtrarGastos(fechaDesde, fechaHasta); 
ESTO NO FUNCIONA.
No podemos declarar fechaDesde y fechaHasta y luego pasar dos parámetros a la función de filtrarGastos porque esta sólo recoge 1, el parámetro: opciones. 
Sí que podríamos hacer: let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde, fechaHasta}); una vez declarados fuera.
Si nos fijamos en el test de JSIII:
assert.lengthOf(filtrarGastos({fechaDesde: "2021-09-15", fechaHasta: "2021-10-06"}), 3, "Las opciones 'fechaDesde' o 'fechaHasta' no funcionan correctamente.");
Vemos que pasa el objeto {} con las diferentes opciones directamente.
Por tanto, no haría falta hacerlo por separado, ya que le damos el valor dentro directamente.
let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-31"});
Por el contrario, también podríamos hacerlo por separado creando un objeto de forma literal y después pasarlo como parámetro.

let opciones = {
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
}

let gastosFiltrados1 = gesPres.filtrarGastos(opciones);

De las tres formas pasa el test pero ya no se si me he hecho un lío a mi mismo y javascript se lo traga todo y da la casualidad que pasa el test. 
En caso de que las tres sean correctas, entiendo que la mejor sería la que menos se tenga que escribir por optimización, ¿no?
*/

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let fechaDesde= "2021-09-01";
let fechaHasta= "2021-09-30";
let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde, fechaHasta});

for (let g of gastosFiltrados1)
{   
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g);
}

//Para los siguientes test haremos la versión más rápida que es pasarle el objeto indicando el valor del parámetro directamente.
//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados2 = gesPres.filtrarGastos({valorMaximo: 50});

for (let g of gastosFiltrados2)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", g);
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados3 = gesPres.filtrarGastos({valorMinimo: 200, alfonso: ["seguros"]});
//Viendo el ejemplo del test:
//assert.lengthOf(filtrarGastos({etiquetasTiene: ["transporte", "comida"], fechaHasta: "2020-12-31", valorMaximo: 200})
//He probado a cambiar el nombre de etiquetasTiene a sólo etiquetas para ver si funcionaba. Al ver que sí, he probado nombre aleatorio y también. 
//Sin embargo, no puedo modificar el nombre de valorMaximo o valorMinimo porque el test no pasará y no llego a entender el motivo de que: etiquetasTiene 
//(alfonso en este ejemplo) de igual como lo envíe. Se me ocurria que fuese por orden, pero tampoco es el caso.  
for (let g of gastosFiltrados3)
{  
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", g);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});

for (let g of gastosFiltrados4)
{  
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", g);
}

/*
gesPresWeb.mostrarGastosAgrupadosWeb();
*/