
let presupuesto = 0;
let gastos =[];
let idGasto = 0;

function actualizarPresupuesto(valor){
    if (valor < 0 || isNaN(valor)){
        return -1;
       
    } else{
        return presupuesto = valor;
    }
}

function mostrarPresupuesto() {
    let texto ="";
    texto = texto + `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    this.mostrarGasto = function(){
        let texto = "";
        texto = texto + `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return texto;
    },

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    },

    this.actualizarValor = function(valor){
        if (valor >= 0 & !isNaN(valor)){
            this.valor = valor;
        }
        return this.valor;
    },

    this.fecha = Date.parse(fecha);
    if (fecha == null || isNaN(Date.parse(fecha))){
        this.fecha = Date.parse(new Date());
    } 

    this.anyadirEtiquetas = function(...etiquetas){ 
        for (let etiqueta of etiquetas){
            if (this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    },

    this.borrarEtiquetas = function(...etiquetas){
        let pos = 0;
        for (let etiqueta of etiquetas){
            pos = this.etiquetas.indexOf(etiqueta);
            if (pos != -1){
                this.etiquetas.splice(pos, 1);
            }
        }
    },   

    this.etiquetas = [];
    if (etiquetas != null || etiquetas.length>0){
        this.anyadirEtiquetas(...etiquetas);
    } 

    this.actualizarFecha = function(fechaActualizada){
       if(isNaN(Date.parse(fechaActualizada))){
        this.fecha = Date.parse(fecha);
    }
       else{
        this.fecha = Date.parse(fechaActualizada);
       }
    },

    this.mostrarGastoCompleto = function(){
        let texto = "";
        texto = texto + this.mostrarGasto() + ".";
        texto = texto + `\nFecha: ${new Date (this.fecha).toLocaleString()}\n`;
        texto = texto + "Etiquetas:\n";
        for (let i = 0; i<this.etiquetas.length; i++){
            texto = texto + `- ${this.etiquetas[i]}\n`;
        }
        return texto;
    },

    this.obtenerPeriodoAgrupacion= function (periodo){
        let fecha = new Date(this.fecha);
        let fechaString = fecha.toISOString();
        if ( periodo == "dia"){
            return fechaString.substring(0, 10);
        }
        else if (periodo == "mes"){
            return fechaString.substring(0, 7)
        }
        else if ( periodo == "anyo"){
            return fechaString.substring(0, 4)
        }
    }
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gastoAnyadir){
    gastoAnyadir.id = idGasto;
    idGasto++;
    gastos.push(gastoAnyadir);
}

function borrarGasto(gastoBorrar){
    for (let i = 0; i<gastos.length; i++){
        if (gastos[i].id == gastoBorrar){
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for (let gasto of gastos){
        total = total + gasto.valor;
    }
    return total;
}

function calcularBalance(){
    let balance = 0;
    balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(opciones){
    let fechaDesde = opciones.fechaDesde;
    let fechaHasta = opciones.fechaHasta;
    let valorMinimo = opciones.valorMinimo;
    let valorMaximo = opciones.valorMaximo;
    let descripcionContiene = opciones.descripcionContiene;
    let etiquetasTiene = opciones.etiquetasTiene;
    return gastos.filter(function(gasto){
        if(fechaDesde){
            if(gasto.fecha < Date.parse(fechaDesde)){
                return false;
            }
        }
        if(fechaHasta){
            if (gasto.fecha > Date.parse(fechaHasta)){
                return false;
            }
        }
        if(valorMinimo){
            if (gasto.valor < valorMinimo){
                return false;
            }
        }
        if(valorMaximo){
            if(gasto.valor > valorMaximo){
                return false;
            }
        }
        if(descripcionContiene){
            if (gasto.descripcion.indexOf(descripcionContiene) == -1){
                return false;
            }
        }
        if(etiquetasTiene){
            let encontrado = false;
            for (let etiqueta of gasto.etiquetas){
                for (let etiquetaTiene of etiquetasTiene){
                    if (etiqueta == etiquetaTiene){
                        encontrado = true;
                    }
                }
            }
            if (!encontrado){
                return false;
            }
        }
        return true;
    });
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let opciones= {};
    opciones.periodo = periodo;
    opciones.etiquetasTiene = etiquetas;
    opciones.fechaDesde = fechaDesde;
    opciones.fechaHasta = fechaHasta; 
    let gastosFiltardos = filtrarGastos(opciones);
    let acumulador ={};
    return gastosFiltardos.reduce(function(acc, gasto){
        let pAgrup = gasto.obtenerPeriodoAgrupacion(periodo);
        if(acc[pAgrup]){
            acc[pAgrup] = acc[pAgrup] + gasto.valor;
        }
        else{
            acc[pAgrup] = gasto.valor;
        }
        return acc;
    }, acumulador);
}

function transformarListadoEtiquetas(opciones){
    let etiquetas = opciones.etiquetasTiene;
    let etiquetasTieneTransf = /\d\w/gi;
    etiquetas.match(etiquetasTieneTransf);
    filtrarGastos(opciones);

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    CrearGasto,
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    transformarListadoEtiquetas,
    agruparGastos

}
