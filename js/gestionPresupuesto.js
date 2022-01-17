

let presupuesto = 0;
let gastos = [];
let idGasto = 0;




function CrearGasto(descripcion, valor, fecha , ...etiquetas) {

    this.descripcion = descripcion;
    
    if (valor >= 0) {

        this.valor = valor;

    } else {

        this.valor = 0;

    }

    if (fecha) {
        
        fecha = Date.parse(fecha);
        //this.fecha = new Date(fecha).toISOString().substring(0, 10);
        this.fecha = fecha;

    } else {
        
        fecha = Date.now();
        this.fecha = new Date(fecha).toISOString().substring(0, 10);

    }

    if (etiquetas.length === 0) {
        
        this.etiquetas = [];

    } else {
        
        this.etiquetas = etiquetas;
    }   
    
    this.anyadirEtiquetas = function (...etiqueta) {
        
        for (let i = 0; i < etiqueta.length; i++){            
            
            if (this.etiquetas.includes(etiqueta[i]) == false) {
                
                this.etiquetas.push(etiqueta[i]);

            } 
        }
    }

    

    this.borrarEtiquetas = function (...etiqueta) {
        
        for (let i = 0; i < etiqueta.length; i++){
            
            if (this.etiquetas.includes(etiqueta[i])) {
                
                let pos = this.etiquetas.indexOf(etiqueta[i]);

                if (pos !==(-1)) {
                    
                    this.etiquetas.splice(pos, 1);
                }

           } 
        }
    }
        
    this.mostrarGasto = function () {

        return ("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");

    }

    this.mostrarGastoCompleto = function () {
        
        let fechaNueva = new Date(this.fecha);
        let fechaLetra = fechaNueva.toLocaleString();

        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLetra}\nEtiquetas:\n- ${this.etiquetas.join("\n- ")}\n`

        return texto;

    }

    this.actualizarFecha = function (fecha) {

        fecha = Date.parse(fecha);

        if (fecha) {
            
            this.fecha= fecha;
        } else {

            this.fecha = this.fecha;
        }      

    }

    this.actualizarDescripcion = function (descripcion) {

        this.descripcion = descripcion;

    }

    this.actualizarValor = function (valor) {

        if (valor >= 0) {

            this.valor = valor;

        } else {

            this.valor;
        }        
    }
    
    this.obtenerPeriodoAgrupacion = function (periodo) {

        let fecha = new Date(this.fecha).toISOString();

        let resultado ="";

        if (periodo == "dia") {

            resultado = fecha.substr(0, 10);
            
        } else if (periodo == "mes") {

            resultado = fecha.substr(0, 7);

        } else if(periodo == "anyo"){
            
            resultado = fecha.substr(0, 4);
        }

        return resultado;

    }

}


function actualizarPresupuesto(x) {

    if (x > 0) {
        presupuesto = x;
    }
    else {
        x = -1
    }
    return x;
}



function mostrarPresupuesto() {

    let x = presupuesto;

    return "Tu presupuesto actual es de " + x + " €";
}


function listarGastos() {

    return gastos;    
}


function anyadirGasto(gasto) {

    gasto.id = idGasto;

    idGasto++;

    gastos.push(gasto);

}


function borrarGasto(id) {
    
    let pos = gastos.findIndex(gastos => gastos.id === id);    
    
    if (pos != (-1)) {

        gastos.splice(pos, 1);

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


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {

    let etiquetasTiene = etiquetas;

    if (!fechaDesde) {

        fechaDesde = "2020-01-01";

    }

    if (!fechaHasta) {

        fechaHasta = new Date(Date.now()).toISOString().substr(0, 10);
    }

    let gastosCreados = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene });

    let resultado = gastosCreados.reduce((acc, gasto) => {

        let propiedad = gasto.obtenerPeriodoAgrupacion(periodo);

        acc[propiedad] = (propiedad || 0) + gasto.valor;

        return acc;

    }, {});

    return resultado;

}


function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {
    
    
    let gastosFiltrados = gastos;

    gastosFiltrados = gastosFiltrados.filter(function(gasto) {
        
        let existe = true;

        if (fechaDesde) {
            
            if (gasto.fecha < Date.parse(fechaDesde)) {
                
                existe = false;
            }
        }

        if (fechaHasta) {
            
            if (gasto.fecha > Date.parse(fechaHasta)) {
                
                existe = false;
            }
        }

        if (valorMinimo) {

            if (gasto.valor < valorMinimo) {
                
                existe = false;
            }
        }

        if (valorMaximo) {
            
            if (gasto.valor > valorMaximo) {
                
                existe = false;
            }
        }

        if (descripcionContiene) {

                        
            if (!gasto.descripcion.includes(descripcionContiene)) {
                
                existe = false;
            }
        }

        if (etiquetasTiene) {
           
            let tiene = false;

            for (let i = 0; i < gasto.etiquetas.length; i++) {
                
                for (let j = 0; j < etiquetasTiene.length; j++) {

                    if (gasto.etiquetas[i] == etiquetasTiene[j]) {
                        
                        tiene = true;
                    }
                }
            }

            if (tiene == false) {
                
                existe = false;
            }
        }
        return existe;

    })

    return gastosFiltrados;   
    
}

function transformarListadoEtiquetas(etiquetas) {
    
    let expresionRegular = /[a-z][a-z0-9]+/gi;
    let resultado = etiquetas.match(expresionRegular);

    return resultado;

}

function cargarGastos(arrGastos) {
    
    gastos = arrGastos;

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
    cargarGastos,
}
