// Variables globales
    let presupuesto = 0;
    let gastos = [];
    let idGasto = 0;

// Funciones
function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto=valor;
        return presupuesto;
    } else {
        console.log(`Error. ${valor} es negativo`);
        return -1;
    }
}

function mostrarPresupuesto() {
    let x = presupuesto;
    return 'Tu presupuesto actual es de '+x+' €';
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion=descripcion;

    if (valor >= 0) {
        this.valor=valor;
    } else {
        this.valor=0;
    }

    fecha = Date.parse(fecha);

    if (fecha === undefined) {
        this.fecha = Date.now(fecha);
    } else if (isNaN(fecha)) {
        this.fecha = Date.now(fecha);
    } else {
        this.fecha = fecha;
    }

    //inicializar etiquetas, así si está vacío se muestra tal cual, porque con if me daba muchos fallos
    this.etiquetas=etiquetas;

    this.anyadirEtiquetas = function(...etiq_Nueva) {
    //si las etiquetas ya existen no se pueden añadir, bucle para comparar y borrar la etiqueta que sobra
        for (let i=0; i<etiq_Nueva.length; i++) {
            if (this.etiquetas.includes(etiq_Nueva[i])) {
                etiq_Nueva.splice(i,1);
            }
        }
    //añadir nuevas etiquetas
    this.etiquetas.push(...etiq_Nueva);
   }

   this.borrarEtiquetas = function(...etiq_borrar) {
        for (let i=0; i<etiq_borrar.length; i++) {
            //si la etiqueta está incluida
            if (this.etiquetas.includes(etiq_borrar[i])) {
                //sacar indice que le corresponde y borrarlo
                let indice = this.etiquetas.indexOf(etiq_borrar[i])
                this.etiquetas.splice(indice,1);
            }
        }
   }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        //almacenar fecha en formato local
        let fechalocal = new Date(this.fecha).toLocaleString();

        //almacenar etiquetas para mostrarla en el formato deseado
        let mostraretiquetas="";
            for (let etiqueta of this.etiquetas) {
                mostraretiquetas = mostraretiquetas + "\n- " + etiqueta;
            };
        
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +
        " €.\nFecha: " + fechalocal + "\n" + 
        "Etiquetas:" + String(mostraretiquetas) + "\n";
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion=descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor>=0) {
            this.valor=valor;
        } else {
            this.valor=this.valor;
        }
    }

    this.actualizarFecha = function(fecha_actual) {
        fecha_actual = Date.parse(fecha_actual);
        
        if (isNaN(fecha_actual)) {
            //si no es valida, no se hacen modificaciones;
            this.fecha;
        } else {
            this.fecha = fecha_actual;
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha = new Date(this.fecha);
        let isoString = fecha.toISOString();

        if (periodo.toLowerCase()==="dia") {
            let agrupar_dia = isoString.substring(0,10);
            return agrupar_dia;
        } else if (periodo.toLowerCase()=="mes") {
            let agrupar_mes = isoString.substring(0,7);
            return agrupar_mes;
        } else if (periodo.toLowerCase()=="anyo") {
            let agrupar_anyo = isoString.substring(0,4);
            return agrupar_anyo;
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(obj_gasto){
    obj_gasto.id = idGasto;
    gastos.push(obj_gasto); 
    idGasto++;
}

function borrarGasto(id_borrar) {
    for (let i=0; i < gastos.length; i++) {
        if (gastos[i].id == id_borrar) {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos() {
    let suma_gastos = 0;
    for (let i=0; i < gastos.length; i++) {
        suma_gastos = suma_gastos + gastos[i].valor;
    }
    return suma_gastos;
}

function calcularBalance() {
    let balance;
    balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(opciones) {

        function filtrar(gasto) {
            let filtro = true;
            if (opciones.fechaDesde && gasto.fecha < Date.parse(opciones.fechaDesde)) {
                filtro = false;
            }
            if (opciones.fechaHasta && gasto.fecha > Date.parse(opciones.fechaHasta)) {
                filtro = false;
            }
            if (opciones.valorMinimo && gasto.valor < opciones.valorMinimo) {
                filtro = false;
            }
            if (opciones.valorMaximo && gasto.valor > opciones.valorMaximo) {
                filtro = false;
            }
            if (opciones.descripcionContiene && !gasto.descripcion.includes(opciones.descripcionContiene)) {
                filtro = false;
            }
            if (opciones.etiquetasTiene) {
                let cont = 0; //para ir contando las etiquetas que coinciden
                for (let etiqueta of gasto.etiquetas) {
                    for (let etiquetaTiene of opciones.etiquetasTiene) {
                        if (etiqueta === etiquetaTiene) {
                            cont++; //si coincide añadimos uno al contador
                        }
                    }
                }
                if (cont === 0) { //si no hay ninguna etiqueta que coincida, devolver false 
                    filtro = false;
                }
            }
            return filtro;
        }
        
        let gastosFiltrados = gastos.filter(filtrar);

        return gastosFiltrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {

    if (periodo===undefined) {
        periodo = "mes";
    }
    if (fechaDesde===undefined) {
        fechaDesde = "1970-01-01" ;
    }
    if (fechaHasta===undefined) {
        fechaHasta = new Date();
    }

    let etiquetasTiene = etiquetas;
    let opciones = {fechaDesde, fechaHasta, etiquetasTiene};

    let filtro = filtrarGastos(opciones);

    function acumulador(acc, gasto) {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[periodoAgrupacion]) {
            acc[periodoAgrupacion] = acc[periodoAgrupacion] + gasto.valor;
        } else {
            acc[periodoAgrupacion] = gasto.valor;
        }
        return acc;
    }

    let agrupados = filtro.reduce(acumulador, {});

    return agrupados;
}

function transformarListadoEtiquetas(etiq) {
    let RegExp = /\w+/gi;
    let transformacion = etiq.match(RegExp);
    return transformacion;
}

function cargarGastos(arrayGastos) {
    gastos = arrayGastos;
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
