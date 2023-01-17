'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        let error = -1;
        console.log("Presupuesto inferior a 0");
        return error;
    }
}

function mostrarPresupuesto() {
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto(desc, gasto, fecha, ...etiquetas) {
    if (gasto >= 0) {
        this.valor = gasto;
    } else {
        this.valor = 0;
    }

    this.descripcion = desc;

    this.etiquetas = etiquetas;

    if (etiquetas == null) {
        this.etiquetas = [];
    }

    this.mostrarGasto = function () {
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return texto;
    }

    this.anyadirEtiquetas = function (...etiquetas) {

        for (const etiqueta of etiquetas) {
            if (this.etiquetas.includes(etiqueta) == false) {
                this.etiquetas.push(etiqueta);
            }
        }
        return this.etiquetas;
    }

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        for (let i = 0; i < etiquetasABorrar.length; i++) {
            for (let j = 0; j < this.etiquetas.length; j++){
                if (etiquetasABorrar[i] == etiquetas[j]) {
                    this.etiquetas.splice(j, 1);
                }
            }
        }
    }

    fecha = Date.parse(fecha);

    if (fecha == null || isNaN(fecha)) {
        this.fecha = +new Date();
    } else {
        this.fecha = fecha;
    }

    this.actualizarFecha = function (nuevaFecha) {
        
        nuevaFecha = Date.parse(nuevaFecha);

        if (isNaN(nuevaFecha)) {
            this.fecha = fecha;
        } else {
            this.fecha = +new Date(nuevaFecha);
        }
    }

    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado >= 0) {
            this.valor = valorActualizado;
        }
    }

    this.mostrarGastoCompleto = function () {
        
        var fechaLocal = new Date(fecha).toLocaleString();


        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." + "\n" + 
                    "Fecha: " + fechaLocal + "\n" +
                    "Etiquetas:\n";
        for (var i = 0; i < this.etiquetas.length; i++) {
            texto += "- " + etiquetas[i] + "\n";
        }
        return texto;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    
    this.obtenerPeriodoAgrupacion = function (periodo) {
    
        let fechaCompleta = new Date(fecha).toISOString();
        let anyo = fechaCompleta.substring(0, 4);
        let mes = fechaCompleta.substring(5, 7);
        let dia = fechaCompleta.substring(8, 10);
        let texto = "";
    
        switch (periodo) {
            case "mes":
                return texto += anyo + "-" + mes;
            case "dia":
                return texto += anyo + "-" + mes + "-" + dia;
            case "anyo":
                return texto += anyo;
        }
    }
}

function listarGastos() {
    return gastos;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas

    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"

        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++){
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for (let i = 0; i < gastos.length; i++){
        totalGastos += gastos[i].valor;
    }
    return totalGastos;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}
    
function filtrarGastos(Opciones) {
    let fechaDesde = Opciones.fechaDesde;
    let fechaHasta = Opciones.fechaHasta;
    let valorMinimo = Opciones.valorMinimo;
    let valorMaximo = Opciones.valorMaximo;
    let descripcionContiene = Opciones.descripcionContiene;
    let etiquetasTiene = Opciones.etiquetasTiene;

    if (Opciones.length == 0) {
        return gastos;
    } else {
        return gastos.filter(function (gastos) {
        let resultado = true;

        if (fechaDesde) {
            if (gastos.fecha < Date.parse(fechaDesde)) {
                resultado = false;
            }
        }
        if (fechaHasta) {
            if (gastos.fecha > Date.parse(fechaHasta)) {
                resultado = false;
            }
        }
        if (valorMinimo) {
            if (gastos.valor < valorMinimo) {
                resultado = false;
            }
        }
        if (valorMaximo) {
            if (gastos.valor > valorMaximo) {
                resultado = false;
            }
        }
        if (descripcionContiene) {
            if (gastos.descripcion.indexOf(descripcionContiene) == -1) {
                resultado = false;
            }
        }
        if (etiquetasTiene) {
            let encontrado = false;
            for (let etiqueta of gastos.etiquetas) {
                for (let etiquetaTiene of etiquetasTiene) {
                    if (etiqueta == etiquetaTiene) {
                        encontrado = true;
                    }
                }
            }
            if (!encontrado) {
                resultado = false;
            }
        }

        return resultado;
        });    
    }
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {

    let gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });

    let gastosAgrupados = gastosFiltrados.reduce(function (acc, gasto) {

        acc[gasto.obtenerPeriodoAgrupacion(periodo)] = acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0;
        acc[gasto.obtenerPeriodoAgrupacion(periodo)] += gasto.valor;
    
    return acc;
        
    }, {});

    return gastosAgrupados;
}

function transformarListadoEtiquetas(etiquetas){
    let EtTransform = etiquetas.match(/[\w]+/gi);
    return EtTransform;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
