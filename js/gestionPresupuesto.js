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
   return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor >= 0 & isNaN(valor) == false){
            this.valor = valor;
        }
        return this.valor;
    }

    if (fecha == null || isNaN(fecha)){
        fecha = Date.parse(new Date());
         this.fecha = fecha;
    } else{
        fecha = Date.parse(fecha);
        this.fecha = fecha; 
    }

    this.etiquetas = [];
        if(etiquetas.length !=0){
            for (let etiqueta of etiquetas){
                this.etiquetas.push(etiquetas[etiqueta]);
            }
        }
        else{
          
    }

    this.actualizarFecha = function(){

    }
    this.anyadirEtiquetas = function(){

    }

    this.mostrarGastoCompleto = function(){

    }
    this.borrarEtiquetas = function(){

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
    let pos = 0;
    for (let i = 0; i<gastos.length; i++){
        if (gastos[i].id == gastoBorrar){
            gastos.splice(pos, 1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for (let gasto of gastos){
        total = total + gasto.gastos;
    }
    return total;
}
function calcularBalance(){
    let balance = 0;
    balance = presupuesto - calcularTotalGastos();
    return balance;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
    
}
