import * as gestionPresupuesto from "./gestionPresupuesto.js"
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js"

// Actualizamos el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto(1500)

// Mostramos el presupuesto en el div#presupuesto
let presupuesto = gestionPresupuesto.mostrarPresupuesto()
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto)

// Creamos los gastos con los datos proporcionados
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte")
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

// Añadimos los gastos al array de gastos
gestionPresupuesto.anyadirGasto(gasto1)
gestionPresupuesto.anyadirGasto(gasto2)
gestionPresupuesto.anyadirGasto(gasto3)
gestionPresupuesto.anyadirGasto(gasto4)
gestionPresupuesto.anyadirGasto(gasto5)
gestionPresupuesto.anyadirGasto(gasto6)

// Mostramos los gastos totales en div#gastos-totales
let gastosTotales = gestionPresupuesto.calcularTotalGastos()
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales)

// Mostramos el balance total en div#balance-total
let balanceTotal = gestionPresupuesto.calcularBalance()
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal)

// Mostramos el listado completo de gastos en div#listado-gastos-completo
let listaGastos = gestionPresupuesto.listarGastos()
// Recorremos el array de gastos y mostramos cada gasto en el div#listado-gastos-completo
for (let gasto of listaGastos) {
	gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto)
}

// Mostramos el listado de gastos agrupados por día, mes y año en los divs#agrupacion-dia, #agrupacion-mes y #agrupacion-anyo
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", "día", gestionPresupuesto.agruparGastos("dia"))
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", "mes", gestionPresupuesto.agruparGastos("mes"))
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", "año", gestionPresupuesto.agruparGastos("anyo"))

// Mostramos el listado de gastos realizados en septiembre de 2021 en listado-gastos-filtrado-1
let filtro1 = { fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" }
let gastos1 = gestionPresupuesto.filtrarGastos(filtro1)
// Recorremos el array de gastos y mostramos cada gasto en el div#listado-gastos-filtrado-1
for (let gasto of gastos1) {
	gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto)
}

// Mostramos el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
let filtro2 = { valorMinimo: 50 }
let gastos2 = gestionPresupuesto.filtrarGastos(filtro2)
// Recorremos el array de gastos y mostramos cada gasto en el div#listado-gastos-filtrado-2
for (let gasto of gastos2) {
	gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
}

// Mostramos el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
let filtro3 = { valorMinimo: 200, etiquetasTiene: ["seguros"] }
let gastos3 = gestionPresupuesto.filtrarGastos(filtro3)
// Recorremos el array de gastos y mostramos cada gasto en el div#listado-gastos-filtrado-3
for (let gasto of gastos3) {
	gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
}

// Mostramos el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
let filtro4 = { valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] }
let gastos4 = gestionPresupuesto.filtrarGastos(filtro4)
// Recorremos el array de gastos y mostramos cada gasto en el div#listado-gastos-filtrado-4
for (let gasto of gastos4) {
	gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
}
