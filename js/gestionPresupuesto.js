
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

function CrearGasto(descripcion, valor,fecha,...etiquetas) {
    if ( valor >= 0) {
        this.descripcion = descripcion || "";
        this.valor = valor;
        this.fecha = fecha ? Date.parse(fecha) : Date.now(); 
        this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];
        
       
    } else {
        this.descripcion = descripcion || "";
        this.valor = 0;
        this.fecha = Date.now();
        this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];
        
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
    let sumaTotal=0;
        for(let i=0;i<gastos.length;i++){
            let numero= gastos[i].valor;
            sumaTotal=sumaTotal+numero;
        }
    return sumaTotal;
}

function  calcularBalance(){
    let totalGastos=calcularTotalGastos();
    let balance= presupuesto-totalGastos;
    return balance;
}

CrearGasto.prototype.actualizarFecha = function (nuevaFecha) {
    const fechaValida = Date.parse(nuevaFecha);
    if (!isNaN(fechaValida)) {
        this.fecha = fechaValida;
    }
};

CrearGasto.prototype.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let etiqueta of nuevasEtiquetas) {
        if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
        }
    }
};

CrearGasto.prototype.borrarEtiquetas = function (...etiquetasABorrar) {
    this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
};



CrearGasto.prototype.mostrarGastoCompleto = function () {
    
    const fechaFormateada = new Date(this.fecha).toLocaleString();

    const etiquetasFormateadas = this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');

    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaFormateada}\nEtiquetas:\n${etiquetasFormateadas}`;
};

CrearGasto.prototype.obtenerPeriodoAgrupacion=function(nombreFecha){

    let fecha=new Date(this.fecha);
    let fechaAgrupada;

    if(nombreFecha=="dia"){
        fechaAgrupada=fecha.toISOString().slice(0,10)
        return fechaAgrupada;
    }
    if(nombreFecha=="mes"){
        fechaAgrupada=fecha.toISOString().slice(0,7)
        return fechaAgrupada;
    }
    if(nombreFecha=="anyo"){
        fechaAgrupada=fecha.getFullYear().toString();
        return fechaAgrupada;
    }

}

function filtrarGastos(){

}

function agruparGastos(){

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
    filtrarGastos,
    agruparGastos,
    CrearGasto
}






