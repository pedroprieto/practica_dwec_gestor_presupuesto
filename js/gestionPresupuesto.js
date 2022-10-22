// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {
    if( nuevoValor >= 1){

        presupuesto = nuevoValor
        return presupuesto

    }else{

        console.log("El valor es negativo")
        return -1
    }
    
}

function mostrarPresupuesto() {
  // TODO
  let text = `Tu presupuesto actual es de ${presupuesto} €`
  return text

}
function CrearGasto(descripcion, valor, fecha, etiquetas) {

    this.descripcion = descripcion;

    if(valor >= 0){
        this.valor = valor;
    }else{
        this.valor = 0
    }

    let dataFecha = Date.parse(fecha)
    
    if(!dataFecha){

        this.fecha = Date.parse(new Date())
        
    }else{
    
        this.fecha = dataFecha;
    }

    if(!etiquetas){
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }


    this.mostrarGasto = function() {  
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor) {
       if(valor >= 0){
            this.valor = valor;
       }
    }

 
 
}



function listarGastos()
{
    return gastos
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto += 1;
    gastos.push(gasto);
}



function borrarGasto(id){

    for(let i = 0; i < gastos.length; i++){
        
        if(gastos[i].id == id){
            gastos.splice(i, 1)
        }
    }
}
function calcularTotalGastos(){
    let sumaGastos = 0;

    for(let i = 0; i < gastos.length; i++){
           sumaGastos = sumaGastos + gastos[i].valor
    }
    return sumaGastos
}
function calcularBalance(){

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




// Ejecuciones
let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );

anyadirGasto(gasto1)
anyadirGasto(gasto2)
anyadirGasto(gasto3)
anyadirGasto(gasto4)
anyadirGasto(gasto5)
anyadirGasto(gasto6)


calcularTotalGastos()

console.log("holka")