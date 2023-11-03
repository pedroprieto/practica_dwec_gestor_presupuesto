import * as gp from './gestionPresupuesto.js'
import * as gpWeb from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500)

gpWeb.mostrarDatoEnID('presupuesto', gp.mostrarPresupuesto())

const g1 = new gp.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida')
const g2 = new gp.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida')
const g3 = new gp.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte')
const g4 = new gp.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina')
const g5 = new gp.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros')
const g6 = new gp.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros')

gp.anyadirGasto(g1)
gp.anyadirGasto(g2)
gp.anyadirGasto(g3)
gp.anyadirGasto(g4)
gp.anyadirGasto(g5)
gp.anyadirGasto(g6)

gpWeb.mostrarDatoEnID('gastos-totales', gp.calcularTotalGastos())

gpWeb.mostrarDatoEnID('balance-total', gp.calcularBalance())

for (const gasto of gp.listarGastos()) {
  gpWeb.mostrarGastoWeb('listado-gastos-completo', gasto)
}

for (const gasto of gp.filtrarGastos({ fechaDesde: '2021-09-01', fechaHasta: '2021-09-30' })) {
  gpWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto)
}

for (const gasto of gp.filtrarGastos({ valorMinimo: 50 })) {
  gpWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto)
}

for (const gasto of gp.filtrarGastos({ valorMinimo: 20, etiquetasTiene: ['seguros'] })) {
  gpWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto)
}

for (const gasto of gp.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ['comida', 'transporte'] })) {
  gpWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto)
}

gpWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gp.agruparGastos('mes'), 'mes')
