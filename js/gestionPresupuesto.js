// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//gasto.descripcion='';
//gasto.valor = 0;

// function mostrarGasto()  //metodo
// {

//     return("Gasto correspondiente a "+gasto.descripcion+" con valor "+gasto.valor+" €");//obtener los valores de las propiedades del objeto gasto
// }

// function actualizarDescripcion(descripcion) //metodo
// {
    
//     gasto.descripcion=descripcion;

// }                                               //descripcion en formato string
//                                                 //descripcion en formato numerico

// function actualizarValor(valor) //metodo
// {
    
//     if (isNaN(valor)==false && valor>0)
//     {
//         gasto.valor=valor;
//     }

// }
// TODO: Variable global
//let gasto = new CrearGasto();
let gastos = new Array();
let idGasto = 0;
let  presupuesto = 0;
//let descripcion='';
//let valor=0;
function actualizarPresupuesto(parametro) {
    // TODO
    if (isNaN(parametro)==false && parametro>0)
        {
            presupuesto=parametro;
            return presupuesto;
        }
    else
        {
            console.log("Error no es una valor positivo");
            return (-1);
        }
}

function mostrarPresupuesto() {

    return ("Tu presupuesto actual es de "+presupuesto+" €");
}
function CrearGasto(descripcion,valor,fecha,...etiquetas) 
{
    // TODO
    //var gasto = new Object();
    if(isNaN(valor)==true || valor<0)
        valor = 0;
    this.descripcion=descripcion;
    this.valor=valor;
    if(fecha=='' || isNaN(Date.parse(fecha))) // si la fecha está vacía o no tiene un formato válido
        this.fecha=Date.now(); //devuelve la fecha actual
    else
        this.fecha=fecha; //fecha actual (timestamp) en valor numerico

    if(etiquetas=='')
        this.etiquetas=[];
    else {
        this.etiquetas=[];
        for (let categoria of etiquetas) this.etiquetas.push(categoria);
    }
        
    this.actualizarDescripcion=function(desc) { this.descripcion=desc};
    this.actualizarValor=function(valor) {if (isNaN(valor)==false && valor>0) { this.valor=valor}};
    this.mostrarGasto=function() {return ("Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €")};
    this.anyadirEtiquetas = function(...etiquetas) { for (let categoria of etiquetas) this.etiquetas.push(categoria)};

    // console.log("hoa");
    //return;   
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idGasto){
    for (let gasto of gastos) {
        if(gasto.id == idGasto) {
            gastos.splice(gastos.indexOf(gasto), 1);
            break;
        }
    }
}
function calcularBalance(){
    let totalGasto = 0;
    for (let gasto of gastos) {
        totalGasto += gasto.valor;
    }
    return presupuesto - totalGasto;
}
function calcularTotalGastos(){
 return gastos.length;
}

let gasto1 = new CrearGasto("Gasto 1");
let gasto2 = new CrearGasto("Gasto 2", 23.55);
let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);


// borrarGasto(2);
let numero = calcularTotalGastos();

actualizarPresupuesto(500);
let balance = calcularBalance();

alert("hola");
//let gasto = CrearGasto(descripcion,valor);//constructor de objeto gasto
//gasto.actualizarDescripcion("Nueva descripción de gasto 1");
//gasto.actualizarValor(15);
//console.log(gasto.mostrarGasto());

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
