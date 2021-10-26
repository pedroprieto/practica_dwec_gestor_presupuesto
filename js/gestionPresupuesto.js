// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

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

function CrearGasto(descripcion, valor) 
{
    // TODO
    //Propiedades
    this.descripcion = descripcion;

    if(!isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    //Metodos
    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
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

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   
{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
