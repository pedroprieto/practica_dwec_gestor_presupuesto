// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return valor;
    } else {
        return -1;
    }

}

function mostrarPresupuesto() {
    let x = presupuesto;
    
    return `Tu presupuesto actual es de ${x} €`;
    
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }


    this.fecha = Date.now();  

    
    if (!isNaN(Date.parse(fecha))) {  


        this.fecha = Date.parse(fecha); 
        
    }

    this.etiquetas = []; 

    if(etiquetas) {

        this.etiquetas = etiquetas;
        
    }
    
    if(etiquetas.length === 0)
    {
        this.etiquetas = [];
    }
    
    
    this.mostrarGastoCompleto = function() {

        let fechaLocal = new Date(this.fecha).toLocaleString();

        let resultado = "\n";

        for (var el of etiquetas) 
        {
            resultado = resultado + "- " + el + "\n";
        }

        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${fechaLocal}\nEtiquetas:${resultado}`;
    }

    this.actualizarDescripcion = function(descripcionNueva) {
        this.descripcion = descripcionNueva;
        return descripcionNueva;
    }

    this.actualizarValor = function(valorNuevo) {
        if (valorNuevo >= 0) {
            this.valor = valorNuevo;
            return valorNuevo; 
        } else {
            this.valor = this.valor;
        }
    }

    this.actualizarFecha = function(fechaActualizada) {
        
        if(!isNaN(Date.parse(fechaActualizada)))
        {
            this.fecha = Date.parse(fechaActualizada);
        } 
        else 
        {
            this.fecha = this.fecha;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas) {
      
        for (let el of etiquetas)
        {
            if(!this.etiquetas.includes(el))
            {
                this.etiquetas.push(el);
            }
        }
  

        
    }

    this.borrarEtiquetas = function(...etiquetasNuevas) {
        
        for (let el of etiquetas)
        {
            for (let elm of etiquetasNuevas)
            {
                el = etiquetas.indexOf(elm);

                if(el !== -1)
                {
                    this.etiquetas.splice(el , 1);
                }
            }
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

function borrarGasto(idNueva) {

    gastos.splice(gastos.findIndex(gasto => gasto.id === idNueva),1);
    
    
}

function calcularTotalGastos() {

    
    let resultado = gastos.map(gasto => gasto.valor).reduce((suma, actual) => suma + actual, 0); 

    return resultado;  
    

}

function calcularBalance() {

    let balance;

    balance = presupuesto - calcularTotalGastos();

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
    calcularBalance
}
