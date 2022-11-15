// Variables Globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// FUNCIONES PRACTICA JAVASCRIPT I
//==============================================================================
function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        return presupuesto = cantidad;
        } else{
            return -1;
            console.log("Presupuesto inferior a 0");
        }    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // Parámetros de JavaScript I
    ////////////////////////////////////////////////////////////////////
    //descripcion
    this.descripcion = descripcion;
    //valor
    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }
    // Parámetros JavaScript II
    ////////////////////////////////////////////////////////////////////
    // fecha
    fecha = Date.parse(fecha);
    if (fecha == null || isNaN(fecha)){
        this.fecha = +new Date(); // se pasa a timestamp con el + delante
    } else{
        this.fecha = fecha; // getTime() sirve para pasar la fecha a formato timestamp
    }
    //etiqueta
    this.etiquetas = etiquetas;
    if(etiquetas == null){
        this.etiquetas = [];
    }
    
    // METODOS de JavaScript I
    //////////////////////////////////////////////////////////////////////////////////////
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor){
        if (valor >= 0 & isNaN(valor) == false){
            this.valor = valor;
        }
    }

    // METODOS de JavaScript II
    ///////////////////////////////////////////////////////////////////////////////////////
    this.anyadirEtiquetas = function(...etiquetas){
        for (const i of etiquetas){
            // comprobar si existe en la lista, si no existe, añadirlo
            if (this.etiquetas.includes(i) == false){
                this.etiquetas.push(i);
            }
        }
    }

    this.actualizarFecha = function(nuevaFecha){
        nuevaFecha = Date.parse(nuevaFecha);
        if(!isNaN(nuevaFecha)){
            this.fecha = +new Date(nuevaFecha);
        }
    }

    this.borrarEtiquetas = function(...nuevaEtiqueta){
        for(var i = 0; i < nuevaEtiqueta.length; i++){
            for(var etiqueta = 0; etiqueta < this.etiquetas.length; etiqueta++){
                if(nuevaEtiqueta[i] == this.etiquetas[etiqueta]){
                    this.etiquetas.splice(etiqueta,1)
                }
            }
        }
    }

    this.mostrarGastoCompleto = function(){
        var fechaLocal = new Date(this.fecha).toLocaleString();
        var texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${fechaLocal}\n`;
        texto += `Etiquetas:\n`;
        this.etiquetas.forEach(function(i){
            texto += `- ${i}\n`; })
        return texto;
    }
}

// FUNCIONES JAVASCRIPT II
//////////////////////////////////////////////////////////////////////////////////////////
function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
    
}

// comprobar si funciona
//var gasto = new CrearGasto("Alquiler", 300, "2021-10-06T13:10", "casa", "libro", "perro");
//gasto.borrarEtiquetas("casa", "perro");
//console.log(gasto.mostrarGastoCompleto());
//anyadirGasto(gasto);
//console.log(gasto.mostrarGasto());
//console.log(listarGastos());

//var gasto1 = new CrearGasto("Cine", 15, "2022-10-06T13:10", "SpiderMan");
//anyadirGasto(gasto1);
//console.log(gasto.mostrarGasto());
//console.log(listarGastos());

function borrarGasto(id){
    for(var i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos(){
    var totalGasto = 0;
    for(var i = 0; i < gastos.length; i++){
        totalGasto += gastos[i].valor;
    }
    return totalGasto;
}

function calcularBalance(){
    return (presupuesto - calcularTotalGastos())
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
