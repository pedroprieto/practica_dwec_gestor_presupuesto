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
let gastos = new Array();
let idGasto = 0;
let  presupuesto = 0;

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
    this.valor=valor;                       //El formato del string para usar Date.parse debe ser YYYY-MM-DDTHH:mm:ss.sssZ
    if(fecha=='' || isNaN(Date.parse(fecha))) // si la fecha está vacía o no tiene un formato válido
        this.fecha=Date.now(); //fecha actual en formato timestamp (numerico)
    else
        this.fecha=Date.parse(fecha); //fecha actual (timestamp) en valor numerico

    if(etiquetas=='')
        this.etiquetas=[];
    else {
        this.etiquetas=[];
        for (let categoria of etiquetas) 
            this.etiquetas.push(categoria);
    }
    //////////////// METODOS //////////////////    
    this.actualizarDescripcion=function(desc) { this.descripcion=desc};
    this.actualizarValor=function(valor) {if (isNaN(valor)==false && valor>0) { this.valor=valor}};
    this.mostrarGasto=function() {return ("Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €")};
    
    this.anyadirEtiquetas = function(...etiquetas) { 
        for (let categoria of etiquetas) 
            if (this.etiquetas.indexOf(categoria)== -1)
                    this.etiquetas.push(categoria)
    };

    this.mostrarGastoCompleto=function(){
        var date = new Date(this.fecha);
        var imprimir = '';
        for (let categoria of this.etiquetas)
            imprimir = imprimir + "- "+categoria+"\n";
        return ("Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €.\nFecha: "+date.toLocaleString()+"\nEtiquetas:\n"+imprimir);
    };

    this.actualizarFecha=function(fecha){//'2021-11-11T13:10Z'
        if(fecha!='' && !isNaN(Date.parse(fecha))) // si la fecha no está vacía o tiene formato válido
            this.fecha=Date.parse(fecha);//this.fecha esta en ms (numero)
    };
    
    this.borrarEtiquetas=function(...etiquetas){
        for (let categoria1 of etiquetas)
            for(let categoria2 of this.etiquetas)
                if (categoria2==categoria1)
                    this.etiquetas.splice(this.etiquetas.indexOf(categoria2),1);//elimina lo que hay en la posición indexOf
    };  
}
///// FUNCIONES /////////////////////////////
function listarGastos()
{
    return gastos;//array con un listado de gastos
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);//añade gasto al array gastos
}

function borrarGasto(idGasto)
{
    for (let gasto of gastos) 
        if(gasto.id == idGasto) 
            gastos.splice(gastos.indexOf(gasto), 1);//busca el objeto gasto y lo elimina
}
function calcularBalance(){
    let totalGasto = 0;
    for (let gasto of gastos) 
        totalGasto += gasto.valor;
    return presupuesto - totalGasto;
}
function calcularTotalGastos(){//calcular la suma de los valores de los gastos
    let totalGasto = 0;
    for (let gasto of gastos) 
        totalGasto += gasto.valor;
    return totalGasto;
}
/*
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

alert("hola");*/
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
