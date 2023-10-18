let presupuesto=0;
let gastos=[];
let idGasto=0;
function actualizarPresupuesto(valor) {
    if(valor>=0){
        presupuesto=valor;
        return presupuesto;
    }
    else{      
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor,fecha,etiquetas) {
    if ( valor >= 0) {
        this.descripcion = descripcion || "";
        this.valor = valor;
        this.fecha=saberFecha(fecha) ; 
        this.etiquetas=etiquetas || [];
        idGasto++;
       
    } else {
        this.descripcion = descripcion || "";
        this.valor = 0;
        this.fecha=saberFecha(fecha);
        this.etiquetas=etiquetas || [];
        idGasto++;
    }
}
CrearGasto.prototype.mostrarGasto = function () {
    return "Gasto correspondiente a "+ this.descripcion+ " con valor "+ this.valor +" €";
};

CrearGasto.prototype.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
};

CrearGasto.prototype.actualizarValor = function (valor) {
    if (valor>= 0) {
        this.valor = valor;
    }
};

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id= idGasto;
    idGasto++;
    gastos.push(gasto);

}

function borrarGasto(id){

    for(let i=0; i<gastos.length;i++){
        if(gastos[i].id==id){
            gastos.splice(i,1);
            break;
        }
    }
    
}

function  calcularTotalGastos(){

}

function  calcularBalance(){

}

function saberFecha(fecha){
    let date=Date.parse(fecha);

    if(!isNaN(date)){
        let fechaObj = new Date(date);
        let fechaString = fechaObj.toLocaleString();
        return fechaString;
    }
    else{
        let fechaActual= new Date().toLocaleString();
        return fechaActual;
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}






