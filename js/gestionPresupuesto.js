

let presupuesto = 0;
let gastos = [];
let idGasto = 0;




function actualizarPresupuesto(x) {

    if (x > 0) {
        presupuesto = x;
    }
    else {
        x=-1
    }
    return x;
}



function mostrarPresupuesto() {
    
    let x = presupuesto;

    return "Tu presupuesto actual es de " + x + " €";
}



function CrearGasto(descripcion, valor, fecha , ...etiquetas) {

    this.descripcion = descripcion;
    
    if (valor >= 0) {

        this.valor = valor;

    } else {

        this.valor = 0;

    }

    if (fecha) {
        
        fecha = Date.parse(fecha);
        this.fecha = fecha;

    } else {
        
        fecha = Date.now();
        this.fecha = fecha;

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
}
