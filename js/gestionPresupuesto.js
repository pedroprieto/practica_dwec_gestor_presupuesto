// TODO: Crear las funciones, objetos y variables indicadas en el enunciado



let presupuesto;
presupuesto = 0;

let gastos;
gastos = [];

let idGasto;
idGasto = 0;



function actualizarPresupuesto(valor) {
    
    if (valor >= 0) {
    
        presupuesto = valor;
        return presupuesto;
    } 
    else {
        console.log("La cantidad introducida no es valida");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function listarGastos() {

    return gastos;
}
function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto = ++idGasto;
    gastos.push(gasto);
}
function borrarGasto(id) {

    let idnumero = Number(id);
    let x  = 0;

    for (let key of gastos)
    {
        if(key.id == idnumero)
        {
            x = gastos.indexOf(key);
            gastos.splice(x,1);
        }
    }
}
function calcularTotalGastos() {

    let suma = 0;

    for (let key of gastos)
    {
        suma = suma + key.valor;
    }

    return suma;
}
function calcularBalance() {

    let gastoTotal = calcularTotalGastos();
    let balance = 0;

    balance = presupuesto - gastoTotal;
    return balance;
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    this.etiquetas = [];
    this.fecha = fecha;
    
    
    
    if(valor >= 0) {
        this.valor = valor;

    } else {
        this.valor = 0;
    }

    if(fecha)
    {
        fecha = Date.parse(fecha)
        this.fecha = fecha;
    }else{
        
        fecha = new Date();
        this.fecha = fecha;
    }
    if(!etiquetas)
    {
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }
    this.mostrarGasto = function() {
        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
       
        return gasto;
    }

    this.actualizarDescripcion = function (descripcionAct) {
    
        this.descripcion = descripcionAct;
    }

    this.actualizarValor = function(valorAct) {
    
        if (valorAct >= 0) 
        {
            this.valor = valorAct;
        }
    }
    

this.mostrarGastoCompleto = function(){

    let fecha2 = new Date(fecha).toLocaleString();
    let texto2 = `Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${fecha2}\nEtiquetas:\n`

    for (let key of etiquetas)
    {
        texto2 = texto2 + "- " + key + "\n";
    }
    return texto2;
}

this.actualizarFecha = function(nuevaFecha){
    nuevaFecha = Date.parse(nuevaFecha);
    if (nuevaFecha)
    {
        this.fecha = nuevaFecha;
    }
}
this.anyadirEtiquetas = function(...nuevasEtiquetas){
    for (let key of nuevasEtiquetas){
        if (etiquetas.indexOf(key) == -1){
            this.etiquetas.push(key);
        }
    }
}
this.borrarEtiquetas = function(...borrarEtiquetas){
    let x = -1;
    for(let key of borrarEtiquetas){
        if(etiquetas.indexOf(key) != -1){
            x = etiquetas.indexOf(key);
            this.etiquetas.splice(x, 1);
        }
    }
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
