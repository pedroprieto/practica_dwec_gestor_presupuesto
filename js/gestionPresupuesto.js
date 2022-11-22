// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorActual) {
    // TODO
    if(valorActual > 0){
        presupuesto = valorActual;
        console.log("El valor de la variable presupuesto es de" + presupuesto + "€");
        return presupuesto;
    }else{
        console.log("Valor no válido");
        return -1;
    }

}

function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this. descripcion = descripcion;
    this.fecha = new Date();
    this.etiquetas = [];
    
    if( valor >= 0){
        this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(!fecha){
        fecha = Date.parse(new Date());
        this.fecha = fecha;
    }else{
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    }
    console.log(fecha);

    if(!etiquetas){
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.`;
        
    }

    this.mostrarGastoCompleto = function(){
        let fecha2 = new Date(fecha).toLocaleString();
        let textoTotal = `Gasto correspondiente a ${descripcion} con valor ${valor} €. \nFecha: ${fecha2}\nEtiquetas:\n`
        
        for(let eti of etiquetas){
            textoTotal = textoTotal + "- " + eti+ "\n";
        }
        
        return textoTotal;  
    }

    this.anyadirEtiquetas = function(...etiquetasNuevas){
        for(let eti of etiquetasNuevas){
                if(etiquetas.indexOf(eti) == -1){
                    this.etiquetas.push(eti);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasBorrar){
        
        for(let eti of etiquetasBorrar){
                if(etiquetas.indexOf(eti) > -1){
                    let indice = etiquetas.indexOf(eti);
                    this.etiquetas.splice(indice, 1);
            }
        }
    }

    this.actualizarFecha = function (fechaNueva) {
            fechaNueva = Date.parse(fechaNueva);
            if (fechaNueva) {
                this.fecha = fechaNueva;
            }
    }

    this.actualizarDescripcion= function (descripcionNueva) {
            this.descripcion = descripcionNueva;
    }

    this.actualizarValor= function (valorNuevo) {
            if(valorNuevo > 0){
                this.valor = valorNuevo;
            }else{
                return this.valor;
            }
    }
}



function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto = idGasto + 1;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let idnum = Number(id);
    let indice = 0;

    for (const g of gastos) {
        if (g.id == idnum) {
            indice = gastos.indexOf(g);
            gastos.splice(indice, 1);
        }
    }
}

function calcularTotalGastos() {
    let sumagastos = 0;
    for( let g of gastos){
        sumagastos = sumagastos + g.valor;
    }
    return sumagastos;
}

function calcularBalance() {
    let gastosTotales = calcularTotalGastos();
    let balance = 0;

    balance = presupuesto - gastosTotales;
    return balance;
}

let gasto2 = new CrearGasto("descripción del gasto", 25.33, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
console.log(gasto2.mostrarGastoCompleto());
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
}



