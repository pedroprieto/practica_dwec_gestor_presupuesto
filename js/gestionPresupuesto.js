// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) 
{
    // TODO
    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) //controlamos que nuevoPresupuesto sea un numero y mayor = que 0
    {
        presupuesto = nuevoPresupuesto;
    }
    else
    {
        nuevoPresupuesto = -1;
        console.log("Error en el presupuesto");
    }

    return nuevoPresupuesto;
}

function mostrarPresupuesto() 
{
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

//Funcion constructora
function CrearGasto(descripcion, valor, fecha, ...etiquetas) 
{
    // TODO
    //Propiedades
    this.descripcion = descripcion;
    this.etiquetas = [];

    if(!isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    if (fecha)
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }
    //this.fecha = fecha;


    //Metodos
    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function (){
        let texto = "";
        let fecha = new Date (this.fecha);
        let fechaL = fecha.toLocaleString();

        texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €. \nFecha: ${fechaL} \nEtiquetas: \n`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        if (nuevaDescripcion != descripcion)
        {
            this.descripcion = nuevaDescripcion;
        }
    }

    this.actualizarValor = function (nuevoValor){
        if(nuevoValor >= 0)
        {
            this.valor = nuevoValor;
        }
    }
}

//FUNCIONES vacias
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
function borrarGasto(id)
{
    let posicion = gastos.findIndex(gasto => gasto.id === id);

    if (posicion != -1)
    {
        gastos.splice(posicion, 1);
    }
}
function calcularTotalGastos()
{
}
function calcularBalance()
{

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   
{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
