// He consultado el archivo con las soluciones porque habían cosas que no entendía el porqué
// de los errores, algunas eran simples espacios que faltaban en el texto, o las comillas que había 
// puesto mal. Y otras que no he conseguido entender.

// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// Funciones
function actualizarPresupuesto(num) {
    if(num >= 0){
        presupuesto = num;
        return presupuesto;
    }
    else{
        console.log("No se puede introducir un número negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;  
    // No entiendo porqué no puedo poner simplemente this.valor = valor; 
    // si ya compruebo en el método actualizar valor si es un número negativo.
    let f = Date.parse(fecha);
    if(f){
        this.fecha = f;
    }
    else{
        this.fecha = Date.parse(new Date());
    }
    // Mío
    /*if (isNaN(f)){
        this.fecha = Date.now;
    }
    else{
        this.fecha = f;
    }*/
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
        Fecha: ${new Date(this.fecha).toLocaleString()}
        Etiquetas:\n`
            for(let e of this.etiquetas){
                texto += `- ${e}\n`
            }
            return texto;
    }
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        /*return descripcion;*/
    }
    this.actualizarValor = function(valor){
        this.valor = (valor >=0) ? valor : this.valor;
        /*if(valor >= 0){
            this.valor = valor;
            return valor;
        }
        else{
            valor = this.valor;
            return valor;
        }*/
    }
    this.actualizarFecha = function(fecha){
        let f = Date.parse(fecha);
        if(f){
            this.fecha = f;
        }
        /*if (isNaN(f)){
            this.fecha = Date.now;
        }
        else{
            this.fecha = f;
        }*/ 
    }
    this.anyadirEtiquetas = function(...etiqueta){
        for(let e of etiqueta){
            if(this.etiquetas.indexOf(e) == -1){
                this.etiquetas.push(e);
            }
            // Porqué no funciona lo siguiente...
            /*if(!this.etiqueta.includes(e)){
                this.etiquetas.push(e);
            }*/
        }
    }

    this.borrarEtiquetas = function(...etiqueta){
        let newetiquetas = [];

        for (let e of this.etiquetas) {
	    if (etiqueta.indexOf(e) == -1) {
                newetiquetas.push(e);
	    }
        }

        this.etiquetas = newetiquetas;

        // Porqué no funciona ésto
        /*for(let etqs of this.etiquetas){
            for(let etq of etiqueta){
                if(etq == etqs){
                    this.etiquetas.splice(etqs);
                }
            }
        }
    }*/
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto){
    let gasto = null;
    for (let g of gastos) {
	if (g.id == idGasto) {
	    gasto = g;
	}
    }
    if (gasto) {
        let posGasto = gastos.indexOf(gasto);
        gastos.splice(posGasto, 1);
    }
    /*for(let g of gastos){
        if(g == idGasto){
            gastos.splice(g);
        }
    }*/
}

function calcularTotalGastos(){
    let sumaGastos = 0;
    for (let g of gastos){
        sumaGastos += g.valor;
        /*sumaGastos += g;*/
    }
    return sumaGastos;
}

function calcularBalance(){
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
    calcularBalance
}
