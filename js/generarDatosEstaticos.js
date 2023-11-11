/* import * as gesPres from "./gestionPresupuesto.js"
import * as gesPresWeb from "./gestionPresupuestoWeb.js"

// Actualizar el presupuesto a 1500€
gesPres.actualizarPresupuesto(1500)

// Mostrar el presupuesto en el div#presupuesto
let presupuesto = gesPres.mostrarPresupuesto()
gesPresWeb.mostrarDatoEnId("presupuesto", presupuesto)

// Crear los gastos con los datos proporcionados
let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte")
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

// Añadir los gastos al array de gastos
gesPres.anyadirGasto(gasto1)
gesPres.anyadirGasto(gasto2)
gesPres.anyadirGasto(gasto3)
gesPres.anyadirGasto(gasto4)
gesPres.anyadirGasto(gasto5)
gesPres.anyadirGasto(gasto6)

// Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let totalGastos = gesPres.calcularTotalGastos()
gesPresWeb.mostrarDatoEnId("gastos-totales", totalGastos)

// Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let balance = gesPres.calcularBalance()
gesPresWeb.mostrarDatoEnId("balance-total", balance)

// Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let gastosCompleto = gesPres.listarGastos()
gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gastosCompleto) */

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
