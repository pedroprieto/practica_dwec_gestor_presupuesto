// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(param) {
    // TODO
    let nerror= -1;

    if (param >= 0) {
        presupuesto = param;
        return presupuesto;
    } else {
        console.log ("Presupuesto no válido.");
        return (nerror);
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = "Tu presupuesto actual es de " + presupuesto + " €";

    return (mensaje);
}

function listarGastos() {
    
    for(let i=0; i<gastos.length;i++) {
        console.log(gastos[i]);
    }
    return (gastos);
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto ++;
}

function borrarGasto(id) {   
   let indice = 0;

   for (let i of gastos) {
        if(i.id == id) {
            indice = gastos.indexOf(i);
            gastos.splice(indice, 1);
        }
   }
}

function calcularTotalGastos() {
    let totalG=0;
    let i;
    if(gastos.length != 0){
        for(i=0;i < gastos.length;i++) {
            totalG += parseInt(gastos[i].valor);
        }
    }
    return totalG;
}

function calcularBalance() {
    let totGast = 0;
    let balance = 0;

    totGast = calcularTotalGastos();
    balance = presupuesto - totGast;

    return(balance);
}

function CrearGasto(descr, val, fech, ...etiq) {
    // TODO
    this.id = idGasto;
    this.descripcion = descr;
    this.valor = 0;
    this.etiquetas = [];
    this.fecha = Date.now();


    //métodos
    this.mostrarGasto = function() {
        return('Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €');
    }

    this.actualizarDescripcion = function(ndescr) {
        this.descripcion = ndescr;
    }

    this.actualizarValor = function(nvalor) {
        
        if (nvalor >= 0){
            this.valor = nvalor;
        }
    }

    this.mostrarGastoCompleto = function() {
        let gastoDesc = this.mostrarGasto() + ".\n";
        let fechFormat = "Fecha: " + this.fecha.toLocaleString() + "\n";
        let resultEtiq ="Etiquetas:\n";
        let i= 0;

        for(i=0; i < gastos.length; i++){
            resultEtiq += "- " + this[i].etiquetas + "\n";
        }

        return (gastoDesc + fechFormat + resultEtiq);
    }

    this.actualizarFecha = function(paramFecha) {
        let data = Date.parse(paramFecha);

        if(data){
            this.fecha = data;
        }
    }

    this.anyadirEtiquetas = function(...arg) {
        for(let i=0; i<arg.length; i++){
            if(!(this.etiquetas.includes(arg[i],0))){
                this.etiquetas.push(arg[i]);
            }
        }
    }

    this.borrarEtiquetas = function(...bEtiq) {
        let i,entrada;

        for(i=0; i < bEtiq.length; i++) {
            if(this.etiquetas.includes(bEtiq[i],0)) {
                entrada = this.etiquetas.indexOf(bEtiq[i],0);
                this.etiquetas.splice(entrada, 1);
            }
        }
    }



    if(fech){
        this.actualizarFecha(fech);
    }

    if(etiq){
        this.anyadirEtiquetas(...etiq);
    }

    if(val){
        this.actualizarValor(val);
    }
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
