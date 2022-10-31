
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
        let texto = "";
        texto = texto + `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return texto;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor >= 0 & !isNaN(valor)){
            this.valor = valor;
        }
        return this.valor;
    }

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
    }

    this.borrarEtiquetas = function(...etiquetas){
        let pos = 0;
        for (let etiqueta of etiquetas){
            pos = this.etiquetas.indexOf(etiqueta);
            if (pos != -1){
                this.etiquetas.splice(pos, 1);
            }
        }
    }     

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
    }

    this.mostrarGastoCompleto = function(){
        let texto = "";
        texto = texto + this.mostrarGasto() + ".";
        texto = texto + `\nFecha: ${new Date (this.fecha).toLocaleString()}\n`;
        texto = texto + "Etiquetas:\n";
        for (let i = 0; i<this.etiquetas.length; i++){
            texto = texto + `- ${this.etiquetas[i]}\n`;
        }
        return texto;
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

}
