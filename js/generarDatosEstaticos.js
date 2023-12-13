/*Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.*/
import * as gestionPresupuestoWeb from './js/gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './js/gestionPresupuesto.js';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto).
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId).

/*Crear los siguientes gastos (función crearGasto):
    ("Compra carne", 23.44, "2021-10-06", "casa", "comida")
    ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
    ("Bonobús", 18.60, "2020-05-26", "transporte")
    ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
    ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
    ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
*/

//Añadir los gastos creados (función anyadirGasto).

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId).

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId).

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos 
//y mostrarGastoWeb).

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
// (funciones filtrarGastos y mostrarGastoWeb).

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 
//(funciones filtrarGastos y mostrarGastoWeb).

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 
//(funciones filtrarGastos y mostrarGastoWeb).

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en 
//div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb).

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos
// y mostrarGastosAgrupadosWeb).

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos 
//y mostrarGastosAgrupadosWeb).

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos
//y mostrarGastosAgrupadosWeb).
