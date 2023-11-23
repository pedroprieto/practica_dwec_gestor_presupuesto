// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// FUNCIONES ...............................
// 
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

// 
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// OBJETO GASTO
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // Métodos
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return descripcion;
    }

    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
            return valor;
        }
        else{
            valor = this.valor;
            return valor;
        }
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

    this.actualizarFecha = function(fecha) {
        let f = Date.parse(fecha);
        if (f) {
            this.fecha = f;
        }
    }

    this.anyadirEtiquetas = function(...etiqueta){
        for(let e of etiqueta){
            if(this.etiquetas.indexOf(e) == -1){
                this.etiquetas.push(e);
            }
        }
    }
    
    this.borrarEtiquetas = function(...etqs) {
        let newetiquetas = []; // Crea un nuevo array donde se van a meter las etiquetas que
        // no estén en el array existente 'etiquetas'

        for (let e of this.etiquetas) { // Recorre el array 'etiquetas' existente
	    if (etqs.indexOf(e) == -1) { // Comprueba si cada una de las etiquetas existentes 
        //está en el nuevo array etqs mediante indexOf, == -1 si no está 
                newetiquetas.push(e); // Añade al nuevo array creado cada etiqueta 
        //que no esté en el array existente
	    }
        }
        this.etiquetas = newetiquetas; // 
    }

    // ANOTACIÓN PARA PEDRO
    // He mirado en la solución porque no entendía bien lo que se pedía,
    // Lo he hecho como sigue porque tampoco entiendo el código escrito en la solución
    // aunque me ha ayudado a entender lo que se pide, pero no entiendo porqué 
    // se pone '!periodo' dentro de los 'if'
    this.obtenerPeriodoAgrupacion = function(periodo){
        // Creo la variable fecha y le asigno una fecha nueva con parámetro propiedad fecha de la función CrearGasto.
        let f = new Date(this.fecha);
        // Si el periodo introducido es dia, mes o año, devuelve el día, el mes o el año de la fecha.
        if (periodo == "dia"){
            let mes = f.getDate();
            return mes + 1; 
        }
        if(periodo == "mes"){
            return f.toLocaleDateString('es-ES', {month:'long'});
        }
        if(periodo == "año"){
            return f.getFullYear();
        }
    }

    // Propiedades
    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;
    let f = Date.parse(fecha);
    if(f){
        this.fecha = f;
    }
    else{
        this.fecha = Date.parse(new Date());
    }
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
}

// FUNCIONES
// 
function listarGastos(){
    return gastos;
}

// 
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

// 
function borrarGasto(idGasto){
    for(let g of gastos){
        if(g.id == idGasto){
            gastos.splice(gastos.indexOf(g), 1);
        }
    }
}

// 
function calcularTotalGastos(){
    let sumaGastos = 0;
    for (let g of gastos){
        sumaGastos += g.valor;
    }
    return sumaGastos;
}

// 
function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

// 
function filtrarGastos(){

}

// 
function agruparGastos(){

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
    filtrarGastos,
    agruparGastos
}
