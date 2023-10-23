// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(resultado)
{
    // TODO
    if(resultado >= 0)
    {
        resultado = presupuesto;
        return resultado;
    }
    else
    {
        presupuesto = -1;
        return presupuesto;
    }

}

function mostrarPresupuesto()
{
    // TODO
    /*let resultado = "Tu presupuesto actual es de " + presupuesto + "€";
    return resultado;*/
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor)
{
    // TODO
    this.mostrarGasto = function()
    {
        let resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return resultado;
    }
    this.actualizarDescripcion = function(actualidescrip)
    {
        this.descripcion = actualidescrip;
    }

    this.actualizarValor = function(valor)
    {
        this.valor = (valor >=0) ? valor : this.valor;
    }

    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;
    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
