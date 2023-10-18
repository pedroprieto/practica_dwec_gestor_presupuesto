// Adrián Romero Alonso 2DAWY
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0 && typeof valor === 'number'){
        presupuesto = valor;
        return valor;
    }else{
        console.error('Error, numero negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descripcion,valor,fecha, ...etiquetas) {
    if(valor >= 0 && typeof valor === 'number'){
        this.descripcion = descripcion;
        this.valor = valor;
    }else{
        this.descripcion = descripcion;
        this.valor = 0;
    }

    if(etiquetas){
        etiquetas = [...new Set(etiquetas)];
    }else{
        this.etiquetas = [];
    }

    if(fecha){
        if(typeof fecha === 'String'){
            this.fecha = Date.parse(fecha);
        }else{
            this.fecha = Date.now();
        }
    }else{
        this.fecha = Date.now();
    }
    
    this.mostrarGasto = function(){
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    };

    this.mostrarGastoCompleto = function(){
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let listaEtiquetas = this.etiquetas.join('\n -');
        let mostrar = this.mostrarGasto() + '.\nFecha: ' + fechaLocal + '\nEtiquetas:\n - ' + listaEtiquetas;
        return mostrar;
      
    };

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return descripcion;
    };

    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof valor === 'number'){
            this.valor = valor;
            return valor;
        }
    };

    this.actualizarFecha = function(fecha){
        if(typeof fecha === 'string'){
            this.fecha = Date.parse(fecha);
        }
    };

    
    this.anyadirEtiquetas = function(...etiquetas){
        for(let i; i < etiquetas.length(); i++){
            let etiqueta = etiquetas[i];
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }

    };

    this.borrarEtiquetas = function(...etiquetas){
        let filtroEtiquetas = [];
        for(let i; i < etiquetas.length(); i++){
            let etiqueta = this.etiquetas[i];
            if(!etiquetas.includes(etiqueta)){
                filtroEtiquetas.push(etiqueta);
            }
        }
        this.etiquetas = filtroEtiquetas;
    };
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto)
}


function borrarGasto(id){
    for(let i = 0;i < gastos.length(); i++ ){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }

}


function calcularTotalGastos(){
    let suma;
    for(let i = 0;i < gastos.length(); i++ ){
       suma = suma + gastos[i].valor;
    }
    return suma;
}


function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
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
